"use client";

import { useCallback, useEffect, useState } from "react";
import PortfolioImage, { resolvePhoto, type Ratio } from "./PortfolioImage";

/* Layout first. `span` is the grid decision (how much room the photo gets);
   `ratio` is the shape the photo will eventually be cropped to. They are
   separate on purpose: retune rhythm without touching a photo, re-crop a photo
   without touching the layout.

   Rows below are kept ratio-homogeneous so tiles align both now (originals at
   natural aspect) and later (dedicated crops at the declared ratio). */
type Span = 3 | 4 | 6 | 8 | 12;
type Shot = { base: string; ratio: Ratio; span: Span; cat: string; title: string };

const CAT_LABEL: Record<string, string> = {
  food: "飲食店・フード",
  space: "空間・店舗",
  event: "イベント・PR",
  product: "商品",
  fashion: "ファッション・人物",
  studio: "スタジオ",
};

const FILTERS = [
  { cat: "all", label: "すべて" },
  { cat: "food", label: "飲食店・フード" },
  { cat: "space", label: "空間・店舗" },
  { cat: "event", label: "イベント・PR" },
  { cat: "product", label: "商品" },
  { cat: "fashion", label: "ファッション・人物" },
  { cat: "studio", label: "スタジオ" },
];

const SIZES: Record<Span, string> = {
  12: "100vw",
  8: "(max-width:640px) 100vw, 67vw",
  6: "(max-width:640px) 100vw, 50vw",
  4: "(max-width:640px) 50vw, 33vw",
  3: "(max-width:640px) 50vw, 25vw",
};

