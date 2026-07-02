import Link from "next/link";
import Footer from "@/components/Footer";

const TICKER = [
  "飲食店撮影",
  "商品撮影",
  "企業撮影",
  "建設記録",
  "SNSコンテンツ",
  "Googleマップ",
  "RESTAURANT",
  "PRODUCT",
  "CORPORATE",
  "BRANDING",
  "OSAKA · JAPAN",
];

const SERVICES = [
  {
    n: "01",
    name: "集客・来店を増やしたい",
    forWho: "飲食店・カフェ・サロン・小売店",
    outcome:
      "Googleマップの写真が古い、SNS素材がない、メニューの魅力が伝わっていない。プロの写真で第一印象を変えます。",
    price: "¥35,000〜",
  },
  {
    n: "02",
    name: "ECサイトの売上を改善したい",
    forWho: "商品・食品・雑貨・アパレル",
    outcome:
      "商品ページのコンバージョンが低い、写真の質がブランドイメージに合っていない。商品の価値を正確に伝える写真を。",
    price: "¥30,000〜",
  },
  {
    n: "03",
    name: "採用力・企業ブランドを高めたい",
    forWho: "企業・スタートアップ・士業",
    outcome:
      "採用サイトの写真が実態と乖離している、コーポレートサイトの写真が古すぎる。会社の雰囲気と文化を正直に伝える写真を。",
    price: "¥45,000〜",
  },
  {
    n: "04",
    name: "SNS・コンテンツを継続的に強化したい",
    forWho: "ブランド・店舗・個人事業主",
    outcome:
      "投稿するビジュアルコンテンツが足りない、統一感がない、動画で商品を見せたい。継続的な素材制作もお任せください。",
    price: "¥15,000〜",
  },
];

const WHY = [
  {
    n: "01",
    title: "撮影の目的から設計する",
    body: "「Googleマップのクリック率を上げたい」「採用サイトで会社の雰囲気を伝えたい」——目的から逆算して撮影プランを立てます。",
  },
  {
    n: "02",
    title: "プラットフォームごとの最適解を知っている",
    body: "Googleマップ、Instagram、タベログ、採用サイト——それぞれで求められる写真の仕様と見せ方が異なります。すべてに対応できます。",
  },
  {
    n: "03",
    title: "日英西3言語で現場を動かせる",
    body: "外国資本のブランドも、インバウンド対応が必要な飲食店も、バイリンガルで対応。コミュニケーションにギャップが生まれません。",
  },
  {
    n: "04",
    title: "大阪のビジネス文化を熟知している",
    body: "15年の経験から、大阪のローカル市場の感覚を深く理解。Tabelog、Hot Pepperのビジュアル傾向や、地域特性を活かした撮影ができます。",
  },
];

