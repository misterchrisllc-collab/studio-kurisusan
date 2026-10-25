"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useRef, useState } from "react";
import type { ShotPatch } from "@/app/admin/storyboards/actions";
import { isEmptyDrawing } from "@/lib/storyboards/drawing";
import { CAMERA_ANGLES, CAMERA_MOVEMENTS, SHOT_SIZES, type Background, type ShotView, type VideoFormat } from "@/lib/storyboards/types";
import Field from "./Field";
import FrameView from "./FrameView";

export type ShotCardProps = {
  shot: ShotView;
  index: number;
  count: number;
  format: VideoFormat;
  busy?: string;
  sketchEnabled: boolean;
  onPatch: (patch: ShotPatch) => void;
  onMove: (dir: -1 | 1) => void;
  onInsertAfter: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onUpload: (file: File) => void;
  onRemoveImage: (kind: "reference" | "sketch") => void;
  onDraw: () => void;
  onSketch: () => void;
};

export default function ShotCard(p: ShotCardProps) {
  const { shot } = p;
  const sortable = useSortable({ id: shot.id });
  const file = useRef<HTMLInputElement>(null);
  const hasDetails = !!(shot.subject_action || shot.audio_notes || shot.lighting_notes || shot.production_notes);
  const [details, setDetails] = useState(hasDetails);
  const num = String(p.index + 1).padStart(2, "0");

  const backgrounds: { v: Background; label: string }[] = [
    { v: "none", label: "Blank" },
    ...(shot.reference_url ? [{ v: "reference" as const, label: "Reference" }] : []),
    ...(shot.sketch_url ? [{ v: "sketch" as const, label: "Sketch" }] : []),
  ];

  return (
    <article
      ref={sortable.setNodeRef}
      className={`sb-card${sortable.isDragging ? " dragging" : ""}`}
      style={{ transform: CSS.Translate.toString(sortable.transform), transition: sortable.transition }}
    >
      <div className="sb-card-head">
        <button className="sb-handle" {...sortable.attributes} {...sortable.listeners} aria-label={`Drag to reorder shot ${num}`}>
          <svg viewBox="0 0 12 20" aria-hidden><circle cx="3" cy="4" r="1.6"/><circle cx="9" cy="4" r="1.6"/><circle cx="3" cy="10" r="1.6"/><circle cx="9" cy="10" r="1.6"/><circle cx="3" cy="16" r="1.6"/><circle cx="9" cy="16" r="1.6"/></svg>
        </button>
        <span className="sb-num">{num}</span>
        <input
          className="sb-title-input"
          value={shot.title}
          placeholder="Shot title"
          maxLength={300}
          onChange={(e) => p.onPatch({ title: e.target.value })}
          aria-label={`Shot ${num} title`}
        />
        <label className="sb-dur" title="Estimated duration in seconds">
          <input
            type="number"
            inputMode="decimal"
            min={0}
            max={36000}
            step={0.5}
            value={shot.duration_seconds ?? ""}
            placeholder="–"
            onChange={(e) => {
              const v = e.target.value === "" ? null : Math.max(0, Math.min(36000, Number(e.target.value)));
              p.onPatch({ duration_seconds: v == null || Number.isNaN(v) ? null : v });
            }}
            aria-label={`Shot ${num} duration in seconds`}
          />
          <span>sec</span>
        </label>
      </div>

      <div className="sb-visual">
        <FrameView shot={shot} format={p.format} onClick={p.onDraw} label={`Draw on shot ${num}`} />
        {p.busy && <div className="sb-busy">{p.busy}</div>}
        <div className="sb-visual-tools">
          <button className="adm-btn small" onClick={p.onDraw}>
            {isEmptyDrawing(shot.drawing) ? "Draw" : "Edit drawing"}
          </button>
          <button className="adm-btn small" onClick={() => file.current?.click()}>
            {shot.reference_url ? "Replace reference" : "Upload reference"}
          </button>
          <button
            className="adm-btn small"
            onClick={p.onSketch}
            disabled={!p.sketchEnabled}
            title={p.sketchEnabled ? undefined : "Needs an image API key on the server (see setup notes)"}
          >
            {shot.sketch_url ? "New sketch" : "Generate sketch"}
          </button>
          <input
            ref={file}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0];
              e.target.value = "";
              if (f) p.onUpload(f);
            }}
          />
        </div>
        {backgrounds.length > 1 && (
          <div className="sb-bg-switch" role="group" aria-label="Frame background">
            {backgrounds.map((b) => (
              <button key={b.v} className={shot.background === b.v ? "on" : ""} onClick={() => p.onPatch({ background: b.v })}>
                {b.label}
              </button>
            ))}
            {shot.reference_url && (
              <button className="sb-x" onClick={() => p.onRemoveImage("reference")} title="Remove the reference image (the drawing stays)">
                Remove reference
              </button>
            )}
            {shot.sketch_url && (
              <button className="sb-x" onClick={() => p.onRemoveImage("sketch")} title="Remove the sketch (the drawing stays)">
                Remove sketch
              </button>
            )}
          </div>
        )}
      </div>

      <div className="sb-fields">
        <Field label="Description" multiline value={shot.description} onChange={(v) => p.onPatch({ description: v })}
          placeholder="What we see" />
        <div className="sb-row3">
          <Field label="Shot size" mic={false} value={shot.shot_size} suggestions={SHOT_SIZES} maxLength={200}
            onChange={(v) => p.onPatch({ shot_size: v })} />
          <Field label="Angle" mic={false} value={shot.camera_angle} suggestions={CAMERA_ANGLES} maxLength={200}
            onChange={(v) => p.onPatch({ camera_angle: v })} />
          <Field label="Movement" mic={false} value={shot.camera_movement} suggestions={CAMERA_MOVEMENTS} maxLength={200}
            onChange={(v) => p.onPatch({ camera_movement: v })} />
        </div>
        <Field label="Script / dialogue / VO" multiline value={shot.script} maxLength={20000}
          onChange={(v) => p.onPatch({ script: v })} />

        <button className="sb-more" onClick={() => setDetails((v) => !v)} aria-expanded={details}>
          {details ? "− Fewer details" : `+ Action, sound, lighting, notes${hasDetails ? " ●" : ""}`}
        </button>
        {details && (
          <>
            <Field label="Subject movement / action" multiline value={shot.subject_action}
              onChange={(v) => p.onPatch({ subject_action: v })} />
            <Field label="Sound effects / audio" multiline value={shot.audio_notes}
              onChange={(v) => p.onPatch({ audio_notes: v })} />
            <Field label="Lighting" multiline value={shot.lighting_notes}
              onChange={(v) => p.onPatch({ lighting_notes: v })} />
            <Field label="Production notes" multiline value={shot.production_notes} maxLength={20000}
              onChange={(v) => p.onPatch({ production_notes: v })} />
          </>
        )}
      </div>

      <div className="sb-card-foot">
        <button className="adm-link" onClick={() => p.onMove(-1)} disabled={p.index === 0} aria-label="Move earlier">↑</button>
        <button className="adm-link" onClick={() => p.onMove(1)} disabled={p.index === p.count - 1} aria-label="Move later">↓</button>
        <span className="sb-spacer" />
        <button className="adm-link" onClick={p.onInsertAfter}>Insert after</button>
        <button className="adm-link" onClick={p.onDuplicate}>Duplicate</button>
        <button className="adm-link danger" onClick={p.onDelete}>Delete</button>
      </div>
    </article>
  );
}
