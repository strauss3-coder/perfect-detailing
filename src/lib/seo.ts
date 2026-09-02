import type { Metadata } from "next";
import type { PageSeo } from "@/content/types";
import { getSiteContent } from "@/lib/content/store";

/** Builds page metadata from the CMS SEO module, falling back to defaults. */
export async function pageMetadata(key: string, path: string): Promise<Metadata> {
  const { seo } = await getSiteContent();
  const page: PageSeo | undefined = seo.pages[key];
  const title = page?.title ?? seo.defaultTitle;
  const description = page?.description ?? seo.defaultDescription;

  return {
    title,
    description,
    keywords: page?.keywords ?? seo.keywords,
    alternates: { canonical: path },
    robots: page?.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      url: path,
      title,
      description,
      siteName: "Perfect Detailing",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export function metadataFromSeo(page: PageSeo, path: string): Metadata {
  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical: path },
    robots: page.noindex ? { index: false, follow: false } : undefined,
    openGraph: { type: "article", url: path, title: page.title, description: page.description },
    twitter: { card: "summary_large_image", title: page.title, description: page.description },
  };
}
