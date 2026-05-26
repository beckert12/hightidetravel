import type { MetadataRoute } from "next";

export const runtime = "edge";

const SITE_URL = "https://hightidetravel.co";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/credit-cards", "/points-tool", "/podcast", "/about"];
  const now = new Date();
  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
