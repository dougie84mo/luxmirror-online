import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind LUX Mirror.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-24 sm:py-32">
      <p className="eyebrow">About</p>
      <h1 className="display text-5xl sm:text-7xl lg:text-8xl">
        Reimagining the chair.
      </h1>
      <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
        LUX Mirror brings augmented styling, gesture controls, and fleet
        management to barbers and stylists. The full story is coming soon.
      </p>
    </section>
  );
}
