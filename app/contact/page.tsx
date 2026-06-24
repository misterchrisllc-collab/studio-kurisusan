import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "お問い合わせ | STUDIOくりすさん",
  description:
    "プロジェクトのご相談。撮影内容が決まっていなくても構いません。大阪の商業撮影スタジオへのお問い合わせ。",
};

const DETAILS = [
  { lbl: "TEL", val: "090-8437-0387" },
  { lbl: "EMAIL", val: "studiokurisusan@gmail.com" },
  { lbl: "INSTAGRAM", val: "@studio_kurisusan" },
  { lbl: "LOCATION", val: "大阪市北区 / Osaka" },
  { lbl: "LANGUAGES", val: "日本語 / English / Español" },
];

export default function ContactPage() {
  return (
    <div className="page">
      <div className="ct-grid">
        <div className="ct-l">
          <div className="ct-l-top">
            <span className="pre">CONTACT</span>
            <h1>
              プロジェクトについて、<br />
              <em>話しましょう。</em>
            </h1>
            <p>
              撮影内容が決まっていなくても構いません。「こういう課題がある」「こういうビジュアルが欲しい」——そこから一緒に考えます。
            </p>
          </div>
          <div className="ct-det">
            {DETAILS.map((d) => (
              <div className="ct-row" key={d.lbl}>
                <span className="ct-lbl">{d.lbl}</span>
                <span className="ct-val">{d.val}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ct-r">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
