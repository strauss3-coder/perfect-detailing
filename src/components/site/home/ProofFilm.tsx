import type { HomeContent } from "@/content/types";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading, MicronRule } from "@/components/ui/Section";
import { ButtonLink, Arrow } from "@/components/ui/Button";

/**
 * Evidence instead of adjectives.
 *
 * Three equal landscape tiles. An earlier version gave the first frame the
 * full shell width, which asked more of the photograph than the library can
 * answer: 1216px of layout wants 2432 device pixels on a retina screen, and
 * nothing here is that wide. At a third of the row each frame is served at
 * roughly its native resolution instead of being stretched.
 */
export function ProofFilm({ section }: { section: HomeContent["proof"] }) {
  return (
    <section className="relative section-y">
      {/* Cold key light behind the strip */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/4 h-[60%]"
        style={{
          background:
            "radial-gradient(52% 60% at 78% 42%, color-mix(in oklab, var(--color-ceramic) 12%, transparent), transparent 70%)",
        }}
      />

      <div className="shell relative z-10">
        <MicronRule label="Evidence" />

        <Reveal className="mt-12">
          <SectionHeading
            eyebrow={section.eyebrow}
            title={section.title}
            lede={section.lede}
            action={
              <ButtonLink href={section.action.href} intent={section.action.intent ?? "ghost"}>
                {section.action.label}
                <Arrow />
              </ButtonLink>
            }
          />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {section.clips.map((clip, i) => (
            <Reveal key={clip.id} delay={0.05 + i * 0.07}>
              <Clip clip={clip} sizes="(min-width: 1024px) 26vw, (min-width: 768px) 46vw, 92vw" fill />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Clip({
  clip,
  sizes,
  fill,
}: {
  clip: HomeContent["proof"]["clips"][number];
  sizes: string;
  /** Stretch the card so cards sharing a row end level. */
  fill?: boolean;
}) {
  return (
    <article
      className={`panel-glass group flex flex-col overflow-hidden rounded-panel ${fill ? "h-full" : ""}`}
    >
      <MediaFrame
        media={clip.media}
        sizes={sizes}
        rounded="rounded-none"
        className={fill ? "min-h-0 flex-1" : ""}
      />
      <div className="flex flex-col gap-2.5 p-6 sm:p-7">
        <span className="label-tech">{clip.label}</span>
        <h3 className="font-display text-[1.15rem] tracking-tight text-chrome text-balance">
          {clip.title}
        </h3>
        <p className="text-[0.9rem] leading-relaxed text-silver/68 text-pretty">{clip.body}</p>
      </div>
    </article>
  );
}
