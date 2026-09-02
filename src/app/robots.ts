import type { MetadataRoute } from "next";
import { getSiteContent } from "@/lib/content/store";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const { seo } = await getSiteContent();
  const base = seo.siteUrl.replace(/\/$/, "");
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/portal", "/portal/", "/api/"] }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
