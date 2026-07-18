import Image from "next/image";

/* Organized by business type / problem, not by photography service. Each block
   opens with the client's problem (Works-page voice) over a large editorial
   image. Only categories we can genuinely back with distinct imagery get a
   block; the rest are named in the "also" line below. */
type Category = {
  en: string;
  ja: string;
  img: string;
  alt: string;
  problem: string;
  body: string;
  objectPosition?: string;
};

const CATEGORIES: Category[] = [
  {
    en: "Restaurants",
    ja: "飲食店",
    img: "portfolio/burger-cross",
    alt: "断面の美しいスマッシュバーガー",
    problem: "いい店なのに、画面の中では素通りされている。",
    body: "料理も、店の空気も、ちゃんと伝われば「行ってみたい」に変わる。Googleマップ、SNS、メニュー。お客様が来店を決める場所を、強くします。",
    objectPosition: "center 50%",
  },
  {
    en: "Spaces & Architecture",
    ja: "空間・店舗・建築",
    img: "portfolio/kominka-chair",
    alt: "円窓のある古民家のくつろぎの空間",
    problem: "行く前に、その場所の心地よさは決まっている。",
    body: "内観、外観、灯り。予約サイトやGoogleマップで「ここがいい」と選ばれる入口をつくります。店舗、建築、不動産まで。",
    objectPosition: "center 45%",
  },
  {
    en: "Products & EC",
    ja: "商品・EC",
    img: "portfolio/mayo-bottle",
    alt: "調味料の商品撮影",
    problem: "自撮りの写真で、実際より安く見えていないか。",
    body: "その価値が、必要としている人にまっすぐ伝わること。それが、ECやSNSで選ばれる理由になります。",
    objectPosition: "center 40%",
  },
  {
    en: "Retail & Apparel",
    ja: "アパレル・小売",
    img: "portfolio/model-natural",
    alt: "アパレルのモデル撮影、自然な佇まい",
    problem: "何を大切にしているか。伝われば、見つけてもらえる。",
    body: "トーンの合ったビジュアルで、SNSも、発信も、同じメッセージを届ける。ブランドを、必要としている人とつなぎます。",
    objectPosition: "center 25%",
  },
  {
    en: "Corporate & Recruitment",
    ja: "企業・採用",
    img: "on-location",
    alt: "現場で働く人、仕事の風景",
    problem: "「どんな会社か」が伝われば、合う人が集まる。",
    body: "働く人、現場、その文化。採用も、コーポレートも、価値観の合う人との出会いを増やします。",
    objectPosition: "center 40%",
  },
  {
    en: "Events & PR",
    ja: "イベント・PR",
    img: "portfolio/tacos-event-night",
    alt: "夜のイベント会場の熱気",
    problem: "イベントは、当日で終わらせない。",
    body: "その日の熱を、次の集客・SNS・プレスへ。あとから使い続けられる素材にします。",
    objectPosition: "center 45%",
  },
];

export default function ServiceCategories() {
  return (
    <section className="sc" id="categories">
      <div className="sc-lead">
        <span className="pre">HOW WE HELP</span>
        <h2>あなたのビジネスから、考える。</h2>
      </div>

      {CATEGORIES.map((c, i) => (
        <article className={`sc-cat${i % 2 ? " flip" : ""}`} key={c.en}>
          <div className="sc-cat-img">
            <Image
              src={`/photos/${c.img}.jpg`}
              alt={c.alt}
              fill
              sizes="100vw"
              quality={82}
              style={{ objectFit: "cover", objectPosition: c.objectPosition ?? "center" }}
            />
          </div>
          <div className="sc-cat-txt">
            <span className="sc-cat-eyebrow">
              <span className="sc-cat-en">{c.en}</span>
              <span className="sc-cat-ja">{c.ja}</span>
            </span>
            <h3>{c.problem}</h3>
            <p>{c.body}</p>
          </div>
        </article>
      ))}

      <p className="sc-also">
        宿・旅館、美容・サロン、観光・インバウンドなど、他の業種のご相談も歓迎します。
      </p>
    </section>
  );
}
