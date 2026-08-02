import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  alternates: { canonical: "/apps" },
  title: "The Apps",
  description:
    "Two apps, one platform: LUX Business runs your salon — bookings, clients, team, and your mirror fleet — while LUX Booking lets clients find you and book themselves in.",
};

/* ─── data ──────────────────────────────────────────────────── */

/* Wall-menu feature rows — the house-offer motif from /shop. */
const businessFeatures = [
  { label: "Bookings", value: "Calendar, request inbox, walk-ins, waitlist" },
  { label: "Clients", value: "Profiles, visit history, look photos" },
  { label: "Team", value: "Roles, schedules, per-member permissions" },
  { label: "Mirrors", value: "Pair by QR, live fleet status, modes" },
  { label: "Billing", value: "Plans that scale with your chairs" },
];

const bookingFeatures = [
  { label: "Discover", value: "Find salons and barbers near you" },
  { label: "Book", value: "Real-time openings, reschedule anytime" },
  { label: "Check in", value: "Self check-in when you arrive" },
  { label: "Favorites", value: "Your shops, your stylists" },
  { label: "Your looks", value: "Mirror photos from every visit" },
];

const together = [
  {
    label: "The shop",
    title: "Run it from your pocket.",
    body: "LUX Business is the owner's console — every booking, every client, every chair, and every mirror in one place. It works with or without the hardware.",
  },
  {
    label: "The client",
    title: "Booked before they call.",
    body: "LUX Booking fills your calendar while you work. Clients see real openings, book themselves in, and check in from the parking lot.",
  },
  {
    label: "The mirror",
    title: "It all meets at the glass.",
    body: "Pair a LUX Mirror and the loop closes: the day's schedule at the chair, style previews in the glass, and the finished look saved to the client's profile.",
  },
];

/* ─── phone mockups (CSS-drawn, brand tokens only) ──────────── */

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full" style={{ maxWidth: "320px" }}>
      <div aria-hidden className="wall-glow" />
      <div
        className="rounded-3xl p-2"
        style={{
          aspectRatio: "9 / 18.5",
          background:
            "linear-gradient(175deg, oklch(0.3 0.01 268), oklch(0.16 0.01 268) 40%, oklch(0.1 0.01 268))",
          boxShadow:
            "0 30px 60px -18px oklch(0 0 0 / 0.45), 0 4px 14px oklch(0 0 0 / 0.3), inset 0 1px 0 oklch(1 0 0 / 0.18)",
        }}
      >
        <div className="dark relative flex h-full flex-col overflow-hidden rounded-2xl bg-background p-4 text-foreground">
          {children}
        </div>
      </div>
    </div>
  );
}

function BusinessPhone() {
  const schedule = [
    { time: "9:30", client: "Devon C.", service: "Skin fade · Chair 1" },
    { time: "10:15", client: "Aaliyah M.", service: "Silk press · Chair 3" },
    { time: "11:00", client: "Walk-in", service: "Lineup · Waitlist #1" },
    { time: "12:30", client: "Jordan P.", service: "Beard sculpt · Chair 2" },
  ];
  return (
    <PhoneFrame>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Today
        </span>
        <span className="lux-chip">
          <span className="lux-chip-dot" />
          2 mirrors online
        </span>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {schedule.map((r) => (
          <div
            key={r.time}
            className="rounded-lg border border-border bg-surface p-3"
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-xs font-medium">{r.client}</span>
              <span className="font-mono text-[10px] text-muted-foreground">
                {r.time}
              </span>
            </div>
            <p className="mt-1 text-[10px] text-muted-foreground">{r.service}</p>
          </div>
        ))}
      </div>
      <div className="mt-auto rounded-lg border border-border bg-surface p-3">
        <div className="flex items-baseline justify-between gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            This week
          </span>
          <span className="text-xs font-medium">34 bookings</span>
        </div>
      </div>
    </PhoneFrame>
  );
}

