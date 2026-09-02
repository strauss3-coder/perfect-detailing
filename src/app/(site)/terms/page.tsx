import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content/store";
import { LegalDoc } from "@/components/site/LegalDoc";

export async function generateMetadata(): Promise<Metadata> {
  const { legal } = await getSiteContent();
  return {
    title: legal.terms.title,
    description: legal.terms.intro,
    alternates: { canonical: "/terms" },
  };
}

export default async function Page() {
  const { legal, business } = await getSiteContent();
  return <LegalDoc document={legal.terms} business={business} />;
}
