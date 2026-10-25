import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin-auth";
import { aiStatus, suggestSetups } from "@/lib/storyboards/ai";
import { SHOT_COLUMNS, db, touchProject } from "@/lib/storyboards/server";
import type { Project, Shot, Suggestion } from "@/lib/storyboards/types";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * Asks Claude for up to 5 setup suggestions for one shot, using the Story tab
 * and the whole shot list as context. They are stored in the shot's
 * `suggestions` list, never in its own fields: nothing becomes part of the
 * plan until "Add to notes" is pressed.
 */
export async function POST(req: Request) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
  if (!aiStatus().organize) {
    return NextResponse.json({ error: "Suggestions aren't set up: add ANTHROPIC_API_KEY (with credit) on the server." }, { status: 503 });
  }
  const parsed = z.object({ shotId: z.string().uuid() }).safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const supabase = db();
  const { data: shot } = await supabase.from("storyboard_shots").select(SHOT_COLUMNS).eq("id", parsed.data.shotId).maybeSingle();
  if (!shot) return NextResponse.json({ error: "Shot not found" }, { status: 404 });
  const [{ data: project }, { data: shots }] = await Promise.all([
    supabase.from("storyboard_projects").select("*").eq("id", shot.project_id).single(),
    supabase.from("storyboard_shots").select("id, title, description, shot_size, camera_angle, camera_movement, duration_seconds").eq("project_id", shot.project_id).order("position"),
  ]);
  if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

  try {
    const fresh = await suggestSetups({ project: project as Project, shots: (shots ?? []) as Shot[], shot: shot as Shot });
    const suggestions: Suggestion[] = fresh.map((x) => ({ id: crypto.randomUUID(), ...x }));
    const { error } = await supabase
      .from("storyboard_shots")
      .update({ suggestions, updated_at: new Date().toISOString() })
      .eq("id", shot.id);
    if (error) throw error;
    await touchProject(shot.project_id);
    return NextResponse.json({ suggestions });
  } catch (err) {
    if (err instanceof Anthropic.BadRequestError) {
      const detail = (err.error as { error?: { message?: string } } | undefined)?.error?.message;
      return NextResponse.json({ error: `AI request rejected: ${detail ?? err.message}` }, { status: 502 });
    }
    if (err instanceof Anthropic.RateLimitError) return NextResponse.json({ error: "The AI is busy. Try again in a minute." }, { status: 429 });
    if (err instanceof Anthropic.APIError) return NextResponse.json({ error: `AI request failed (${err.status ?? "network"}).` }, { status: 502 });
    console.error("suggest failed", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "AI request failed" }, { status: 500 });
  }
}
