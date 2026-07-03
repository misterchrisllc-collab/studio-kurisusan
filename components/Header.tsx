"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "ホーム" },
  { href: "/works", label: "作品" },
  { href: "/services", label: "できること" },
  { href: "/about", label: "私たちについて" },
  { href: "/contact", label: "お問い合わせ" },
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
