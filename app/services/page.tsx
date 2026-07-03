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

export default function ServicesPage() {
  return (
    <div className="page">
      <div className="sp-hero">
        <span className="pre">SERVICES</span>
        <h1>サービス・料金</h1>
        <p className="sp-lede">
          ビジネスによって、目指すゴールは異なります。ブランディング、集客、採用、販売、そして信頼づくり。それぞれの目的に合わせて、成果につながる撮影を設計します。
        </p>
      </div>

      <div className="sp-body">
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
