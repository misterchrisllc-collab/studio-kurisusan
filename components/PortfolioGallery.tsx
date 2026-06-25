"use client";

import { useState } from "react";

type Shot = { src: string; cat: string; caption: string };

const FILTERS = [
  { cat: "all", label: "すべて" },
  { cat: "food", label: "飲食店・フード" },
  { cat: "product", label: "商品" },
  { cat: "fashion", label: "ファッション・人物" },
  { cat: "studio", label: "スタジオ" },
];

const SHOTS: Shot[] = [
  { src: "/photos/portfolio/tonkatsu-staff.jpg", cat: "food", caption: "とんかつ専門店・スタッフ" },
  { src: "/photos/portfolio/tonkatsu-plate.jpg", cat: "food", caption: "とんかつ定食" },
  { src: "/photos/portfolio/tonkatsu-chef.jpg", cat: "food", caption: "仕込み中の職人" },
  { src: "/photos/portfolio/tacos-platter.jpg", cat: "food", caption: "タコス・プレート" },
  { src: "/photos/portfolio/burger-cross.jpg", cat: "food", caption: "スマッシュバーガー" },
  { src: "/photos/portfolio/tacos-macro.jpg", cat: "food", caption: "タコス・クローズアップ" },
  { src: "/photos/portfolio/tonkatsu-shop.jpg", cat: "food", caption: "店舗外観" },
  { src: "/photos/portfolio/burger-set.jpg", cat: "food", caption: "セットメニュー" },
  { src: "/photos/portfolio/tacos-table.jpg", cat: "food", caption: "タコス・テーブル" },
  { src: "/photos/portfolio/tacos-shop.jpg", cat: "food", caption: "店舗外観・夜" },
  { src: "/photos/portfolio/burger-hand.jpg", cat: "food", caption: "断面" },

  { src: "/photos/portfolio/sriracha-lying.jpg", cat: "product", caption: "ホットソース" },
  { src: "/photos/portfolio/candles-lit.jpg", cat: "product", caption: "キャンドル" },
  { src: "/photos/portfolio/natto-lift.jpg", cat: "product", caption: "納豆・シズル" },
  { src: "/photos/portfolio/sriracha-bottle.jpg", cat: "product", caption: "ボトル・赤" },
  { src: "/photos/portfolio/candles-jars.jpg", cat: "product", caption: "商品ラインナップ" },
  { src: "/photos/portfolio/mayo-bottle.jpg", cat: "product", caption: "ボトル" },
  { src: "/photos/portfolio/natto-bowl.jpg", cat: "product", caption: "納豆" },
  { src: "/photos/portfolio/mayo-cap.jpg", cat: "product", caption: "調味料・ディテール" },

  { src: "/photos/portfolio/fashion-pink-look.jpg", cat: "fashion", caption: "ファッション・ルック" },
  { src: "/photos/portfolio/model-natural.jpg", cat: "fashion", caption: "ナチュラル・ポートレート" },
  { src: "/photos/portfolio/fashion-pink-hold.jpg", cat: "fashion", caption: "ファッション・エディトリアル" },
  { src: "/photos/portfolio/model-speaker.jpg", cat: "fashion", caption: "ライフスタイル・モデル" },
  { src: "/photos/portfolio/fashion-pink-eye.jpg", cat: "fashion", caption: "ビューティ" },
  { src: "/photos/portfolio/model-camera.jpg", cat: "fashion", caption: "ポートレート" },

  { src: "/photos/portfolio/portrait-chris.jpg", cat: "studio", caption: "フォトグラファー" },
  { src: "/photos/portfolio/studio-rig.jpg", cat: "studio", caption: "商品撮影セット" },
  { src: "/photos/portfolio/studio-corner.jpg", cat: "studio", caption: "撮影スペース" },
  { src: "/photos/portfolio/studio-shelf.jpg", cat: "studio", caption: "スタジオ・機材" },
];

export default function PortfolioGallery() {
  const [active, setActive] = useState("all");
  const shots = active === "all" ? SHOTS : SHOTS.filter((s) => s.cat === active);

  return (
    <section className="pf">
      <div className="pf-intro">
        <span className="pre">PORTFOLIO</span>
        <h2>作品集</h2>
        <p>飲食店・商品・ファッション・人物。大阪を拠点に撮影した実際の作品から。</p>
      </div>

      <div className="pf-filters">
        {FILTERS.map((f) => (
          <button
            key={f.cat}
            className={`pf-f${active === f.cat ? " on" : ""}`}
            onClick={() => setActive(f.cat)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="pf-grid">
        {shots.map((s) => (
          <figure className="pf-item" key={s.src}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.src} alt={s.caption} loading="lazy" />
            <figcaption>{s.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
