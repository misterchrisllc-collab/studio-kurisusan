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
    title: "Googleマップ刷新で来店につなげたとんかつ専門店",
    challenge:
      "写真が古く、料理の魅力や店の活気がオンラインで伝わっていませんでした。「見つけて、入りたくなる」入口づくりから設計しました。",
    client: "大阪市内・とんかつ専門店",
    shot: "料理・調理風景・スタッフ・店内",
    deliverables: "料理20点・内観8点・スタッフカット",
    outcome:
      "メニュー写真とGoogleマップを刷新後、オーナーより「問い合わせと来店が明らかに増えた」との声。",
  },
  {
    tag: "商品・EC / スタジオ撮影",
    img: "/photos/portfolio/candles-lit.jpg",
    imgAlt: "商品・パッケージのエディトリアル撮影",
    title: "商品写真の刷新でブランド品質を引き上げたEC",
    challenge:
      "自撮り中心の写真でブランドが実際より安く見え、ECのコンバージョンと世界観づくりの妨げになっていました。",
    client: "大阪・雑貨/食品ブランド",
    shot: "商品単体・パッケージ・ライフスタイル",
    deliverables: "商品15点・ライフスタイル10カット",
    outcome:
      "「やっとブランドらしい写真が揃った」との評価。ECとSNSで世界観が統一され、反応が向上。",
  },
  {
    tag: "ファッション・ブランド / エディトリアル",
    img: "/photos/portfolio/fashion-pink-look.jpg",
    imgAlt: "ファッション・モデルのエディトリアル撮影",
    title: "世界観を伝えるビジュアルでブランドを再定義",
    challenge:
      "ブランドのトーンや世界観を表現するビジュアルが不足し、SNSや採用でメッセージがぶれていました。",
    client: "アパレル・ブランド",
    shot: "ルックブック・モデル・エディトリアル",
    deliverables: "ルック12点・寄りカット・SNS素材",
    outcome:
      "ブランドの世界観が明確になり、SNSでの反応と認知が向上。継続的な素材制作にも発展。",
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
                  <span className="lbl">クライアント</span>
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
              <span className="rl">結果</span>
              <p>{c.outcome}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
