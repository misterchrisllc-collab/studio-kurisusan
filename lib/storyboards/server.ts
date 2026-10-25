import "server-only";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/admin-auth";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Project, ProjectSummary, Shot, ShotView } from "./types";

export const BUCKET = "storyboard-assets";
const URL_TTL = 60 * 60 * 6; // signed URLs live 6h; reopening the page mints new ones

let client: SupabaseClient | null = null;

/**
 * Service-role client for storyboard data. Unlike lib/supabase.ts it forces
 * every request past Next's fetch cache: storyboards change constantly and a
 * cached read would show an old version of a project.
 */
export function db(): SupabaseClient {
  noStore();
  if (client) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase is not configured (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).");
  client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }) },
  });
  return client;
}

export const SHOT_COLUMNS =
  "id, project_id, position, title, description, shot_size, camera_angle, camera_movement, subject_action, script, audio_notes, lighting_notes, duration_seconds, production_notes, reference_path, sketch_path, background, drawing, updated_at";

/**
 * Second gate behind middleware.ts for the page-level reads: if the middleware
 * were ever skipped or misconfigured, private projects still don't render.
 */
async function requireAdminPage() {
  if (!(await getAdminUser())) redirect("/admin/login");
}

export async function listProjects(): Promise<ProjectSummary[]> {
  await requireAdminPage();
  const { data, error } = await db()
    .from("storyboard_projects")
    .select("id, title, client_name, description, format, updated_at, storyboard_shots(count)")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((p) => {
    const counts = p.storyboard_shots as unknown as { count: number }[];
    return {
      id: p.id,
      title: p.title,
      client_name: p.client_name,
      description: p.description,
      format: p.format,
      updated_at: p.updated_at,
      shot_count: counts?.[0]?.count ?? 0,
    };
  });
}

export async function getProject(id: string): Promise<{ project: Project; shots: ShotView[] } | null> {
  await requireAdminPage();
  const supabase = db();
  const { data: project, error } = await supabase
    .from("storyboard_projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  if (!project) return null;

  const { data: shots, error: shotsError } = await supabase
    .from("storyboard_shots")
    .select(SHOT_COLUMNS)
    .eq("project_id", id)
    .order("position", { ascending: true });
  if (shotsError) throw shotsError;

  return { project: project as Project, shots: await withUrls((shots ?? []) as Shot[]) };
}

export async function withUrls(shots: Shot[]): Promise<ShotView[]> {
  const paths = shots.flatMap((s) => [s.reference_path, s.sketch_path]).filter((p): p is string => !!p);
  const urls = await signPaths(paths);
  return shots.map((s) => ({
    ...s,
    duration_seconds: s.duration_seconds == null ? null : Number(s.duration_seconds),
    reference_url: s.reference_path ? urls.get(s.reference_path) ?? null : null,
    sketch_url: s.sketch_path ? urls.get(s.sketch_path) ?? null : null,
  }));
}

export async function signPaths(paths: string[]): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  if (!paths.length) return map;
  const { data, error } = await db().storage.from(BUCKET).createSignedUrls(paths, URL_TTL);
  if (error) throw error;
  for (const row of data ?? []) if (row.path && row.signedUrl) map.set(row.path, row.signedUrl);
  return map;
}

export async function touchProject(id: string) {
  await db().from("storyboard_projects").update({ updated_at: new Date().toISOString() }).eq("id", id);
}

/** Remove storage objects, but only ones that live under this project's folder. */
export async function removeObjects(projectId: string, paths: (string | null | undefined)[]) {
  const safe = paths.filter((p): p is string => !!p && p.startsWith(`${projectId}/`));
  if (safe.length) await db().storage.from(BUCKET).remove(safe);
}

/** Copy an object to a new path in the same bucket; returns the new path. */
export async function copyObject(from: string, toProject: string, toShot: string): Promise<string> {
  const ext = from.split(".").pop() || "jpg";
  const to = `${toProject}/${toShot}/${crypto.randomUUID()}.${ext}`;
  const { error } = await db().storage.from(BUCKET).copy(from, to);
  if (error) throw error;
  return to;
}
