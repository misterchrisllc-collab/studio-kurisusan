import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod/v4";
import type { VideoFormat } from "./types";

/**
 * Server-side AI integrations. Keys are read from env only and never reach the
 * browser; the UI asks aiStatus() which features are configured.
 *
 *   ANTHROPIC_API_KEY   → "Organize My Ideas" (Claude)
 *   OPENAI_API_KEY      → "Generate sketch" (OpenAI Images)
 *   STORYBOARD_IMAGE_MODEL (optional, default gpt-image-1)
 */
export function aiStatus() {
  return {
    organize: !!process.env.ANTHROPIC_API_KEY,
    sketch: !!process.env.OPENAI_API_KEY,
  };
}

// ── Organize My Ideas ──

export const proposedShotSchema = z.object({
  title: z.string(),
  description: z.string(),
  shot_size: z.string(),
  camera_angle: z.string(),
  camera_movement: z.string(),
  subject_action: z.string(),
  script: z.string(),
  audio_notes: z.string(),
  duration_seconds: z.number(),
});
export type ProposedShot = z.infer<typeof proposedShotSchema>;

const outputSchema = z.object({ shots: z.array(proposedShotSchema) });

const SYSTEM = `You are a first assistant director helping a photographer and video creator turn rough spoken or typed notes into a storyboard shot list.

Return the shots in the order they should appear in the edit. One shot per distinct camera setup or cut; don't invent scenes the notes don't imply, but do split a sentence into several shots when it clearly describes several cuts.

For each shot:
- title: 2–5 words.
- description: what the frame shows, concrete and visual.
- shot_size: one of Extreme wide (EWS), Wide (WS), Full (FS), Medium wide (MWS), Medium (MS), Medium close-up (MCU), Close-up (CU), Extreme close-up (ECU), Insert / detail, Over the shoulder (OTS), Two shot, POV.
- camera_angle: e.g. Eye level, High angle, Low angle, Overhead / top-down, Dutch tilt.
- camera_movement: e.g. Static / locked off, Handheld, Pan, Tilt, Push in (dolly in), Pull out (dolly out), Truck / slide, Gimbal follow, Orbit.
- subject_action: what the subject does during the shot; empty string if nothing.
- script: dialogue, on-screen text or voice-over only if the notes give or clearly imply one; otherwise empty string.
- audio_notes: sound effects, music cues or ambient sound.
- duration_seconds: a realistic estimate for a social/commercial edit. If a target runtime is given, aim for the total to land near it.

Write every text field in the same language as the notes (Japanese notes → Japanese; English notes → English), except shot_size, camera_angle and camera_movement, which stay in the English terms above.`;

export async function organizeNotes(input: {
  notes: string;
  format: VideoFormat;
  targetSeconds: number | null;
  existingShots: number;
}): Promise<ProposedShot[]> {
  const client = new Anthropic();
  const context = [
    `Video format: ${input.format}.`,
    input.targetSeconds ? `Target runtime: ${input.targetSeconds} seconds.` : "No target runtime set.",
    input.existingShots ? `The storyboard already has ${input.existingShots} shot(s); these new shots will be added after them.` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const response = await client.beta.messages.parse({
    model: "claude-opus-5-5",
    max_tokens: 16000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { effort: "medium", format: betaZodOutputFormat(outputSchema) },
    system: SYSTEM,
    messages: [{ role: "user", content: `${context}\n\n<notes>\n${input.notes}\n</notes>` }],
  });

  if (response.stop_reason === "refusal") throw new Error("The AI declined to organize these notes.");
  if (response.stop_reason === "max_tokens") throw new Error("Those notes produced too many shots at once. Try a shorter section.");
  const parsed = response.parsed_output;
  if (!parsed) throw new Error("The AI reply couldn't be read. Try again.");
  return parsed.shots.map((s) => ({
    ...s,
    duration_seconds: Math.max(0, Math.min(36000, Math.round(s.duration_seconds * 2) / 2)),
  }));
}

// ── Sketch generation ──

const SIZES: Record<VideoFormat, string> = { "16:9": "1536x1024", "9:16": "1024x1536", "1:1": "1024x1024" };

export function sketchPrompt(shot: {
  description: string;
  shot_size: string;
  camera_angle: string;
  camera_movement: string;
  subject_action: string;
  lighting_notes: string;
  title: string;
}, format: VideoFormat): string {
  const parts = [
    "Rough storyboard sketch for a film pre-production storyboard: loose black pencil and grey marker on white paper,",
    "quick gestural linework, simple shading, rough perspective lines, monochrome only.",
    "It must look hand-drawn and unfinished, like a storyboard artist's thumbnail: not a photograph, not a polished illustration, no colour, no text, no frame border, no captions.",
    `Frame: ${format === "9:16" ? "vertical 9:16" : format === "1:1" ? "square" : "horizontal 16:9"}.`,
    shot.shot_size && `Shot size: ${shot.shot_size}.`,
    shot.camera_angle && `Camera angle: ${shot.camera_angle}.`,
    shot.camera_movement && `Camera movement (suggest with an arrow if useful): ${shot.camera_movement}.`,
    `Scene: ${shot.description || shot.title}.`,
    shot.subject_action && `Action: ${shot.subject_action}.`,
    shot.lighting_notes && `Lighting mood: ${shot.lighting_notes}.`,
  ];
  return parts.filter(Boolean).join(" ").slice(0, 3800);
}

export async function generateSketch(prompt: string, format: VideoFormat): Promise<Buffer> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("Sketch generation isn't set up (OPENAI_API_KEY missing).");
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.STORYBOARD_IMAGE_MODEL || "gpt-image-1",
      prompt,
      size: SIZES[format],
      quality: "medium",
      n: 1,
    }),
    cache: "no-store",
  });
  const json = (await res.json().catch(() => ({}))) as { data?: { b64_json?: string }[]; error?: { message?: string } };
  if (!res.ok) throw new Error(`Image API error: ${json.error?.message ?? res.status}`);
  const b64 = json.data?.[0]?.b64_json;
  if (!b64) throw new Error("The image API returned no image.");
  return Buffer.from(b64, "base64");
}
