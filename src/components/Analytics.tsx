"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/*
 * Google Analytics 4.
 *
 * Hand-rolled on next/script rather than @next/third-parties for two reasons:
 * no extra dependency, and full control over what runs in the root layout —
 * a component there that calls useSearchParams() de-opts every page out of
 * static rendering, which on an SEO push is the opposite of what we want.
 * usePathname() is safe; useSearchParams() is not. Query strings are
 * therefore not reported, which for a marketing site costs nothing.
 *
 * Renders NOTHING without NEXT_PUBLIC_GA_MEASUREMENT_ID, so local dev and
 * preview builds never pollute the property with fake traffic.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function Analytics({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  // gtag's own send_page_view covers the first load. Firing our own as well
  // would double-count every entry.
  const firstLoad = useRef(true);

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    window.gtag?.("event", "page_view", { page_path: pathname });
  }, [pathname]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
window.gtag=gtag;gtag('js',new Date());gtag('config','${gaId}');`}
      </Script>
    </>
  );
}
