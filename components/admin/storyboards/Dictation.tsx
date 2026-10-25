"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

/**
 * Voice-to-text through the browser's own speech recognition (Safari on
 * iPad/Mac, Chrome). Nothing is sent to our server. When the browser has no
 * speech API, `supported` stays false and no microphone buttons render.
 */
export type DictationLang = "en-US" | "ja-JP";

type Handlers = { onText: (text: string, joiner: string) => void };

type Ctx = {
  supported: boolean;
  lang: DictationLang;
  setLang: (l: DictationLang) => void;
  active: string | null;
  interim: string;
  error: string | null;
  start: (owner: string, h: Handlers) => void;
  stop: () => void;
};

const DictationContext = createContext<Ctx | null>(null);

type Rec = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((e: { resultIndex: number; results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
};

function getCtor(): (new () => Rec) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: new () => Rec; webkitSpeechRecognition?: new () => Rec };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

const ERRORS: Record<string, string> = {
  "not-allowed": "Microphone or speech recognition is blocked. On iPad: Settings › Apps › Safari › Microphone → Allow, and turn on Siri & Dictation. Then try again.",
  "service-not-allowed": "Speech recognition is turned off. On iPad/Mac turn on Siri & Dictation in Settings, then try again.",
  "audio-capture": "No microphone found.",
  network: "The speech service couldn't be reached. Dictation needs an internet connection.",
  "language-not-supported": "This browser can't transcribe that language.",
};

export function DictationProvider({ children }: { children: React.ReactNode }) {
  const [supported, setSupported] = useState(false);
  const [lang, setLangState] = useState<DictationLang>("en-US");
  const [active, setActive] = useState<string | null>(null);
  const [interim, setInterim] = useState("");
  const [error, setError] = useState<string | null>(null);
  const rec = useRef<Rec | null>(null);

  useEffect(() => {
    setSupported(!!getCtor());
    try {
      const saved = localStorage.getItem("sb-dictation-lang");
      if (saved === "ja-JP" || saved === "en-US") setLangState(saved);
    } catch {}
  }, []);

  const setLang = useCallback((l: DictationLang) => {
    setLangState(l);
    try { localStorage.setItem("sb-dictation-lang", l); } catch {}
  }, []);

  const stop = useCallback(() => {
    rec.current?.stop();
  }, []);

  const start = useCallback(
    (owner: string, h: Handlers) => {
      const Ctor = getCtor();
      if (!Ctor) return;
      rec.current?.abort();
      const r = new Ctor();
      r.lang = lang;
      r.continuous = true;
      r.interimResults = true;
      const joiner = lang === "ja-JP" ? "" : " ";
      r.onresult = (e) => {
        let pending = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const res = e.results[i];
          const t = res[0].transcript.trim();
          if (res.isFinal) { if (t) h.onText(t, joiner); }
          else pending += res[0].transcript;
        }
        setInterim(pending);
      };
      r.onerror = (e) => {
        if (e.error === "aborted") return;
        setError(e.error === "no-speech" ? "Didn't hear anything. Tap the mic and speak again." : ERRORS[e.error] ?? `Dictation stopped (${e.error}).`);
      };
      r.onend = () => {
        if (rec.current === r) rec.current = null;
        setActive((a) => (a === owner ? null : a));
        setInterim("");
      };
      rec.current = r;
      setError(null);
      setInterim("");
      setActive(owner);
      try {
        r.start();
      } catch {
        setActive(null);
        setError("Couldn't start dictation. Try again.");
      }
    },
    [lang],
  );

  useEffect(() => () => rec.current?.abort(), []);

  return (
    <DictationContext.Provider value={{ supported, lang, setLang, active, interim, error, start, stop }}>
      {children}
    </DictationContext.Provider>
  );
}

export function useDictation(): Ctx {
  const ctx = useContext(DictationContext);
  if (!ctx) throw new Error("useDictation outside DictationProvider");
  return ctx;
}

/** Language picker + status line for the editor toolbar. */
export function DictationStatus() {
  const d = useDictation();
  if (!d.supported) {
    return (
      <p className="sb-dict-off" title="Use the microphone key on the iPad keyboard instead">
        Voice input isn&rsquo;t available in this browser. The keyboard&rsquo;s own dictation key still works.
      </p>
    );
  }
  return (
    <div className="sb-dict">
      <span className="sb-dict-label">Voice</span>
      <div className="sb-seg small" role="group" aria-label="Dictation language">
        {(["en-US", "ja-JP"] as const).map((l) => (
          <button key={l} className={d.lang === l ? "on" : ""} onClick={() => d.setLang(l)} disabled={!!d.active}>
            {l === "en-US" ? "English" : "日本語"}
          </button>
        ))}
      </div>
      {d.error && <span className="adm-error inline" role="alert">{d.error}</span>}
    </div>
  );
}
