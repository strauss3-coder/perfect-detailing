import { MOTIF_KEYS } from "@/components/icons/Motif";

/**
 * Field inference for the portal editor.
 *
 * Rather than maintaining a parallel schema for twenty-odd content types, the
 * editor derives its controls from the shape of the document it is given.
 * Seed content always supplies the full shape, so every field an editor should
 * see exists — and adding a field to the content model makes it editable with
 * no portal work at all.
 */

export type FieldKind =
  | "text"
  | "longtext"
  | "richtext"
  | "number"
  | "boolean"
  | "select"
  | "colour"
  | "date"
  | "url"
  | "object"
  | "objectList"
  | "stringList"
  | "unknown";

const LONG_TEXT_KEYS = new Set([
  "lede", "body", "summary", "answer", "blurb", "note", "detail", "description",
  "excerpt", "quote", "intro", "tagline", "positioningStatement", "descriptor",
  "consentNote", "successBody", "disclaimer", "slotNote", "serviceAreaNote",
  "mobileServiceNote", "cardSummary", "responseTimeNote", "headline",
  "defaultDescription", "alt", "caption", "message", "subject",
]);

const RICH_TEXT_KEYS = new Set(["body"]);

const SELECTS: Record<string, string[]> = {
  motif: MOTIF_KEYS,
  status: ["published", "draft", "archived"],
  intent: ["primary", "secondary", "ghost"],
  kind: ["image", "video", "document", "vector"],
  layout: ["inline", "stacked", "mark-only"],
  activeMark: ["bead", "facet", "sweep"],
  intensity: ["subtle", "balanced", "full"],
  role: ["owner", "manager", "staff"],
  category: ["automotive", "ceramic", "solar", "aircraft", "fleet"],
  categorySlug: ["general", "automotive", "ceramic", "solar", "aircraft", "fleet"],
  propertyType: ["residential", "commercial", ""],
  align: ["left", "center"],
};

const HIDDEN_KEYS = new Set(["id"]);

export function isHidden(key: string): boolean {
  return HIDDEN_KEYS.has(key);
}

export function inferKind(key: string, value: unknown): FieldKind {
  if (typeof value === "boolean") return "boolean";
  if (typeof value === "number") return "number";

  if (typeof value === "string") {
    if (SELECTS[key]) return "select";
    if (/^#[0-9a-f]{3,8}$/i.test(value)) return "colour";
    if (key.toLowerCase().endsWith("at") && /^\d{4}-\d{2}-\d{2}/.test(value)) return "date";
    if (key === "date" || key === "updated" || key === "publishedAt") return "date";
    if (key === "href" || key === "url" || key === "src" || key === "videoUrl" || key === "siteUrl") return "url";
    if (RICH_TEXT_KEYS.has(key) && value.length > 240) return "richtext";
    if (LONG_TEXT_KEYS.has(key) || value.length > 90) return "longtext";
    return "text";
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return "stringList";
    return typeof value[0] === "object" && value[0] !== null ? "objectList" : "stringList";
  }

  if (value !== null && typeof value === "object") return "object";
  return "unknown";
}

export function selectOptions(key: string): string[] {
  return SELECTS[key] ?? [];
}

const ACRONYMS: Record<string, string> = {
  seo: "SEO",
  faq: "FAQ",
  faqs: "FAQs",
  url: "URL",
  cta: "CTA",
  id: "ID",
  ids: "IDs",
  og: "OG",
  roi: "ROI",
  kwh: "kWh",
  kwp: "kWp",
  uv: "UV",
  pct: "%",
};

/** `pricePerPanel` → "Price per panel"; `seoTitle` → "SEO title". */
export function humanise(key: string): string {
  const spaced = key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim();

  const words = spaced.split(/\s+/).map((word, index) => {
    const lower = word.toLowerCase();
    if (ACRONYMS[lower]) return ACRONYMS[lower];
    return index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : lower;
  });

  return words.join(" ");
}

/** Picks the best human label for one item inside an array of objects. */
export function itemLabel(item: unknown, index: number): string {
  if (item === null || typeof item !== "object") return `Item ${index + 1}`;
  const record = item as Record<string, unknown>;
  for (const key of ["name", "title", "label", "question", "heading", "day", "platform", "value", "slug", "key"]) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) {
      return value.length > 64 ? `${value.slice(0, 64)}…` : value;
    }
  }
  return `Item ${index + 1}`;
}

/** Builds a blank item matching the shape of an existing one. */
export function blankLike(template: unknown): unknown {
  if (Array.isArray(template)) return [];
  if (template !== null && typeof template === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(template as Record<string, unknown>)) {
      if (key === "id") {
        out[key] = `new-${Math.random().toString(36).slice(2, 9)}`;
      } else if (key === "order") {
        out[key] = 0;
      } else if (key === "status") {
        out[key] = "draft";
      } else {
        out[key] = blankLike(value);
      }
    }
    return out;
  }
  if (typeof template === "number") return 0;
  if (typeof template === "boolean") return false;
  return "";
}
