import type { Metadata } from "next";
import { Suspense } from "react";
import { getSiteContent } from "@/lib/content/store";
import { pageMetadata } from "@/lib/seo";
import { LeadForm } from "@/components/site/LeadForm";
import { toServiceOption } from "@/lib/projections";
import Image from "next/image";
import { asset } from "@/lib/asset";
import { Motif } from "@/components/icons/Motif";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { BeadField } from "@/components/motion/BeadField";
import { Eyebrow, MicronRule } from "@/components/ui/Section";
import { telHref, whatsappHref, mailHref } from "@/lib/links";
import type { IllustrationMotif } from "@/content/types";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("contact", "/contact");
}

const CHANNEL_MOTIF: Record<string, IllustrationMotif> = {
  phone: "gloss-meter",
  whatsapp: "droplet",
  email: "microfibre",
  form: "shield",
  social: "sparkle",
};

export default async function ContactPage() {
  const { contactPage, contact, services, business } = await getSiteContent();

  // The form's select needs three fields; sending whole service documents
  // would put every service page into this page's payload.
  const serviceOptions = services
    .filter((s) => s.status === "published")
    .map(toServiceOption);

  /* Channel values live in the Contact Information module, so the cards here
     resolve at render rather than being duplicated in page content. */
  const channels = contactPage.channels.map((channel) => {
    switch (channel.kind) {
      case "phone":
        return { ...channel, value: contact.phoneDisplay, href: telHref(contact) };
      case "whatsapp":
        return { ...channel, value: contact.phoneDisplay, href: whatsappHref(contact) };
      case "email":
        return { ...channel, value: contact.email, href: mailHref(contact.email) };
      default:
        return channel;
    }
  });

  return (
    <>
      <section className="relative isolate overflow-hidden pt-14 pb-14 sm:pt-20">
        <BeadField density={26} rise />
        <div className="shell relative z-10 max-w-3xl">
          <Reveal>
            <Eyebrow>{contactPage.hero.eyebrow}</Eyebrow>
            <h1 className="text-display mt-5 text-balance text-chrome">{contactPage.hero.title}</h1>
            <p className="text-lede mt-6 text-pretty">{contactPage.hero.lede}</p>
          </Reveal>
        </div>
      </section>

      <section className="relative pb-16">
        <div className="shell">
          <RevealGroup className="grid gap-px overflow-hidden rounded-panel bg-silver/10 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
            {channels.map((channel) => {
              const Wrapper = channel.href.startsWith("#") ? "div" : "a";
              return (
                <RevealItem key={channel.id}>
                  <Wrapper
                    {...(Wrapper === "a"
                      ? {
                          href: channel.href,
                          ...(channel.kind === "whatsapp"
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {}),
                        }
                      : {})}
                    className="group flex h-full flex-col gap-3.5 bg-graphite p-7 transition-colors duration-500 hover:bg-gunmetal"
                  >
                    <span className="text-silver/60 transition-colors duration-500 group-hover:text-ceramic">
                      <Motif motif={CHANNEL_MOTIF[channel.kind] ?? "shield"} size={38} strokeWidth={1.6} />
                    </span>
                    <span className="label-tech text-silver/60">{channel.label}</span>
                    <span className="numeral text-[0.98rem] break-words text-chrome transition-colors group-hover:text-ceramic">
                      {channel.value}
                    </span>
                    <span className="mt-auto pt-2 text-[0.78rem] leading-relaxed text-ash">{channel.note}</span>
                  </Wrapper>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <section className="relative pb-20" id="enquiry">
        <div className="shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-14">
          <Reveal direction="right">
            <Suspense fallback={<FormFallback />}>
              <LeadForm
                services={serviceOptions}
                source="contact"
                title={contactPage.form.title}
                lede={contactPage.form.lede}
                consentNote={contactPage.form.consentNote}
                successTitle={contactPage.form.successTitle}
                successBody={contactPage.form.successBody}
                submitLabel={contactPage.form.submitLabel}
                enquiryEmail={contact.quotesEmail || contact.email}
                whatsappNumber={contact.whatsapp}
              />
            </Suspense>
          </Reveal>

          <Reveal direction="left" delay={0.1} className="flex flex-col gap-6">
            <div className="panel-solid rounded-panel p-7 sm:p-8">
              <h2 className="font-display text-[1.2rem] tracking-tight text-chrome">
                {contactPage.addressCard.title}
              </h2>
              <p className="mt-3 text-[0.88rem] leading-relaxed text-silver/68">
                {contactPage.addressCard.body}
              </p>
              <MicronRule className="my-6" />
              <p className="label-tech mb-3 text-silver/60">Where we work</p>
              <ul className="flex flex-wrap gap-x-3 gap-y-1.5">
                {business.serviceAreas.map((area) => (
                  <li key={area} className="numeral text-[0.72rem] tracking-[0.1em] text-silver/60">
                    {area}
                  </li>
                ))}
              </ul>
            </div>

            <div className="panel-solid overflow-hidden rounded-panel">
              <Image
                src={asset("/profile/shop-products.webp")}
                alt="Perfect Detailing coating and aftercare products on display in the Witbank shop"
                width={900}
                height={640}
                sizes="(min-width: 1024px) 26rem, 92vw"
                className="h-auto w-full"
              />
              <div className="p-7 sm:p-8">
                <h2 className="font-display text-[1.2rem] tracking-tight text-chrome">Visit the shop</h2>
                <p className="mt-3 text-[0.88rem] leading-relaxed text-silver/68">
                  Coatings, aftercare products and honest advice from the people who apply them.
                  {" "}
                  {business.address.city}, {business.address.province}.
                </p>
              </div>
            </div>

            <div className="panel-solid rounded-panel p-7 sm:p-8">
              <h2 className="font-display text-[1.2rem] tracking-tight text-chrome">Operating hours</h2>
              <dl className="mt-5 divide-y divide-silver/10">
                {contact.hours.map((hour) => (
                  <div key={hour.id} className="flex items-baseline justify-between gap-4 py-2.5">
                    <dt className="text-[0.86rem] text-silver/70">{hour.day}</dt>
                    <dd className={`numeral text-[0.84rem] ${hour.closed ? "text-ash" : "text-ceramic"}`}>
                      {hour.closed ? "Closed" : `${hour.opens} – ${hour.closes}`}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-[0.8rem] leading-relaxed text-ash">{contact.responseTimeNote}</p>
            </div>

            {contact.socials.some((s) => s.enabled) ? (
              <div className="panel-solid rounded-panel p-7 sm:p-8">
                <h2 className="font-display text-[1.2rem] tracking-tight text-chrome">Elsewhere</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {contact.socials
                    .filter((s) => s.enabled)
                    .map((social) => (
                      <li key={social.id}>
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer me"
                          className="group flex items-baseline justify-between gap-4 text-[0.88rem] text-silver/70 transition-colors hover:text-ceramic"
                        >
                          {social.platform}
                          <span className="numeral text-[0.76rem] text-ash transition-colors group-hover:text-ceramic">
                            {social.handle}
                          </span>
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            ) : null}
          </Reveal>
        </div>
      </section>
    </>
  );
}

function FormFallback() {
  return (
    <div className="panel-glass h-[42rem] animate-pulse rounded-panel" aria-hidden />
  );
}
