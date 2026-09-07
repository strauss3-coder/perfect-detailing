import Image from "next/image";
import type { ServiceDoc } from "@/content/types";
import { Motif } from "@/components/icons/Motif";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import { asset } from "@/lib/asset";

/**
 * The with/without comparison.
 *
 * This is the argument the whole page rests on, so it gets its own band: the
 * company's own split-screen artwork at full width, the two states named
 * either side of it, and the headline figure stated with the qualifier that
 * belongs to it rather than floating free.
 */
export function TheDifference({
  difference,
}: {
  difference: NonNullable<ServiceDoc["difference"]>;
}) {
  return (
    <section className="relative isolate overflow-hidden section-y">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-graphite/60 to-transparent" />
        <div className="micron-rule absolute inset-x-0 top-0" />
        <div className="micron-rule absolute inset-x-0 bottom-0" />
      </div>

      <div className="shell">
        <Reveal>
          <div className="max-w-3xl">
            <Eyebrow>{difference.eyebrow}</Eyebrow>
            <h2 className="text-display mt-5 text-balance text-chrome">{difference.title}</h2>
            <p className="text-lede mt-6 text-pretty">{difference.body}</p>
          </div>
        </Reveal>

        {/* The comparison artwork */}
        <Reveal delay={0.08} className="mt-14">
          <figure className="overflow-hidden rounded-panel ring-hairline">
            <Image
              src={asset(difference.media.src)}
              alt={difference.media.alt}
              width={1600}
              height={Math.round(1600 / (difference.media.ratio ?? 16 / 9))}
              sizes="(min-width: 1280px) 76rem, 100vw"
              className="h-auto w-full"
            />
          </figure>
        </Reveal>

        {/* What each side actually means */}
        <Reveal delay={0.06}>
          <div className="mt-10 grid gap-px overflow-hidden rounded-panel bg-silver/10 md:grid-cols-2">
            <div className="flex flex-col gap-3 bg-graphite p-7">
              <span className="label-tech w-fit rounded-full border border-silver/20 px-3 py-1.5 text-silver/55">
                {difference.withoutLabel}
              </span>
              <p className="text-[0.92rem] leading-relaxed text-silver/62">{difference.withoutBody}</p>
            </div>
            <div className="flex flex-col gap-3 bg-gunmetal p-7">
              <span className="label-tech w-fit rounded-full border border-ceramic/40 px-3 py-1.5 text-ceramic">
                {difference.withLabel}
              </span>
              <p className="text-[0.92rem] leading-relaxed text-silver/80">{difference.withBody}</p>
            </div>
          </div>
        </Reveal>

        {/* The published figure, with the qualifier attached to it */}
        <Reveal delay={0.08}>
          <div className="panel-glass mt-4 flex flex-col gap-6 rounded-panel p-7 sm:flex-row sm:items-center sm:gap-10 sm:p-9">
            <p className="shrink-0">
              <span className="numeral block text-[clamp(2.4rem,5vw,3.4rem)] leading-none font-medium accent-text">
                {difference.headline.value}
              </span>
              <span className="mt-2 block text-[0.92rem] font-medium text-chrome">
                {difference.headline.label}
              </span>
            </p>
            <p className="border-silver/12 text-[0.82rem] leading-relaxed text-ash sm:border-l sm:pl-10">
              {difference.headline.qualifier}
            </p>
          </div>
        </Reveal>

        {difference.benefits.length ? (
          <RevealGroup
            className="mt-4 grid gap-px overflow-hidden rounded-panel bg-silver/10 sm:grid-cols-2 lg:grid-cols-5"
            stagger={0.06}
          >
            {difference.benefits.map((benefit) => (
              <RevealItem key={benefit.id}>
                <div className="group flex h-full flex-col gap-3 bg-graphite p-6 transition-colors duration-500 hover:bg-gunmetal">
                  <span className="text-silver/45 transition-colors duration-500 group-hover:text-ceramic">
                    <Motif motif={benefit.motif ?? "shield"} size={34} strokeWidth={1.7} />
                  </span>
                  <h3 className="text-[0.94rem] font-medium text-chrome">{benefit.title}</h3>
                  <p className="text-[0.8rem] leading-relaxed text-silver/60">{benefit.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        ) : null}
      </div>
    </section>
  );
}
