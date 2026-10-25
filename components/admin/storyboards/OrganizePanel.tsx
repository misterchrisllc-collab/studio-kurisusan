"use client";

import { useState } from "react";
import { appendShots } from "@/app/admin/storyboards/actions";
import { CAMERA_ANGLES, CAMERA_MOVEMENTS, SHOT_SIZES, formatRuntime, type ShotView } from "@/lib/storyboards/types";
import Field from "./Field";

type Proposal = {
  key: string;
  keep: boolean;
  title: string;
  description: string;
  shot_size: string;
  camera_angle: string;
  camera_movement: string;
  subject_action: string;
  script: string;
  audio_notes: string;
  duration_seconds: number | null;
};

/**
 * Rough notes → proposed shots. Proposals live only here until approved, and
 * approved ones are appended after the existing shots: nothing already in the
 * storyboard is changed.
 */
export default function OrganizePanel({
  projectId,
  initialNotes,
  enabled,
  existingCount,
  onAdded,
  onClose,
}: {
  projectId: string;
  initialNotes: string;
  enabled: boolean;
  existingCount: number;
  onAdded: (shots: ShotView[]) => void;
  onClose: () => void;
}) {
  const [notes, setNotes] = useState(initialNotes);
  const [proposals, setProposals] = useState<Proposal[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const organize = async () => {
    if (proposals?.length && !window.confirm("Replace the current proposals with a new set? (Your storyboard isn't affected.)")) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/storyboards/organize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, notes }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? `Request failed (${res.status})`);
      setProposals((json.shots as Omit<Proposal, "key" | "keep">[]).map((s) => ({ ...s, key: crypto.randomUUID(), keep: true })));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const edit = (key: string, patch: Partial<Proposal>) =>
    setProposals((ps) => ps!.map((p) => (p.key === key ? { ...p, ...patch } : p)));
  const move = (i: number, dir: -1 | 1) =>
    setProposals((ps) => {
      const next = [...ps!];
      const j = i + dir;
      if (j < 0 || j >= next.length) return next;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  const kept = proposals?.filter((p) => p.keep) ?? [];
  const keptSeconds = kept.reduce((s, p) => s + (p.duration_seconds ?? 0), 0);

  const add = async () => {
    if (!kept.length) return;
    setAdding(true);
    setError(null);
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const res = await appendShots(projectId, kept.map(({ key, keep, ...s }) => s));
    setAdding(false);
    if (!res.ok) return setError(res.error);
    onAdded(res.data);
    onClose();
  };

  const close = () => {
    if (proposals?.length && !window.confirm("Close and discard these proposals?")) return;
    onClose();
  };

  return (
    <div className="sb-modal" role="dialog" aria-modal="true" aria-label="Organize my ideas">
      <div className="sb-modal-card wide">
        <div className="sb-modal-head">
          <h2>Organize My Ideas</h2>
          <button className="adm-link" onClick={close}>Close</button>
        </div>

        {!enabled && (
          <p className="sb-setup">
            Not set up yet: this needs an Anthropic API key on the server (<code>ANTHROPIC_API_KEY</code>).
            Everything else in the storyboard works without it.
          </p>
        )}

        <Field
          label="Rough notes for the whole video"
          multiline
          value={notes}
          maxLength={20000}
          onChange={setNotes}
          placeholder="e.g. Start with a wide shot of the restaurant. Cut to the chef prepping. Close-up of meat hitting the grill…"
        />
        <div className="sb-modal-actions">
          <span className="adm-muted">
            Proposed shots are added after your {existingCount} existing shot{existingCount === 1 ? "" : "s"}. Nothing is overwritten.
          </span>
          <button className="adm-btn primary" onClick={organize} disabled={!enabled || loading || !notes.trim()}>
            {loading ? "Organizing…" : proposals ? "Organize again" : "Organize into shots"}
          </button>
        </div>
        {error && <p className="adm-error" role="alert">{error}</p>}

        {proposals && (
          <>
            <ol className="sb-proposals">
              {proposals.map((p, i) => (
                <li key={p.key} className={p.keep ? "" : "rejected"}>
                  <div className="sb-prop-head">
                    <span className="sb-num">{String(existingCount + i + 1).padStart(2, "0")}</span>
                    <input className="sb-title-input" value={p.title} onChange={(e) => edit(p.key, { title: e.target.value })} aria-label="Title" />
                    <label className="sb-dur">
                      <input type="number" inputMode="decimal" min={0} step={0.5} value={p.duration_seconds ?? ""}
                        onChange={(e) => edit(p.key, { duration_seconds: e.target.value === "" ? null : Math.max(0, Number(e.target.value)) })}
                        aria-label="Duration in seconds" />
                      <span>sec</span>
                    </label>
                  </div>
                  <Field label="Description" multiline mic={false} value={p.description} onChange={(v) => edit(p.key, { description: v })} />
                  <div className="sb-row3">
                    <Field label="Shot size" mic={false} value={p.shot_size} suggestions={SHOT_SIZES} onChange={(v) => edit(p.key, { shot_size: v })} />
                    <Field label="Angle" mic={false} value={p.camera_angle} suggestions={CAMERA_ANGLES} onChange={(v) => edit(p.key, { camera_angle: v })} />
                    <Field label="Movement" mic={false} value={p.camera_movement} suggestions={CAMERA_MOVEMENTS} onChange={(v) => edit(p.key, { camera_movement: v })} />
                  </div>
                  <div className="sb-row3">
                    <Field label="Script / VO" multiline mic={false} value={p.script} onChange={(v) => edit(p.key, { script: v })} />
                    <Field label="Audio" multiline mic={false} value={p.audio_notes} onChange={(v) => edit(p.key, { audio_notes: v })} />
                  </div>
                  <div className="sb-prop-foot">
                    <button className="adm-link" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move earlier">↑</button>
                    <button className="adm-link" onClick={() => move(i, 1)} disabled={i === proposals.length - 1} aria-label="Move later">↓</button>
                    <span className="sb-spacer" />
                    <label className="sb-check">
                      <input type="checkbox" checked={p.keep} onChange={(e) => edit(p.key, { keep: e.target.checked })} />
                      {p.keep ? "Approved" : "Rejected"}
                    </label>
                  </div>
                </li>
              ))}
            </ol>
            <div className="sb-modal-actions sticky">
              <span className="adm-muted">{kept.length} of {proposals.length} approved · {formatRuntime(keptSeconds)}</span>
              <button className="adm-btn primary" onClick={add} disabled={!kept.length || adding}>
                {adding ? "Adding…" : `Add ${kept.length} shot${kept.length === 1 ? "" : "s"} to storyboard`}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
