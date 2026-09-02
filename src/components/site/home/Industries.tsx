import type { HomeContent } from "@/content/types";
import { Motif } from "@/components/icons/Motif";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/Section";

export function Industries({ section }: { section: HomeContent["industries"] }) {
  return (
    <section className="relative section-y">
      <div className="shell">
        <Reveal>
          <SectionHeading eyebrow={section.eyebrow} title={section.title} lede={section.lede} />
        </Reveal>

        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-panel bg-silver/10 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {section.items.map((item) => (
            <RevealItem key={item.id}>
              <article className="group relative flex h-full flex-col gap-4 bg-graphite p-7 transition-colors duration-500 hover:bg-gunmetal">
                <span className="text-silver/60 transition-colors duration-500 group-hover:text-ceramic">
                  <Motif motif={item.motif} size={42} strokeWidth={1.6} />
                </span>
                <h3 className="font-display text-[1.15rem] tracking-tight text-chrome">{item.name}</h3>
                <p className="text-[0.86rem] leading-relaxed text-silver/60">{item.body}</p>
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-px w-0 bg-ceramic/60 transition-[width] duration-[900ms] ease-[var(--ease-gloss)] group-hover:w-full"
                />
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
