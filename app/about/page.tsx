import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = {
  title: "私たちについて",
  description:
    "写真を軸に、お店やブランドが「自分たちらしく伝わる」ことを手伝う。Studio くりすさんの考え方について。",
  alternates: { canonical: "/about" },
};

const CAN_DO = [
  "写真を軸にしたブランドづくり",
  "ビジュアル戦略・ブランド設計",
  "クリエイティブディレクション",
  "ビジュアルブランディング・デザイン",
  "SNS・ショート動画などのコンテンツ",
  "AIを活用した企画・アイデア出し",
];

// Fields with real work behind them on this site (飲食/小売/商品/空間/イベント).
// A quiet credibility cue, not a client roster.
const FIELDS = ["飲食", "小売", "商品", "空間", "イベント"];

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
            alt="Studio くりすさん 代表 Chris のポートレート"
          />
        </div>
        <div className="ab-intro">
          <span className="pre">ABOUT</span>
          <h1>
            私の仕事は、写真を届けることではありません。そのお店やブランドが「自分たちらしく伝わること」です。
          </h1>
          <p>
            大切なのは、上手な写真を撮ることではありません。その事業が本当は何者なのかを、まっすぐ伝えることです。
          </p>
          <p>
            きれいな画像なら、いまは誰でもつくれます。それでも記憶に残るブランドは、対話と理解から生まれます。だから撮影の前に、まずそのビジネスを理解することから始めます。
          </p>
          <div className="ab-sig">
            <span className="ab-sig-name">合同会社くりすさん 代表　Chris</span>
            <span className="ab-sig-meta">日本語 ・ English ・ Español ／ 大阪</span>
          </div>
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
      <div className="ab-fields">
        <span className="ab-fields-lbl">FIELDS ・ ご一緒してきた分野</span>
        <ul className="ab-fields-row">
          {FIELDS.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>
      <div className="ab-note">
        <p>
          撮影・制作の品質を支える
          <Link href="/gear">制作環境（スタジオ・機材）</Link>
          についても、ご覧いただけます。
        </p>
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
