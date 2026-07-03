"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "撮影場所はどこまで対応できますか？",
    a: "大阪を中心に、京都・神戸・奈良など関西一円に対応しています。店舗・オフィス・屋外・スタジオいずれも可能です。遠方への出張撮影もご相談ください。",
  },
  {
    q: "納期はどのくらいですか？",
    a: "内容により3〜10営業日が目安です。撮影枚数や編集内容によって前後します。お急ぎの場合は特急対応もご相談いただけます。",
  },
  {
    q: "交通費はかかりますか？",
    a: "大阪市内は無料です。市外・遠方は実費のみ申し受けます。金額は事前のお見積りに含めてご案内しますので、追加請求の心配はありません。",
  },
  {
    q: "写真の修正・レタッチは含まれますか？",
    a: "色補正・明るさ調整・基本的なレタッチは料金に含まれています。人物の肌補正や合成など、より踏み込んだ加工はオプションで対応します。",
  },
  {
    q: "キャンセルはできますか？",
    a: "撮影日の変更・キャンセルはお早めにご連絡ください。前日・当日のキャンセルは、規定のキャンセル料が発生する場合があります。",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="sp-faq">
      <div className="sp-faq-inner">
        <h2 className="sp-faq-title">よくあるご質問</h2>
        <div className="sp-faq-list">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div className="sp-faq-item" key={f.q}>
                <button
                  type="button"
                  className={`sp-faq-q${isOpen ? " open" : ""}`}
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{f.q}</span>
                  <span className="sp-faq-chev" aria-hidden="true">
                    ＋
                  </span>
                </button>
                <div className={`sp-faq-a${isOpen ? " open" : ""}`}>
                  <div className="sp-faq-a-inner">
                    <p>{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
