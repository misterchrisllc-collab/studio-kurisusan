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
  tonkatsu staff; why-chris = Chris portrait. Home **services teaser + case studies still lean
  photography-only** (candidate for the new positioning language). Corporate/construction not
  featured.
- **/works**: premium works page. Featured case studies (3, image-backed: restaurant/product/
  fashion, each with client/challenge/what-shot/deliverables/outcome) + filterable masonry
  PORTFOLIO (12 preview + 「もっと作品を見る」 inline expand, lazy-load hidden, custom lightbox
  w/ prev/next+keyboard). `/work` 308-redirects to `/works`.
- **/services**: creative-workflow section (photo as foundation) + 撮影に含まれるもの +
  per-category image+WHY + expandable rows (use/deliverables/shoot-time/lead-time/options) +
  FAQ accordion + calculator (total + est. shoot time/photos/delivery) + final CTA.
  ONE PAGE by design — only split into per-service pages if ranking for
  "大阪 商品撮影 / 店舗撮影 / 採用写真".
- **/about**: philosophy-first + real portrait.
- **/contact**: studio block + embedded map + rich B2B form (email delivery live).
- **/gear**: not touched this cycle.

## Open follow-ups / next candidates
1. Carry positioning language into the **home services teaser** + **contact intro** (still
   photography-only tone).
2. Real **corporate/team/office** + **construction** photos → swap the Services "Corporate"
   stand-in and consider a 4th case study.
3. Optional: verify a **studio-branded sending domain** (e.g. studio-kurisusan.com) so email
   `from` isn't kansai-snaps.com.
4. Real i18n (EN/ES) if/when needed — currently visual toggle only.
5. `/gear` page review; About right-column could later re-add trimmed credentials if desired.
