import Image from "next/image";

/* Organized by business type / problem, not by photography service. Editorial
   pacing: a couple of full-bleed immersive bands as punctuation, the rest
   breathe as split / text-forward layouts on white — magazine rhythm, not six
   identical hero banners. Only categories we can genuinely back with distinct
   imagery get a block; the rest are named in the "also" line below. */
type Img = { src: string; alt: string; pos?: string };
type Category = {
  layout: "bleed" | "split" | "feature";
  en: string;
  ja: string;
  problem: string;
  body: string;
  flip?: boolean; // split: image on the right instead of the left
  tall?: boolean; // bleed: extra height for negative space
  img?: Img; // bleed + split
  imgs?: Img[]; // feature (product cluster)
};

const CATEGORIES: Category[] = [
  {
    layout: "bleed",
    en: "Restaurants",
    ja: "飲食店",
    problem: "いい店なのに、画面の中では素通りされている。",
    body: "料理も、店の空気も、ちゃんと伝われば「行ってみたい」に変わる。Googleマップ、SNS、メニュー。お客様が来店を決める場所を、強くします。",
    img: { src: "portfolio/burger-cross", alt: "断面の美しいスマッシュバーガー", pos: "center 50%" },
  },
  {
    layout: "split",
    en: "Spaces & Architecture",
    ja: "空間・店舗・建築",
    problem: "行く前に、その場所の心地よさは決まっている。",
    body: "内観、外観、灯り。予約サイトやGoogleマップで「ここがいい」と選ばれる入口をつくります。店舗、建築、不動産まで。",
    img: { src: "portfolio/kominka-chair", alt: "円窓のある古民家のくつろぎの空間", pos: "center 45%" },
  },
  {
    layout: "feature",
    en: "Products & EC",
    ja: "商品・EC",
    problem: "いいものだと、ひと目で伝える。",
    body: "その価値が、必要としている人にまっすぐ伝わること。それが、ECやSNSで選ばれる理由になります。",
    imgs: [
      { src: "portfolio/sriracha-lying", alt: "調味料ボトルの商品撮影" },
      { src: "portfolio/mayo-bottle", alt: "白背景の調味料の商品撮影" },
    ],
  },
  {
    layout: "split",
    flip: true,
    en: "Retail & Apparel",
    ja: "アパレル・小売",
    problem: "見た目がそろうと、ブランドになる。",
    body: "トーンの合ったビジュアルで、SNSも、発信も、同じメッセージを届ける。ブランドを、必要としている人とつなぎます。",
    img: { src: "portfolio/brand-donut-model", alt: "ブランドらしさが伝わるライフスタイル撮影", pos: "38% 22%" },
  },
  {
    layout: "split",
    en: "Corporate & Recruitment",
    ja: "企業・採用",
    problem: "「どんな会社か」が伝われば、合う人が集まる。",
    body: "働く人、現場、その文化。採用も、コーポレートも、価値観の合う人との出会いを増やします。",
    img: { src: "portfolio/cafe-owner", alt: "店を営む人のポートレート", pos: "center 30%" },
  },
  {
    layout: "bleed",
    tall: true,
    en: "Events & PR",
    ja: "イベント・PR",
    problem: "イベントは、当日で終わらせない。",
    body: "その日の熱を、次の集客・SNS・プレスへ。あとから使い続けられる素材にします。",
    img: { src: "portfolio/tacos-event-night", alt: "夜のイベント会場の熱気", pos: "center 26%" },
  },
];

function Eyebrow({ en, ja, dark }: { en: string; ja: string; dark?: boolean }) {
  return (
    <span className={`sc-eyebrow${dark ? " on-dark" : ""}`}>
      <span className="sc-eyebrow-en">{en}</span>
      <span className="sc-eyebrow-ja">{ja}</span>
    </span>
  );
}

export default function ServiceCategories() {
  return (
    <section className="sc" id="categories">
      <div className="sc-lead">
        <span className="pre">HOW WE HELP</span>
        <h2>あなたのビジネスから、考える。</h2>
      </div>

      {CATEGORIES.map((c) => {
        if (c.layout === "bleed") {
          return (
            <article className={`sc-cat${c.tall ? " tall" : ""}`} key={c.en}>
              <div className="sc-cat-img">
                <Image
                  src={`/photos/${c.img!.src}.jpg`}
                  alt={c.img!.alt}
                  fill
                  sizes="100vw"
                  quality={82}
                  style={{ objectFit: "cover", objectPosition: c.img!.pos ?? "center" }}
                />
              </div>
              <div className="sc-cat-txt">
                <Eyebrow en={c.en} ja={c.ja} dark />
                <h3>{c.problem}</h3>
                <p>{c.body}</p>
              </div>
            </article>
          );
        }

        if (c.layout === "feature") {
          return (
            <article className="sc-feat" key={c.en}>
              <div className="sc-feat-txt">
                <Eyebrow en={c.en} ja={c.ja} />
                <h3>{c.problem}</h3>
                <p>{c.body}</p>
              </div>
              <div className="sc-feat-imgs">
                {c.imgs!.map((im, i) => (
                  <div className={`sc-feat-img ${i === 0 ? "a" : "b"}`} key={im.src}>
                    <Image
                      src={`/photos/${im.src}.jpg`}
                      alt={im.alt}
                      fill
                      sizes="(max-width:900px) 45vw, 24vw"
                      quality={82}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ))}
              </div>
            </article>
          );
        }

        // split
        return (
          <article className={`sc-split${c.flip ? " flip" : ""}`} key={c.en}>
            <div className="sc-split-img">
              <Image
                src={`/photos/${c.img!.src}.jpg`}
                alt={c.img!.alt}
                fill
                sizes="(max-width:900px) 100vw, 50vw"
                quality={82}
                style={{ objectFit: "cover", objectPosition: c.img!.pos ?? "center" }}
              />
            </div>
            <div className="sc-split-txt">
              <Eyebrow en={c.en} ja={c.ja} />
              <h3>{c.problem}</h3>
              <p>{c.body}</p>
            </div>
          </article>
        );
      })}

      <p className="sc-also">
        宿・旅館、美容・サロン、観光・インバウンドなど、他の業種のご相談も歓迎します。
      </p>
    </section>
  );
}
