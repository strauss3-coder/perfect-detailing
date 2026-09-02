import type { HomeContent, ServiceDoc } from "@/content/types";
import { ServiceCard } from "@/components/site/ServiceCard";
import { toCardData } from "@/lib/projections";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/Section";
import { ButtonLink, Arrow } from "@/components/ui/Button";

export function ServicesSection({
  section,
  services,
}: {
  section: HomeContent["services"];
  services: ServiceDoc[];
}) {
  const ordered = section.featured
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is ServiceDoc => Boolean(s))
    .map(toCardData);

  return (
    <section className="relative section-y">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow={section.eyebrow}
            title={section.title}
            lede={section.lede}
            action={
              <ButtonLink href={section.action.href} intent="secondary" size="md">
                {section.action.label}
                <Arrow />
              </ButtonLink>
            }
          />
        </Reveal>

        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.09}>
          {ordered.map((service, i) => (
            <RevealItem key={service.id} className={i === 0 ? "sm:col-span-2" : ""}>
              <ServiceCard service={service} featured={i === 0} index={i} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
