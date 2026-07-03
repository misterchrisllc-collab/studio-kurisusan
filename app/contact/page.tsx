import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "お問い合わせ | STUDIOくりすさん",
  description:
    "プロジェクトのご相談。撮影内容が決まっていなくても構いません。大阪の商業撮影スタジオへのお問い合わせ。日本語・英語・スペイン語対応。",
};

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
  "撮影内容が未定でも、事業の課題からご相談いただけます。",
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
              ビジネスについて、
              <br />
              <em>話しましょう。</em>
            </h1>
            <p>
              撮影が決まっていなくても構いません。「こういう課題がある」「こう見られたい」、そこから一緒に考えます。単発のご相談も、継続的なパートナーとしてのご相談も歓迎です。ご相談は無料です。
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
