import Link from "next/link";
import Footer from "@/components/Footer";
import ServiceList from "@/components/ServiceList";
import FAQ from "@/components/FAQ";
import PriceCalculator from "@/components/PriceCalculator";

export const metadata = {
  title: "ビジネスソリューション・料金",
  description:
    "開業ブランディング、ブランドリフレッシュ、Googleビジネス強化、採用ブランディング、クリエイティブパートナー、季節キャンペーン。写真を軸に、大阪でビジネスの課題を解決するクリエイティブスタジオ。料金の目安・よくあるご質問。",
  alternates: { canonical: "/services" },
};

// Six flagship business solutions — the primary way we frame our work.
// Not a service menu: outcomes and partnerships, all built on photography.
type Solution = { name: string; en: string; desc: string; flagship?: boolean };
const SOLUTIONS: Solution[] = [
  {
    name: "開業・オープンブランディング",
    en: "Business Launch",
    desc: "開業やリブランディングに合わせ、店名・世界観・写真・発信を一度に整えます。最初の第一印象から「らしさ」を。",
  },
  {
    name: "ブランドリフレッシュ",
    en: "Brand Refresh",
    desc: "既存ビジネスの見え方を、今の姿に更新。古く見える写真や不揃いな素材を、一貫した表現に整え直します。",
  },
  {
    name: "Googleビジネス強化",
    en: "Google Business Boost",
    desc: "Googleマップと検索の入口を強化。写真の刷新から定期的な更新まで、地域での見つけやすさを継続的に高めます。",
  },
  {
    name: "採用ブランディング",
    en: "Recruitment Branding",
    desc: "会社の文化と働く人の魅力を、正直なビジュアルで。価値観の合う応募者との出会いを増やします。",
  },
  {
    name: "クリエイティブパートナー",
    en: "Creative Partner",
    flagship: true,
    desc: "撮影を都度お願いするのではなく、ブランドの「伴走者」を持つ月額契約。私たちの中心となる、継続的なパートナーシップです。",
  },
  {
    name: "季節・スポットキャンペーン",
    en: "Seasonal Campaigns",
    desc: "新商品・イベント・季節のフェアなど、期間限定の施策に合わせたビジュアルを、狙ったタイミングで制作します。",
  },
];

const INCLUDED = [
  "事前ヒアリング",
  "撮影プラン作成",
  "プロによるライティング",
  "色補正・現像",
  "高解像度データ納品",
  "商用利用",
  "オンライン納品",
];

const FLOW = [
  { name: "コマーシャル・フォトグラフィー", desc: "すべての制作の軸となる、本物の写真。" },
  { name: "クリエイティブディレクション", desc: "「どう見せるか」を一緒に設計します。" },
  { name: "ビジュアルブランディング", desc: "一貫したトーンと世界観をつくります。" },
  { name: "Googleビジネスプロフィール用の写真", desc: "検索・地図で見つけてもらう入口づくり。" },
  { name: "SNSコンテンツ", desc: "続けやすい写真・動画をまとめて。" },
  { name: "ポスター・チラシ・メニュー", desc: "撮った写真を、そのまま販促物に。" },
  { name: "販促・プロモーション素材", desc: "キャンペーンやWEBに使える素材一式。" },
  { name: "ショート動画", desc: "リールやショートで、動きを伝える。" },
  { name: "AIを活用した企画・アイデア出し", desc: "新しいツールも使って、発想を広げる。" },
];

export default function ServicesPage() {
  return (
    <div className="page">
      <div className="sp-hero">
        <span className="pre">WHAT WE DO</span>
        <h1>課題から始める、6つのビジネスソリューション。</h1>
        <p className="sp-lede">
          Studio くりすさんは、写真を軸にしたクリエイティブスタジオです。単発の撮影ではなく、ビジネスの課題からご一緒します。AIや新しいツールは賢く働くための道具として使い、人の対話と理解から、「自分たちが何者か」が伝わるブランドを設計します。
        </p>
      </div>

      <div className="sp-body">
        {/* Six flagship business solutions — the primary framing */}
        <section className="sp-flow">
          <div className="sp-flow-hd">
            <h2>課題から選ぶ、6つのビジネスソリューション</h2>
            <p>
              それぞれ独立したメニューではなく、写真を土台にした課題解決のかたちです。目的に合わせて必要な要素を組み合わせ、必要であれば継続的に伴走します。
            </p>
          </div>
          <ul className="sp-flow-grid">
            {SOLUTIONS.map((s) => (
              <li key={s.en}>
                <span className="sp-flow-n">
                  {s.name}
                  {s.flagship && (
                    <span className="svc-flag-badge">おすすめ</span>
                  )}
                  <span className="sp-sol-en">{s.en}</span>
                </span>
                <span className="sp-flow-d">{s.desc}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Flagship: ongoing creative partnership (not a monthly photo plan) */}
        <section className="sp-flow">
          <div className="sp-incl-hd">
            <h2>クリエイティブパートナー契約に含まれるもの</h2>
            <p>
              撮影を都度お願いするのではなく、ブランドの「伴走者」を持つ、私たちの中心となる継続契約です。技術やAIは賢く使う道具として、人のクリエイティブディレクションで一貫したブランドを育てます。単発の撮影ではなく、続くパートナーシップです。
            </p>
          </div>
          <ul className="sp-incl-grid">
            <li>Googleビジネス更新</li>
            <li>毎月の撮影</li>
            <li>SNSコンテンツ</li>
            <li>ポスター・チラシ制作</li>
            <li>季節キャンペーン企画</li>
            <li>ブランド相談</li>
            <li>AI活用 × 人のディレクション</li>
            <li>優先予約</li>
          </ul>
        </section>

        {/* Creative components: everything is built on photography */}
        <section className="sp-flow">
          <div className="sp-flow-hd">
            <h2>各ソリューションを構成する、制作の要素</h2>
            <p>
              すべてのソリューションは、写真を軸にしています。そこに必要な要素を組み合わせ、ブランドが一貫して伝わるようにまとめます。内容はお店やブランドごとに合わせて設計します。
            </p>
          </div>
          <ul className="sp-flow-grid">
            {FLOW.map((f) => (
              <li key={f.name}>
                <span className="sp-flow-n">{f.name}</span>
                <span className="sp-flow-d">{f.desc}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* What's included */}
        <section className="sp-incl">
          <div className="sp-incl-hd">
            <h2>撮影に含まれるもの</h2>
            <p>すべてのプランに、以下がすべて含まれています。</p>
          </div>
          <ul className="sp-incl-grid">
            {INCLUDED.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <div className="sp-incl-hd sp-menu-hd">
          <h2>料金の目安（撮影メニュー）</h2>
          <p>各ソリューションは、以下の撮影メニューを組み合わせて構成します。月額プランや複数の制作は、内容に合わせてお見積りします。</p>
        </div>
        <ServiceList />
      </div>

      <FAQ />

      <PriceCalculator />

      {/* Final CTA */}
      <section className="cta-f">
        <div>
          <h2>
            まずは、<em>お気軽にご相談ください。</em>
          </h2>
          <p>
            プロジェクトによって最適な内容は異なります。撮影が決まっていなくても大丈夫です。目的やご予算に合わせて、無料でお見積り・ご提案します。
          </p>
        </div>
        <div className="cta-actions">
          <Link href="/contact" className="btn-big">
            無料で相談する
          </Link>
          <Link href="/works" className="btn-txt">
            作品・撮影事例を見る
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
