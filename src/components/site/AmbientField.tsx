"use client";

import { useMotionConfig } from "@/components/motion/MotionProvider";

/**
 * The page-wide atmosphere: two slow aurora blooms, a faint measurement grid
 * and a film grain. Fixed rather than scrolled, so it behaves like the room
 * the content sits in instead of another parallax layer.
 */
export function AmbientField() {
  const { grain } = useMotionConfig();
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute -top-[22%] -left-[12%] h-[62vmax] w-[62vmax] rounded-full blur-[120px] aurora-a"
        style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--color-electric) 26%, transparent), transparent 66%)" }}
      />
      <div
        className="absolute -right-[16%] bottom-[-18%] h-[54vmax] w-[54vmax] rounded-full blur-[130px] aurora-b"
        style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--color-ceramic) 15%, transparent), transparent 68%)" }}
      />
      <div className="absolute inset-0 opacity-[0.5] grid-field" />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 90% at 50% 0%, transparent 40%, var(--color-ink) 96%)" }}
      />
      {grain ? <div className="absolute inset-0 grain-layer" /> : null}
    </div>
  );
}
