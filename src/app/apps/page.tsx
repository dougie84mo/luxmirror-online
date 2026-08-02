import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
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
    <div className="relative mx-auto w-full" style={{ maxWidth: "290px" }}>
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

/* ─── page ──────────────────────────────────────────────────── */

export default function AppsPage() {
  return (
    <div className="flex flex-1 flex-col">
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-7xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
          <p className="eyebrow mb-6">The apps · LUX</p>
          <h1
            className="display"
            style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)", maxWidth: "18ch" }}
          >
            One system.
            <br />
            <span className="text-muted-foreground">
              Two <em>apps.</em>
            </span>
          </h1>
          <p
            className="mt-7 text-base sm:text-lg leading-relaxed text-muted-foreground"
            style={{ maxWidth: "38rem" }}
          >
            LUX Business is how the shop runs — bookings, clients, team, and the
            mirror fleet. LUX Booking is how clients find you and book
            themselves in. Same platform, same live calendar, two front doors.
          </p>
        </div>
      </section>

      {/* ── LUX BUSINESS ─────────────────────────────────── */}
      <section className="border-b border-border bg-surface">
        <div className="feature-split mx-auto w-full max-w-7xl gap-16 px-6 py-24 sm:py-32 lg:items-center">
          <div>
            <p className="eyebrow mb-5">For owners &amp; teams</p>
            <h2 className="display text-4xl sm:text-5xl lg:text-6xl">
              LUX Business
            </h2>
            <p
              className="mt-7 text-base sm:text-lg leading-relaxed text-muted-foreground"
              style={{ maxWidth: "34rem" }}
            >
              The whole shop in one app: a calendar that fills itself, client
              profiles with every look you&rsquo;ve cut, schedules and
              permissions for the team, and — when you add the hardware — every
              mirror on the floor, paired with a QR scan and managed from your
              pocket. No mirror required to start.
            </p>

            <div className="mt-10 flex flex-col gap-4" style={{ maxWidth: "34rem" }}>
              {businessFeatures.map((f) => (
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
              <p className="text-sm text-muted-foreground">
                App Store &amp; Google Play — arriving with the first fleet.
              </p>
            </div>
          </div>

          <div className="mt-16 lg:mt-0">
            <BusinessPhone />
          </div>
        </div>
      </section>

      {/* ── LUX BOOKING ──────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="feature-split mx-auto w-full max-w-7xl gap-16 px-6 py-24 sm:py-32 lg:items-center">
          {/* Copy first in DOM for mobile; phone leads on desktop. */}
          <div className="order-2 mt-16 lg:order-1 lg:mt-0">
            <BookingPhone />
          </div>

          <div className="order-1 lg:order-2">
            <p className="eyebrow mb-5">For their clients</p>
            <h2 className="display text-4xl sm:text-5xl lg:text-6xl">
              LUX Booking
            </h2>
            <p
              className="mt-7 text-base sm:text-lg leading-relaxed text-muted-foreground"
              style={{ maxWidth: "34rem" }}
            >
              The booking app your clients will actually keep: real openings
              from your real calendar, rescheduling without the phone tag,
              self check-in on arrival — and after the visit, the photos your
              mirror took of the finished look, saved to their profile.
            </p>

            <div className="mt-10 flex flex-col gap-4" style={{ maxWidth: "34rem" }}>
              {bookingFeatures.map((f) => (
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
              <p className="text-sm text-muted-foreground">
                Free for clients, always.
              </p>
            </div>
          </div>
        </div>
      </section>

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
