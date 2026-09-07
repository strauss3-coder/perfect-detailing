import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSiteContent } from "@/lib/content/store";
import { metadataFromSeo } from "@/lib/seo";
import { ServiceHero } from "@/components/site/service/ServiceHero";
import { ServiceSections } from "@/components/site/service/ServiceSections";
import { TheDifference } from "@/components/site/service/TheDifference";
import { BenefitGrid, PackageCards, LifespanAndCare } from "@/components/site/service/ServiceBlocks";
import { AircraftDetails, FleetDetails } from "@/components/site/service/CategoryBlocks";
import { SolarCalculator } from "@/components/site/solar/SolarCalculator";
import { toCalculatorEconomics } from "@/lib/projections";
import { SolarAssumptions, SolarRoi, SolarNeglect } from "@/components/site/solar/SolarEconomicsBlocks";
import { ProcessTimeline } from "@/components/site/ProcessTimeline";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { CtaBanner } from "@/components/site/CtaBanner";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/Section";
import { ButtonLink, Arrow } from "@/components/ui/Button";

export async function generateStaticParams() {
  const { services } = await getSiteContent();
  return services.filter((s) => s.status === "published").map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { services } = await getSiteContent();
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Service not found" };
  return metadataFromSeo(service.seo, `/services/${service.slug}`);
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const content = await getSiteContent();
  const service = content.services.find((s) => s.slug === slug && s.status === "published");
  if (!service) notFound();

  const { contact, business, quotePage, faqs } = content;
  const serviceFaqs = service.faqIds
    .map((id) => faqs.find((f) => f.id === id))
    .filter((f): f is NonNullable<typeof f> => Boolean(f) && f!.status === "published");

  return (
    <>
      <ServiceHero service={service} contact={contact} />

      {/* Solar leads with its price and the calculator — it is the only service
          we can honestly quote without seeing the site. */}
      {service.solar ? (
        <section className="relative pb-8" id="calculator">
          <div className="shell">
            <SolarCalculator
              economics={toCalculatorEconomics(service.solar)}
              calculator={quotePage.calculator}
              currency={business.currency}
              locale={business.locale}
            />
          </div>
        </section>
      ) : null}

      {service.difference ? <TheDifference difference={service.difference} /> : null}

      <ServiceSections sections={service.sections} />

      <BenefitGrid
        benefits={service.benefits}
        title={service.category === "solar" ? "What changes on the roof." : "What you get out of it."}
        lede={
          service.category === "solar"
            ? "Each of these is a mechanism, not a marketing line — and each is measurable on your own array."
            : undefined
        }
      />

      {service.solar ? (
        <>
          <SolarNeglect economics={service.solar} />
          <SolarAssumptions economics={service.solar} />
          <SolarRoi economics={service.solar} currency={business.currency} locale={business.locale} />
        </>
      ) : null}

      {service.aircraft ? <AircraftDetails data={service.aircraft} /> : null}
      {service.fleet ? <FleetDetails data={service.fleet} /> : null}

      <PackageCards
        packages={service.packages}
        currencySymbol={business.currencySymbol}
        title="How it is packaged."
        lede="Every package starts with the same inspection. What differs is how far the correction goes and how long the protection is warranted for."
      />

      {service.steps.length ? (
        <section className="relative section-y">
          <div className="shell">
            <Reveal>
              <SectionHeading
                eyebrow="On the day"
                title="Exactly how this job runs."
                lede="Tap any stage to see what happens inside it."
                action={
                  <ButtonLink href="/process" intent="secondary">
                    Our full method
                    <Arrow />
                  </ButtonLink>
                }
              />
            </Reveal>
            <Reveal delay={0.08}>
              <ProcessTimeline steps={service.steps} className="mt-14" />
            </Reveal>
          </div>
        </section>
      ) : null}

      <LifespanAndCare lifespan={service.lifespan} maintenance={service.maintenance} />

      {serviceFaqs.length ? (
        <section className="relative section-y">
          <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal direction="right">
              <SectionHeading eyebrow="Questions" title={`${service.shortName}, answered.`} />
              <ButtonLink href="/faq" intent="ghost" className="mt-8">
                All questions
                <Arrow />
              </ButtonLink>
            </Reveal>
            <Reveal direction="left" delay={0.08}>
              <FaqAccordion faqs={serviceFaqs} defaultOpenId={serviceFaqs[0]?.id} />
            </Reveal>
          </div>
        </section>
      ) : null}

      <div className="pb-24 sm:pb-32">
        <CtaBanner
          eyebrow="Next step"
          title={`Ready to talk about ${service.shortName.toLowerCase()}?`}
          body="Send us the details and you will have a written, itemised quote within one working day."
          actions={[
            { label: "Get a quote", href: "/quote", intent: "primary" },
            { label: "WhatsApp us", href: "#whatsapp", intent: "secondary" },
          ]}
          contact={contact}
        />
      </div>
    </>
  );
}
