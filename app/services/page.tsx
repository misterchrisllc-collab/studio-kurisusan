import Footer from "@/components/Footer";
import PriceCalculator from "@/components/PriceCalculator";

export const metadata = {
  title: "サービス・料金 | STUDIOくりすさん",
  description:
    "店舗・飲食店撮影、商品・EC撮影、企業・採用撮影、コンテンツ制作。大阪の商業撮影スタジオの料金一覧。",
};

type Row = { name: string; desc: string; price: string };
type Section = { title: string; outcome: string; rows: Row[] };

const SECTIONS: Section[] = [
  {
    title: "店舗・飲食店撮影",
    outcome: "集客・来店・Googleマップの改善に",
    rows: [
      {
        name: "Googleマップ更新パッケージ",
        desc: "15枚〜。Googleマップ・Tabelog・Hot Pepper掲載対応。",
        price: "¥35,000〜",
      },
      {
        name: "料理・メニュー撮影",
        desc: "SNS、メニューブック、WEB用。20枚〜。",
        price: "¥50,000〜",
      },
      {
        name: "店内・空間撮影",
        desc: "内観・外観・雰囲気。15枚〜。",
        price: "¥50,000〜",
      },
      {
        name: "フルブランドパッケージ",
        desc: "料理・店内・スタッフ・動画。1回で素材をまとめて。",
        price: "¥95,000〜",
      },
    ],
  },
  {
    title: "商品・EC撮影",
    outcome: "ECコンバージョン・ブランドイメージの向上に",
    rows: [
      {
        name: "スタジオ商品撮影",
        desc: "白・黒・カラー背景。EC、カタログ、SNS広告用。",
        price: "¥30,000〜",
      },
      {
        name: "ライフスタイル商品撮影",
        desc: "使用シーンを想定した撮影。ブランドイメージを伝える。",
        price: "¥45,000〜",
      },
    ],
  },
  {
    title: "企業・採用撮影",
    outcome: "採用力・コーポレートブランドの強化に",
    rows: [
      {
        name: "スタッフ・採用写真",
        desc: "コーポレートサイト・採用ページ・SNS用。",
        price: "¥45,000〜",
      },
      {
        name: "コーポレートブランディング",
        desc: "オフィス・現場・チームの撮影。企業文化を伝える。",
        price: "¥70,000〜",
      },
      {
        name: "建設・リノベーション記録",
        desc: "施工前・中・後の記録。提案書・実績紹介に。",
        price: "¥40,000〜",
      },
    ],
  },
  {
    title: "コンテンツ制作",
    outcome: "SNS・動画・バイリンガルコンテンツ",
    rows: [
      {
        name: "リール・ショート動画",
        desc: "TikTok・Instagram・YouTube Shorts。1本から。",
        price: "¥15,000〜",
      },
      {
        name: "バイリンガルキャプション",
        desc: "日本語・英語のSNSキャプション制作。",
        price: "¥8,000〜",
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="page">
      <div className="sp-hero">
        <span className="pre">SERVICES</span>
        <h1>サービス・料金</h1>
      </div>
      <div className="sp-body">
        {SECTIONS.map((sec) => (
          <div className="sp-sec" key={sec.title}>
            <div className="sp-sec-hd">
              <div className="sp-sec-t">{sec.title}</div>
              <div className="sp-sec-oc">{sec.outcome}</div>
            </div>
            <div>
              {sec.rows.map((row) => (
                <div className="sp-row" key={row.name}>
                  <div className="sp-row-n">{row.name}</div>
                  <div className="sp-row-d">{row.desc}</div>
                  <div className="sp-row-p">{row.price}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <PriceCalculator />
      <Footer />
    </div>
  );
}
