"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "HOME" },
  { href: "/works", label: "WORKS" },
  { href: "/services", label: "WHAT WE DO" },
  { href: "/gear", label: "GEAR", hide: true },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
];

export default function Header() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header>
      <Link href="/" className="logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="Studio くりすさん" />
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
        <Link href="/contact" className="hcta">
          相談する
        </Link>
      </div>
    </header>
  );
}
