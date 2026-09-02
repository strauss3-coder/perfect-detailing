"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Faq } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * Disclosure list. Native buttons with aria-expanded and a linked region, so
 * it behaves for assistive technology exactly as it looks.
 */
export function FaqAccordion({
  faqs,
  className,
  defaultOpenId,
  headingLevel: Heading = "h3",
}: {
  faqs: Faq[];
  className?: string;
  defaultOpenId?: string;
  /** h2 when the accordion sits directly under the page title. */
  headingLevel?: "h2" | "h3";
}) {
  const baseId = useId();
  const [open, setOpen] = useState<string | null>(defaultOpenId ?? null);

  if (!faqs.length) return null;

  return (
    <ul className={cn("divide-y divide-silver/10 border-y border-silver/10", className)}>
      {faqs.map((faq) => {
        const isOpen = open === faq.id;
        const panelId = `${baseId}-${faq.id}`;
        return (
          <li key={faq.id}>
            <Heading>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : faq.id)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="group flex w-full items-start gap-5 py-6 text-left"
              >
                <span
                  className={cn(
                    "flex-1 font-display text-[1.02rem] leading-snug tracking-tight transition-colors duration-400 sm:text-[1.14rem]",
                    isOpen ? "text-ceramic" : "text-chrome group-hover:text-silver",
                  )}
                >
                  {faq.question}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "relative mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors duration-400",
                    isOpen ? "border-ceramic/50 text-ceramic" : "border-silver/20 text-silver/60",
                  )}
                >
                  <span className="absolute h-px w-2.5 bg-current" />
                  <span
                    className={cn(
                      "absolute h-2.5 w-px bg-current transition-transform duration-400 ease-[var(--ease-gloss)]",
                      isOpen && "scale-y-0",
                    )}
                  />
                </span>
              </button>
            </Heading>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pr-10 pb-7 text-[0.92rem] leading-[1.75] text-silver/70">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
