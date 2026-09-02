import type { BusinessSettings, LegalDocument } from "@/content/types";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow, MicronRule } from "@/components/ui/Section";
import { formatDate } from "@/lib/utils";

/** Shared renderer for the privacy policy and the terms of service. */
export function LegalDoc({
  document,
  business,
}: {
  document: LegalDocument;
  business: BusinessSettings;
}) {
  return (
    <article className="relative pt-14 pb-28 sm:pt-20">
      <div className="shell max-w-3xl">
        <Reveal>
          <Eyebrow>{business.legalName}</Eyebrow>
          <h1 className="text-display mt-5 text-balance text-chrome">{document.title}</h1>
          <p className="text-lede mt-6 text-pretty">{document.intro}</p>
          <p className="numeral mt-6 text-[0.74rem] tracking-[0.16em] text-ash uppercase">
            Last updated {formatDate(document.updated, business.locale)}
          </p>
        </Reveal>

        <MicronRule className="my-14" />

        <div className="flex flex-col gap-12">
          {document.sections.map((section, i) => (
            <Reveal key={section.id} delay={0.04}>
              <section>
                <h2 className="flex items-baseline gap-4 font-display text-[1.3rem] tracking-tight text-chrome">
                  <span className="numeral text-[0.68rem] tracking-[0.24em] text-ash">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {section.heading}
                </h2>
                <div className="mt-4 flex flex-col gap-4 sm:pl-11">
                  {section.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 28)} className="text-[0.94rem] leading-[1.78] text-silver/70">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </article>
  );
}
