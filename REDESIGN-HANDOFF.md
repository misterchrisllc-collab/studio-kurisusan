# Studio くりすさん — Homepage Redesign Handoff

_New tab? Read this first, then `HANDOFF.md` (durable project + infra facts; note its §5 "home" description is now superseded by this doc). Last updated 2026-07-17._

---

## 0. STATUS

- The **homepage is fully redesigned and LIVE on production**: https://studio-kurisusan.vercel.app
- Direction: **bold, image-led, editorial — but with a warm, human voice.** Reads like a premium magazine, not an agency template or a photo portfolio.
- Everything below (visual system, voice, image pipeline) is the **template the other pages should now inherit** (Services → Works → About → Contact). The homepage is done; the next job is bringing the rest of the site up to this bar.
- Work happened on branch `redesign/homepage-impact` (merged to `main`). `main` auto-deploys, but the Vercel CLI is the reliable path (see §6).

---

## 1. The arc (why the homepage looks like it does)

Over one long session the homepage went through several deliberate pivots — each was owner-approved on a Vercel **preview** before promoting:

1. **Editorial concept** (quiet, thin serif, photography in negative space) — elegant but too quiet; "student portfolio" when built.
2. **Bold gothic "impact"** — owner picked this register after studying agency sites (stans / roaster / nssg / dac / antscr). Full-bleed photography + heavy gothic type.
3. **Warm voice pivot** — kept the bold visuals, made the WORDS quiet and human (see §2).
4. **Magazine visual storytelling** — atmosphere & people first, varied editorial compositions.
5. **Premium image pipeline** — high-res masters + `next/image` (see §4).

**Do not restart the direction.** It is settled. Refine within it.

---

## 2. The design system (apply to every page)

### Voice (the most important thing — see also the `studio-kurisusan-voice` auto-memory)
- **Warm, restrained, confident. A creative partner, not an ad agency.** The site respects small-business owners.
- **Core idea:** visuals are the **first employee a customer meets**. Before anyone says いらっしゃいませ, the website / Google Business / Instagram / storefront has already spoken. Good visuals make people feel **welcome** and communicate trust, care, identity.
- **We reveal, we don't invent.** Every business has its own personality; our job is to bring it out.
- **Philosophy line:** 時代は変わっていく。人がお店を見つける方法も、選ぶ理由も。だからこそ、ビジュアルは「ようこそ」と「おかえり」を伝える。
- **BANNED agency words:** Impact / creative solutions / "stand out" / "elevate your business" / "next-level". Also **no em-dashes** (use 、。 or nakaguro ・). Nakaguro ・ is used as the eyebrow separator.
- **Sibling brands:** Kansai Snaps = "the best version of **you**" (individuals). Studio くりすさん = "the best version of **your business**." Connected, distinct.

