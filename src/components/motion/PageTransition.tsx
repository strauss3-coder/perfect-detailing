"use client";

import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useMotionConfig } from "./MotionProvider";

/**
 * Route change transition.
 *
 * The incoming page lifts and fades, and a thin ceramic rule sweeps across
 * the top of the viewport — the raking-light gesture the rest of the site uses,
 * borrowed as a progress indicator.
 *
 * There is deliberately no exit animation. Waiting for one before mounting the
 * next page adds a third of a second to every navigation that buys nothing:
 * the boot overlay already covers the change when a change needs covering.
 *
 * It lifts and fades but deliberately does not blur. A `filter` is left on the
 * element as `blur(0px)` once the animation settles, and any filter other than
 * `none` makes this element the containing block for every `position: fixed`
 * descendant — which silently pins page-level overlays to the top of the
 * document instead of the viewport. `transform` is safe: Motion resets it to
 * `none` on its own once the travel reaches zero.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { pageTransitions } = useMotionConfig();

  if (!pageTransitions) return <>{children}</>;

  return (
    <>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
      >
        <motion.span
          aria-hidden
          className="fixed inset-x-0 top-0 z-[150] h-px origin-left bg-linear-to-r from-transparent via-ceramic to-transparent"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }}
        />
        {children}
      </motion.div>
    </>
  );
}
