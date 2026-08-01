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

function secretKey(): string {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Missing STRIPE_SECRET_KEY");
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
 * at runtime (no hard-coded price IDs, same convention as the plans). */
let depositPriceId: string | null = null;

export async function getDepositPriceId(): Promise<string> {
  if (depositPriceId) return depositPriceId;
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
    throw new Error("No active Stripe price with lookup_key=mirror_deposit");
  }
  depositPriceId = price.id;
  return price.id;
}

export async function createDepositCheckoutSession(
  reservationId: string,
): Promise<string> {
  const price = await getDepositPriceId();
  const session = await stripeForm<{ url: string | null }>(
    "/checkout/sessions",
    {
      mode: "payment",
      "line_items[0][price]": price,
      "line_items[0][quantity]": "1",
      client_reference_id: reservationId,
      "metadata[reservation_id]": reservationId,
      success_url: `${siteUrl()}/reserve?deposit=success`,
      cancel_url: `${siteUrl()}/reserve?deposit=cancelled`,
    },
  );
  if (!session.url) throw new Error("Checkout session has no url");
  return session.url;
}
