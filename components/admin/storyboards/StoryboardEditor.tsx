"use client";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, rectSortingStrategy, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  addShot,
  deleteShot,
  discardSketch,
  duplicateShot,
  keepSketch,
  removeShotImage,
  reorderShots,
  type ProjectPatch,
  type ShotPatch,
} from "@/app/admin/storyboards/actions";
import { isEmptyDrawing, type Drawing } from "@/lib/storyboards/drawing";
import {
  FORMATS,
  FORMAT_LABEL,
  formatRuntime,
  totalSeconds,
  type Project,
  type ShotView,
} from "@/lib/storyboards/types";
import { DictationProvider, DictationStatus } from "./Dictation";
import DrawingEditor from "./DrawingEditor";
import EditedAt from "./EditedAt";
import Field from "./Field";
import OrganizePanel from "./OrganizePanel";
import SketchReview from "./SketchReview";
import ShotCard from "./ShotCard";
import { useAutosave } from "./useAutosave";

const TARGETS = [15, 30, 60, 90];

/** Shrink a picked image to at most 2400px JPEG on the device before upload. */
async function downscale(file: File): Promise<Blob> {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, 2400 / Math.max(bmp.width, bmp.height));
  const c = document.createElement("canvas");
  c.width = Math.round(bmp.width * scale);
  c.height = Math.round(bmp.height * scale);
  c.getContext("2d")!.drawImage(bmp, 0, 0, c.width, c.height);
  bmp.close();
  return new Promise((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error("encode failed"))), "image/jpeg", 0.88));
}

type Props = {
  project: Project;
  shots: ShotView[];
  ai: { organize: boolean; sketch: boolean };
};

type SketchState = { shotId: string; path: string | null; url: string | null; busy: string | null };

export default function StoryboardEditor(props: Props) {
  return (
    <DictationProvider>
      <Editor {...props} />
    </DictationProvider>
  );
}

