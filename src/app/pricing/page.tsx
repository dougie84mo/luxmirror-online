import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Minus, CircleHelp } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  FAMILY_COPY,
  FAMILY_ORDER,
  annualSaving,
  familyOf,
  formatPlanPrice,
  getPublicPlans,
} from "@/lib/plans";

/* Plans are read live from the catalogue rather than hard-coded — see
 * lib/plans.ts for why. Revalidated hourly so a price change in the admin
 * portal reaches the site without a deploy, while the page still serves
 * statically to crawlers. */
export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: "/pricing" },
  title: "Pricing",
  description:
    "LUX cloud plans for single chairs, growing salons, and multi-location operations. Stripe-backed billing, no contracts.",
};

/* ─── data ──────────────────────────────────────────────────── */

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

const faqs = [
  {
    q: "Why are there two prices?",
    a: "The mirror is a one-time hardware purchase. The LUX cloud — booking, styling, fleet management and updates — is a monthly subscription per business, not per mirror. Software-only plans need no hardware at all.",
  },
  {
    q: "Do I have to buy a mirror to use LUX?",
    a: "No. The Booking plans are software only — calendar, clients, team and payments — and work with no hardware at all. Add a mirror later and you move to a Suite plan, which costs less than the two subscriptions apart.",
  },
  {
    q: "Can I switch plans later?",
    a: "Yes. Upgrades take effect immediately and are pro-rated. Downgrades take effect at the next billing cycle.",
  },
  {
    q: "What is the difference between Booking, Mirror and Suite?",
    a: "Booking is the salon software on its own, priced by how many people are on the floor. Mirror is the device cloud for shops that already have booking software they like. Suite is both together on one bill.",
  },
  {
    q: "Do you offer non-profit or beauty-school pricing?",
    a: "Yes — write us. We support a handful of cosmetology programs every year at a substantial discount.",
  },
];

/* ─── page ──────────────────────────────────────────────────── */

