import "server-only";

/*
 * Server-only Stripe REST helper for the reservation deposit. Deliberately
 * no stripe npm dependency — same lean ethos as booking.ts. Only ever
 * imported from Server Actions; STRIPE_SECRET_KEY must never reach a
 * client component.
 */

const STRIPE_API = "https://api.stripe.com/v1";

function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

/*
 * Test/live selection. STRIPE_MODE picks between two secret keys that both live
 * in the env, so switching is a one-word edit rather than swapping a key in and
 * out of a single slot. STRIPE_SECRET_KEY still works on its own for an
 * un-migrated env (and is what production sets today).
 *
 * Read at call time, not module scope — Next dev-server reloads pick up an edited
 * .env.local without a restart, and a module-scope const would cache the old one.
 */
export type StripeMode = "test" | "live";

export function stripeMode(): StripeMode {
  return process.env.STRIPE_MODE === "live" ? "live" : "test";
}

function secretKey(): string {
  const mode = stripeMode();
  const key =
    (mode === "live"
      ? process.env.STRIPE_SECRET_KEY_LIVE
      : process.env.STRIPE_SECRET_KEY_TEST) || process.env.STRIPE_SECRET_KEY;

  if (!key) {
    throw new Error(
      `Missing Stripe secret key for ${mode} mode — set STRIPE_SECRET_KEY_${mode.toUpperCase()} ` +
        `(or STRIPE_SECRET_KEY) in .env.local`,
    );
  }

  // A key that contradicts the declared mode is a hard error, in both
  // directions: a live key under STRIPE_MODE=test charges real cards during a
  // test run, and a test key under STRIPE_MODE=live takes fake money from a real
  // customer. Failing the request is strictly better than either.
  const expected = mode === "live" ? "sk_live_" : "sk_test_";
  if (!key.startsWith(expected)) {
    throw new Error(
      `STRIPE_MODE=${mode} but the resolved secret key starts "${key.slice(0, 8)}…" ` +
        `— expected ${expected}. Refusing to call Stripe against the wrong environment.`,
    );
  }
  return key;
}

