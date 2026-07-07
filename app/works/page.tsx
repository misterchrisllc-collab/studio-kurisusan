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
        <h1>作品と、撮影事例。</h1>
        <p>
          業種ごとの課題に、どんなビジュアルで応えるか。作例とこれまでの取り組みをご紹介します。実際のご依頼事例は、許可をいただいたものから順に掲載していきます。
        </p>
      </div>
      <WorkGrid />
      <PortfolioGallery />
      <Footer />
    </div>
  );
}
