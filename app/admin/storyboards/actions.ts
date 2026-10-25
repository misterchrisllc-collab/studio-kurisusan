"use server";

import { z } from "zod";
import { requireAdmin, UnauthorizedError } from "@/lib/admin-auth";
import { drawingSchema } from "@/lib/storyboards/drawing";
import {
  db,
  SHOT_COLUMNS,
  copyObject,
  removeObjects,
  touchProject,
  withUrls,
} from "@/lib/storyboards/server";
import { FORMATS, SUGGESTION_CATEGORIES, type Shot, type ShotView } from "@/lib/storyboards/types";

export type Result<T = null> = { ok: true; data: T } | { ok: false; error: string };

async function run<T>(fn: () => Promise<T>): Promise<Result<T>> {
  try {
    await requireAdmin();
    return { ok: true, data: await fn() };
  } catch (err) {
    if (err instanceof UnauthorizedError) return { ok: false, error: "Signed out. Reload and sign in again." };
    if (err instanceof z.ZodError) return { ok: false, error: err.issues[0]?.message ?? "Invalid input" };
    console.error("storyboard action failed", err);
    return { ok: false, error: err instanceof Error ? err.message : "Something went wrong" };
  }
}

const id = z.string().uuid();
const text = (max: number) => z.string().max(max, `Too long (max ${max} characters)`);

const projectPatch = z
  .object({
    title: text(200).trim().min(1, "Title can't be empty"),
    client_name: text(200),
    description: text(5000),
    notes: text(50000),
    logline: text(500),
    story: text(50000),
    tone: text(5000),
    audience: text(5000),
    locations: text(5000),
    music: text(5000),
    format: z.enum(FORMATS),
    target_seconds: z.number().int().min(1).max(36000).nullable(),
  })
  .partial()
  .strict();

const shotPatch = z
  .object({
    title: text(300),
    description: text(10000),
    shot_size: text(200),
    camera_angle: text(200),
    camera_movement: text(200),
    subject_action: text(10000),
    script: text(20000),
    audio_notes: text(10000),
    lighting_notes: text(10000),
    production_notes: text(20000),
    duration_seconds: z.number().min(0).max(36000).nullable(),
    background: z.enum(["none", "reference", "sketch"]),
    drawing: drawingSchema.nullable(),
    filmed: z.boolean(),
    // Only removals reach here from the browser (add-to-notes / dismiss); new ones come from the server route.
    suggestions: z
      .array(z.object({ id: z.string().max(64), category: z.enum(SUGGESTION_CATEGORIES), text: text(1000) }).strict())
      .max(10),
  })
  .partial()
  .strict();

export type ShotPatch = z.infer<typeof shotPatch>;
export type ProjectPatch = z.infer<typeof projectPatch>;

// ── projects ──

export async function createProject(input: { title: string; client_name?: string; description?: string; format?: string }) {
  return run(async () => {
    const values = projectPatch.parse({
      title: input.title || "Untitled storyboard",
      client_name: input.client_name ?? "",
      description: input.description ?? "",
      format: input.format ?? "16:9",
    });
    const { data, error } = await db().from("storyboard_projects").insert(values).select("id").single();
    if (error) throw error;
    // Start with one empty frame so the editor never opens on nothing.
    await db().from("storyboard_shots").insert({ project_id: data.id, position: 0 });
    return data.id as string;
  });
}

export async function updateProject(projectId: string, patch: ProjectPatch) {
  return run(async () => {
    const values = projectPatch.parse(patch);
    const { data, error } = await db()
      .from("storyboard_projects")
      .update({ ...values, updated_at: new Date().toISOString() })
      .eq("id", id.parse(projectId))
      .select("updated_at")
      .single();
    if (error) throw error;
    return data.updated_at as string;
  });
}

