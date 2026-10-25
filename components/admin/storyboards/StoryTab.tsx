"use client";

import type { ProjectPatch } from "@/app/admin/storyboards/actions";
import type { Project } from "@/lib/storyboards/types";
import Field from "./Field";

/** The whole video in words. Feeds "Organize My Ideas" and "Suggest setups" as context. */
export default function StoryTab({
  project,
  onPatch,
  onTurnIntoShots,
}: {
  project: Project;
  onPatch: (patch: ProjectPatch) => void;
  /** Only passed when an AI key is configured; otherwise the AI controls aren't shown at all. */
  onTurnIntoShots?: () => void;
}) {
  return (
    <section className="sb-tabpanel sb-story">
      <Field label="Logline" value={project.logline} maxLength={500} onChange={(v) => onPatch({ logline: v })}
        placeholder="The whole video in one sentence" />
      <Field label="Story" multiline value={project.story} maxLength={50000} onChange={(v) => onPatch({ story: v })}
        placeholder="Beginning, middle, end. What happens, what we feel, how it lands." className="sb-story-main" />
      <div className="sb-story-grid">
        <Field label="Tone & mood" multiline value={project.tone} maxLength={5000} onChange={(v) => onPatch({ tone: v })}
          placeholder="Warm, documentary, night, film grain…" />
        <Field label="Audience & goal" multiline value={project.audience} maxLength={5000} onChange={(v) => onPatch({ audience: v })}
          placeholder="Who watches it, and what should they do after?" />
        <Field label="Locations" multiline value={project.locations} maxLength={5000} onChange={(v) => onPatch({ locations: v })}
          placeholder="Where, access, light at what time" />
        <Field label="Music & sound" multiline value={project.music} maxLength={5000} onChange={(v) => onPatch({ music: v })}
          placeholder="Track, tempo, VO, natural sound" />
      </div>
      {onTurnIntoShots && <div className="sb-story-actions">
        <span className="adm-muted">The story is also what the AI reads when it organizes notes or suggests setups.</span>
        <button className="adm-btn" onClick={onTurnIntoShots} disabled={!project.story.trim() && !project.logline.trim()}>
          Turn story into shots →
        </button>
      </div>}
    </section>
  );
}
