"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/", label: "HOME" },
  { href: "/works", label: "WORKS" },
  { href: "/services", label: "WHAT WE DO" },
  { href: "/gear", label: "GEAR", hide: true },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
];

type Lang = "ja" | "en" | "es";

export default function Header() {
  const pathname = usePathname();
  // Visual-only language switcher — mirrors the prototype (no translations yet).
  const [lang, setLang] = useState<Lang>("ja");

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header>
      <Link href="/" className="logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="STUDIO くりすさん" />
      </Link>
      <nav className="hn">
        {NAV.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className={isActive(n.href) ? "on" : ""}
            {...(n.hide ? { "data-hide": "1" } : {})}
          >
            {n.label}
          </Link>
        ))}
      </nav>
      <div className="hr">
        <div className="lsw">
          {(["ja", "en", "es"] as Lang[]).map((l) => (
            <button
              key={l}
              className={`lb${lang === l ? " on" : ""}`}
              onClick={() => setLang(l)}
            >
              {l === "ja" ? "JP" : l.toUpperCase()}
            </button>
          ))}
        </div>
        <Link href="/contact" className="hcta">
          相談する
        </Link>
      </div>
    </header>
  );
}
