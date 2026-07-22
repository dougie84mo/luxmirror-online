import { Fragment } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Minus, CircleHelp } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "LUX cloud plans for single chairs, growing salons, and multi-location operations. Stripe-backed billing, no contracts.",
};

/* ─── data ──────────────────────────────────────────────────── */

type Plan = {
  id: string;
  name: string;
  eyebrow: string;
  price: string;
  cadence: string;
  blurb: string;
  cta: string;
  ctaHref: string;
  highlights: string[];
  featured?: boolean;
};

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    eyebrow: "Single chair",
    price: "$29",
    cadence: "per mirror / month",
    blurb:
      "Everything one chair needs: AR styling, gesture control, cloud backup.",
    cta: "Start free trial",
    ctaHref: "#",
    highlights: [
      "1 mirror included",
      "AR styling library",
      "Gesture control",
      "Email support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    eyebrow: "Growing salons",
    price: "$59",
    cadence: "per mirror / month",
    blurb:
      "Fleet management, team roles, integrations. Scales as you add chairs.",
    cta: "Reserve a mirror",
    ctaHref: "/shop",
    highlights: [
      "Up to 12 mirrors",
      "Fleet dashboard + roles",
      "Booking + POS integrations",
      "Priority support",
    ],
    featured: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    eyebrow: "Multi-location",
    price: "Talk to us",
    cadence: "volume pricing",
    blurb:
      "Multi-location ops, custom SSO, dedicated success manager.",
    cta: "Contact sales",
    ctaHref: "/contact",
    highlights: [
      "Unlimited mirrors",
      "Multi-location reporting",
      "SSO + audit logs",
      "Dedicated success manager",
    ],
  },
];

type Hardware = {
  id: string;
  name: string;
  eyebrow: string;
  blurb: string;
  price: string;
  cadence: string;
  src: string;
};

const hardware: Hardware[] = [
  {
    id: "lux-27",
    name: "LUX 27",
    eyebrow: "Chair-side",
    blurb: "27″ 4K AMOLED behind half-silvered glass. Wall or floor mount.",
    price: "$2,400",
    cadence: "one-time · per mirror",
    src: "/images/product-mirror.svg",
  },
  {
    id: "lux-full",
    name: "LUX Full-Length",
    eyebrow: "Full-length",
    blurb: "55″ 4K AMOLED for color stations and consultation areas.",
    price: "$3,200",
    cadence: "one-time · per mirror",
    src: "/images/product-mirror.svg",
  },
];

type CompareRow = {
  label: string;
  starter: boolean | string;
  pro: boolean | string;
  enterprise: boolean | string;
};

const compareGroups: { title: string; rows: CompareRow[] }[] = [
  {
    title: "Core",
    rows: [
      { label: "AR styling library", starter: true, pro: true, enterprise: true },
      { label: "Gesture controls", starter: true, pro: true, enterprise: true },
      {
        label: "Cloud backup",
        starter: "30 days",
        pro: "1 year",
        enterprise: "Custom",
      },
      {
        label: "Mirrors per account",
        starter: "1",
        pro: "12",
        enterprise: "Unlimited",
      },
    ],
  },
  {
    title: "Team & ops",
    rows: [
      { label: "Team roles", starter: false, pro: true, enterprise: true },
      {
        label: "Fleet dashboard",
        starter: false,
        pro: true,
        enterprise: true,
      },
      {
        label: "Multi-location reporting",
        starter: false,
        pro: false,
        enterprise: true,
      },
      {
        label: "Booking + POS integrations",
        starter: false,
        pro: true,
        enterprise: true,
      },
    ],
  },
  {
    title: "Security & support",
    rows: [
      {
        label: "SSO / SAML",
        starter: false,
        pro: false,
        enterprise: true,
      },
      {
        label: "Audit logs",
        starter: false,
        pro: false,
        enterprise: true,
      },
      {
        label: "Support",
        starter: "Email",
        pro: "Priority",
        enterprise: "Dedicated CSM",
      },
      {
        label: "Uptime SLA",
        starter: false,
        pro: false,
        enterprise: "99.9%",
      },
    ],
  },
];

