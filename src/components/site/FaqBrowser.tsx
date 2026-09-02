"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import type { Faq, FaqPageContent } from "@/content/types";
import { FaqAccordion } from "./FaqAccordion";
import { cn } from "@/lib/utils";

/**
 * Category-filtered FAQ with a live text search. The search matches question
 * and answer text, because people search for the phrase that worried them,
 * not the heading we happened to write.
 */
export function FaqBrowser({
  faqs,
  categories,
}: {
  faqs: Faq[];
  categories: FaqPageContent["categories"];
}) {
  const [active, setActive] = useState<string>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return faqs.filter((faq) => {
      const inCategory = active === "all" || faq.categorySlug === active;
      if (!inCategory) return false;
      if (!needle) return true;
      return (
        faq.question.toLowerCase().includes(needle) ||
        faq.answer.toLowerCase().includes(needle)
      );
    });
  }, [faqs, active, query]);

  const counts = useMemo(() => {
    const map = new Map<string, number>([["all", faqs.length]]);
    for (const faq of faqs) map.set(faq.categorySlug, (map.get(faq.categorySlug) ?? 0) + 1);
    return map;
  }, [faqs]);

  const activeCategory = categories.find((c) => c.slug === active);

  return (
    <div className="grid gap-12 lg:grid-cols-[0.34fr_0.66fr] lg:gap-16">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <label htmlFor="faq-search" className="label-tech text-silver/60">Search</label>
        <div className="relative mt-3">
          <input
            id="faq-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="lifespan, warranty, solar…"
            className="h-12 w-full rounded-tile border border-silver/15 bg-ink/50 pr-4 pl-11 text-[0.9rem] text-chrome outline-none transition-colors placeholder:text-ash focus:border-ceramic/50"
          />
          <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden className="absolute top-1/2 left-4 -translate-y-1/2 text-ash">
            <circle cx="8.6" cy="8.6" r="5.6" stroke="currentColor" strokeWidth="1.5" />
            <path d="M13 13l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        <ul className="mt-8 flex flex-wrap gap-2 lg:flex-col">
          {[{ id: "all", slug: "all", label: "Everything", blurb: "" }, ...categories].map((category) => {
            const isActive = active === category.slug;
            const count = counts.get(category.slug) ?? 0;
            return (
              <li key={category.id}>
                <button
                  type="button"
                  onClick={() => setActive(category.slug)}
                  aria-pressed={isActive}
                  className={cn(
                    "relative flex w-full items-center justify-between gap-4 rounded-full border px-4 py-2.5 text-left text-[0.85rem] transition-colors duration-400 lg:rounded-tile",
                    isActive
                      ? "border-ceramic/45 text-ceramic"
                      : "border-silver/12 text-silver/65 hover:border-silver/30 hover:text-chrome",
                  )}
                >
                  {category.label}
                  <span className="numeral text-[0.68rem] text-ash">{count}</span>
                  {isActive ? (
                    <motion.span layoutId="faq-pill" className="absolute inset-0 -z-10 rounded-full bg-ceramic/8 lg:rounded-tile" />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>

        {activeCategory?.blurb ? (
          <p className="mt-6 hidden max-w-xs text-[0.82rem] leading-relaxed text-ash lg:block">
            {activeCategory.blurb}
          </p>
        ) : null}
      </div>

      <div>
        {filtered.length ? (
          <FaqAccordion faqs={filtered} defaultOpenId={filtered[0]?.id} headingLevel="h2" />
        ) : (
          <p className="py-16 text-center text-[0.92rem] text-ash">
            Nothing matches “{query}”. Try a different word, or ask us directly.
          </p>
        )}
        <p className="numeral mt-6 text-[0.72rem] text-ash">
          {filtered.length} of {faqs.length} questions
        </p>
      </div>
    </div>
  );
}
