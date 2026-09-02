import type { BeforeAfterProject, HomeContent } from "@/content/types";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/Section";
import { ButtonLink, Arrow } from "@/components/ui/Button";

export function BeforeAfterTeaser({
  section,
  project,
}: {
  section: HomeContent["beforeAfter"];
  project: BeforeAfterProject | undefined;
}) {
  if (!project) return null;

  return (
    <section className="relative section-y">
      <div className="shell grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:gap-16">
        <Reveal direction="right">
          <SectionHeading eyebrow={section.eyebrow} title={section.title} lede={section.lede} />
          <p className="mt-6 max-w-md text-[0.88rem] leading-relaxed text-ash">{project.summary}</p>
          <div className="mt-8">
            <ButtonLink href={section.action.href} intent="secondary">
              {section.action.label}
              <Arrow />
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal direction="left" delay={0.12}>
          <BeforeAfter project={project} />
        </Reveal>
      </div>
    </section>
  );
}
