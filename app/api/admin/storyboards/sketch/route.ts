import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin-auth";
import { aiStatus, generateSketch, sketchPrompt } from "@/lib/storyboards/ai";
import { BUCKET, db, signPaths } from "@/lib/storyboards/server";

export const runtime = "nodejs";
export const maxDuration = 120;

/**
 * Generates a CANDIDATE sketch for a shot and stores it beside the shot's
 * files. The shot is not changed: the editor shows the candidate and calls
 * keepSketch / discardSketch.
 */
export async function POST(req: Request) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
  if (!aiStatus().sketch) {
    return NextResponse.json({ error: "Sketch generation isn't set up: add OPENAI_API_KEY on the server." }, { status: 503 });
  }
  const parsed = z.object({ shotId: z.string().uuid() }).safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const supabase = db();
  const { data: shot } = await supabase
    .from("storyboard_shots")
    .select("id, project_id, title, description, shot_size, camera_angle, camera_movement, subject_action, lighting_notes, storyboard_projects(format)")
    .eq("id", parsed.data.shotId)
    .maybeSingle();
  if (!shot) return NextResponse.json({ error: "Shot not found" }, { status: 404 });
  if (!shot.description.trim() && !shot.title.trim()) {
    return NextResponse.json({ error: "Write a description (or at least a title) for this shot first." }, { status: 400 });
  }
  const format = (shot.storyboard_projects as unknown as { format: "16:9" | "9:16" | "1:1" }).format;

  try {
    const png = await generateSketch(sketchPrompt(shot, format), format);
    const path = `${shot.project_id}/${shot.id}/sketch-${crypto.randomUUID()}.png`;
    const { error } = await supabase.storage.from(BUCKET).upload(path, png, { contentType: "image/png" });
    if (error) throw error;
    const urls = await signPaths([path]);
    return NextResponse.json({ path, url: urls.get(path) ?? null });
  } catch (err) {
    console.error("sketch failed", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Sketch generation failed" }, { status: 502 });
  }
}
