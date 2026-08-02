import type { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://theluxmirror.com";

/* /book/[businessId] pages are tenant pages reached via QR — deliberately
 * not enumerated here. */
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/shop", "/apps", "/pricing", "/about", "/reserve", "/faq", "/contact"].map(
    (path) => ({
      url: `${SITE}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    }),
  );
}
