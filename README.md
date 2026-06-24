# STUDIOくりすさん — Website

Commercial photography studio site for **合同会社くりすさん** (Studio くりすさん), Osaka.
Built with **Next.js 14 (App Router) + TypeScript**, converted from the original
single-page HTML prototype (`_reference/studio-kurisusan.html`).

Brand colors: magenta `#E8198B`, black `#0A0A0A`, white `#FFFFFF`.

## Pages

| Route       | Description                              |
| ----------- | ---------------------------------------- |
| `/`         | Home                                     |
| `/work`     | Case studies (with category filter)      |
| `/services` | Services + interactive price calculator  |
| `/gear`     | Gear list                                |
| `/about`    | About                                    |
| `/contact`  | Contact form (saves to Supabase)         |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Environment variables

Copy `.env.example` → `.env.local` and fill in from your Supabase project
(**Settings → API**):

```
NEXT_PUBLIC_SUPABASE_URL=        # https://<ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=   # public anon key
SUPABASE_SERVICE_ROLE_KEY=       # SECRET — server-only, used by the contact form
```

The contact form fails gracefully (shows a fallback message) until these are set,
so the site builds and deploys without them.

## Supabase — contacts table

Run `supabase/migrations/0001_contacts.sql` in your Supabase project's **SQL editor**.
It creates `public.contacts (name, company, email, shoot_type, message, created_at)`,
enables Row Level Security, and grants no public policies — inserts happen
server-side with the service-role key (see `app/contact/actions.ts`).

## Deploy (Vercel)

Add the three env vars above in **Vercel → Project → Settings → Environment Variables**,
then redeploy. The contact form will then write submissions to Supabase.

## Localization

The header has a JP / EN / ES language switcher matching the prototype. It is
currently a **visual toggle only** — all copy is Japanese, as in the source
prototype. Wiring real translations (e.g. via `next-intl`) is a future step once
EN/ES copy exists.

## Structure

```
app/                 routes (home, work, services, gear, about, contact)
  contact/actions.ts server action that inserts into Supabase
  globals.css        all site styles (ported from the prototype)
components/          Header, Footer, WorkGrid, PriceCalculator, ContactForm
lib/supabase.ts      server-only Supabase admin client factory
supabase/migrations/ contacts table SQL
public/logo.png      brand logo (extracted from the prototype)
_reference/          original HTML prototype (source of truth for design)
```
