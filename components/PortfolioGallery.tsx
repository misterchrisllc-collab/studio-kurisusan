"use client";

import { useCallback, useEffect, useState } from "react";

type Shot = { src: string; cat: string; title: string; w: number; h: number };

const CAT_LABEL: Record<string, string> = {
  food: "飲食店・フード",
  product: "商品",
  fashion: "ファッション・人物",
  studio: "スタジオ",
};

const FILTERS = [
  { cat: "all", label: "すべて" },
  { cat: "food", label: "飲食店・フード" },
  { cat: "product", label: "商品" },
  { cat: "fashion", label: "ファッション・人物" },
  { cat: "studio", label: "スタジオ" },
];

// Ordered so the first 12 (the default preview) are a strong mix of categories.
const SHOTS: Shot[] = [
  { src: "/photos/portfolio/tonkatsu-staff.jpg", cat: "food", title: "とんかつ専門店 / スタッフ", w: 1280, h: 853 },
  { src: "/photos/portfolio/candles-lit.jpg", cat: "product", title: "キャンドル", w: 1280, h: 1280 },
  { src: "/photos/portfolio/fashion-pink-look.jpg", cat: "fashion", title: "ファッション / ルック", w: 1280, h: 1282 },
  { src: "/photos/portfolio/tonkatsu-plate.jpg", cat: "food", title: "とんかつ定食", w: 1280, h: 853 },
  { src: "/photos/portfolio/sriracha-lying.jpg", cat: "product", title: "ホットソース", w: 1280, h: 1600 },
  { src: "/photos/portfolio/model-natural.jpg", cat: "fashion", title: "ポートレート", w: 1280, h: 1920 },
  { src: "/photos/portfolio/tacos-platter.jpg", cat: "food", title: "タコス / プレート", w: 1280, h: 1600 },
  { src: "/photos/portfolio/natto-lift.jpg", cat: "product", title: "納豆 / シズル", w: 1280, h: 1920 },
  { src: "/photos/portfolio/fashion-pink-hold.jpg", cat: "fashion", title: "エディトリアル", w: 1280, h: 853 },
  { src: "/photos/portfolio/burger-cross.jpg", cat: "food", title: "スマッシュバーガー", w: 1280, h: 1425 },
  { src: "/photos/portfolio/candles-jars.jpg", cat: "product", title: "商品ラインナップ", w: 1280, h: 853 },
  { src: "/photos/portfolio/model-speaker.jpg", cat: "fashion", title: "ライフスタイル", w: 1280, h: 1920 },
  // ── revealed on expand ──
  { src: "/photos/portfolio/tonkatsu-chef.jpg", cat: "food", title: "調理風景", w: 1280, h: 853 },
  { src: "/photos/portfolio/sriracha-bottle.jpg", cat: "product", title: "パッケージ", w: 1280, h: 1707 },
  { src: "/photos/portfolio/fashion-pink-eye.jpg", cat: "fashion", title: "ビューティ", w: 1280, h: 1921 },
  { src: "/photos/portfolio/tacos-macro.jpg", cat: "food", title: "タコス", w: 1280, h: 1600 },
  { src: "/photos/portfolio/natto-bowl.jpg", cat: "product", title: "納豆", w: 1280, h: 1920 },
  { src: "/photos/portfolio/model-camera.jpg", cat: "fashion", title: "ポートレート", w: 1280, h: 1920 },
  { src: "/photos/portfolio/tonkatsu-shop.jpg", cat: "food", title: "店舗外観", w: 1280, h: 853 },
  { src: "/photos/portfolio/mayo-bottle.jpg", cat: "product", title: "調味料", w: 1280, h: 1920 },
  { src: "/photos/portfolio/burger-set.jpg", cat: "food", title: "セットメニュー", w: 1280, h: 1920 },
  { src: "/photos/portfolio/mayo-cap.jpg", cat: "product", title: "ディテール", w: 1280, h: 1920 },
  { src: "/photos/portfolio/tacos-table.jpg", cat: "food", title: "テーブルセット", w: 1280, h: 1600 },
  { src: "/photos/portfolio/tacos-shop.jpg", cat: "food", title: "店舗外観 / 夜", w: 1280, h: 720 },
  { src: "/photos/portfolio/burger-hand.jpg", cat: "food", title: "バーガー / 断面", w: 1280, h: 853 },
  { src: "/photos/portfolio/portrait-chris.jpg", cat: "studio", title: "フォトグラファー", w: 1280, h: 1280 },
  { src: "/photos/portfolio/studio-rig.jpg", cat: "studio", title: "商品撮影セット", w: 1280, h: 1920 },
  { src: "/photos/portfolio/studio-corner.jpg", cat: "studio", title: "撮影スペース", w: 1280, h: 1920 },
  { src: "/photos/portfolio/studio-shelf.jpg", cat: "studio", title: "スタジオ・機材", w: 1280, h: 1921 },
];

