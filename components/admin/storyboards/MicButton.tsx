"use client";

import { useId } from "react";
import { useDictation } from "./Dictation";

/** Renders nothing unless the browser can actually transcribe. Text lands in the field, editable. */
export default function MicButton({ label, onText }: { label: string; onText: (text: string, joiner: string) => void }) {
  const d = useDictation();
  const id = useId();
  if (!d.supported) return null;
  const on = d.active === id;
  return (
    <span className="sb-mic-wrap">
      {on && <span className="sb-interim" aria-live="polite">{d.interim || "Listening…"}</span>}
      <button
        type="button"
        className={`sb-mic${on ? " on" : ""}`}
        onClick={() => (on ? d.stop() : d.start(id, { onText }))}
        aria-pressed={on}
        aria-label={on ? `Stop dictating into ${label}` : `Dictate into ${label} (${d.lang === "ja-JP" ? "日本語" : "English"})`}
        title={on ? "Stop" : `Dictate (${d.lang === "ja-JP" ? "日本語" : "English"})`}
      >
        <svg viewBox="0 0 24 24" aria-hidden>
          <rect x="9" y="3" width="6" height="11" rx="3" />
          <path d="M5 11a7 7 0 0 0 14 0M12 18v3" fill="none" />
        </svg>
      </button>
    </span>
  );
}
