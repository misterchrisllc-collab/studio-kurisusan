"use client";

import { aspectOf, type VideoFormat } from "@/lib/storyboards/types";

/** Shows a generated candidate next to nothing else: keep it, try another, or throw it away. */
export default function SketchReview({
  url,
  format,
  number,
  replacing,
  busy,
  onKeep,
  onAgain,
  onDiscard,
}: {
  url: string | null;
  format: VideoFormat;
  number: number;
  replacing: boolean;
  busy: string | null;
  onKeep: () => void;
  onAgain: () => void;
  onDiscard: () => void;
}) {
  return (
    <div className="sb-modal" role="dialog" aria-modal="true" aria-label={`Generated sketch for shot ${number}`}>
      <div className="sb-modal-card">
        <div className="sb-modal-head">
          <h2>Sketch for shot {String(number).padStart(2, "0")}</h2>
        </div>
        <div className="sb-frame sb-sketch-preview" style={{ aspectRatio: String(aspectOf(format)) }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {url ? <img src={url} alt="Generated storyboard sketch" /> : <span className="sb-busy">{busy}</span>}
        </div>
        <p className="adm-muted">
          {replacing ? "Keeping it replaces the current sketch. " : ""}Your reference image and drawing stay as they are.
        </p>
        <div className="sb-modal-actions">
          <button className="adm-btn" onClick={onDiscard} disabled={!!busy}>Discard</button>
          <button className="adm-btn" onClick={onAgain} disabled={!!busy}>Another variation</button>
          <button className="adm-btn primary" onClick={onKeep} disabled={!!busy || !url}>Keep this sketch</button>
        </div>
      </div>
    </div>
  );
}
