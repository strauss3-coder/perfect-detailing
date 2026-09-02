import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content/store";
import { pageMetadata } from "@/lib/seo";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Motif } from "@/components/icons/Motif";
import { CtaBanner } from "@/components/site/CtaBanner";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { BeadField } from "@/components/motion/BeadField";
import { Parallax } from "@/components/motion/Parallax";
import { SectionHeading, Eyebrow, MicronRule } from "@/components/ui/Section";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("about", "/about");
}

export default async function AboutPage() {
  const { about, contact, business } = await getSiteContent();
  const years = new Date().getFullYear() - business.foundedYear;

  return (
    <>
      <section className="relative isolate overflow-hidden pt-14 pb-20 sm:pt-20">
        <BeadField density={26} rise />
        <div className="shell relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <Reveal>
            <Eyebrow>{about.hero.eyebrow}</Eyebrow>
            <h1 className="text-display mt-5 text-balance text-chrome">{about.hero.title}</h1>
            <p className="text-lede mt-6 max-w-xl text-pretty">{about.hero.lede}</p>
            <p className="numeral mt-8 inline-flex items-center gap-3 rounded-full border border-silver/15 px-5 py-2.5 text-[0.85rem] text-silver/70">
              <span className="label-tech text-ceramic">{years} years</span>
              of measured work
            </p>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <Parallax speed={0.06}>
              <MediaFrame media={about.hero.media} priority sizes="(min-width: 1024px) 42vw, 92vw" />
            </Parallax>
          </Reveal>
        </div>
      </section>

      <section className="relative section-y">
        <div className="shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <Reveal direction="right">
            <h2 className="text-title text-balance text-chrome lg:sticky lg:top-32">{about.story.title}</h2>
          </Reveal>
          <Reveal direction="left" delay={0.08}>
            <div className="flex max-w-2xl flex-col gap-6">
              {about.story.paragraphs.map((paragraph, i) => (
                <p
                  key={paragraph.slice(0, 30)}
                  className={
                    i === 0
                      ? "text-[1.08rem] leading-[1.75] text-silver/85"
                      : "text-[0.98rem] leading-[1.78] text-silver/68"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative section-y">
        <div className="shell">
          <Reveal>
            <SectionHeading eyebrow={about.principles.eyebrow} title={about.principles.title} />
          </Reveal>
          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-panel bg-silver/10 sm:grid-cols-2" stagger={0.08}>
            {about.principles.items.map((item, i) => (
              <RevealItem key={item.id}>
                <article className="group relative flex h-full flex-col gap-4 bg-graphite p-8 transition-colors duration-500 hover:bg-gunmetal sm:p-10">
                  <span className="numeral absolute top-8 right-8 text-[0.68rem] tracking-[0.24em] text-ash">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-silver/60 transition-colors duration-500 group-hover:text-ceramic">
                    <Motif motif={item.motif ?? "shield"} size={44} strokeWidth={1.6} />
                  </span>
                  <h3 className="font-display text-[1.24rem] tracking-tight text-chrome">{item.title}</h3>
                  <p className="text-[0.9rem] leading-relaxed text-silver/65">{item.body}</p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="relative section-y">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow={about.standards.eyebrow}
              title={about.standards.title}
              lede={about.standards.lede}
            />
          </Reveal>
          <MicronRule className="mt-12" />
          <RevealGroup className="grid divide-y divide-silver/10 sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-3" stagger={0.05}>
            {about.standards.items.map((item) => (
              <RevealItem key={item.id}>
                <div className="flex flex-col gap-2 py-7">
                  <p className="label-tech text-silver/60">{item.label}</p>
                  <p className="numeral text-[1.35rem] text-ceramic">{item.value}</p>
                  <p className="text-[0.82rem] leading-relaxed text-ash">{item.note}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {about.team.enabled && about.team.members.length ? (
        <section className="relative section-y">
          <div className="shell">
            <Reveal>
              <SectionHeading eyebrow={about.team.eyebrow} title={about.team.title} lede={about.team.lede} />
            </Reveal>
            <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
              {about.team.members.map((member) => (
                <RevealItem key={member.id}>
                  <article className="flex flex-col gap-5">
                    <MediaFrame media={member.media} sizes="(min-width: 1024px) 30vw, 92vw" />
                    <div>
                      <h3 className="font-display text-[1.12rem] tracking-tight text-chrome">{member.name}</h3>
                      <p className="label-tech mt-1.5 text-ceramic">{member.role}</p>
                      <p className="mt-3 text-[0.86rem] leading-relaxed text-silver/65">{member.bio}</p>
                    </div>
                  </article>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      ) : null}

      <div className="pb-24 sm:pb-32">
        <CtaBanner
          title={about.cta.title}
          body={about.cta.body}
          actions={about.cta.actions}
          contact={contact}
        />
      </div>
    </>
  );
}