const faqs = [
  {
    q: "Why are there two prices?",
    a: "The mirror is a one-time hardware purchase. The LUX cloud — AR styling, fleet management, integrations, updates — is a monthly subscription per mirror. You need both to run the product.",
  },
  {
    q: "Why is Pro more per mirror than Starter?",
    a: "Pro unlocks the fleet dashboard, team roles, booking/POS integrations, and priority support. Starter is a single chair on a single account — Pro is what scales a real salon.",
  },
  {
    q: "Can I switch plans later?",
    a: "Yes. Upgrades take effect immediately and are pro-rated. Downgrades take effect at the next billing cycle.",
  },
  {
    q: "How does the trial work?",
    a: "14 days, full Pro features, no card required. If you don't pick a plan at the end, your account drops to read-only until you do.",
  },
  {
    q: "Do you offer non-profit or beauty-school pricing?",
    a: "Yes — write us. We support a handful of cosmetology programs every year at a substantial discount.",
  },
];

/* ─── helpers ───────────────────────────────────────────────── */

function Cell({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <Check className="size-4 text-foreground" aria-label="Included" />
    );
  }
  if (value === false) {
    return (
      <Minus
        className="size-4 text-foreground/30"
        aria-label="Not included"
      />
    );
  }
  return <span className="text-sm font-medium">{value}</span>;
}

/* ─── page ──────────────────────────────────────────────────── */