export default async function PricingPage() {
  const plans = await getPublicPlans();

  return (
    <div className="flex flex-1 flex-col">
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-7xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
          <p className="eyebrow mb-6">Pricing</p>
          <h1
            className="display"
            style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)", maxWidth: "20ch" }}
          >
            Buy the mirror.
            <br />
            <span className="text-muted-foreground">
              Subscribe to the <em>cloud.</em>
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

          {/* The whole offer on one wall card */}
          <ul className="mt-12 flex max-w-xl flex-col gap-5">
            <li className="menu-row">
              <span className="menu-label">Hardware</span>
              <span className="menu-dots" aria-hidden />
              <span className="menu-value">from $2,400 · once, per mirror</span>
            </li>
            <li className="menu-row">
              <span className="menu-label">LUX cloud</span>
              <span className="menu-dots" aria-hidden />
              <span className="menu-value">from $15 / month, per business</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ── HARDWARE ─────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32">
          <div className="mb-14 max-w-2xl">
            <p className="eyebrow mb-5">Hardware</p>
            <h2 className="display text-4xl sm:text-5xl lg:text-6xl">
              The mirror.{" "}
              <span className="text-muted-foreground">
                Bought <em>once.</em>
              </span>
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

      {/* ── PLANS (live catalogue) ─────────────────── */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32">
          <div className="mb-14 max-w-2xl">
            <p className="eyebrow mb-5">LUX cloud</p>
            <h2 className="display text-4xl sm:text-5xl lg:text-6xl">
              Software, mirrors,{" "}
              <span className="text-muted-foreground">
                or <em>both.</em>
              </span>
            </h2>
            <p className="mt-7 text-base leading-relaxed text-muted-foreground">
              One subscription per business. Take booking software on its own,
              mirror cloud on its own, or the Suite for both — every plan is
              month-to-month, and annual is billed once a year for less.
            </p>
          </div>

          {FAMILY_ORDER.map((family) => {
            const tiers = plans.filter((p) => familyOf(p) === family);
            if (tiers.length === 0) return null;
            const copy = FAMILY_COPY[family];
            return (
              <div key={family} className="mb-16 last:mb-0">
                <div className="mb-7 max-w-2xl">
                  <p className="eyebrow mb-3">{copy.eyebrow}</p>
                  <h3 className="display text-2xl sm:text-3xl">{copy.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {copy.blurb}
                  </p>
                </div>

                {/* Column count follows the family size — a family can gain a
                    tier from the admin portal, and a hard-coded 3 would strand
                    the fourth card alone on its own row. */}
                <div
                  className={cn(
                    "grid gap-6",
                    tiers.length >= 4
                      ? "sm:grid-cols-2 xl:grid-cols-4"
                      : "lg:grid-cols-3",
                  )}
                >
                  {tiers.map((plan) => {
                    const saving = annualSaving(plan);
                    return (
                      <article
                        key={plan.plan}
                        className={cn(
                          "relative flex flex-col rounded-2xl border p-8",
                          plan.popular
                            ? "border-transparent bg-background ring-2 ring-[var(--glow)]"
                            : "border-border bg-background",
                        )}
                      >
                        {plan.popular && (
                          <span className="lux-chip absolute -top-3 left-8 bg-background">
                            <span className="lux-chip-dot" />
                            Most popular
                          </span>
                        )}

                        <h4 className="display text-2xl">{plan.display_name}</h4>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {plan.tagline}
                        </p>

                        <div className="mt-7 flex items-baseline gap-1.5">
                          <p className="display text-4xl">
                            {formatPlanPrice(plan.monthly_price_cents)}
                          </p>
                          <span className="text-sm text-muted-foreground">/ month</span>
                        </div>
                        <p className="mt-1.5 text-xs text-muted-foreground">
                          or {formatPlanPrice(plan.annual_price_cents)} / year
                          {saving ? ` · ${saving}` : ""}
                        </p>

                        <div className="mt-7 flex flex-col gap-3">
                          {[
                            `${plan.max_team_members} team ${plan.max_team_members === 1 ? "member" : "members"}`,
                            plan.max_devices > 0
                              ? `Up to ${plan.max_devices} ${plan.max_devices === 1 ? "mirror" : "mirrors"}`
                              : "No mirror required",
                            // Locations are uncapped — there is no
                            // max_locations. max_businesses caps separate
                            // tenants (own team, own clients), which is a
                            // franchise concern, not a "how many shops" one.
                            "Unlimited locations",
                            plan.max_businesses > 1
                              ? `Up to ${plan.max_businesses} separate businesses`
                              : null,
                            plan.includes_booking
                              ? "Booking, clients & payments"
                              : "Mirror cloud only",
                          ]
                            .filter((line): line is string => line !== null)
                            .map((line) => (
                            <div key={line} className="flex items-start gap-2.5">
                              <Check className="mt-0.5 size-4 shrink-0 text-foreground/60" />
                              <span className="text-sm">{line}</span>
                            </div>
                          ))}
                        </div>

                        <Link
                          href="/contact"
                          className={cn(
                            buttonVariants({
                              variant: plan.popular ? "default" : "outline",
                              size: "lg",
                            }),
                            "mt-8 h-11 w-full rounded-full text-sm font-medium",
                          )}
                        >
                          Get started
                        </Link>
                      </article>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <p className="mt-12 text-sm text-muted-foreground">
            Prices in USD, billed through Stripe. Month-to-month — no contracts,
            no termination fees.
          </p>
        </div>
      </section>

      {/* ── COMPARE TABLE (live entitlements) ───────────── */}
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32">
          <div className="mb-14 max-w-2xl">
            <p className="eyebrow mb-5">Compare</p>
            <h2 className="display text-4xl sm:text-5xl lg:text-6xl">
              Every plan, side by side.
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-4 pr-4 text-sm font-medium">Plan</th>
                  <th className="py-4 pr-4 text-sm font-medium">Booking software</th>
                  <th className="py-4 pr-4 text-sm font-medium">Team</th>
                  <th className="py-4 pr-4 text-sm font-medium">Mirrors</th>
                  {/* Not "Locations" — locations are unlimited on every plan.
                      This column is separate businesses (tenants). */}
                  <th className="py-4 pr-4 text-sm font-medium">Businesses</th>
                  <th className="py-4 pr-4 text-sm font-medium">Monthly</th>
                  <th className="py-4 text-sm font-medium">Annual</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => (
                  <tr key={plan.plan} className="border-b border-border">
                    <td className="py-4 pr-4">
                      <span className="text-sm font-medium">{plan.display_name}</span>
                      <span className="ml-2 text-xs text-muted-foreground">
                        {FAMILY_COPY[familyOf(plan)].name}
                      </span>
                    </td>
                    <td className="py-4 pr-4">
                      {plan.includes_booking ? (
                        <Check className="size-4 text-foreground" aria-label="Included" />
                      ) : (
                        <Minus className="size-4 text-foreground/30" aria-label="Not included" />
                      )}
                    </td>
                    <td className="py-4 pr-4 text-sm">{plan.max_team_members}</td>
                    <td className="py-4 pr-4 text-sm">
                      {plan.max_devices > 0 ? plan.max_devices : "—"}
                    </td>
                    <td className="py-4 pr-4 text-sm">{plan.max_businesses}</td>
                    <td className="py-4 pr-4 text-sm">
                      {formatPlanPrice(plan.monthly_price_cents)}
                    </td>
                    <td className="py-4 text-sm">
                      {formatPlanPrice(plan.annual_price_cents)}
                    </td>
                  </tr>
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
              Start free
            </p>
            <h2 className="display text-foreground text-5xl sm:text-6xl lg:text-7xl">
              Try LUX for 14 days.
              <br />
              <span className="text-muted-foreground">
                No card <em>required.</em>
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
