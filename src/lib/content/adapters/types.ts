import type { AnalyticsEvent, Lead } from "@/content/types";

export interface StoreAdapter {
  readonly kind: "supabase" | "file";
  /** Raw singleton overrides, keyed by singleton name. */
  readSingletons(): Promise<Record<string, unknown>>;
  writeSingleton(key: string, value: unknown): Promise<void>;
  /** Raw collection overrides. A missing key means "use the seed". */
  readCollections(): Promise<Record<string, unknown[]>>;
  writeCollection(key: string, items: unknown[]): Promise<void>;

  listLeads(): Promise<Lead[]>;
  writeLeads(leads: Lead[]): Promise<void>;

  listEvents(): Promise<AnalyticsEvent[]>;
  appendEvent(event: AnalyticsEvent): Promise<void>;
}
