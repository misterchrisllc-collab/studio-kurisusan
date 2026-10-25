import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod/v4";
import { SUGGESTION_CATEGORIES, type Project, type Shot, type VideoFormat } from "./types";

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
  story?: string;
}): Promise<ProposedShot[]> {
  const client = new Anthropic();
  const context = [
    input.story ? `Overall story of the video (for context; the notes below are what to turn into shots):\n${input.story}\n` : "",
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

/** The Story tab as a block of text for prompts. Empty fields are left out. */
export function storyContext(p: Pick<Project, "title" | "client_name" | "description" | "logline" | "story" | "tone" | "audience" | "locations" | "music" | "format" | "target_seconds">): string {
  return [
    ["Title", p.title],
    ["Client", p.client_name],
    ["Description", p.description],
    ["Logline", p.logline],
    ["Story", p.story],
    ["Tone & mood", p.tone],
    ["Audience & goal", p.audience],
    ["Locations", p.locations],
    ["Music & sound", p.music],
    ["Format", p.format],
    ["Target runtime", p.target_seconds ? `${p.target_seconds}s` : ""],
  ]
    .filter(([, v]) => v && String(v).trim())
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
}

// ── Suggest setups ──

const suggestionSchema = z.object({
  suggestions: z.array(z.object({ category: z.enum(SUGGESTION_CATEGORIES), text: z.string() })),
});

const SUGGEST_SYSTEM = `You help a photographer and video creator prepare a shoot. You are shown the overall story of a video, the full shot list, and one shot to look at closely.

Give up to 5 practical suggestions for that one shot: things that would make it work better on the day and that are NOT already decided in its details. Read every field of the shot first; never repeat or restate something already written there (if the camera movement says "push in", don't suggest a push in). Prefer concrete, shootable advice: a focal length or aperture, a frame rate for slow motion, where to put a light, a practical to switch on, a sound to record wild, a prop or gear item, a moment of action to wait for, how the shot cuts with its neighbours, or how it serves the story.

Each suggestion is one or two short sentences, starts with the action, and gets one category: Framing, Lens & camera, Lighting, Sound, Gear, Direction, Story or Other. Fewer, sharper suggestions beat filler: return fewer than 5 if that's all that's genuinely useful.

Write in the same language as the shot's details (Japanese details → Japanese suggestions).`;

export async function suggestSetups(input: {
  project: Parameters<typeof storyContext>[0];
  shots: Pick<Shot, "id" | "title" | "description" | "shot_size" | "camera_angle" | "camera_movement" | "duration_seconds">[];
  shot: Shot;
}): Promise<{ category: (typeof SUGGESTION_CATEGORIES)[number]; text: string }[]> {
  const client = new Anthropic();
  const n = input.shots.findIndex((s) => s.id === input.shot.id) + 1;
  const list = input.shots
    .map((s, i) => `${String(i + 1).padStart(2, "0")}${s.id === input.shot.id ? " ← THIS SHOT" : ""}: ${[s.title, s.shot_size, s.camera_angle, s.camera_movement, s.description].filter((v) => v && String(v).trim()).join(" | ")}${s.duration_seconds ? ` (${s.duration_seconds}s)` : ""}`)
    .join("\n");
  const sh = input.shot;
  const details = [
    ["Title", sh.title], ["Description", sh.description], ["Shot size", sh.shot_size], ["Camera angle", sh.camera_angle],
    ["Camera movement", sh.camera_movement], ["Subject action", sh.subject_action], ["Script / VO", sh.script],
    ["Sound", sh.audio_notes], ["Lighting", sh.lighting_notes], ["Duration", sh.duration_seconds ? `${sh.duration_seconds}s` : ""],
    ["Production notes", sh.production_notes],
  ].map(([k, v]) => `${k}: ${v && String(v).trim() ? v : "(not decided)"}`).join("\n");

  const response = await client.beta.messages.parse({
    model: "claude-opus-5-5",
    max_tokens: 4000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { effort: "medium", format: betaZodOutputFormat(suggestionSchema) },
    system: SUGGEST_SYSTEM,
    messages: [{
      role: "user",
      content: `<story>\n${storyContext(input.project) || "(no story written yet)"}\n</story>\n\n<shot_list>\n${list}\n</shot_list>\n\n<shot number="${n}">\n${details}\n</shot>`,
    }],
  });
  if (response.stop_reason === "refusal") throw new Error("The AI declined to suggest setups for this shot.");
  const parsed = response.parsed_output;
  if (!parsed) throw new Error("The AI reply couldn't be read. Try again.");
  return parsed.suggestions.filter((x) => x.text.trim()).slice(0, 5).map((x) => ({ ...x, text: x.text.trim().slice(0, 1000) }));
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
