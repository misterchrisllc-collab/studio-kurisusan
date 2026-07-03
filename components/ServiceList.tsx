"use client";

import { useState } from "react";

type Row = {
  name: string;
  desc: string;
  price: string;
  use: string; // おすすめ用途
  delivery: string; // 納品内容
  shootTime: string; // 撮影時間目安
  leadTime: string; // 納期
  options: string; // オプション
};

type Section = {
  title: string;
  outcome: string;
  why: string;
  img: string;
  imgAlt: string;
  rows: Row[];
};

const SECTIONS: Section[] = [
  {
    title: "店舗・飲食店撮影",
    outcome: "集客・来店・Googleマップの改善に",
    why: "料理だけではなく、お店の雰囲気・スタッフ・空間まで伝えることで、来店前の期待感を高めます。",
    img: "/photos/portfolio/tonkatsu-staff.jpg",
    imgAlt: "飲食店の撮影、スタッフと料理",
    rows: [
      {
        name: "Googleマップ更新パッケージ",
        desc: "Googleマップ・食べログ・ホットペッパー掲載対応。",
        price: "¥35,000〜",
        use: "Googleマップ・食べログ / 新規来店の獲得",
        delivery: "15枚〜（料理・内観・外観）色補正込み",
        shootTime: "約1〜2時間",
        leadTime: "3〜5営業日",
        options: "追加カット・リール動画・英語メニュー撮影",
      },
      {
        name: "料理・メニュー撮影",
        desc: "SNS・メニューブック・WEB用。1品ずつ丁寧に。",
        price: "¥50,000〜",
        use: "メニューブック・WEB・SNS / 単価アップ・注文促進",
        delivery: "20枚〜（1品ずつ）色補正込み",
        shootTime: "約2〜3時間",
        leadTime: "3〜5営業日",
        options: "フードスタイリング・ドリンク撮影・動画",
      },
      {
        name: "店内・空間撮影",
        desc: "内観・外観・雰囲気。予約サイトやWEBに。",
        price: "¥50,000〜",
        use: "WEB・予約サイト・SNS / 雰囲気で選ばれる店づくり",
        delivery: "15枚〜（内観・外観・ディテール）",
        shootTime: "約1.5〜2時間",
        leadTime: "3〜5営業日",
        options: "夜間撮影・スタッフカット・外観ライトアップ",
      },
      {
        name: "フルブランドパッケージ",
        desc: "料理・店内・スタッフ・動画を1回でまとめて。",
        price: "¥95,000〜",
        use: "開店・リニューアル・総合ブランディング",
        delivery: "料理・店内・スタッフ・短尺動画を一括",
        shootTime: "半日〜1日",
        leadTime: "5〜10営業日",
        options: "追加動画・Web用バナー・多言語対応",
      },
    ],
  },
  {
    title: "商品・EC撮影",
    outcome: "ECコンバージョン・ブランドイメージの向上に",
    why: "ブランド価値を高め、ECサイトや広告で使いやすい商品写真を制作します。",
    img: "/photos/portfolio/candles-lit.jpg",
    imgAlt: "商品・EC撮影、パッケージのエディトリアル",
    rows: [
      {
        name: "スタジオ商品撮影",
        desc: "白・黒・カラー背景。EC・カタログ・広告用。",
        price: "¥30,000〜",
        use: "EC・カタログ・Amazon・広告",
        delivery: "10点〜（背景指定可）切り抜き対応",
        shootTime: "約2〜3時間",
        leadTime: "3〜5営業日",
        options: "切り抜き加工・360度撮影・追加背景",
      },
      {
        name: "ライフスタイル商品撮影",
        desc: "使用シーンを想定。ブランドの世界観を伝える。",
        price: "¥45,000〜",
        use: "ブランドサイト・SNS広告・世界観づくり",
        delivery: "使用シーン10カット〜 色補正込み",
        shootTime: "約3〜4時間",
        leadTime: "5〜7営業日",
        options: "モデル手配・小物スタイリング・動画",
      },
    ],
  },
  {
    title: "企業・採用撮影",
    outcome: "採用力・コーポレートブランドの強化に",
    why: "企業文化や働く人の魅力を伝え、採用・営業・ブランディングに活用できます。",
    img: "/photos/on-location.jpg",
    imgAlt: "企業・採用撮影、現場で働く人",
    rows: [
      {
        name: "スタッフ・採用写真",
        desc: "コーポレートサイト・採用ページ・SNS用。",
        price: "¥45,000〜",
        use: "採用サイト・コーポレートサイト・SNS",
        delivery: "人数分プロフィール＋集合カット",
        shootTime: "約2〜3時間",
        leadTime: "5〜7営業日",
        options: "出張撮影・背景差し替え・動画インタビュー",
      },
      {
        name: "コーポレートブランディング",
        desc: "オフィス・現場・チーム。企業文化を伝える。",
        price: "¥70,000〜",
        use: "企業サイト・IR・採用ブランディング",
        delivery: "オフィス・現場・チーム 30カット〜",
        shootTime: "半日",
        leadTime: "7〜10営業日",
        options: "複数拠点・動画・ドローン撮影",
      },
      {
        name: "建設・リノベーション記録",
        desc: "施工前・中・後の記録。提案書・実績紹介に。",
        price: "¥40,000〜",
        use: "提案書・実績紹介・HP・SNS",
        delivery: "施工前・中・後の記録一式",
        shootTime: "現場に応じて調整",
        leadTime: "5〜7営業日",
        options: "定点観測・ビフォーアフター編集",
      },
    ],
  },
  {
    title: "コンテンツ制作",
    outcome: "SNS・動画・バイリンガルコンテンツ",
    why: "SNSを継続しやすい写真・動画をまとめて制作します。",
    img: "/photos/portfolio/model-speaker.jpg",
    imgAlt: "コンテンツ制作、ライフスタイル撮影",
    rows: [
      {
        name: "リール・ショート動画",
        desc: "TikTok・Instagram・YouTube Shorts。1本から。",
        price: "¥15,000〜",
        use: "TikTok・Instagram・YouTube Shorts",
        delivery: "15〜60秒 縦型動画 1本〜",
        shootTime: "約1〜2時間",
        leadTime: "5〜7営業日",
        options: "複数本まとめ・字幕・BGM選定",
      },
      {
        name: "バイリンガルキャプション",
        desc: "日本語・英語のSNSキャプション制作。",
        price: "¥8,000〜",
        use: "インバウンド対応・海外向けSNS",
        delivery: "日本語・英語のキャプション",
        shootTime: "撮影とセットで対応",
        leadTime: "2〜3営業日",
        options: "スペイン語対応・ハッシュタグ設計",
      },
    ],
  },
];

