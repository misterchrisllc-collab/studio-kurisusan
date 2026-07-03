"use client";

import Link from "next/link";
import { useState } from "react";

type Opt = {
  name: string;
  note: string;
  price: number;
  photos: number; // estimated delivered photos
  hours: number; // estimated shooting time
  lead: number; // estimated business days to deliver
};

const OPTIONS: Opt[] = [
  { name: "Googleマップ更新", note: "15枚〜", price: 35000, photos: 15, hours: 1.5, lead: 5 },
  { name: "料理・メニュー撮影", note: "20枚〜", price: 50000, photos: 20, hours: 2.5, lead: 5 },
  { name: "店内・空間撮影", note: "15枚〜", price: 50000, photos: 15, hours: 2, lead: 5 },
  { name: "スタジオ商品撮影", note: "10点〜", price: 30000, photos: 10, hours: 2.5, lead: 5 },
  { name: "スタッフ・採用写真", note: "チーム", price: 45000, photos: 12, hours: 2.5, lead: 7 },
  { name: "リール動画", note: "1本あたり", price: 15000, photos: 0, hours: 1.5, lead: 7 },
  { name: "バイリンガルキャプション", note: "日英", price: 8000, photos: 0, hours: 0, lead: 3 },
];

const fmtHours = (h: number) => {
  if (h >= 8) return "1日";
  if (h >= 5) return "半日〜1日";
  return `約${Number.isInteger(h) ? h : h.toFixed(1)}時間`;
};

export default function PriceCalculator() {
  const [selected, setSelected] = useState<boolean[]>(OPTIONS.map(() => false));

  const chosen = OPTIONS.filter((_, i) => selected[i]);
  const total = chosen.reduce((s, o) => s + o.price, 0);
  const photos = chosen.reduce((s, o) => s + o.photos, 0);
  const hours = chosen.reduce((s, o) => s + o.hours, 0);
  const lead = chosen.reduce((m, o) => Math.max(m, o.lead), 0);
  const any = chosen.length > 0;

  const toggle = (i: number) =>
    setSelected((prev) => prev.map((v, j) => (j === i ? !v : v)));

  return (
    <div className="sp-calc">
      <div className="cw">
        <h2>かんたん見積もり</h2>
        <p className="sub">
          必要な内容を選ぶと、目安金額・撮影時間・納品枚数・納期が表示されます。
        </p>
        <div>
          {OPTIONS.map((opt, i) => (
            <div
              key={opt.name}
              className={`co${selected[i] ? " sel" : ""}`}
              role="checkbox"
              aria-checked={selected[i]}
              aria-label={`${opt.name} ¥${opt.price.toLocaleString()}`}
              tabIndex={0}
              onClick={() => toggle(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle(i);
                }
              }}
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
            {any ? `¥${total.toLocaleString()}〜` : "¥0〜"}
          </span>
        </div>

        <div className={`calc-stats${any ? " on" : ""}`}>
          <div className="calc-stat">
            <span className="calc-stat-lbl">撮影時間目安</span>
            <span className="calc-stat-val">{any ? fmtHours(hours) : "ー"}</span>
          </div>
          <div className="calc-stat">
            <span className="calc-stat-lbl">納品枚数目安</span>
            <span className="calc-stat-val">
              {any && photos > 0 ? `${photos}枚〜` : "ー"}
            </span>
          </div>
          <div className="calc-stat">
            <span className="calc-stat-lbl">納期目安</span>
            <span className="calc-stat-val">
              {any ? `約${lead}営業日` : "ー"}
            </span>
          </div>
        </div>

        <p className="cnote">
          ※ 目安です。スコープ・出張費・オプションにより変動します。複数を同日に撮影する場合、納期は最長のものが目安となります。
        </p>
        <Link href="/contact" className="btn-bk">
          正確な見積もりを依頼する
        </Link>
      </div>
    </div>
  );
}
