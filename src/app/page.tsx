import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { HeroMirror } from "@/components/HeroMirror";
import { cn } from "@/lib/utils";

/* ─── data ──────────────────────────────────────────────────── */

/* The house offer, set like the price list on a barbershop wall. */
const houseMenu = [
  { label: "Free shipping", value: "Every mirror, every order" },
  { label: "30-day trial", value: "Bring it into the salon. Not right? Return it." },
  { label: "Lifetime support", value: "Real humans who know the product, same-day" },
];

const features = [
  {
    station: "Vision",
    headline: "See it before\nyou cut it.",
    body: "Hold the vision before you touch the scissors. Live AR previews show cuts, colors, and styles on the client's actual face — in real time. When they see it, they trust it. When they trust it, they book again.",
    src: "/images/ar-styling.svg",
    alt: "Live AR style preview on the LUX mirror",
    dark: true,
  },
  {
    station: "Control",
    headline: "Hands stay where\nthey belong.",
    body: "A wave changes the look. A pinch zooms in. You never break grip, never lose rhythm. LUX reads your movement from across the room — no screens to touch, no apps to navigate.",
    src: "/images/hands-gesture.svg",
    alt: "Stylist controlling LUX hands-free",
    dark: false,
  },
  {
    station: "Fleet",
    headline: "Every mirror.\nOne screen.",
    body: "New mirror paired in under a minute. Updates pushed from your phone. Every station visible, every issue surfaced. Whether it's one chair or fifty, you're always in control.",
    src: "/images/fleet-salon.svg",
    alt: "LUX across every chair in your salon",
    dark: true,
  },
];

const stats = [
  { value: "30%", label: "Faster consultations" },
  { value: "2.4×", label: "Color bookings" },
  { value: "92%", label: "Repeat-visit rate" },
  { value: "<1 min", label: "Setup time" },
];

const specs: [string, string][] = [
  ["Display", "27″ 4K AMOLED"],
  ["Bezel", "Matte aluminum"],
  ["Sensing", "AR depth + IR"],
  ["Power", "USB-C PD, 65W"],
];

