import Footer from "@/components/Footer";

export const metadata = {
  title: "About | STUDIOくりすさん",
  description:
    "大阪在住15年のアメリカ人フォトグラファー。ビジネスのための写真を撮る合同会社くりすさん代表について。",
};

const CAPABILITIES = [
  "店舗・飲食店・サロンの商業撮影",
  "商品・EC・カタログ撮影",
  "企業・採用・コーポレートブランディング",
  "建設・リノベーション記録撮影",
  "SNSリール・ショート動画制作",
  "バイリンガルコンテンツ制作（日英）",
];

const CREDENTIALS = [
  "Florida International University — BA International Studies",
  "立命館大学 RSJP 修了",
  "バンタンデザイン研究所大阪校 フォトグラフィー速習コース 修了",
  "Google Marketing 認定",
];

const CONTACT = [
  { lbl: "TEL", val: "090-8437-0387" },
  { lbl: "EMAIL", val: "studiokurisusan@gmail.com" },
  { lbl: "INSTAGRAM", val: "@studio_kurisusan" },
  { lbl: "LOCATION", val: "大阪市北区 / Osaka" },
];

export default function AboutPage() {
  return (
    <div className="page">
      <div className="ab-hero">
        <div className="ab-ph">
          <span className="pi">👤</span>
          <span className="pt">[ CHRIS PHOTO ]</span>
        </div>
        <div className="ab-intro">
          <span className="pre">ABOUT</span>
          <h1>
            大阪在住15年のアメリカ人フォトグラファー。ビジネスのための写真を撮っています。
          </h1>
          <p>
            飲食店、EC、企業、ブランドと仕事をしてきた経験から、写真がビジネスにどう機能するかを深く理解しています。Google
            Marketing認定取得。マーケティングとコミュニケーションの視点から撮影を設計します。
          </p>
          <p>
            日本語・英語・スペイン語対応。合同会社くりすさん代表。大阪市北区拠点。
          </p>
        </div>
      </div>
      <div className="ab-body">
        <div className="ab-col">
          <span className="ab-col-lbl">対応内容</span>
          <ul className="ab-list">
            {CAPABILITIES.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
        <div className="ab-col">
          <span className="ab-col-lbl">学歴・資格</span>
          <ul className="ab-list">
            {CREDENTIALS.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="ab-ct">
        {CONTACT.map((c) => (
          <div className="ab-ct-item" key={c.lbl}>
            <span className="lbl">{c.lbl}</span>
            <span className="val">{c.val}</span>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
