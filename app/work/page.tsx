import Footer from "@/components/Footer";
import WorkGrid from "@/components/WorkGrid";

export const metadata = {
  title: "実績・ケーススタディ | STUDIOくりすさん",
  description:
    "写真がビジネスにどう機能したか。課題と結果から大阪の商業撮影の実績を紹介します。",
};

export default function WorkPage() {
  return (
    <div className="page">
      <div className="wk-hero">
        <span className="pre">WORK</span>
        <h1>実績・ケーススタディ</h1>
        <p>写真がビジネスにどう機能したか。課題と結果から実績を紹介します。</p>
      </div>
      <WorkGrid />
      <Footer />
    </div>
  );
}
