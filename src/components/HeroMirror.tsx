"use client";

import { useRef } from "react";

/*
 * The hero signature: a CSS-drawn LUX mirror that performs the
 * product's own magic moment on page load — silvered glass wakes
 * into a violet-lit interface. The specular highlight tracks the
 * pointer like light moving across real glass. Decorative only;
 * hidden from assistive tech (the copy carries the content).
 */
export function HeroMirror() {
  const stage = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = stage.current;
    if (!el) return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${((clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--my", `${((clientY - r.top) / r.height) * 100}%`);
    });
  }

  return (
    <div
      ref={stage}
      onPointerMove={handleMove}
      className="mirror-stage"
      aria-hidden
    >
      <div className="mirror-wall-glow" />
      <div className="mirror-frame">
        <div className="mirror-glass">
          <span className="mirror-reflection display">
            The mirror built for the chair.
          </span>
          <div className="mirror-glow-base" />
          <div className="mirror-halo" />
          <span className="mirror-chip mirror-chip-1">
            <span className="chip-dot" />
            Live preview
          </span>
          <span className="mirror-chip mirror-chip-2">Skin fade · No. 2</span>
          <span className="mirror-chip mirror-chip-3">Next chair · 2:30</span>
          <div className="mirror-sheen" />
        </div>
      </div>
    </div>
  );
}