### Visual language (tokens live in `app/globals.css` `:root`)
- Accent (magenta seal, one per screen): `--mg:#E8198B`. Ink `--bk:#0A0A0A`. Grounds `--off #F7F5F2`, `--warm #EEEBE6`, white.
- **Display type = Noto Sans JP weight 900** (heavy gothic) for headlines; **Inter** for uppercase eyebrows/labels; Noto Sans JP 400/700 for body. (Noto Serif JP is now used ONLY by the Kansai Snaps bridge + inner pages that haven't been redesigned yet.) Weights are loaded in `app/layout.tsx` (Noto Sans JP up to 900, Inter up to 800).
- **One consistent gutter:** `--gut: clamp(24px,5vw,80px)`. **Everything aligns to it** — section padding, grids, overlay captions, hero text. This is the cohesion device; keep using it.
- **Photography leads. Type is confident but never competes with the image.** Magenta is a seal (an accent word / a dot), never a fill.
- **Layout follows the photo's natural aspect — never force an awkward crop.** If a photo doesn't fit, change the layout. Uniform-aspect grids (like SPACE's 2×2) align cleanly; that's the benchmark.
- **Vary the rhythm** — don't reuse one formula. The homepage cycles: full-bleed hero → framed 2-col spread → full-bleed hero + aligned row → hero + 4-up → 3-up grid → 2×2 grid.

---

## 3. Homepage anatomy (`app/page.tsx` + `app/globals.css` "HOME (impact rebuild 2026)" block)

Order, class, and images (all via `next/image`, `fill` + `sizes`):

1. **HERO `.ih`** — full-bleed 6-image CSS crossfade slideshow (`.ih-bg`, `@keyframes ihfade`, 42s, `prefers-reduced-motion` respected). Copy: 「ようこそ」は、言葉より先に。 + italic _Welcome, before a word is spoken._ + 相談する. First image has `priority`. Header is a translucent white bar (legible over any hero).
2. **PHILOSOPHY `.iphil`** — framed two-column spread (belief text + warm café-owner portrait; both edges align to `--gut`).
3. **PEOPLE `.ifeel`** — the emotional core. Full-bleed laughing-customers hero + 「また来たい」は、空気からはじまる。 overlay, then a clean 3-up landscape row (joy / staff / staff). **Benchmark section.**
4. **FOOD `.ifood`** — editorial story: signature-dish hero (`.ifood-hero`) + 4-up row (`.ifd-c`, square) preparation → detail → dish → people enjoying.
5. **PRODUCT `.iprod`** — aligned 3-up grid (`.iprd-c`, aspect 4/5). Secondary. (Tonal note: current 3 mix red/blue/red backgrounds — swap if you want more cohesion.)
6. **SPACE `.ispace`** — clean 2×2 landscape grid (`.isp-c`, aspect 3/2), kominka. **Benchmark section — the owner's favorite layout.**
7. **WHAT WE DO `.isvc`** — bold gothic 7-solution index (names only; magenta dot on #5 Creative Partner).
8. **CLOSE `.iclose`** — full-bleed night frame + その「らしさ」を、一緒に見つけましょう。 + 相談する.
9. **KANSAI SNAPS bridge `.ksnap`** — **do not change** (owner locked it). One studio, two brands; parent → portrait brand; JA editorial portrait (`kansai-snaps-portrait.jpg`). Still uses Noto Serif JP intentionally.

The 7 solutions array + all page copy live in `app/page.tsx`.

---

## 4. Image pipeline (CRITICAL — read before touching photos)

**Problem that was fixed:** photos were plain `<img>` at 1280px → soft on Retina, no optimization.

**Now:**
- **Masters** in `public/photos/portfolio/*.jpg` (+ `hero-cafe`, `hero-kominka`, `kansai-snaps-portrait`) are **2560px**, re-exported from the ~4-6K originals in the **gitignored `photos/`** folder.
- **Delivery = `next/image`** (`app/page.tsx` uses `Image` with `fill` + `sizes` + `quality`). `next.config.mjs` sets `formats:['image/avif','image/webp']`, `qualities:[75,82,90]`. The optimizer right-sizes + serves AVIF, so users never download the big masters. **Any new image on a redesigned page MUST use `next/image`, not `<img>`.**
- **The originals→web-copy mapping** (lost with the old export script) was recovered by a visual matcher and saved to **`scripts/photo-map.json`**. To re-export at higher res or add images: edit that map and run **`node scripts/reexport-masters.mjs`** (borrows `sharp` from `../kansai-snaps` by absolute path). Bump `LONG` in the script for more resolution.
- `next/image` with `fill` needs a **positioned parent with a defined size** — every image wrapper has `position:relative` + an `aspect-ratio` or explicit height. Follow that pattern on new pages.
- **Gotcha:** headless full-page screenshots show below-fold `next/image` as BLANK (lazy-load doesn't trigger). Verify by scrolling each section into view (viewport screenshots), not `fullPage`.

---

## 5. Self-review workflow (how the screenshots were done)

Deps live in **kansai-snaps**, not here. Borrow via absolute path / `createRequire`:
`createRequire("/Users/morethanplesent/yolo/kansai-snaps/package.json")("sharp" | "puppeteer-core")`.
Headless Chrome at `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`, `headless:"new"`. Build a contact-sheet montage with sharp and view it. Always screenshot sections **scrolled into view** (see §4 gotcha).

---

## 6. Deploy & git mechanics

- **Preview (safe, no prod):** `cd .../website && source ~/.zshrc && npx --yes vercel@latest deploy --yes --token "$VERCEL_TOKEN"`.
- **Promote to prod (after owner approves the preview):** merge branch → `main`, push, then `npx --yes vercel@latest deploy --prod --yes --token "$VERCEL_TOKEN"`. **Verify live with `/usr/bin/curl`** (not Anaconda curl). No ssoProtection issue on this project.
- Vercel project `prj_JTBxTasUcH7h7wmAM6cHSml9PvDG`, team `team_7SzsNzSnY6qvwWeavqb4sGfE`. Tokens in `~/.zshrc` (`$VERCEL_TOKEN`), `source` per command.
- **Workflow the owner expects:** build on a branch → deploy a **preview** → owner reviews on desktop + mobile → only then promote. Don't push redesigns straight to prod.
- Commit style: end messages with `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.

---

## 7. NEXT (the actual next job)

Bring the **inner pages up to the homepage system**, in order — each on a branch → preview → approve → promote:

1. **Services (`/services`, できること)** — biggest transformation. Currently the lowest-scoring page (old thin-serif system). Rebuild with the gothic/warm/magazine language: the 7 solutions as image-led editorial, problem→outcome, prices here (home only names them). Keep the flagship (#5 Creative Partner, おすすめ).
2. **Works (`/works`, 作品)** — apply the image pipeline (`next/image` + high-res) and the aligned-grid rhythm; it's the natural showcase.
3. **About (`/about`)** and **Contact (`/contact`)** — inherit type/gutter; Contact: make the form the hero.

Whole-site follow-ups still open (from `HANDOFF.md` §11): Creative Partner price, map ServiceList rows onto the 7 solutions, real corporate/team photos, GBP NAP/hours verification + Search Console, `EMAIL_FROM` caps fix.

---

## 8. Gotchas

- Shell cwd keeps resetting to `kansai-snaps` — use absolute paths or `cd` inline.
- Google Map embeds + (unlikely now) any lazy image can look blank in headless shots.
- The **Kansai Snaps bridge is locked** — don't restyle it.
- **Inner pages still use the OLD system** (Noto Serif JP thin, `.btn-big`/`.btn-txt`, old `.slot-img`/WorkGrid). Those classes are still needed by `/services`, `/works`, `/about`, `/gear` until each is redesigned — don't delete them.
- Build check: `npm run build`. The `no-page-custom-font` warning is expected (fonts via `<link>` in `layout.tsx`) and harmless.

---

## 9. Key files

- `app/page.tsx` — the homepage (all copy + structure).
- `app/globals.css` — design system; the homepage block is under `HOME (impact rebuild 2026)`; `--gut` + tokens in `:root`; header + buttons above.
- `app/layout.tsx` — font loading (heavy weights), SEO/JSON-LD.
- `next.config.mjs` — `next/image` formats + qualities.
- `scripts/reexport-masters.mjs` + `scripts/photo-map.json` — the image re-export pipeline.
- Auto-memories (Claude): `studio-kurisusan-voice`, `editorial-implementation-fidelity`, `studio-kurisusan-project`.
