# Deploying High Tide Travel to Cloudflare Pages

This site is a **Next.js 14 (App Router)** app built for **Cloudflare Pages**
using the [`@cloudflare/next-on-pages`](https://github.com/cloudflare/next-on-pages)
adapter. Deployment is via **GitHub → Cloudflare Pages** with automatic builds on
every push.

The custom domain is **hightidetravel.co**, registered and managed in Cloudflare.

---

## TL;DR (build settings)

| Setting | Value |
| --- | --- |
| Framework preset | **Next.js** |
| Build command | `npx @cloudflare/next-on-pages` |
| Build output directory | `.vercel/output/static` |
| Node.js version | `20` (or newer) |
| Compatibility flag | `nodejs_compat` (Production **and** Preview) |

These are also captured in [`wrangler.toml`](./wrangler.toml).

---

## 1. Push the project to GitHub

From the project root:

```bash
git init
git add .
git commit -m "Initial commit: High Tide Travel"

# Create an empty repo on GitHub first (no README/license), then:
git branch -M main
git remote add origin https://github.com/<your-username>/high-tide-travel.git
git push -u origin main
```

> The `.gitignore` already excludes `node_modules`, `.next`, `.vercel`, and
> `.wrangler`, so only source files are committed.

---

## 2. Connect the repo in the Cloudflare Pages dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Go to **Workers & Pages → Create → Pages → Connect to Git**.
3. Authorize GitHub and select the **high-tide-travel** repository.
4. On the **Set up builds and deployments** screen, enter the settings below.

---

## 3. Build configuration

| Field | Value |
| --- | --- |
| **Production branch** | `main` |
| **Framework preset** | `Next.js` |
| **Build command** | `npx @cloudflare/next-on-pages` |
| **Build output directory** | `.vercel/output/static` |
| **Root directory** | _(leave blank — repo root)_ |

Click **Save and Deploy**. The first build will run automatically.

---

## 4. Add the `nodejs_compat` compatibility flag (required)

The adapter relies on Node.js runtime APIs, so the flag **must** be set or the
deployment will fail at runtime.

1. Open your Pages project → **Settings → Functions** (or **Runtime**).
2. Under **Compatibility flags**, add `nodejs_compat`.
3. Set it for **both Production and Preview** environments.
4. Confirm the **Compatibility date** is on or after `2024-09-23`.
5. Re-deploy (Cloudflare prompts you, or trigger a new deployment) so the flag
   takes effect.

> This repo also declares the flag in [`wrangler.toml`](./wrangler.toml). The
> dashboard setting is still the source of truth for Pages — set it there too.

---

## 5. Point the hightidetravel.co custom domain at the project

Because the domain is already in your Cloudflare account, this is quick:

1. In your Pages project, go to **Custom domains → Set up a custom domain**.
2. Enter **`hightidetravel.co`** and confirm.
3. Cloudflare auto-creates the required `CNAME`/`A` records (since the domain is
   on Cloudflare DNS) and provisions an SSL certificate.
4. Repeat for **`www.hightidetravel.co`** if you want the www subdomain, then
   add a redirect rule from `www` → apex (or vice versa) under
   **Rules → Redirect Rules**.
5. Wait for the status to show **Active** (usually a minute or two).

The site's canonical URLs, sitemap, and metadata are already hard-coded to
`https://hightidetravel.co`, so no further config is needed.

---

## AI Trip Planner — set the `ANTHROPIC_API_KEY` (required for `/points-tool`)

The Trip Planner page (`/points-tool`) calls the Claude API from a Cloudflare
Pages Function (`/api/plan-trip`, edge runtime). Without a key, the page loads
fine but shows "Trip planner is not configured" when you submit.

1. Get a key at [console.anthropic.com](https://console.anthropic.com).
2. **Cloudflare:** Pages project → **Settings → Environment variables** → add
   `ANTHROPIC_API_KEY` as an **encrypted** variable for **both Production and
   Preview**, then redeploy.
3. **Local dev:** copy `.env.local.example` to `.env.local` and paste your key.

Cost/latency note: the planner uses `claude-opus-4-7` (best quality). Each plan
costs a few cents. To trade some quality for speed/cost, change `MODEL` in
[`app/api/plan-trip/route.ts`](./app/api/plan-trip/route.ts) to
`claude-sonnet-4-6`.

> The key is read server-side only (never exposed to the browser). Never commit
> your real key — `.env.local` is git-ignored.

---

## Local development & testing

```bash
npm install          # install dependencies
npm run dev          # local dev server at http://localhost:3000

npm run build        # standard Next.js production build
npm run pages:build  # Cloudflare build → .vercel/output/static
npm run pages:dev    # preview the Cloudflare build locally via Wrangler
```

`npm run pages:deploy` will build and deploy directly via Wrangler if you prefer
CLI deploys over the GitHub integration (run `npx wrangler login` first).

---

## Editing content (no code required)

Editable data and logic:

- [`data/cards.ts`](./data/cards.ts) — credit card listings (fees, bonuses, perks,
  ratings, categories, affiliate `applyUrl` placeholders, featured cards).
- [`lib/trip.ts`](./lib/trip.ts) — the AI Trip Planner's output schema, the
  cents-per-point (CPP) thresholds (1.5¢ / 1.0¢), and the flight/hotel deep-link
  builders (Google Flights, Kayak, Skyscanner, Google Hotels).
- [`app/api/plan-trip/route.ts`](./app/api/plan-trip/route.ts) — the planner's
  system prompt and Claude model (`claude-opus-4-7`; swap to `claude-sonnet-4-6`
  for lower cost/latency).

## Branding

- Two logo assets live in `public/`:
  - [`public/logo.png`](./public/logo.png) — the full square brand logo (emblem +
    "HIGH TIDE TRAVEL" wordmark). Used in the **footer** and as the favicon.
  - [`public/logo-mark.png`](./public/logo-mark.png) — just the wave + plane emblem,
    cropped from the full logo. Used in the **navbar**.
  - To update branding, replace `logo.png` with your new square logo, then re-crop
    the emblem into `logo-mark.png` (or swap that file too). No code changes needed.
- Brand colors are defined in [`tailwind.config.ts`](./tailwind.config.ts):
  navy `#0d1550`, royal blue `#1e3aaa`, sky accent `#38bdf8`, gold `#f0b429`.

## Newsletter / email capture

The newsletter and "notify me" forms in
[`components/NewsletterForm.tsx`](./components/NewsletterForm.tsx) are currently
front-end only (they validate and show a success state). Wire the `handleSubmit`
function to your email provider (Beehiiv, ConvertKit, Mailchimp, etc.) when ready.
