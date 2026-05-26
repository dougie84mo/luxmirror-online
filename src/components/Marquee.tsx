import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
  /** Duration in seconds for one full loop. */
  speed?: number;
}

export function Marquee({ items, className, speed = 32 }: MarqueeProps) {
  // Duplicate so the end of the list seamlessly meets the start.
  const doubled = [...items, ...items];

  return (
    <div
      className={cn(
        "dark overflow-hidden border-b border-border bg-background py-4",
        className,
      )}
    >
      <div
        aria-hidden
        className="flex w-max select-none items-center whitespace-nowrap"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="px-8 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/40">
              {item}
            </span>
            <span className="font-mono text-[11px] text-foreground/15">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
