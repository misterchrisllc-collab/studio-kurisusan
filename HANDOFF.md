# Studio くりすさん — Session Handoff

_Paste this into a new chat to resume. Durable facts also live in Claude auto-memory._

## TL;DR
**Studio くりすさん** (合同会社くりすさん) is a **creative studio where photography is the
foundation** — NOT a photography vendor. B2B site for Chris, Osaka. Live and deployed.
It is a **separate project** from the sibling **kansai-snaps** (Chris's B2C street-portrait
site). Do not confuse them.

- **Edit here:** `/Users/morethanplesent/yolo/studio-kurisusan/website`
- **Live:** https://studio-kurisusan.vercel.app
- **Repo:** GitHub `misterchrisllc-collab/studio-kurisusan`, branch `main`
- **Sibling (do NOT edit, read-only):** `/Users/morethanplesent/yolo/kansai-snaps`

## Tech stack
Next.js 14 (App Router) + TypeScript. Plain CSS design system in `app/globals.css`
(tokens: magenta `--mg:#E8198B`, black `--bk:#0A0A0A`, warm `--warm:#EEEBE6`,
off `--off:#F7F5F2`; fonts Noto Serif JP + Inter/Noto Sans JP). No Tailwind, no motion lib.
Supabase (contact storage) + Resend (contact email). Japanese-only copy; header has a
visual-only JP/EN/ES switcher (no real i18n yet).

Pages: `/` `/works` (portfolio+cases) `/services` `/gear` `/about` `/contact`.
Components: `Header`, `Footer`, `WorkGrid` (featured cases), `PortfolioGallery`,
`ServiceList`, `FAQ`, `PriceCalculator`, `ContactForm`.

## Ops runbook / gotchas
- **Deps live in kansai-snaps, not here:** this project has no `sharp` / `puppeteer-core`.
  Borrow by ABSOLUTE path from `kansai-snaps/node_modules` (e.g.
  `import sharp from ".../kansai-snaps/node_modules/sharp/dist/index.mjs"`). Read-only.
- **Shell cwd keeps resetting to `kansai-snaps`** — always use absolute paths / cd inline.
- **Deploy:** `cd website && source ~/.zshrc && npx --yes vercel@latest deploy --prod --yes --token "$VERCEL_TOKEN"`.
  (git push to `main` usually also deploys, but CLI is the reliable path.) Project is linked
  in `.vercel/project.json` (id `prj_JTBxTasUcH7h7wmAM6cHSml9PvDG`, team `team_7SzsNzSnY6qvwWeavqb4sGfE`).
  Studio project has NO ssoProtection issue (unlike kansai-snaps).
- **Tokens** in `~/.zshrc`: `$VERCEL_TOKEN`, `$SUPABASE_ACCESS_TOKEN`. `source ~/.zshrc` per command.
- **Supabase Management API** needs `/usr/bin/curl` (else Cloudflare 1010).
- **No em-dashes** in copy, any language (use 、 or 。). Exception left intact: the home
  ticker's decorative "—" separator (design element).
- **Self-review** with puppeteer-core (from kansai-snaps) + `/Applications/Google Chrome.app`,
  headless "new". Build check: `npm run build`.

## Email delivery (DONE, working)
- Resend domain **kansai-snaps.com is VERIFIED** (DKIM + SPF/MX added to Vercel-managed DNS).
  One shared account/domain serves both sites; can send to ANY recipient.
- Studio env on Vercel: `RESEND_API_KEY`, `EMAIL_FROM="STUDIO くりすさん <studio@kansai-snaps.com>"`,
  `CONTACT_RECIPIENT_EMAIL=studiokurisusan@gmail.com`.
- Contact form: `app/contact/actions.ts` sends email (reply-to = lead) AND stores to Supabase;
  succeeds if either path works. Resend account owner = **misterchris.llc@gmail.com**.
- (kansai-snaps B2C also fixed: `EMAIL_FROM="Kansai Snaps <hello@kansai-snaps.com>"`, recipient
  santino62@gmail.com — was silently failing before the domain was verified.)

