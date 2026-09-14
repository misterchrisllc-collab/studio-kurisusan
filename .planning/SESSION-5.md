# SESSION 5 — 2026-08-18 · reel pricing brought in line with the master price sheet

**Branch: `tweak/services-personal-brand`. Still unpromoted. Nothing deployed.**

## What changed and why

The master internal price sheet set Studio video pricing on 2026-08-18: **priced by finished length
with shooting time bundled**, ¥30,000 / ¥50,000 / ¥90,000 for 〜15秒 / 〜30秒 / 〜60秒. The site was
still advertising **reels from ¥15,000**, which undercut the sheet by half on the first number a
client sees.

| File | Was | Now |
| --- | --- | --- |
| `components/ServiceList.tsx` リール・ショート動画 | `price: "¥15,000〜"` | `price: "¥30,000〜"` |
| " `delivery` | 15〜60秒 縦型動画 1本〜 | 〜15秒 ¥30,000 / 〜30秒 ¥50,000 / 〜60秒 ¥90,000 |
| " `shootTime` | 約1〜2時間 | 撮影時間込み（1時間 / 2時間 / 半日） |
| " `options` | 複数本まとめ・字幕・BGM選定 | パック 15秒×3 ¥75,000・30秒×2 ¥90,000・字幕・BGM選定 |
| " `desc` | 1本から。 | 仕上がりの尺で選べる3プラン。 |
| `components/PriceCalculator.tsx` リール動画 | `price: 15000, note: "1本あたり", hours: 1.5` | `price: 30000, note: "〜15秒 1本", hours: 1` |

`tsc --noEmit` passes.

## priceRange, decided 2026-08-18

**`lib/site.ts:23` is now `priceRange: "¥30,000〜¥120,000"`.** Owner's decision, taken after being
shown what each end is backed by. Floor is the cheapest **shoot** the site sells (スタジオ商品撮影 and
リール, ¥30,000〜); ceiling is package 03 STORY / LOCATION full day on the master sheet. He chose the
shoot floor over the site's true cheapest line, バイリンガルキャプション ¥8,000〜, as a recorded
tradeoff. That row's own copy (`shootTime: 撮影とセットで対応`) says it is not sold on its own, so
¥30,000 is the cheapest thing a client can actually buy. `tsc --noEmit` passes. Logged as v7c in
`leads/pricing/REVISIONS.md`.

## One thing deliberately NOT changed

1. **`_reference/studio-kurisusan.html`.** Still carries the old ¥15,000 reel figures in three
   places. It is a standalone reference file, not imported and not routed, so it is not live.

## Construction, decided 2026-08-18

**¥40,000〜 is removed.** Owner set the service as **priced per visit**: 標準 ¥50,000〜, 規模の大きい
現場・複雑な現場 ¥70,000〜, 本格的な記録 ¥100,000〜. 施工前・施工中・施工後 are separate visits, each
billed separately, so three stages start at ¥150,000. **He instructed that no bundled three visit
package be created unless he approves one.** None was.

`Row` gained an optional `priceNote` (rendered first in the detail panel as 料金); `DETAIL_FIELDS` is
filtered so other rows are untouched. `price` is `¥50,000〜／1回` and `desc` carries the separate
billing, because `.svc-pl-p` is `white-space:nowrap` and a client who never expands the row still has
to see the shape. `tsc --noEmit` passes, `npm run build` succeeds. Sheet: page 01 package 10.

## Still open from before, unchanged by this session

- The branch is **gated on a native-speaker Japanese copy check**. This edit does not lift that, and
  **the construction row added new Japanese copy, so the gate now covers more than it did.**
