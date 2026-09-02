import type { SolarEconomics } from "@/content/types";
import { computeRoi } from "@/lib/solar";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { Motif } from "@/components/icons/Motif";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading, MicronRule } from "@/components/ui/Section";
import { Counter } from "@/components/motion/Counter";

/* ------------------------------------------------------------------ */
/* Assumptions                                                         */
/* ------------------------------------------------------------------ */

export function SolarAssumptions({ economics }: { economics: SolarEconomics }) {
  return (
    <section className="relative section-y">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="Working assumptions"
            title="Here is exactly what the numbers below assume."
            lede="Published so you can argue with them. Substitute your own tariff and cleaning rate and the case either holds or it does not — we would rather you checked."
          />
        </Reveal>

        <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-panel bg-silver/10 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
          {economics.assumptions.map((row) => (
            <RevealItem key={row.id}>
              <div className="flex h-full flex-col gap-2 bg-graphite p-6">
                <p className="label-tech text-silver/60">{row.label}</p>
                <p className="numeral text-[1.4rem] text-chrome">{row.value}</p>
                <p className="text-[0.78rem] leading-relaxed text-ash">{row.note}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Worked ROI example                                                  */
/* ------------------------------------------------------------------ */

export function SolarRoi({
  economics,
  currency,
  locale,
}: {
  economics: SolarEconomics;
  currency: string;
  locale: string;
}) {
  const roi = computeRoi(economics.worked, economics.pricePerPanel);
  const money = (v: number) => formatCurrency(v, { currency, locale });
  const paybackMonths = Math.round(roi.paybackMonths);

  const rows = [
    {
      id: "r1",
      label: "Coating investment",
      detail: `${roi.panels} panels at ${money(economics.pricePerPanel)} each, once`,
      value: `− ${money(roi.investment)}`,
      tone: "cost" as const,
    },
    {
      id: "r2",
      label: "Generation recovered each year",
      detail: `${formatNumber(roi.recoveredKwh, locale, 0)} kWh — soiling loss falls from ${(economics.worked.soilingLossBefore * 100).toFixed(1)}% to ${(economics.worked.soilingLossAfter * 100).toFixed(1)}%`,
      value: `+ ${money(roi.recoveredValue)}`,
      tone: "gain" as const,
    },
    {
      id: "r3",
      label: "Cleaning saved each year",
      detail: `${economics.worked.cleansPerYearBefore} visits a year down to ${economics.worked.cleansPerYearAfter}, at ${money(economics.worked.costPerCleanPerPanel)} per panel per visit`,
      value: `+ ${money(roi.cleaningSaving)}`,
      tone: "gain" as const,
    },
    {
      id: "r4",
      label: "Total benefit each year",
      detail: "Recovered generation plus reduced cleaning",
      value: `+ ${money(roi.annualBenefit)}`,
      tone: "total" as const,
    },
  ];

  return (
    <section className="relative section-y">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="The financial case"
            title={`What ${roi.panels} panels actually return.`}
            lede={`A ${formatNumber(economics.worked.systemKwp, locale, 0)} kWp commercial array on the assumptions above. Every figure below is calculated from those inputs, not quoted from a brochure.`}
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 overflow-hidden rounded-panel ring-hairline">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                Annual return on a solar panel ceramic coating for a {roi.panels} panel array
              </caption>
              <thead>
                <tr className="border-b border-silver/12 bg-graphite/80">
                  <th scope="col" className="label-tech px-5 py-4 text-silver/60 sm:px-7">Line item</th>
                  <th scope="col" className="label-tech px-5 py-4 text-right text-silver/60 sm:px-7">Amount</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.id}
                    className={
                      row.tone === "total"
                        ? "border-t border-ceramic/25 bg-ceramic/6"
                        : "border-t border-silver/8 bg-graphite/40"
                    }
                  >
                    <th scope="row" className="px-5 py-5 font-normal sm:px-7">
                      <span className={row.tone === "total" ? "font-medium text-chrome" : "text-chrome"}>{row.label}</span>
                      <span className="mt-1 block max-w-lg text-[0.8rem] leading-relaxed text-ash">{row.detail}</span>
                    </th>
                    <td
                      className={`numeral px-5 py-5 text-right text-[1.05rem] whitespace-nowrap sm:px-7 ${
                        row.tone === "cost" ? "text-silver/70" : "text-ceramic"
                      }`}
                    >
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <RevealGroup className="mt-4 grid gap-4 sm:grid-cols-3" stagger={0.08}>
          <RevealItem>
            <Headline
              value={paybackMonths}
              suffix=" months"
              label="Payback period"
              note="Before the coating has paid for itself"
            />
          </RevealItem>
          <RevealItem>
            <Headline
              value={Math.round(roi.netOverLifetime)}
              prefix="R"
              label={`Net gain over ${roi.lifespanYears} years`}
              note="After deducting the full cost of the coating"
            />
          </RevealItem>
          <RevealItem>
            <Headline
              value={Math.round(roi.returnPct)}
              suffix="%"
              label="Return on investment"
              note={`Across the ${roi.lifespanYears} year service life`}
            />
          </RevealItem>
        </RevealGroup>

        <MicronRule className="mt-16" label="Your array will differ" />
        <p className="mx-auto mt-8 max-w-2xl text-center text-[0.84rem] leading-relaxed text-ash">
          Dustier sites recover more; coastal and high-rainfall sites recover less. We will run this
          calculation on your actual tariff, panel count and cleaning contract before you commit to anything.
        </p>
      </div>
    </section>
  );
}

function Headline({
  value,
  label,
  note,
  prefix,
  suffix,
}: {
  value: number;
  label: string;
  note: string;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div className="panel-solid flex h-full flex-col gap-2 rounded-panel p-7">
      <span className="numeral text-[clamp(2rem,3.6vw,2.9rem)] leading-none font-medium text-ceramic">
        <Counter value={value} prefix={prefix} suffix={suffix} />
      </span>
      <span className="text-[0.92rem] font-medium text-chrome">{label}</span>
      <span className="text-[0.78rem] leading-relaxed text-ash">{note}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* The cost of doing nothing                                           */
/* ------------------------------------------------------------------ */

export function SolarNeglect({ economics }: { economics: SolarEconomics }) {
  if (!economics.neglect.length) return null;

  return (
    <section className="relative isolate overflow-hidden section-y">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-pitch to-transparent" />
        <div
          className="absolute inset-x-0 top-1/3 h-[50vh]"
          style={{ background: "radial-gradient(45% 60% at 30% 50%, color-mix(in oklab, var(--color-amber) 10%, transparent), transparent 72%)" }}
        />
      </div>

      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="If you do nothing"
            title="What an unprotected array quietly costs you."
            lede="None of this triggers an alarm. Output simply drifts downward while the maintenance line item drifts upward, and most owners find out years late."
          />
        </Reveal>

        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {economics.neglect.map((item) => (
            <RevealItem key={item.id} className="h-full">
              <article className="panel-solid group relative flex h-full flex-col gap-4 overflow-hidden rounded-panel p-7">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, color-mix(in oklab, var(--color-amber) 55%, transparent), transparent)" }}
                />
                <span className="text-amber/70">
                  <Motif motif={item.motif ?? "solar-panel"} size={40} strokeWidth={1.6} accent={false} />
                </span>
                <h3 className="font-display text-[1.08rem] tracking-tight text-chrome">{item.title}</h3>
                <p className="flex-1 text-[0.86rem] leading-relaxed text-silver/62">{item.body}</p>
                <p className="numeral border-t border-silver/10 pt-4 text-[0.82rem] text-amber">
                  {item.impact}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
