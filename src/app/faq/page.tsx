import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions about the LUX Smart Mirror — pricing, shipping, deposits, privacy, installation, and support.",
};

const FAQS = [
  {
    q: "What exactly is the LUX Mirror?",
    a: "A smart mirror built for salons and barbershops: a 4K AMOLED panel behind real glass, with AR style previews, gesture control, and appointment tools at the chair. It pairs with the LUX app so your whole fleet is managed from one place.",
  },
  {
    q: "How much does it cost?",
    a: "The chair-side LUX 27 is $2,400 and the floor-standing LUX Full-Length is $3,200. Cloud features (fleet management, booking, updates) run on a LUX subscription — see the pricing page for plan details.",
  },
  {
    q: "When do mirrors ship?",
    a: "The current production run ships Q4 2026. Reserving is free — your card is only charged at dispatch, and every unit comes with a 30-day trial from delivery.",
  },
  {
    q: "What does the $199 deposit do?",
    a: "It's optional and it isn't a fee: putting down $199 secures priority in the production run, and the full amount is applied to your mirror's price at dispatch.",
  },
  {
    q: "Do I need the subscription?",
    a: "The mirror is at its best connected: booking, fleet status, style libraries, and software updates all come from the LUX cloud. Plans are sized from a single chair to multi-location fleets.",
  },
  {
    q: "What about the camera and privacy?",
    a: "The camera feed is processed on the mirror itself — it is not streamed to the cloud. Photos are captured only when your stylist takes one, and they land in your business's private library.",
  },
  {
    q: "How does installation work?",
    a: "The LUX 27 wall-mounts like a heavy mirror; the Full-Length stands on its base. Each needs a standard outlet and Wi-Fi. Pairing takes minutes: scan the QR code on the mirror from the LUX app.",
  },
  {
    q: "Can my whole team use it?",
    a: "Yes — invite your team in the app with owner, manager, and stylist roles. Every chair gets the same mirror experience; you decide who can manage devices and billing.",
  },
  {
    q: "What if it doesn't work out for my shop?",
    a: "Every mirror ships with a 30-day trial from delivery. If it isn't right for your floor, we take it back.",
  },
  {
    q: "How do I reach a human?",
    a: "Email hello@theluxmirror.com or use the contact page — a real person reads every message and replies within two business days.",
  },
] as const;

export default function FaqPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-20 sm:py-28">
      <header>
        <p className="eyebrow mb-6">FAQ</p>
        <h1 className="display text-4xl sm:text-5xl">
          Asked and <em>answered.</em>
        </h1>
      </header>

      <div className="mt-12 divide-y">
        {FAQS.map(({ q, a }) => (
          <details key={q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 text-base font-medium [&::-webkit-details-marker]:hidden">
              {q}
              <span
                aria-hidden
                className="font-mono text-muted-foreground transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted-foreground">
              {a}
            </p>
          </details>
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map(({ q, a }) => ({
              "@type": "Question",
              name: q,
              acceptedAnswer: { "@type": "Answer", text: a },
            })),
          }),
        }}
      />
    </div>
  );
}
