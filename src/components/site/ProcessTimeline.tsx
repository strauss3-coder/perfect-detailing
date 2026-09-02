"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "motion/react";
import type { ProcessStep } from "@/content/types";
import { Motif } from "@/components/icons/Motif";
import { useMotionConfig } from "@/components/motion/MotionProvider";
import { cn } from "@/lib/utils";

/**
 * The process timeline.
 *
 * A rail runs the height of the section and fills as you scroll — the visual
 * claim being that this is a sequence, not a menu. Each stage expands to show
 * what actually happens at that step; one is open at a time so the page never
 * becomes a wall.
 */
export function ProcessTimeline({
  steps,
  className,
  defaultOpen = 0,
}: {
  steps: ProcessStep[];
  className?: string;
  defaultOpen?: number;
}) {
  const ref = useRef<HTMLOListElement>(null);
  const [open, setOpen] = useState<number>(defaultOpen);
  const { reduced } = useMotionConfig();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 45%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.5 });
  const height = useTransform(fill, (v) => `${v * 100}%`);

  if (!steps.length) return null;

  return (
    <ol ref={ref} className={cn("relative", className)}>
      {/* Rail */}
      <span aria-hidden className="absolute top-2 bottom-2 left-[1.4rem] w-px bg-silver/12 sm:left-[2.1rem]" />
      <motion.span
        aria-hidden
        className="absolute top-2 left-[1.4rem] w-px origin-top bg-linear-to-b from-ceramic via-electric to-transparent sm:left-[2.1rem]"
        style={reduced ? { height: "100%" } : { height }}
      />

      {steps.map((step, i) => {
        const isOpen = open === i;
        return (
          <li key={step.id} className="relative pl-14 sm:pl-24">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="group block w-full py-7 text-left sm:py-9"
            >
              {/* Node */}
              <span
                aria-hidden
                className={cn(
                  "absolute left-0 grid h-11 w-11 place-items-center rounded-full border transition-colors duration-500 sm:h-[4.2rem] sm:w-[4.2rem]",
                  isOpen
                    ? "border-ceramic/55 bg-ink text-ceramic"
                    : "border-silver/15 bg-ink text-silver/60 group-hover:border-silver/35 group-hover:text-silver/70",
                )}
                style={{ top: "1.75rem" }}
              >
                <span className="hidden sm:block">
                  <Motif motif={step.motif ?? "shield"} size={30} strokeWidth={1.6} accent={isOpen} />
                </span>
                <span className="numeral text-[0.72rem] sm:hidden">{String(step.index).padStart(2, "0")}</span>
                {isOpen ? (
                  <span
                    className="absolute inset-0 rounded-full border border-ceramic/40"
                    style={{ animation: "pulse-ring 2.8s var(--ease-gloss) infinite" }}
                  />
                ) : null}
              </span>

              <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1.5">
                <span className="numeral hidden text-[0.68rem] tracking-[0.24em] text-ash sm:inline">
                  STAGE {String(step.index).padStart(2, "0")}
                </span>
                <span className="label-tech text-silver/60">{step.duration}</span>
              </span>

              <span
                className={cn(
                  "mt-2 block font-display text-[clamp(1.25rem,2.6vw,2rem)] tracking-tight transition-colors duration-500",
                  isOpen ? "text-chrome" : "text-silver/70 group-hover:text-chrome",
                )}
              >
                {step.title}
              </span>

              <span className="mt-3 block max-w-2xl text-[0.92rem] leading-relaxed text-silver/65">
                {step.body}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && step.detail.length ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <ul className="mb-8 grid max-w-3xl gap-px overflow-hidden rounded-tile bg-silver/10 sm:grid-cols-2">
                    {step.detail.map((detail) => (
                      <li key={detail} className="bg-graphite p-4 text-[0.83rem] leading-relaxed text-silver/70">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </li>
        );
      })}
    </ol>
  );
}
