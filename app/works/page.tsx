import Footer from "@/components/Footer";
import WorkGrid from "@/components/WorkGrid";
import PortfolioGallery from "@/components/PortfolioGallery";

export const metadata = {
  title: "作品・撮影事例",
  description:
    "業種ごとの課題に、どんなビジュアルで応えるか。大阪のクリエイティブスタジオの作例と撮影事例。",
  alternates: { canonical: "/works" },
};

export default function WorksPage() {
  return (
    <div className="page">
      <div className="wk-hero">
        <span className="pre">WORKS</span>
        <h1>WORKS</h1>
        <p className="wk-lead">
          撮った写真より、その先で起きたこと。
        </p>
        <p>
          業種ごとの課題に、どんなビジュアルで応えるか。作例と、これまでの取り組みから。実際のご依頼事例は、許可をいただいたものから順に掲載していきます。
        </p>
      </div>
      <WorkGrid />
      <PortfolioGallery />
      <section className="wk-phil">
        <span className="pre">PHILOSOPHY</span>
        <h2>
          写真や動画ではなく、<br />
          <em>仕事の武器</em>を。
        </h2>
        <p>
          SNS、Googleマップ、Webサイト。ビジュアルを「飾り」ではなく、仕事の成果につながる道具として考えます。
        </p>
      </section>
      <Footer />
    </div>
  );
}