export default function PricingPage() {
  return (
    <div className="flex flex-1 flex-col">
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-7xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
          <p className="eyebrow mb-6">Pricing</p>
          <h1
            className="display text-5xl sm:text-7xl lg:text-8xl"
            style={{ maxWidth: "20ch" }}
          >
            Buy the mirror.
            <br />
            <span className="text-muted-foreground">
              Subscribe to the cloud.
            </span>
          </h1>
          <p
            className="mt-7 text-base sm:text-lg leading-relaxed text-muted-foreground"
            style={{ maxWidth: "36rem" }}
          >
            Two costs to plan for: a one-time hardware purchase per mirror,
            and a monthly cloud subscription that powers AR styling, fleet
            management, and updates.
          </p>

          <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2">
            <li className="flex flex-col gap-2 bg-surface p-6 sm:p-8">
              <p className="eyebrow">01 · Hardware</p>
              <p className="text-base text-foreground/85">
                Pay once per mirror. From{" "}
                <span className="font-semibold">$2,400</span>.
              </p>
            </li>
            <li className="flex flex-col gap-2 bg-surface p-6 sm:p-8">
              <p className="eyebrow">02 · LUX cloud</p>
              <p className="text-base text-foreground/85">
                Monthly, per mirror. From{" "}
                <span className="font-semibold">$29 / month</span>.
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* ── HARDWARE ─────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32">
          <div className="mb-14 max-w-2xl">
            <p className="eyebrow mb-5">01 · Hardware</p>
            <h2 className="display text-4xl sm:text-5xl lg:text-6xl">
              The mirror.{" "}
              <span className="text-muted-foreground">Bought once.</span>
            </h2>
            <p
              className="mt-6 text-base leading-relaxed text-muted-foreground"
              style={{ maxWidth: "32rem" }}
            >
              Two formats, both ship pre-calibrated with the mounting kit and
              a one-year hardware warranty. Free shipping, 30-day trial.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {hardware.map((h) => (
              <article
                key={h.id}
                className="flex flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-border"
              >
                <div className="relative" style={{ minHeight: "320px" }}>
                  <Image
                    src={h.src}
                    alt={h.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-col gap-5 p-8 sm:p-10">
                  <div className="flex items-center justify-between gap-4">
                    <p className="eyebrow">{h.eyebrow}</p>
                    <p className="text-sm font-mono text-muted-foreground">
                      {h.cadence}
                    </p>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="display text-3xl sm:text-4xl">{h.name}</h3>
                    <p className="display text-3xl sm:text-4xl">{h.price}</p>
                  </div>
                  <p
                    className="text-base leading-relaxed text-muted-foreground"
                    style={{ maxWidth: "32rem" }}
                  >
                    {h.blurb}
                  </p>
                  <Link
                    href="/shop"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "mt-2 h-12 w-fit rounded-full px-6 text-sm font-medium",
                    )}
                  >
                    View in shop
                    <ArrowUpRight className="ml-1.5 size-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
            Volume discounts available on orders of 6+ mirrors. Financing
            through Stripe Capital.{" "}
            <Link href="/contact" className="underline-offset-4 hover:underline">
              Talk to sales
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ── PLAN CARDS ───────────────────────────────────── */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32">
          <div className="mb-14 max-w-2xl">
            <p className="eyebrow mb-5">02 · LUX cloud</p>
            <h2 className="display text-4xl sm:text-5xl lg:text-6xl">
              The software.{" "}
              <span className="text-muted-foreground">Monthly per mirror.</span>
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.id}
                className={cn(
                  "flex flex-col gap-7 rounded-2xl p-8 sm:p-10",
                  plan.featured
                    ? "dark bg-background text-foreground ring-1 ring-foreground/15"
                    : "bg-card ring-1 ring-border",
                )}
              >
                <div className="flex items-center justify-between">
                  <p className="eyebrow">{plan.eyebrow}</p>
                  {plan.featured && (
                    <span
                      className="font-mono text-[0.6875rem] uppercase tracking-[0.2em]"
                      style={{ color: "oklch(0.97 0.005 85 / 0.5)" }}
                    >
                      Most popular
                    </span>
                  )}
                </div>

                <h2 className="display text-4xl sm:text-5xl">{plan.name}</h2>

                <div className="flex items-baseline gap-2">
                  <p className="display text-4xl sm:text-5xl">{plan.price}</p>
                  <p className="text-sm text-muted-foreground">
                    {plan.cadence}
                  </p>
                </div>

                <p
                  className="text-base leading-relaxed text-muted-foreground"
                  style={{ minHeight: "3.25rem" }}
                >
                  {plan.blurb}
                </p>

                <Link
                  href={plan.ctaHref}
                  className={cn(
                    buttonVariants({
                      variant: plan.featured ? "default" : "outline",
                      size: "lg",
                    }),
                    "h-12 w-full rounded-full px-6 text-sm font-medium",
                  )}
                >
                  {plan.cta}
                  <ArrowUpRight className="ml-1.5 size-4" />
                </Link>

                <ul className="mt-2 flex flex-col gap-3 border-t border-border pt-6 text-sm">
                  {plan.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <Check className="mt-0.5 size-4 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="mt-10 text-xs leading-relaxed text-muted-foreground">
            Prices in USD. Annual billing saves 15%. Cancel anytime — no
            contracts, no termination fees.
          </p>
        </div>
      </section>

      {/* ── COMPARE TABLE ────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32">
          <div className="mb-14 max-w-2xl">
            <p className="eyebrow mb-5">Compare</p>
            <h2 className="display text-4xl sm:text-5xl lg:text-6xl">
              What&rsquo;s in each plan.
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-5 pr-6 text-sm font-semibold tracking-tight">
                    Feature
                  </th>
                  {plans.map((p) => (
                    <th
                      key={p.id}
                      className="py-5 pr-6 text-sm font-semibold tracking-tight"
                    >
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareGroups.map((group) => (
                  <Fragment key={group.title}>
                    <tr className="bg-surface">
                      <td
                        colSpan={4}
                        className="border-y border-border py-3 pr-6"
                      >
                        <p className="eyebrow">{group.title}</p>
                      </td>
                    </tr>
                    {group.rows.map((row) => (
                      <tr
                        key={`${group.title}-${row.label}`}
                        className="border-b border-border"
                      >
                        <td className="py-5 pr-6 text-sm text-foreground/80">
                          {row.label}
                        </td>
                        <td className="py-5 pr-6">
                          <Cell value={row.starter} />
                        </td>
                        <td className="py-5 pr-6">
                          <Cell value={row.pro} />
                        </td>
                        <td className="py-5 pr-6">
                          <Cell value={row.enterprise} />
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
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
              Need a custom quote?{" "}
              <Link
                href="/contact"
                className="underline-offset-4 hover:underline"
              >
                Talk to sales
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

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="dark relative overflow-hidden bg-background">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-32 sm:py-44 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p
              className="eyebrow mb-7"
              style={{ color: "oklch(0.97 0.005 85 / 0.35)" }}
            >
              Start free
            </p>
            <h2 className="display text-foreground text-5xl sm:text-7xl lg:text-8xl">
              Try LUX for 14 days.
              <br />
              <span className="text-muted-foreground">No card required.</span>
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
              Start free trial
              <ArrowUpRight className="ml-1.5 size-4" />
            </Link>
            <p className="text-sm text-muted-foreground">
              14 days · Full Pro features · Cancel anytime
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
