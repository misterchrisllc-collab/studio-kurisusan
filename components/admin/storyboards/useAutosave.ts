"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { updateProject, updateShot, type ProjectPatch, type ShotPatch } from "@/app/admin/storyboards/actions";

type Entry = { kind: "shot"; patch: ShotPatch } | { kind: "project"; patch: ProjectPatch };
export type SaveStatus = "saved" | "pending" | "saving" | "error";

/**
 * Debounced, ordered autosave. Edits are merged per shot/project, sent after a
 * short pause, and flushed one batch at a time so an older write can never
 * land after a newer one. Failed patches are kept and retried on the next save.
 */
export function useAutosave(delay = 700) {
  const pending = useRef(new Map<string, Entry>());
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const chain = useRef<Promise<void>>(Promise.resolve());
  const [status, setStatus] = useState<SaveStatus>("saved");
  const [error, setError] = useState<string | null>(null);

  const send = useCallback(async () => {
    const items = Array.from(pending.current.entries());
    pending.current.clear();
    if (!items.length) return;
    setStatus("saving");
    const results = await Promise.all(
      items.map(([key, e]) =>
        e.kind === "shot"
          ? updateShot(key.slice(5), e.patch)
          : updateProject(key.slice(8), e.patch),
      ),
    ).catch((err: unknown) => items.map(() => ({ ok: false as const, error: String(err) })));

    let firstError: string | null = null;
    results.forEach((r, i) => {
      if (r.ok) return;
      firstError ??= r.error;
      const [key, e] = items[i];
      const newer = pending.current.get(key);
      pending.current.set(key, { kind: e.kind, patch: { ...e.patch, ...newer?.patch } } as Entry);
    });
    setError(firstError);
    setStatus(firstError ? "error" : pending.current.size ? "pending" : "saved");
  }, []);

  const flush = useCallback(() => {
    clearTimeout(timer.current);
    chain.current = chain.current.then(send);
    return chain.current;
  }, [send]);

  const queue = useCallback(
    (kind: Entry["kind"], id: string, patch: ShotPatch | ProjectPatch) => {
      const key = `${kind}:${id}`;
      const cur = pending.current.get(key);
      pending.current.set(key, { kind, patch: { ...cur?.patch, ...patch } } as Entry);
      setStatus("pending");
      clearTimeout(timer.current);
      timer.current = setTimeout(flush, delay);
    },
    [delay, flush],
  );

  /** Forget queued edits for a shot that is being deleted. */
  const drop = useCallback((shotId: string) => pending.current.delete(`shot:${shotId}`), []);

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (pending.current.size) {
        void flush();
        e.preventDefault();
        e.returnValue = "";
      }
    };
    const hide = () => document.visibilityState === "hidden" && void flush();
    window.addEventListener("beforeunload", warn);
    document.addEventListener("visibilitychange", hide);
    return () => {
      window.removeEventListener("beforeunload", warn);
      document.removeEventListener("visibilitychange", hide);
    };
  }, [flush]);

  return { queue, flush, drop, status, error };
}
