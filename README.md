# Ashraya Events — Website

Modern, elegant marketing site for **Ashraya Events** (wedding & event planning),
built with Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion,
with AI features powered by the Claude API.

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in keys you have (all optional to run)
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
```

The site runs with **zero configuration** — missing API keys degrade gracefully
(AI shows friendly fallbacks, the blog shows placeholder posts).

## Admin panel (manage the whole site) — `/admin`

A custom, login-protected admin panel at **`/admin`** lets the client add/edit
**Services, Portfolio/Stories, Testimonials, FAQs, Blog posts**, and the
**Home/Site settings** (hero slideshow images, story text, stats) — and
**upload images** — no code. Content is stored in **Supabase** (Postgres +
media storage). FAQs added here also power the **AI chat concierge**.

Until Supabase is connected the site shows built-in **placeholder content**, and
the admin shows a short setup notice.

### One-time setup (≈5 min)
1. **Login:** in `.env.local`, set `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and a long
   random `ADMIN_SESSION_SECRET`. These are the credentials the client uses.
2. **Database + media:** create a free project at https://supabase.com. In its
   **SQL Editor**, paste & run [`supabase/schema.sql`](./supabase/schema.sql)
   (creates tables, public-read security, and the `media` storage bucket).
3. From Supabase **Project Settings → API**, copy into `.env.local`:
   `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and
   `SUPABASE_SERVICE_ROLE_KEY` (keep the service key secret — server only).
4. Restart, open **`/admin`**, log in, start adding content.

Security: `/admin` and `/api/admin/*` are protected by middleware; only the
service-role key (server-side) can write, so the public site is read-only.

## Where to edit the rest (code/config)

| What | File |
|---|---|
| Brand name, logo file, contact, socials, WhatsApp, map, YouTube IDs | `src/lib/site.ts` |
| Sample content shown until Supabase is connected | `src/lib/content.ts` |
| Colors & fonts (theme) | `src/app/globals.css` (`@theme`) |
| Admin fields per content type | `src/lib/admin/resources.ts` |
| Database schema (run in Supabase) | `supabase/schema.sql` |

Anything marked `[PLACEHOLDER]` needs real client content (photos, bios,
testimonials, contact details, logo).

## AI features (need `ANTHROPIC_API_KEY`)

- **Chat Concierge** — site-wide widget (`src/components/ai/ChatWidget.tsx` → `/api/chat`)
- **Budget/Package Estimator** — `/estimate` (`/api/estimate`) with smart portfolio + testimonial matching
- **Lead Scoring & Summaries** — `/api/lead-summary` (attached to contact + estimate leads)
- **Blog Assistant (internal)** — `/tools/blog-assistant` (`/api/blog-draft`)

Model is set in one place: `src/lib/ai/client.ts` (`MODEL`).

## Leads (Formspree)

Set `NEXT_PUBLIC_FORMSPREE_ENDPOINT`. Contact + estimator submissions POST there,
each enriched with an AI lead card.