const SHOTS: Shot[] = [
  // ── statement ──
  { base: "kominka-exterior-night", ratio: "banner", span: 12, cat: "space", title: "古民家 / 夜の佇まい" },
  // ── dense portrait row ──
  { base: "cafe-owner", ratio: "portrait", span: 3, cat: "fashion", title: "店主 / ポートレート" },
  { base: "tacos-event-chef", ratio: "portrait", span: 3, cat: "event", title: "タコス店 / つくり手" },
  { base: "natto-lift", ratio: "portrait", span: 3, cat: "product", title: "納豆 / シズル" },
  { base: "bagel-stack", ratio: "portrait", span: 3, cat: "food", title: "ベーグル" },
  // ── paired landscape ──
  { base: "tonkatsu-staff", ratio: "landscape", span: 6, cat: "food", title: "とんかつ専門店 / スタッフ" },
  { base: "tacos-shop", ratio: "landscape", span: 6, cat: "food", title: "店舗外観 / 夜" },
  // ── square row ──
  { base: "candles-lit", ratio: "square", span: 4, cat: "product", title: "キャンドル" },
  { base: "wagashi-dorayaki", ratio: "square", span: 4, cat: "food", title: "和菓子 / どら焼き" },
  { base: "fashion-pink-look", ratio: "square", span: 4, cat: "fashion", title: "ファッション / ルック" },
  // ── wide + vertical ──
  { base: "tacos-event-guests", ratio: "landscape", span: 8, cat: "event", title: "ポップアップ / 来場者" },
  { base: "model-speaker", ratio: "tall", span: 4, cat: "fashion", title: "ライフスタイル" },
  // ── dense portrait row ──
  { base: "sriracha-lying", ratio: "portrait", span: 3, cat: "product", title: "ホットソース" },
  { base: "tacos-platter", ratio: "portrait", span: 3, cat: "food", title: "タコス / プレート" },
  { base: "cafe-counter", ratio: "portrait", span: 3, cat: "space", title: "喫茶店 / カウンター" },
  { base: "model-camera", ratio: "portrait", span: 3, cat: "fashion", title: "ポートレート" },
  // ── paired landscape ──
  { base: "tonkatsu-plate", ratio: "landscape", span: 6, cat: "food", title: "とんかつ定食" },
  { base: "brand-donut-model", ratio: "landscape", span: 6, cat: "fashion", title: "ブランド / ライフスタイル" },
  // ── dense portrait row ──
  { base: "burger-set", ratio: "portrait", span: 3, cat: "food", title: "セットメニュー" },
  { base: "mayo-bottle", ratio: "portrait", span: 3, cat: "product", title: "調味料" },
  { base: "taco-flatlay", ratio: "portrait", span: 3, cat: "food", title: "タコス / スタイリング" },
  { base: "fashion-pink-eye", ratio: "portrait", span: 3, cat: "fashion", title: "ビューティ" },
  // ── square row ──
  { base: "diner-burger", ratio: "square", span: 4, cat: "food", title: "バーガー / ダイナー" },
  { base: "portrait-chris", ratio: "square", span: 4, cat: "studio", title: "フォトグラファー" },
  { base: "burger-cross", ratio: "square", span: 4, cat: "food", title: "スマッシュバーガー" },

  // ───────────── revealed on expand ─────────────
  { base: "kominka-exterior-day", ratio: "landscape", span: 6, cat: "space", title: "古民家 / 外観" },
  { base: "kominka-moon-door", ratio: "landscape", span: 6, cat: "space", title: "円窓のディテール" },
  { base: "kominka-chair", ratio: "tall", span: 4, cat: "space", title: "くつろぎの空間" },
  { base: "tacos-event-night", ratio: "tall", span: 4, cat: "event", title: "イベント / 会場の熱気" },
  { base: "studio-rig", ratio: "tall", span: 4, cat: "studio", title: "商品撮影セット" },
  { base: "tonkatsu-chef", ratio: "landscape", span: 6, cat: "food", title: "調理風景" },
  { base: "kominka-lattice", ratio: "landscape", span: 6, cat: "space", title: "格子と余白" },
  { base: "cafe-pourover", ratio: "portrait", span: 3, cat: "food", title: "コーヒーの手仕事" },
  { base: "donut-blue", ratio: "portrait", span: 3, cat: "food", title: "ドーナツ / 商品" },
  { base: "natto-bowl", ratio: "portrait", span: 3, cat: "product", title: "納豆" },
  { base: "model-natural", ratio: "portrait", span: 3, cat: "fashion", title: "ポートレート" },
  { base: "candles-jars", ratio: "landscape", span: 6, cat: "product", title: "商品ラインナップ" },
  { base: "bagel-sando", ratio: "portrait", span: 3, cat: "food", title: "ベーグルサンド" },
  { base: "mayo-cap", ratio: "portrait", span: 3, cat: "product", title: "ディテール" },
  { base: "tacos-macro", ratio: "portrait", span: 3, cat: "food", title: "タコス" },
  { base: "sriracha-bottle", ratio: "portrait", span: 3, cat: "product", title: "パッケージ" },
  { base: "tacos-event-table", ratio: "landscape", span: 6, cat: "event", title: "ポップアップ / 相席の様子" },
  { base: "tacos-event-staff", ratio: "landscape", span: 6, cat: "event", title: "イベント / スタッフ" },
  { base: "tacos-table", ratio: "portrait", span: 3, cat: "food", title: "テーブルセット" },
  { base: "tacos-beer-set", ratio: "portrait", span: 3, cat: "food", title: "クラフトビール / コラボ" },
  { base: "studio-corner", ratio: "portrait", span: 3, cat: "studio", title: "撮影スペース" },
  { base: "studio-shelf", ratio: "portrait", span: 3, cat: "studio", title: "スタジオ・機材" },
  { base: "tonkatsu-shop", ratio: "landscape", span: 6, cat: "food", title: "店舗外観" },
  { base: "burger-hand", ratio: "landscape", span: 6, cat: "food", title: "バーガー / 断面" },
  { base: "fashion-pink-hold", ratio: "landscape", span: 6, cat: "fashion", title: "エディトリアル" },
  { base: "tacos-event-venue", ratio: "landscape", span: 6, cat: "event", title: "会場の様子" },
];

const INITIAL = 25;

export default function PortfolioGallery() {
  const [active, setActive] = useState("all");
  const [expanded, setExpanded] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = active === "all" ? SHOTS : SHOTS.filter((s) => s.cat === active);
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
        <h2>WORKS</h2>
        <p>飲食店・商品・ファッション・人物。大阪を拠点に撮影した実際の作品から。</p>
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
            className={`pf-item s${s.span}`}
            key={s.base}
            style={{ animationDelay: `${Math.min(i, 12) * 0.03}s` }}
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
            <PortfolioImage
              base={s.base}
              ratio={s.ratio}
              alt={s.title}
              sizes={SIZES[s.span]}
              priority={i < 3}
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
            {/* Lightbox always shows the uncropped original. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={resolvePhoto(current.base, current.ratio).src} alt={current.title} />
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
