import Link from "next/link";
import Image from "next/image";
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

const cover = { objectFit: "cover" as const };

export default function Home() {
  return (
    <div className="page">
      {/* HERO — full-bleed slideshow: welcome → atmosphere → food → space → craft → people */}
      <section className="ih">
        <div className="ih-bg" aria-hidden="true">
          <Image src="/photos/hero-cafe.jpg" alt="" fill priority sizes="100vw" quality={90} style={cover} />
          <Image src="/photos/portfolio/tacos-event-venue.jpg" alt="" fill sizes="100vw" quality={82} style={cover} />
          <Image src="/photos/portfolio/tonkatsu-plate.jpg" alt="" fill sizes="100vw" quality={82} style={cover} />
          <Image src="/photos/portfolio/kominka-exterior-night.jpg" alt="" fill sizes="100vw" quality={82} style={cover} />
          <Image src="/photos/portfolio/cafe-pourover.jpg" alt="" fill sizes="100vw" quality={82} style={cover} />
          <Image src="/photos/portfolio/tonkatsu-chef.jpg" alt="" fill sizes="100vw" quality={82} style={cover} />
        </div>
        <div className="ih-in">
          <span className="ih-eyebrow">店舗・企業のビジュアルブランディング</span>
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
          <Image
            src="/photos/portfolio/cafe-owner.jpg"
            alt="喫茶店の店主のポートレート。店の人柄が伝わる一枚"
            fill
            sizes="(max-width:900px) 100vw, 48vw"
            quality={82}
            style={{ objectFit: "cover", objectPosition: "center 28%" }}
          />
        </div>
      </section>

      {/* PEOPLE — the feeling. Atmosphere, customers, staff working. */}
      <section className="ifeel">
        <div className="ifeel-lead">
          <span className="ieyebrow">PEOPLE ・ 人と、その空気</span>
        </div>
        <div className="ifeel-hero">
          <Image
            src="/photos/portfolio/tacos-event-guests.jpg"
            alt="お店で笑い合うお客様たち。店の空気が伝わる一枚"
            fill
            sizes="100vw"
            quality={82}
            style={cover}
          />
          <div className="ifeel-cap">
            <span className="ipl-t">
              「また来たい」は、<br />
              空気からはじまる。
            </span>
          </div>
        </div>
        <div className="ifeel-row">
          <div className="ife-c">
            <Image src="/photos/portfolio/brand-donut-model.jpg" alt="商品を手に笑うお客様" fill sizes="(max-width:680px) 50vw, 33vw" quality={82} style={cover} />
          </div>
          <div className="ife-c">
            <Image src="/photos/portfolio/tonkatsu-staff.jpg" alt="笑顔で働くお店のスタッフ" fill sizes="(max-width:680px) 50vw, 33vw" quality={82} style={cover} />
          </div>
          <div className="ife-c">
            <Image src="/photos/portfolio/tacos-event-staff.jpg" alt="店を切り盛りするスタッフ" fill sizes="(max-width:680px) 50vw, 33vw" quality={82} style={cover} />
          </div>
        </div>
      </section>

      {/* FOOD — an editorial story: signature → preparation → detail → dish → people */}
      <section className="ifood">
        <div className="ifood-hd">
          <span className="ieyebrow">FOOD ・ 飲食</span>
          <span className="ifood-line">「食べたい」は、一皿から。</span>
        </div>
        <Link href="/works" className="ifood-hero">
          <Image src="/photos/portfolio/burger-hand.jpg" alt="看板メニューのフード撮影。シズル感のあるビジュアル" fill sizes="100vw" quality={82} style={cover} />
        </Link>
        <div className="ifood-row">
          <Link href="/works" className="ifd-c">
            <Image src="/photos/portfolio/tonkatsu-chef.jpg" alt="調理する職人。仕込みの風景" fill sizes="(max-width:680px) 50vw, 25vw" quality={82} style={cover} />
          </Link>
          <Link href="/works" className="ifd-c">
            <Image src="/photos/portfolio/tacos-macro.jpg" alt="料理のディテール、寄りの一枚" fill sizes="(max-width:680px) 50vw, 25vw" quality={82} style={cover} />
          </Link>
          <Link href="/works" className="ifd-c">
            <Image src="/photos/portfolio/wagashi-dorayaki.jpg" alt="和菓子の一皿" fill sizes="(max-width:680px) 50vw, 25vw" quality={82} style={cover} />
          </Link>
          <Link href="/works" className="ifd-c">
            <Image src="/photos/portfolio/tacos-event-table.jpg" alt="料理を囲むお客様" fill sizes="(max-width:680px) 50vw, 25vw" quality={82} style={cover} />
          </Link>
        </div>
      </section>

      {/* PRODUCTS — an aligned grid, secondary to the atmosphere */}
      <section className="iprod">
        <div className="iprod-hd">
          <span className="ieyebrow">PRODUCT ・ 商品・EC</span>
          <span className="iprod-line">選ばれる理由を、まっすぐ。</span>
        </div>
        <div className="iprod-grid">
          <Link href="/works" className="iprd-c">
            <Image src="/photos/portfolio/sriracha-lying.jpg" alt="ホットソースの商品撮影" fill sizes="(max-width:680px) 100vw, 33vw" quality={82} style={cover} />
          </Link>
          <Link href="/works" className="iprd-c">
            <Image src="/photos/portfolio/donut-blue.jpg" alt="ドーナツの商品撮影" fill sizes="(max-width:680px) 100vw, 33vw" quality={82} style={cover} />
          </Link>
          <Link href="/works" className="iprd-c">
            <Image src="/photos/portfolio/natto-lift.jpg" alt="納豆の商品撮影" fill sizes="(max-width:680px) 100vw, 33vw" quality={82} style={cover} />
          </Link>
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
          <Link href="/works" className="isp-c">
            <Image src="/photos/portfolio/kominka-exterior-day.jpg" alt="古民家を改装した店舗の外観" fill sizes="(max-width:680px) 100vw, 50vw" quality={82} style={cover} />
          </Link>
          <Link href="/works" className="isp-c">
            <Image src="/photos/portfolio/kominka-lattice.jpg" alt="格子と設えのある店内" fill sizes="(max-width:680px) 100vw, 50vw" quality={82} style={cover} />
          </Link>
          <Link href="/works" className="isp-c">
            <Image src="/photos/portfolio/kominka-dining-night.jpg" alt="夜の店内、あたたかい灯り" fill sizes="(max-width:680px) 100vw, 50vw" quality={82} style={cover} />
          </Link>
          <Link href="/works" className="isp-c">
            <Image src="/photos/portfolio/kominka-moon-door.jpg" alt="円窓のある空間" fill sizes="(max-width:680px) 100vw, 50vw" quality={82} style={cover} />
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
          <Image src="/photos/hero-kominka.jpg" alt="" fill sizes="100vw" quality={82} style={cover} />
        </div>
        <div className="iclose-in">
          <h2>
            その<em>「らしさ」</em>を、<br />
            一緒に見つけましょう。
          </h2>
          <p>何から始めればいいか決まっていなくても大丈夫です。まずは、お店のことを聞かせてください。ご相談は無料です。</p>
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
          <Image
            src="/photos/kansai-snaps-portrait.jpg"
            alt="Kansai Snaps によるポートレート。関西の街並みで撮る、エディトリアルな人物写真"
            fill
            sizes="(max-width:900px) 100vw, 42vw"
            quality={82}
            style={{ objectFit: "cover", objectPosition: "center 30%" }}
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
