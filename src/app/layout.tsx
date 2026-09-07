import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope, Playfair_Display, Sora } from "next/font/google";
import { getSiteContent } from "@/lib/content/store";
import "./globals.css";

const sora = Sora({ variable: "--font-sora", subsets: ["latin"], weight: ["400", "600", "700"], display: "swap" });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });
const jet = JetBrains_Mono({ variable: "--font-jet", subsets: ["latin"], weight: ["400", "500"], display: "swap" });
/* Only the italic is used, and only in the wordmark. */
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], weight: ["400", "500"], style: ["italic"], display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const { seo, brand, business } = await getSiteContent();
  return {
    metadataBase: new URL(seo.siteUrl),
    title: { default: seo.defaultTitle, template: seo.titleTemplate },
    description: seo.defaultDescription,
    keywords: seo.keywords,
    applicationName: brand.name,
    authors: [{ name: brand.name }],
    creator: brand.name,
    openGraph: {
      type: "website",
      locale: business.locale.replace("-", "_"),
      siteName: brand.name,
      title: seo.defaultTitle,
      description: seo.defaultDescription,
      url: seo.siteUrl,
    },
    twitter: {
      card: "summary_large_image",
      site: seo.twitterHandle || undefined,
      title: seo.defaultTitle,
      description: seo.defaultDescription,
    },
    robots: { index: true, follow: true },
    verification: {
      google: seo.verification.google || undefined,
      other: seo.verification.bing ? { "msvalidate.01": seo.verification.bing } : undefined,
    },
    alternates: { canonical: "/" },
  };
}

export const viewport: Viewport = {
  themeColor: "#05070a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-ZA" className={`${sora.variable} ${manrope.variable} ${jet.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
