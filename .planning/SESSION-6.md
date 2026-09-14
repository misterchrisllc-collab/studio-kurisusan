# SESSION 6 — 2026-08-21 · the Creative Partner price was already built, and hours came off it

**Branch: `tweak/services-personal-brand`. Still unpromoted. Nothing deployed.**

## The finding that matters

The owner asked to "add the Creative Partner price to the website." **It was already there.**
`PARTNER_TIERS` in `app/services/page.tsx` has carried three priced tiers since an earlier session on
this branch, and they match master sheet line 09 月額クリエイティブ顧問 exactly:

| Tier | Site | Master sheet line 09 |
| --- | --- | --- |
| STEP 1 START 始める | ¥50,000／月 | ベーシック ¥50,000 |
| STEP 2 GROW 広げる (hi) | ¥100,000／月 | グロース ¥100,000 |
| STEP 3 PARTNER 一緒に | 要相談 | それ以上 個別見積り |

**`main` has none of it.** `git show main:app/services/page.tsx | grep PARTNER_TIERS` returns nothing,
and production (studiokurisusan.com/services) was fetched and still shows
「撮影を都度お願いするのではなく、ブランドの『伴走者』を持つ月額契約。」 with **no number** and only a
「パートナー契約を相談する」 CTA.

**So the remaining work was never authoring. It is deployment.** Anyone reading `HANDOFF.md` §11 item 1
("Set a Creative Partner price") would have rebuilt something that already existed.

## What actually changed this session

**Fixed hours were removed from the tiers.** Owner's instruction: *"lets not say how much time. food takes
longer right? some things are faster right? time is decided depending on the work."*

| Where | Was | Now |
| --- | --- | --- |
| `PARTNER_TIERS` START `items[0]` | 月1回の撮影（1時間） | 月1回の撮影 |
| `PARTNER_TIERS` GROW `items[0]` | 月1回の撮影（3時間） | 月1回の撮影 |

START and GROW now carry the same shoot line. That is intentional: GROW is differentiated by its four
extra items (リール2本, チラシ・POP, ブランド相談), not by a quoted duration.

**"Time varies" was added in three places**, so no surface commits to a duration:

1. `app/services/page.tsx` Creative Partner paragraph →
   「撮影にかける時間は、その月の作業内容によって変わります。」
2. `app/services/page.tsx` PRICING section intro →
   「撮影にかかる時間は作業内容によって変わりますので、以下はあくまで目安です。」
3. `components/ServiceList.tsx` `DETAIL_FIELDS` label →
   `撮影時間目安` became **`撮影時間目安（作業内容により変わります）`**

**The per-row hour ranges were deliberately KEPT** (食べ物 約2〜3時間, プロフィール 約1〜2時間,
ロケーション 半日〜1日). They already encode the owner's own point, since the longer numbers sit on the
slower work, and they let a client plan their day. The label now says outright that they move.
Removing them entirely was offered and not chosen.

`npx tsc --noEmit` passes. `npm run build` succeeds, 13/13 static pages.

## State of the tree

Uncommitted at session end, all of it SESSION-5 work plus the above:
`components/PriceCalculator.tsx`, `components/ServiceList.tsx`, `lib/site.ts`,
`app/services/page.tsx`, and untracked `.planning/SESSION-5.md`.

**Nothing was committed. Two PREVIEW deploys were run; production was NOT touched** (see the
2026-08-22 continuation below). A deploy of this branch ships more than the tiers: the reel repricing
(¥15,000 → ¥30,000), `priceRange` ¥30,000〜¥120,000, the construction per-visit pricing, and the
about/contact/footer edits.

## Still open

1. **Promote the branch.** Preview → owner reviews desktop + mobile → merge to `main` → `--prod`.
   Until then a prospect who reads a cold email sees ¥50,000〜/月 and then finds 月額契約 on the site.
2. **業務範囲 is still 未定 in the master.** The tier items exist only as website copy. There is no
   recorded answer to "what does ¥50,000/month buy" and that is the first question a reply will ask.
   Offered to the owner and not yet decided.
3. **Two names for one product.** Site says クリエイティブパートナー, master says 月額クリエイティブ顧問,
   and the filed immigration price list used the master's name.

## Docs updated this session

