"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import {
  createProject,
  deleteProject,
  duplicateProject,
  updateProject,
} from "@/app/admin/storyboards/actions";
import { FORMATS, FORMAT_LABEL, type ProjectSummary, type VideoFormat } from "@/lib/storyboards/types";
import EditedAt from "./EditedAt";

type Draft = { title: string; client_name: string; description: string; format: VideoFormat };
const EMPTY: Draft = { title: "", client_name: "", description: "", format: "16:9" };

export default function ProjectList({ initial }: { initial: ProjectSummary[] }) {
  const router = useRouter();
  const [projects, setProjects] = useState(initial);
  const [query, setQuery] = useState("");
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [editing, setEditing] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<Draft>(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter((p) =>
      [p.title, p.client_name, p.description].some((v) => v.toLowerCase().includes(q)),
    );
  }, [projects, query]);

  const create = () =>
    start(async () => {
      setError(null);
      const res = await createProject(draft);
      if (!res.ok) return setError(res.error);
      router.push(`/admin/storyboards/${res.data}`);
    });

  const saveEdit = (id: string) =>
    start(async () => {
      setError(null);
      const { title, client_name, description } = editDraft;
      const res = await updateProject(id, { title, client_name, description });
      if (!res.ok) return setError(res.error);
      setProjects((ps) =>
        [...ps.map((p) => (p.id === id ? { ...p, title: title.trim(), client_name, description, updated_at: res.data } : p))]
          .sort((a, b) => b.updated_at.localeCompare(a.updated_at)),
      );
      setEditing(null);
    });

  const duplicate = (id: string) =>
    start(async () => {
      setError(null);
      const res = await duplicateProject(id);
      if (!res.ok) return setError(res.error);
      router.refresh();
      router.push(`/admin/storyboards/${res.data}`);
    });

  const remove = (p: ProjectSummary) => {
    if (!window.confirm(`Delete "${p.title}" and its ${p.shot_count} shot(s), drawings and images?\n\nThis can't be undone.`)) return;
    start(async () => {
      setError(null);
      const res = await deleteProject(p.id);
      if (!res.ok) return setError(res.error);
      setProjects((ps) => ps.filter((x) => x.id !== p.id));
    });
  };

  return (
    <>
      <div className="sb-head">
        <div>
          <p className="adm-eyebrow"><Link href="/admin" className="adm-crumb">Admin</Link> / Storyboards</p>
          <h1>Projects</h1>
        </div>
        <div className="sb-head-actions">
          <input
            className="adm-input sb-search"
            type="search"
            placeholder="Search title, client, description"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search storyboards"
          />
          <button className="adm-btn primary" onClick={() => setCreating((v) => !v)}>
            + New storyboard
          </button>
        </div>
      </div>

      {error && <p className="adm-error" role="alert">{error}</p>}

      {creating && (
        <form
          className="sb-create"
          onSubmit={(e) => {
            e.preventDefault();
            create();
          }}
        >
          <label>
            Project title
            <input className="adm-input" autoFocus required maxLength={200} value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
          </label>
          <label>
            Client
            <input className="adm-input" maxLength={200} value={draft.client_name}
              onChange={(e) => setDraft({ ...draft, client_name: e.target.value })} />
          </label>
          <label className="wide">
            Description
            <textarea className="adm-input" rows={2} maxLength={5000} value={draft.description}
              onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
          </label>
          <fieldset className="sb-formats">
            <legend>Format</legend>
            {FORMATS.map((f) => (
              <label key={f} className={draft.format === f ? "on" : ""}>
                <input type="radio" name="format" value={f} checked={draft.format === f}
                  onChange={() => setDraft({ ...draft, format: f })} />
                <span className={`sb-fmt-icon f${f.replace(":", "x")}`} aria-hidden />
                {FORMAT_LABEL[f]}
              </label>
            ))}
          </fieldset>
          <div className="sb-create-actions">
            <button type="button" className="adm-btn" onClick={() => { setCreating(false); setDraft(EMPTY); }}>Cancel</button>
            <button type="submit" className="adm-btn primary" disabled={pending}>
              {pending ? "Creating…" : "Create & open"}
            </button>
          </div>
        </form>
      )}

      {projects.length === 0 && !creating && (
        <div className="sb-empty">
          <p>No storyboards yet.</p>
          <button className="adm-btn primary" onClick={() => setCreating(true)}>Create the first one</button>
        </div>
      )}
      {projects.length > 0 && shown.length === 0 && <p className="adm-muted">Nothing matches “{query}”.</p>}

      <ul className="sb-projects">
        {shown.map((p) => (
          <li key={p.id} className="sb-project">
            {editing === p.id ? (
              <form className="sb-rename" onSubmit={(e) => { e.preventDefault(); saveEdit(p.id); }}>
                <input className="adm-input" autoFocus required maxLength={200} value={editDraft.title}
                  onChange={(e) => setEditDraft({ ...editDraft, title: e.target.value })} aria-label="Title" />
                <input className="adm-input" placeholder="Client" maxLength={200} value={editDraft.client_name}
                  onChange={(e) => setEditDraft({ ...editDraft, client_name: e.target.value })} aria-label="Client" />
                <textarea className="adm-input" rows={2} placeholder="Description" maxLength={5000} value={editDraft.description}
                  onChange={(e) => setEditDraft({ ...editDraft, description: e.target.value })} aria-label="Description" />
                <div className="sb-create-actions">
                  <button type="button" className="adm-btn" onClick={() => setEditing(null)}>Cancel</button>
                  <button type="submit" className="adm-btn primary" disabled={pending}>Save</button>
                </div>
              </form>
            ) : (
              <>
                <Link href={`/admin/storyboards/${p.id}`} className="sb-project-link">
                  <span className={`sb-fmt-icon f${p.format.replace(":", "x")}`} aria-label={FORMAT_LABEL[p.format]} />
                  <span className="sb-project-text">
                    <strong>{p.title}</strong>
                    {p.client_name && <span className="sb-client">{p.client_name}</span>}
                    {p.description && <span className="sb-desc">{p.description}</span>}
                    <span className="sb-meta">
                      {p.format} · {p.shot_count} shot{p.shot_count === 1 ? "" : "s"} · <EditedAt iso={p.updated_at} />
                    </span>
                  </span>
                </Link>
                <div className="sb-project-actions">
                  <button className="adm-btn small" disabled={pending}
                    onClick={() => { setEditing(p.id); setEditDraft({ title: p.title, client_name: p.client_name, description: p.description, format: p.format }); }}>
                    Rename
                  </button>
                  <button className="adm-btn small" disabled={pending} onClick={() => duplicate(p.id)}>Duplicate</button>
                  <button className="adm-btn small danger" disabled={pending} onClick={() => remove(p)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
