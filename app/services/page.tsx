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

/* Bounded tiers. Each rung buys a defined scope, not an open promise, so the
   monthly price stays honest against what the same work costs one shoot at a
   time. START and GROW carry roughly a 20% bundle discount; PARTNER stays 要相談
   so it never contradicts a quote given in person. */
const PARTNER_TIERS = [
  {
    step: "STEP 1",
    en: "START",
    ja: "始める",
    price: "¥50,000",
    unit: "／月",
    items: ["月1回の撮影（1時間）", "すぐ使える写真データ", "Googleビジネス更新"],
    note: "まずは、ここから。",
  },
  {
    step: "STEP 2",
    en: "GROW",
    ja: "広げる",
    price: "¥100,000",
    unit: "／月",
    items: [
      "月1回の撮影（3時間）",
      "リール・ショート動画 2本",
      "Googleビジネス更新",
      "チラシ・POP 1点",
      "月1回のブランド相談",
    ],
    note: "発信が増えてきたら。",
    hi: true,
  },
  {
    step: "STEP 3",
    en: "PARTNER",
    ja: "一緒に",
    price: "要相談",
    unit: "",
    items: [
      "SNSの運用まで",
      "季節キャンペーンの企画",
      "多言語での発信",
      "AI活用 × 人のディレクション",
      "優先対応",
    ],
    note: "目指していく形です。",
  },
];

const PROCESS = [
  { n: "01", en: "Consultation", ja: "ご相談", d: "無料です。何を撮るかより先に、何を解決したいかを聞かせてください。" },
  { n: "02", en: "Proposal", ja: "ご提案", d: "ご希望に合わせて内容を組み立て、金額をお出しします。ここまで費用はかかりません。" },
  { n: "03", en: "Shoot", ja: "撮影", d: "打ち合わせた内容に沿って。現場でも、スタジオでも対応します。" },
  { n: "04", en: "Delivery", ja: "納品", d: "用途ごとのサイズで、すぐ使えるかたちにしてお渡しします。" },
  { n: "05", en: "Follow-up", ja: "その後", d: "使ってみてどうだったか。次に何が要るか。一緒に考えます。" },
];

export default function ServicesPage() {
  return (
    <div className="page">
      {/* HERO — type-led: confident statement on whitespace, no hero image */}
      <section className="svc-hero">
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
      </section>

      {/* FIRST BREATH — full-bleed editorial plate */}
      <section className="svc-breath">
        <Image
          src="/photos/portfolio/model-natural.jpg"
          alt="自然な佇まいのポートレート撮影"
          fill
          priority
          sizes="100vw"
          quality={82}
          style={{ objectFit: "cover", objectPosition: "center 22%" }}
        />
        <span className="svc-breath-cap">
          ambitious businesses, seen clearly
        </span>
      </section>

      <ServiceCategories />

      {/* PRICING */}
      <section className="svc-pricing" id="pricing">
        <div className="svc-sec-hd">
          <span className="pre">PRICING ・ 料金の目安</span>
          <h2>わかりやすい、料金の目安。</h2>
          <p>
            業種や目的に合わせて、必要な内容を組み合わせます。月額プランや複数制作は、内容に合わせてお見積りします。表示価格はすべて税別です。
          </p>
        </div>
        <ServiceList />
      </section>

      {/* CREATIVE PARTNER — flagship recurring partnership */}
      <section className="svc-partner" id="partner">
        <div className="svc-partner-in">
          <span className="svc-partner-badge">おすすめ</span>
          <h2>
            続けるほど、効いてくる。
            <br />
            月額のクリエイティブパートナー。
          </h2>
          <p>
            1回ごとにお願いするのではなく、月額でお付き合いする形です。必要なときに撮って、一緒に考えて、続けていく。Studio くりすさんの中心にあるプランです。
          </p>
        </div>
        <div className="svc-tiers">
          {PARTNER_TIERS.map((t) => (
            <div className={`svc-tier${t.hi ? " hi" : ""}`} key={t.en}>
              <span className="svc-tier-step">{t.step}</span>
              <span className="svc-tier-en">{t.en}</span>
              <span className="svc-tier-ja">{t.ja}</span>
              <span className="svc-tier-p">
                {t.price}
                {t.unit && <small>{t.unit}</small>}
              </span>
              <ul className="svc-tier-items">
                {t.items.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <span className="svc-tier-note">{t.note}</span>
            </div>
          ))}
        </div>
        <div className="svc-partner-foot">
          <p className="svc-review">
            3ヶ月ごとに、内容を一緒に見直します。増やすときは、必ず先にご相談します。いきなり変わることはありません。
          </p>
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
          <h2>ご相談から、その先まで。</h2>
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
      <section className="svc-cta">
        <div className="svc-cta-in">
          <h2>
            まずは、<em>お店のことを聞かせてください。</em>
          </h2>
          <p>
            何から始めればいいか決まっていなくても大丈夫です。目的やご予算に合わせて、無料でご提案します。
          </p>
          <div className="svc-cta-actions">
            <Link href="/contact" className="btn-big">
              無料で相談する
            </Link>
            <Link href="/works" className="btn-txt">
              実績を見る
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
