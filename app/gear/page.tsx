import Footer from "@/components/Footer";

export const metadata = {
  title: "機材リスト",
  description:
    "Fujifilmボディにヴィンテージニッコールレンズ。自然光からGodoxストロボまで、あらゆる現場に対応する機材リスト。",
  alternates: { canonical: "/gear" },
};

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
        <span className="pre">GEAR</span>
        <h1>機材リスト</h1>
        <p>
          Fujifilmボディにヴィンテージニッコールレンズ。自然光からGodoxストロボまで、あらゆる現場に対応します。
        </p>
      </div>
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
      <Footer />
    </div>
  );
}
