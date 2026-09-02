import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content/store";
import { pageMetadata } from "@/lib/seo";
import { ProcessTimeline } from "@/components/site/ProcessTimeline";
import { CtaBanner } from "@/components/site/CtaBanner";
import { Reveal } from "@/components/motion/Reveal";
import { BeadField } from "@/components/motion/BeadField";
import { Eyebrow, MicronRule } from "@/components/ui/Section";
import { Motif } from "@/components/icons/Motif";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("process", "/process");
}

export default async function ProcessPage() {
  const { process, contact } = await getSiteContent();

  return (
    <>
      <section className="relative isolate overflow-hidden pt-14 pb-12 sm:pt-20">
        <BeadField density={28} rise />
        <div className="shell relative z-10 max-w-3xl">
          <Reveal>
            <Eyebrow>{process.hero.eyebrow}</Eyebrow>
            <h1 className="text-display mt-5 text-balance text-chrome">{process.hero.title}</h1>
            <p className="text-lede mt-6 text-pretty">{process.hero.lede}</p>
          </Reveal>
        </div>
      </section>

      <section className="relative pb-12">
        <div className="shell">
          <MicronRule label={`${process.steps.length} stages`} />
          <Reveal delay={0.06}>
            <ProcessTimeline steps={process.steps} className="mt-10" />
          </Reveal>
        </div>
      </section>

      <section className="relative section-y">
        <div className="shell">
          <Reveal>
            <div className="panel-glass relative overflow-hidden rounded-panel p-8 sm:p-12">
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, var(--color-ceramic), transparent)" }}
              />
              <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
                <div>
                  <span className="text-ceramic"><Motif motif="shield" size={46} strokeWidth={1.5} /></span>
                  <h2 className="mt-6 text-title text-balance text-chrome">{process.guarantee.title}</h2>
                  <p className="mt-4 text-[0.95rem] leading-relaxed text-silver/70">{process.guarantee.body}</p>
                </div>
                <ul className="grid gap-px self-start overflow-hidden rounded-tile bg-silver/10 sm:grid-cols-2">
                  {process.guarantee.points.map((point) => (
                    <li key={point} className="bg-graphite/90 p-5 text-[0.87rem] leading-relaxed text-silver/72">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="pb-24 sm:pb-32">
        <CtaBanner
          title={process.cta.title}
          body={process.cta.body}
          actions={process.cta.actions}
          contact={contact}
        />
      </div>
    </>
  );
}
