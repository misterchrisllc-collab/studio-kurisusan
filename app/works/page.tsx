import Footer from "@/components/Footer";
import WorkGrid from "@/components/WorkGrid";
import PortfolioGallery from "@/components/PortfolioGallery";

export const metadata = {
  title: "実績・ケーススタディ | STUDIOくりすさん",
  description:
    "写真がビジネスにどう機能したか。大阪の商業撮影スタジオが手がけた実際のプロジェクトと作品集。",
};

export default function WorksPage() {
  return (
    <div className="page">
      <div className="wk-hero">
        <span className="pre">WORKS</span>
        <h1>実績・ケーススタディ</h1>
        <p>
          ここに掲載しているのは、すべて実際の店舗・企業・ブランドのために撮影したプロジェクトです。課題から結果まで、写真がビジネスにどう機能したかをご覧ください。
        </p>
      </div>
      <WorkGrid />
      <PortfolioGallery />
      <Footer />
    </div>
  );
}
