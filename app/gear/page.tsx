import Footer from "@/components/Footer";

export const metadata = {
  title: "制作環境",
  description:
    "どんな現場でも、安定した品質を。大阪のスタジオを拠点に、店舗・屋外・オフィスまで、状況に合わせて最適な制作環境で撮影します。",
  alternates: { canonical: "/gear" },
};

// Client-benefit framing first. The production environment is a means to
// reliable, consistent, high-quality work — not the product.
const BENEFITS = [
  {
    name: "どんな現場でも、安定した品質",
    desc: "店舗・屋外・オフィス・スタジオ。天候や時間帯に左右されず、狙った仕上がりを安定して届けます。",
  },
  {
    name: "状況に合わせた光づくり",
    desc: "自然光からライティングまで。料理・商品・人物・空間、それぞれに最適な見せ方を設計します。",
  },
  {
    name: "撮影から編集・納品まで一貫",
    desc: "企画から撮影、編集、データ納品までを自社で完結。スピードと品質を両立します。",
  },
  {
    name: "幅広い業種・被写体に対応",
    desc: "飲食・小売・EC・企業・イベントまで。業種を問わず、必要な画づくりに対応できる環境です。",
  },
];

type Item = { name: string; note: string };
type Group = { label: string; items: Item[] };

const COLUMNS: Group[][] = [
  [
    {
      label: "カメラボディ",
      items: [
        { name: "Fujifilm X-H2", note: "メイン" },
        { name: "Fujifilm X-T4", note: "サブ" },
        { name: "Fujifilm X-T100", note: "バックアップ" },
      ],
    },
    {
      label: "ヴィンテージ Nikon",
      items: [
        { name: "Nikkor-SC Auto 50mm f/1.4", note: "クラシック" },
        { name: "Nikkor-NC Auto 24mm f/2.8", note: "広角" },
        { name: "PC-Nikkor 35mm f/2.8", note: "アオリ" },
      ],
    },
  ],
  [
    {
      label: "Fujifilm レンズ",
      items: [
        { name: "XF 16-80mm f/4 OIS WR", note: "汎用" },
        { name: "XF 23mm f/2 WR", note: "広角" },
        { name: "XF 35mm f/2 WR", note: "標準" },
        { name: "XF 80mm f/2.8 Macro", note: "マクロ" },
        { name: "Tamron 18-300mm", note: "望遠" },
        { name: "TTArtisan 35mm f/1.4", note: "ポートレート" },
        { name: "TTArtisan 10mm f/2.8", note: "超広角" },
        { name: "Laowa 9mm f/2.8 Zero-D", note: "超広角" },
      ],
    },
  ],
  [
    {
      label: "ライティング",
      items: [
        { name: "Godox AD300 Pro", note: "メイン" },
        { name: "Godox AD100 Pro", note: "サブ" },
        { name: "Godox V1 Pro / TT685", note: "クリップオン" },
        { name: "RGB ライトスティック", note: "アクセント" },
      ],
    },
    {
      label: "動画・音声",
      items: [
        { name: "DJI RS 4", note: "ジンバル" },
        { name: "DJI Osmo Pocket", note: "コンパクト" },
        { name: "GoPro Max", note: "360°" },
        { name: "DJI Mic Mini", note: "マイク" },
      ],
    },
    {
      label: "スタジオ",
      items: [
        { name: "白・黒・グレー背景", note: "定番3色" },
        { name: "カラーペーパー・ビニール", note: "約20色" },
        { name: "商品撮影テーブル", note: "フラット対応" },
      ],
    },
  ],
];

export default function GearPage() {
  return (
    <div className="page">
      <div className="gr-hero">
        <span className="pre">STUDIO</span>
        <h1>制作環境</h1>
        <p>
          「どんな現場でも、安定した品質を。」大阪のスタジオを拠点に、店舗・屋外・オフィスまで、状況に合わせて最適な制作環境をつくります。だから、天候や場所に左右されず、安心してお任せいただけます。
        </p>
      </div>

      <section className="gr-benefits">
        <div className="sp-flow-hd">
          <h2>安定した品質を、どんな現場でも</h2>
          <p>
            機材やスタジオは目的ではなく、良い仕事を安定して届けるための手段です。だからこそ、現場に合わせて柔軟に環境を整えます。
          </p>
        </div>
        <ul className="sp-flow-grid">
          {BENEFITS.map((b) => (
            <li key={b.name}>
              <span className="sp-flow-n">{b.name}</span>
              <span className="sp-flow-d">{b.desc}</span>
            </li>
          ))}
        </ul>
      </section>

      <details className="gr-details">
        <summary>機材・技術仕様を見る</summary>
        <p className="gr-note">
          技術的な詳細をご希望の方へ。使用する主な機材の一覧です。
        </p>
        <div className="gr-cols">
          {COLUMNS.map((groups, ci) => (
            <div className="gr-col" key={ci}>
              {groups.map((group, gi) => (
                <div key={group.label}>
                  {gi > 0 && <div className="g-sp"></div>}
                  <span className="gr-lbl">{group.label}</span>
                  {group.items.map((item) => (
                    <div className="gi" key={item.name}>
                      <span className="gi-n">{item.name}</span>
                      <span className="gi-nt">{item.note}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </details>

      <Footer />
    </div>
  );
}
