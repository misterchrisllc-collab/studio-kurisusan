import Link from "next/link";
import { listProjects } from "@/lib/storyboards/server";
import EditedAt from "@/components/admin/storyboards/EditedAt";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin" };

/** Admin home: one tile per tool. Add new sections to this grid. */
export default async function AdminHome() {
  const projects = await listProjects();
  const latest = projects[0];
  return (
    <main className="adm-main">
      <div className="sb-head">
        <div>
          <p className="adm-eyebrow">Admin</p>
          <h1>Dashboard</h1>
        </div>
      </div>
      <div className="adm-tiles">
        <Link href="/admin/storyboards" className="adm-tile">
          <span className="adm-tile-icon" aria-hidden>
            <svg viewBox="0 0 48 36"><rect x="1" y="1" width="21" height="14" /><rect x="26" y="1" width="21" height="14" /><rect x="1" y="21" width="21" height="14" /><rect x="26" y="21" width="21" height="14" /></svg>
          </span>
          <strong>Storyboards</strong>
          <span className="adm-tile-desc">Plan shoots, write scripts, draw frames, export PDFs.</span>
          <span className="adm-tile-meta">
            {projects.length} project{projects.length === 1 ? "" : "s"}
            {latest && <> · <EditedAt iso={latest.updated_at} prefix="last edited" /></>}
          </span>
          <span className="adm-tile-go">Open →</span>
        </Link>
      </div>
    </main>
  );
}
