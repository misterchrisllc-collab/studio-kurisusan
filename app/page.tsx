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
      {/* HERO — full-bleed rotating photography, bold statement over the image */}
      <section className="ih">
        <div className="ih-bg" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/photos/portfolio/tonkatsu-plate.jpg" alt="" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/photos/portfolio/sriracha-lying.jpg" alt="" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/photos/hero-cafe.jpg" alt="" />
        </div>
        <div className="ih-in">
          <span className="ih-eyebrow">商業写真 ・ ビジュアルブランディング</span>
          <h1 className="ih-title">
            ビジュアルで、<br />
            <em>選ばれる</em>。
          </h1>
          <span className="ih-triad">IMPACT ・ TRUST ・ SALES</span>
          <div className="ih-cta">
            <Link href="/contact" className="ibtn">
              相談する
            </Link>
            <span className="ih-place">大阪・関西 ／ 日本語・English</span>
          </div>
        </div>
        <span className="ih-scroll" aria-hidden="true">SCROLL</span>
      </section>

      {/* THESIS — why visuals. The problem, in the client's own words. */}
      <section className="ithesis">
        <div className="ithesis-in">
          <span className="ith-eyebrow">WHY VISUALS ・ なぜ、ビジュアルなのか</span>
          <h2>
            見られなければ、<br />
            存在しないのと<em>同じ</em>。
          </h2>
          <p>
            人は、ネットで店を探し、写真で選ぶ時代。どれだけ良い商品やサービスでも、印象に残らなければ選ばれません。同じ店の前を何度通り過ぎても、記憶に残らなければ、無いのと同じ。私たちは、スクロールを止める一枚で、「見られる・信頼される・選ばれる」をつくります。
          </p>
        </div>
      </section>

      {/* WORK — proof. Big, full-bleed, bold captions. */}
      <section className="iwork">
        <div className="iwork-hd">
          <span className="ieyebrow">SELECTED WORK ・ 実績</span>
          <Link href="/works" className="ilink">
            作品をすべて見る →
          </Link>
        </div>

        {/* Full-bleed food */}
        <Link href="/works" className="iplate-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/photos/portfolio/diner-burger.jpg" alt="飲食店のフード撮影、シズル感のあるビジュアル" />
          <div className="ipl-cap">
            <span className="ipl-k light">飲食・フード</span>
            <span className="ipl-t">シズル感で、来店を増やす。</span>
          </div>
        </Link>

        {/* Split — product + bold line */}
        <div className="iplate-split">
          <Link href="/works" className="ips-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/photos/portfolio/candles-lit.jpg" alt="商品・EC向けのプロダクト撮影" />
          </Link>
          <div className="ips-txt">
            <span className="ieyebrow">商品・EC</span>
            <p>
              手に取りたくなる、<br />
              一枚をつくる。
            </p>
          </div>
        </div>

        {/* Duo — space + people */}
        <div className="iplate-duo">
          <Link href="/works" className="ipd-a">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/photos/portfolio/kominka-moon-door.jpg" alt="空間・店舗の撮影、古民家を改装した空間" />
            <span className="ipl-k light">空間・店舗</span>
          </Link>
          <Link href="/works" className="ipd-b">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/photos/portfolio/tonkatsu-chef.jpg" alt="働く人・ブランドの撮影、職人のポートレート" />
            <span className="ipl-k light">人・ブランド</span>
          </Link>
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
            その一枚を、<br />
            <em>つくりましょう。</em>
          </h2>
          <p>撮影内容が決まっていなくても構いません。相談は無料です。</p>
          <Link href="/contact" className="ibtn light">
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
