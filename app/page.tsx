import Link from "next/link";
import Footer from "@/components/Footer";

const TICKER = [
  "ブランディング",
  "集客・マーケティング",
  "クリエイティブディレクション",
  "Googleビジネス",
  "SNSコンテンツ",
  "商業写真",
  "販促・デザイン",
  "BRANDING",
  "CREATIVE DIRECTION",
  "OSAKA · JAPAN",
];

// Six flagship business solutions — outcomes and partnerships, all built on
// photography. Presented as solutions (not a service menu). The Monthly Content
// Partner is the flagship recurring relationship.
type Solution = {
  n: string;
  name: string;
  en: string;
  outcome: string;
  tag: string;
  flagship?: boolean;
};
const SOLUTIONS: Solution[] = [
  {
    n: "01",
    name: "開業・オープンブランディング",
    en: "Business Launch",
    outcome:
      "開業やリブランディングのタイミングで、店名・世界観・写真・発信までを一度に整えます。最初の第一印象から「らしさ」が伝わる状態をつくります。",
    tag: "¥95,000〜",
  },
  {
    n: "02",
    name: "ブランドリフレッシュ",
    en: "Brand Refresh",
    outcome:
      "すでにあるビジネスの見え方を、今の姿に更新します。古く見える写真や不揃いな素材を、一貫したブランドの表現に整え直します。",
    tag: "¥50,000〜",
  },
  {
    n: "03",
    name: "Googleビジネス強化",
    en: "Google Business Boost",
    outcome:
      "Googleマップと検索で見つけてもらう入口を強化します。プロフィール写真の刷新から定期的な更新まで、地域での見つけやすさを継続的に高めます。",
    tag: "¥35,000〜",
  },
  {
    n: "04",
    name: "採用ブランディング",
    en: "Recruitment Branding",
    outcome:
      "会社の文化と働く人の魅力を、正直なビジュアルで伝えます。実態に合った採用写真とコンテンツで、価値観の合う応募者との出会いを増やします。",
    tag: "¥45,000〜",
  },
  {
    n: "05",
    name: "クリエイティブパートナー",
    en: "Creative Partner",
    outcome:
      "撮影を都度お願いするのではなく、ブランドの「伴走者」を持つ契約です。Googleビジネス更新・毎月の撮影・SNS・販促デザイン・季節キャンペーン・ブランド相談までを、AIも活用しながら継続支援。優先予約つき、私たちの中心となるサービスです。",
    tag: "月額契約",
    flagship: true,
  },
  {
    n: "06",
    name: "イベント・PR撮影",
    en: "Event Marketing Content",
    outcome:
      "イベントは当日だけでは終わりません。次回の集客・SNS・ホームページ・Googleマップ・プレスリリースまで見据えて、終わった後も使い続けられる写真とコンテンツを制作します。",
    tag: "都度お見積り",
  },
  {
    n: "07",
    name: "季節・スポットキャンペーン",
    en: "Seasonal Campaigns",
    outcome:
      "新商品・イベント・季節のフェアなど、期間限定の施策に合わせたビジュアルを制作します。狙ったタイミングで、しっかり伝わる打ち出しをつくります。",
    tag: "都度お見積り",
  },
];

const WHY = [
  {
    n: "01",
    title: "ビジネスの理解から始める",
    body: "「誰に、何を伝えたいか」から一緒に整理します。撮影内容が決まっていなくても、目的から逆算してプランを立てます。",
  },
  {
    n: "02",
    title: "伝え方まで、一貫して設計する",
    body: "Googleマップ、SNS、WEB、メニューや販促物。媒体ごとに最適な見せ方を考え、ブランドが一貫して伝わるようにまとめます。",
  },
  {
    n: "03",
    title: "新しいツールも、対話も大切にする",
    body: "AIや最新のツールも積極的に活用します。そのうえで、対話と理解からしか生まれない「そのお店らしさ」を大切にします。",
  },
  {
    n: "04",
    title: "日英西・大阪で、現場を動かせる",
    body: "日本語・英語・スペイン語で対応。大阪を拠点に15年、ローカルから外資系ブランドまで、現場でコミュニケーションのギャップを生みません。",
  },
];

const APPROACH = [
  {
    n: "01",
    title: "ヒアリング・課題整理",
    body: "どう見られたいか、誰に届けたいか、何を解決したいかを一緒に整理します。撮影内容が決まっていなくても構いません。",
  },
  {
    n: "02",
    title: "クリエイティブプランの設計",
    body: "撮影に加えて、必要に応じて構成・デザイン・AIを使ったアイデア出しまで。ブランドに合った見せ方を設計します。",
  },
  {
    n: "03",
    title: "納品・活用サポート",
    body: "写真やデザインの納品後も、Googleマップ・SNS・WEBでの活かし方まで一緒に考えます。使われるところまでが仕事です。",
  },
];

