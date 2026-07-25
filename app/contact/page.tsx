import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "お問い合わせ",
  description:
    "撮影をするかどうか決めていなくても大丈夫です。事業の課題からご相談いただけます。大阪のクリエイティブスタジオへのお問い合わせ。日本語・英語・スペイン語対応。",
  alternates: { canonical: "/contact" },
};

// Physical studio / Google Business Profile listing name — must match the
// actual Google Maps listing for local-SEO (NAP) consistency. The public-facing
// brand elsewhere on the site is "Studio くりすさん".
const STUDIO_NAME = "フォトスタジオ くりすさん";
const ADDR = "Moriki Mansion #310, 2-14-6 Honjo-higashi, Kita-ku, Osaka 531-0074";
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  ADDR,
)}`;
const MAPS_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(
  ADDR,
)}&z=15&output=embed`;

const POINTS = [
  "ご返信は通常24時間以内にお送りします。",
  "日本語・英語・スペイン語で対応します。",
];

export default function ContactPage() {
  return (
    <div className="page">
      <div className="ct-grid">
        {/* LEFT: editorial + studio */}
        <div className="ct-l">
          <div className="ct-l-top">
            <span className="pre">CONTACT</span>
            <h1>
              うまくまとまっていなくても、
              <br />
              <em>まずは、聞かせてください。</em>
            </h1>
            <p className="ct-lead">
              撮影をするかどうか、まだ決めていなくても大丈夫です。「こういう課題がある」。その一言から、一緒に考えはじめます。
            </p>
            <p className="ct-sub">
              単発でも、継続的なパートナーとしても。ご相談は無料です。
            </p>
            <ul className="ct-points">
              {POINTS.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <a
              className="ct-ig"
              href="https://instagram.com/studio_kurisusan"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram でも受け付けています ↗
            </a>
          </div>

          <div className="ct-studio">
            <span className="ct-lbl">STUDIO</span>
            <p className="ct-studio-name">{STUDIO_NAME}</p>
            <p className="ct-studio-addr">
              Moriki Mansion #310, 2-14-6 Honjo-higashi
              <br />
              Kita-ku, Osaka 531-0074, Japan
              <br />
              営業時間 9:00–21:00
            </p>
            <a
              className="ct-map-link"
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Google Maps ↗
            </a>
            <div className="ct-map">
              <iframe
                src={MAPS_EMBED}
                title="フォトスタジオ くりすさん の地図"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="ct-contacts">
              <span className="ct-lbl">TEL</span>
              <a href="tel:09084370387">090-8437-0387</a>
              <span className="ct-lbl">EMAIL</span>
              <a href="mailto:studiokurisusan@gmail.com">
                studiokurisusan@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT: form */}
        <div className="ct-r">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
