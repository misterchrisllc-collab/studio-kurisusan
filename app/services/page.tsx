import Link from "next/link";
import Footer from "@/components/Footer";
import ServiceList from "@/components/ServiceList";
import FAQ from "@/components/FAQ";
import PriceCalculator from "@/components/PriceCalculator";

export const metadata = {
  title: "サービス・料金 | STUDIOくりすさん",
  description:
    "店舗・飲食店撮影、商品・EC撮影、企業・採用撮影、コンテンツ制作。大阪の商業撮影スタジオの料金一覧と、撮影に含まれるもの・よくあるご質問。",
};

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
        <span className="pre">SERVICES</span>
        <h1>サービス・料金</h1>
        <p className="sp-lede">
          Studio くりすさんは、写真を軸にしたクリエイティブスタジオです。撮影を中心に、ディレクションからデザイン、SNSや販促物まで。お店やブランドが「自分たちらしく伝わる」ことを、ひとつの流れでお手伝いします。
        </p>
      </div>

      <div className="sp-body">
        {/* Creative workflow: one connected process, photography at the core */}
        <section className="sp-flow">
          <div className="sp-flow-hd">
            <h2>写真を軸にした、ひとつの制作の流れ</h2>
            <p>
              すべてのプロジェクトは、写真を軸にしています。そこに必要な要素を組み合わせ、ブランドが一貫して伝わるようにまとめます。内容はお店やブランドごとに合わせて設計します。
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
          <h2>撮影メニューと料金</h2>
          <p>写真制作の目安料金です。その他の制作物は、内容に応じてお見積りします。</p>
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
            実績・作品を見る
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
