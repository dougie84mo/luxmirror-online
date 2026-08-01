import type { Metadata } from "next";

import { ReserveForm } from "./ReserveForm";
import { isMirrorModel, type MirrorModelId } from "./models";

export const metadata: Metadata = {
  title: "Reserve a mirror",
  description:
    "Hold a LUX Smart Mirror for your salon. $0 today — your card is only charged when the unit ships. Q4 2026 delivery.",
};

export default async function ReservePage({
  searchParams,
}: PageProps<"/reserve">) {
  const { model, deposit } = await searchParams;
  const depositState = Array.isArray(deposit) ? deposit[0] : deposit;
  if (depositState === "success" || depositState === "cancelled") {
    return <DepositReturn kind={depositState} />;
  }
  const raw = Array.isArray(model) ? model[0] : model;
  const defaultModel: MirrorModelId =
    raw && isMirrorModel(raw) ? raw : "lux-27";

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-14 px-6 py-20 sm:py-28 lg:grid-cols-12">
      <header className="lg:col-span-5">
        <p className="eyebrow mb-6">Shop · Now reserving</p>
        <h1 className="display text-4xl sm:text-5xl lg:text-6xl">
          Hold your mirror.{" "}
          <span className="text-muted-foreground">
            Pay when it <em>ships.</em>
          </span>
        </h1>
        <p className="mt-7 max-w-prose text-base leading-relaxed text-muted-foreground">
          Tell us where the mirror is headed and we&rsquo;ll hold your place in
          the Q4 2026 run. No charge today, no contracts — we confirm every
          reservation personally before anything ships.
        </p>

        <ul className="mt-10 flex max-w-sm flex-col gap-4">
          {(
            [
              ["Due today", "$0"],
              ["Ships", "Q4 2026"],
              ["Trial", "30 days"],
              ["Charged", "At dispatch"],
            ] as const
          ).map(([label, value]) => (
            <li key={label} className="menu-row">
              <span className="menu-label">{label}</span>
              <span className="menu-dots" aria-hidden />
              <span className="menu-value">{value}</span>
            </li>
          ))}
        </ul>
      </header>

      <div className="lg:col-span-7 lg:pt-2">
        <ReserveForm defaultModel={defaultModel} />
      </div>
    </div>
  );
}

/* Landing states for the Stripe Checkout round-trip. The reservation was
 * already created before checkout opened, so neither state re-renders the
 * form — that would invite duplicate submissions. */
function DepositReturn({ kind }: { kind: "success" | "cancelled" }) {
  const success = kind === "success";
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-24 sm:py-32">
      <div className="rounded-2xl border bg-surface p-8 sm:p-10">
        <p className="eyebrow mb-5">
          {success ? "Deposit received" : "Checkout closed"}
        </p>
        <h1 className="display text-3xl sm:text-4xl">
          {success ? (
            <>
              Your spot is <em>secured.</em>
            </>
          ) : (
            <>
              Your mirror is still <em>held.</em>
            </>
          )}
        </h1>
        <p className="mt-4 max-w-prose text-muted-foreground">
          {success
            ? "Your $199 deposit is on file and will be applied to your mirror at dispatch. We'll confirm everything by email before your unit ships."
            : "No charge was made. Your reservation stands as-is — we'll reach out by email, and you can add a deposit any time before dispatch."}
        </p>
      </div>
    </div>
  );
}
