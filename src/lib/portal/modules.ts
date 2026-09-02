import type { CollectionKey, SingletonKey } from "@/content/types";

/**
 * The portal's module map.
 *
 * Every screen the owner can reach is declared here once: its route, what it
 * edits, and which group it belongs to in the sidebar. Adding a content type
 * to the model and a row to this list is the whole job of exposing it.
 */

export type ModuleGroup = "Overview" | "Pages" | "Services" | "Content" | "Business" | "System";

export interface PortalModule {
  /** URL segment under /portal, or "" for the dashboard. */
  slug: string;
  label: string;
  description: string;
  group: ModuleGroup;
  /** What it edits, when it is a generic document editor. */
  target?:
    | { type: "singleton"; key: SingletonKey }
    | { type: "collection"; key: CollectionKey };
  /** Narrows a collection to a subset, e.g. only video gallery items. */
  filter?: { key: string; value: string };
  /** Bespoke screens that are not generic editors. */
  custom?: "dashboard" | "analytics" | "leads" | "services" | "media";
  badge?: string;
}

export const MODULES: PortalModule[] = [
  { slug: "", label: "Dashboard", description: "Everything at a glance", group: "Overview", custom: "dashboard" },
  { slug: "analytics", label: "Website analytics", description: "Traffic, enquiries and conversion", group: "Overview", custom: "analytics" },
  { slug: "leads", label: "Leads", description: "Every enquiry, quote request and follow-up", group: "Overview", custom: "leads" },

  { slug: "edit/home", label: "Homepage", description: "Hero, statistics, sections and calls to action", group: "Pages", target: { type: "singleton", key: "home" } },
  { slug: "edit/about", label: "About page", description: "Story, principles and standards", group: "Pages", target: { type: "singleton", key: "about" } },
  { slug: "edit/process", label: "Process page", description: "The eight stages and the guarantee", group: "Pages", target: { type: "singleton", key: "process" } },
  { slug: "edit/galleryPage", label: "Gallery page", description: "Headings, categories and empty state", group: "Pages", target: { type: "singleton", key: "galleryPage" } },
  { slug: "edit/reviewsPage", label: "Reviews page", description: "Headings, summary labels and trust indicators", group: "Pages", target: { type: "singleton", key: "reviewsPage" } },
  { slug: "edit/faqPage", label: "FAQ page", description: "Headings and question categories", group: "Pages", target: { type: "singleton", key: "faqPage" } },
  { slug: "edit/contactPage", label: "Contact page", description: "Channels, form copy and the address card", group: "Pages", target: { type: "singleton", key: "contactPage" } },
  { slug: "edit/quotePage", label: "Quote page", description: "Calculator settings, form copy and assurances", group: "Pages", target: { type: "singleton", key: "quotePage" } },

  { slug: "services", label: "All services", description: "Every service page in one place", group: "Services", custom: "services" },
  { slug: "services?category=solar", label: "Solar coatings", description: "Solar panel ceramic coating", group: "Services", badge: "Primary" },
  { slug: "services?category=ceramic", label: "Ceramic coatings", description: "Vehicle ceramic coating", group: "Services" },
  { slug: "services?category=automotive", label: "Automotive services", description: "Detailing, correction, interiors", group: "Services" },
  { slug: "services?category=aircraft", label: "Aircraft services", description: "Dry washing and airframe coating", group: "Services" },
  { slug: "services?category=fleet", label: "Fleet services", description: "Commercial vehicle programmes", group: "Services" },

  { slug: "edit/galleryItems", label: "Gallery", description: "Photographs and video entries", group: "Content", target: { type: "collection", key: "galleryItems" } },
  { slug: "edit/galleryItems/video", label: "Videos", description: "Gallery entries of kind video", group: "Content", target: { type: "collection", key: "galleryItems" }, filter: { key: "kind", value: "video" } },
  { slug: "edit/beforeAfter", label: "Before & after", description: "Comparison projects and their measured outcomes", group: "Content", target: { type: "collection", key: "beforeAfter" } },
  { slug: "edit/testimonials", label: "Testimonials", description: "Customer reviews and ratings", group: "Content", target: { type: "collection", key: "testimonials" } },
  { slug: "edit/faqs", label: "FAQs", description: "Questions and answers by category", group: "Content", target: { type: "collection", key: "faqs" } },
  { slug: "edit/pricing", label: "Pricing", description: "Published rates and what they include", group: "Content", target: { type: "collection", key: "pricing" } },
  { slug: "edit/posts", label: "Journal", description: "Articles and field notes", group: "Content", target: { type: "collection", key: "posts" } },
  { slug: "media", label: "Media library", description: "Images, video and brand assets", group: "Content", custom: "media" },

  { slug: "edit/business", label: "Business information", description: "Legal name, registration, service areas, currency", group: "Business" },
  { slug: "edit/contact", label: "Contact information", description: "Phone, WhatsApp, email, hours and social", group: "Business", target: { type: "singleton", key: "contact" } },
  { slug: "edit/emailTemplates", label: "Email templates", description: "Automated messages sent to customers", group: "Business", target: { type: "collection", key: "emailTemplates" } },
  { slug: "edit/users", label: "Users", description: "Who can access this portal", group: "Business", target: { type: "collection", key: "users" } },

  { slug: "edit/brand", label: "Brand", description: "Name, tagline and which logo mark is live", group: "System", target: { type: "singleton", key: "brand" } },
  { slug: "edit/navigation", label: "Navigation", description: "Menu structure and the announcement strip", group: "System", target: { type: "singleton", key: "navigation" } },
  { slug: "edit/footer", label: "Footer", description: "Columns, links and the watermark", group: "System", target: { type: "singleton", key: "footer" } },
  { slug: "edit/seo", label: "SEO settings", description: "Titles, descriptions and verification", group: "System", target: { type: "singleton", key: "seo" } },
  { slug: "edit/appearance", label: "Appearance", description: "Accent colours, motion and the loading screen", group: "System", target: { type: "singleton", key: "appearance" } },
  { slug: "edit/legal", label: "Legal pages", description: "Privacy policy and terms of service", group: "System", target: { type: "singleton", key: "legal" } },
];

/* The business module edits a singleton; declared separately so the row above
   stays readable. */
const businessModule = MODULES.find((m) => m.slug === "edit/business");
if (businessModule) businessModule.target = { type: "singleton", key: "business" };

export const GROUPS: ModuleGroup[] = ["Overview", "Pages", "Services", "Content", "Business", "System"];

export function moduleForPath(path: string): PortalModule | undefined {
  const normalised = path.replace(/^\/portal\/?/, "").replace(/\/$/, "");
  return MODULES.find((m) => m.slug.split("?")[0] === normalised);
}

/** Maps an /portal/edit/... route back to what it edits. */
export function editorTargetFor(segments: string[]): PortalModule | undefined {
  const slug = ["edit", ...segments].join("/");
  return MODULES.find((m) => m.slug === slug);
}
