import "server-only";
import { cache } from "react";
import { revalidatePath } from "next/cache";
import { seedContent } from "@/content/seed";
import type {
  AnalyticsEvent,
  CollectionKey,
  Lead,
  LeadEvent,
  LeadStatus,
  SingletonKey,
  SiteContent,
} from "@/content/types";
import { supabaseConfigured } from "@/lib/supabase/env";
import { deepMerge } from "./merge";
import { fileAdapter } from "./adapters/file";
import { supabaseAdapter } from "./adapters/supabase";
import type { StoreAdapter } from "./adapters/types";

export function getAdapter(): StoreAdapter {
  return supabaseConfigured ? supabaseAdapter : fileAdapter;
}

export function storeKind(): "supabase" | "file" {
  return getAdapter().kind;
}

const SINGLETONS: SingletonKey[] = [
  "brand", "business", "contact", "navigation", "footer", "appearance", "seo", "legal",
  "home", "about", "process", "galleryPage", "reviewsPage", "faqPage",
  "contactPage", "quotePage",
];

const COLLECTIONS: CollectionKey[] = [
  "services", "galleryItems", "beforeAfter", "testimonials", "faqs",
  "pricing", "posts", "emailTemplates", "media", "users",
];

/**
 * The single read path for every public page and portal screen.
 *
 * Seed content is the floor: an override that only sets `home.hero.lede`
 * changes exactly that, and any field added to the seed later shows up
 * without the editor having to re-save anything.
 */
export const getSiteContent = cache(async (): Promise<SiteContent> => {
  const adapter = getAdapter();
  const [singletons, collections] = await Promise.all([
    adapter.readSingletons().catch((): Record<string, unknown> => ({})),
    adapter.readCollections().catch((): Record<string, unknown[]> => ({})),
  ]);

  const content = { ...seedContent } as SiteContent;
  const bag = content as unknown as Record<string, unknown>;

  for (const key of SINGLETONS) {
    const override = singletons[key];
    if (override !== undefined) {
      bag[key] = deepMerge(seedContent[key], override);
    }
  }

  for (const key of COLLECTIONS) {
    const override = collections[key];
    if (Array.isArray(override)) {
      bag[key] = override;
    }
  }

  return content;
});

/* ------------------------------------------------------------------ */
/* Reads used across the public site                                   */
/* ------------------------------------------------------------------ */

export async function getService(slug: string) {
  const { services } = await getSiteContent();
  return services.find((s) => s.slug === slug && s.status === "published") ?? null;
}

export async function getPublishedServices() {
  const { services } = await getSiteContent();
  return services.filter((s) => s.status === "published").sort((a, b) => a.order - b.order);
}

export async function getPublishedTestimonials() {
  const { testimonials } = await getSiteContent();
  return testimonials.filter((t) => t.status === "published").sort((a, b) => a.order - b.order);
}

export async function getPublishedFaqs() {
  const { faqs } = await getSiteContent();
  return faqs.filter((f) => f.status === "published").sort((a, b) => a.order - b.order);
}