export async function duplicateProject(projectId: string) {
  return run(async () => {
    const supabase = db();
    const { data: src, error } = await supabase
      .from("storyboard_projects")
      .select("title, client_name, description, notes, logline, story, tone, audience, locations, music, format, target_seconds")
      .eq("id", id.parse(projectId))
      .single();
    if (error) throw error;
    const { data: copy, error: e2 } = await supabase
      .from("storyboard_projects")
      .insert({ ...src, title: `${src.title} (copy)` })
      .select("id")
      .single();
    if (e2) throw e2;

    const { data: shots, error: e3 } = await supabase
      .from("storyboard_shots")
      .select(SHOT_COLUMNS)
      .eq("project_id", projectId)
      .order("position");
    if (e3) throw e3;

    // Images are copied, not shared, so deleting one project never breaks the other.
    for (const s of (shots ?? []) as Shot[]) {
      await insertShotCopy(s, copy.id, s.position, { filmed: false });
    }
    return copy.id as string;
  });
}

export async function deleteProject(projectId: string) {
  return run(async () => {
    const pid = id.parse(projectId);
    const { data: shots } = await db()
      .from("storyboard_shots")
      .select("reference_path, sketch_path")
      .eq("project_id", pid);
    await removeObjects(pid, (shots ?? []).flatMap((s) => [s.reference_path, s.sketch_path]));
    const { error } = await db().from("storyboard_projects").delete().eq("id", pid);
    if (error) throw error;
    return null;
  });
}

// ── shots ──

async function insertShotCopy(s: Shot, projectId: string, position: number, overrides: Partial<Shot> = {}) {
  const newId = crypto.randomUUID();
  const reference_path = s.reference_path ? await copyObject(s.reference_path, projectId, newId) : null;
  const sketch_path = s.sketch_path ? await copyObject(s.sketch_path, projectId, newId) : null;
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { id: _id, updated_at: _u, ...rest } = s;
  const { data, error } = await db()
    .from("storyboard_shots")
    .insert({ ...rest, ...overrides, id: newId, project_id: projectId, position, reference_path, sketch_path })
    .select(SHOT_COLUMNS)
    .single();
  if (error) throw error;
  return data as Shot;
}

async function writePositions(projectId: string, orderedIds: string[]) {
  if (!orderedIds.length) return;
  const { error } = await db()
    .from("storyboard_shots")
    .upsert(orderedIds.map((sid, i) => ({ id: sid, project_id: projectId, position: i })), { onConflict: "id" });
  if (error) throw error;
}

async function orderedShotIds(projectId: string): Promise<string[]> {
  const { data, error } = await db()
    .from("storyboard_shots")
    .select("id")
    .eq("project_id", projectId)
    .order("position");
  if (error) throw error;
  return (data ?? []).map((r) => r.id as string);
}

async function getShot(shotId: string): Promise<Shot> {
  const { data, error } = await db().from("storyboard_shots").select(SHOT_COLUMNS).eq("id", id.parse(shotId)).single();
  if (error) throw error;
  return data as Shot;
}

/** Insert a blank shot after `afterShotId` (or at the end). Returns the new shot and the full order. */
export async function addShot(projectId: string, afterShotId?: string | null) {
  return run(async () => {
    const pid = id.parse(projectId);
    const order = await orderedShotIds(pid);
    const at = afterShotId ? order.indexOf(afterShotId) + 1 : order.length;
    const { data, error } = await db()
      .from("storyboard_shots")
      .insert({ project_id: pid, position: at })
      .select(SHOT_COLUMNS)
      .single();
    if (error) throw error;
    order.splice(at, 0, data.id);
    await writePositions(pid, order);
    await touchProject(pid);
    const [view] = await withUrls([data as Shot]);
    return { shot: view, order };
  });
}

const proposedShot = shotPatch.pick({
  title: true,
  description: true,
  shot_size: true,
  camera_angle: true,
  camera_movement: true,
  subject_action: true,
  script: true,
  audio_notes: true,
  duration_seconds: true,
});

/** Append several shots at the end (used by Organize My Ideas). Never touches existing shots. */
export async function appendShots(projectId: string, shots: z.infer<typeof proposedShot>[]) {
  return run(async () => {
    const pid = id.parse(projectId);
    const rows = z.array(proposedShot).min(1).max(100).parse(shots);
    const start = (await orderedShotIds(pid)).length;
    const { data, error } = await db()
      .from("storyboard_shots")
      .insert(rows.map((r, i) => ({ ...r, project_id: pid, position: start + i })))
      .select(SHOT_COLUMNS);
    if (error) throw error;
    await touchProject(pid);
    return withUrls(((data ?? []) as Shot[]).sort((a, b) => a.position - b.position));
  });
}

