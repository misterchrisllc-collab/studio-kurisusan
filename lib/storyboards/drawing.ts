import { getStroke } from "perfect-freehand";
import { z } from "zod";

/**
 * Drawings are stored as vector strokes, not pixels, so they can be reopened
 * and edited. Coordinates are normalised 0..1 against the drawing's own box,
 * and the box keeps the aspect it was drawn at: changing the project format
 * letterboxes a drawing instead of stretching it.
 *
 * Width `w` is relative to the box width, so strokes scale with the frame.
 */
export type Point = [number, number, number]; // x, y, pressure

export type FreeStroke = { t: "pen" | "eraser"; c: string; w: number; pts: Point[] };
export type LineStroke = { t: "line" | "arrow"; c: string; w: number; a: [number, number]; b: [number, number] };
export type Stroke = FreeStroke | LineStroke;

export type Drawing = { v: 1; aspect: number; strokes: Stroke[] };

export const isFree = (s: Stroke): s is FreeStroke => s.t === "pen" || s.t === "eraser";

const num = z.number().finite();
const color = z.string().regex(/^#[0-9a-fA-F]{6}$/);
const width = num.min(0.0005).max(0.2);

export const drawingSchema = z.object({
  v: z.literal(1),
  aspect: num.min(0.1).max(10),
  strokes: z
    .array(
      z.union([
        z.object({
          t: z.enum(["pen", "eraser"]),
          c: color,
          w: width,
          pts: z.array(z.tuple([num, num, num])).min(1).max(20000),
        }),
        z.object({
          t: z.enum(["line", "arrow"]),
          c: color,
          w: width,
          a: z.tuple([num, num]),
          b: z.tuple([num, num]),
        }),
      ]),
    )
    .max(5000),
});

export function isEmptyDrawing(d: Drawing | null | undefined): boolean {
  return !d || d.strokes.length === 0;
}

function outlinePath(points: number[][]): Path2D {
  const path = new Path2D();
  if (!points.length) return path;
  path.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    path.quadraticCurveTo(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
  }
  path.closePath();
  return path;
}

/** Draw one stroke onto a transparent canvas of size W x H (CSS px already scaled). */
export function renderStroke(ctx: CanvasRenderingContext2D, s: Stroke, W: number, H: number) {
  ctx.save();
  ctx.globalCompositeOperation = s.t === "eraser" ? "destination-out" : "source-over";
  ctx.fillStyle = s.c;
  ctx.strokeStyle = s.c;
  const size = Math.max(0.5, s.w * W);

  if (isFree(s)) {
    const hasPressure = s.pts.some((p) => p[2] > 0 && p[2] !== 0.5);
    const outline = getStroke(
      s.pts.map(([x, y, p]) => [x * W, y * H, p]),
      {
        size,
        thinning: s.t === "eraser" ? 0 : 0.55,
        smoothing: 0.5,
        streamline: 0.4,
        simulatePressure: !hasPressure,
        last: true,
      },
    );
    if (s.pts.length === 1) {
      ctx.beginPath();
      ctx.arc(s.pts[0][0] * W, s.pts[0][1] * H, size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fill(outlinePath(outline));
    }
  } else {
    const ax = s.a[0] * W, ay = s.a[1] * H, bx = s.b[0] * W, by = s.b[1] * H;
    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.stroke();
    if (s.t === "arrow") {
      const ang = Math.atan2(by - ay, bx - ax);
      const head = Math.max(size * 4, 12);
      ctx.beginPath();
      ctx.moveTo(bx, by);
      ctx.lineTo(bx - head * Math.cos(ang - 0.45), by - head * Math.sin(ang - 0.45));
      ctx.moveTo(bx, by);
      ctx.lineTo(bx - head * Math.cos(ang + 0.45), by - head * Math.sin(ang + 0.45));
      ctx.stroke();
    }
  }
  ctx.restore();
}

/** Clear and redraw a whole drawing onto a canvas whose backing store is already sized. */
export function renderDrawing(canvas: HTMLCanvasElement, strokes: Stroke[]) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const s of strokes) renderStroke(ctx, s, canvas.width, canvas.height);
}

/** Largest w x h box of `aspect` that fits inside W x H. */
export function fitBox(W: number, H: number, aspect: number) {
  let w = W, h = W / aspect;
  if (h > H) { h = H; w = H * aspect; }
  return { w, h, x: (W - w) / 2, y: (H - h) / 2 };
}
