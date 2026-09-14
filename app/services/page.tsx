import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import ServiceCategories from "@/components/ServiceCategories";
import ServiceList from "@/components/ServiceList";
import FAQ from "@/components/FAQ";

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

/* 継続サービス — 2026-08-23. Replaced the old START/GROW/PARTNER retainer, whose
   ¥50,000／¥100,000 came from the product model. Two things are on sale monthly now:
   コンテンツ運用 (the shoot-backed retainer, = tier 3 on the ladder) and
   ブランド・コンテンツ設計, which bills in a month with no shoot at all.
   Source: leads/pricing/simple-stupid.html. 税込.

   ⚠ ブランド・コンテンツ設計 ¥40,000／¥70,000 are the softest numbers on the sheet — the
   only prices where nothing physical is delivered, and untested on a real client.
   単発 ¥20,000 is the one that has a shape. Treat the monthlies as provisional and
   tell Chris before quoting them in writing. */
const ONGOING = [
  {
    step: "運用",
    en: "CONTENT",
    ja: "コンテンツ運用",
    price: "¥65,000",
    unit: "／月〜",
    items: [
      "ライト　写真8点・リール1本・カルーセル1本・投稿4本",
      "毎月の打ち合わせと、前月の見直し",
      "スタンダード ¥100,000／月　毎月こちらが方針を出し、反応を見て翌月を組み直します",
      "違いは量ではなく、関わり方です",
    ],
    note: "考える・つくる・見直すを、毎月まわす。",
    hi: true,
  },
  {
    step: "相談",
    en: "DIRECTION",
    ja: "ブランド・コンテンツ設計",
    // Printed price is the 単発 only. The monthly ladder is 月2回 ¥40,000／毎週 ¥70,000
    // on the sheet, but those two are untested on a real client and are the only
    // prices where nothing physical is delivered — see the ⚠ above. They are quoted
    // in conversation, deliberately not published, until a few have actually sold.
    price: "¥20,000",
    unit: "／回",
    items: [
      "90分 ＋ 当日のメモ。まず1回だけでも。",
      "誰に向けるか／何を見せるか",
      "何を言わないか／どんな色と絵にするか",
      "写真と投稿でどう支えるか",
      "月2回・毎週の継続は、内容に合わせてご相談",
      "※ 初回のご相談は無料です",
    ],
    note: "撮らない月にも売れる、唯一のもの。",
  },
  {
    step: "運用代行",
    en: "POSTING",
    ja: "SNS投稿代行",
    price: "¥20,000",
    unit: "／月",
    items: [
      "月12本まで。追加は ¥2,000／本",
      "アカウントをお預かりして、決めた日に投稿",
      "投稿の中身は、上のプランから",
      "コメント返信・DM・予約受付は含みません",
    ],
    note: "つくったものを、出すところまで。",
  },
];

const PROCESS = [
  { n: "01", en: "Consultation", ja: "初回相談", d: "無料です。何を撮るかより先に、何を解決したいかを聞かせてください。オンラインでも、お伺いしてでも。" },
  { n: "02", en: "Proposal", ja: "ご提案", d: "課題を整理して、どの段が合うかと金額をお出しします。ここまで費用はかかりません。" },
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
          写真ではなく、
          <br />
          <em>何を見せるか</em>から。
        </h1>
        <p>
          SNS、Googleマップ、Webサイト。見つけて、わかって、選んでもらう。何を見せるかを一緒に決めるところから、お引き受けします。
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
          <span className="pre">PRICING ・ 料金</span>
          <h2>
            値段は、写真の枚数ではなく
            <br />
            <em>どこまで一緒に決めるか</em>で変わります。
          </h2>
          <p>
            「撮りたいものは決まっているので、撮るだけでいい」から、「何を見せるべきかから一緒に考えてほしい」まで。段が上がるほど、こちらが持ち込むものが増えます。写真や動画は、その結果をお渡しする形です。<strong>初回のご相談は無料です。</strong>表示価格はすべて税込です。
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
            月額でのお付き合い。
          </h2>
          <p>
            1回ごとにお願いするのではなく、月額でお付き合いする形です。撮って終わりではなく、出した結果を見て翌月を調整していきます。撮影のない月でも、ブランドの決め方だけをご一緒することもできます。表示価格はすべて税込です。
          </p>
        </div>
        <div className="svc-tiers">
          {ONGOING.map((t) => (
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
            月額のご相談をする
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

      {/* CTA */}
      <section className="svc-cta">
        <div className="svc-cta-in">
          <h2>
            まずは、<em>お店のことを聞かせてください。</em>
          </h2>
          <p>
            何から始めればいいか決まっていなくても大丈夫です。初回のご相談は無料。課題を整理して、どの段が合うかと金額をお出しするところまで、費用はかかりません。
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
