"use client";

import Link from "next/link";
import { useState } from "react";

const OPTIONS = [
  { name: "Googleマップ更新", note: "15枚〜", price: 35000 },
  { name: "料理・メニュー撮影", note: "20枚〜", price: 50000 },
  { name: "店内・空間撮影", note: "15枚〜", price: 50000 },
  { name: "スタジオ商品撮影", note: "10点〜", price: 30000 },
  { name: "スタッフ・採用写真", note: "チーム", price: 45000 },
  { name: "リール動画", note: "1本あたり", price: 15000 },
  { name: "バイリンガルキャプション", note: "日英", price: 8000 },
];

export default function PriceCalculator() {
  const [selected, setSelected] = useState<boolean[]>(
    OPTIONS.map(() => false),
  );

  const total = OPTIONS.reduce(
    (sum, opt, i) => sum + (selected[i] ? opt.price : 0),
    0,
  );

  const toggle = (i: number) =>
    setSelected((prev) => prev.map((v, j) => (j === i ? !v : v)));

  return (
    <div className="sp-calc">
      <div className="cw">
        <h2>かんたん見積もり</h2>
        <p className="sub">必要な内容を選ぶと目安金額が表示されます。</p>
        <div>
          {OPTIONS.map((opt, i) => (
            <div
              key={opt.name}
              className={`co${selected[i] ? " sel" : ""}`}
              onClick={() => toggle(i)}
            >
              <div className="co-l">
                <div className="cbox"></div>
                <div>
                  <div className="co-n">{opt.name}</div>
                  <div className="co-nt">{opt.note}</div>
                </div>
              </div>
              <span className="co-p">¥{opt.price.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div className="ctot-row">
          <span className="ctot-lbl">目安合計</span>
          <span className="ctot-num">
            {total > 0 ? `¥${total.toLocaleString()}〜` : "¥0〜"}
          </span>
        </div>
        <p className="cnote">
          ※ 目安金額です。スコープ・出張費により変動します。
        </p>
        <Link href="/contact" className="btn-bk">
          正確な見積もりを依頼する
        </Link>
      </div>
    </div>
  );
}
