import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content/store";
import { pageMetadata } from "@/lib/seo";
import { GalleryGrid } from "@/components/site/GalleryGrid";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { CtaBanner } from "@/components/site/CtaBanner";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow, SectionHeading, MicronRule } from "@/components/ui/Section";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("gallery", "/gallery");
}

export default async function GalleryPage() {
  const { galleryPage, galleryItems, beforeAfter, contact } = await getSiteContent();
  const items = galleryItems.filter((i) => i.status === "published").sort((a, b) => a.order - b.order);
  const projects = beforeAfter.filter((p) => p.status === "published").sort((a, b) => a.order - b.order);

  return (
    <>
      <section className="relative pt-14 pb-10 sm:pt-20">
        <div className="shell max-w-3xl">
          <Reveal>
            <Eyebrow>{galleryPage.hero.eyebrow}</Eyebrow>
            <h1 className="text-display mt-5 text-balance text-chrome">{galleryPage.hero.title}</h1>
            <p className="text-lede mt-6 text-pretty">{galleryPage.hero.lede}</p>
          </Reveal>
        </div>
      </section>

      <section className="relative pb-20">
        <div className="shell">
          <Reveal delay={0.06}>
            <GalleryGrid
              items={items}
              categories={galleryPage.categories}
              emptyState={galleryPage.emptyState}
            />
          </Reveal>
        </div>
      </section>

      {projects.length ? (
        <section className="relative section-y">
          <div className="shell">
            <MicronRule label="Comparisons" />
            <Reveal className="mt-12">
              <SectionHeading
                eyebrow="Same light, same angle"
                title={galleryPage.beforeAfterTitle}
                lede="Drag each handle. Both frames are the same car on the same visit — one before we started, one after we finished — and what changed between them is listed underneath."
              />
            </Reveal>

            <div className="mt-16 flex flex-col gap-20">
              {projects.map((project, i) => (
                <Reveal key={project.id} delay={0.05} direction={i % 2 ? "left" : "right"}>
                  <article className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:gap-14">
                    <BeforeAfter project={project} className={i % 2 ? "lg:order-2" : ""} />
                    <div className={i % 2 ? "lg:order-1" : ""}>
                      <h3 className="text-title text-balance text-chrome">{project.title}</h3>
                      <p className="mt-4 text-[0.92rem] leading-relaxed text-silver/68">{project.summary}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <div className="pb-24 sm:pb-32">
        <CtaBanner
          eyebrow="Your turn"
          title="Let us add yours to this page."
          body="Send us a photograph of what you have. We will tell you honestly what is achievable and what it will cost."
          actions={[
            { label: "Get a quote", href: "/quote", intent: "primary" },
            { label: "WhatsApp a photo", href: "#whatsapp", intent: "secondary" },
          ]}
          contact={contact}
        />
      </div>
    </>
  );
}