## Supabase (DONE)
Dedicated project **studio-kurisusan**, ref `pnnkvcyhzaandwnpzzwq`, region ap-northeast-1,
`public.contacts` table (name/company/email/shoot_type/message/created_at). Keys wired to
Vercel env + local `.env.local` (gitignored). Extra form fields (phone/method/budget/timeline)
are composed into `message`.

## Brand positioning (DURABLE — apply to all future copy)
Creative studio, photography is the FOUNDATION. Core philosophy woven through Home/Services/
About: anyone can make images now (incl. AI), so what matters is whether visuals truly reflect
each business. **Not anti-AI** — AI is one modern tool, never the hero. Human conversation +
understanding + real photography build memorable brands. Tone: premium, calm, approachable,
natural Japanese, no buzzwords. Goal: visitor thinks "they understand branding, marketing,
photography, and modern tools," not just "they take good photos."

### Business model evolution (2026-07 — DURABLE)
We solve **business problems through visual communication**; we are a **creative partner that
helps businesses communicate who they are**, not a photography vendor. Photography stays the
core expertise; **AI is one tool, never the product**; **Google Business optimization is a
signature strength**; **long-term recurring partnerships > one-time projects**. Content is
organized around **six flagship business solutions** (not a service menu):
1. **開業・オープンブランディング** (Business Launch) — new opens / rebrands.
2. **ブランドリフレッシュ** (Brand Refresh) — modernize an existing visual identity.
3. **Googleビジネス強化** (Google Business Boost) — GBP imagery, ongoing updates, local visibility.
4. **採用ブランディング** (Recruitment Branding) — attract better hires via authentic visuals.
5. **月額コンテンツパートナー** (Monthly Content Partner) — **FLAGSHIP recurring**: monthly photo,
   short video, Google updates, SNS assets, promo, seasonal campaigns, ongoing creative support.
6. **季節・スポットキャンペーン** (Seasonal Campaigns) — limited-time promos, events, launches.
These are "business solutions built on photography." Reinforce everywhere: tech/AI helps us work
smarter; human creativity + strategy + conversation create memorable brands; photography is the
foundation; our value is helping businesses communicate who they are.

**HONESTY RULE (DURABLE):** NO fabricated case studies, testimonials, client names, metrics, or
business results anywhere. The site brand is "help you communicate who you are honestly" — faking
our own track record breaks it. Present work as **honest examples** (業種 / 課題 / 制作ビジュアル /
納品内容 + a "ねらい" intent block) until real client cases exist. Swap in a true case study ONLY
with client permission (real name + real numbers). Same rule the owner set on sibling kansai-snaps
(no fabricated reviews).

### Navigation naming decision (2026-07) — FINAL
Nav is now **Japanese, GEAR dropped**: **ホーム / 作品 / できること / 私たちについて / お問い合わせ**
(Header + Footer). Research-backed: premium JP creative/branding studios use clear, non-abstract,
positioning-carrying labels and drop vanity pages; the buyer is a JP local-business owner, so native
labels read warmer/clearer. Kept **作品** (not PROJECTS — accurate for honest work samples) and
**できること** (over サービス/ソリューション). `/gear` page still exists (in sitemap) but is unlinked
from nav. Decorative English page-eyebrows (`.pre` kickers: WORKS/ABOUT/etc.) intentionally KEPT as a
premium accent above JP headings. Earlier step (superseded): nav had been EN `SERVICES` → `WHAT WE DO`. Rationale: "Services/サービス" framed us
as a vendor with a menu; premium JP creative studios frame around solving business problems and
use short English nav + let the page carry positioning. `/services` **URL kept** (SEO/links). JP
page heading now leads with outcomes/partnership ("課題から始める、6つのビジネスソリューション").
Do NOT use "Solutions/ソリューション" as the nav label (corporate-SIer feel; owner flagged it) —
but ソリューション is fine in JP body copy for "business solutions."

