# Studio くりすさん — Editorial Redesign Handoff

_New tab? Read this first, then `HANDOFF.md` (durable project + infra facts). This doc covers the in-progress creative redesign only._

---

## 0. STATUS (read this)

- We are doing a **page-by-page editorial redesign** of the live site, acting as **Creative Director**, not a developer doing cleanup.
- **The homepage is REBUILT and on a preview URL, awaiting the owner's approval. It is NOT on production yet.**
- **Production is unchanged** (still the old homepage). Do not promote to prod until the owner approves.
- All redesign work lives on the branch **`redesign/homepage-editorial`** (this doc + the new homepage). `main` = production.
- Latest homepage preview: **https://studio-kurisusan-mjs148of6-misterchrisllc-5316s-projects.vercel.app**

**Immediate next action:** the owner is reviewing the homepage preview. When they approve, promote to production (see §7), then start the **Services** page redesign (§8).

---

## 1. The engagement

The owner wants the site to feel like a **premium creative studio / editorial publication**, not an agency template or a document. A visitor should think *"these people understand design"* before reading a word. The website itself is the proof of taste.

**Workflow (strict, one page at a time):**
1. Explain the vision. 2. Explain why it improves the experience. 3. Implement. 4. Deploy to a **preview** (never prod). 5. Stop and wait for approval. 6. On approval, promote to prod. 7. Move to the next page.

Do not redesign multiple pages at once. Do not be conservative. Rebuild layouts rather than nudging spacing.

## 2. Core design principles

- **Show more, say less.** If a photo communicates it, delete the paragraph.
- **Rhythm, not fewer pixels.** Do not shorten just to reduce scroll. Keep space where the photography earns it. The goal is a page that never *feels* long.
- **Photography is the hero.** The layout frames the work, never competes with it. Treat hero images as art in negative space, never "background image with text on top."
- **Editorial register:** Monocle, Kinfolk, COS, Aesop, Apple. Quiet confidence, atmosphere, huge whitespace, confident oversized typography.
- **Magenta is a seal,** not a fill. One restrained accent per screen (a hairline, an accent word, a dot).
- **Every section must earn its place.** Merge or delete anything repeated or over-explaining.
- **Honesty (hard rule):** no fabricated testimonials, clients, stats, or case-study results. Only real, existing assets and copy. No em-dashes in site copy (use 、 or 。).

## 3. Homepage — what was built (on preview / this branch)

Rebuilt as an editorial sequence where **every scroll is a different composition** (no repeated two-column). File: `app/page.tsx`. Styles: `app/globals.css` (home block starts at the comment `HOME (editorial rebuild 2026)`).

Sequence and class names:
1. **HERO (`.eh`)** — the café image (`/photos/hero-cafe.jpg`) fills ~56% on the right at near-full-viewport height; type lives in the left **negative space** (`.eh-txt`: the trust line `商業写真 · ビジュアルブランディング` / `大阪・関西 — 日本語 / English`) plus a vertical `.eh-scroll` cue. No headline on the image.
2. **STATEMENT (`.estmt`)** — one oversized, quiet serif line in a field of whitespace: 「お店やブランドが、*もっと選ばれる理由*を、つくる。」 + one muted sub-line. The message lives here, not on the hero.
3. **SELECTED WORK (`.ework`)** — three art-directed plates, each a different composition:
   - `.plate-full` full-bleed (space: `kominka-moon-door.jpg`)
   - `.plate-split` offset portrait + one line of type (people: `cafe-owner.jpg`)
   - `.plate-duo` two images at two scales (food `wagashi-dorayaki.jpg` + product `sriracha-lying.jpg`)
