import type { ServiceSection } from "@/content/types";
import { Motif } from "@/components/icons/Motif";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow, MicronRule } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

/**
 * The explanatory body of a service page. Sections alternate side so the eye
 * travels down a zig-zag rather than a column, and each carries its own
 * illustrated plate — the argument and the picture of it stay together.
 */
export function ServiceSections({ sections }: { sections: ServiceSection[] }) {
  if (!sections.length) return null;

  return (
    <section className="relative section-y">
      <div className="shell flex flex-col gap-20 lg:gap-28">
        {sections.map((section, i) => {
          const flipped = i % 2 === 1;
          return (
            <article key={section.id} className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
              <Reveal
                direction={flipped ? "left" : "right"}
                className={cn("flex flex-col gap-5", flipped && "lg:order-2")}
              >
                {section.eyebrow ? <Eyebrow>{section.eyebrow}</Eyebrow> : null}
                <h2 className="text-title text-balance text-chrome">{section.title}</h2>
                <p className="text-[1rem] leading-[1.72] text-pretty text-silver/78">{section.body}</p>

                {section.bullets?.length ? (
                  <ul className="mt-2 flex flex-col divide-y divide-silver/10 border-y border-silver/10">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3.5 py-3.5 text-[0.9rem] leading-relaxed text-silver/72">
                        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden className="mt-0.5 shrink-0">
                          <path d="M3.5 8.4l3 3L12.5 5" stroke="var(--color-ceramic)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </Reveal>

              <Reveal
                direction={flipped ? "right" : "left"}
                delay={0.08}
                className={cn("relative", flipped && "lg:order-1")}
              >
                {section.media ? (
                  <MediaFrame media={section.media} />
                ) : (
                  <MotifPlate motif={section.motif} title={section.title} />
                )}
              </Reveal>
            </article>
          );
        })}
      </div>
      <div className="shell"><MicronRule className="mt-20" /></div>
    </section>
  );
}

/** Diagram plate for sections that illustrate a concept rather than a photo. */
function MotifPlate({ motif, title }: { motif?: ServiceSection["motif"]; title: string }) {
  return (
    <div className="panel-glass media-frame grid place-items-center rounded-panel p-10" style={{ aspectRatio: "4 / 3" }}>
      <div aria-hidden className="absolute inset-0 opacity-40 grid-field" style={{ backgroundSize: "40px 40px" }} />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(56% 56% at 50% 46%, color-mix(in oklab, var(--color-ceramic) 15%, transparent), transparent 72%)" }}
      />
      <span className="relative text-silver/60 float-slow">
        <Motif motif={motif ?? "shield"} size={0} strokeWidth={1.4} className="h-40 w-40 sm:h-52 sm:w-52" />
      </span>
      <span className="label-tech absolute bottom-5 left-6 max-w-[70%] truncate text-silver/60 normal-case tracking-[0.14em]">
        {title}
      </span>
    </div>
  );
}
