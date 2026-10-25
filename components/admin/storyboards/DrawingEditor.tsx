"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  fitBox,
  isFree,
  renderDrawing,
  renderStroke,
  type Drawing,
  type Point,
  type Stroke,
} from "@/lib/storyboards/drawing";
import { FORMAT_LABEL, type ShotView, type VideoFormat } from "@/lib/storyboards/types";
import { artAspect, backgroundUrl } from "./FrameView";

type Tool = "pen" | "eraser" | "line" | "arrow";

const COLORS = [
  { c: "#111111", name: "Black" },
  { c: "#7a7a7a", name: "Grey" },
  { c: "#e8198b", name: "Magenta" },
  { c: "#1f6fd1", name: "Blue" },
];
const SIZES = [2, 4, 8, 16, 32];
const HISTORY = 200;

const r4 = (n: number) => Math.round(n * 10000) / 10000;

/**
 * Full-screen drawing surface for one shot. Built on pointer events so Apple
 * Pencil (with pressure), finger, mouse and trackpad all draw. Once a Pencil
 * touches the canvas, finger touches stop drawing (palm rejection) until
 * "Finger draws" is switched back on. Every finished stroke is handed to
 * onChange, which autosaves, so closing the tab never loses more than the
 * stroke in progress.
 */
export default function DrawingEditor({
  shot,
  format,
  number,
  onChange,
  onClose,
}: {
  shot: ShotView;
  format: VideoFormat;
  number: number;
  onChange: (d: Drawing | null) => void;
  onClose: () => void;
}) {
  const aspect = artAspect(shot.drawing, format);
  const [hist, setHist] = useState<{ past: Stroke[][]; present: Stroke[]; future: Stroke[][] }>({
    past: [],
    present: shot.drawing?.strokes ?? [],
    future: [],
  });
  const strokes = hist.present;
  const [tool, setTool] = useState<Tool>("pen");
  const [color, setColor] = useState(COLORS[0].c);
  const [size, setSize] = useState(4);
  const [eraserSize, setEraserSize] = useState(16);
  const [fingerDraws, setFingerDraws] = useState(true);
  const [sawPencil, setSawPencil] = useState(false);
  const [bgOpacity, setBgOpacity] = useState(1);
  const [box, setBox] = useState({ w: 0, h: 0 });

  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const cache = useRef<HTMLCanvasElement | null>(null);
  const live = useRef<{ id: number; stroke: Stroke } | null>(null);
  const raf = useRef(0);
  const histRef = useRef(hist);
  histRef.current = hist;

  const bg = backgroundUrl(shot);

  // ── layout: biggest box of the art aspect that fits the stage ──
  useLayoutEffect(() => {
    const el = stage.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      const b = fitBox(r.width, r.height, aspect);
      setBox({ w: Math.floor(b.w), h: Math.floor(b.h) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [aspect]);

  // ── rendering: committed strokes are cached in an offscreen canvas ──
  const paint = useCallback(() => {
    const el = canvas.current;
    const c = cache.current;
    if (!el || !c) return;
    const ctx = el.getContext("2d")!;
    ctx.clearRect(0, 0, el.width, el.height);
    ctx.drawImage(c, 0, 0);
    if (live.current) renderStroke(ctx, live.current.stroke, el.width, el.height);
  }, []);

  useEffect(() => {
    const el = canvas.current;
    if (!el || !box.w) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    el.width = Math.round(box.w * dpr);
    el.height = Math.round(box.h * dpr);
    const c = cache.current ?? document.createElement("canvas");
    c.width = el.width;
    c.height = el.height;
    cache.current = c;
    renderDrawing(c, strokes);
    paint();
  }, [box, strokes, paint]);

  // ── history ──
  const apply = useCallback(
    (h: typeof hist) => {
      histRef.current = h;
      setHist(h);
      onChange(h.present.length ? { v: 1, aspect, strokes: h.present } : null);
    },
    [aspect, onChange],
  );

  const commit = useCallback(
    (next: Stroke[]) => {
      const h = histRef.current;
      apply({ past: [...h.past.slice(-HISTORY + 1), h.present], present: next, future: [] });
    },
    [apply],
  );

  const undo = useCallback(() => {
    const h = histRef.current;
    if (!h.past.length) return;
    apply({ past: h.past.slice(0, -1), present: h.past[h.past.length - 1], future: [h.present, ...h.future] });
  }, [apply]);

  const redo = useCallback(() => {
    const h = histRef.current;
    if (!h.future.length) return;
    apply({ past: [...h.past, h.present], present: h.future[0], future: h.future.slice(1) });
  }, [apply]);

  const clear = () => {
    if (!strokes.length) return;
    if (window.confirm("Clear the whole drawing? (Undo can bring it back while this editor is open.)")) commit([]);
  };

  // ── input ──
  const toPoint = (e: PointerEvent | React.PointerEvent, rect: DOMRect): Point => [
    r4(Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))),
    r4(Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height))),
    e.pointerType === "pen" ? Math.round(e.pressure * 100) / 100 : 0.5,
  ];

  const onDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.pointerType === "pen" && !sawPencil) {
      setSawPencil(true);
      setFingerDraws(false);
    }
    if (e.pointerType === "touch" && !fingerDraws) return;
    if (live.current || (e.pointerType === "mouse" && e.button !== 0)) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    const rect = e.currentTarget.getBoundingClientRect();
    const p = toPoint(e, rect);
    const w = (tool === "eraser" ? eraserSize : size) / 1000;
    const stroke: Stroke =
      tool === "pen" || tool === "eraser"
        ? { t: tool, c: tool === "eraser" ? "#000000" : color, w, pts: [p] }
        : { t: tool, c: color, w, a: [p[0], p[1]], b: [p[0], p[1]] };
    live.current = { id: e.pointerId, stroke };
    paint();
  };

  const onMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const l = live.current;
    if (!l || l.id !== e.pointerId) return;
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const s = l.stroke;
    if (isFree(s)) {
      const native = e.nativeEvent;
      const events = typeof native.getCoalescedEvents === "function" ? native.getCoalescedEvents() : [native];
      for (const ev of events.length ? events : [native]) {
        const p = toPoint(ev, rect);
        const last = s.pts[s.pts.length - 1];
        if (Math.hypot(p[0] - last[0], p[1] - last[1]) < 0.0015) continue;
        s.pts.push(p);
      }
    } else {
      const p = toPoint(e, rect);
      s.b = [p[0], p[1]];
    }
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(paint);
  };

  const onUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const l = live.current;
    if (!l || l.id !== e.pointerId) return;
    live.current = null;
    const s = l.stroke;
    const tiny = !isFree(s) && Math.hypot(s.b[0] - s.a[0], s.b[1] - s.a[1]) < 0.01;
    if (!tiny) commit([...histRef.current.present, s]);
    else paint();
  };

  // iOS Safari: block scroll, zoom and the text-selection loupe while the pencil is down.
  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const block = (e: TouchEvent) => e.preventDefault();
    el.addEventListener("touchstart", block, { passive: false });
    el.addEventListener("touchmove", block, { passive: false });
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      el.removeEventListener("touchstart", block);
      el.removeEventListener("touchmove", block);
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [undo, redo, onClose]);

  const sizeNow = tool === "eraser" ? eraserSize : size;
  const setSizeNow = tool === "eraser" ? setEraserSize : setSize;
  const drawnAt = shot.drawing && shot.drawing.strokes.length && Math.abs(shot.drawing.aspect - (format === "16:9" ? 16 / 9 : format === "9:16" ? 9 / 16 : 1)) > 0.01;

  return (
    <div className="sb-draw" role="dialog" aria-modal="true" aria-label={`Drawing for shot ${number}`}>
      <div className="sb-draw-bar">
        <div className="sb-seg" role="group" aria-label="Tool">
          {(["pen", "eraser", "line", "arrow"] as Tool[]).map((t) => (
            <button key={t} className={tool === t ? "on" : ""} onClick={() => setTool(t)}>
              {t === "pen" ? "Pen" : t === "eraser" ? "Eraser" : t === "line" ? "Line" : "Arrow"}
            </button>
          ))}
        </div>

        <div className="sb-sizes" role="group" aria-label="Brush size">
          {SIZES.map((s) => (
            <button key={s} className={sizeNow === s ? "on" : ""} onClick={() => setSizeNow(s)} aria-label={`Size ${s}`}>
              <span style={{ width: Math.min(28, 3 + s * 0.8), height: Math.min(28, 3 + s * 0.8) }} />
            </button>
          ))}
          <input type="range" min={1} max={60} value={sizeNow} onChange={(e) => setSizeNow(Number(e.target.value))} aria-label="Brush size" />
        </div>

        {tool !== "eraser" && (
          <div className="sb-colors" role="group" aria-label="Colour">
            {COLORS.map((c) => (
              <button key={c.c} className={color === c.c ? "on" : ""} style={{ background: c.c }} onClick={() => setColor(c.c)} aria-label={c.name} />
            ))}
          </div>
        )}

        <div className="sb-seg" role="group" aria-label="History">
          <button onClick={undo} disabled={!hist.past.length}>Undo</button>
          <button onClick={redo} disabled={!hist.future.length}>Redo</button>
          <button onClick={clear} disabled={!strokes.length}>Clear</button>
        </div>

        {bg && (
          <label className="sb-opacity">
            Image
            <input type="range" min={0} max={1} step={0.05} value={bgOpacity} onChange={(e) => setBgOpacity(Number(e.target.value))} />
          </label>
        )}

        {sawPencil && (
          <label className="sb-check">
            <input type="checkbox" checked={fingerDraws} onChange={(e) => setFingerDraws(e.target.checked)} />
            Finger draws
          </label>
        )}

        <span className="sb-spacer" />
        <span className="sb-draw-title">Shot {String(number).padStart(2, "0")}</span>
        <button className="adm-btn primary" onClick={onClose}>Done</button>
      </div>

      {drawnAt && (
        <p className="sb-draw-note">
          Drawn in a different format, so it&rsquo;s letterboxed inside the {FORMAT_LABEL[format]} frame. Nothing was cropped.
        </p>
      )}

      <div className="sb-draw-stage" ref={stage}>
        <div className="sb-draw-box" style={{ width: box.w, height: box.h }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {bg && <img src={bg} alt="" draggable={false} style={{ opacity: bgOpacity }} />}
          <canvas
            ref={canvas}
            style={{ width: box.w, height: box.h, cursor: tool === "eraser" ? "cell" : "crosshair" }}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      </div>
    </div>
  );
}
