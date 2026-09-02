import type { ContactSettings, HomeContent } from "@/content/types";
import { SolarPanelViz } from "@/components/site/SolarPanelViz";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import { ButtonLink, Arrow } from "@/components/ui/Button";
import { resolveHref } from "@/lib/links";

/**
 * The primary-service band. Given full-bleed treatment and a different ground
 * from its neighbours so it reads as the centre of gravity of the page.
 */
export function SolarSpotlight({
  section,
  contact,
}: {
  section: HomeContent["solarSpotlight"];
  contact: ContactSettings;
}) {
  return (
    <section className="relative isolate overflow-hidden section-y">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-graphite/70 to-transparent" />
        <div
          className="absolute inset-x-0 top-1/2 h-[70vh] -translate-y-1/2"
          style={{ background: "radial-gradient(50% 60% at 70% 50%, color-mix(in oklab, var(--color-ceramic) 13%, transparent), transparent 72%)" }}
        />
        <div className="micron-rule absolute inset-x-0 top-0" />
        <div className="micron-rule absolute inset-x-0 bottom-0" />
      </div>

      <div className="shell grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        <Reveal direction="right">
          <Eyebrow>{section.eyebrow}</Eyebrow>
          <h2 className="text-display mt-5 text-balance text-chrome">{section.title}</h2>
          <p className="text-lede mt-6 max-w-xl text-pretty">{section.body}</p>

          <ul className="mt-9 flex flex-col gap-3.5">
            {section.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3.5 text-[0.92rem] leading-relaxed text-silver/80">
                <span aria-hidden className="mt-[0.42rem] grid h-4 w-4 shrink-0 place-items-center rounded-full border border-ceramic/40">
                  <span className="block h-1.5 w-1.5 rounded-full bg-ceramic" />
                </span>
                {bullet}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={resolveHref(section.action.href, contact)} intent="primary" size="lg">
              {section.action.label}
              <Arrow />
            </ButtonLink>
            <ButtonLink href={resolveHref(section.secondaryAction.href, contact)} intent="secondary" size="lg">
              {section.secondaryAction.label}
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal direction="left" delay={0.1} className="relative">
          <div className="panel-glass rounded-panel p-6 sm:p-10">
            <SolarPanelViz className="w-full" />
          </div>
          <span className="label-tech absolute -bottom-3 left-10 rounded-full bg-ink px-3 py-1.5 text-silver/60">
            Coated module · live behaviour
          </span>
        </Reveal>
      </div>
    </section>
  );
}
