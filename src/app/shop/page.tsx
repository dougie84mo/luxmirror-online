import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CircleHelp } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Reserve a LUX Smart Mirror for your salon. One mirror, every chair, lifetime support.",
};

/* ─── data ──────────────────────────────────────────────────── */

const variants = [
  {
    id: "lux-27",
    name: "LUX 27",
    eyebrow: "Most popular",
    blurb: "The chair-side mirror. 27-inch 4K AMOLED behind half-silvered glass.",
    price: "$2,400",
    cadence: "one-time · per mirror",
    src: "/images/product-mirror.svg",
    alt: "LUX 27 — chair-side smart mirror",
    menu: [
      ["Display", "27″ 4K AMOLED"],
      ["Bezel", "Matte aluminum"],
      ["Mount", "Wall or floor"],
      ["Sensing", "AR + IR depth"],
    ] as [string, string][],
  },
  {
    id: "lux-full",
    name: "LUX Full-Length",
    eyebrow: "New",
    blurb:
      "Full-length styling mirror for color stations and consultation areas.",
    price: "$3,200",
    cadence: "one-time · per mirror",
    src: "/images/product-mirror.svg",
    alt: "LUX Full-Length — full-length smart mirror",
    menu: [
      ["Display", "55″ 4K AMOLED"],
      ["Stance", "Floor-standing"],
      ["Capture", "Wide-angle AR"],
      ["Glass", "Premium tempered"],
    ] as [string, string][],
  },
];

/* What ships with every mirror — set like the card on the wall. */
const includes: [string, string][] = [
  ["Mirror + bezel", "Pre-calibrated. Boots into mirror mode on first power."],
  ["Mounting kit", "Wall plate, anchors, level. Floor stand on the Full-Length."],
  ["Free shipping", "Insured, white-glove delivery. Tracking from dispatch."],
  ["1-year warranty", "Hardware coverage. Extendable with LUX Care."],
];

const specs: [string, string][] = [
  ["Display", "27″ / 55″ 4K AMOLED"],
  ["Bezel", "Matte aluminum, 6 mm"],
  ["Sensing", "AR depth + IR array"],
  ["Audio", "Stereo 2 × 8 W, beamformed mics"],
  ["Network", "Wi-Fi 6E · Bluetooth 5.3 · Ethernet"],
  ["Power", "USB-C PD, 65 W (LUX 27) · 120 W (Full-Length)"],
  ["Weight", "9.2 kg / 18.7 kg"],
  ["Cloud", "LUX subscription required (see Pricing)"],
];

const addOns = [
  {
    name: "LUX Care",
    blurb: "Extended warranty + advance-replacement on hardware.",
    price: "$12 / month",
  },
  {
    name: "Articulating wall mount",
    blurb: "Tilt and swing arm for tight stations.",
    price: "$180",
  },
  {
    name: "Color-calibration probe",
    blurb: "Recommended for color specialists. Quarterly calibration cycle.",
    price: "$240",
  },
];

const faqs = [
  {
    q: "When do mirrors ship?",
    a: "Reservations are filling for Q4 2026 delivery. Your card isn't charged until the unit is dispatched.",
  },
  {
    q: "Is the LUX subscription required?",
    a: "Yes. The mirror needs the LUX cloud for AR styling, fleet management, and updates. See Pricing for plan details.",
  },
  {
    q: "What's the return policy?",
    a: "30 days, no questions. We pay return shipping. Try it in the salon — if it isn't right, send it back.",
  },
  {
    q: "Can I run a single mirror, or do I need a fleet?",
    a: "Both work. The Starter plan covers a single chair; Pro and Enterprise scale to multi-location operations.",
  },
];

/* ─── page ──────────────────────────────────────────────────── */

