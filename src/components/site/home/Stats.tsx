"use client";

import type { HomeContent } from "@/content/types";
import { Counter } from "@/components/motion/Counter";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading, MicronRule } from "@/components/ui/Section";

/**
 * The measurement band. Laid out as an instrument readout rather than a card
 * grid — hairline-separated columns, tabular figures, tick marks above.
 */
export function Stats({ stats }: { stats: HomeContent["stats"] }) {
  return (
    <section className="relative section-y">
      <div className="shell">
        <Reveal>
          <SectionHeading eyebrow={stats.eyebrow} title={stats.title} />
        </Reveal>

        <MicronRule className="mt-12" />

        <RevealGroup
          className="grid grid-cols-1 divide-y divide-silver/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4"
          stagger={0.1}
        >
          {stats.items.map((item, i) => (
            <RevealItem
              key={item.id}
              className={[
                "group relative flex flex-col gap-3 py-8 sm:py-10",
                i > 0 ? "lg:border-l lg:border-silver/10 lg:pl-8" : "lg:pr-8",
                i === 1 || i === 3 ? "sm:border-l sm:border-silver/10 sm:pl-8" : "",
                i < 2 ? "sm:border-b sm:border-silver/10 lg:border-b-0" : "",
              ].join(" ")}
            >
              <span
                aria-hidden
                className="absolute top-0 left-0 h-px w-0 bg-linear-to-r from-ceramic to-transparent transition-[width] duration-[1.1s] ease-[var(--ease-gloss)] group-hover:w-full"
              />
              <span className="numeral text-[clamp(2.4rem,4.4vw,3.6rem)] leading-none font-medium text-chrome">
                <Counter
                  value={item.value}
                  precision={item.precision ?? 0}
                  prefix={item.prefix}
                  suffix={item.suffix}
                />
              </span>
              <span className="text-[0.95rem] font-medium text-silver">{item.label}</span>
              {item.detail ? (
                <span className="max-w-[30ch] text-[0.82rem] leading-relaxed text-ash">{item.detail}</span>
              ) : null}
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
