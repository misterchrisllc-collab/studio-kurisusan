import Footer from "@/components/Footer";

export const metadata = {
  title: "私たちについて",
  description:
    "写真を軸に、お店やブランドが「自分たちらしく伝わる」ことを手伝う。Studio くりすさんの考え方について。",
  alternates: { canonical: "/about" },
};

const CAN_DO = [
  "写真を軸にしたブランドづくり",
  "コマーシャル・フォトグラフィー",
  "クリエイティブディレクション",
  "ビジュアルブランディング・デザイン",
  "SNS・ショート動画などのコンテンツ",
  "AIを活用した企画・アイデア出し",
];

const VALUES = [
  "撮影の前に、まずビジネスを理解する",
  "新しいツールも、対話も大切にする",
  "写真を軸に、伝え方まで一貫させる",
  "その事業ならではの「らしさ」を形にする",
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="slot-img"
            src="/photos/portrait.jpg"
            alt="Studio くりすさん フォトグラファー Chris"
          />
        </div>
        <div className="ab-intro">
          <span className="pre">ABOUT</span>
          <h1>
            私の仕事は、写真を届けることではありません。そのお店やブランドが「自分たちらしく伝わること」です。
          </h1>
          <p>
            いまは、誰でもきれいな画像をつくれる時代です。スマートフォンでも、AIでも。だからこそ難しいのは、上手な写真を撮ることよりも、その事業の「らしさ」が本当に伝わるビジュアルをつくることだと考えています。
          </p>
          <p>
            私はAIや新しいツールも積極的に使います。それでも、記憶に残るブランドは、対話と理解、そして本物の写真から生まれると信じています。だから撮影の前に、まずビジネスを理解することから始めます。
          </p>
          <p>
            日本語・英語・スペイン語で対応。大阪を拠点に、合同会社くりすさん代表。
          </p>
        </div>
      </div>
      <div className="ab-body">
        <div className="ab-col">
          <span className="ab-col-lbl">できること</span>
          <ul className="ab-list">
            {CAN_DO.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
        <div className="ab-col">
          <span className="ab-col-lbl">大切にしていること</span>
          <ul className="ab-list">
            {VALUES.map((c) => (
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
