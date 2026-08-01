"use client";

import { useActionState } from "react";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { submitReservation, type ReserveState } from "./actions";
import { DepositCta } from "./DepositCta";
import { MIRROR_MODELS, type MirrorModelId } from "./models";

const initialState: ReserveState = { status: "idle" };

function Field({
  label,
  htmlFor,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
        {optional && (
          <span className="ml-1.5 font-normal text-muted-foreground">
            optional
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

export function ReserveForm({ defaultModel }: { defaultModel: MirrorModelId }) {
  const [state, formAction, pending] = useActionState(
    submitReservation,
    initialState,
  );

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border bg-surface p-8 sm:p-10">
        <div className="mb-5 flex items-center justify-between gap-4">
          <p className="eyebrow">Reservation received</p>
          <span className="lux-chip">
            <span aria-hidden className="lux-chip-dot" />
            Q4 2026 run
          </span>
        </div>
        <h2 className="display text-3xl sm:text-4xl">
          Your mirror is <em>held.</em>
        </h2>
        <p className="mt-4 max-w-prose text-muted-foreground">
          We&rsquo;ll confirm by email and reach out before your unit ships.
          Nothing is charged today — your card is only charged at dispatch.
        </p>
        <ul className="mt-8 space-y-2.5">
          {[
            "Confirmation email on its way",
            "Ships Q4 2026 · $0 today",
            "30-day trial from delivery",
          ].map((line) => (
            <li key={line} className="flex items-center gap-2.5 text-sm">
              <Check aria-hidden className="size-4" />
              {line}
            </li>
          ))}
        </ul>
        {state.reservationId && (
          <DepositCta reservationId={state.reservationId} />
        )}
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {/* Model picker — the two shop formats as selectable cards */}
      <fieldset>
        <legend className="mb-3 text-sm font-medium">Mirror</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {MIRROR_MODELS.map((m) => (
            <label
              key={m.id}
              className={cn(
                "flex cursor-pointer flex-col gap-1 rounded-xl border bg-surface p-4",
                "transition-colors hover:border-foreground/25",
                "has-checked:border-foreground has-checked:ring-1 has-checked:ring-foreground",
              )}
            >
              <input
                type="radio"
                name="model"
                value={m.id}
                defaultChecked={m.id === defaultModel}
                className="sr-only"
              />
              <span className="flex items-baseline justify-between gap-3">
                <span className="font-medium">{m.name}</span>
                <span className="font-mono text-sm text-muted-foreground">
                  {m.price}
                </span>
              </span>
              <span className="text-xs text-muted-foreground">{m.blurb}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Your name" htmlFor="name">
          <Input
            id="name"
            name="name"
            required
            maxLength={200}
            autoComplete="name"
            className="h-10"
          />
        </Field>
        <Field label="Email" htmlFor="email">
          <Input
            id="email"
            name="email"
            type="email"
            required
            maxLength={320}
            autoComplete="email"
            className="h-10"
          />
        </Field>
        <Field label="Phone" htmlFor="phone" optional>
          <Input
            id="phone"
            name="phone"
            type="tel"
            maxLength={40}
            autoComplete="tel"
            className="h-10"
          />
        </Field>
        <Field label="Salon or shop" htmlFor="salon" optional>
          <Input
            id="salon"
            name="salon"
            maxLength={200}
            autoComplete="organization"
            className="h-10"
          />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="How many mirrors" htmlFor="quantity">
          <Input
            id="quantity"
            name="quantity"
            type="number"
            min={1}
            max={100}
            defaultValue={1}
            required
            className="h-10"
          />
        </Field>
      </div>

      <Field label="Anything we should know" htmlFor="notes" optional>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          maxLength={2000}
          placeholder="Number of chairs, timeline, questions…"
          className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </Field>

      {/* Honeypot — hidden from people, tempting to bots */}
      <div aria-hidden className="hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && (
        <p role="alert" className="text-sm text-destructive">
          {state.message}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <Button
          type="submit"
          size="lg"
          disabled={pending}
          className="h-12 rounded-full px-7 text-sm font-medium"
        >
          {pending ? "Holding your mirror…" : "Reserve — $0 today"}
        </Button>
        <p className="text-xs text-muted-foreground">
          Ships Q4 2026 · card charged at dispatch · 30-day trial
        </p>
      </div>
    </form>
  );
}
