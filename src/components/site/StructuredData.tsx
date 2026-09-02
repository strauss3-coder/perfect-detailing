import type { SiteContent } from "@/content/types";

/**
 * JSON-LD for the organisation, its services and the aggregate review score.
 * Everything here is derived from CMS content, so it cannot drift from what
 * the page actually says.
 */
export function StructuredData({ content }: { content: SiteContent }) {
  const { brand, business, contact, seo, services, testimonials } = content;
  const published = testimonials.filter((t) => t.status === "published");
  const average =
    published.length > 0
      ? published.reduce((sum, t) => sum + t.rating, 0) / published.length
      : 0;

  const organisation: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", seo.organisationType],
    "@id": `${seo.siteUrl}/#organisation`,
    name: brand.name,
    description: seo.defaultDescription,
    url: seo.siteUrl,
    telephone: contact.phone,
    email: contact.email,
    foundingDate: String(business.foundedYear),
    priceRange: "R280 – R25 000",
    areaServed: business.serviceAreas.map((name) => ({ "@type": "City", name })),
    openingHoursSpecification: contact.hours
      .filter((h) => !h.closed)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.day,
        opens: h.opens,
        closes: h.closes,
      })),
    sameAs: contact.socials.filter((s) => s.enabled).map((s) => s.url),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Detailing and protective coatings",
      itemListElement: services
        .filter((s) => s.status === "published")
        .map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.name, description: s.cardSummary, url: `${seo.siteUrl}/services/${s.slug}` },
        })),
    },
  };

  if (business.hasPhysicalAddress) {
    organisation.address = {
      "@type": "PostalAddress",
      streetAddress: [business.address.line1, business.address.line2].filter(Boolean).join(", "),
      addressLocality: business.address.city,
      addressRegion: business.address.province,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    };
  }

  if (published.length) {
    organisation.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: average.toFixed(1),
      reviewCount: published.length,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organisation) }}
    />
  );
}
