# High Tide Travel — project notes for Claude

Travel-rewards site (Next.js 14 App Router + Tailwind + Framer Motion), deployed
to **Cloudflare Pages** via GitHub at **hightidetravel.co**.

## Working agreement

- **Auto-push to deploy.** Whenever the user asks for a change, after making it
  and verifying the build, **commit and `git push origin main` without asking**.
  Pushing triggers the Cloudflare Pages auto-deploy. (Only skip the push if the
  task made no committable changes, e.g. a pure question.)
- Always co-author commits and write a clear message; never force-push.
- Verify with `npm run build` (and `npx @cloudflare/next-on-pages` for deploy-
  affecting changes) before pushing.

## Stack / deploy

- Build command: `npx @cloudflare/next-on-pages` → output `.vercel/output/static`.
- `nodejs_compat` compatibility flag is required (set in the Cloudflare dashboard
  and `wrangler.toml`).
- Non-static routes (`/api/*`, `sitemap.ts`, `robots.ts`) must use
  `export const runtime = "edge"`.

## Key files

- `data/cards.ts` — credit card listings (verified May 2026; verify offers before publishing).
- `lib/trip.ts` — AI Trip Planner schema, CPP thresholds, deep-link builders.
- `app/api/plan-trip/route.ts` — Claude API call (model `claude-opus-4-7`).
  Needs `ANTHROPIC_API_KEY` (Cloudflare env var + `.env.local`).
- `public/logo.png` (footer/favicon) + `public/logo-mark.png` (navbar emblem).

See `DEPLOYMENT.md` for full deploy + env setup steps.
