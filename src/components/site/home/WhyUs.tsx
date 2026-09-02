"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { HomeContent } from "@/content/types";
import { Motif } from "@/components/icons/Motif";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

/**
 * An accordion of reasons rather than a card grid — one open at a time, so
 * the section reads as an argument being made in order rather than four
 * competing claims.
 */
export function WhyUs({ section }: { section: HomeContent["whyUs"] }) {
  const [active, setActive] = useState(0);

  return (
    <section className="relative section-y">
      <div className="shell">
        <Reveal>
          <SectionHeading eyebrow={section.eyebrow} title={section.title} lede={section.lede} />
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-14 divide-y divide-silver/10 border-y border-silver/10">
            {section.items.map((item, i) => {
              const open = active === i;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-expanded={open}
                    className="group flex w-full items-center gap-5 py-6 text-left sm:gap-8 sm:py-8"
                  >
                    <span className="numeral shrink-0 text-[0.7rem] tracking-[0.24em] text-ash">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={cn(
                        "shrink-0 transition-colors duration-500",
                        open ? "text-ceramic" : "text-silver/60 group-hover:text-silver/70",
                      )}
                    >
                      <Motif motif={item.motif ?? "shield"} size={38} strokeWidth={1.6} accent={open} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "block font-display text-[clamp(1.15rem,2.2vw,1.7rem)] tracking-tight transition-colors duration-500",
                          open ? "text-chrome" : "text-silver/70 group-hover:text-chrome",
                        )}
                      >
                        {item.title}
                      </span>
                      <motion.span
                        initial={false}
                        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="block overflow-hidden"
                      >
                        <span className="block max-w-2xl pt-3 text-[0.92rem] leading-relaxed text-silver/65">
                          {item.body}
                        </span>
                      </motion.span>
                    </span>

                    {item.metric ? (
                      <span
                        className={cn(
                          "label-tech hidden shrink-0 rounded-full border px-3 py-1.5 transition-colors duration-500 sm:inline-flex",
                          open ? "border-ceramic/40 text-ceramic" : "border-silver/15 text-silver/60",
                        )}
                      >
                        {item.metric}
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
