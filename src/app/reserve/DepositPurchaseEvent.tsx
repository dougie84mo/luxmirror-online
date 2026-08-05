"use client";

import { useEffect } from "react";

/*
 * Fires the GA4 `purchase` event for a deposit Stripe has confirmed as paid.
 *
 * Rendering is the trigger — the parent only renders this after verifying the
 * checkout session server-side, so reaching /reserve?deposit=success by hand
 * sends nothing. This is the event an Ads conversion action gets layered on
 * top of later, which is why it carries a real transaction_id and a real
 * amount rather than a hard-coded 199.
 */
export function DepositPurchaseEvent({
  transactionId,
  value,
  currency,
}: {
  transactionId: string;
  value: number;
  currency: string;
}) {
  useEffect(() => {
    // The success page is a normal URL: refresh or back-navigation re-runs
    // this effect. GA4 does dedupe on transaction_id, but not dependably
    // enough to be the only guard on a conversion that feeds bidding.
    const key = `lux:purchase:${transactionId}`;
    try {
      if (sessionStorage.getItem(key)) return;
    } catch {
      // Storage blocked (private mode, cookie settings). Fall through and let
      // GA4's own dedupe be the only guard — better than dropping it.
    }

    let cancelled = false;
    let attempts = 0;

    // gtag comes from the init script that next/script injects with
    // afterInteractive, which may not have run when this effect fires on a
    // cold load. Wait for it rather than queueing into dataLayer directly:
    // the init script's gtag('config') call has to land first, and an event
    // that arrives ahead of config is discarded.
    const send = () => {
      if (cancelled) return;
      if (!window.gtag) {
        if (attempts++ > 40) return; // ~10s, then give up quietly
        window.setTimeout(send, 250);
        return;
      }
      window.gtag("event", "purchase", {
        transaction_id: transactionId,
        value,
        currency,
        items: [
          {
            item_id: "mirror_deposit",
            item_name: "LUX Mirror reservation deposit",
            price: value,
            quantity: 1,
          },
        ],
      });
      try {
        sessionStorage.setItem(key, "1");
      } catch {
        // See above — nothing to do, the event already went out.
      }
    };

    send();
    return () => {
      cancelled = true;
    };
  }, [transactionId, value, currency]);

  return null;
}
