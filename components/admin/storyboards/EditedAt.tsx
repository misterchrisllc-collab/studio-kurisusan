"use client";

import { useEffect, useState } from "react";

const abs = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Tokyo",
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});
const rel = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

function relative(iso: string): string {
  const diff = (new Date(iso).getTime() - Date.now()) / 1000;
  const steps: [Intl.RelativeTimeFormatUnit, number][] = [
    ["second", 60], ["minute", 60], ["hour", 24], ["day", 7], ["week", 4.35], ["month", 12], ["year", Infinity],
  ];
  let v = diff;
  for (const [unit, size] of steps) {
    if (Math.abs(v) < size) return rel.format(Math.round(v), unit);
    v /= size;
  }
  return "";
}

/** Absolute JST time on first render (no hydration mismatch), relative once mounted. */
export default function EditedAt({ iso, prefix = "Edited" }: { iso: string; prefix?: string }) {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    setNow(relative(iso));
    const t = setInterval(() => setNow(relative(iso)), 30_000);
    return () => clearInterval(t);
  }, [iso]);
  return (
    <time dateTime={iso} title={abs.format(new Date(iso))}>
      {prefix} {now ?? abs.format(new Date(iso))}
    </time>
  );
}
