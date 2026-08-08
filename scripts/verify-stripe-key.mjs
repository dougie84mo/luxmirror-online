#!/usr/bin/env node
/*
 * Proves a Stripe key can do everything web/marketing actually asks of it —
 * and, when it can't, says whether that's a missing permission or a missing
 * catalogue. Those two failures look identical from the reserve page (a 500)
 * and have completely different fixes, so the script separates them.
 *
 *   node scripts/verify-stripe-key.mjs                 # reads .env.local
 *   node scripts/verify-stripe-key.mjs sk_test_…       # or pass a key
 *
 * Safe to run against live: the only write it performs is a Checkout Session,
 * which it expires immediately afterwards. Nothing is charged and no customer
 * is created.
 */

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const API = "https://api.stripe.com/v1";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function keyFromEnvFile() {
  let text;
  try {
    text = readFileSync(resolve(root, ".env.local"), "utf8");
  } catch {
    return null;
  }
  const env = Object.fromEntries(
    text
      .split(/\r?\n/)
      .filter((l) => l && !l.startsWith("#") && l.includes("="))
      .map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1)]),
  );
  const mode = env.STRIPE_MODE === "live" ? "live" : "test";
  return (
    (mode === "live" ? env.STRIPE_SECRET_KEY_LIVE : env.STRIPE_SECRET_KEY_TEST) ||
    env.STRIPE_SECRET_KEY ||
    null
  );
}

const key = process.argv[2] || keyFromEnvFile();
if (!key) {
  console.error(
    "No key. Pass one as an argument, or set STRIPE_SECRET_KEY_TEST / _LIVE in .env.local.",
  );
  process.exit(2);
}

const mode = key.includes("_live_") ? "live" : "test";
const kind = key.startsWith("rk_") ? "restricted" : "standard";

async function call(method, path, body) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${key}`,
      ...(body ? { "Content-Type": "application/x-www-form-urlencoded" } : {}),
    },
    ...(body ? { body: new URLSearchParams(body).toString() } : {}),
  });
  const json = await res.json().catch(() => ({}));
  return { status: res.status, json };
}

const results = [];
function record(name, ok, detail) {
  results.push({ name, ok, detail });
  const mark = ok === true ? "PASS" : ok === false ? "FAIL" : "SKIP";
  console.log(`${mark.padEnd(5)} ${name.padEnd(34)} ${detail}`);
}

/* A 401/403 is the key's fault. Anything else is the account's. */
function isPermissionError(status, json) {
  if (status === 401) return true;
  return status === 403 || /does not have (the required )?permission/i.test(json?.error?.message ?? "");
}

console.log(`\nKey: ${kind} ${mode} key ending …${key.slice(-4)}\n`);

// 1. Prices — read. The reserve flow cannot resolve the deposit without this.
const prices = await call(
  "GET",
  "/prices?lookup_keys[]=mirror_deposit&active=true",
);
let depositPriceId = null;
if (isPermissionError(prices.status, prices.json)) {
  record("Prices · read", false, `${prices.status} — grant Prices: Read`);
} else if (prices.status >= 400) {
  record("Prices · read", false, `${prices.status} ${prices.json?.error?.message ?? ""}`);
} else {
  depositPriceId = prices.json.data?.[0]?.id ?? null;
  record(
    "Prices · read",
    true,
    depositPriceId
      ? `ok — mirror_deposit → ${depositPriceId}`
      : "ok, but NO active price with lookup_key=mirror_deposit in this mode",
  );
}

// 2. Products — read. Only listCatalog() needs this, and nothing calls it yet.
const products = await call("GET", "/products?active=true&limit=1");
if (isPermissionError(products.status, products.json)) {
  record("Products · read", false, `${products.status} — grant Products: Read`);
} else if (products.status >= 400) {
  record("Products · read", false, `${products.status} ${products.json?.error?.message ?? ""}`);
} else {
  record("Products · read", true, `ok — ${products.json.data?.length ?? 0} returned`);
}

// 3. Checkout Sessions — write, then read back, then expire.
if (!depositPriceId) {
  record(
    "Checkout Sessions · write",
    null,
    "skipped — needs the mirror_deposit price to exist first",
  );
  record("Checkout Sessions · read", null, "skipped — nothing to read back");
} else {
  const created = await call("POST", "/checkout/sessions", {
    mode: "payment",
    "payment_method_types[0]": "card",
    "line_items[0][price]": depositPriceId,
    "line_items[0][quantity]": "1",
    "metadata[source]": "verify-stripe-key",
    success_url: "https://theluxmirror.com/reserve?deposit=success",
    cancel_url: "https://theluxmirror.com/reserve?deposit=cancelled",
  });
  if (isPermissionError(created.status, created.json)) {
    record(
      "Checkout Sessions · write",
      false,
      `${created.status} — grant Checkout Sessions: Write`,
    );
    record("Checkout Sessions · read", null, "skipped — create failed");
  } else if (created.status >= 400) {
    record(
      "Checkout Sessions · write",
      false,
      `${created.status} ${created.json?.error?.message ?? ""}`,
    );
    record("Checkout Sessions · read", null, "skipped — create failed");
  } else {
    const id = created.json.id;
    record("Checkout Sessions · write", true, `ok — created ${id}`);

    const read = await call("GET", `/checkout/sessions/${id}`);
    if (isPermissionError(read.status, read.json)) {
      record(
        "Checkout Sessions · read",
        false,
        `${read.status} — Write should cover read; grant Read explicitly`,
      );
    } else if (read.status >= 400) {
      record("Checkout Sessions · read", false, `${read.status} ${read.json?.error?.message ?? ""}`);
    } else {
      record("Checkout Sessions · read", true, `ok — payment_status=${read.json.payment_status}`);
    }

    const expired = await call("POST", `/checkout/sessions/${id}/expire`);
    console.log(
      expired.status < 400
        ? `      cleaned up   ${id} expired`
        : `      NOTE         could not expire ${id} (${expired.status}) — harmless, it lapses on its own`,
    );
  }
}

/*
 * 4. Blast radius. A restricted key that can still reach refunds is
 *    misconfigured and fails. A standard key reaching them is simply what a
 *    standard key is, so that's a warning, not a failure — the finding is
 *    "you should be using a restricted key here", which is advice rather than
 *    a broken deployment.
 */
const refunds = await call("GET", "/refunds?limit=1");
const locked = isPermissionError(refunds.status, refunds.json);
if (kind === "restricted") {
  record(
    "Refunds · must be denied",
    locked,
    locked
      ? "ok — key cannot reach refunds"
      : `reachable (${refunds.status}) — restricted key is over-scoped`,
  );
} else {
  record(
    "Refunds · blast radius",
    locked ? true : null,
    locked
      ? "ok — key cannot reach refunds"
      : "WARN reachable — a standard key can refund and move payouts. " +
        "Prefer a restricted key on a public web server.",
  );
}

const failed = results.filter((r) => r.ok === false);
const skipped = results.filter((r) => r.ok === null);
console.log(
  `\n${failed.length ? `${failed.length} FAILED` : "All checks passed"}` +
    `${skipped.length ? `, ${skipped.length} skipped` : ""}.\n`,
);
process.exit(failed.length ? 1 : 0);