const testimonials = [
  {
    name: "Mara Chen",
    role: "Owner, Crown & Comb",
    quote:
      "Booking rate jumped 40% in the first month. Clients see the cut before I make it — they say yes faster.",
    src: "/images/stylist-1.svg",
  },
  {
    name: "Devon Marks",
    role: "Master Barber",
    quote:
      "My consultations went from eight minutes to three. Hands stay on the client the whole time.",
    src: "/images/stylist-2.svg",
  },
  {
    name: "Sarah Ojo",
    role: "Co-founder, Beam Salon",
    quote:
      "We run six chairs. LUX showed me which station was idle on a Saturday — booked it within the hour.",
    src: "/images/stylist-3.svg",
  },
  {
    name: "Ren Halloway",
    role: "Color Specialist",
    quote:
      "Color clients trust the preview. Haven't had a 'this isn't what I asked for' moment in six months.",
    src: "/images/stylist-4.svg",
  },
  {
    name: "James Beresford",
    role: "Senior Stylist",
    quote:
      "Twenty years behind the chair. This is the only piece of tech I reach for every single day.",
    src: "/images/stylist-5.svg",
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

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">

      {/* ── HERO — the mirror wakes ──────────────────────── */}
      <section
        className="dark relative flex flex-col justify-center overflow-hidden bg-background"
        style={{ minHeight: "92vh" }}
      >
        {/* Ambient shop light along the top edge */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(90% 55% at 50% -10%, oklch(0.3 0.04 72 / 0.55), transparent 62%)",
          }}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-[7fr_5fr] lg:gap-8">
          <div className="max-w-2xl">
            <p
              className="eyebrow mb-7"
              style={{ color: "oklch(0.96 0.004 250 / 0.4)" }}
            >
              LUX · Now reserving
            </p>

            <h1
              className="display text-foreground"
              style={{ fontSize: "clamp(2.9rem, 6.6vw, 5.5rem)" }}
            >
              The mirror built
              <br />
              for the <em>chair.</em>
            </h1>

            <p
              className="mt-7 text-base sm:text-lg"
              style={{
                color: "oklch(0.96 0.004 250 / 0.62)",
                maxWidth: "34rem",
                lineHeight: 1.65,
              }}
            >
              AR styling. Gesture controls. Full fleet management.
              One device, on the wall, working as hard as you do.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/shop"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "h-12 rounded-full px-7 text-sm font-medium",
                )}
              >
                Reserve a mirror
                <ArrowUpRight className="ml-1.5 size-4" />
              </Link>
              <a
                href="#the-mirror"
                className="inline-flex h-12 items-center gap-1 text-sm font-medium underline-offset-4 transition-colors hover:underline"
                style={{ color: "oklch(0.96 0.004 250 / 0.5)" }}
              >
                See it wake
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>

            <p
              className="eyebrow mt-8"
              style={{ color: "oklch(0.96 0.004 250 / 0.3)" }}
            >
              30-day trial · Free shipping · Ships Q4 2026
            </p>
          </div>

          <HeroMirror />
        </div>
      </section>

      {/* ── THE HOUSE MENU — trust, set like the wall card ── */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto w-full max-w-4xl px-6 py-14 sm:py-16">
          <ul className="flex flex-col gap-5">
            {houseMenu.map(({ label, value }) => (
              <li key={label} className="menu-row">
                <span className="menu-label">{label}</span>
                <span className="menu-dots" aria-hidden />
                <span className="menu-value">{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── PRODUCT CALLOUT ──────────────────────────────── */}
      <section id="the-mirror" className="border-b border-border">
        <div className="product-split mx-auto w-full max-w-7xl items-stretch gap-0">
          {/* Mirror image panel */}
          <div className="relative" style={{ minHeight: "520px" }}>
            <Image
              src="/images/product-mirror.svg"
              alt="The LUX Mirror — tall full-length smart mirror with thin matte bezel"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          </div>

          {/* Copy panel */}
          <div className="flex flex-col justify-center gap-8 px-8 py-20 lg:px-16 lg:py-28">
            <p className="eyebrow">The mirror</p>

            <h2 className="display text-4xl sm:text-5xl lg:text-6xl">
              One mirror.{" "}
              <span className="text-muted-foreground">
                Built to <em>disappear.</em>
              </span>
            </h2>

            <p
              className="text-base sm:text-lg leading-relaxed text-muted-foreground"
              style={{ maxWidth: "28rem" }}
            >
              27-inch 4K AMOLED behind half-silvered glass. No interface
              when idle — just a mirror. Wake on gesture, sleep on exit.
              Matte aluminum bezel. Hangs on the wall or stands on the floor.
            </p>

            {/* Spec sheet as menu card */}
            <ul className="flex max-w-sm flex-col gap-4 border-t border-border pt-8">
              {specs.map(([label, value]) => (
                <li key={label} className="menu-row">
                  <span className="menu-label">{label}</span>
                  <span className="menu-dots" aria-hidden />
                  <span className="menu-value">{value}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/shop"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "mt-2 h-12 w-fit rounded-full px-7 text-sm font-medium",
              )}
            >
              Reserve yours
              <ArrowUpRight className="ml-1.5 size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURE STATIONS ─────────────────────────────── */}
      {features.map((feature, idx) => {
        const imageLeft = idx % 2 === 0;
        return (
          <section
            key={feature.station}
            className={cn(
              "border-b border-border overflow-hidden",
              feature.dark ? "dark bg-background" : "bg-surface",
            )}
          >
            <div
              className="feature-split w-full items-stretch"
              style={{ minHeight: "600px" }}
            >
              {/* Illustration side */}
              <div
                className={cn("relative", !imageLeft && "lg:order-2")}
                style={{ minHeight: "380px" }}
              >
                <Image
                  src={feature.src}
                  alt={feature.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              </div>

              {/* Copy side */}
              <div
                className={cn(
                  "flex flex-col justify-center gap-7 px-8 py-20 lg:px-16 lg:py-28",
                  !imageLeft && "lg:order-1",
                )}
              >
                <p className="eyebrow">{feature.station}</p>

                {/* text-foreground is required: dark sections re-scope the
                    CSS var, but the inherited color was computed at body
                    level in light mode. */}
                <h2
                  className="display text-foreground text-4xl sm:text-5xl lg:text-6xl"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {feature.headline}
                </h2>

                <p
                  className="text-base sm:text-lg leading-relaxed text-muted-foreground"
                  style={{ maxWidth: "30rem" }}
                >
                  {feature.body}
                </p>

                <Link
                  href="/shop"
                  className={cn(
                    buttonVariants({ variant: "default", size: "default" }),
                    "mt-2 w-fit rounded-full px-6 text-sm font-medium",
                  )}
                >
                  Reserve a mirror
                  <ArrowUpRight className="ml-1.5 size-3.5" />
                </Link>
              </div>
            </div>
          </section>
        );
      })}

      {/* ── STATS ────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32">
          <div className="mb-16">
            <p className="eyebrow mb-5">Early results</p>
            <h2 className="display text-4xl sm:text-5xl lg:text-6xl">
              Hard numbers.{" "}
              <span className="text-muted-foreground">From real chairs.</span>
            </h2>
          </div>

          <dl className="grid grid-cols-2 border-t border-border lg:grid-cols-4">
            {stats.map((stat, idx) => (
              <div
                key={stat.label}
                className={cn(
                  "flex flex-col gap-4 py-12 px-6 sm:px-8 border-border",
                  idx !== 0 && "border-l",
                  idx >= 2 && "border-t lg:border-t-0",
                )}
              >
                <dd
                  className="display leading-none"
                  style={{ fontSize: "clamp(2.75rem, 5vw, 5rem)" }}
                >
                  {stat.value}
                </dd>
                <dt className="eyebrow">{stat.label}</dt>
              </div>
            ))}
          </dl>

          <p
            className="mt-10 text-xs leading-relaxed text-muted-foreground"
            style={{ maxWidth: "32rem" }}
          >
            From early pilot salons. Independent third-party study landing Q3 2026.
          </p>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32">
          <div className="mb-14">
            <p className="eyebrow mb-5">From the chair</p>
            <h2 className="display text-4xl sm:text-5xl lg:text-6xl">
              Hear from the people using it.
            </h2>
          </div>

          <div
            className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6"
            style={{ scrollbarWidth: "none" }}
          >
            {testimonials.map((t) => (
              <article
                key={t.name}
                className="flex w-[88vw] shrink-0 snap-start flex-col justify-between gap-8 rounded-2xl bg-card p-8 ring-1 ring-border sm:w-[420px] lg:w-[440px]"
              >
                <blockquote
                  className="display leading-snug"
                  style={{
                    fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)",
                    /* Small didone settings need the text-optical cut,
                       not the razor display one. */
                    fontVariationSettings: '"opsz" 24',
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-full ring-1 ring-border">
                    <Image
                      src={t.src}
                      alt={t.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold tracking-tight">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRESS STRIP ──────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-7xl px-6 py-14">
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

      {/* ── FINAL CTA ────────────────────────────────────── */}
      <section className="dark relative overflow-hidden bg-background">
        {/* The device's light, one last time */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 70% at 82% 100%, oklch(0.585 0.23 285 / 0.16), transparent 70%)",
          }}
        />
        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-6 py-36 sm:py-48 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p
              className="eyebrow mb-7"
              style={{ color: "oklch(0.96 0.004 250 / 0.35)" }}
            >
              Now reserving
            </p>
            <h2 className="display text-foreground text-5xl sm:text-7xl lg:text-8xl">
              Your salon,
              <br />
              <em className="text-muted-foreground">transformed.</em>
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
