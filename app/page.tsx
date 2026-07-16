import Link from "next/link";
import Footer from "@/components/Footer";

// Seven solutions — named only on the homepage. The /services page explains and prices them.
const SOLUTIONS = [
  { name: "開業・オープンブランディング", en: "Business Launch" },
  { name: "ブランドリフレッシュ", en: "Brand Refresh" },
  { name: "Googleビジネス強化", en: "Google Business Boost" },
  { name: "採用ブランディング", en: "Recruitment Branding" },
  { name: "クリエイティブパートナー", en: "Creative Partner", flagship: true },
  { name: "イベント・PR撮影", en: "Event Marketing Content" },
  { name: "季節・スポットキャンペーン", en: "Seasonal Campaigns" },
];

export default function Home() {
  return (
    <div className="page">
      {/* HERO — the image as art, type in the negative space */}
      <section className="eh">
        <div className="eh-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/photos/hero-cafe.jpg"
            alt="大阪の喫茶店の内観。木のカウンターと灯りのともる窓、あたたかい空気感"
          />
        </div>
        <div className="eh-txt">
          <h1 className="eh-line">
            お店やブランドを、<br />
            もっと<em>選ばれる</em>存在へ。
          </h1>
          <span className="eh-kicker">商業写真 · ビジュアルブランディング</span>
          <span className="eh-place">大阪・関西 ／ 日本語・English</span>
        </div>
        <span className="eh-scroll" aria-hidden="true">Scroll</span>
      </section>

      {/* STATEMENT — quiet, confident, breathing */}
      <section className="estmt">
        <div className="estmt-in">
          <h2>
            「らしさ」を、<br />
            <em>伝わる</em>形に。
          </h2>
          <p>写真・デザイン・戦略で、小さなビジネスの「伝わらない」を解決する。</p>
        </div>
      </section>

      {/* SELECTED WORK — art-directed plates, each composition different */}
      <section className="ework">
        <div className="ework-hd">
          <span className="eyebrow-m">Selected Work</span>
          <Link href="/works" className="hlink">
            作品をすべて見る →
          </Link>
        </div>

        {/* Plate 1 — full bleed */}
        <Link href="/works" className="plate-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/photos/portfolio/kominka-moon-door.jpg" alt="古民家を改装した店舗の円窓、空間・店舗撮影" />
          <span className="plate-cap">空間・店舗</span>
        </Link>

        {/* Plate 2 — offset portrait + air (image left, one line right) */}
        <div className="plate-split">
          <Link href="/works" className="ps-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/photos/portfolio/cafe-owner.jpg" alt="喫茶店の店主のポートレート、人とブランドの撮影" />
          </Link>
          <div className="ps-txt">
            <span className="eyebrow-m">人・ブランド</span>
            <p>働く人の空気まで、<br />ブランドになる。</p>
          </div>
        </div>

        {/* Plate 3 — duo at two scales */}
        <div className="plate-duo">
          <Link href="/works" className="pd-a">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/photos/portfolio/wagashi-dorayaki.jpg" alt="和菓子のどら焼きの撮影、飲食店・フードビジュアル" />
            <span className="plate-cap">飲食・フード</span>
          </Link>
          <Link href="/works" className="pd-b">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/photos/portfolio/sriracha-lying.jpg" alt="ホットソースの商品撮影、EC・ブランド向けビジュアル" />
            <span className="plate-cap">商品・EC</span>
          </Link>
        </div>
      </section>

      {/* SERVICES — a quiet index. Names only. */}
      <section className="sidx">
        <div className="sidx-hd">
          <span className="eyebrow-m">できること — What we do</span>
          <Link href="/services" className="hlink">
            詳しく見る →
          </Link>
        </div>
        <ul className="sidx-list">
          {SOLUTIONS.map((s) => (
            <li key={s.en} className={s.flagship ? "flag" : undefined}>
              <Link href="/services">
                <span className="sidx-name">{s.name}</span>
                <span className="sidx-en">{s.en}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* CLOSE — an intimate frame, one line, one action */}
      <section className="eclose">
        <div className="eclose-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/photos/hero-kominka.jpg" alt="夜の古民家を改装した空間、あたたかい灯りの外観。飲食・宿・物販・ブランドに通じる佇まい" />
        </div>
        <div className="eclose-in">
          <h2>
            まず、<em>話しましょう。</em>
          </h2>
          <p>撮影内容が決まっていなくても構いません。相談は無料です。</p>
          <Link href="/contact" className="btn-p">
            プロジェクトを相談する
          </Link>
        </div>
      </section>

      {/* KANSAI SNAPS — one studio, two brands. A quiet transition, not an ad. */}
      <section className="ksnap">
        <a
          className="ks-img"
          href="https://kansai-snaps.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/photos/kansai-snaps-portrait.jpg"
            alt="Kansai Snaps によるポートレート。関西の街並みで撮る、エディトリアルな人物写真"
          />
        </a>
        <div className="ks-txt">
          <span className="ks-eyebrow">私たちのもうひとつのブランド</span>
          <div className="ks-rel">
            <span className="ks-parent">
              Studio くりすさん
              <i>企業・店舗向けクリエイティブスタジオ</i>
            </span>
            <span className="ks-arrow" aria-hidden="true">↓</span>
            <span className="ks-child">
              Kansai Snaps
              <i>個人向けポートレートブランド</i>
            </span>
          </div>
          <h2 className="ks-line">ポートレートをお探しですか？</h2>
          <p>
            Studio くりすさんでは企業・店舗向けのクリエイティブ制作を行っています。個人向けのポートレート撮影は、私たちのポートレートブランド Kansai Snaps でご案内しています。
          </p>
          <a
            className="ks-link"
            href="https://kansai-snaps.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kansai Snaps を見る →
          </a>
        </div>
      </section>

      <Footer variant="home" />
    </div>
  );
}
