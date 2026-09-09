"use client";

import Link from "next/link";
import type { ServiceCardData } from "@/lib/projections";
import { Motif } from "@/components/icons/Motif";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { TiltCard } from "@/components/motion/Interactive";
import { Arrow } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * Service card.
 *
 * Every card opens with a band: a photograph where the discipline has been
 * shot, the illustrated technical plate where it has not. Because both come
 * out of the same frame at the same ratio, the grid stays even whichever it
 * is — and the day a photograph is uploaded for a plate, nothing moves.
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
          "panel-solid relative flex h-full flex-col overflow-hidden rounded-panel transition-[border-color,transform] duration-500 ease-[var(--ease-gloss)]",
          "hover:border-ceramic/35",
          /* The wide card puts its band beside the copy instead of above it,
             so spanning two columns does not also mean standing twice as
             tall as the card next to it. */
          featured && "lg:grid lg:grid-cols-2 lg:items-stretch",
        )}
      >
        <div className={cn("relative", featured && "lg:h-full")}>
          <MediaFrame
            media={service.media}
            rounded="rounded-none"
            motifScale={0.3}
            plateLabel=""
            /* Stretched to the column rather than left to size itself: with a
               definite height and an `aspect-ratio`, an auto width would grow
               to 16:9 of that height and overflow the card. */
            className={featured ? "lg:absolute lg:inset-0 lg:h-full lg:w-full" : undefined}
            sizes={
              featured
                ? "(min-width: 1024px) 62vw, (min-width: 640px) 92vw, 92vw"
                : "(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
            }
          />
          {/* The band fades into the card so the two read as one surface. */}
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute bg-linear-to-t from-graphite to-transparent",
              featured
                ? "inset-x-0 bottom-0 h-24 lg:inset-y-0 lg:right-0 lg:left-auto lg:h-full lg:w-24 lg:bg-linear-to-l"
                : "inset-x-0 bottom-0 h-24",
            )}
          />
          <span className="absolute bottom-4 left-6 inline-flex text-silver/70 transition-colors duration-500 group-hover:text-ceramic sm:left-7">
            <Motif motif={service.motif} size={featured ? 46 : 38} strokeWidth={1.6} />
          </span>
          {/* Corner index — instrument plate numbering */}
          {typeof index === "number" ? (
            <span className="numeral absolute top-5 right-6 text-[0.68rem] tracking-[0.22em] text-silver/60">
              {String(index + 1).padStart(2, "0")}
            </span>
          ) : null}
        </div>

        <div
          className={cn(
            "flex flex-1 flex-col p-7 pt-5 sm:p-8 sm:pt-6",
            featured && "lg:justify-center lg:pt-8",
          )}
        >
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
        </div>

        {/* Base hairline that fills on hover */}
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px w-0 bg-linear-to-r from-ceramic via-electric to-transparent transition-[width] duration-[1.1s] ease-[var(--ease-gloss)] group-hover:w-full"
        />
      </Link>
    </TiltCard>
  );
}
