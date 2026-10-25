"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FORMAT_LABEL, formatRuntime, totalSeconds, type Project, type ShotView } from "@/lib/storyboards/types";
import FrameView, { backgroundUrl } from "./FrameView";

const dateFmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Tokyo", day: "numeric", month: "long", year: "numeric" });

function Row({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value?.trim()) return null;
  return (
    <div className="pv-row">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

/**
 * Print layout for the storyboard. "Save as PDF" in the browser's print
 * dialog produces the PDF; on iPad, Share › Print › pinch out (or Save to Files).
 * Using the browser keeps Japanese text, image proportions and drawings exact.
 */
export default function PrintView({ project, shots }: { project: Project; shots: ShotView[] }) {
  const total = totalSeconds(shots);
  const images = shots.map(backgroundUrl).filter(Boolean).length;
  const [ready, setReady] = useState(images === 0);
  const grid = useRef<HTMLOListElement>(null);

  useEffect(() => {
    document.documentElement.classList.add("pv-print-root");
    const imgs = Array.from(grid.current?.querySelectorAll("img") ?? []);
    const done = () => setReady(true);
    Promise.all(imgs.map((img) => (img.complete ? null : new Promise((r) => { img.onload = img.onerror = r; })))).then(done);
    const t = setTimeout(done, 15000); // never block printing on one slow image
    return () => {
      clearTimeout(t);
      document.documentElement.classList.remove("pv-print-root");
    };
  }, []);

  return (
    <div className={`pv f${project.format.replace(":", "x")}`}>
      <div className="pv-tools">
        <Link href={`/admin/storyboards/${project.id}`}>← Back to editor</Link>
        <span className="sb-spacer" />
        <span className="adm-muted">{ready ? "Ready." : "Loading images…"} In the print dialog choose “Save as PDF”.</span>
        <button className="adm-btn primary" onClick={() => window.print()} disabled={!ready}>
          Print / Save as PDF
        </button>
      </div>

      <div className="pv-head">
        <div>
          <p className="pv-studio">Studio くりすさん · Storyboard</p>
          <h1>{project.title}</h1>
          {project.client_name && <p className="pv-client">{project.client_name}</p>}
        </div>
        <dl className="pv-facts">
          <div><dt>Format</dt><dd>{FORMAT_LABEL[project.format]}</dd></div>
          <div><dt>Shots</dt><dd>{shots.length}</dd></div>
          <div>
            <dt>Runtime</dt>
            <dd>
              {formatRuntime(total)}
              {project.target_seconds != null && <> / {formatRuntime(project.target_seconds)} target</>}
            </dd>
          </div>
          <div><dt>Date</dt><dd>{dateFmt.format(new Date())}</dd></div>
        </dl>
      </div>
      {project.logline && <p className="pv-logline">{project.logline}</p>}
      {project.description && <p className="pv-desc">{project.description}</p>}

      <ol className="pv-grid" ref={grid}>
        {shots.map((s, i) => (
          <li key={s.id} className="pv-shot">
            <div className="pv-shot-head">
              <span className="pv-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="pv-title">{s.title}</span>
              {s.duration_seconds != null && <span className="pv-dur">{formatRuntime(s.duration_seconds)}</span>}
            </div>
            <FrameView shot={s} format={project.format} />
            {[s.shot_size, s.camera_angle, s.camera_movement].some((v) => v.trim()) && (
              <p className="pv-camera">{[s.shot_size, s.camera_angle, s.camera_movement].filter((v) => v.trim()).join(" · ")}</p>
            )}
            <dl>
              <Row label="Shot" value={s.description} />
              <Row label="Action" value={s.subject_action} />
              <Row label="Script / VO" value={s.script} />
              <Row label="Audio" value={s.audio_notes} />
              <Row label="Light" value={s.lighting_notes} />
              <Row label="Notes" value={s.production_notes} />
            </dl>
          </li>
        ))}
      </ol>
    </div>
  );
}
