import type { MetadataRoute } from "next";
import { getSiteContent } from "@/lib/content/store";

/* Generated once at build time — no request-specific content, and the static
   export requires this to be stated explicitly. */
export const dynamic = "force-static";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const { brand, seo } = await getSiteContent();
  return {
    name: brand.name,
    short_name: brand.nameLead,
    description: seo.defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#05070a",
    theme_color: "#05070a",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/brand/mark-social.svg", sizes: "512x512", type: "image/svg+xml" },
    ],
  };
}
