import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import ServiceCategories from "@/components/ServiceCategories";
import ServiceList from "@/components/ServiceList";
import FAQ from "@/components/FAQ";
import PriceCalculator from "@/components/PriceCalculator";

export const metadata = {
  title: "できること・料金",
  description:
    "集客・採用・ブランディングなど、小さなビジネスの課題を、ビジュアルで解決する大阪のクリエイティブスタジオ。飲食店・空間・商品・アパレル・企業・イベント。業種ごとの課題と、料金の目安・よくあるご質問。",
  alternates: { canonical: "/services" },
};

const INCLUDED = [
  "事前ヒアリング",
  "企画・撮影プラン",
  "プロによるライティング",
  "色補正・現像",
  "高解像度データ納品",
  "商用利用",
  "オンライン納品",
];

const PARTNER = [
  "毎月の撮影",
  "Googleビジネス更新",
  "SNSコンテンツ",
  "ポスター・チラシ制作",
  "季節キャンペーン企画",
  "ブランド相談",
  "AI活用 × 人のディレクション",
  "優先予約",
];

const PROCESS = [
  { n: "01", en: "Inquiry", ja: "お問い合わせ", d: "お店のこと、いまの課題を聞かせてください。" },
  { n: "02", en: "Planning", ja: "企画", d: "ゴールから逆算して、内容を設計します。" },
  { n: "03", en: "Shoot", ja: "撮影", d: "現場でも、スタジオでも。" },
  { n: "04", en: "Delivery", ja: "納品", d: "すぐに使えるかたちで、お渡しします。" },
];

export default function ServicesPage() {
  return (
    <div className="page">
      {/* HERO — split editorial: bold statement + large image */}
      <section className="svc-hero">
        <div className="svc-hero-in">
          <span className="pre">SERVICE ・ できること</span>
          <h1>
            写真や動画ではなく、
            <br />
            <em>仕事の武器</em>を。
          </h1>
          <p>
            SNS、Googleマップ、Webサイト。見つけて、わかって、選んでもらう。その一歩を、ビジュアルでつくります。
          </p>
          <Link href="/contact" className="btn-big">
            相談する
          </Link>
        </div>
        <div className="svc-hero-img">
          <Image
            src="/photos/portfolio/tacos-shop.jpg"
            alt="夜に灯る飲食店の店構え"
            fill
            priority
            sizes="(max-width:900px) 100vw, 48vw"
            quality={82}
            style={{ objectFit: "cover", objectPosition: "center 55%" }}
          />
        </div>
      </section>

      <ServiceCategories />

      {/* PRICING */}
      <section className="svc-pricing" id="pricing">
        <div className="svc-sec-hd">
          <span className="pre">PRICING ・ 料金の目安</span>
          <h2>わかりやすい、料金の目安。</h2>
          <p>
            業種や目的に合わせて、必要な内容を組み合わせます。月額プランや複数制作は、内容に合わせてお見積りします。
          </p>
        </div>
        <ServiceList />
      </section>

      {/* CREATIVE PARTNER — flagship recurring partnership */}
      <section className="svc-partner">
        <div className="svc-partner-in">
          <span className="svc-partner-badge">おすすめ</span>
          <h2>
            続けるほど、効いてくる。
            <br />
            月額のクリエイティブパートナー。
          </h2>
          <p>
            撮影を都度お願いするのではなく、ブランドの「伴走者」を持つ月額契約。私たちの中心となる、続くパートナーシップです。
          </p>
          <ul className="svc-partner-list">
            {PARTNER.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <Link href="/contact" className="btn-p">
            パートナー契約を相談する
          </Link>
        </div>
      </section>

      {/* WHAT'S INCLUDED — one merged strip */}
      <section className="svc-incl">
        <div className="svc-sec-hd">
          <span className="pre">INCLUDED ・ すべてに含まれるもの</span>
          <h2>どのご依頼にも、これだけ含まれます。</h2>
        </div>
        <ul className="svc-incl-strip">
          {INCLUDED.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </section>

      {/* PROCESS */}
      <section className="svc-process">
        <div className="svc-sec-hd">
          <span className="pre">PROCESS ・ ながれ</span>
          <h2>ご相談から、納品まで。</h2>
        </div>
        <ol className="svc-steps">
          {PROCESS.map((s) => (
            <li key={s.n}>
              <span className="svc-step-n">{s.n}</span>
              <span className="svc-step-en">{s.en}</span>
              <span className="svc-step-ja">{s.ja}</span>
              <span className="svc-step-d">{s.d}</span>
            </li>
          ))}
        </ol>
      </section>

      <FAQ />

      <PriceCalculator />

      {/* CTA */}
      <section className="cta-f">
        <div>
          <h2>
            まずは、<em>お店のことを聞かせてください。</em>
          </h2>
          <p>
            何から始めればいいか決まっていなくても大丈夫です。目的やご予算に合わせて、無料でご提案します。
          </p>
        </div>
        <div className="cta-actions">
          <Link href="/contact" className="btn-big">
            無料で相談する
          </Link>
          <Link href="/works" className="btn-txt">
            実績を見る
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
