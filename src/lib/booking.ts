import { cache } from "react";

/*
 * Server-only data layer for the public booking page (/book/[businessId]).
 *
 * Talks to the shared Supabase project over PostgREST with the publishable
 * key — anonymous, read-only, business-scoped RPCs only (the same contract
 * the customer app consumes). Deliberately no supabase-js: these are plain
 * POST calls from Server Components, and RLS blocks anon from reading the
 * underlying tables directly.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export type BusinessHeader = {
  id: string;
  name: string;
  type: string | null;
  logo_url: string | null;
  description: string | null;
  avg_rating: number | null;
  review_count: number;
};

export type PublicService = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  duration: number;
  category: string | null;
};

export type PublicLocation = {
  id: string;
  name: string | null;
  street: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  phone_number: string | null;
  timezone: string | null;
};

export type PublicProvider = {
  id: string;
  name: string;
  avatar_path: string | null;
};

export type BookingPolicy = {
  cancellation_window_hours: number | null;
  no_show_fee: number | null;
  late_cancel_fee: number | null;
  cancellation_policy: string | null;
  deposit_type: string | null;
  deposit_value: number | null;
  deposit_required: boolean | null;
  deposit_timing: string | null;
};

export type LoyaltyProgram = {
  is_active: boolean;
  reward_every: number | null;
  reward_percent: number | null;
  description: string | null;
};

export type MemberRating = {
  avg_rating: number | null;
  review_count: number;
};

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUuid(value: string): boolean {
  return UUID_RE.test(value);
}

export async function rpc<T>(
  fn: string,
  args: Record<string, unknown>,
): Promise<T[]> {
  if (!SUPABASE_URL || !ANON_KEY) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY",
    );
  }
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: {
      apikey: ANON_KEY,
      Authorization: `Bearer ${ANON_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  });
  if (!res.ok) {
    throw new Error(`RPC ${fn} failed: ${res.status} ${await res.text()}`);
  }
  return (await res.json()) as T[];
}

/*
 * For RPCs that return a scalar (e.g. submit_* functions returning uuid):
 * PostgREST responds with a bare JSON value, not an array.
 */
export async function rpcScalar<T>(
  fn: string,
  args: Record<string, unknown>,
): Promise<T> {
  if (!SUPABASE_URL || !ANON_KEY) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY",
    );
  }
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: {
      apikey: ANON_KEY,
      Authorization: `Bearer ${ANON_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  });
  if (!res.ok) {
    throw new Error(`RPC ${fn} failed: ${res.status} ${await res.text()}`);
  }
  return (await res.json()) as T;
}

/* cache() dedupes across generateMetadata + the page render */
export const getBusinessPublic = cache(
  async (businessId: string): Promise<BusinessHeader | null> => {
    const rows = await rpc<BusinessHeader>("business_public", {
      p_business_id: businessId,
    });
    return rows[0] ?? null;
  },
);

export function getServices(businessId: string) {
  return rpc<PublicService>("business_services_public", {
    p_business_id: businessId,
  });
}

export function getLocations(businessId: string) {
  return rpc<PublicLocation>("business_locations_public", {
    p_business_id: businessId,
  });
}

export function getProviders(businessId: string) {
  return rpc<PublicProvider>("bookable_providers_v2", {
    p_business_id: businessId,
  });
}

export async function getPolicy(
  businessId: string,
): Promise<BookingPolicy | null> {
  const rows = await rpc<BookingPolicy>("business_booking_policy_public", {
    p_business_id: businessId,
  });
  return rows[0] ?? null;
}

export async function getLoyalty(
  businessId: string,
): Promise<LoyaltyProgram | null> {
  const rows = await rpc<LoyaltyProgram>("get_loyalty_program_public", {
    p_business_id: businessId,
  });
  return rows[0] ?? null;
}

export async function getMemberRating(
  businessId: string,
  memberId: string,
): Promise<MemberRating | null> {
  const rows = await rpc<MemberRating>("get_member_rating", {
    p_business_id: businessId,
    p_member_id: memberId,
  });
  return rows[0] ?? null;
}

/*
 * avatar_path is either an absolute URL (seeded data) or a path in the
 * public `avatars` Storage bucket — same passthrough rule as the apps'
 * lib/avatars.ts.
 */
export function avatarUrl(path: string | null): string | null {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SUPABASE_URL}/storage/v1/object/public/avatars/${path}`;
}
