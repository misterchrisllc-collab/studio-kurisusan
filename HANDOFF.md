# Studio くりすさん — Session Handoff

_Paste this into a new chat to resume with full context. Durable facts also live in Claude auto-memory. Last consolidated: 2026-07._

---

## 1. TL;DR — what this is

**Studio くりすさん** is a **creative business partner that solves communication & marketing problems for small businesses** in Osaka (run by Chris). It is **NOT a photography company.** Photography is one of our strongest tools, but rarely the reason a client hires us. Live, deployed, launch-ready.

- **Edit here:** `/Users/morethanplesent/yolo/studio-kurisusan/website`
- **Live:** https://studio-kurisusan.vercel.app
- **Repo:** GitHub `misterchrisllc-collab/studio-kurisusan`, branch `main`
- **Sibling project (do NOT edit — read-only):** `/Users/morethanplesent/yolo/kansai-snaps` (Chris's separate B2C tourist/street-portrait site). Do not confuse the two.

---

## 2. DURABLE RULES — apply to everything, challenge any drift

**PROBLEM-FIRST (most important).** Studio sells **business outcomes**, not photography. Video, AI, design, Google Business, social, websites, flyers, branding, and photography are all just **tools**. Challenge every page/section with **"what business problem is this solving?"** Lead with the customer's pain point or desired outcome, never with 写真/撮影/photography. Every solution **begins with a problem and ends with an outcome** (e.g. 店舗撮影 → 「飲食店の集客・来店を増やす」). Think like a **strategist / creative director / consultant** — not a photographer or web designer. If work drifts back toward selling "photos," challenge it and propose a stronger alternative.

**HONESTY.** NO fabricated case studies, testimonials, client names, metrics, or business results anywhere. Present work as honest examples (業種 / 課題 / 制作するビジュアル / 納品内容 + a **「ねらい」** intent block). Add a real case study ONLY with client permission (real name + real numbers).

**TONE.** Premium, calm, approachable, natural Japanese, no buzzwords. **No em-dashes** in copy (use 、 or 。). Sole exception: the home ticker's decorative "—" separator (a design element).

**AI stance.** Not anti-AI — AI is one modern tool used to work smarter, never the hero. Human conversation, strategy, and understanding are what create memorable brands.

---

## 3. The seven flagship solutions (the spine of the offer)

Presented as business solutions, not a service menu. Live on the home teaser + `/services` grid.

1. **開業・オープンブランディング** (Business Launch) — new opens / rebrands.
2. **ブランドリフレッシュ** (Brand Refresh) — modernize an existing visual identity.
3. **Googleビジネス強化** (Google Business Boost) — GBP imagery, ongoing updates, local visibility. (Google Business optimization is a signature strength.)
4. **採用ブランディング** (Recruitment Branding) — attract better hires via authentic visuals.
5. **クリエイティブパートナー** (Creative Partner) — **FLAGSHIP recurring** (おすすめ badge). Monthly photo/video, Google updates, SNS, promo, seasonal, brand consult, AI×human direction, priority booking. `/services` has a "含まれるもの" chip list. **No published price yet** (shown as "月額契約" — don't invent a number).
6. **イベント・PR撮影** (Event Marketing Content) — restaurants / pop-ups / launches / company & community events / activations. Positioned as **Event Marketing Content, NOT event photography**: reusable post-event assets (SNS / Google / press / website), bilingual, fast turnaround. Home has a matching outcome-framed case study (taco pop-up, `portfolio/tacos-shop.jpg`).
7. **季節・スポットキャンペーン** (Seasonal Campaigns) — limited-time promos, events, launches.

**Recurring partnerships > one-time projects.** Long-term relationships (esp. #5) are the goal.

---

## 4. Naming conventions (three deliberate names — don't unify them)

- **Public brand = `Studio くりすさん`** — everywhere (page titles, copy, footer mark, logo alt, email template).
- **Google Business / listing name = `フォトスタジオ くりすさん`** — ONLY on the Contact studio block + map title. Must match the actual GBP listing for local-SEO NAP. Do NOT change these to "Studio くりすさん."
- **Legal entity = `合同会社くりすさん`** — © footer and "代表."

**Navigation (FINAL): Japanese labels, GEAR dropped** — `ホーム / 作品 / できること / 私たちについて / お問い合わせ` (Header + Footer). Research-backed (premium JP creative studios use clear native labels, drop vanity pages; buyer is a JP local-business owner). Kept **作品** (not "PROJECTS" — accurate for honest work samples) and **できること** (avoid サービス/ソリューション as the nav label). Decorative English page-eyebrows (`.pre` kickers like STUDIO/CONTACT above JP headings) are intentionally kept as a premium accent.

---

## 5. Site structure & current page state

Routes: `/` · `/works` · `/services` · `/about` · `/contact` · `/gear` (title 制作環境, unlinked from nav). `/work` 308-redirects to `/works`.
Components: `Header`, `Footer`, `WorkGrid`, `PortfolioGallery`, `ServiceList`, `FAQ`, `PriceCalculator`, `ContactForm`.

- **`/` Home** (`app/page.tsx`): Hero leads with the outcome — **「お店やブランドが、もっと選ばれる理由をつくる。」** (sub lists real problems: 集客・SNS・Googleマップ・採用・ブランディング; photography = one tool). Then brand statement → why-Chris ("ブランドづくりの相談相手であり、つくり手でもある") → 7-solution teaser (`SOLUTIONS` array; #5 おすすめ badge via `.svc-flagship`/`.svc-flag-badge`) → **「こんな課題に、こう応えます。」** honest case studies (4 cards incl. taco pop-up event) → approach (制作プロセス) → quote (our own motto, not a fake testimonial) → CTA.
- **`/works`**: retitled **「作品と、撮影事例。」** Honest — no "all real client projects/results" claim. `WorkGrid` = 3 example cards (業種 / 課題 / 撮影内容 / 制作物 / ねらい). Then `PortfolioGallery` (filterable masonry, 12-preview + 「もっと作品を見る」 expand, custom keyboard-accessible lightbox).
- **`/services`** (nav "できること"): hero **「課題から始める、7つのビジネスソリューション。」** → 7-solution grid (`SOLUTIONS`, English sublabels via `.sp-sol-en`, おすすめ on #5) → Creative Partner "含まれるもの" chip highlight → **「各ソリューションを構成する、制作の要素」** (how-we-work; has a subtle `.sp-flow-more` link to 制作環境) → 撮影に含まれるもの → **「料金の目安（撮影メニュー）」** (`ServiceList`, 4 outcome-led categories: 飲食店の集客・来店を増やす / ECの売上とブランド価値を上げる / 採用力と企業ブランドを高める / SNS・発信を続けやすくする) → `FAQ` → `PriceCalculator` → CTA.
- **`/about`**: philosophy-first, real portrait. Opener is on-message: 「私の仕事は、写真を届けることではありません。そのお店やブランドが『自分たちらしく伝わること』です。」 A subtle `.ab-note` line above the contact block links to 制作環境.
- **`/contact`**: intro 「ビジネスについて、話しましょう。」 + partnership copy. Rich B2B form (`ContactForm`) → DB + email (both paths; succeeds if either works). Studio block uses the **listing name フォトスタジオ くりすさん** + embedded Google Map.
- **`/gear` = 制作環境** (Production Environment): reframed from an equipment list into a **client-benefit** page (reliable, consistent quality anywhere — 4 benefit points, `.gr-benefits` reusing `.sp-flow-*`). Equipment kept as a secondary accessible **`<details>`** expandable ("機材・技術仕様を見る"). Unlinked from nav but discoverable via the About + services contextual links.

---

## 6. Tech stack

Next.js **14** (App Router) + TypeScript. **Plain CSS** design system in `app/globals.css` — no Tailwind, no motion lib. Tokens: magenta `--mg:#E8198B`, black `--bk:#0A0A0A`, warm `--warm:#EEEBE6`, off `--off:#F7F5F2`. Fonts: Noto Serif JP (headings) + Inter / Noto Sans JP. Japanese-only site (no real i18n; the old cosmetic EN/ES toggle was removed). `lib/site.ts` centralizes `SITE_URL` / `SITE_NAME` / `SITE_DESCRIPTION`.

---

## 7. Ops runbook / gotchas

- **Deps live in kansai-snaps, not here.** This project has no `sharp` / `puppeteer-core`. Borrow by ABSOLUTE path from `kansai-snaps/node_modules` (e.g. `import puppeteer from "/Users/morethanplesent/yolo/kansai-snaps/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js"`). Read-only; never edit kansai-snaps.
- **Shell cwd keeps resetting to `kansai-snaps`** — always use absolute paths or `cd` inline within the command.
- **Build check:** `npm run build`.
- **Deploy:** `cd /Users/morethanplesent/yolo/studio-kurisusan/website && source ~/.zshrc && npx --yes vercel@latest deploy --prod --yes --token "$VERCEL_TOKEN"`. (Pushing to `main` also auto-deploys via the GitHub link, but the CLI is the reliable path.) Vercel project id `prj_JTBxTasUcH7h7wmAM6cHSml9PvDG`, team `team_7SzsNzSnY6qvwWeavqb4sGfE`. **No ssoProtection issue** on this project (unlike kansai-snaps).
- **Tokens** in `~/.zshrc`: `$VERCEL_TOKEN`, `$SUPABASE_ACCESS_TOKEN` — `source ~/.zshrc` per command.
- **Supabase Management API** needs `/usr/bin/curl` (Anaconda curl → Cloudflare 1010).
- **Visual self-review:** headless puppeteer-core (borrowed) + `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`, headless `"new"`; screenshot into scratchpad and view. Note: Google Map embeds and lazy images can look blank in headless full-page shots — not a real bug.
- Commit style: end messages with `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.

---

## 8. Infra — Supabase + email (both DONE, working)

**Supabase** — dedicated project **studio-kurisusan**, ref `pnnkvcyhzaandwnpzzwq`, region ap-northeast-1. Table `public.contacts` (name / company / email / shoot_type / message / created_at). Keys wired to Vercel env + local `.env.local` (gitignored). Extra form fields (phone / method / budget / timeline) are composed into `message`.

**Email (Resend)** — domain **kansai-snaps.com is VERIFIED** (one shared account/domain serves both sites; can send to any recipient). Resend account owner = `misterchris.llc@gmail.com`. Studio Vercel env: `RESEND_API_KEY`, `EMAIL_FROM="STUDIO くりすさん <studio@kansai-snaps.com>"`, `CONTACT_RECIPIENT_EMAIL=studiokurisusan@gmail.com`. `app/contact/actions.ts` sends email (reply-to = lead) AND stores to Supabase; succeeds if either path works.
⚠️ **Owner action:** update the `EMAIL_FROM` display name in Vercel env from caps `STUDIO くりすさん` → `Studio くりすさん` (code strings already fixed).

---

## 9. SEO (DONE)

`metadataBase` + Open Graph / Twitter defaults + OG image (`hero.jpg`) in `app/layout.tsx`; title template `%s｜Studio くりすさん`; per-page titles + `alternates.canonical`; **`app/robots.ts`** + **`app/sitemap.ts`** (6 routes). `<html lang="ja">`. **To do:** submit the sitemap in Google Search Console; consider adding **LocalBusiness JSON-LD** (name = フォトスタジオ くりすさん + address/phone/hours) to strengthen the Google Business signal.

---

## 10. Photos

- Source originals in `photos/` (~521MB, **gitignored**); optimized web copies committed in `public/photos/` + `public/photos/portfolio/` (~29 curated shots at 1280px).
- `photos/chris check/` = culled near-dups (reversible holding folder).
- Categories present: food (tonkatsu / tacos / burgers), product (candles / sriracha / natto / mayo), fashion/model, studio.
- **Gaps:** no real corporate/team/office photo (the "people/work" home card 3 uses `portfolio/tonkatsu-chef.jpg` as an authentic person-at-work stand-in); no construction photo; no dedicated crowd/activation event set (the event case reuses the taco-venue night shot).

---

## 11. Open follow-ups / next candidates

1. **Set a Creative Partner (#5) price** (currently "月額契約" with no number).
2. **Map the `ServiceList` pricing rows onto the 7 solutions** (or build dedicated solution detail pages / `/services#anchors`).
3. **Real corporate/team/office + construction photos** → strengthen card 3 / add subjects; **fuller taco pop-up crowd/activation photos** → strengthen the event case (currently a venue exterior).
4. **LocalBusiness JSON-LD** for Google Business / local SEO (offered, not yet built).
5. Optional: studio-branded sending domain (e.g. studio-kurisusan.com) so email `from` isn't kansai-snaps.com; real EN/ES i18n if needed (toggle was removed).
6. LOW polish: custom 404 page; `next/font` migration; PWA manifest; a few light-gray contrast spots.
7. Owner action: fix `EMAIL_FROM` caps in Vercel env (see §8).

---

## 12. Recent arc (context for why things are the way they are)

Over recent sessions the site evolved: photography-vendor → creative partner → **problem-first (sells outcomes, not photos)**. Added the **7-solution model**, ran an **honesty pass** (removed all fabricated case studies/testimonials on home + `/works`), a **launch-QA pass** (brand-name standardization, dynamic year, SEO, a11y, mobile header, removed dead language toggle), added the **Event Marketing Content** solution + taco-pop-up case study, applied the **problem-first reframe** across every page, and transformed `/gear` into **制作環境** (benefit-first, equipment expandable) with subtle contextual links. Everything is live and committed on `main`.