export async function updateShot(shotId: string, patch: ShotPatch) {
  return run(async () => {
    const values = shotPatch.parse(patch);
    const { data, error } = await db()
      .from("storyboard_shots")
      .update({ ...values, updated_at: new Date().toISOString() })
      .eq("id", id.parse(shotId))
      .select("project_id, updated_at")
      .single();
    if (error) throw error;
    await touchProject(data.project_id);
    return data.updated_at as string;
  });
}

export async function duplicateShot(shotId: string) {
  return run(async () => {
    const src = await getShot(shotId);
    const order = await orderedShotIds(src.project_id);
    const at = order.indexOf(src.id) + 1;
    const copy = await insertShotCopy(src, src.project_id, at, { filmed: false });
    order.splice(at, 0, copy.id);
    await writePositions(src.project_id, order);
    await touchProject(src.project_id);
    const [view] = await withUrls([copy]);
    return { shot: view, order };
  });
}

export async function deleteShot(shotId: string) {
  return run(async () => {
    const s = await getShot(shotId);
    const { error } = await db().from("storyboard_shots").delete().eq("id", s.id);
    if (error) throw error;
    await removeObjects(s.project_id, [s.reference_path, s.sketch_path]);
    const order = await orderedShotIds(s.project_id);
    await writePositions(s.project_id, order);
    await touchProject(s.project_id);
    return order;
  });
}

export async function reorderShots(projectId: string, orderedIds: string[]) {
  return run(async () => {
    const pid = id.parse(projectId);
    const ids = z.array(id).parse(orderedIds);
    const current = await orderedShotIds(pid);
    if (current.length !== ids.length || !current.every((x) => ids.includes(x))) {
      throw new Error("The shot list changed in another tab. Reload to continue.");
    }
    await writePositions(pid, ids);
    await touchProject(pid);
    return null;
  });
}

/** Remove the reference image or the sketch from one shot. The drawing stays. */
export async function removeShotImage(shotId: string, kind: "reference" | "sketch") {
  return run(async () => {
    const s = await getShot(shotId);
    const path = kind === "reference" ? s.reference_path : s.sketch_path;
    const other = kind === "reference" ? s.sketch_path : s.reference_path;
    const background = s.background === kind ? (other ? (kind === "reference" ? "sketch" : "reference") : "none") : s.background;
    const { error } = await db()
      .from("storyboard_shots")
      .update({ [`${kind}_path`]: null, background, updated_at: new Date().toISOString() })
      .eq("id", s.id);
    if (error) throw error;
    await removeObjects(s.project_id, [path]);
    await touchProject(s.project_id);
    return { background } as Pick<ShotView, "background">;
  });
}

// ── AI sketch candidates ──

/** Make a generated candidate the shot's sketch; the previous sketch file is removed. */
export async function keepSketch(shotId: string, candidatePath: string) {
  return run(async () => {
    const s = await getShot(shotId);
    if (!candidatePath.startsWith(`${s.project_id}/${s.id}/sketch-`)) throw new Error("That sketch doesn't belong to this shot.");
    const { error } = await db()
      .from("storyboard_shots")
      .update({ sketch_path: candidatePath, background: "sketch", updated_at: new Date().toISOString() })
      .eq("id", s.id);
    if (error) throw error;
    if (s.sketch_path !== candidatePath) await removeObjects(s.project_id, [s.sketch_path]);
    await touchProject(s.project_id);
    return null;
  });
}

/** Throw away a candidate that was never kept. Refuses to delete the shot's current sketch. */
export async function discardSketch(shotId: string, candidatePath: string) {
  return run(async () => {
    const s = await getShot(shotId);
    if (!candidatePath.startsWith(`${s.project_id}/${s.id}/sketch-`) || candidatePath === s.sketch_path) return null;
    await removeObjects(s.project_id, [candidatePath]);
    return null;
  });
}
