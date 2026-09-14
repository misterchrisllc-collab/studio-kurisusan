"use client";

import { useState } from "react";

/**
 * 料金 — the direction ladder.
 *
 * 2026-08-23. This replaced a 12-row menu of photography products (料理・メニュー撮影,
 * 店内・空間撮影, スタジオ商品撮影 …). Studio くりすさん does not sell shoots; what
 * escalates between tiers is how much thinking the studio brings, not how many
 * photos arrive. Photo, video and carousels are how it gets delivered.
 *
 * Source of truth: leads/pricing/simple-stupid.html (社内資料, 2026-08-28).
 * ⚠ That sheet disagrees with leads/pricing/master-pricing-sheet.html ON PURPOSE.
 *   The master is frozen at v11 as a catalogue. Do NOT reconcile the two.
 * ⚠ All prices here are 税込, exactly as the sheet has them. Do not restate them
 *   as 税別 without converting.
 */

type Tier = {
  step: string;
  name: string;
  direction: string; // the 段 — what the studio decides
  desc: string;
  price: string;
  priceNote?: string;
  includes: string;
  directionDetail: string;
  use: string;
  leadTime: string;
  options: string;
  main?: boolean;
};

const TIERS: Tier[] = [
  {
    step: "0",
    name: "ビジュアル更新",
    direction: "お客様が決める",
    desc: "いまの写真を、いまのお店に合わせて撮り直します。",
    price: "¥35,000",
    includes: "写真20点・簡易調整（色と明るさ）・自然光",
    directionDetail:
      "撮りたいものと使う場所をうかがって、そのとおりに撮ります。企画やスタイリングは入りません。だからこの価格です。",
    use: "Googleマップやウェブの写真が何年も前のまま、というとき",
    leadTime: "撮影 約1〜2時間・納期 5〜10営業日",
    options: "カルーセル ¥10,000／本・リール15秒 ¥30,000／本",
  },
  {
    step: "0.5",
    name: "プロフィール撮影",
    direction: "お客様が決める",
    desc: "お店ではなく、そこにいる人を撮ります。",
    price: "¥15,000〜",
    priceNote:
      "1名 ¥15,000（仕上げ2カット）。追加は1名ごと ¥5,000。スタッフ5名なら ¥35,000 です。",
    includes: "1名・仕上げ2カット（バストアップと全身）",
    directionDetail:
      "どなたを、どこで使うために撮るのかをうかがって、そのとおりに撮ります。白い壁か窓際をお借りして、その場でお撮りします。",
    use: "スタッフ紹介のページ、採用の募集要項、名刺に使う写真が要るとき",
    leadTime: "お一人あたり 約15〜20分・納期 5〜10営業日",
    options: "院内・店内の写真もまとめてなら 0 ビジュアル更新 ¥35,000",
  },
  {
    step: "1",
    name: "見せ方の設計",
    direction: "一緒に決める",
    desc: "何を見せるかを一緒に決めてから撮ります。",
    price: "¥50,000",
    includes: "撮影前の打ち合わせとイメージボード・写真15点（レタッチ込み）・カルーセル1本",
    directionDetail:
      "イメージボードをつくって共有します。撮る前に方向を合わせるので、当日の判断が減り、使える写真が増えます。カルーセルはお店の紹介か、推しの一品を、固定して長く使える形で。",
    use: "写真が古いのではなく、何を見せるかがそもそも決まっていないとき",
    leadTime: "撮影 約2〜3時間・納期 5〜10営業日",
    options: "リール15秒 ¥30,000・ヒーローカット ¥15,000／点",
  },
  {
    step: "2",
    name: "コンテンツ設計",
    direction: "調べたうえで決める",
    desc: "同業を調べ、何をつくるかを決めてから撮ります。",
    price: "¥80,000",
    includes: "同業・関連分野の調査・1の内容すべて・リール15秒1本",
    directionDetail:
      "同業がいま何を出していて、どれが伸びているかを見たうえで構成を出します。写真と動画を1日でまとめて撮るので、別々にご依頼いただくより安くなります。",
    use: "発信はしているけれど、何を出せば効くのか分からないとき",
    leadTime: "撮影 約3時間・納期 7〜10営業日",
    options: "リール30秒 ¥50,000・60秒 ¥90,000・カルーセル追加 ¥10,000／本",
    main: true,
  },
  {
    step: "3",
    name: "コンテンツ運用",
    direction: "続けながら合わせる",
    desc: "考える・つくる・見直すを、毎月まわします。",
    price: "¥65,000／月〜",
    priceNote:
      "ライト ¥65,000／月（写真8点・リール1本・カルーセル1本・投稿4本・毎月の打ち合わせ）。スタンダード ¥100,000／月（毎月こちらが方針を出し、反応を見て翌月を組み直します）。違いは量ではなく、関わり方です。",
    includes: "毎月の打ち合わせ・撮影・制作・前月の見直し",
    directionDetail:
      "出した結果を見て、翌月を調整します。続けるほど、何が効くかがはっきりしてきます。3ヶ月ごとに内容を一緒に見直し、増やすときは必ず先にご相談します。",
    use: "発信を止めずに続けたい・季節ごとに出すものがある",
    leadTime: "毎月、決めた日に納品",
    options: "SNS投稿代行 ¥20,000／月・ブランド・コンテンツ設計（下記）",
  },
];

/* ★ は段ではありません。0→1→2→3 は「どこまで一緒に決めるか」の段で、
   ストーリーはその上ではなく横にある特別枠。はじめてのご依頼が ★ のこともあります。 */