function Editor({ project: initialProject, shots: initialShots, ai }: Props) {
  const [project, setProject] = useState(initialProject);
  const [shots, setShots] = useState(initialShots);
  const [busy, setBusy] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [drawingId, setDrawingId] = useState<string | null>(null);
  const [organizing, setOrganizing] = useState(false);
  const [sketch, setSketch] = useState<SketchState | null>(null);
  const [showNotes, setShowNotes] = useState(!!initialProject.notes || !!initialProject.description);
  const [customTarget, setCustomTarget] = useState(
    initialProject.target_seconds != null && !TARGETS.includes(initialProject.target_seconds),
  );
  const save = useAutosave();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const total = useMemo(() => totalSeconds(shots), [shots]);
  const over = project.target_seconds != null && total > project.target_seconds;

  // ── local state + autosave ──
  const patchProject = (patch: ProjectPatch) => {
    setProject((p) => ({ ...p, ...patch, updated_at: new Date().toISOString() }));
    save.queue("project", project.id, patch);
  };

  const patchShot = useCallback(
    (id: string, patch: ShotPatch) => {
      setShots((ss) => ss.map((s) => (s.id === id ? { ...s, ...patch } : s)));
      setProject((p) => ({ ...p, updated_at: new Date().toISOString() }));
      save.queue("shot", id, patch);
    },
    [save],
  );

  const setShotDrawing = useCallback((id: string, d: Drawing | null) => patchShot(id, { drawing: d }), [patchShot]);

  const fail = (msg: string) => setError(msg);
  const withBusy = async (id: string, label: string, fn: () => Promise<void>) => {
    setBusy((b) => ({ ...b, [id]: label }));
    try {
      await fn();
    } finally {
      setBusy((b) => {
        const rest = { ...b };
        delete rest[id];
        return rest;
      });
    }
  };

  const reorderLocal = (order: string[], extra?: ShotView) =>
    setShots((ss) => {
      const map = new Map([...ss, ...(extra ? [extra] : [])].map((s) => [s.id, s]));
      return order.map((id, i) => ({ ...map.get(id)!, position: i }));
    });

  // ── structure ──
  const insertAfter = async (afterId: string | null) => {
    await save.flush();
    const res = await addShot(project.id, afterId);
    if (!res.ok) return fail(res.error);
    reorderLocal(res.data.order, res.data.shot);
  };

  const duplicate = async (id: string) => {
    await save.flush();
    await withBusy(id, "Duplicating…", async () => {
      const res = await duplicateShot(id);
      if (!res.ok) return fail(res.error);
      reorderLocal(res.data.order, res.data.shot);
    });
  };

  const remove = async (shot: ShotView, number: number) => {
    const hasContent =
      shot.reference_path || shot.sketch_path || !isEmptyDrawing(shot.drawing) ||
      [shot.title, shot.description, shot.script, shot.subject_action, shot.audio_notes, shot.lighting_notes, shot.production_notes].some((v) => v.trim());
    if (hasContent && !window.confirm(`Delete shot ${String(number).padStart(2, "0")}${shot.title ? ` "${shot.title}"` : ""} with its notes, drawing and images?`)) return;
    save.drop(shot.id);
    const before = shots;
    setShots((ss) => ss.filter((s) => s.id !== shot.id));
    const res = await deleteShot(shot.id);
    if (!res.ok) {
      setShots(before);
      return fail(res.error);
    }
    reorderLocal(res.data);
  };

  const persistOrder = async (next: ShotView[], before: ShotView[]) => {
    setShots(next.map((s, i) => ({ ...s, position: i })));
    const res = await reorderShots(project.id, next.map((s) => s.id));
    if (!res.ok) {
      setShots(before);
      fail(res.error);
    }
  };

  const onDragEnd = (e: DragEndEvent) => {
    if (!e.over || e.active.id === e.over.id) return;
    const from = shots.findIndex((s) => s.id === e.active.id);
    const to = shots.findIndex((s) => s.id === e.over!.id);
    void persistOrder(arrayMove(shots, from, to), shots);
  };

  const move = (index: number, dir: -1 | 1) => {
    const to = index + dir;
    if (to < 0 || to >= shots.length) return;
    void persistOrder(arrayMove(shots, index, to), shots);
  };

  // ── images ──
  const upload = (id: string, file: File) =>
    withBusy(id, "Uploading…", async () => {
      let blob: Blob;
      try {
        blob = await downscale(file);
      } catch {
        return fail("Couldn't read that image. Try a JPEG or PNG.");
      }
      const fd = new FormData();
      fd.append("shotId", id);
      fd.append("file", blob, "reference.jpg");
      const res = await fetch("/api/admin/storyboards/upload", { method: "POST", body: fd });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) return fail(json.error ?? `Upload failed (${res.status})`);
      setShots((ss) => ss.map((s) => (s.id === id ? { ...s, reference_path: json.path, reference_url: json.url, background: "reference" } : s)));
    });

  const removeImage = (id: string, kind: "reference" | "sketch") => {
    if (!window.confirm(`Remove the ${kind === "reference" ? "reference image" : "sketch"} from this shot? The drawing and notes stay.`)) return;
    void withBusy(id, "Removing…", async () => {
      await save.flush();
      const res = await removeShotImage(id, kind);
      if (!res.ok) return fail(res.error);
      setShots((ss) => ss.map((s) => (s.id === id ? { ...s, [`${kind}_path`]: null, [`${kind}_url`]: null, background: res.data.background } : s)));
    });
  };

  // ── AI sketches: generate a candidate, then keep / regenerate / discard ──
  const generate = async (shotId: string, previous?: string | null) => {
    await save.flush(); // the server prompt is built from the saved description
    setSketch({ shotId, path: null, url: null, busy: "Drawing a rough sketch… (10–40 s)" });
    if (previous) void discardSketch(shotId, previous);
    const res = await fetch("/api/admin/storyboards/sketch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ shotId }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      setSketch(null);
      return fail(json.error ?? `Sketch failed (${res.status})`);
    }
    setSketch({ shotId, path: json.path, url: json.url, busy: null });
  };

  const keep = async () => {
    if (!sketch?.path) return;
    setSketch({ ...sketch, busy: "Saving…" });
    const res = await keepSketch(sketch.shotId, sketch.path);
    if (!res.ok) {
      setSketch({ ...sketch, busy: null });
      return fail(res.error);
    }
    setShots((ss) => ss.map((s) => (s.id === sketch.shotId ? { ...s, sketch_path: sketch.path, sketch_url: sketch.url, background: "sketch" } : s)));
    setSketch(null);
  };

  const discard = () => {
    if (sketch?.path) void discardSketch(sketch.shotId, sketch.path);
    setSketch(null);
  };

  useEffect(() => {
    if (save.status === "error" && save.error) setError(save.error);
  }, [save.status, save.error]);

  const drawingShot = drawingId ? shots.find((s) => s.id === drawingId) : null;
  const statusText =
    save.status === "saving" ? "Saving…" : save.status === "pending" ? "Editing…" : save.status === "error" ? "Not saved" : "All changes saved";

  return (
    <main className="adm-main sb-editor">
      <div className="sb-crumb">
        <span><Link href="/admin">Admin</Link> / <Link href="/admin/storyboards">Storyboards</Link></span>
        <span className={`sb-save ${save.status}`} aria-live="polite">
          {statusText}
          {save.status === "error" && (
            <button className="adm-link" onClick={() => save.flush()}>Retry</button>
          )}
          {save.status === "saved" && <> · <EditedAt iso={project.updated_at} prefix="" /></>}
        </span>
      </div>

      <section className="sb-project-head">
        <input
          className="sb-project-title"
          value={project.title}
          maxLength={200}
          onChange={(e) => setProject((p) => ({ ...p, title: e.target.value }))}
          onBlur={(e) => {
            const t = e.target.value.trim() || "Untitled storyboard";
            setProject((p) => ({ ...p, title: t }));
            save.queue("project", project.id, { title: t });
          }}
          aria-label="Project title"
        />
        <input
          className="sb-project-client"
          value={project.client_name}
          placeholder="Client"
          maxLength={200}
          onChange={(e) => patchProject({ client_name: e.target.value })}
          aria-label="Client name"
        />
      </section>

      <section className="sb-toolbar">
        <div className="sb-seg" role="group" aria-label="Video format">
          {FORMATS.map((f) => (
            <button key={f} className={project.format === f ? "on" : ""} onClick={() => patchProject({ format: f })} title={FORMAT_LABEL[f]}>
              <span className={`sb-fmt-icon f${f.replace(":", "x")}`} aria-hidden /> {f}
            </button>
          ))}
        </div>

        <div className={`sb-runtime${over ? " over" : ""}`}>
          <span className="sb-runtime-total">{formatRuntime(total)}</span>
          <span className="sb-runtime-label">
            {project.target_seconds != null ? <>of {formatRuntime(project.target_seconds)} target</> : "total"}
          </span>
          {over && <strong className="sb-over" role="status">Over by {formatRuntime(total - project.target_seconds!)}</strong>}
        </div>

        <label className="sb-target">
          Target
          <select
            className="adm-input"
            value={customTarget ? "custom" : project.target_seconds ?? ""}
            onChange={(e) => {
              const v = e.target.value;
              if (v === "custom") return setCustomTarget(true);
              setCustomTarget(false);
              patchProject({ target_seconds: v === "" ? null : Number(v) });
            }}
          >
            <option value="">None</option>
            {TARGETS.map((t) => <option key={t} value={t}>{t}s</option>)}
            <option value="custom">Custom…</option>
          </select>
          {customTarget && (
            <input
              className="adm-input sb-target-custom"
              type="number"
              inputMode="numeric"
              min={1}
              max={36000}
              value={project.target_seconds ?? ""}
              onChange={(e) => {
                const n = Math.round(Number(e.target.value));
                patchProject({ target_seconds: e.target.value === "" || !n ? null : Math.min(36000, Math.max(1, n)) });
              }}
              aria-label="Custom target in seconds"
            />
          )}
        </label>

        <span className="sb-spacer" />
        <DictationStatus />
        <button className="adm-btn small" onClick={() => setOrganizing(true)}
          title={ai.organize ? undefined : "Needs ANTHROPIC_API_KEY on the server"}>
          Organize My Ideas
        </button>
        <button className="adm-btn small" onClick={() => setShowNotes((v) => !v)} aria-expanded={showNotes}>
          {showNotes ? "Hide notes" : "Project notes"}
        </button>
        <a className="adm-btn small" href={`/admin/storyboards/${project.id}/print`} target="_blank" rel="noopener"
          onClick={() => void save.flush()}>
          Export PDF
        </a>
      </section>

      {error && (
        <p className="adm-error sb-banner" role="alert">
          {error} <button className="adm-link" onClick={() => setError(null)}>Dismiss</button>
        </p>
      )}

      {showNotes && (
        <section className="sb-notes">
          <Field label="Description" multiline value={project.description} maxLength={5000}
            onChange={(v) => patchProject({ description: v })} placeholder="What this video is for" />
          <Field label="Project notes" multiline value={project.notes} maxLength={50000}
            onChange={(v) => patchProject({ notes: v })} placeholder="Ideas, references, schedule, anything. Tap the mic to dictate." />
        </section>
      )}

      <DndContext id="storyboard-shots" sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={shots.map((s) => s.id)} strategy={rectSortingStrategy}>
          <div className={`sb-grid f${project.format.replace(":", "x")}`}>
            {shots.map((s, i) => (
              <ShotCard
                key={s.id}
                shot={s}
                index={i}
                count={shots.length}
                format={project.format}
                busy={busy[s.id]}
                sketchEnabled={ai.sketch}
                onPatch={(patch) => patchShot(s.id, patch)}
                onMove={(dir) => move(i, dir)}
                onInsertAfter={() => void insertAfter(s.id)}
                onDuplicate={() => void duplicate(s.id)}
                onDelete={() => void remove(s, i + 1)}
                onUpload={(f) => void upload(s.id, f)}
                onRemoveImage={(k) => removeImage(s.id, k)}
                onDraw={() => setDrawingId(s.id)}
                onSketch={() => void generate(s.id)}
              />
            ))}
            <button className="sb-add" onClick={() => void insertAfter(null)}>
              <span>+</span> Add shot
            </button>
          </div>
        </SortableContext>
      </DndContext>

      {organizing && (
        <OrganizePanel
          projectId={project.id}
          initialNotes={project.notes}
          enabled={ai.organize}
          existingCount={shots.length}
          onAdded={(added) => setShots((ss) => [...ss, ...added])}
          onClose={() => setOrganizing(false)}
        />
      )}

      {sketch && (
        <SketchReview
          url={sketch.url}
          format={project.format}
          number={shots.findIndex((s) => s.id === sketch.shotId) + 1}
          replacing={!!shots.find((s) => s.id === sketch.shotId)?.sketch_path}
          busy={sketch.busy}
          onKeep={() => void keep()}
          onAgain={() => void generate(sketch.shotId, sketch.path)}
          onDiscard={discard}
        />
      )}

      {drawingShot && (
        <DrawingEditor
          shot={drawingShot}
          format={project.format}
          number={shots.indexOf(drawingShot) + 1}
          onChange={(d) => setShotDrawing(drawingShot.id, d)}
          onClose={() => {
            setDrawingId(null);
            void save.flush();
          }}
        />
      )}
    </main>
  );
}
