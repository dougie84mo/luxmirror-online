"use client";

import { useActionState } from "react";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitContact, type ContactState } from "./actions";

const initialState: ContactState = { status: "idle" };

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

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState,
  );

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border bg-surface p-8 sm:p-10">
        <p className="eyebrow mb-5">Message sent</p>
        <h2 className="display text-3xl sm:text-4xl">
          We&rsquo;ll be in <em>touch.</em>
        </h2>
        <p className="mt-4 max-w-prose text-muted-foreground">
          Your message is in our queue — a real person reads every one.
          Expect a reply within two business days.
        </p>
        <p className="mt-6 flex items-center gap-2.5 text-sm">
          <Check aria-hidden className="size-4" />
          Delivered to the LUX team
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-6">
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
      </div>

      <Field label="Phone" htmlFor="phone" optional>
        <Input
          id="phone"
          name="phone"
          type="tel"
          maxLength={40}
          autoComplete="tel"
          className="h-10 sm:max-w-xs"
        />
      </Field>

      <Field label="Your message" htmlFor="message">
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          maxLength={5000}
          placeholder="Questions, wholesale, press, partnerships…"
          className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </Field>

      {/* Honeypot — hidden from people, tempting to bots */}
      <div aria-hidden className="hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
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
          {pending ? "Sending…" : "Send message"}
        </Button>
        <p className="text-xs text-muted-foreground">
          Or email hello@theluxmirror.com
        </p>
      </div>
    </form>
  );
}
