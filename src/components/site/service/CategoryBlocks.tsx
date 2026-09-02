import type { ServiceDoc } from "@/content/types";
import { Motif } from "@/components/icons/Motif";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/Section";

/* ------------------------------------------------------------------ */
/* Aircraft                                                            */
/* ------------------------------------------------------------------ */

export function AircraftDetails({ data }: { data: NonNullable<ServiceDoc["aircraft"]> }) {
  return (
    <>
      <section className="relative section-y">
        <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal direction="right">
            <SectionHeading eyebrow="Suitable aircraft" title="What we are set up for." />
            <ul className="mt-10 divide-y divide-silver/10 border-y border-silver/10">
              {data.types.map((type) => (
                <li key={type.id} className="flex items-start gap-4 py-5">
                  <span className="mt-0.5 shrink-0 text-ceramic/70">
                    <Motif motif="aircraft" size={26} strokeWidth={1.7} />
                  </span>
                  <span>
                    <span className="block text-[0.95rem] font-medium text-chrome">{type.name}</span>
                    <span className="mt-1 block text-[0.82rem] leading-relaxed text-ash">{type.note}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <SectionHeading eyebrow="Maintenance schedule" title="When it should happen." />
            <ol className="mt-10 grid gap-px overflow-hidden rounded-panel bg-silver/10">
              {data.schedule.map((row, i) => (
                <li key={row.id} className="grid gap-2 bg-graphite p-6 sm:grid-cols-[auto_1fr] sm:items-baseline sm:gap-6">
                  <span className="numeral text-[0.9rem] whitespace-nowrap text-ceramic">
                    <span className="mr-3 text-[0.66rem] tracking-[0.22em] text-ash">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {row.interval}
                  </span>
                  <span className="text-[0.88rem] leading-relaxed text-silver/70">{row.work}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="shell">
          <Reveal>
            <div className="panel-glass rounded-panel p-8 sm:p-11">
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-ceramic"><Motif motif="shield" size={38} strokeWidth={1.6} /></span>
                <h2 className="font-display text-[1.4rem] tracking-tight text-chrome">
                  Scope, compliance and the things we will not touch
                </h2>
              </div>
              <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
                {data.compliance.map((line) => (
                  <li key={line} className="flex items-start gap-3 text-[0.88rem] leading-relaxed text-silver/72">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden className="mt-0.5 shrink-0">
                      <path d="M3.5 8.4l3 3L12.5 5" stroke="var(--color-ceramic)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Fleet                                                               */
/* ------------------------------------------------------------------ */

export function FleetDetails({ data }: { data: NonNullable<ServiceDoc["fleet"]> }) {
  return (
    <>
      <section className="relative section-y">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Fleet sizes"
              title="Cycles scale with the yard."
              lede="Cadence is set per vehicle class, not averaged across the fleet — a long-haul tractor unit and a branded service bakkie do not soil at the same rate."
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-12 overflow-x-auto rounded-panel ring-hairline">
              <table className="w-full min-w-[38rem] border-collapse text-left">
                <caption className="sr-only">Fleet size tiers and their recommended cleaning cadence</caption>
                <thead>
                  <tr className="border-b border-silver/12 bg-graphite/80">
                    <th scope="col" className="label-tech px-6 py-4 text-silver/60">Fleet size</th>
                    <th scope="col" className="label-tech px-6 py-4 text-silver/60">Cadence</th>
                    <th scope="col" className="label-tech px-6 py-4 text-silver/60">Typically</th>
                  </tr>
                </thead>
                <tbody>
                  {data.tiers.map((tier) => (
                    <tr key={tier.id} className="border-t border-silver/8 bg-graphite/40 transition-colors hover:bg-gunmetal/60">
                      <th scope="row" className="numeral px-6 py-5 font-normal whitespace-nowrap text-chrome">{tier.size}</th>
                      <td className="px-6 py-5 text-[0.88rem] text-ceramic">{tier.cadence}</td>
                      <td className="px-6 py-5 text-[0.86rem] leading-relaxed text-silver/65">{tier.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative pb-8">
        <div className="shell">
          <Reveal>
            <SectionHeading eyebrow="What changes" title="What fleet managers actually notice." />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-panel bg-silver/10 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
            {data.outcomes.map((outcome) => (
              <RevealItem key={outcome.id}>
                <article className="group flex h-full flex-col gap-4 bg-graphite p-7 transition-colors duration-500 hover:bg-gunmetal">
                  <span className="text-silver/60 transition-colors duration-500 group-hover:text-ceramic">
                    <Motif motif={outcome.motif ?? "fleet"} size={38} strokeWidth={1.6} />
                  </span>
                  <h3 className="font-display text-[1.05rem] tracking-tight text-chrome">{outcome.title}</h3>
                  <p className="text-[0.85rem] leading-relaxed text-silver/62">{outcome.body}</p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
