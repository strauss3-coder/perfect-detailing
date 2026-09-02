"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MarkBead } from "@/components/brand/Marks";
import { useMotionConfig } from "./MotionProvider";

const SEEN_KEY = "pd-loaded";

/* The loader's visibility depends on browser storage, which the server cannot
   read. `useSyncExternalStore` is the sanctioned way to say so: the server
   renders nothing, the client decides on hydration, and React does not treat
   the difference as a mismatch. */
const subscribe = () => () => {};
const isFirstVisit = () => {
  try {
    return sessionStorage.getItem(SEEN_KEY) !== "1";
  } catch {
    return true;
  }
};
const isFirstVisitOnServer = () => false;

/**
 * First-visit loading screen.
 *
 * It reads as an instrument warming up rather than a spinner: the mark draws
 * in, a measurement bar sweeps to 100, then the whole panel lifts away. Shown
 * once per browser session — a loader you sit through twice is an obstacle.
 */
export function Loader({
  headline,
  subline,
  minDurationMs = 900,
}: {
  headline: string;
  subline: string;
  minDurationMs?: number;
}) {
  const { loadingScreen, reduced } = useMotionConfig();
  const firstVisit = useSyncExternalStore(subscribe, isFirstVisit, isFirstVisitOnServer);
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  const visible = loadingScreen && !reduced && firstVisit && !done;

  useEffect(() => {
    if (!visible) return;

    document.documentElement.style.overflow = "hidden";
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const pct = Math.min(100, ((now - start) / minDurationMs) * 100);
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
        return;
      }
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* storage unavailable — the loader simply shows again next time */
      }
      setDone(true);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = "";
    };
  }, [visible, minDurationMs]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(12px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(60% 45% at 50% 45%, color-mix(in oklab, var(--color-electric) 16%, transparent), transparent 70%)",
            }}
          />

          <motion.div
            initial={{ scale: 0.86, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
            className="relative flex flex-col items-center gap-6"
          >
            <MarkBead size={64} />
            <div className="text-center">
              <p className="font-display text-2xl font-bold tracking-tight text-chrome">{headline}</p>
              <p className="label-tech mt-2">{subline}</p>
            </div>

            <div
              className="relative h-px w-56 overflow-hidden bg-silver/15"
              role="progressbar"
              aria-label={subline}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
            >
              <span
                className="absolute inset-y-0 left-0 bg-linear-to-r from-ceramic to-electric"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="numeral text-[0.7rem] tracking-[0.3em] text-ash">
              {Math.round(progress).toString().padStart(3, "0")}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
