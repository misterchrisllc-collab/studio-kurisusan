"use client";

import { useId, useRef } from "react";
import AutoTextarea from "./AutoTextarea";
import MicButton from "./MicButton";

type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  suggestions?: string[];
  placeholder?: string;
  maxLength?: number;
  mic?: boolean;
  className?: string;
};

/** Labelled text field with an optional dictation button that appends to what is already there. */
export default function Field({ label, value, onChange, multiline, suggestions, placeholder, maxLength = 10000, mic = true, className }: Props) {
  const id = useId();
  const latest = useRef(value);
  latest.current = value;

  const append = (text: string, joiner: string) => {
    const cur = latest.current;
    const next = cur.trim() ? `${cur.replace(/\s+$/, "")}${joiner}${text}` : text;
    onChange(next.slice(0, maxLength));
  };

  return (
    <div className={`sb-field ${className ?? ""}`}>
      <div className="sb-field-top">
        <label htmlFor={id}>{label}</label>
        {mic && <MicButton label={label} onText={append} />}
      </div>
      {multiline ? (
        <AutoTextarea id={id} className="adm-input" value={value} placeholder={placeholder} maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)} />
      ) : (
        <>
          <input id={id} className="adm-input" value={value} placeholder={placeholder} maxLength={maxLength}
            list={suggestions ? `${id}-list` : undefined} onChange={(e) => onChange(e.target.value)} />
          {suggestions && (
            <datalist id={`${id}-list`}>
              {suggestions.map((s) => <option key={s} value={s} />)}
            </datalist>
          )}
        </>
      )}
    </div>
  );
}
