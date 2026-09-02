import type { FeatureItem, ServiceDoc, ServicePackage } from "@/content/types";
import { Motif } from "@/components/icons/Motif";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/Section";
import { ButtonLink, Arrow } from "@/components/ui/Button";
import { formatCurrency, cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Benefits                                                            */
/* ------------------------------------------------------------------ */

export function BenefitGrid({
  benefits,
  eyebrow = "Benefits",
  title,
  lede,
}: {
  benefits: FeatureItem[];
  eyebrow?: string;
  title: string;
  lede?: string;
}) {
  if (!benefits.length) return null;

  return (
    <section className="relative section-y">
      <div className="shell">
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title={title} lede={lede} />
        </Reveal>

        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-panel bg-silver/10 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {benefits.map((benefit) => (
            <RevealItem key={benefit.id}>
              <article className="group relative flex h-full flex-col gap-4 bg-graphite p-7 transition-colors duration-500 hover:bg-gunmetal">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-silver/60 transition-colors duration-500 group-hover:text-ceramic">
                    <Motif motif={benefit.motif ?? "shield"} size={40} strokeWidth={1.6} />
                  </span>
                  {benefit.metric ? (
                    <span className="label-tech rounded-full border border-silver/15 px-2.5 py-1 text-[0.55rem] text-silver/60 transition-colors duration-500 group-hover:border-ceramic/35 group-hover:text-ceramic">
                      {benefit.metric}
                    </span>
                  ) : null}
                </div>
                <h3 className="font-display text-[1.08rem] tracking-tight text-chrome">{benefit.title}</h3>
                <p className="text-[0.86rem] leading-relaxed text-silver/62">{benefit.body}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Packages                                                            */
/* ------------------------------------------------------------------ */

export function PackageCards({
  packages,
  currencySymbol,
  eyebrow = "Packages",
  title,
  lede,
  quoteHref = "/quote",
}: {
  packages: ServicePackage[];
  currencySymbol: string;
  eyebrow?: string;
  title: string;
  lede?: string;
  quoteHref?: string;
}) {
  if (!packages.length) return null;

  return (
    <section className="relative section-y">
      <div className="shell">
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title={title} lede={lede} />
        </Reveal>

        <RevealGroup className="mt-14 grid gap-4 lg:grid-cols-3" stagger={0.09}>
          {packages.map((pkg) => (
            <RevealItem key={pkg.id} className="h-full">
              <article
                className={cn(
                  "relative flex h-full flex-col overflow-hidden rounded-panel p-7 transition-colors duration-500 sm:p-8",
                  pkg.featured
                    ? "panel-glass border-ceramic/30"
                    : "panel-solid hover:border-silver/25",
                )}
              >
                {pkg.featured ? (
                  <>
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-px"
                      style={{ background: "linear-gradient(90deg, transparent, var(--color-ceramic), transparent)" }}
                    />
                    <span className="label-tech mb-4 w-fit rounded-full border border-ceramic/35 px-2.5 py-1 text-[0.55rem] text-ceramic">
                      Most requested
                    </span>
                  </>
                ) : null}

                <h3 className="font-display text-[1.32rem] tracking-tight text-chrome">{pkg.name}</h3>
                <p className="mt-2.5 text-[0.86rem] leading-relaxed text-silver/62">{pkg.summary}</p>

                <div className="mt-6 flex items-baseline gap-2 border-y border-silver/10 py-5">
                  {pkg.priceFrom !== null ? (
                    <>
                      <span className="numeral text-[2rem] leading-none font-medium text-chrome">
                        {formatCurrency(pkg.priceFrom, { currency: currencySymbol === "R" ? "ZAR" : "ZAR" })}
                      </span>
                      <span className="text-[0.8rem] text-ash">{pkg.priceNote}</span>
                    </>
                  ) : (
                    <span className="text-[0.95rem] text-silver/75">{pkg.priceNote}</span>
                  )}
                </div>

                <p className="label-tech mt-5 text-silver/60">{pkg.duration}</p>

                <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[0.84rem] leading-relaxed text-silver/70">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden className="mt-0.5 shrink-0">
                        <path d="M3.5 8.4l3 3L12.5 5" stroke="var(--color-ceramic)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <ButtonLink href={quoteHref} intent={pkg.featured ? "primary" : "secondary"} size="sm" magnetic={false}>
                    Request this
                    <Arrow />
                  </ButtonLink>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Lifespan + maintenance                                              */
/* ------------------------------------------------------------------ */

export function LifespanAndCare({
  lifespan,
  maintenance,
}: {
  lifespan: ServiceDoc["lifespan"];
  maintenance: ServiceDoc["maintenance"];
}) {
  if (!lifespan.length && !maintenance.items.length) return null;

  return (
    <section className="relative section-y">
      <div className="shell grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <Reveal direction="right">
          <SectionHeading eyebrow="Expected lifespan" title="How long it holds" />
          <dl className="mt-10 divide-y divide-silver/10 border-y border-silver/10">
            {lifespan.map((row) => (
              <div key={row.id} className="grid gap-1.5 py-5 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6">
                <dt className="text-[0.92rem] font-medium text-chrome">{row.label}</dt>
                <dd className="numeral text-[1.05rem] text-ceramic sm:text-right">{row.value}</dd>
                <p className="text-[0.8rem] leading-relaxed text-ash sm:col-span-2">{row.note}</p>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal direction="left" delay={0.1}>
          <div className="panel-glass h-full rounded-panel p-8 sm:p-10">
            <span className="text-ceramic"><Motif motif="microfibre" size={44} strokeWidth={1.5} /></span>
            <h3 className="mt-6 font-display text-[1.4rem] tracking-tight text-chrome">{maintenance.title}</h3>
            <p className="mt-3 text-[0.92rem] leading-relaxed text-silver/70">{maintenance.body}</p>
            <ul className="mt-7 flex flex-col gap-3.5">
              {maintenance.items.map((item, i) => (
                <li key={item} className="flex items-start gap-3.5 text-[0.87rem] leading-relaxed text-silver/72">
                  <span className="numeral mt-px shrink-0 text-[0.68rem] tracking-[0.18em] text-ceramic/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