const SPECIAL = {
  name: "ストーリー",
  price: "¥150,000〜",
  lead: "店や商品ではなく、人と理由を伝える。",
  body: "インタビューから始めて、何を物語にするかの骨組みをつくります。密着とポートレート、エディトリアルなカルーセルとリールまで。",
  when: ["開業・新店舗", "改装・リニューアル", "ブランドの立て直し", "新商品・新サービス", "採用・PR", "代表や職人の話を出す"],
};

const DETAIL_FIELDS: { key: keyof Tier; label: string }[] = [
  { key: "directionDetail", label: "ディレクション（決め方）" },
  { key: "includes", label: "入っているもの" },
  { key: "priceNote", label: "料金" },
  { key: "use", label: "こんなときに" },
  { key: "leadTime", label: "納期" },
  { key: "options", label: "よく足されるもの" },
];

export default function ServiceList() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="svc-pl">
      <div className="svc-pl-sec">
        <div className="svc-pl-hd">
          <h3 className="svc-pl-t">段が上がるほど、こちらが持ち込むものが増えます</h3>
          <p className="svc-pl-oc">
            写真の枚数ではなく、撮る前にどこまで一緒に決めるかで選んでください
          </p>
        </div>
        <div className="svc-pl-rows">
          {TIERS.map((row) => {
            const isOpen = open === row.name;
            return (
              <div className="svc-pl-wrap" key={row.name}>
                <button
                  type="button"
                  className={`svc-pl-row svc-pl-tier${isOpen ? " open" : ""}`}
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : row.name)}
                >
                  <span className="svc-pl-step" aria-hidden="true">
                    {row.step}
                  </span>
                  <span className="svc-pl-n">
                    {row.name}
                    {row.main && <span className="svc-pl-main">おすすめ</span>}
                    <span className="svc-pl-dir">{row.direction}</span>
                  </span>
                  <span className="svc-pl-d">{row.desc}</span>
                  <span className="svc-pl-p">{row.price}</span>
                  <span className="svc-pl-chev" aria-hidden="true">
                    ›
                  </span>
                </button>
                <div className={`svc-pl-detail${isOpen ? " open" : ""}`}>
                  <dl className="svc-pl-detail-grid">
                    {DETAIL_FIELDS.filter((f) => row[f.key]).map((f) => (
                      <div className="svc-pl-d-item" key={f.label}>
                        <dt>{f.label}</dt>
                        <dd>{row[f.key]}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            );
          })}
        </div>
        <p className="svc-pl-note">
          おすすめは <strong>2 コンテンツ設計</strong> です。同業やいま伸びている投稿という外の材料を
          持ち込んで構成を決める、いちばん手前の段だからです。表示価格はすべて税込です。
          <br />
          <strong>初回のご相談は無料です。</strong>
          どの段が合うかを一緒に決めて、金額をお出しするところまで、費用はかかりません。
        </p>
      </div>

      <div className="svc-pl-sec">
        <div className="svc-pl-hd">
          <h3 className="svc-pl-t">特別枠　{SPECIAL.name}</h3>
          <p className="svc-pl-oc">段ではなく、横にある枠です</p>
        </div>
        <div className="svc-special">
          <div className="svc-special-l">
            <p className="svc-special-lead">{SPECIAL.lead}</p>
            <p className="svc-special-body">{SPECIAL.body}</p>
            <ul className="svc-special-when">
              {SPECIAL.when.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div className="svc-special-r">
            <span className="svc-special-p">{SPECIAL.price}</span>
            <span className="svc-special-n">税込・規模により別途お見積り</span>
          </div>
        </div>
        <p className="svc-pl-note">
          0→1→2→3 は「どこまで一緒に決めるか」の段です。ストーリーはその上ではなく、
          <strong>横にある特別枠</strong>。はじめてのご依頼がこちらのこともあります。
        </p>
      </div>

      <div className="svc-pl-sec">
        <div className="svc-pl-hd">
          <h3 className="svc-pl-t">組み合わせと、単品</h3>
          <p className="svc-pl-oc">上の段に足すこともできますし、これだけでもお受けします</p>
        </div>
        <div className="svc-pl-rows">
          {[
            { n: "カルーセル", d: "最大10枚。並び順、トリミング、1枚目の設計。今ある写真からでもつくれます。", p: "¥10,000／本" },
            { n: "リール 15秒", d: "撮影時間込み。3本パックは ¥75,000。", p: "¥30,000／本" },
            { n: "リール 30秒 ／ 60秒", d: "撮影時間込み。", p: "¥50,000 ／ ¥90,000" },
            { n: "ヒーローカット", d: "照明を組み、構図と背景まで設計する1枚。ポスターや看板に使えます。", p: "¥15,000／点" },
            { n: "料理・メニュー撮影", d: "1品あたり仕上げ2点。10品以上は ¥4,000／品。", p: "¥5,000／品" },
            { n: "出張・機材料", d: "標準の機材一式。撮影1件あたりの最低料金です。", p: "¥15,000" },
          ].map((r) => (
            <div className="svc-pl-wrap" key={r.n}>
              <div className="svc-pl-row svc-pl-flat">
                <span className="svc-pl-n">{r.n}</span>
                <span className="svc-pl-d">{r.d}</span>
                <span className="svc-pl-p">{r.p}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="svc-pl-note">
          「1枚だけ撮ってほしい」にもお答えできます。機材料 ¥15,000 ＋ ヒーローカット
          ¥15,000 で <strong>¥30,000</strong>。移動と準備の時間は枚数と関係なくかかるため、
          撮影1件あたり ¥15,000 を下限としています。
        </p>
      </div>
    </div>
  );
}