const INITIAL = 12;

export default function PortfolioGallery() {
  const [active, setActive] = useState("all");
  const [expanded, setExpanded] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered =
    active === "all" ? SHOTS : SHOTS.filter((s) => s.cat === active);
  const showAll = expanded || filtered.length <= INITIAL;
  const visible = showAll ? filtered : filtered.slice(0, INITIAL);
  const remaining = filtered.length - INITIAL;

  const changeFilter = (cat: string) => {
    setActive(cat);
    setExpanded(false);
  };

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (dir: number) =>
      setLightbox((i) =>
        i === null ? i : (i + dir + filtered.length) % filtered.length,
      ),
    [filtered.length],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, step]);

  const current = lightbox === null ? null : filtered[lightbox];

  return (
    <section className="pf" id="portfolio">
      <div className="pf-intro">
        <span className="pre">PORTFOLIO</span>
        <h2>作品集</h2>
        <p>
          飲食店・商品・ファッション・人物。大阪を拠点に撮影した実際の作品から。
        </p>
      </div>

      <div className="pf-filters">
        {FILTERS.map((f) => (
          <button
            key={f.cat}
            className={`pf-f${active === f.cat ? " on" : ""}`}
            onClick={() => changeFilter(f.cat)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="pf-grid" key={active}>
        {visible.map((s, i) => (
          <figure
            className="pf-item"
            key={s.src}
            style={{ animationDelay: `${Math.min(i, 12) * 0.035}s` }}
            role="button"
            tabIndex={0}
            aria-label={`${CAT_LABEL[s.cat]}・${s.title} を拡大表示`}
            onClick={() => setLightbox(filtered.indexOf(s))}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setLightbox(filtered.indexOf(s));
              }
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.src}
              alt={s.title}
              width={s.w}
              height={s.h}
              loading="lazy"
            />
            <figcaption>
              <span className="pf-cat">{CAT_LABEL[s.cat]}</span>
              <span className="pf-title">{s.title}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      {!showAll && remaining > 0 && (
        <div className="pf-more-wrap">
          <button className="pf-more" onClick={() => setExpanded(true)}>
            もっと作品を見る<span className="pf-more-count">（+{remaining}）</span>
          </button>
        </div>
      )}

      {current && (
        <div
          className="pf-lb"
          role="dialog"
          aria-modal="true"
          aria-label="作品ビューア"
          onClick={close}
        >
          <button className="pf-lb-close" aria-label="閉じる" onClick={close}>
            ×
          </button>
          <button
            className="pf-lb-nav prev"
            aria-label="前の作品"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
          >
            ‹
          </button>
          <figure className="pf-lb-fig" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={current.src} alt={current.title} />
            <figcaption>
              <span className="pf-cat">{CAT_LABEL[current.cat]}</span>
              <span className="pf-title">{current.title}</span>
              <span className="pf-lb-count">
                {(lightbox ?? 0) + 1} / {filtered.length}
              </span>
            </figcaption>
          </figure>
          <button
            className="pf-lb-nav next"
            aria-label="次の作品"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
