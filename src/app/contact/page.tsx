import type { Metadata } from "next";

import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact",
  description:
    "Questions about the LUX Smart Mirror, wholesale, press, or partnerships — talk to the LUX team.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto grid w-full max-w-7xl gap-14 px-6 py-20 sm:py-28 lg:grid-cols-12">
      <header className="lg:col-span-5">
        <p className="eyebrow mb-6">Contact</p>
        <h1 className="display text-4xl sm:text-5xl lg:text-6xl">
          Talk to the <em>house.</em>
        </h1>
        <p className="mt-7 max-w-prose text-base leading-relaxed text-muted-foreground">
          Questions about the mirror, your reservation, wholesale, or press —
          write to us and a real person will get back to you within two
          business days.
        </p>

        <ul className="mt-10 flex max-w-sm flex-col gap-4">
          {(
            [
              ["Email", "hello@theluxmirror.com"],
              ["Replies", "≤ 2 business days"],
              ["Wholesale", "Ask about volume"],
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
        <ContactForm />
      </div>
    </div>
  );
}
