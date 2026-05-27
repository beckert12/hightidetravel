# High Tide Travel — project notes for Claude

Travel-rewards site (Next.js 14 App Router + Tailwind + Framer Motion), deployed
to **Cloudflare Pages** via GitHub at **hightidetravel.co**.

## Working agreement

- **Auto-push to deploy.** When the user requests an edit/build of the site,
  finish the change, verify the build, then **commit and `git push origin main`
  without asking** — push as soon as that requested change is done. Pushing
  triggers the Cloudflare Pages auto-deploy.
  - Push **once per completed request**, at the end — not mid-build and not after
    each intermediate step of a multi-step task. If the work spans several
    commits, push when the whole requested change is finished and verified.
  - Skip the push only when a request produces nothing to commit (e.g. a pure
    question or research).
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
- `app/api/plan-trip/route.ts` — calls **Cloudflare Workers AI** (model
  `@cf/meta/llama-3.3-70b-instruct-fp8-fast`) via the `AI` binding. Free tier,
  no API key. Requires a Workers AI binding named `AI` on the Pages project
  (declared in `wrangler.toml` `[ai]` + add in dashboard for git builds).
- `public/logo.png` (footer/favicon) + `public/logo-mark.png` (navbar emblem).

See `DEPLOYMENT.md` for full deploy + env setup steps.
