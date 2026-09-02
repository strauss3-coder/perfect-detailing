import type { MetadataRoute } from "next";
import { getSiteContent } from "@/lib/content/store";

/* Generated once at build time — no request-specific content, and the static
   export requires this to be stated explicitly. */
export const dynamic = "force-static";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const { seo } = await getSiteContent();
  const base = seo.siteUrl.replace(/\/$/, "");
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/portal", "/portal/", "/api/"] }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
