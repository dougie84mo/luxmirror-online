import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Drop the glint when the mark sits next to other violet UI. */
  withGlint?: boolean;
};

/*
 * The LUXMIRROR wordmark. Live text in the display face rather than an
 * exported image: it stays crisp at any size, inherits the surface's colour
 * (ink on the silver header, silver on the ink footer), and search engines
 * and screen readers read the brand name instead of an alt attribute.
 *
 * The violet four-point glint is the same one that sits at the L's shoulder
 * in the app icon — it is the piece that ties the tab, the home screen, and
 * the page header together, so it travels with the wordmark.
 */
export function Wordmark({ className, withGlint = true }: Props) {
  return (
    <span className={cn("wordmark", className)}>
      <span className="wordmark-text">LUXMIRROR</span>
      {withGlint && (
        <svg
          className="wordmark-glint"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          {/* Flat violet, no gradient: at header size the ramp is invisible,
              and a fill-referenced <defs> id would collide wherever the
              wordmark renders more than once on a page. */}
          <path
            d="M12 1Q13.6 10.4 23 12Q13.6 13.6 12 23Q10.4 13.6 1 12Q10.4 10.4 12 1Z"
            fill="#7c5cff"
          />
        </svg>
      )}
    </span>
  );
}
