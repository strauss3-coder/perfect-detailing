"use client";

import Link from "next/link";
import type { ServiceCardData } from "@/lib/projections";
import { Motif } from "@/components/icons/Motif";
import { TiltCard } from "@/components/motion/Interactive";
import { Arrow } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * Service card. The motif is the hero of the card; the sheen and the rising
 * hairline give it the sense of a panel catching light as the pointer passes.
 */
export function ServiceCard({
  service,
  featured,
  index,
}: {
  service: ServiceCardData;
  featured?: boolean;
  index?: number;
}) {
  return (
    <TiltCard strength={5} className={cn("group h-full", featured && "lg:col-span-2")}>
      <Link
        href={`/services/${service.slug}`}
        className={cn(
          "panel-solid relative flex h-full flex-col overflow-hidden rounded-panel p-7 transition-[border-color,transform] duration-500 ease-[var(--ease-gloss)]",
          "hover:border-ceramic/35 sm:p-8",
        )}
      >
        {/* Corner index — instrument plate numbering */}
        {typeof index === "number" ? (
          <span className="numeral absolute top-6 right-7 text-[0.68rem] tracking-[0.22em] text-ash">
            {String(index + 1).padStart(2, "0")}
          </span>
        ) : null}

        <span className="mb-6 inline-flex text-silver/62 transition-colors duration-500 group-hover:text-ceramic">
          <Motif motif={service.motif} size={featured ? 60 : 50} strokeWidth={1.6} />
        </span>

        {service.flag ? (
          <span className="label-tech mb-3 w-fit rounded-full border border-ceramic/30 px-2.5 py-1 text-[0.55rem] text-ceramic">
            {service.flag}
          </span>
        ) : null}

        <h3 className="text-title text-chrome">{service.name}</h3>
        <p className={cn("mt-3 text-[0.92rem] leading-relaxed text-silver/70", featured && "max-w-xl text-[0.98rem]")}>
          {service.cardSummary}
        </p>

        <span className="mt-auto flex items-center gap-2 pt-7 text-[0.82rem] font-medium text-ceramic">
          <span className="group/btn inline-flex items-center gap-2">
            Explore the detail
            <Arrow />
          </span>
        </span>

        {/* Base hairline that fills on hover */}
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px w-0 bg-linear-to-r from-ceramic via-electric to-transparent transition-[width] duration-[1.1s] ease-[var(--ease-gloss)] group-hover:w-full"
        />
      </Link>
    </TiltCard>
  );
}
