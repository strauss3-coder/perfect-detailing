"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";
import { useMotionConfig } from "./MotionProvider";
import { formatNumber } from "@/lib/utils";

interface CounterProps {
  value: number;
  precision?: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  className?: string;
  locale?: string;
}

/**
 * Counts up once, the first time it enters the viewport.
 *
 * The finished figure is what renders — on the server, and on the client's
 * first pass — so the markup is correct without JavaScript and there is no
 * hydration mismatch. The count-up then writes to the DOM node directly rather
 * than through state, which keeps sixty renders a second out of React.
 */
export function Counter({
  value,
  precision = 0,
  prefix = "",
  suffix = "",
  durationMs = 1500,
  className,
  locale = "en-ZA",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const { reduced } = useMotionConfig();

  useEffect(() => {
    if (reduced || !numberRef.current) return;
    const node = numberRef.current;

    // Held at zero until the element is scrolled to, so the count is seen.
    if (!inView) {
      node.textContent = formatNumber(0, locale, precision);
      return;
    }

    const controls = animate(0, value, {
      duration: durationMs / 1000,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = formatNumber(v, locale, precision);
      },
    });
    return () => controls.stop();
  }, [inView, value, durationMs, reduced, locale, precision]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <span ref={numberRef}>{formatNumber(value, locale, precision)}</span>
      {suffix}
    </span>
  );
}
