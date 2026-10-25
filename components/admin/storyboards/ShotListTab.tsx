"use client";

import { formatRuntime, totalSeconds, type Project, type ShotView } from "@/lib/storyboards/types";
import FrameView from "./FrameView";

/** Compact table for the day of the shoot: tick shots off as they're filmed, print it. */
export default function ShotListTab({
  project,
  shots,
  onToggleFilmed,
  onOpen,
}: {
  project: Project;
  shots: ShotView[];
  onToggleFilmed: (id: string, filmed: boolean) => void;
  onOpen: (id: string) => void;
}) {
  const filmed = shots.filter((s) => s.filmed).length;
  return (
    <section className="sb-tabpanel sb-shotlist">
      <div className="sb-shotlist-head">
        <h2 className="sb-print-only">{project.title}{project.client_name ? ` · ${project.client_name}` : ""}</h2>
        <span className="sb-shotlist-count">
          {filmed} / {shots.length} filmed · {formatRuntime(totalSeconds(shots))}
        </span>
        <button className="adm-btn small sb-no-print" onClick={() => window.print()}>Print shot list</button>
      </div>
      <div className="sb-table-wrap">
        <table className="sb-table">
          <thead>
            <tr>
              <th className="c-check">Filmed</th>
              <th>#</th>
              <th className="c-thumb sb-no-print-col">Frame</th>
              <th>Shot</th>
              <th>Size</th>
              <th>Angle</th>
              <th>Movement</th>
              <th className="c-dur">Sec</th>
            </tr>
          </thead>
          <tbody>
            {shots.map((s, i) => (
              <tr key={s.id} className={s.filmed ? "done" : ""}>
                <td className="c-check">
                  <input type="checkbox" checked={s.filmed} onChange={(e) => onToggleFilmed(s.id, e.target.checked)}
                    aria-label={`Shot ${i + 1} filmed`} />
                </td>
                <td className="c-num">{String(i + 1).padStart(2, "0")}</td>
                <td className="c-thumb sb-no-print-col">
                  <FrameView shot={s} format={project.format} onClick={() => onOpen(s.id)} label={`Open shot ${i + 1}`} />
                </td>
                <td className="c-shot">
                  <button className="sb-linklike" onClick={() => onOpen(s.id)}>{s.title || "Untitled shot"}</button>
                  {s.description && <span>{s.description}</span>}
                </td>
                <td>{s.shot_size}</td>
                <td>{s.camera_angle}</td>
                <td>{s.camera_movement}</td>
                <td className="c-dur">{s.duration_seconds ?? ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!shots.length && <p className="adm-muted">No shots yet. Add them on the Storyboard tab.</p>}
    </section>
  );
}