export default function Home() {
  return (
    <div className="page">
      {/* HERO */}
      <section className="hero">
        <div className="hero-img-area">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="slot-img"
            src="/photos/hero.jpg"
            alt="大阪の飲食店向け商業撮影、テーブルに並んだタコスとドリンク"
          />
        </div>
        <div className="hero-bg"></div>
        <div className="hero-content">
          <h1 className="hero-stmt">
            お店やブランドが、<br />
            <em>
              もっと選ばれる<br />
              理由をつくる。
            </em>
          </h1>
          <p className="hero-sub">
            集客・SNS・Googleマップ・採用・ブランディング。写真やデザイン、AIも使いながら、小さなビジネスの「うまく伝わらない」を解決するクリエイティブパートナーです。
          </p>
          <div className="hero-acts">
            <Link href="/works" className="btn-p">
              作品を見る
            </Link>
            <Link href="/contact" className="btn-s">
              プロジェクトを相談する
            </Link>
          </div>
        </div>
      </section>

      {/* BRAND STATEMENT */}
      <div className="brand-stmt">
        <div className="brand-stmt-inner">
          <div className="bs-left">
            <span className="pre">Studio くりすさんとは</span>
            <h2>
              誰でも、きれいな画像を<br />
              つくれる時代になりました。<br />
              だからこそ、<em>「らしさ」が伝わるか</em>で、<br />
              ブランドの印象は変わります。
            </h2>
          </div>
          <div className="bs-right">
            <p>
              Studio くりすさんは、小さなビジネスの「伝わらない」を解決するクリエイティブスタジオです。写真・デザイン・Googleビジネス・SNS・AIまで、課題に合わせて必要な手段を組み合わせ、ひとつの流れでお手伝いします。
            </p>
            <p>
              AIや新しいツールも積極的に使います。ただ、記憶に残るブランドをつくるのは技術だけではありません。丁寧な対話と、その事業への理解から、本当に「その人たちらしい」ビジュアルが生まれると考えています。
            </p>
          </div>
        </div>
      </div>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-t">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i}>
              {t}
              <span className="sep">—</span>
            </span>
          ))}
        </div>
      </div>

      {/* WHY CHRIS */}
      <section className="why-chris">
        <div className="wc-top">
          <div className="wc-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="slot-img wc-portrait"
              src="/photos/portrait.jpg"
              alt="Studio くりすさん フォトグラファー Chris、フィルムカメラを構えるポートレート"
            />
            <div className="wc-mg-stripe"></div>
          </div>
          <div className="wc-text">
            <span className="pre">なぜ Studio くりすさんか</span>
            <h2>
              ブランドづくりの相談相手であり、<br />
              つくり手でもある。<br />
              その両方でありたいと考えています。
            </h2>
            <p>
              アメリカ・フロリダ出身。日本語・英語・スペイン語を話し、大阪のローカル飲食店から外資系ブランドまで幅広く撮影してきました。
            </p>
            <p>
              撮影の依頼を受けるとき、私が最初に考えるのは「この写真は誰に見せて、何を感じてもらうか」です。カメラを持ち込む前に、まずビジネスを理解します。
            </p>
            <p>
              Google Marketing認定を取得。AIや新しいツールも取り入れながら、写真・デザイン・SNSまで、ブランドが一貫して伝わるように設計します。撮って終わりではなく、使われるビジュアルを届けます。
            </p>
          </div>
        </div>
        <div className="wc-grid">
          {WHY.map((w) => (
            <div className="wc-item" key={w.n}>
              <span className="wc-item-n">{w.n}</span>
              <h3>{w.title}</h3>
              <p>{w.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="services">
        <div className="svc-intro">
          <div>
            <span className="pre">WHAT WE DO</span>
            <h2>課題から考える、7つのビジネスソリューション</h2>
          </div>
          <Link href="/services">すべて見る →</Link>
        </div>
        <p className="svc-lede">
          単発の撮影ではなく、ビジネスの課題から考える解決策を。写真を土台に、ディレクション・発信・継続的な支援までを組み合わせ、「自分たちが何者か」が伝わるブランドを一緒に育てます。
        </p>
        <div className="svc-list">
          {SOLUTIONS.map((s) => (
            <Link
              href="/services"
              className={`svc-row${s.flagship ? " svc-flagship" : ""}`}
              key={s.n}
            >
              <span className="svc-n">{s.n}</span>
              <div className="svc-main">
                <div className="svc-name">
                  {s.name}
                  {s.flagship && <span className="svc-flag-badge">おすすめ</span>}
                </div>
                <div className="svc-for">{s.en}</div>
              </div>
              <div className="svc-outcome">
                <span className="outcome-label">できること</span>
                <p>{s.outcome}</p>
              </div>
              <div className="svc-price">{s.tag}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* PROBLEM → APPROACH EXAMPLES (honest; not fabricated case studies) */}
      <section className="cases">
        <div className="cases-intro">
          <h2>こんな課題に、こう応えます。</h2>
          <Link href="/works">作品を見る →</Link>
        </div>

        <div className="case">
          <div className="case-inner">
            <div className="case-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="slot-img"
                src="/photos/case-food.jpg"
                alt="飲食店の料理撮影、盛り付けられたタコスのプレート"
              />
              <div className="case-img-label">
                <span>飲食店 · 大阪市内</span>
              </div>
              <div className="case-mg-bar"></div>
            </div>
            <div className="case-body">
              <div>
                <span className="case-tag">飲食店 / Googleマップ · SNS · メニュー</span>
                <h3>
                  Googleマップとメニューの写真を、<br />
                  「入ってみたい」に変える。
                </h3>
                <div className="case-meta">
                  <div className="cm-item">
                    <span className="lbl">業種</span>
                    <span className="v">飲食店・カフェ</span>
                  </div>
                  <div className="cm-item">
                    <span className="lbl">課題</span>
                    <span className="v">写真が古く、第一印象で伝わらない</span>
                  </div>
                  <div className="cm-item">
                    <span className="lbl">制作するビジュアル</span>
                    <span className="v">料理・内観・スタッフ・外観</span>
                  </div>
                  <div className="cm-item">
                    <span className="lbl">納品内容</span>
                    <span className="v">撮影データ一式（色補正込み）</span>
                  </div>
                </div>
              </div>
              <div className="case-result">
                <span className="rl">ねらい</span>
                <p>
                  古い写真は第一印象で損をします。料理から店の空気感まで撮り直し、Googleマップやメニューで「来店前の期待感」をつくります。
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="case">
          <div className="case-inner">
            <div className="case-body">
              <div>
                <span className="case-tag">小売・EC / 商品撮影 · ライフスタイル</span>
                <h3>
                  商品の世界観が伝わる、<br />
                  ブランドらしい商品写真を。
                </h3>
                <div className="case-meta">
                  <div className="cm-item">
                    <span className="lbl">業種</span>
                    <span className="v">小売・EC・ブランド</span>
                  </div>
                  <div className="cm-item">
                    <span className="lbl">課題</span>
                    <span className="v">自撮り写真でブランドが安く見える</span>
                  </div>
                  <div className="cm-item">
                    <span className="lbl">制作するビジュアル</span>
                    <span className="v">商品カット・ライフスタイル・使用シーン</span>
                  </div>
                  <div className="cm-item">
                    <span className="lbl">納品内容</span>
                    <span className="v">EC・SNS・広告用データ（切り抜き対応）</span>
                  </div>
                </div>
              </div>
              <div className="case-result">
                <span className="rl">ねらい</span>
                <p>
                  商品の見え方は、そのままブランドの印象になります。世界観に合わせた光と構図で、ECや広告で「安く見えない」一貫したビジュアルに整えます。
                </p>
              </div>
            </div>
            <div className="case-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="slot-img"
                src="/photos/case-product.jpg"
                alt="商品撮影、キャンドルのエディトリアル・ライフスタイルカット"
              />
              <div className="case-img-label">
                <span>商品撮影 · 雑貨ブランド</span>
              </div>
              <div className="case-mg-bar"></div>
            </div>
          </div>
        </div>

        <div className="case">
          <div className="case-inner">
            <div className="case-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="slot-img"
                src="/photos/portfolio/tonkatsu-chef.jpg"
                alt="厨房で仕込みをする職人、働く人の撮影"
              />
              <div className="case-img-label">
                <span>人・現場 · 撮影事例</span>
              </div>
              <div className="case-mg-bar"></div>
            </div>
            <div className="case-body">
              <div>
                <span className="case-tag">採用・ブランド / 人と現場</span>
                <h3>
                  働く人の魅力を、<br />
                  そのまま伝える。
                </h3>
                <div className="case-meta">
                  <div className="cm-item">
                    <span className="lbl">業種</span>
                    <span className="v">企業・店舗・チーム</span>
                  </div>
                  <div className="cm-item">
                    <span className="lbl">課題</span>
                    <span className="v">採用・発信で「人」の魅力が伝わらない</span>
                  </div>
                  <div className="cm-item">
                    <span className="lbl">制作するビジュアル</span>
                    <span className="v">働く様子・チーム・プロフィール・現場</span>
                  </div>
                  <div className="cm-item">
                    <span className="lbl">納品内容</span>
                    <span className="v">採用・HP・SNS用データ</span>
                  </div>
                </div>
              </div>
              <div className="case-result">
                <span className="rl">ねらい</span>
                <p>
                  採用もブランドも、最後は「人」です。現場で働く自然な姿を撮り、会社やお店の空気感と人柄を、正直に伝わるビジュアルにします。
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="case">
          <div className="case-inner">
            <div className="case-body">
              <div>
                <span className="case-tag">イベント・PR / SNS・集客・プレスリリース</span>
                <h3>
                  一日のポップアップを、<br />
                  使い続ける集客コンテンツに。
                </h3>
                <div className="case-meta">
                  <div className="cm-item">
                    <span className="lbl">業種</span>
                    <span className="v">飲食・ポップアップ / イベント</span>
                  </div>
                  <div className="cm-item">
                    <span className="lbl">課題</span>
                    <span className="v">当日で終わり、後に残る素材がない</span>
                  </div>
                  <div className="cm-item">
                    <span className="lbl">制作するビジュアル</span>
                    <span className="v">会場の熱気・料理・来場者・ブランド</span>
                  </div>
                  <div className="cm-item">
                    <span className="lbl">納品内容</span>
                    <span className="v">SNS・HP・Googleマップ・プレス用データ</span>
                  </div>
                </div>
              </div>
              <div className="case-result">
                <span className="rl">ねらい</span>
                <p>
                  イベントは一度きりでも、写真とコンテンツは残ります。当日の熱気を記録し、次回の告知・SNS・Googleマップ・プレスリリースに使える素材として届けることで、一日の出店を継続的な集客資産に変えます。
                </p>
              </div>
            </div>
            <div className="case-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="slot-img"
                src="/photos/portfolio/tacos-event-venue.jpg"
                alt="タコスのポップアップ会場に集まる来場者と、賑わう店内の様子"
              />
              <div className="case-img-label">
                <span>イベント・PR撮影 · ポップアップ</span>
              </div>
              <div className="case-mg-bar"></div>
            </div>
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="approach">
        <div className="approach-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="slot-img"
            src="/photos/approach.jpg"
            alt="スタジオでの商品撮影セットアップ、ライティング機材"
          />
          <div className="ap-mg-stripe"></div>
        </div>
        <div className="approach-text">
          <span className="pre">制作プロセス</span>
          <h2>
            撮影の前に、<br />
            ビジネスを理解する。
          </h2>
          <div className="ap-items">
            {APPROACH.map((a) => (
              <div className="ap-item" key={a.n}>
                <span className="ap-n">{a.n}</span>
                <div className="ap-body">
                  <h4>{a.title}</h4>
                  <p>{a.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="quote-s">
        <div>
          <blockquote>
            きれいな写真ではなく、<em>「あなたらしい」</em>
            <br />
            写真とブランドを。
          </blockquote>
          <span className="qattr">Studio くりすさん</span>
        </div>
        <div className="quote-r">
          <span className="pre">なぜ今、ブランドが重要か</span>
          <h3>誰もが画像をつくれる時代。だからこそ、「らしさ」で差がつきます。</h3>
          <p>
            AIや便利なツールで、きれいな画像は誰でもつくれるようになりました。似たビジュアルが増えるなかで選ばれるのは、「その事業らしさ」がきちんと伝わるブランドです。写真やデザインを使って、その違いをかたちにします。
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-f">
        <div>
          <h2>
            まず、<em>話しましょう。</em>
          </h2>
          <p>
            撮影内容が決まっていなくても構いません。「こう見られたい」「これを解決したい」。そこから一緒に考えます。相談は無料です。
          </p>
        </div>
        <div className="cta-actions">
          <Link href="/contact" className="btn-big">
            プロジェクトを相談する
          </Link>
          <Link href="/services" className="btn-txt">
            ソリューション・料金を見る
          </Link>
        </div>
      </section>

      <Footer variant="home" />
    </div>
  );
}