async function stripeForm<T>(
  path: string,
  params: Record<string, string>,
): Promise<T> {
  const res = await fetch(`${STRIPE_API}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey()}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(params).toString(),
  });
  if (!res.ok) {
    throw new Error(`Stripe ${path} failed: ${res.status} ${await res.text()}`);
  }
  return (await res.json()) as T;
}

/* Resolved once per server instance — the price is looked up by lookup_key
 * at runtime (no hard-coded price IDs, same convention as the plans).
 *
 * Cached per mode: price IDs are mode-bound, so a cache keyed only by "have we
 * resolved this yet" would hand a test-mode price to a live-mode call after a
 * mode switch. The lookup_key itself is mode-portable, which is the whole point. */
const depositPriceIdByMode: Partial<Record<StripeMode, string>> = {};

export async function getDepositPriceId(): Promise<string> {
  const mode = stripeMode();
  const cached = depositPriceIdByMode[mode];
  if (cached) return cached;
  const res = await fetch(
    `${STRIPE_API}/prices?${new URLSearchParams({
      "lookup_keys[]": "mirror_deposit",
      active: "true",
    })}`,
    { headers: { Authorization: `Bearer ${secretKey()}` } },
  );
  if (!res.ok) {
    throw new Error(
      `Stripe price lookup failed: ${res.status} ${await res.text()}`,
    );
  }
  const body = (await res.json()) as { data: Array<{ id: string }> };
  const price = body.data[0];
  if (!price) {
    throw new Error(
      `No active Stripe price with lookup_key=mirror_deposit in ${mode} mode`,
    );
  }
  depositPriceIdByMode[mode] = price.id;
  return price.id;
}

/*
 * The catalogue, straight from Stripe — the same objects the admin portal
 * edits, so a copy/price/image change on /plans shows up here with no deploy
 * and no mirror table to drift.
 *
 * `kind` comes from product metadata (set in the admin portal):
 *   physical    — a shippable good (the mirrors)
 *   service_fee — a charge that ships nothing (the reservation deposit)
 * Products predating the tag read as physical.
 */
export type CatalogKind = "physical" | "service_fee";

export type CatalogItem = {
  productId: string;
  name: string;
  description: string | null;
  images: string[];
  kind: CatalogKind;
  priceId: string;
  lookupKey: string | null;
  unitAmount: number | null;
  currency: string;
};

type StripeList<T> = { data: T[] };

async function stripeGet<T>(path: string, params: Record<string, string>): Promise<T> {
  const res = await fetch(`${STRIPE_API}${path}?${new URLSearchParams(params)}`, {
    headers: { Authorization: `Bearer ${secretKey()}` },
    // Storefront copy changes shouldn't need a redeploy, but every render
    // shouldn't hit Stripe either.
    next: { revalidate: 300 },
  });
  if (!res.ok) {
    throw new Error(`Stripe ${path} failed: ${res.status} ${await res.text()}`);
  }
  return (await res.json()) as T;
}

/** Active one-time products with their price, newest-priced first. */
export async function listCatalog(kind?: CatalogKind): Promise<CatalogItem[]> {
  const [products, prices] = await Promise.all([
    stripeGet<StripeList<{
      id: string;
      name: string;
      description: string | null;
      images?: string[];
      metadata?: Record<string, string>;
    }>>("/products", { active: "true", limit: "100" }),
    stripeGet<StripeList<{
      id: string;
      product: string;
      lookup_key: string | null;
      unit_amount: number | null;
      currency: string;
      recurring: unknown | null;
    }>>("/prices", { active: "true", limit: "100" }),
  ]);

  const items: CatalogItem[] = [];
  for (const product of products.data) {
    const price = prices.data.find((p) => p.product === product.id && !p.recurring);
    if (!price) continue; // subscription plans are not storefront items
    const itemKind = (product.metadata?.kind as CatalogKind) ?? "physical";
    if (kind && itemKind !== kind) continue;
    items.push({
      productId: product.id,
      name: product.name,
      description: product.description,
      images: product.images ?? [],
      kind: itemKind,
      priceId: price.id,
      lookupKey: price.lookup_key,
      unitAmount: price.unit_amount,
      currency: price.currency,
    });
  }
  return items.sort((a, b) => (b.unitAmount ?? 0) - (a.unitAmount ?? 0));
}

export function formatPrice(cents: number | null, currency = "usd"): string {
  if (cents == null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    maximumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

export type DepositSession = {
  transactionId: string;
  /** Major units (dollars), which is what GA4's `value` expects. */
  value: number;
  /** ISO-4217, uppercased — Stripe returns it lowercase. */
  currency: string;
};

/*
 * Confirms a returning visitor actually paid, and for how much.
 *
 * The success_url is an ordinary GET that anyone can type or share, so the
 * conversion event must be sourced from Stripe rather than from the query
 * string — an Ads conversion action built on self-reported success would
 * optimise bidding against fabricated events. Returns null for anything not
 * verifiably paid, including a missing key or an unreachable Stripe.
 */
export async function getPaidDepositSession(
  sessionId: string,
): Promise<DepositSession | null> {
  // Cheap shape check before spending a round-trip on obvious junk.
  if (!/^cs_[A-Za-z0-9_]{10,150}$/.test(sessionId)) return null;
  try {
    const res = await fetch(`${STRIPE_API}/checkout/sessions/${sessionId}`, {
      headers: { Authorization: `Bearer ${secretKey()}` },
      // Per-visitor payment state: never share a response between requests.
      cache: "no-store",
    });
    if (!res.ok) return null;
    const session = (await res.json()) as {
      id: string;
      payment_status?: string;
      amount_total?: number | null;
      currency?: string | null;
    };
    if (session.payment_status !== "paid") return null;
    return {
      transactionId: session.id,
      value: (session.amount_total ?? 0) / 100,
      currency: (session.currency ?? "usd").toUpperCase(),
    };
  } catch (err) {
    // A reporting event is never worth failing the thank-you page over.
    console.error("getPaidDepositSession failed", err);
    return null;
  }
}

export async function createDepositCheckoutSession(
  reservationId: string,
): Promise<string> {
  const price = await getDepositPriceId();
  const session = await stripeForm<{ url: string | null }>(
    "/checkout/sessions",
    {
      mode: "payment",
      // Pin the methods: without this Stripe offers the dashboard's automatic
      // set, which includes Pay Later (Klarna/Affirm/Afterpay). A deposit that
      // gets applied to the purchase must not itself be financed.
      "payment_method_types[0]": "card",
      "payment_method_types[1]": "link",
      "line_items[0][price]": price,
      "line_items[0][quantity]": "1",
      client_reference_id: reservationId,
      "metadata[reservation_id]": reservationId,
      // Sales tax on the deposit, off until Stripe Tax is activated and
      // registered — enabling it before that makes session creation fail
      // outright, which would take the reserve flow down. See
      // prompts/SALES_TAX_RUNBOOK.md.
      ...(process.env.STRIPE_TAX_ENABLED === "true"
        ? {
            "automatic_tax[enabled]": "true",
            billing_address_collection: "required",
          }
        : {}),
      // {CHECKOUT_SESSION_ID} is substituted by Stripe on redirect. It is what
      // lets the return page verify the payment instead of trusting the URL,
      // and it doubles as the analytics transaction id.
      success_url: `${siteUrl()}/reserve?deposit=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl()}/reserve?deposit=cancelled`,
    },
  );
  if (!session.url) throw new Error("Checkout session has no url");
  return session.url;
}
