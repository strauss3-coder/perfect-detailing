import type { MetadataRoute } from "next";
import { getSiteContent } from "@/lib/content/store";

/* Generated once at build time — no request-specific content, and the static
   export requires this to be stated explicitly. */
export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { seo, services, posts } = await getSiteContent();
  const base = seo.siteUrl.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes: { path: string; priority: number; frequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1, frequency: "weekly" },
    { path: "/services", priority: 0.9, frequency: "monthly" },
    { path: "/quote", priority: 0.9, frequency: "monthly" },
    { path: "/process", priority: 0.7, frequency: "yearly" },
    { path: "/gallery", priority: 0.7, frequency: "weekly" },
    { path: "/reviews", priority: 0.7, frequency: "weekly" },
    { path: "/about", priority: 0.6, frequency: "yearly" },
    { path: "/faq", priority: 0.6, frequency: "monthly" },
    { path: "/contact", priority: 0.8, frequency: "yearly" },
    { path: "/journal", priority: 0.5, frequency: "monthly" },
    { path: "/privacy", priority: 0.2, frequency: "yearly" },
    { path: "/terms", priority: 0.2, frequency: "yearly" },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route.path}`,
      lastModified: now,
      changeFrequency: route.frequency,
      priority: route.priority,
    })),
    ...services
      .filter((s) => s.status === "published")
      .map((service) => ({
        url: `${base}/services/${service.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: service.slug === "automotive-detailing" ? 1 : 0.85,
      })),
    ...posts
      .filter((p) => p.status === "published")
      .map((post) => ({
        url: `${base}/journal/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: "yearly" as const,
        priority: 0.45,
      })),
  ];
}
