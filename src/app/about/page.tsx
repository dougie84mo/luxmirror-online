import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "LUX builds the smart mirror for the modern salon. Our story, our principles, and the people behind the chair.",
};

/* ─── data ──────────────────────────────────────────────────── */

/* House rules — labeled by what each one protects, not a number. */
const principles = [
  {
    label: "Durability",
    title: "The chair is the office.",
    body: "We build for the salon environment first — humidity, motion, repetition, light. If it doesn't survive a Saturday rush, it doesn't ship.",
  },
  {
    label: "Silence",
    title: "Disappear when idle.",
    body: "A mirror should be a mirror until you ask it to be something else. No screensavers, no notifications, no noise. Wake on intent. Sleep on exit.",
  },
  {
    label: "Craft",
    title: "Hands stay on the client.",
    body: "Every interaction is designed around the working stylist. Gestures, not menus. Glances, not screens. Craft, not configuration.",
  },
  {
    label: "Ownership",
    title: "The data is yours.",
    body: "Client previews never leave the salon network without consent. Aggregated insights belong to the business that earned them.",
  },
];

const milestones = [
  {
    year: "2024",
    event: "Founded after a year of weekends in barbershops across the Bay.",
  },
  {
    year: "2025",
    event: "First production mirror installed at a pilot salon in Oakland.",
  },
  {
    year: "Q3 2025",
    event: "12-salon pilot across California and New York wraps.",
  },
  {
    year: "Q4 2026",
    event: "Public reservations open. First fleet ships.",
  },
];

const team = [
  {
    name: "Maya Patel",
    role: "Co-founder · CEO",
    bio: "Built fleet software at Square. Daughter of a hairstylist.",
    src: "/images/stylist-1.svg",
  },
  {
    name: "Theo Okafor",
    role: "Co-founder · CTO",
    bio: "Computer vision at Apple's Vision team. Former barber.",
    src: "/images/stylist-2.svg",
  },
  {
    name: "Renata Vance",
    role: "Head of Design",
    bio: "Hardware design at Teenage Engineering and Snap.",
    src: "/images/stylist-3.svg",
  },
  {
    name: "Sam Liu",
    role: "Head of Salon Success",
    bio: "Twenty years operating multi-location salons.",
    src: "/images/stylist-4.svg",
  },
];

const press = [
  "Vogue Business",
  "Wired",
  "Fast Company",
  "TechCrunch",
  "WWD",
  "Allure",
];

/* ─── page ──────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col">
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-7xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
          <p className="eyebrow mb-6">About · LUX</p>
          <h1
            className="display"
            style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)", maxWidth: "18ch" }}
          >
            We&rsquo;re reimagining
            <br />
            <span className="text-muted-foreground">
              the <em>chair.</em>
            </span>
          </h1>
          <p
            className="mt-7 text-base sm:text-lg leading-relaxed text-muted-foreground"
            style={{ maxWidth: "36rem" }}
          >
            LUX builds the smart mirror for the modern salon — AR styling,
            gesture controls, and fleet management, in one piece of hardware
            that disappears into the room.
          </p>
        </div>
      </section>

      {/* ── STORY ────────────────────────────────────────── */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid w-full max-w-7xl gap-16 px-6 py-24 sm:py-32 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5">The story</p>
            <h2 className="display text-4xl sm:text-5xl lg:text-6xl">
              We started behind the chair.
            </h2>
          </div>

          <div className="flex flex-col gap-7 lg:col-span-7">
            <p className="text-base sm:text-lg leading-relaxed text-foreground/80">
              The mirror is the most-used object in any salon. Every
              consultation, every reveal, every &ldquo;what do you think&rdquo;
              happens in front of it. And yet, in a decade where every other
              surface in the salon — the booking software, the POS, the inventory
              system — has been digitized, the mirror itself has stayed exactly
              the same.
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
              LUX was founded by a hardware designer and a barber who&rsquo;d
              spent a year of weekends sketching what the chair-side computer
              of the future could look like. The answer wasn&rsquo;t a tablet on
              a stand. It wasn&rsquo;t a phone. It was the mirror itself —
              awake when you need it, invisible when you don&rsquo;t.
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
              Two years and twelve pilot salons later, that&rsquo;s the product
              we&rsquo;re shipping.
            </p>
          </div>
        </div>
      </section>

      {/* ── PRINCIPLES ───────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32">
          <div className="mb-14 max-w-2xl">
            <p className="eyebrow mb-5">House rules</p>
            <h2 className="display text-4xl sm:text-5xl lg:text-6xl">
              What we believe.
            </h2>
          </div>

          <ul className="grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2">
            {principles.map((p) => (
              <li
                key={p.label}
                className="flex flex-col gap-5 bg-surface p-8 sm:p-10"
              >
                <span className="eyebrow">{p.label}</span>
                <h3 className="display text-2xl sm:text-3xl">{p.title}</h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── MILESTONES ───────────────────────────────────── */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid w-full max-w-7xl gap-16 px-6 py-24 sm:py-32 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5">Timeline</p>
            <h2 className="display text-4xl sm:text-5xl">
              How we got here.
            </h2>
            <p
              className="mt-7 text-base leading-relaxed text-muted-foreground"
              style={{ maxWidth: "28rem" }}
            >
              From kitchen-table sketches to a production mirror you can
              reserve today.
            </p>
          </div>

          <ol className="lg:col-span-7">
            {milestones.map((m) => (
              <li
                key={m.year}
                className="grid grid-cols-3 gap-6 border-t border-border py-6 last:border-b"
              >
                <p className="eyebrow col-span-1">{m.year}</p>
                <p className="col-span-2 text-base text-foreground/85">
                  {m.event}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32">
          <div className="mb-14 max-w-2xl">
            <p className="eyebrow mb-5">Team</p>
            <h2 className="display text-4xl sm:text-5xl lg:text-6xl">
              The people behind LUX.
            </h2>
          </div>

          <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <li key={m.name} className="flex flex-col gap-5">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-warm ring-1 ring-border">
                  <Image
                    src={m.src}
                    alt={m.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-base font-semibold tracking-tight">
                    {m.name}
                  </p>
                  <p className="eyebrow">{m.role}</p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {m.bio}
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-16 text-sm text-muted-foreground">
            We&rsquo;re a small team in Oakland and remote.{" "}
            <Link
              href="/careers"
              className="underline-offset-4 hover:text-foreground hover:underline"
            >
              See open roles
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ── PRESS ────────────────────────────────────────── */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto w-full max-w-7xl px-6 py-20">
          <p className="eyebrow mb-10 text-center">Featured in</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
            {press.map((name) => (
              <span
                key={name}
                className="font-mono text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground/50"
              >
                {name}
              </span>
            ))}
          </div>
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
              Now reserving
            </p>
            <h2 className="display text-foreground text-5xl sm:text-6xl lg:text-7xl">
              See what we built.
              <br />
              <span className="text-muted-foreground">
                In your <em>salon.</em>
              </span>
            </h2>
          </div>
          <div className="flex flex-col gap-5 lg:col-span-5 lg:items-end">
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
            <p className="text-sm text-muted-foreground">
              Ships Q4 2026 · Risk-free 30-day trial.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
