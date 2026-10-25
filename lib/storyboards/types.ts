import type { Drawing } from "./drawing";

export const FORMATS = ["16:9", "9:16", "1:1"] as const;
export type VideoFormat = (typeof FORMATS)[number];

export const FORMAT_LABEL: Record<VideoFormat, string> = {
  "16:9": "Horizontal 16:9",
  "9:16": "Vertical 9:16",
  "1:1": "Square 1:1",
};

/** width / height */
export function aspectOf(format: VideoFormat): number {
  return format === "16:9" ? 16 / 9 : format === "9:16" ? 9 / 16 : 1;
}

export type Background = "none" | "reference" | "sketch";

export const SUGGESTION_CATEGORIES = ["Framing", "Lens & camera", "Lighting", "Sound", "Gear", "Direction", "Story", "Other"] as const;
export type Suggestion = { id: string; category: (typeof SUGGESTION_CATEGORIES)[number]; text: string };

export type ProjectSummary = {
  id: string;
  title: string;
  client_name: string;
  description: string;
  format: VideoFormat;
  updated_at: string;
  shot_count: number;
};

export const STORY_FIELDS = ["logline", "story", "tone", "audience", "locations", "music"] as const;
export type StoryField = (typeof STORY_FIELDS)[number];

export type Project = {
  id: string;
  title: string;
  client_name: string;
  description: string;
  notes: string;
  logline: string;
  story: string;
  tone: string;
  audience: string;
  locations: string;
  music: string;
  format: VideoFormat;
  target_seconds: number | null;
  created_at: string;
  updated_at: string;
};

export type Shot = {
  id: string;
  project_id: string;
  position: number;
  title: string;
  description: string;
  shot_size: string;
  camera_angle: string;
  camera_movement: string;
  subject_action: string;
  script: string;
  audio_notes: string;
  lighting_notes: string;
  duration_seconds: number | null;
  production_notes: string;
  reference_path: string | null;
  sketch_path: string | null;
  background: Background;
  drawing: Drawing | null;
  filmed: boolean;
  suggestions: Suggestion[];
  updated_at: string;
};

/** A shot as the editor sees it: storage paths resolved to short-lived signed URLs. */
export type ShotView = Shot & {
  reference_url: string | null;
  sketch_url: string | null;
};

export const TEXT_FIELDS = [
  "title",
  "description",
  "shot_size",
  "camera_angle",
  "camera_movement",
  "subject_action",
  "script",
  "audio_notes",
  "lighting_notes",
  "production_notes",
] as const;
export type ShotTextField = (typeof TEXT_FIELDS)[number];

// Suggestions only: every field also accepts free text.
export const SHOT_SIZES = [
  "Extreme wide (EWS)",
  "Wide (WS)",
  "Full (FS)",
  "Medium wide (MWS)",
  "Medium (MS)",
  "Medium close-up (MCU)",
  "Close-up (CU)",
  "Extreme close-up (ECU)",
  "Insert / detail",
  "Over the shoulder (OTS)",
  "Two shot",
  "POV",
];

export const CAMERA_ANGLES = [
  "Eye level",
  "High angle",
  "Low angle",
  "Overhead / top-down",
  "Bird's eye",
  "Worm's eye",
  "Dutch tilt",
  "Over the shoulder",
  "POV",
];

export const CAMERA_MOVEMENTS = [
  "Static / locked off",
  "Handheld",
  "Pan",
  "Tilt",
  "Push in (dolly in)",
  "Pull out (dolly out)",
  "Truck / slide",
  "Gimbal follow",
  "Orbit",
  "Crane / jib",
  "Pedestal",
  "Zoom",
  "Rack focus",
  "Whip pan",
  "Drone",
];

export function totalSeconds(shots: Pick<Shot, "duration_seconds">[]): number {
  return shots.reduce((s, x) => s + (Number(x.duration_seconds) || 0), 0);
}

export function formatRuntime(seconds: number): string {
  const s = Math.round(seconds * 10) / 10;
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  return `${m}m ${Math.round(s - m * 60)}s`;
}
