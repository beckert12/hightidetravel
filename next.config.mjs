// Enable Cloudflare bindings (e.g. Workers AI) during `next dev` so the Trip
// Planner works locally. No-op / safely ignored in production builds.
if (process.env.NODE_ENV === "development") {
  await import("@cloudflare/next-on-pages/next-dev")
    .then(({ setupDevPlatform }) => setupDevPlatform())
    .catch(() => {});
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disabled because StrictMode's dev-only double-invoke breaks Framer Motion's
  // update detection (mount animations run, but later prop changes are ignored).
  // Production is unaffected by StrictMode either way; this keeps `npm run dev` working.
  reactStrictMode: false,
  images: {
    // Cloudflare Pages doesn't run the Next.js image optimizer.
    unoptimized: true,
  },
};

export default nextConfig;
