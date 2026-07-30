import Link from "next/link";

type FooterLink = { href: string; label: string };

// English labels, matching the header nav (Home / Works / Service / About).
const HOME_LINKS: FooterLink[] = [
  { href: "/works", label: "Works" },
  { href: "/services", label: "Service" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const SUB_LINKS: FooterLink[] = [
  { href: "/", label: "Home" },
  { href: "/contact", label: "Contact" },
];

export default function Footer({
  variant = "sub",
}: {
  variant?: "home" | "sub";
}) {
  const links = variant === "home" ? HOME_LINKS : SUB_LINKS;
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>© {year} 合同会社くりすさん</p>
      <div className="ft-nav">
        {links.map((l) => (
          <Link key={l.label} href={l.href}>
            {l.label}
          </Link>
        ))}
      </div>
      <span className="ft-mg">Studio くりすさん</span>
    </footer>
  );
}
