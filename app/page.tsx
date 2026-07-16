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
      {/* HERO — full-bleed slideshow: welcome → atmosphere → food → space → craft → people */}
      <section className="ih">
        <div className="ih-bg" aria-hidden="true">
          {/* eslint-disable @next/next/no-img-element */}
          <img src="/photos/hero-cafe.jpg" alt="" />
          <img src="/photos/portfolio/tacos-event-venue.jpg" alt="" />
          <img src="/photos/portfolio/tonkatsu-plate.jpg" alt="" />
          <img src="/photos/portfolio/kominka-exterior-night.jpg" alt="" />
          <img src="/photos/portfolio/cafe-pourover.jpg" alt="" />
          <img src="/photos/portfolio/tonkatsu-chef.jpg" alt="" />
          {/* eslint-enable @next/next/no-img-element */}
        </div>
        <div className="ih-in">
          <span className="ih-eyebrow">商業写真 ・ ビジュアルブランディング</span>
          <h1 className="ih-title">
            <em>「ようこそ」</em>は、<br />
            言葉より先に。
          </h1>
          <span className="ih-triad">Welcome, before a word is spoken.</span>
          <div className="ih-cta">
            <Link href="/contact" className="ibtn">
              相談する
            </Link>
            <span className="ih-place">大阪・関西 ／ 日本語・English</span>
          </div>
        </div>
        <span className="ih-scroll" aria-hidden="true">SCROLL</span>
      </section>

      {/* PHILOSOPHY — two-column: the studio's belief + a warm human frame */}
      <section className="iphil">
        <div className="iphil-txt">
          <span className="ith-eyebrow">PHILOSOPHY ・ 私たちの考え</span>
          <h2>
            ビジュアルは、<br />
            「ようこそ」と<em>「おかえり」</em>を、<br />
            伝えている。
          </h2>
          <p>
            時代は変わっていく。人がお店を見つける方法も、選ぶ理由も。お客様が「いらっしゃいませ」と迎えられる前に、ホームページも、Googleビジネスも、Instagramも、店先も、もう語りはじめています。ビジュアルは、いわば、お客様が最初に出会うスタッフ。私たちの仕事は、その第一声を、あなたのお店らしさで満たすことです。
          </p>
        </div>
        <div className="iphil-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/photos/portfolio/cafe-owner.jpg" alt="喫茶店の店主のポートレート。店の人柄が伝わる一枚" />
        </div>
      </section>

      {/* PEOPLE — the feeling. Atmosphere, customers, staff working. */}
      <section className="ifeel">
        <div className="ifeel-lead">
          <span className="ieyebrow">PEOPLE ・ 人と、その空気</span>
        </div>
        <div className="ifeel-hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/photos/portfolio/tacos-event-guests.jpg" alt="お店で笑い合うお客様たち。店の空気が伝わる一枚" />
          <div className="ifeel-cap">
            <span className="ipl-t">
              「また来たい」は、<br />
              空気からはじまる。
            </span>
          </div>
        </div>
        <div className="ifeel-row">
          {/* eslint-disable @next/next/no-img-element */}
          <div className="ife-c">
            <img src="/photos/portfolio/brand-donut-model.jpg" alt="商品を手に笑うお客様" />
          </div>
          <div className="ife-c">
            <img src="/photos/portfolio/tonkatsu-staff.jpg" alt="笑顔で働くお店のスタッフ" />
          </div>
          <div className="ife-c">
            <img src="/photos/portfolio/tacos-event-staff.jpg" alt="店を切り盛りするスタッフ" />
          </div>
          {/* eslint-enable @next/next/no-img-element */}
        </div>
      </section>

      {/* FOOD — appetizing energy, asymmetric editorial */}
      <section className="ifood">
        <div className="ifood-hd">
          <span className="ieyebrow">FOOD ・ 飲食</span>
        </div>
        <div className="ifood-grid">
          <Link href="/works" className="ifood-a">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/photos/portfolio/burger-hand.jpg" alt="飲食店のフード撮影。シズル感のあるビジュアル" />
          </Link>
          <div className="ifood-txt">
            <p className="ipl-t dark">
              おいしさも、<br />
              人柄も。
            </p>
            <Link href="/works" className="ifood-b">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/photos/portfolio/tacos-table.jpg" alt="料理を囲むテーブルの撮影" />
            </Link>
          </div>
        </div>
      </section>

      {/* PRODUCTS — a quiet lineup, natural aspect, no crops */}
      <section className="iprod">
        <div className="iprod-hd">
          <span className="ieyebrow">PRODUCT ・ 商品・EC</span>
          <span className="iprod-line">そのこだわりを、まっすぐ。</span>
        </div>
        <div className="iprod-row">
          {/* eslint-disable @next/next/no-img-element */}
          <Link href="/works" className="iprod-c">
            <img src="/photos/portfolio/sriracha-lying.jpg" alt="ホットソースの商品撮影" />
          </Link>
          <Link href="/works" className="iprod-c">
            <img src="/photos/portfolio/donut-blue.jpg" alt="ドーナツの商品撮影" />
          </Link>
          <Link href="/works" className="iprod-c">
            <img src="/photos/portfolio/natto-lift.jpg" alt="納豆の商品撮影" />
          </Link>
          {/* eslint-enable @next/next/no-img-element */}
        </div>
      </section>

      {/* SPACES — clean 2×2 landscape grid, natural composition */}
      <section className="ispace">
        <div className="ispace-hd">
          <span className="ieyebrow">SPACE ・ 空間・店舗</span>
          <Link href="/works" className="ilink">
            すべての作品を見る →
          </Link>
        </div>
        <div className="ispace-grid">
          {/* eslint-disable @next/next/no-img-element */}
          <Link href="/works" className="isp-c">
            <img src="/photos/portfolio/kominka-exterior-day.jpg" alt="古民家を改装した店舗の外観" />
          </Link>
          <Link href="/works" className="isp-c">
            <img src="/photos/portfolio/kominka-lattice.jpg" alt="格子と設えのある店内" />
          </Link>
          <Link href="/works" className="isp-c">
            <img src="/photos/portfolio/kominka-dining-night.jpg" alt="夜の店内、あたたかい灯り" />
          </Link>
          <Link href="/works" className="isp-c">
            <img src="/photos/portfolio/kominka-moon-door.jpg" alt="円窓のある空間" />
          </Link>
          {/* eslint-enable @next/next/no-img-element */}
        </div>
      </section>

      {/* WHAT WE DO — bold gothic index. Names only. */}
      <section className="isvc">
        <div className="isvc-hd">
          <span className="ieyebrow">WHAT WE DO ・ できること</span>
          <Link href="/services" className="ilink">
            詳しく見る →
          </Link>
        </div>
        <ul className="isvc-list">
          {SOLUTIONS.map((s) => (
            <li key={s.en} className={s.flagship ? "flag" : undefined}>
              <Link href="/services">
                <span className="isvc-name">{s.name}</span>
                <span className="isvc-en">{s.en}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* CLOSE — full-bleed, bold CTA */}
      <section className="iclose">
        <div className="iclose-bg" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/photos/hero-kominka.jpg" alt="" />
        </div>
        <div className="iclose-in">
          <h2>
            その<em>「らしさ」</em>を、<br />
            一緒に見つけましょう。
          </h2>
          <p>何を撮るか決まっていなくても大丈夫です。まずは、お店のことを聞かせてください。ご相談は無料です。</p>
          <Link href="/contact" className="ibtn light">
            相談する
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
