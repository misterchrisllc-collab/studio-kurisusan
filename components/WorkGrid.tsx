type CaseItem = {
  tag: string; // category label
  img: string;
  imgAlt: string;
  title: string;
  challenge: string; // the business problem
  client: string; // client type
  shot: string; // what was photographed
  deliverables: string; // what was delivered
  outcome: string; // short result
};

const CASES: CaseItem[] = [
  {
    tag: "飲食店 / Googleマップ・SNS",
    img: "/photos/portfolio/tonkatsu-plate.jpg",
    imgAlt: "とんかつ専門店の料理撮影",
    title: "料理はおいしい。だからこそ、それがちゃんと伝わるビジュアルを。",
    challenge:
      "食感も、情熱も、食べたくなる気持ちも。画面の向こうまで届けます。",
    client: "飲食店（とんかつ・専門店）",
    shot: "料理・調理風景・スタッフ・店内",
    deliverables: "料理・内観・スタッフカット",
    outcome:
      "メニュー、Googleマップ、SNS。お客様が来店を決める場所で、「ここで食べたい」と思ってもらうために。",
  },
  {
    tag: "商品・EC / スタジオ撮影",
    img: "/photos/portfolio/candles-lit.jpg",
    imgAlt: "商品・パッケージのスタジオ撮影",
    title: "商品ではなく、誰かの毎日に必要なものだから。",
    challenge:
      "その価値が、必要としている人にまっすぐ伝わること。それが、選ばれる理由になります。",
    client: "小売・EC（雑貨・食品）",
    shot: "商品単体・パッケージ・ライフスタイル",
    deliverables: "商品カット・ライフスタイル素材",
    outcome:
      "ECやSNSで、商品の価値がそのまま伝わるビジュアルに。「選ぶ理由」を、目に見えるかたちで。",
  },
  {
    tag: "ファッション・ブランド / エディトリアル",
    img: "/photos/portfolio/fashion-pink-look.jpg",
    imgAlt: "アパレルブランドのエディトリアル撮影",
    title: "ブランドは、必要としている人に、ちゃんと届くためにある。",
    challenge:
      "あなたが誰で、何を大切にしているのか。それが伝わったとき、ブランドは必要な人と出会えます。",
    client: "アパレル・ブランド",
    shot: "ルックブック・モデル・エディトリアル",
    deliverables: "ルック・寄りカット・SNS素材",
    outcome:
      "発信のひとつひとつが、同じメッセージを届ける。ブランドを、探している人に見つけてもらうために。",
  },
];

export default function WorkGrid() {
  return (
    <section className="cases-full" id="case-studies">
      {CASES.map((c) => (
        <div className="case-full" key={c.title}>
          <div className="cf-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="slot-img" src={c.img} alt={c.imgAlt} loading="lazy" />
            <div className="cf-mg" />
          </div>
          <div className="cf-body">
            <div>
              <span className="cf-tag">{c.tag}</span>
              <h3>{c.title}</h3>
              <p>{c.challenge}</p>
              <div className="cf-meta">
                <div>
                  <span className="lbl">業種</span>
                  <span className="v">{c.client}</span>
                </div>
                <div>
                  <span className="lbl">撮影内容</span>
                  <span className="v">{c.shot}</span>
                </div>
                <div>
                  <span className="lbl">制作物</span>
                  <span className="v">{c.deliverables}</span>
                </div>
              </div>
            </div>
            <div className="cf-result">
              <span className="rl">ねらい</span>
              <p>{c.outcome}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