export default function ShopPage() {
  return (
    <div className="flex flex-1 flex-col">
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-7xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
          <p className="eyebrow mb-6">Shop · Now reserving</p>
          <h1
            className="display"
            style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)", maxWidth: "20ch" }}
          >
            One mirror.{" "}
            <span className="text-muted-foreground">
              Every <em>chair.</em>
            </span>
          </h1>
          <p
            className="mt-7 text-base sm:text-lg leading-relaxed text-muted-foreground"
            style={{ maxWidth: "36rem" }}
          >
            The LUX Smart Mirror is sold as a single hardware unit paired with
            the LUX cloud subscription. Reserve one for a chair-side trial, or
            kit out your whole salon.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="#variants"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "h-12 rounded-full px-7 text-sm font-medium",
              )}
            >
              See the mirrors
              <ArrowUpRight className="ml-1.5 size-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex h-12 items-center gap-1 text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              View pricing
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── VARIANTS ─────────────────────────────────────── */}
      <section id="variants" className="border-b border-border bg-surface">
        <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32">
          <div className="mb-14 max-w-2xl">
            <p className="eyebrow mb-5">The mirrors</p>
            <h2 className="display text-4xl sm:text-5xl lg:text-6xl">
              Two formats.{" "}
              <span className="text-muted-foreground">One system.</span>
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {variants.map((v) => (
              <article
                key={v.id}
                className="flex flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-border"
              >
                <div className="relative" style={{ minHeight: "420px" }}>
                  <Image
                    src={v.src}
                    alt={v.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-col gap-6 p-8 sm:p-10">
                  <div className="flex items-center justify-between gap-4">
                    <p className="eyebrow">{v.eyebrow}</p>
                    <p className="text-sm font-mono text-muted-foreground">
                      {v.cadence}
                    </p>
                  </div>

                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="display text-3xl sm:text-4xl">{v.name}</h3>
                    <p className="display text-3xl sm:text-4xl">{v.price}</p>
                  </div>

                  <p
                    className="text-base leading-relaxed text-muted-foreground"
                    style={{ maxWidth: "32rem" }}
                  >
                    {v.blurb}
                  </p>

                  {/* Each format gets its own wall-menu card */}
                  <ul className="flex flex-col gap-4 border-t border-border pt-6">
                    {v.menu.map(([label, value]) => (
                      <li key={label} className="menu-row">
                        <span className="menu-label">{label}</span>
                        <span className="menu-dots" aria-hidden />
                        <span className="menu-value">{value}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="#reserve"
                    className={cn(
                      buttonVariants({ variant: "default", size: "lg" }),
                      "mt-2 h-12 w-fit rounded-full px-7 text-sm font-medium",
                    )}
                  >
                    Reserve {v.name}
                    <ArrowUpRight className="ml-1.5 size-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ──────────────────────────────── */}
      <section className="border-b border-border">
        <div className="mx-auto grid w-full max-w-7xl gap-16 px-6 py-24 sm:py-32 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5">In the box</p>
            <h2 className="display text-4xl sm:text-5xl">
              Everything you need.{" "}
              <span className="text-muted-foreground">
                Nothing you don&rsquo;t.
              </span>
            </h2>
          </div>

          <ul className="flex flex-col gap-6 lg:col-span-7 lg:pt-2">
            {includes.map(([label, body]) => (
              <li key={label} className="flex flex-col gap-2">
                <div className="menu-row">
                  <span className="menu-label">{label}</span>
                  <span className="menu-dots" aria-hidden />
                  <span className="menu-value">Included</span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── SPECS ────────────────────────────────────────── */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid w-full max-w-7xl gap-16 px-6 py-24 sm:py-32 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5">Specs</p>
            <h2 className="display text-4xl sm:text-5xl">
              Built to last.{" "}
              <span className="text-muted-foreground">
                Designed to <em>vanish.</em>
              </span>
            </h2>
            <p
              className="mt-7 text-base leading-relaxed text-muted-foreground"
              style={{ maxWidth: "30rem" }}
            >
              Every panel, every sensor, every line of code is tuned for a salon
              environment — humidity, heat, motion, repetition.
            </p>
          </div>

          <ul className="flex flex-col gap-5 lg:col-span-7 lg:pt-2">
            {specs.map(([label, value]) => (
              <li key={label} className="menu-row">
                <span className="menu-label">{label}</span>
                <span className="menu-dots" aria-hidden />
                <span className="menu-value">{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── ADD-ONS ──────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32">
          <div className="mb-14 max-w-2xl">
            <p className="eyebrow mb-5">Add-ons</p>
            <h2 className="display text-4xl sm:text-5xl lg:text-6xl">
              Tune it for the room.
            </h2>
          </div>

          {/* The add-on card is a literal price list — set it like one. */}
          <ul className="max-w-3xl">
            {addOns.map((a) => (
              <li
                key={a.name}
                className="flex flex-col gap-2 border-t border-border py-6 last:border-b"
              >
                <div className="menu-row">
                  <span className="menu-label">{a.name}</span>
                  <span className="menu-dots" aria-hidden />
                  <span className="menu-value">{a.price}</span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {a.blurb}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid w-full max-w-7xl gap-16 px-6 py-24 sm:py-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-5">FAQ</p>
            <h2 className="display text-4xl sm:text-5xl">
              Questions, answered.
            </h2>
            <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <CircleHelp className="size-4" />
              Still stuck?{" "}
              <Link
                href="/contact"
                className="underline-offset-4 hover:underline"
              >
                Talk to us
              </Link>
            </p>
          </div>

          <dl className="lg:col-span-8">
            {faqs.map((f) => (
              <div
                key={f.q}
                className="grid gap-3 border-t border-border py-7 last:border-b sm:grid-cols-3 sm:gap-8"
              >
                <dt className="text-sm font-semibold tracking-tight sm:col-span-1">
                  {f.q}
                </dt>
                <dd className="text-sm leading-relaxed text-muted-foreground sm:col-span-2">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── RESERVATION CTA ──────────────────────────────── */}
      <section
        id="reserve"
        className="dark relative overflow-hidden bg-background"
      >
        {/* The device's light, waiting at the bottom of the glass */}
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
              Now reserving
            </p>
            <h2 className="display text-foreground text-5xl sm:text-6xl lg:text-7xl">
              Hold your mirror.
              <br />
              <span className="text-muted-foreground">
                Pay when it <em>ships.</em>
              </span>
            </h2>
          </div>
          <div className="flex flex-col gap-5 lg:col-span-5 lg:items-end">
            <Link
              href="#"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "h-12 w-fit rounded-full px-7 text-sm font-medium",
              )}
            >
              Reserve a mirror
              <ArrowUpRight className="ml-1.5 size-4" />
            </Link>
            <p className="text-sm text-muted-foreground">
              $0 today · Ships Q4 2026 · 30-day trial
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
