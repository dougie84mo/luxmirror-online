import type { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://theluxmirror.com";

/* Priority is a hint about relative importance WITHIN this site, not a
 * ranking lever — Google largely ignores it, but changeFrequency and
 * lastModified do inform recrawl scheduling, so they're worth getting right
 * rather than stamping every page "weekly".
 *
 * /book/[businessId] pages are tenant pages reached via QR — deliberately not
 * enumerated. /reserve is intentionally included: it's a real landing page
 * people search for, not just a form endpoint. */
const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/shop", priority: 0.9, changeFrequency: "weekly" },
  { path: "/pricing", priority: 0.9, changeFrequency: "weekly" },
  { path: "/apps", priority: 0.8, changeFrequency: "monthly" },
  { path: "/reserve", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.4, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Build time is the honest answer for a statically generated site: these
  // pages change when we deploy. A per-request now() would claim every page
  // changed on every crawl and teach Google to ignore the field.
  const lastModified = new Date();

  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