const DETAIL_FIELDS: { key: keyof Row; label: string }[] = [
  { key: "use", label: "おすすめ用途" },
  { key: "delivery", label: "納品内容" },
  { key: "shootTime", label: "撮影時間目安" },
  { key: "leadTime", label: "納期" },
  { key: "options", label: "オプション" },
];

export default function ServiceList() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <>
      {SECTIONS.map((sec) => (
        <div className="sp-sec" key={sec.title}>
          <div className="sp-cat-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={sec.img} alt={sec.imgAlt} loading="lazy" />
            <div className="cf-mg" />
          </div>
          <div className="sp-sec-hd">
            <div className="sp-sec-t">{sec.title}</div>
            <div className="sp-sec-meta">
              <div className="sp-sec-oc">{sec.outcome}</div>
              <p className="sp-sec-why">{sec.why}</p>
            </div>
          </div>
          <div>
            {sec.rows.map((row) => {
              const isOpen = open === row.name;
              return (
                <div className="sp-row-wrap" key={row.name}>
                  <button
                    type="button"
                    className={`sp-row${isOpen ? " open" : ""}`}
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : row.name)}
                  >
                    <span className="sp-row-n">{row.name}</span>
                    <span className="sp-row-d">{row.desc}</span>
                    <span className="sp-row-p">{row.price}</span>
                    <span className="sp-row-chev" aria-hidden="true">
                      ›
                    </span>
                  </button>
                  <div className={`sp-detail${isOpen ? " open" : ""}`}>
                    <div className="sp-detail-inner">
                      <dl className="sp-detail-grid">
                        {DETAIL_FIELDS.map((f) => (
                          <div className="sp-d-item" key={f.label}>
                            <dt className="sp-d-lbl">{f.label}</dt>
                            <dd className="sp-d-val">{row[f.key]}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}
