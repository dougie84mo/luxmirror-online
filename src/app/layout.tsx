import type { Metadata } from "next";
import { Geist, Geist_Mono, Bodoni_Moda } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

/*
 * Display face: Bodoni Moda — a fashion-editorial didone. The salon
 * world is adjacent to style press (the page cites Vogue, Allure);
 * the razor-thin hairline contrast suits a brand built around blades
 * and glass. Variable optical size keeps small settings readable.
 */
const bodoni = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://theluxmirror.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "LUX Mirror — Smart mirrors for modern salons",
    template: "%s · LUX Mirror",
  },
  description:
    "The LUX Smart Mirror brings AR styling, gesture controls, and fleet management to barbers and stylists.",
  // Home canonical only. Every other route sets its own — a canonical
  // inherited by all pages would tell Google they are all duplicates of "/".
  alternates: { canonical: "/" },
  openGraph: {
    siteName: "LUX Mirror",
    type: "website",
    locale: "en_US",
    url: SITE,
  },
  twitter: {
    card: "summary_large_image",
    title: "LUX Mirror — Smart mirrors for modern salons",
    description:
      "AR styling, gesture controls, and fleet management, in a mirror built for the salon floor.",
  },
  // Search Console's meta-tag method. Set the value in the host panel and
  // the tag appears; unset, Next omits it entirely.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

/* Organization + WebSite: the entity Google attaches a Knowledge Panel to,
 * and what lets it show the brand name rather than the bare domain. */
const ORGANIZATION_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "LUX Mirror",
      url: SITE,
      description:
        "LUX builds the smart mirror for the modern salon — AR styling, gesture controls, and fleet management.",
      email: "hello@theluxmirror.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "96 Commerce Drive PMB 200",
        addressLocality: "Wyomissing",
        addressRegion: "PA",
        postalCode: "19610",
        addressCountry: "US",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "LUX Mirror",
      publisher: { "@id": `${SITE}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bodoni.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_LD) }}
        />
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        {gaId && <Analytics gaId={gaId} />}
      </body>
    </html>
  );
}
