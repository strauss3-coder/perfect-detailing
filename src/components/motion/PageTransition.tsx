"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useMotionConfig } from "./MotionProvider";

/**
 * Route change transition.
 *
 * Content lifts and blurs out, and a thin ceramic rule sweeps across the top
 * of the viewport — the same raking-light gesture the rest of the site uses,
 * borrowed as a progress indicator.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { pageTransitions } = useMotionConfig();

  if (!pageTransitions) return <>{children}</>;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 14, filter: "blur(7px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } }}
        exit={{ opacity: 0, y: -10, filter: "blur(7px)", transition: { duration: 0.3, ease: [0.65, 0, 0.35, 1] } }}
      >
        <motion.span
          aria-hidden
          className="fixed inset-x-0 top-0 z-[150] h-px origin-left bg-linear-to-r from-transparent via-ceramic to-transparent"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
