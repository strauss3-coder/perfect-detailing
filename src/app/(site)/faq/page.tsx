import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content/store";
import { pageMetadata } from "@/lib/seo";
import { FaqBrowser } from "@/components/site/FaqBrowser";
import { CtaBanner } from "@/components/site/CtaBanner";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Section";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("faq", "/faq");
}

export default async function FaqPage() {
  const { faqPage, faqs, contact } = await getSiteContent();
  const published = faqs.filter((f) => f.status === "published").sort((a, b) => a.order - b.order);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: published.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative pt-14 pb-14 sm:pt-20">
        <div className="shell max-w-3xl">
          <Reveal>
            <Eyebrow>{faqPage.hero.eyebrow}</Eyebrow>
            <h1 className="text-display mt-5 text-balance text-chrome">{faqPage.hero.title}</h1>
            <p className="text-lede mt-6 text-pretty">{faqPage.hero.lede}</p>
          </Reveal>
        </div>
      </section>

      <section className="relative pb-20">
        <div className="shell">
          <Reveal delay={0.06}>
            <FaqBrowser faqs={published} categories={faqPage.categories} />
          </Reveal>
        </div>
      </section>

      <div className="pb-24 sm:pb-32">
        <CtaBanner
          title={faqPage.cta.title}
          body={faqPage.cta.body}
          actions={faqPage.cta.actions}
          contact={contact}
        />
      </div>
    </>
  );
}
