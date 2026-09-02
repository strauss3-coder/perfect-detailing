import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content/store";
import { LegalDoc } from "@/components/site/LegalDoc";

export async function generateMetadata(): Promise<Metadata> {
  const { legal } = await getSiteContent();
  return {
    title: legal.privacy.title,
    description: legal.privacy.intro,
    alternates: { canonical: "/privacy" },
  };
}

export default async function Page() {
  const { legal, business } = await getSiteContent();
  return <LegalDoc document={legal.privacy} business={business} />;
}
