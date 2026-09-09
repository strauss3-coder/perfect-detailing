import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content/store";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/site/home/Hero";
import { Stats } from "@/components/site/home/Stats";
import { ServicesSection } from "@/components/site/home/ServicesSection";
import { SolarSpotlight } from "@/components/site/home/SolarSpotlight";
import { BeforeAfterTeaser } from "@/components/site/home/BeforeAfterTeaser";
import { ProofFilm } from "@/components/site/home/ProofFilm";
import { WhyUs } from "@/components/site/home/WhyUs";
import { Industries } from "@/components/site/home/Industries";
import { TrustBadges } from "@/components/site/home/TrustBadges";
import { ReviewsCarousel } from "@/components/site/ReviewsCarousel";
import { CtaBanner } from "@/components/site/CtaBanner";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/Section";
import { ButtonLink, Arrow } from "@/components/ui/Button";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("home", "/");
}

export default async function HomePage() {
  const content = await getSiteContent();
  const { home, contact, services, beforeAfter, testimonials } = content;

  const publishedServices = services.filter((s) => s.status === "published");
  const featuredProject =
    beforeAfter.find((p) => p.id === home.beforeAfter.projectId) ?? beforeAfter[0];
  const featuredReviews = testimonials
    .filter((t) => t.status === "published")
    .sort((a, b) => Number(b.featured) - Number(a.featured) || a.order - b.order);

  return (
    <>
      <Hero hero={home.hero} contact={contact} />

      {home.marquee.enabled ? (
        <div className="relative border-y border-silver/10 bg-pitch/50 py-4">
          <Marquee
            items={home.marquee.items}
            className="label-tech text-silver/60"
            durationSeconds={46}
          />
          <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-ink to-transparent" />
          <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-ink to-transparent" />
        </div>
      ) : null}

      <Stats stats={home.stats} />
      <ServicesSection section={home.services} services={publishedServices} />
      <ProofFilm section={home.proof} />
      <BeforeAfterTeaser section={home.beforeAfter} project={featuredProject} />
      <WhyUs section={home.whyUs} />
      <TrustBadges section={home.trustBadges} />
      <Industries section={home.industries} />
      {/* The specialist divisions sit after the vehicle story, not in front
          of it — solar is a service this business offers, not what it is. */}
      <SolarSpotlight section={home.solarSpotlight} contact={contact} />

      <section className="relative section-y">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow={home.reviewsTeaser.eyebrow}
              title={home.reviewsTeaser.title}
              action={
                <ButtonLink href={home.reviewsTeaser.action.href} intent="secondary">
                  {home.reviewsTeaser.action.label}
                  <Arrow />
                </ButtonLink>
              }
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <ReviewsCarousel testimonials={featuredReviews} />
          </Reveal>
        </div>
      </section>

      <div className="pb-24 sm:pb-32">
        <CtaBanner
          eyebrow={home.ctaBanner.eyebrow}
          title={home.ctaBanner.title}
          body={home.ctaBanner.body}
          actions={home.ctaBanner.actions}
          contact={contact}
        />
      </div>
    </>
  );
}
