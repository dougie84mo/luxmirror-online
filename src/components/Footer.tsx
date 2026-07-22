import Link from "next/link";

const footerLinks = [
  {
    title: "Product",
    links: [
      { href: "/shop", label: "Shop" },
      { href: "/pricing", label: "Pricing" },
      { href: "/about", label: "About" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "/help", label: "Help" },
      { href: "/status", label: "Status" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="dark relative bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl px-6 pt-24 pb-12">
        <div className="grid gap-12 sm:grid-cols-3 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="display text-3xl">LUX</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Smart mirrors for modern salons. Built in California.
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <p className="eyebrow">{group.title}</p>
              <ul className="mt-4 flex flex-col gap-3 text-sm">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Oversized wordmark with its own reflection — the brand as
         * seen in the glass. The reversed ghost sits behind the mark,
         * barely there, the way type reads in a mirror. */}
        <div className="relative mt-24 overflow-hidden">
          <p
            aria-hidden
            className="display pointer-events-none absolute inset-0 select-none text-[28vw] leading-[0.85] text-foreground/[0.04]"
            style={{ letterSpacing: "-0.02em", transform: "scaleX(-1)" }}
          >
            LUX
          </p>
          <p
            aria-hidden
            className="display relative select-none text-[28vw] leading-[0.85] text-foreground/15"
            style={{ letterSpacing: "-0.02em" }}
          >
            LUX
          </p>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>&copy; {year} LUX Mirror. All rights reserved.</p>
          <p className="font-mono uppercase tracking-[0.18em]">
            theluxmirror.com
          </p>
        </div>
      </div>
    </footer>
  );
}