function BookingPhone() {
  const slots = ["1:15", "2:30", "3:00", "4:45"];
  return (
    <PhoneFrame>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        Book
      </span>
      <div className="mt-3 rounded-lg border border-border bg-surface p-3">
        <p className="text-xs font-medium">Fade Factory · Oakland</p>
        <p className="mt-1 text-[10px] text-muted-foreground">
          Skin fade · 45 min · with Marcus
        </p>
      </div>
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        Thursday
      </p>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {slots.map((t, i) => (
          <span
            key={t}
            className={cn(
              "rounded-full border border-border py-2 text-center font-mono text-[10px]",
              i === 1 && "border-transparent",
            )}
            style={
              i === 1
                ? {
                    background: "var(--glow)",
                    color: "oklch(0.985 0.005 285)",
                    boxShadow: "0 0 18px oklch(0.585 0.23 285 / 0.35)",
                  }
                : undefined
            }
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-auto flex flex-col gap-2">
        <div className="lux-chip self-start">
          <span className="lux-chip-dot" />
          Confirmed instantly
        </div>
        <div className="rounded-full py-2.5 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/90 border border-border">
          Book Thursday · 2:30
        </div>
      </div>
    </PhoneFrame>
  );
}

/* ─── store links ───────────────────────────────────────────── */

/*
 * Set a URL here and its badge becomes a live link; leave it null and the
 * badge renders as "Coming soon". Verified 2026-08-02: neither app is
 * published — play.google.com 404s for both package ids and there is no
 * App Store listing — so shipping real-looking buttons would send people to
 * a dead end.
 *
 *   Play:      https://play.google.com/store/apps/details?id=<package>
 *   App Store: https://apps.apple.com/app/id<numeric app id from App Store Connect>
 */
const STORE_LINKS: Record<
  "business" | "booking",
  { ios: string | null; android: string | null }
> = {
  business: { ios: null, android: null }, // com.theluxmirror.app
  booking: { ios: null, android: null }, // com.theluxmirror.booking
};

function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-5 shrink-0" fill="currentColor">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function PlayMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-5 shrink-0" fill="currentColor">
      <path d="M3.6 2.1C3.24 2.33 3 2.74 3 3.27v17.46c0 .53.24.94.6 1.17l9.2-9.9L3.6 2.1zm10.7 8.63 2.9-3.12-9.9-5.55a1.3 1.3 0 0 0-.55-.16l7.55 8.83zm0 2.54-7.55 8.83c.19-.02.38-.07.55-.16l9.9-5.55-2.9-3.12zm3.98-4.28-2.2 2.37-2.13 2.65 2.13 2.64 2.2 2.37 2.6-1.46c.55-.31.92-.85.92-1.49v-4.13c0-.64-.37-1.18-.92-1.49l-2.6-1.46z" />
    </svg>
  );
}

function StoreButton({
  href,
  icon,
  label,
  sub,
}: {
  href: string | null;
  icon: React.ReactNode;
  label: string;
  sub: string;
}) {
  const inner = (
    <>
      {icon}
      <span className="flex flex-col items-start leading-tight">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] opacity-70">
          {href ? sub : "Coming soon"}
        </span>
        <span className="text-sm font-medium">{label}</span>
      </span>
    </>
  );

  const shape =
    "inline-flex items-center gap-3 rounded-xl border px-4 py-2.5 transition-colors";

  // Unpublished apps get a real disabled control, not a link to nowhere —
  // aria-disabled keeps it announced correctly to screen readers.
  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(shape, "border-border bg-foreground text-background hover:opacity-90")}
    >
      {inner}
    </a>
  ) : (
    <span
      aria-disabled="true"
      className={cn(shape, "cursor-default border-border text-muted-foreground opacity-70")}
    >
      {inner}
    </span>
  );
}

function AppDownloadCard({
  wordmark,
  name,
  pitch,
  links,
  detailHref,
}: {
  wordmark: string;
  name: string;
  pitch: string;
  links: { ios: string | null; android: string | null };
  detailHref: string;
}) {
  return (
    <div className="flex flex-col gap-5 bg-surface p-8 sm:p-10">
      <p className="eyebrow">{wordmark}</p>
      <h2 className="display text-3xl sm:text-4xl">{name}</h2>
      <p className="text-base leading-relaxed text-muted-foreground" style={{ maxWidth: "30rem" }}>
        {pitch}
      </p>

      <div className="mt-auto flex flex-col gap-4 pt-2">
        <div className="flex flex-wrap gap-3">
          <StoreButton href={links.ios} icon={<AppleMark />} label="App Store" sub="Download on the" />
          <StoreButton href={links.android} icon={<PlayMark />} label="Google Play" sub="Get it on" />
        </div>
        <a
          href={detailHref}
          className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          What it does ↓
        </a>
      </div>
    </div>
  );
}

/* ─── per-app hero ──────────────────────────────────────────── */

type Cta = { href: string; label: string; primary?: boolean };

