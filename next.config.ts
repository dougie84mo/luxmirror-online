import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    // Marketing placeholders ship as SVGs from /public/images. We own
    // every SVG in this site, so allowing them is safe. The CSP locks
    // out scripted/embedded content as a defensive measure.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy:
      "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    return [
      {
        // Apple fetches this without an extension and requires JSON
        // content-type with no redirect for Universal Links to verify.
        source: "/.well-known/apple-app-site-association",
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
    ];
  },
};

export default nextConfig;
