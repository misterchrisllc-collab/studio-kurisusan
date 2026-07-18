# Studio くりすさん — SESSION-2

_Numbered session handoff (continues SESSION-1). Date: 2026-07-19._
_Read this first, then the detailed source-of-truth docs: **`REDESIGN-HANDOFF.md`** (design system, image pipeline, deploy mechanics) and **`HANDOFF.md`** (durable infra/SEO facts). Note: HANDOFF §5 "home" is superseded by REDESIGN-HANDOFF; and this session's copy voice supersedes older copy notes — see "Voice" below._

---

## 0. Where we are

- **Live on production (studiokurisusan.com):** Homepage + **Works** page are fully redesigned, business-tool voice, shipped.
- **Custom domain is LIVE:** **studiokurisusan.com** (bought via Vercel, connected this session). apex is primary; **www 308-redirects to apex**; SSL auto-provisioned. `SITE_URL` now points here so all canonicals/sitemap/OG/JSON-LD reference the brand domain.
- **Services page (`/services`) is REBUILT but NOT on prod yet** — it lives on branch **`redesign/services`** and a **preview URL** (below). Awaiting owner sign-off + one open layout decision.
- Direction is settled (from SESSION-1): **bold, image-led, magazine-editorial visuals + a warm, human, business-tool voice.** Gothic (Noto Sans JP 900) display, Inter eyebrows, `--gut` gutter, magenta (#E8198B) as a seal never a fill.

**Latest Services preview:** https://studio-kurisusan-1q9q78lvv-misterchrisllc-5316s-projects.vercel.app/services
(preview URLs are per-deploy; if dead, redeploy — see §5.)

---

## 1. What this session did

1. **Works page (`/works`) — full redesign → SHIPPED to prod.**
   - Replaced the CSS-masonry gallery with a **designed 12-col grid**. New `components/PortfolioImage.tsx` + a **crop pipeline**: `scripts/build-crop-manifest.mjs` → `lib/crops.generated.json`. Ratio vocabulary: `banner`(2.6) / `wide`(16:9) / `landscape`(3:2) / `square`(1:1) / `portrait`(4:5) / `tall`(2:3). Each tile declares a **span** (layout) + **ratio** (crop contract), independent. Drop `{base}_{ratio}.jpg` into `public/photos/portfolio/`, rerun the manifest script, and it serves automatically — no code edit.
   - **First real crop:** `kominka-exterior-night_banner.jpg` (2.6:1, building-focused) is the gallery hero, cropped to kill dead sky/ground.
   - Removed a duplicate (kominka-dining-night was the same venue as the hero).
   - **Header (global, all pages):** `--hh` height token; logo 24→40px; nav is now **Home / Works / Service / About** (English) bigger + darker; Instagram icon; antscr-style **Contact** button (divider + arrow). Logo AND Home both → `/`.
   - **Footer contrast** lifted (was near-invisible on black).
   - Copy: `作品と、撮影事例` → gothic **WORKS**; hero lead 「ビジュアルが変わると、仕事も変わる。」; portfolio heading `作品集` → **WORKS**; new **PHILOSOPHY** closing band 「写真や動画ではなく、仕事の武器を。」; case-study copy rewritten to business outcomes. All `世界観`/`魅力` removed.

2. **Homepage — voice alignment → SHIPPED to prod.** Fixed 4 drift lines to match the Works voice, **kept the ようこそ/おかえり spine** (owner's call): hero eyebrow `商業写真…` → 「店舗・企業のビジュアルブランディング」; FOOD → 「「食べたい」は、一皿から。」; PRODUCT → 「選ばれる理由を、まっすぐ。」; CLOSE 「何を撮るか…」 → 「何から始めればいいか…」.

3. **Custom domain → SHIPPED.** Connected studiokurisusan.com; www→apex 308; `lib/site.ts` `SITE_URL` = `https://studiokurisusan.com`.

4. **Services page (`/services`) — full rebuild → PREVIEW ONLY (branch `redesign/services`).** Rebuilt around **how a client decides to hire — by business type/problem, not a photo menu.** See §3.

5. **Memory:** saved the tone direction to the `studio-kurisusan-voice` auto-memory (banned photographer language). See "Voice" below.

---

## 2. Voice (current — supersedes older copy notes)

Business-tool, not photographer. **Photography/video are the MEANS, not the message.** We help businesses communicate who they are and get **found, understood, trusted, chosen** by the people who need them.
- **BANNED:** 世界観, 魅力, "beautiful photos", "capturing moments", commercial-photography framing, 作品集/gallery language, agency buzzwords, em-dashes (—).
- **Prefer:** 仕事の武器/道具, 選ばれる理由, 必要としている人に届く/出会える, 見つけてもらう.
- Section labels in **English** (WORKS, HOW WE HELP), not 作品集.
- Homepage keeps its warm ようこそ/おかえり layer on top of this — that's intentional, don't strip it.

---

## 3. Services rebuild — structure (on `redesign/services`)

`app/services/page.tsx` + `components/ServiceCategories.tsx` (new) + `components/ServiceList.tsx` (rewritten) + `components/FAQ.tsx` / `PriceCalculator.tsx` (kept, headings upgraded to gothic). CSS in `app/globals.css` under **"SERVICES (rebuild 2026)"**.

1. **Split hero** — gothic 「写真や動画ではなく、仕事の武器を。」 (仕事の武器 magenta) on white, large image right (BIG UP storefront).
2. **HOW WE HELP** — 6 business categories, each = client PROBLEM headline over a big editorial image: Restaurants / Spaces & Architecture / Products & EC / Retail & Apparel / Corporate & Recruitment / Events & PR. Compact "also work with" line = 宿・旅館、美容・サロン、観光・インバウンド (hybrid: only categories we can back with real imagery get a block).
3. **Pricing** — clean, comparable (`ServiceList`: images dropped, gothic group headers, aligned expandable rows).
4. **Creative Partner** — flagship monthly retainer as a dark おすすめ band.
5. **What's Included** — ONE merged strip (killed the old duplicate lists + the redundant 9-item components section).
6. **Process** — 4 steps: お問い合わせ → 企画 → 撮影 → 納品.
7. **FAQ** + **かんたん見積もり** calculator.
8. **CTA.**

**Category photos (swapped this session for variety vs Works):** hero=tacos-shop, Restaurants=burger-cross, Spaces=kominka-chair, Products=mayo-bottle, Retail=model-natural, Corporate=**on-location** (only image not used elsewhere on the site), Events=tacos-event-night. Note `ServiceCategories` `img` now resolves under `/photos/` (not `/photos/portfolio/`) so `on-location.jpg` works.

### ⚠ OPEN DECISION (the reason it's not shipped)
Owner felt Services looked **too similar to Works** — mostly because the earlier picks reused Works/homepage hero frames (now fixed with distinct photos above). The remaining question: **do they also want the category LAYOUT differentiated** from Works' alternating image+text? Options offered:
- (a) leave it (new photos may be enough), or
- (b) full-bleed image bands with the headline set **over** the image, or
- (c) a 2-column category card grid.
Owner is reviewing the new-photos preview first. **Get their answer, then ship.** Reality to remember: Works displays the ENTIRE portfolio (all 51 photos), so some overlap with any other page is unavoidable — differentiation comes from *frame choice* + *layout*, not exclusive images.

---

## 4. Git state

- Branch **`main`** = `abe7eb4` (pushed to origin) — Works + Homepage + domain, all on prod.
- Branch **`redesign/services`** (current, `4ac4f19`) — 2 commits ahead of main, **NOT merged, NOT on prod.**
- To ship Services: on `main`, `git merge redesign/services`, push, `vercel deploy --prod` (see §5), verify on studiokurisusan.com.
- **Stale merged branches to delete when convenient:** `redesign/works`, `copy/hp-voice`, `redesign/homepage-impact`, `redesign/homepage-editorial`. (`redesign/services` is the only live one.)

---

## 5. Deploy & self-review mechanics (unchanged from SESSION-1, reinforced)

- Deps (sharp, puppeteer-core) live in **kansai-snaps**, borrowed by absolute path: `createRequire("/Users/morethanplesent/yolo/kansai-snaps/package.json")("sharp"|"puppeteer-core")`. Headless Chrome at `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`, `headless:"new"`.
- **Local review:** `PORT=3200 npx next start` after `npm run build`, then puppeteer screenshots scrolled into view.
- **Preview deploy:** `source ~/.zshrc && npx --yes vercel@latest deploy --yes --token "$VERCEL_TOKEN"`. **Prod:** add `--prod` after merging to main.
- **The sandbox network is FLAKY.** Use `dangerouslyDisableSandbox: true`. The CLI often prints `Error: fetch failed` **but still creates the deployment** — grab the URL from the log, then confirm with `npx vercel ls` (look for ● Ready) and verify content with **`/usr/bin/curl --retry`** (not Anaconda curl). Vercel project `studio-kurisusan`, team `team_7SzsNzSnY6qvwWeavqb4sGfE`. No ssoProtection issue on this project.
- Commit style: end with `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.

---

## 6. Gotchas learned this session

- **`next/image` `quality` MUST be one of `next.config.mjs` `qualities:[75,82,90]`.** `quality={85}` silently fails → blank image. This cost a debug cycle on the Services hero. Use 82.
- **Headless screenshots show below-fold `next/image` as BLANK** (lazy-load race) — not a real bug. Verify by requesting the `/_next/image?...&q=82` URL (expect `200 image/jpeg`) or scroll+settle before shooting.
- **CJK wrapping:** `max-width` in `ch` under-sizes CJK (ch is Latin-based); big gothic headlines wrap mid-word. Fix by sizing font to the container or dropping `max-width` and relying on explicit `<br>`.
- Shell cwd keeps resetting to `kansai-snaps` — use absolute paths / `cd` inline.
- Kansai Snaps bridge on the homepage is **locked** — don't restyle.

---

## 7. Next job

1. **Ship Services** once the owner answers the layout question (§3) — merge → prod → verify on studiokurisusan.com.
2. **About page (`/about`)** and **Contact (`/contact`)** are the last inner pages still on the old thin-serif system — bring them up to the gothic/business-tool system (Contact: make the form the hero).
3. Delete stale merged branches (§4).
4. Whole-site follow-ups still open (from HANDOFF §11): Creative Partner price, real corporate/team photos, GBP NAP/hours verification + **submit sitemap to Search Console for the new domain**, `EMAIL_FROM` caps fix. Google Search Console: add `studiokurisusan.com` as a property + submit `sitemap.xml`.

---

## 8. Key files

- `app/services/page.tsx` — Services structure (hero, pricing, partner, included, process, CTA).
- `components/ServiceCategories.tsx` — the 6 business-type blocks (problem copy + images).
- `components/ServiceList.tsx` — pricing menu (clean/comparable).
- `components/PortfolioImage.tsx` + `scripts/build-crop-manifest.mjs` + `lib/crops.generated.json` — Works crop pipeline.
- `components/Header.tsx` / `components/Footer.tsx` — global nav/footer.
- `lib/site.ts` — `SITE_URL` + SEO/JSON-LD single source of truth.
- `app/globals.css` — design system; blocks: HEADER, HOME, WORKS/portfolio, **SERVICES (rebuild 2026)**, ABOUT.
- `app/page.tsx` — homepage (ようこそ spine kept).
- Auto-memories: `studio-kurisusan-voice` (voice + banned words), `studio-kurisusan-project`, `editorial-implementation-fidelity`, `studio-problem-first-positioning`.
