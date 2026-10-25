"use client";

import { useEffect, useRef } from "react";
import { isEmptyDrawing, renderDrawing, type Drawing } from "@/lib/storyboards/drawing";
import { aspectOf, type ShotView, type VideoFormat } from "@/lib/storyboards/types";

export function backgroundUrl(shot: Pick<ShotView, "background" | "reference_url" | "sketch_url">): string | null {
  if (shot.background === "reference") return shot.reference_url;
  if (shot.background === "sketch") return shot.sketch_url;
  return null;
}

/** Aspect of the art box: the drawing's own aspect once something is drawn, else the project format. */
export function artAspect(drawing: Drawing | null, format: VideoFormat): number {
  return drawing && !isEmptyDrawing(drawing) ? drawing.aspect : aspectOf(format);
}

/**
 * One storyboard frame: the frame takes the project format, the art inside
 * keeps its own aspect and is letterboxed, so switching format never stretches
 * or crops a drawing out of alignment with its image.
 */
export default function FrameView({
  shot,
  format,
  onClick,
  label,
}: {
  shot: Pick<ShotView, "background" | "reference_url" | "sketch_url" | "drawing">;
  format: VideoFormat;
  onClick?: () => void;
  label?: string;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const aspect = artAspect(shot.drawing, format);
  const bg = backgroundUrl(shot);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const draw = () => {
      const r = el.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      el.width = Math.max(1, Math.round(r.width * dpr));
      el.height = Math.max(1, Math.round(r.height * dpr));
      renderDrawing(el, shot.drawing?.strokes ?? []);
    };
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(el);
    return () => ro.disconnect();
  }, [shot.drawing]);

  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      type={onClick ? "button" : undefined}
      className="sb-frame"
      style={{ aspectRatio: String(aspectOf(format)) }}
      onClick={onClick}
      aria-label={label}
    >
      <span className="sb-art" style={{ ["--a" as string]: aspect }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {bg && <img src={bg} alt="" draggable={false} />}
        <canvas ref={canvas} />
      </span>
    </Tag>
  );
}
