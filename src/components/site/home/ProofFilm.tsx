import type { HomeContent } from "@/content/types";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading, MicronRule } from "@/components/ui/Section";
import { ButtonLink, Arrow } from "@/components/ui/Button";

/**
 * Footage instead of adjectives.
 *
 * All three clips are landscape, so the composition gives the first one the
 * full width and lets the other two share the row beneath it. That keeps a
 * clear focal point instead of three equal tiles, and it stacks in the order
 * the clips are told in on a phone.
 */
export function ProofFilm({ section }: { section: HomeContent["proof"] }) {
  const [lead, ...rest] = section.clips;

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

        <div className="mt-14 grid gap-5">
          {lead ? (
            <Reveal delay={0.05}>
              <Clip clip={lead} sizes="(min-width: 1024px) 76rem, 92vw" />
            </Reveal>
          ) : null}

          {rest.length ? (
            <div className="grid gap-5 lg:grid-cols-2">
              {rest.map((clip, i) => (
                <Reveal key={clip.id} delay={0.12 + i * 0.07}>
                  <Clip clip={clip} sizes="(min-width: 1024px) 38vw, 92vw" fill />
                </Reveal>
              ))}
            </div>
          ) : null}
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
