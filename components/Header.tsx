"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/works", label: "Works" },
  { href: "/services", label: "Service" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header>
      <Link href="/" className="logo" aria-label="Studio くりすさん ホームへ">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="Studio くりすさん" />
      </Link>
      <nav className="hn">
        {NAV.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className={isActive(n.href) ? "on" : ""}
          >
            {n.label}
          </Link>
        ))}
      </nav>
      <div className="hr">
        <a
          href="https://instagram.com/studio_kurisusan"
          target="_blank"
          rel="noopener noreferrer"
          className="hsns"
          aria-label="Instagram"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
            <circle cx="12" cy="12" r="4.2" />
            <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
          </svg>
        </a>
        <Link href="/contact" className="hcta">
          <span>Contact</span>
          <span className="bar" />
          <span className="arw">→</span>
        </Link>
      </div>
    </header>
  );
}
