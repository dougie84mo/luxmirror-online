import "server-only";
import { cache } from "react";

import { rpc } from "@/lib/booking";

/*
 * The plan catalogue, read live from `public.plan_limits` via the
 * anon-callable `public_plan_catalog()` RPC (migration 0110).
 *
 * This page used to hard-code its own plan list, and it drifted badly: it was
 * still selling "Starter / Pro / Enterprise" at $29/$59/talk-to-us months
 * after the catalogue became nine plans across three families. Reading the
 * same rows the admin portal edits is the only version that stays true.
 *
 * The RPC returns only purchasable, non-archived plans and deliberately omits
 * our payment-fee columns.
 */

export type PublicPlan = {
  plan: string;
  display_name: string;
  tagline: string;
  perk: string;
  monthly_price_cents: number | null;
  annual_price_cents: number | null;
  currency: string;
  includes_booking: boolean;
  requires_devices: boolean;
  max_businesses: number;
  max_team_members: number;
  max_devices: number;
  popular: boolean;
  sort_order: number;
};

export type PlanFamily = "booking" | "mirror" | "suite";

/* Families are derived from capability, never from the plan key: a plan added
 * from the admin portal tomorrow lands in the right group with no code change.
 *   booking software only .......... Booking
 *   mirrors only, no booking ....... Mirror
 *   both ........................... Suite
 */
export function familyOf(p: PublicPlan): PlanFamily {
  if (p.includes_booking && p.requires_devices) return "suite";
  return p.includes_booking ? "booking" : "mirror";
}

export const FAMILY_COPY: Record<
  PlanFamily,
  { name: string; eyebrow: string; blurb: string }
> = {
  booking: {
    name: "Booking",
    eyebrow: "Software only",
    blurb:
      "Run the shop without any hardware: calendar, clients, team schedules and payments. Priced by how many people you have on the floor.",
  },
  mirror: {
    name: "Mirror",
    eyebrow: "Device cloud",
    blurb:
      "Already have booking software you like? Mirror keeps your LUX hardware updated, monitored and stocked with styles — and leaves your calendar alone.",
  },
  suite: {
    name: "Suite",
    eyebrow: "Both, bundled",
    blurb:
      "Booking and your mirrors on one bill, for less than the two apart. The plan most shops end up on.",
  },
};

export const FAMILY_ORDER: PlanFamily[] = ["booking", "suite", "mirror"];

/** cache() dedupes between generateMetadata and the render. */
export const getPublicPlans = cache(async (): Promise<PublicPlan[]> => {
  const rows = await rpc<PublicPlan>("public_plan_catalog", {});
  return rows.sort((a, b) => a.sort_order - b.sort_order);
});

export function formatPlanPrice(cents: number | null): string {
  if (cents == null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

/** "2 months free" only when the annual price really is a discount. */
export function annualSaving(p: PublicPlan): string | null {
  if (p.monthly_price_cents == null || p.annual_price_cents == null) return null;
  const twelve = p.monthly_price_cents * 12;
  if (p.annual_price_cents >= twelve) return null;
  const monthsFree = Math.round((twelve - p.annual_price_cents) / p.monthly_price_cents);
  return monthsFree >= 1 ? `${monthsFree} months free` : null;
}
