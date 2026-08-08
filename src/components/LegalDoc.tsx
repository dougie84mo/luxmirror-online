import type { ReactNode } from "react";

export type LegalSection = {
  /** Anchor slug — also the fragment other pages and stores can deep-link to. */
  id: string;
  heading: string;
  body: ReactNode;
};

type Props = {
  eyebrow: string;
  /** Rendered in the display face; wrap one word in <em> for the italic. */
  title: ReactNode;
  effective: string;
  intro: ReactNode;
  sections: readonly LegalSection[];
};

/*
 * Shared shell for /privacy and /terms. A legal page is a reference
 * document, not a marketing page — so it gets a persistent contents rail
 * and a single measured column rather than the site's full-bleed sections.
 */
export function LegalDoc({ eyebrow, title, effective, intro, sections }: Props) {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
      <header className="max-w-3xl">
        <p className="eyebrow mb-6">{eyebrow}</p>
        <h1 className="display text-4xl sm:text-5xl">{title}</h1>
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Effective {effective}
        </p>
        <div className="legal-prose mt-8 text-base">{intro}</div>
      </header>

      <div className="mt-16 grid gap-14 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-20">
        <nav aria-label="Contents" className="hidden lg:block">
          <div className="sticky top-24">
            <p className="eyebrow">Contents</p>
            <ol className="mt-4 flex flex-col gap-2.5">
              {sections.map((s, i) => (
                <li key={s.id} className="flex gap-2 text-sm leading-snug">
                  <span className="font-mono text-xs text-muted-foreground/70 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <a
                    href={`#${s.id}`}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div className="min-w-0 max-w-prose">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="legal-section">
              <p className="eyebrow mb-2">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="display text-2xl sm:text-3xl">{s.heading}</h2>
              <div className="legal-prose mt-4">{s.body}</div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
