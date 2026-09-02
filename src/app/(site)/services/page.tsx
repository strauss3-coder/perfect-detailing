import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content/store";
import { pageMetadata } from "@/lib/seo";
import { ServiceCard } from "@/components/site/ServiceCard";
import { toCardData } from "@/lib/projections";
import { CtaBanner } from "@/components/site/CtaBanner";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading, MicronRule } from "@/components/ui/Section";
import { BeadField } from "@/components/motion/BeadField";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("services", "/services");
}

export default async function ServicesIndexPage() {
  const { services, contact, pricing, business } = await getSiteContent();
  const published = services
    .filter((s) => s.status === "published")
    .sort((a, b) => a.order - b.order)
    .map(toCardData);
  const priced = pricing.filter((p) => p.status === "published" && p.price !== null);

  return (
    <>
      <section className="relative isolate overflow-hidden pt-14 pb-16 sm:pt-20">
        <BeadField density={30} rise />
        <div className="shell relative z-10">
          <Reveal>
            <SectionHeading
              as="h1"
              eyebrow="Capability"
              title="Five disciplines, one standard."
              lede="The chemistry changes between a bonnet, a wing and a photovoltaic module. The method does not: inspect, correct, prepare, coat, cure, verify."
            />
          </Reveal>
        </div>
      </section>

      <section className="relative pb-20" aria-labelledby="services-list">
        <div className="shell">
          <h2 id="services-list" className="sr-only">Every service we offer</h2>
          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {published.map((service, i) => (
              <RevealItem key={service.id} className={i === 0 ? "sm:col-span-2" : ""}>
                <ServiceCard service={service} featured={i === 0} index={i} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {priced.length ? (
        <section className="relative section-y">
          <div className="shell">
            <MicronRule label="Published rates" />
            <Reveal>
              <div className="mt-12 grid gap-4 sm:grid-cols-2">
                {priced.map((item) => (
                  <div key={item.id} className="panel-solid flex items-baseline justify-between gap-6 rounded-panel p-7">
                    <div>
                      <p className="text-[1.02rem] font-medium text-chrome">{item.name}</p>
                      <p className="mt-1.5 text-[0.82rem] leading-relaxed text-ash">{item.priceNote}</p>
                    </div>
                    <p className="numeral shrink-0 text-right">
                      <span className="block text-[1.5rem] text-ceramic">
                        {business.currencySymbol}
                        {item.price}
                      </span>
                      <span className="block text-[0.72rem] text-ash">{item.unit}</span>
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
            <p className="mt-8 max-w-2xl text-[0.84rem] leading-relaxed text-ash">
              Everything else is quoted after we have seen the vehicle, aircraft or site — pricing detailing
              work from a photograph is how people end up with an invoice that does not match the estimate.
            </p>
          </div>
        </section>
      ) : null}

      <div className="pb-24 sm:pb-32">
        <CtaBanner
          eyebrow="Not sure which?"
          title="Tell us what you have and we will tell you what it needs."
          body="A photograph and a sentence is usually enough for us to point you at the right service — and to say so if the answer is that you do not need us yet."
          actions={[
            { label: "Get a quote", href: "/quote", intent: "primary" },
            { label: "Ask a question", href: "/contact", intent: "secondary" },
          ]}
          contact={contact}
        />
      </div>
    </>
  );
}