## Photos
- Source originals in `photos/` (521MB, **gitignored**); optimized web copies in
  `public/photos/` + `public/photos/portfolio/` (29 curated shots, 1280px, committed).
- `photos/chris check/` = 27 culled near-dups/weak frames (holding folder, reversible).
- Categories: food (tonkatsu/tacos/burgers), product (candles/sriracha/natto/mayo),
  fashion/model, studio. **Gaps: no real corporate/team/office or construction photo.**
  The Services "Corporate" banner uses `on-location.jpg` (chef) as a stand-in.
- Contact sheet script pattern: sharp montage into scratchpad, then view.

## Page status
- **Home** (`app/page.tsx`): repositioned copy (hero/brand/why-chris/quote/ticker). Hero =
  tonkatsu staff; why-chris = Chris portrait. **Services teaser REPLACED (2026-07) with the six
  flagship solutions** (`SOLUTIONS` array + `.svc-flagship`/`.svc-flag-badge`/`.svc-lede` CSS);
  Monthly Content Partner is visually flagged おすすめ. **Honesty pass (2026-07):** the fabricated
  "実績・ケーススタディ" section is now **"こんな課題に、こう応えます。"** — 3 honest example cards
  (業種 / 課題 / 制作するビジュアル / 納品内容 + a **"ねらい"** intent block; NO invented clients,
  metrics, or quotes). The fake カフェオーナー testimonial is **removed** (quote replaced with our
  own motto "きれいな写真ではなく「あなたらしい」写真とブランドを。" attr STUDIO くりすさん). Hero
  **"SINCE 2009" label removed** (hard to read over photo + off-positioning). **Card 3 (2026-07):**
  emoji placeholder replaced with a real photo (`portfolio/tonkatsu-chef.jpg`) and re-themed
  corporate→**「人と現場」/「働く人の魅力を、そのまま伝える」** (honest: authentic person-at-work
  image, no office/team photo needed). **Solution #5 renamed 月額コンテンツパートナー →
  クリエイティブパートナー (Creative Partner)** = ongoing creative partnership, not a monthly photo
  plan (tag "月額契約"). No published price yet (don't invent one).
- **/works** (honesty pass 2026-07): retitled **"作品と、撮影事例。"** (was "実績・ケーススタディ");
  hero no longer claims "すべて実際の…プロジェクト/結果" — now "作例とこれまでの撮影… 実際のご依頼
  事例は許可をいただいたものから順に掲載". `WorkGrid` cards relabeled クライアント→業種, 結果→
  **ねらい**, titles/outcomes rewritten to remove fabricated results (`components/WorkGrid.tsx`).
  Featured examples (3, image-backed: restaurant/product/fashion, each 業種/課題/撮影内容/制作物/
  ねらい) + filterable masonry
  PORTFOLIO (12 preview + 「もっと作品を見る」 inline expand, lazy-load hidden, custom lightbox
  w/ prev/next+keyboard). `/work` 308-redirects to `/works`.
- **/services** (nav label now **WHAT WE DO**): reframed hero (WHAT WE DO / "課題から始める、6つの
  ビジネスソリューション" / partnership+AI-as-tool lede) → **six-solutions section** (`SOLUTIONS`
  array, reuses `.sp-flow-grid`, English sublabels via `.sp-sol-en`, おすすめ badge on Monthly) →
  a **flagship highlight** "クリエイティブパートナー契約に含まれるもの" (8 inclusions as `.sp-incl-grid`
  chips: Googleビジネス更新 / 毎月の撮影 / SNS / ポスター・チラシ / 季節キャンペーン企画 / ブランド相談 /
  AI活用×人のディレクション / 優先予約) → the old 9-item FLOW re-headed "各ソリューションを構成する、
  制作の要素" → 撮影に含まれるもの →
  pricing menu re-headed **"料金の目安（撮影メニュー）"** (`ServiceList` unchanged — still the 4
  medium-based categories; pricing is now framed as the building blocks of the solutions) → FAQ +
  calculator + CTA. **Not yet done:** map the detailed pricing rows onto the six solutions; set a
  real Monthly Content Partner price (currently shown as "月額プラン", no number — don't invent one).
- **/about**: philosophy-first + real portrait.
- **/contact**: studio block + embedded map + rich B2B form (email delivery live). Intro
  repositioned (2026-07): H1 "ビジネスについて、話しましょう。" + partnership copy (単発も継続
  パートナーも歓迎); POINTS mention 事業の課題からご相談.
- **/gear**: not touched this cycle.

## Launch QA pass (2026-07) — DONE
Senior-QA sweep of every page. **Critical: none.** **High (all fixed + live):**
- **Brand name standardized → "Studio くりすさん"** (titles, footer mark, email template,
  contact studio block). Legal/© stays 合同会社くりすさん. `lib/site.ts` holds SITE_URL/NAME/DESC.
- **Dynamic © year** (Footer `new Date().getFullYear()`).
- **SEO added:** `metadataBase` + Open Graph/Twitter defaults + OG image (hero.jpg) in
  `app/layout.tsx`; title template `%s｜Studio くりすさん`; per-page titles + `alternates.canonical`;
  **`app/robots.ts` + `app/sitemap.ts`** (6 routes). Verify + submit sitemap in Google Search Console.
- **Removed the non-functional EN/ES language toggle** (was cosmetic; i18n not built). JP-only for
  launch; multilingual ability still stated in copy. One-line revert in `Header.tsx` if wanted.
- **A11y:** keyboard access for price-calculator rows (`role=checkbox`) + gallery tiles
  (`role=button`) + global `:focus-visible` ring.
- **Mobile header:** hide redundant header CTA <620px (was wrapping); nav fits 5 items.
- Contact shoot-type list now includes クリエイティブパートナー.

**Brand-name convention (RESOLVED 2026-07):** three distinct names, used deliberately —
- **Public brand = `Studio くりすさん`** everywhere (titles, page copy, footer mark, logo alt, email).
- **Google Business / listing name = `フォトスタジオ くりすさん`** — ONLY the Contact studio block +
  map title (must match the actual GBP listing for local-SEO NAP). Don't "unify" these away.
- **Legal entity = `合同会社くりすさん`** — © footer and "代表".

**⚠️ One item still needing owner action (not a blocker):**
- **Vercel env `EMAIL_FROM`** still `"STUDIO くりすさん <studio@kansai-snaps.com>"` (caps STUDIO). For
  full consistency, update the display name to "Studio くりすさん" in Vercel env (code strings done).

**Remaining LOW (non-blocking):** custom 404 page; `next/font` migration; PWA manifest; verify the
Google Map embed renders on a real device (looked black only in headless due to lazy-load); minor
light-gray text contrast in a few spots. (Nav-labels decision is now RESOLVED — JP labels, GEAR
dropped; see Navigation naming decision above.)

## Open follow-ups / next candidates
1. ~~Carry positioning into home services teaser + contact intro~~ **DONE (2026-07)** — plus the
   six-solution restructure + `SERVICES`→`WHAT WE DO` nav rename + site metadata repositioned
   (layout title/desc no longer "商業フォトグラファー/商業撮影スタジオ"). **Next positioning gaps:**
   home **case studies** still lean photography-only; map pricing rows onto the six solutions; set
   a Monthly Content Partner price; consider dedicated solution detail pages or `/services#anchors`.
1b. **Mobile header overflow (pre-existing):** header nav is horizontal with no hamburger; at
   ≤960px the `.hr` lang switcher + `相談する` CTA run off-screen. Tightened nav gap/font so all 5
   nav items now fit at 390px, but a proper responsive header (hamburger or wrap) is still owed.
2. Real **corporate/team/office** + **construction** photos → swap the Services "Corporate"
   stand-in and consider a 4th case study.
3. Optional: verify a **studio-branded sending domain** (e.g. studio-kurisusan.com) so email
   `from` isn't kansai-snaps.com.
4. Real i18n (EN/ES) if/when needed — currently visual toggle only.
5. `/gear` page review; About right-column could later re-add trimmed credentials if desired.