/*
 * One marketing hero per app: wordmark, benefit headline, lead, the wall-menu
 * feature list, availability, and CTAs — with the phone opposite. `tone`
 * flips the band between silvered paper and smoked glass so the two apps read
 * as distinct products rather than two paragraphs of the same page.
 */
function AppHero({
  id,
  wordmark,
  headline,
  lead,
  features,
  note,
  ctas,
  phone,
  tone = "light",
  reversed = false,
}: {
  id: string;
  wordmark: string;
  headline: React.ReactNode;
  lead: string;
  features: ReadonlyArray<{ label: string; value: string }>;
  note: string;
  ctas: Cta[];
  phone: React.ReactNode;
  tone?: "light" | "dark";
  reversed?: boolean;
}) {
  const dark = tone === "dark";
  return (
    <section
      id={id}
      className={cn(
        // scroll-mt clears the sticky header when jumped to from the hero.
        "relative scroll-mt-16 overflow-hidden border-b border-border",
        dark ? "dark bg-background" : "bg-surface",
      )}
    >
      {dark && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 65% at 22% 90%, oklch(0.585 0.23 285 / 0.18), transparent 70%)",
          }}
        />
      )}

      <div className="feature-split relative mx-auto w-full max-w-7xl gap-16 px-6 py-24 sm:py-32 lg:items-center">
        {/* text-foreground on the column, not per-element: <body> sets the
            light-mode ink and children inherit that COMPUTED value, so inside
            a .dark band anything without its own colour utility disappears.
            Descendants that set text-muted-foreground still win. */}
        <div className={cn("text-foreground", reversed && "lg:order-2")}>
          <p className="eyebrow text-foreground">{wordmark}</p>

          <h2
            className="display mt-6"
            style={{ fontSize: "clamp(2.25rem, 4.4vw, 3.75rem)", maxWidth: "15ch" }}
          >
            {headline}
          </h2>

          <p
            className="mt-7 text-lg leading-relaxed text-muted-foreground"
            style={{ maxWidth: "34rem" }}
          >
            {lead}
          </p>

          <div className="mt-10 flex flex-col gap-4" style={{ maxWidth: "34rem" }}>
            {features.map((f) => (
              <div key={f.label} className="menu-row">
                <span className="menu-label">{f.label}</span>
                <span className="menu-dots" />
                <span className="menu-value">{f.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <span className="lux-chip">
              <span className="lux-chip-dot" />
              In private beta with pilot salons
            </span>
            <p className="text-sm text-muted-foreground">{note}</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {ctas.map((cta) => (
              <Link
                key={cta.href}
                href={cta.href}
                className={cn(
                  buttonVariants({
                    variant: cta.primary ? "default" : "outline",
                    size: "lg",
                  }),
                  "h-12 w-fit rounded-full px-7 text-sm font-medium",
                  // Outline inherits text colour; inside a .dark band the
                  // inherited value is light-mode ink and the label vanishes.
                  !cta.primary && "text-foreground",
                )}
              >
                {cta.label}
                {cta.primary && <ArrowUpRight className="ml-1.5 size-4" />}
              </Link>
            ))}
          </div>
        </div>

        {/* Copy leads on mobile for both apps; `reversed` only swaps columns
            once there are actually two of them. */}
        <div className={cn("mt-16 lg:mt-0", reversed && "lg:order-1")}>{phone}</div>
      </div>
    </section>
  );
}

/* ─── page ──────────────────────────────────────────────────── */

export default function AppsPage() {
  return (
    <div className="flex flex-1 flex-col">
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-7xl px-6 pt-20 pb-16 sm:pt-24 sm:pb-20">
          <p className="eyebrow mb-6">The apps · LUX</p>
          <h1
            className="display"
            style={{ fontSize: "clamp(2.4rem, 5.2vw, 4.25rem)", maxWidth: "20ch" }}
          >
            One system.{" "}
            <span className="text-muted-foreground">
              Two <em>apps.</em>
            </span>
          </h1>

          {/* Both apps above the fold with their store links — the page's job
              is to get people to a download, not to explain first. */}
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-border lg:grid-cols-2">
            <AppDownloadCard
              wordmark="For owners & teams"
              name="LUX Business"
              pitch="Run the shop: bookings, clients, team schedules, and every mirror on your floor."
              links={STORE_LINKS.business}
              detailHref="#lux-business"
            />
            <AppDownloadCard
              wordmark="For their clients"
              name="LUX Booking"
              pitch="Let clients find you, book themselves in, check in on arrival, and keep every look."
              links={STORE_LINKS.booking}
              detailHref="#lux-booking"
            />
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Both apps are in private beta with pilot salons — the store links go
            live with the first fleet.
          </p>
        </div>
      </section>

      {/* ── LUX BUSINESS ─────────────────────────────────── */}
      <AppHero
        id="lux-business"
        wordmark="LUX Business · for owners & teams"
        headline={
          <>
            The whole shop,
            <br />
            <span className="text-muted-foreground">
              in one <em>app.</em>
            </span>
          </>
        }
        lead="A calendar that fills itself, client profiles with every look you've cut, schedules and permissions for the team, and — when you add the hardware — every mirror on the floor, paired with a QR scan and managed from your pocket. No mirror required to start."
        features={businessFeatures}
        note="App Store & Google Play — arriving with the first fleet."
        ctas={[
          { href: "/shop", label: "Reserve a mirror", primary: true },
          { href: "/pricing", label: "See pricing" },
        ]}
        phone={<BusinessPhone />}
      />

      {/* ── LUX BOOKING ──────────────────────────────────── */}
      <AppHero
        id="lux-booking"
        tone="dark"
        reversed
        wordmark="LUX Booking · for their clients"
        headline={
          <>
            Your clients,
            <br />
            <span className="text-muted-foreground">
              booking <em>themselves.</em>
            </span>
          </>
        }
        lead="The booking app your clients will actually keep: real openings from your real calendar, rescheduling without the phone tag, self check-in on arrival — and after the visit, the photos your mirror took of the finished look, saved to their profile."
        features={bookingFeatures}
        note="Free for clients, always."
        ctas={[
          { href: "/contact", label: "Ask about early access", primary: true },
          { href: "/faq", label: "Common questions" },
        ]}
        phone={<BookingPhone />}
      />

      {/* ── BETTER TOGETHER ──────────────────────────────── */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32">
          <div className="mb-14 max-w-2xl">
            <p className="eyebrow mb-5">Better together</p>
            <h2 className="display text-4xl sm:text-5xl lg:text-6xl">
              Shop, client, mirror.
            </h2>
          </div>

          <ul className="grid gap-px overflow-hidden rounded-2xl bg-border lg:grid-cols-3">
            {together.map((t) => (
              <li key={t.label} className="flex flex-col gap-5 bg-background p-8 sm:p-10">
                <span className="eyebrow">{t.label}</span>
                <h3 className="display text-2xl sm:text-3xl">{t.title}</h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {t.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="dark relative overflow-hidden bg-background">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 70% at 82% 100%, oklch(0.585 0.23 285 / 0.16), transparent 70%)",
          }}
        />
        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-6 py-32 sm:py-44 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p
              className="eyebrow mb-7"
              style={{ color: "oklch(0.96 0.004 250 / 0.35)" }}
            >
              Get in early
            </p>
            <h2 className="display text-foreground text-5xl sm:text-6xl lg:text-7xl">
              The apps arrive
              <br />
              <span className="text-muted-foreground">
                with the <em>fleet.</em>
              </span>
            </h2>
          </div>
          <div className="flex flex-col gap-5 lg:col-span-5 lg:items-end">
            <div className="flex flex-wrap gap-3">
              <Link
                href="/shop"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "h-12 w-fit rounded-full px-7 text-sm font-medium",
                )}
              >
                Reserve a mirror
                <ArrowUpRight className="ml-1.5 size-4" />
              </Link>
              <Link
                href="/pricing"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  // Outline variant inherits text color; inside this .dark
                  // scope the inherited body color is light-mode ink — force
                  // the scoped foreground or the label vanishes.
                  "h-12 w-fit rounded-full px-7 text-sm font-medium text-foreground",
                )}
              >
                See pricing
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              Ships Q4 2026 · Reserving a mirror includes early app access.
            </p>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "MobileApplication",
              name: "LUX Business",
              operatingSystem: "iOS, Android",
              applicationCategory: "BusinessApplication",
              description:
                "Salon management for owners and teams: bookings, clients, team schedules, and LUX Mirror fleet management.",
              publisher: { "@type": "Organization", name: "LUX Mirror" },
            },
            {
              "@context": "https://schema.org",
              "@type": "MobileApplication",
              name: "LUX Booking",
              operatingSystem: "iOS, Android",
              applicationCategory: "LifestyleApplication",
              description:
                "Book salons and barbers: real-time openings, self check-in, favorites, and mirror photos of every look.",
              publisher: { "@type": "Organization", name: "LUX Mirror" },
            },
          ]),
        }}
      />
    </div>
  );
}
