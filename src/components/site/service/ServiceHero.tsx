import Link from "next/link";
import type { ContactSettings, ServiceDoc } from "@/content/types";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { ButtonLink, Arrow } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { Motif } from "@/components/icons/Motif";
import { resolveHref } from "@/lib/links";

export function ServiceHero({
  service,
  contact,
}: {
  service: ServiceDoc;
  contact: ContactSettings;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-12 pb-20 sm:pt-16 lg:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[60vh]"
        style={{ background: "radial-gradient(56% 100% at 18% 0%, color-mix(in oklab, var(--color-electric) 22%, transparent), transparent 70%)" }}
      />

      <div className="shell relative z-10">
        <Reveal>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="label-tech flex items-center gap-2 text-ash">
              <li><Link href="/" className="transition-colors hover:text-ceramic">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/services" className="transition-colors hover:text-ceramic">Services</Link></li>
              <li aria-hidden>/</li>
              <li className="text-silver/70">{service.shortName}</li>
            </ol>
          </nav>
        </Reveal>

        <div className="grid gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-16">
          <div className="flex flex-col gap-7">
            <Reveal>
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-ceramic"><Motif motif={service.motif} size={46} strokeWidth={1.6} /></span>
                <Eyebrow>{service.eyebrow}</Eyebrow>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="text-display text-balance text-chrome">{service.headline}</h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="text-lede max-w-xl text-pretty">{service.lede}</p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="flex flex-wrap gap-3">
                {service.actions.map((action) => (
                  <ButtonLink
                    key={action.label + action.href}
                    href={resolveHref(action.href, contact)}
                    intent={action.intent ?? "primary"}
                    size="lg"
                  >
                    {action.label}
                    <Arrow />
                  </ButtonLink>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} direction="left">
            <MediaFrame media={service.heroMedia} priority sizes="(min-width: 1024px) 45vw, 92vw" motifScale={0.4} />
          </Reveal>
        </div>

        {service.heroStats.length ? (
          <Reveal delay={0.22}>
            <dl className="mt-16 grid gap-px overflow-hidden rounded-panel bg-silver/10 sm:grid-cols-3">
              {service.heroStats.map((stat) => (
                <div key={stat.id} className="flex flex-col gap-2 bg-graphite/90 p-6">
                  <dd className="numeral text-[clamp(1.8rem,3vw,2.6rem)] leading-none font-medium text-chrome">
                    <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} precision={stat.precision ?? 0} />
                  </dd>
                  <dt className="text-[0.88rem] font-medium text-silver">{stat.label}</dt>
                  {stat.detail ? <p className="text-[0.78rem] leading-relaxed text-ash">{stat.detail}</p> : null}
                </div>
              ))}
            </dl>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
