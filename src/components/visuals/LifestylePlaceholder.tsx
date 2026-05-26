import Image from "next/image";

import { cn } from "@/lib/utils";

type AspectRatio =
  | "1/1"
  | "3/4"
  | "4/3"
  | "16/9"
  | "9/16"
  | "3/5"
  | "5/4"
  | "4/5";

interface LifestylePlaceholderProps {
  /**
   * When set, renders the real image (from `/public`). Drop assets in
   * `public/images/` and reference as `/images/hero.jpg`. When omitted,
   * renders a warm gradient placeholder with a slot label.
   */
  src?: string;
  /** Required for accessibility and image SEO when src is provided. */
  alt: string;
  /**
   * Slot hint shown in the placeholder corner so we can see at a glance
   * which photo goes where (e.g., "Hero · Salon interior").
   */
  label?: string;
  aspectRatio?: AspectRatio;
  className?: string;
  fit?: "cover" | "contain";
  priority?: boolean;
  /** Object-position for the image, e.g. "center 30%". */
  position?: string;
}

const aspectClassMap: Record<AspectRatio, string> = {
  "1/1": "aspect-square",
  "3/4": "aspect-[3/4]",
  "4/3": "aspect-[4/3]",
  "16/9": "aspect-video",
  "9/16": "aspect-[9/16]",
  "3/5": "aspect-[3/5]",
  "5/4": "aspect-[5/4]",
  "4/5": "aspect-[4/5]",
};

export function LifestylePlaceholder({
  src,
  alt,
  label,
  aspectRatio = "3/4",
  className,
  fit = "cover",
  priority,
  position,
}: LifestylePlaceholderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-warm",
        aspectClassMap[aspectRatio],
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={priority}
          className={fit === "cover" ? "object-cover" : "object-contain"}
          style={position ? { objectPosition: position } : undefined}
        />
      ) : (
        <>
          {/* Warm gradient base — peach/cream blend that reads as
           * "soft natural light filling a room" without faking
           * photography. */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.96 0.025 80) 0%, oklch(0.92 0.045 60) 100%)",
            }}
          />
          {/* Soft window-light highlight in the top-left */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 60% at 20% 15%, oklch(1 0 0 / 0.55) 0%, transparent 65%)",
            }}
          />
          {/* Gentle vignette toward the bottom — sells "room depth" */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 55%, oklch(0.3 0.04 60 / 0.08) 100%)",
            }}
          />

          {/* Slot label */}
          {label && (
            <div className="absolute right-3 bottom-3 rounded-full bg-background/85 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur-sm">
              {label}
            </div>
          )}
        </>
      )}
    </div>
  );
}
