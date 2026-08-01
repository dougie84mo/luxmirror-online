"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { startDepositCheckout } from "./actions";

export function DepositCta({ reservationId }: { reservationId: string }) {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div className="mt-8 border-t pt-8">
      <p className="eyebrow mb-3">Optional · Priority</p>
      <p className="max-w-prose text-sm text-muted-foreground">
        Put down <span className="font-medium text-foreground">$199</span> to
        secure priority in the Q4 run. Every dollar is applied to your mirror
        at dispatch — it&rsquo;s a head start, not a fee.
      </p>
      {error && (
        <p role="alert" className="mt-3 text-sm text-destructive">
          {error}
        </p>
      )}
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <Button
          size="lg"
          disabled={pending}
          className="btn-violet h-12 rounded-full px-7 text-sm font-medium"
          onClick={() =>
            startTransition(async () => {
              const res = await startDepositCheckout(reservationId);
              if (res?.error) setError(res.error);
            })
          }
        >
          {pending ? "Opening checkout…" : "Secure your spot — $199"}
        </Button>
        <p className="text-xs text-muted-foreground">
          Applied to your purchase · secure checkout by Stripe
        </p>
      </div>
    </div>
  );
}