`HANDOFF.md` §3.5 and §11.1 · `REDESIGN-HANDOFF.md` §7 · `leads/pricing/HANDOFF.md` unfinished list ·
`leads/pricing/REVISIONS.md` new v9a entry.


---

# SESSION 6b — 2026-08-22 · full price reconciliation against the master, then a verified preview

**Still branch `tweak/services-personal-brand`. Still uncommitted. PRODUCTION NOT DEPLOYED.**

## What the owner asked for

A price-by-price audit of the whole site against `leads/pricing/master-pricing-sheet.html`, under
explicit rules: master wins on any mismatch; invent nothing; do not add master services that aren't
already on the site; do not remove site services that aren't in the master, just report them; don't
touch 業務範囲; don't deploy to production.

## The trap that nearly cost real money

An earlier pass of this audit recommended raising 料理・メニュー撮影 ¥50,000〜 → ¥60,000 and confirmed
店内・空間撮影 ¥50,000〜 as a match. **Both were wrong.** Those figures live only on master page 06,
which is headed **「正式な価格ではない」/ 作業ページ WORKING** — market research, not the price menu.

**Only two website services actually appear on the master's official pages.** Everything else is either
absent or research-stage. Always check *which page* a master figure sits on before treating it as a price.

## Applied (2 changes, both traced to official master pages)

| Service | Was | Now | Master source |
| --- | --- | --- | --- |
| Googleマップ更新パッケージ | ¥35,000〜 | **¥50,000〜** | page 01 item 08 店舗・Googleマップ・ウェブ更新 |
| スタジオ商品撮影 | ¥30,000〜 | **¥65,000** | page 01 item 01 EC・商品撮影 |

Mirrored in `PriceCalculator.tsx` (35000→50000, 30000→65000). Both carry a code comment naming the
master item. **⚠ The product one more than doubles** — flagged to the owner, who approved it.

## Deliberately NOT changed

- **7 website services have no master entry** and were left exactly as-is by owner's instruction:
  料理・メニュー撮影 ¥50,000〜 · 店内・空間撮影 ¥50,000〜 · フルブランドパッケージ ¥95,000〜 ·
  ライフスタイル商品撮影 ¥45,000〜 · スタッフ・採用写真 ¥45,000〜 · コーポレートブランディング ¥70,000〜 ·
  バイリンガルキャプション ¥8,000〜. Each was diffed against `main` and confirmed byte-identical before deploy.
- **パーソナルブランディング撮影 ¥35,000〜 stays held** (commented out in `ServiceList.tsx`; restore = delete
  the `/*` and `*/`). Not in the master.
- **業務範囲 for the retainer: untouched.**
- **Scope mismatch left open:** master 01 is 商品5点・標準写真15点・ヒーローセット1点; the site row still says
  10点〜. Price only was reconciled.

## Preview deploys

1. `studio-kurisusan-3kp5ggzub-...` — before the price corrections.
2. **`https://studio-kurisusan-4ylp8v7db-misterchrisllc-5316s-projects.vercel.app`** — current, verified:
   the 4 corrected prices present; ¥35,000〜 / ¥15,000〜 / ¥40,000〜 / パーソナルブランディング all return
   **zero**; all 7 unmatched services present at original prices. HTTP 200.

**Production still serves the OLD prices** (¥15,000〜 reels, 月額契約 with no number). Verified by fetching
studiokurisusan.com during the session.

## The owner has not answered the promotion question

He was asked whether to merge to `main` and run `--prod`. **No answer given.** Do not promote without it.
Two things he should weigh first, both from `leads/pricing/HANDOFF.md`: the branch's Japanese copy is
listed as **awaiting native-speaker review** (especially the long 建設 billing priceNote, the longest new
customer-facing Japanese on the site), and a prod deploy also ships the rewritten about/contact pages,
footer, form labels, and the `.vercel.app` → `studiokurisusan.com` fix in contact emails.

## Master sheet gained a page

`master-pricing-sheet` is now **8 pages**. New page 08 「ウェブサイト価格照合」 is a red-boxed audit record
(A–E) written for the owner to double-check, plus a red 追記 on the page 05 整合 row. See `REVISIONS.md`
v10. First attempt put the block at the bottom of page 05 and it was **silently clipped** by
`.page{height:297mm;overflow:hidden}` — the exact failure the pricing HANDOFF warns about. Caught only by
rendering the PDF and reading the pages back as images. **Always read the PDF back after editing.**
