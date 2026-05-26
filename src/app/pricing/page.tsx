import type { Metadata } from "next";
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
    price: "$49",
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
    price: "$39",
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
    q: "Does pricing include the hardware?",
    a: "No. Mirrors are sold one-time on the Shop page. The plan covers the LUX cloud — AR styling, fleet management, integrations, support.",
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
          <p className="eyebrow mb-6">Pricing · LUX cloud</p>
          <h1
            className="display text-5xl sm:text-7xl lg:text-8xl"
            style={{ maxWidth: "20ch" }}
          >
            Built for every chair.
            <br />
            <span className="text-muted-foreground">Priced per mirror.</span>
          </h1>
          <p
            className="mt-7 text-base sm:text-lg leading-relaxed text-muted-foreground"
            style={{ maxWidth: "36rem" }}
          >
            Hardware is sold once. The cloud — AR styling, fleet management,
            updates — is a monthly subscription. Cancel anytime.
          </p>
        </div>
      </section>

      {/* ── PLAN CARDS ───────────────────────────────────── */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32">
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
                  <>
                    <tr key={`${group.title}-head`} className="bg-surface">
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
                  </>
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