4. **SERVICES INDEX (`.sidx`)** — the seven solutions as a quiet, airy list, **names only** (no prices, no outcome copy). Creates curiosity; the Services page explains. Flagship (#5 Creative Partner) has a small magenta dot.
5. **CLOSE (`.eclose`)** — an intimate frame (`cafe-pourover.jpg`) with one line 「まず、話しましょう。」 and one CTA.

Tonal rhythm: warm paper (`--off`) hero + statement, white work, warm (`--warm`) services, dark (`--bk`) close.

**Design tokens** (`app/globals.css` `:root`): `--mg:#E8198B` (magenta seal), `--bk:#0A0A0A`, `--off:#F7F5F2`, `--warm:#EEEBE6`, `--bd:#E0DDDA`. Fonts: Noto Serif JP (display), Inter / Noto Sans JP (body).

## 4. Hero decision record

Three concepts were mocked up and compared (see artifact in §9):
- **A — The Space** (kominka night exterior): beautiful but sells the *building*, not the service. Reframed to a punctuation frame inside the work reel.
- **B — Hospitality Warmth** (café counter, window light): **CHOSEN.** Warm, a place you want to be; speaks to the core F&B / hospitality audience.
- **C — The Human** (café owner): strong runner-up (universal, on-brand), not chosen.

The owner picked **B**, with the direction: treat the café as *art*, not a backdrop; the feeling is the subject, so a viewer thinks "I want my business to look like this," not "nice café." Hero image source master: `photos/kissaten cafe/DSCF6223.jpg` → `public/photos/hero-cafe.jpg` (1500px). `hero-kominka.jpg` also exists (from concept A / an earlier draft) but is currently unused.

## 5. The owner's six refinement notes (all applied)

1. Rhythm over pixels. 2. The reel frames the work, never competes. 3. Homepage only *introduces* services (names only). 4. One understated trust line (in the hero). 5. Editorial Monocle/Kinfolk register. 6. The site is its own proof.

## 6. Regression fixed

The first homepage draft accidentally removed `.btn-big` and `.btn-txt` from `globals.css`, which the **Services** page CTA depends on. Both are **restored** in the current home CSS block. (This never reached prod; caught before promotion.)

## 7. Deploy & git mechanics

- **Branch:** `redesign/homepage-editorial`. `main` auto-deploys to **production** on push, so keep redesign work on the branch until approved.
- **Preview deploy (safe):** `cd .../website && source ~/.zshrc && npx --yes vercel@latest deploy --yes --token "$VERCEL_TOKEN"` (no `--prod`). Pushing this branch to GitHub also creates a Vercel preview.
- **Promote to production (only after approval):** merge the branch into `main` and push (auto-deploys), OR run the same command with `--prod`. Verify live with `/usr/bin/curl` (not Anaconda curl). No ssoProtection issue on this project.
- Tokens in `~/.zshrc`: `$VERCEL_TOKEN`, `$SUPABASE_ACCESS_TOKEN`. Vercel project `prj_JTBxTasUcH7h7wmAM6cHSml9PvDG`, team `team_7SzsNzSnY6qvwWeavqb4sGfE`.
- Commit style: end messages with `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.

## 8. NEXT (after homepage is approved + promoted)

1. **Services** — the biggest transformation (lowest audit score, 4/10). Turn the spreadsheet into a visual showcase: each of the seven solutions as a premium offering (image-led), not a table row. It inherits the homepage visual language. Prices + detail live here (home only names them).
2. Then **Works**, **About**, **Contact**, in that order, each reusing the homepage's editorial system. Contact: kill the empty map void, make the form the hero.

Full page-by-page audit (scores, top-20 ROI, per-page direction) is captured in the Creative Direction artifact (§9).

## 9. Artifacts produced this session (viewable in browser)

- **Creative Direction audit** (page-by-page scores + top-20 improvements + vision): https://claude.ai/code/artifact/7a33905a-8345-4da8-bafd-ba21eb105034
- **Hero Concepts comparison** (A/B/C mockups + recommendation): https://claude.ai/code/artifact/2b38abd6-4a76-46f5-a76b-e5cfb96da41b

## 10. Gotchas

- **Deps live in `kansai-snaps`**, not here. Borrow puppeteer-core by absolute path: `/Users/morethanplesent/yolo/kansai-snaps/node_modules/puppeteer-core/...`. Headless Chrome at `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`, headless `"new"`.
- **Headless screenshot quirk:** the `.eh` hero uses `min-height:calc(100dvh - 56px)`. In headless `fullPage`/timing captures the hero can look short; measured real height is correct (804px at a 860 viewport). Trust a live measurement over a transient screenshot.
- Shell cwd keeps resetting to `kansai-snaps`; use absolute paths or `cd` inline.
- Google Map embeds and lazy images render blank in headless full-page shots (not a real bug).
- Build check: `npm run build`.

---

_Prepared at the pause before homepage promotion. Old homepage still live on prod; new editorial homepage on the branch + preview above, awaiting approval._