const APPROACH = [
  {
    n: "01",
    title: "ヒアリング・課題整理",
    body: "どのプラットフォームで使うか、誰に届けるか、どんな行動を促したいかを整理します。撮影内容が決まっていなくても構いません。",
  },
  {
    n: "02",
    title: "撮影プランの設計",
    body: "必要なカット数、シーン、ライティングを事前に計画。当日の撮影を効率よく進めるための準備を行います。",
  },
  {
    n: "03",
    title: "納品・活用サポート",
    body: "写真の納品後、Googleマップへの掲載方法やSNSでの活用方法についてもアドバイスします。使い方まで一緒に考えます。",
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
          <span className="hero-label">大阪 / 商業撮影スタジオ / Since 2009</span>
          <h1 className="hero-stmt">
            「写真が上手い人」ではなく、<br />
            <em>
              「ビジネスをわかっている<br />
              フォトグラファー」でありたい。
            </em>
          </h1>
          <p className="hero-sub">
            飲食店、小売、企業、ブランド向けの商業撮影・コンテンツ制作。集客、採用、販売——ビジネスの成果につながるビジュアルを制作します。
          </p>
          <div className="hero-acts">
            <Link href="/works" className="btn-p">
              実績を見る
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
              写真は、売るための<em>道具</em>です。<br />
              Googleマップのクリック率、<br />
              SNSのエンゲージメント、<br />
              問い合わせ件数——<em>すべては写真から始まります。</em>
            </h2>
          </div>
          <div className="bs-right">
            <p>
              飲食店のメニュー写真、企業の採用ページ、ECサイトの商品画像、建設会社の施工実績。どの場面でも、プロのビジュアルはビジネスの成果に直結します。
            </p>
            <p>
              撮影技術だけでなく、マーケティングとビジネスの文脈を理解した上で制作します。Google Marketing認定取得。大阪在住15年。ローカルと外国資本、どちらのクライアントとも対等に仕事ができます。
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
              大阪在住15年。<br />
              ローカルビジネスも外資系企業も、<br />
              同じ目線で仕事をしてきました。
            </h2>
            <p>
              アメリカ・フロリダ出身。日本語・英語・スペイン語を話し、大阪のローカル飲食店から外資系ブランドまで幅広く撮影してきました。
            </p>
            <p>
              撮影の依頼を受けるとき、私が最初に考えるのは「この写真はどのプラットフォームで、誰に見せて、何をしてもらうか」です。カメラを持ち込む前に、ビジネスを理解します。
            </p>
            <p>
              Google Marketing認定を取得しており、Googleマップ・SNS・WEBサイトにおける写真の活用方法についても知識があります。撮って終わりではなく、使われる写真を届けます。
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

      {/* SERVICES */}
      <section className="services">
        <div className="svc-intro">
          <h2>ビジネスの課題別に選ぶサービス</h2>
          <Link href="/services">料金を見る →</Link>
        </div>
        <div className="svc-list">
          {SERVICES.map((s) => (
            <Link href="/services" className="svc-row" key={s.n}>
              <span className="svc-n">{s.n}</span>
              <div className="svc-main">
                <div className="svc-name">{s.name}</div>
                <div className="svc-for">{s.forWho}</div>
              </div>
              <div className="svc-outcome">
                <span className="outcome-label">解決する課題</span>
                <p>{s.outcome}</p>
              </div>
              <div className="svc-price">{s.price}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="cases">
        <div className="cases-intro">
          <h2>実績・ケーススタディ</h2>
          <Link href="/works">すべての実績 →</Link>
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
                  Googleマップの写真刷新で<br />
                  電話問い合わせが増加した居酒屋
                </h3>
                <div className="case-meta">
                  <div className="cm-item">
                    <span className="lbl">クライアント</span>
                    <span className="v">大阪市内 居酒屋</span>
                  </div>
                  <div className="cm-item">
                    <span className="lbl">課題</span>
                    <span className="v">古い写真で来店が伸びない</span>
                  </div>
                  <div className="cm-item">
                    <span className="lbl">制作物</span>
                    <span className="v">料理20枚・内観8枚</span>
                  </div>
                  <div className="cm-item">
                    <span className="lbl">納期</span>
                    <span className="v">撮影から3日以内</span>
                  </div>
                </div>
              </div>
              <div className="case-result">
                <span className="rl">ビジネス上の結果</span>
                <p>
                  Googleマップ更新後、オーナーより「問い合わせが明らかに増えた」との報告。写真一枚の変化が集客に直結することを実感した案件。
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
                  商品写真のリニューアルで<br />
                  ECサイトのブランドイメージが一変
                </h3>
                <div className="case-meta">
                  <div className="cm-item">
                    <span className="lbl">クライアント</span>
                    <span className="v">大阪 雑貨ブランド</span>
                  </div>
                  <div className="cm-item">
                    <span className="lbl">課題</span>
                    <span className="v">自撮り写真でブランドが安く見える</span>
                  </div>
                  <div className="cm-item">
                    <span className="lbl">制作物</span>
                    <span className="v">商品15点・ライフスタイル10カット</span>
                  </div>
                  <div className="cm-item">
                    <span className="lbl">対応言語</span>
                    <span className="v">日本語・英語</span>
                  </div>
                </div>
              </div>
              <div className="case-result">
                <span className="rl">ビジネス上の結果</span>
                <p>
                  「やっと自分たちのブランドらしい写真が揃った」とのフィードバック。SNSのエンゲージメントが向上し、ブランドイメージと写真のクオリティが一致した。
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
              <span className="ci">🏢</span>
              <span className="ct">
                [ CORPORATE TEAM / OFFICE ]<br />
                Large format<br />
                Real workplace, natural light
              </span>
              <div className="case-img-label">
                <span>企業撮影 · IT企業</span>
              </div>
              <div className="case-mg-bar"></div>
            </div>
            <div className="case-body">
              <div>
                <span className="case-tag">企業 / 採用 · コーポレートサイト</span>
                <h3>
                  採用写真の刷新で<br />
                  文化フィットした応募者が増加
                </h3>
                <div className="case-meta">
                  <div className="cm-item">
                    <span className="lbl">クライアント</span>
                    <span className="v">大阪 IT企業</span>
                  </div>
                  <div className="cm-item">
                    <span className="lbl">課題</span>
                    <span className="v">採用写真が実態と乖離</span>
                  </div>
                  <div className="cm-item">
                    <span className="lbl">制作物</span>
                    <span className="v">チーム・オフィス・プロフィール</span>
                  </div>
                  <div className="cm-item">
                    <span className="lbl">対応言語</span>
                    <span className="v">日本語・英語</span>
                  </div>
                </div>
              </div>
              <div className="case-result">
                <span className="rl">ビジネス上の結果</span>
                <p>
                  「面接応募者の質が変わった」という声。会社の雰囲気と価値観を正確に伝えることで、文化フィットした候補者からの応募が増加。
                </p>
              </div>
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
            &quot;写真を変えただけで、<em>お客さんの反応が変わりました。</em>
            <br />
            もっと早くお願いすればよかった。&quot;
          </blockquote>
          <span className="qattr">— 大阪市内 カフェオーナー</span>
        </div>
        <div className="quote-r">
          <span className="pre">なぜ今、写真が重要か</span>
          <h3>すべての顧客接点で、写真が「第一印象」になる時代。</h3>
          <p>
            Googleマップで店を探す人は、写真を見てから来店を決めます。採用サイトを見た候補者は、写真で会社の雰囲気を判断します。ECサイトの商品は、写真でしか触れません。プロの写真は、コストではなく投資です。
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
            撮影内容が決まっていなくても構いません。「こういう課題がある」「こういうビジュアルが欲しい」——そこから一緒に考えます。相談は無料です。
          </p>
        </div>
        <div className="cta-actions">
          <Link href="/contact" className="btn-big">
            プロジェクトを相談する
          </Link>
          <Link href="/services" className="btn-txt">
            料金・サービス一覧を見る
          </Link>
        </div>
      </section>

      <Footer variant="home" />
    </div>
  );
}
