import Link from "next/link";

type FooterLink = { href: string; label: string };

const HOME_LINKS: FooterLink[] = [
  { href: "/works", label: "作品" },
  { href: "/services", label: "できること" },
  { href: "/about", label: "私たちについて" },
  { href: "/contact", label: "お問い合わせ" },
];

const SUB_LINKS: FooterLink[] = [
  { href: "/", label: "ホーム" },
  { href: "/contact", label: "お問い合わせ" },
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
