import type { Metadata } from "next";
import { Suspense } from "react";
import { getSiteContent } from "@/lib/content/store";
import { pageMetadata } from "@/lib/seo";
import { SolarCalculator } from "@/components/site/solar/SolarCalculator";
import { toCalculatorEconomics, toServiceOption } from "@/lib/projections";
import { LeadForm } from "@/components/site/LeadForm";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { BeadField } from "@/components/motion/BeadField";
import { Eyebrow, MicronRule } from "@/components/ui/Section";
import { telHref, whatsappHref } from "@/lib/links";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("quote", "/quote");
}

export default async function QuotePage() {
  const { quotePage, services, business, contact } = await getSiteContent();
  const solar = services.find((s) => s.solar)?.solar;
  const serviceOptions = services
    .filter((s) => s.status === "published")
    .map(toServiceOption);

  return (
    <>
      <section className="relative isolate overflow-hidden pt-14 pb-14 sm:pt-20">
        <BeadField density={30} rise />
        <div className="shell relative z-10 max-w-3xl">
          <Reveal>
            <Eyebrow>{quotePage.hero.eyebrow}</Eyebrow>
            <h1 className="text-display mt-5 text-balance text-chrome">{quotePage.hero.title}</h1>
            <p className="text-lede mt-6 text-pretty">{quotePage.hero.lede}</p>
          </Reveal>
        </div>
      </section>

      {solar ? (
        <section className="relative pb-16" id="calculator">
          <div className="shell">
            <Reveal delay={0.05}>
              <SolarCalculator
                economics={toCalculatorEconomics(solar)}
                calculator={quotePage.calculator}
                currency={business.currency}
                locale={business.locale}
                quotePath=""
              />
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="relative pb-8">
        <div className="shell">
          <MicronRule label="Everything else" />
          <RevealGroup className="mt-10 grid gap-px overflow-hidden rounded-panel bg-silver/10 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
            {quotePage.assurances.map((item) => (
              <RevealItem key={item.id}>
                <div className="flex h-full flex-col gap-2 bg-graphite p-6">
                  <p className="text-[0.9rem] font-medium text-chrome">{item.label}</p>
                  <p className="text-[0.79rem] leading-relaxed text-ash">{item.detail}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="relative section-y" id="enquiry">
        <div className="shell grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-14">
          <Reveal direction="right">
            <Suspense fallback={<div className="panel-glass h-[46rem] animate-pulse rounded-panel" aria-hidden />}>
              <LeadForm
                services={serviceOptions}
                source="quote"
                title={quotePage.form.title}
                lede={quotePage.form.lede}
                consentNote={quotePage.form.consentNote}
                successTitle={quotePage.form.successTitle}
                successBody={quotePage.form.successBody}
                submitLabel={quotePage.form.submitLabel}
                enquiryEmail={contact.quotesEmail || contact.email}
                whatsappNumber={contact.whatsapp}
              />
            </Suspense>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <div className="panel-solid rounded-panel p-7 sm:p-9">
              <h2 className="font-display text-[1.25rem] tracking-tight text-chrome">
                Would rather just talk?
              </h2>
              <p className="mt-3 text-[0.89rem] leading-relaxed text-silver/68">
                Send a photograph on WhatsApp with a rough panel count or a registration number. It is
                usually faster than a form, and we can tell you straight away whether we are the right
                people for the job.
              </p>

              <div className="mt-7 flex flex-col gap-3">
                <a
                  href={whatsappHref(contact)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-4 rounded-tile border border-silver/15 px-5 py-4 transition-colors hover:border-ceramic/45"
                >
                  <span className="text-[0.9rem] text-chrome">WhatsApp</span>
                  <span className="numeral text-[0.86rem] text-ceramic">{contact.phoneDisplay}</span>
                </a>
                <a
                  href={telHref(contact)}
                  className="flex items-center justify-between gap-4 rounded-tile border border-silver/15 px-5 py-4 transition-colors hover:border-ceramic/45"
                >
                  <span className="text-[0.9rem] text-chrome">Call</span>
                  <span className="numeral text-[0.86rem] text-ceramic">{contact.phoneDisplay}</span>
                </a>
                <a
                  href={`mailto:${contact.quotesEmail}`}
                  className="flex items-center justify-between gap-4 rounded-tile border border-silver/15 px-5 py-4 transition-colors hover:border-ceramic/45"
                >
                  <span className="text-[0.9rem] text-chrome">Email</span>
                  <span className="text-[0.82rem] break-all text-ceramic">{contact.quotesEmail}</span>
                </a>
              </div>

              <p className="mt-7 border-t border-silver/10 pt-6 text-[0.8rem] leading-relaxed text-ash">
                {contact.responseTimeNote}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
