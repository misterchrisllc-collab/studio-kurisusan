import Link from "next/link";

type FooterLink = { href: string; label: string };

const HOME_LINKS: FooterLink[] = [
  { href: "/work", label: "WORK" },
  { href: "/services", label: "SERVICES" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
];

const SUB_LINKS: FooterLink[] = [
  { href: "/", label: "HOME" },
  { href: "/contact", label: "CONTACT" },
];

export default function Footer({
  variant = "sub",
}: {
  variant?: "home" | "sub";
}) {
  const links = variant === "home" ? HOME_LINKS : SUB_LINKS;
  return (
    <footer>
      <p>© 2025 合同会社くりすさん</p>
      <div className="ft-nav">
        {links.map((l) => (
          <Link key={l.label} href={l.href}>
            {l.label}
          </Link>
        ))}
      </div>
      <span className="ft-mg">STUDIO: くりすさん</span>
    </footer>
  );
}
