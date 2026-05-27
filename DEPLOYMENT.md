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

## AI Trip Planner — enable the Workers AI binding (required for `/traveltool`)

The Trip Planner page (`/traveltool`) calls **Cloudflare Workers AI** from a
Pages Function (`/api/plan-trip`, edge runtime). It runs on your Cloudflare
account's free daily allowance — **no API key and no separate bill**. You just
need to give the Pages project access to Workers AI via a binding named `AI`.

1. In the Cloudflare dashboard → your Pages project → **Settings → Functions**
   (or **Bindings**) → **Add binding** → **Workers AI**.
2. **Variable name:** `AI` (exact). Save.
3. **Redeploy** so the binding takes effect: **Deployments → ⋯ → Retry deployment**
   (or push any change).

The binding is also declared in [`wrangler.toml`](./wrangler.toml) (`[ai]`), which
covers Wrangler/CLI deploys and local dev. For the GitHub-connected build, adding
it in the dashboard is the reliable path.

Until the binding exists, the page loads but returns "AI is not available" on
submit.

- **Model:** `@cf/meta/llama-3.3-70b-instruct-fp8-fast` (set in
  [`app/api/plan-trip/route.ts`](./app/api/plan-trip/route.ts)). Swap to
  `@cf/meta/llama-3.1-8b-instruct` for faster/cheaper generation with more free
  headroom.
- **Local dev:** `npm run dev` works if you're logged into Wrangler (the AI
  binding proxies to Cloudflare); otherwise use `npm run pages:dev` after a
  Cloudflare build. Free-tier allowance and pricing:
  [Workers AI pricing](https://developers.cloudflare.com/workers-ai/platform/pricing/).

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
  cents-per-point (CPP) thresholds (1.5¢ / 1.0¢), the flight/hotel deep-link
  builders, and the award-search tool links (seats.aero / point.me / Roame).
- [`data/transferPartners.ts`](./data/transferPartners.ts) — transfer ratios,
  airline alliances, and sweet-spot booking heuristics that ground the planner's
  "best ways to book" advice. Verified May 2026 — update as programs change.
- `cardEarnRates` in [`data/cards.ts`](./data/cards.ts) — per-card earning
  multipliers + co-brand info that drive the "which card to use" recommendations.
- [`app/api/plan-trip/route.ts`](./app/api/plan-trip/route.ts) — the planner's
  system prompt and Workers AI model (`@cf/meta/llama-3.3-70b-instruct-fp8-fast`).

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
