"use client";

import { useState } from "react";

const FILTERS = [
  { cat: "all", label: "すべて" },
  { cat: "restaurant", label: "飲食店" },
  { cat: "retail", label: "小売・EC" },
  { cat: "corporate", label: "企業" },
  { cat: "construction", label: "建設・リノベ" },
  { cat: "product", label: "商品" },
  { cat: "content", label: "コンテンツ" },
];

type CaseItem = {
  cat: string;
  icon: string;
  imgLabel: string;
  img?: string;
  imgAlt?: string;
  tag: string;
  title: string;
  desc: string;
  meta: { lbl: string; v: string }[];
  result: string;
};

const CASES: CaseItem[] = [
  {
    cat: "restaurant",
    icon: "🍽",
    imgLabel: "[ RESTAURANT ]",
    img: "/photos/work-restaurant.jpg",
    imgAlt: "飲食店の料理撮影、タコスのクローズアップ",
    tag: "飲食店 / Googleマップ · SNS",
    title: "Googleマップ刷新で集客改善",
    desc: "既存写真が古く料理の魅力が伝わっていなかった大阪市内の居酒屋。料理・内観・外観を1回の撮影でまとめて更新。",
    meta: [
      { lbl: "制作物", v: "料理20枚・内観8枚" },
      { lbl: "納期", v: "3日以内" },
    ],
    result: "更新後、電話問い合わせが増加。「写真一枚でこんなに変わるとは」とのコメント。",
  },
  {
    cat: "product",
    icon: "📦",
    imgLabel: "[ PRODUCT ]",
    img: "/photos/work-product.jpg",
    imgAlt: "商品撮影、赤背景のスリラチャ・エディトリアルカット",
    tag: "EC · 商品 / スタジオ撮影",
    title: "ECサイト商品写真でブランド品質を引き上げる",
    desc: "自撮り写真でブランドが安く見えていた雑貨ブランド。スタジオ撮影とライフスタイルカットを組み合わせてEC・SNS素材を一括制作。",
    meta: [
      { lbl: "制作物", v: "商品15点・ライフスタイル10カット" },
      { lbl: "対応", v: "日英" },
    ],
    result: "「やっとブランドらしい写真が揃った」。SNSエンゲージメント向上。",
  },
  {
    cat: "corporate",
    icon: "🏢",
    imgLabel: "[ CORPORATE ]",
    tag: "企業 / 採用 · コーポレート",
    title: "採用写真刷新で文化フィット応募者が増加",
    desc: "採用ページの写真が実態と乖離していた大阪のIT企業。チーム・オフィス・個人プロフィールを1日で撮影。",
    meta: [
      { lbl: "制作物", v: "チーム・オフィス・プロフィール" },
      { lbl: "対応", v: "日英" },
    ],
    result: "「面接応募者の質が変わった」。価値観の合う候補者からの応募が増加。",
  },
  {
    cat: "construction",
    icon: "🏗",
    imgLabel: "[ CONSTRUCTION ]",
    tag: "建設 · リノベ / 施工記録",
    title: "施工前後の記録で提案書の説得力が向上",
    desc: "口コミだけに頼っていた内装業者が、提案書と実績紹介のためにbefore/after形式の施工記録を依頼。",
    meta: [
      { lbl: "制作物", v: "施工前・中・後 各現場" },
      { lbl: "用途", v: "提案書・HP・SNS" },
    ],
    result: "「写真があると客への伝わり方が全然違う」との声。提案書の説得力が向上。",
  },
];

export default function WorkGrid() {
  const [active, setActive] = useState("all");

  return (
    <>
      <div className="wk-filters">
        {FILTERS.map((f) => (
          <button
            key={f.cat}
            className={`wk-f${active === f.cat ? " on" : ""}`}
            onClick={() => setActive(f.cat)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="cases-full" id="work-grid">
        {CASES.map((c) => (
          <div
            key={c.title}
            className="case-full"
            data-cat={c.cat}
            style={{
              display: active === "all" || c.cat === active ? "grid" : "none",
            }}
          >
            <div className="cf-img">
              {c.img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="slot-img" src={c.img} alt={c.imgAlt ?? ""} />
              ) : (
                <>
                  <span className="ci">{c.icon}</span>
                  <span className="ct">{c.imgLabel}</span>
                </>
              )}
              <div className="cf-mg"></div>
            </div>
            <div className="cf-body">
              <div>
                <span className="cf-tag">{c.tag}</span>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <div className="cf-meta">
                  {c.meta.map((m) => (
                    <div key={m.lbl}>
                      <span className="lbl">{m.lbl}</span>
                      <span className="v">{m.v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="cf-result">
                <span className="rl">結果</span>
                <p>{c.result}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
