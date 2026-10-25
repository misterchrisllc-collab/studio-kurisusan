import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin-auth";
import { aiStatus, organizeNotes, storyContext } from "@/lib/storyboards/ai";
import type { Project } from "@/lib/storyboards/types";
import { db } from "@/lib/storyboards/server";

export const runtime = "nodejs";
export const maxDuration = 120;

const body = z.object({
  projectId: z.string().uuid(),
  notes: z.string().trim().min(1, "Add some notes first.").max(20000, "Notes are too long (max 20,000 characters)."),
});

/** Returns PROPOSED shots only. Nothing is written; the editor adds the ones you approve. */
export async function POST(req: Request) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
  if (!aiStatus().organize) {
    return NextResponse.json({ error: "Organize My Ideas isn't set up: add ANTHROPIC_API_KEY on the server." }, { status: 503 });
  }
  const parsed = body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid request" }, { status: 400 });

  const { data: project } = await db()
    .from("storyboard_projects")
    .select("*, storyboard_shots(count)")
    .eq("id", parsed.data.projectId)
    .maybeSingle();
  if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

  try {
    const shots = await organizeNotes({
      notes: parsed.data.notes,
      format: project.format,
      targetSeconds: project.target_seconds,
      existingShots: (project.storyboard_shots as unknown as { count: number }[])?.[0]?.count ?? 0,
      story: storyContext(project as Project),
    });
    return NextResponse.json({ shots });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) return NextResponse.json({ error: "The AI is busy. Try again in a minute." }, { status: 429 });
    if (err instanceof Anthropic.AuthenticationError) return NextResponse.json({ error: "The Anthropic API key was rejected." }, { status: 502 });
    if (err instanceof Anthropic.BadRequestError) {
      // e.g. "Your credit balance is too low…": safe to show, and the only way to know what to fix.
      const detail = (err.error as { error?: { message?: string } } | undefined)?.error?.message;
      return NextResponse.json({ error: `AI request rejected: ${detail ?? err.message}` }, { status: 502 });
    }
    if (err instanceof Anthropic.APIError) return NextResponse.json({ error: `AI request failed (${err.status ?? "network"}).` }, { status: 502 });
    console.error("organize failed", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "AI request failed" }, { status: 500 });
  }
}
