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
    title: "料理と店の空気感で、「入りたくなる」入口をつくる",
    challenge:
      "写真が古く、料理の魅力や店の活気がオンラインで伝わっていない。「見つけて、入りたくなる」入口づくりから設計します。",
    client: "飲食店（とんかつ・専門店）",
    shot: "料理・調理風景・スタッフ・店内",
    deliverables: "料理・内観・スタッフカット",
    outcome:
      "料理から店の活気まで撮り直し、Googleマップやメニューで「来店前の期待感」をつくります。",
  },
  {
    tag: "商品・EC / スタジオ撮影",
    img: "/photos/portfolio/candles-lit.jpg",
    imgAlt: "商品・パッケージのエディトリアル撮影",
    title: "ブランドらしい商品写真で、世界観を伝える",
    challenge:
      "自撮り中心の写真でブランドが実際より安く見え、ECのコンバージョンや世界観づくりの妨げになりがちです。",
    client: "小売・EC（雑貨・食品）",
    shot: "商品単体・パッケージ・ライフスタイル",
    deliverables: "商品カット・ライフスタイル素材",
    outcome:
      "世界観に合わせた光と構図で、ECやSNSで「安く見えない」一貫したビジュアルに整えます。",
  },
  {
    tag: "ファッション・ブランド / エディトリアル",
    img: "/photos/portfolio/fashion-pink-look.jpg",
    imgAlt: "ファッション・モデルのエディトリアル撮影",
    title: "世界観を伝えるビジュアルで、ブランドを表現する",
    challenge:
      "ブランドのトーンや世界観を表現するビジュアルが不足し、SNSや発信でメッセージがぶれがちです。",
    client: "アパレル・ブランド",
    shot: "ルックブック・モデル・エディトリアル",
    deliverables: "ルック・寄りカット・SNS素材",
    outcome:
      "ブランドのトーンをビジュアルに翻訳し、SNSや発信で一貫して伝わる世界観をつくります。",
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