export async function getPublishedPosts() {
  const { posts } = await getSiteContent();
  return posts
    .filter((p) => p.status === "published")
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/* ------------------------------------------------------------------ */
/* Writes — every one of these revalidates the affected pages          */
/* ------------------------------------------------------------------ */

const ALL_PATHS = [
  "/", "/about", "/process", "/gallery", "/reviews", "/faq", "/contact",
  "/quote", "/services", "/journal", "/privacy", "/terms",
];

function revalidateSite() {
  for (const p of ALL_PATHS) revalidatePath(p);
  revalidatePath("/services/[slug]", "page");
  revalidatePath("/journal/[slug]", "page");
}

export async function saveSingleton(key: SingletonKey, value: unknown): Promise<void> {
  await getAdapter().writeSingleton(key, value);
  revalidateSite();
}

export async function saveCollection(key: CollectionKey, items: unknown[]): Promise<void> {
  await getAdapter().writeCollection(key, items);
  revalidateSite();
}

/* ------------------------------------------------------------------ */
/* Leads                                                               */
/* ------------------------------------------------------------------ */

export async function listLeads(): Promise<Lead[]> {
  const leads = await getAdapter().listLeads().catch(() => []);
  return [...leads].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function makeReference(seq: number): string {
  const year = new Date().getFullYear().toString().slice(-2);
  return `PD-${year}-${String(seq).padStart(4, "0")}`;
}

export async function createLead(
  input: Omit<Lead, "id" | "reference" | "createdAt" | "updatedAt" | "notes" | "history" | "status" | "assignedTo">,
): Promise<Lead> {
  const adapter = getAdapter();
  const leads = await adapter.listLeads().catch(() => []);
  const now = new Date().toISOString();

  const lead: Lead = {
    ...input,
    id: crypto.randomUUID(),
    reference: makeReference(leads.length + 1),
    createdAt: now,
    updatedAt: now,
    status: "new",
    assignedTo: "",
    notes: [],
    history: [
      { id: crypto.randomUUID(), kind: "created", author: "Website", createdAt: now, body: `Submitted via ${input.source}` },
    ],
  };

  await adapter.writeLeads([lead, ...leads]);
  revalidatePath("/portal/leads");
  revalidatePath("/portal");
  return lead;
}

export async function updateLead(
  id: string,
  patch: Partial<Pick<Lead, "status" | "assignedTo" | "estimatedValue">>,
  author = "Portal",
): Promise<Lead | null> {
  const adapter = getAdapter();
  const leads = await adapter.listLeads().catch(() => []);
  const index = leads.findIndex((l) => l.id === id);
  if (index === -1) return null;

  const current = leads[index];
  const now = new Date().toISOString();
  const history: LeadEvent[] = [...current.history];

  if (patch.status && patch.status !== current.status) {
    history.push({ id: crypto.randomUUID(), kind: "status", from: current.status, to: patch.status, author, createdAt: now });
  }
  if (patch.assignedTo !== undefined && patch.assignedTo !== current.assignedTo) {
    history.push({ id: crypto.randomUUID(), kind: "assignment", from: current.assignedTo || "Unassigned", to: patch.assignedTo || "Unassigned", author, createdAt: now });
  }

  const next: Lead = { ...current, ...patch, history, updatedAt: now };
  leads[index] = next;
  await adapter.writeLeads(leads);
  revalidatePath("/portal/leads");
  revalidatePath(`/portal/leads/${id}`);
  revalidatePath("/portal");
  return next;
}

export async function addLeadNote(id: string, body: string, author = "Portal"): Promise<Lead | null> {
  const adapter = getAdapter();
  const leads = await adapter.listLeads().catch(() => []);
  const index = leads.findIndex((l) => l.id === id);
  if (index === -1) return null;

  const now = new Date().toISOString();
  const noteId = crypto.randomUUID();
  const current = leads[index];
  const next: Lead = {
    ...current,
    notes: [...current.notes, { id: noteId, body, author, createdAt: now }],
    history: [...current.history, { id: crypto.randomUUID(), kind: "note", body, author, createdAt: now }],
    updatedAt: now,
  };
  leads[index] = next;
  await adapter.writeLeads(leads);
  revalidatePath(`/portal/leads/${id}`);
  return next;
}

export const LEAD_STATUSES: LeadStatus[] = ["new", "contacted", "quoted", "scheduled", "won", "lost"];

/* ------------------------------------------------------------------ */
/* Analytics                                                           */
/* ------------------------------------------------------------------ */

export async function recordEvent(event: Omit<AnalyticsEvent, "id" | "createdAt">): Promise<void> {
  await getAdapter()
    .appendEvent({ ...event, id: crypto.randomUUID(), createdAt: new Date().toISOString() })
    .catch(() => undefined);
}

export async function listEvents(): Promise<AnalyticsEvent[]> {
  return getAdapter().listEvents().catch(() => []);
}
