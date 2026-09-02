import "server-only";
import type { AnalyticsEvent, Lead } from "@/content/types";
import { getServerSupabase } from "@/lib/supabase/server";
import type { StoreAdapter } from "./types";

/**
 * Supabase adapter.
 *
 * Content is stored as documents: `site_settings` holds one row per singleton,
 * `site_collections` holds one row per collection item with an indexed
 * `sort_order` and `status`. Leads and analytics get real relational tables —
 * see supabase/schema.sql.
 */
export const supabaseAdapter: StoreAdapter = {
  kind: "supabase",

  async readSingletons() {
    const db = getServerSupabase();
    if (!db) return {};
    const { data, error } = await db.from("site_settings").select("key, data");
    if (error || !data) return {};
    return Object.fromEntries(data.map((r) => [r.key as string, r.data]));
  },

  async writeSingleton(key, value) {
    const db = getServerSupabase();
    if (!db) return;
    await db
      .from("site_settings")
      .upsert({ key, data: value, updated_at: new Date().toISOString() }, { onConflict: "key" });
  },

  async readCollections() {
    const db = getServerSupabase();
    if (!db) return {};
    const { data, error } = await db
      .from("site_collections")
      .select("collection, data, sort_order")
      .order("sort_order", { ascending: true });
    if (error || !data) return {};

    const out: Record<string, unknown[]> = {};
    for (const row of data) {
      const key = row.collection as string;
      (out[key] ??= []).push(row.data);
    }
    return out;
  },

  async writeCollection(key, items) {
    const db = getServerSupabase();
    if (!db) return;
    const rows = items.map((item, index) => {
      const doc = item as { id?: string; slug?: string; status?: string };
      return {
        collection: key,
        item_id: doc.id ?? `${key}-${index}`,
        slug: doc.slug ?? null,
        status: doc.status ?? "published",
        sort_order: index,
        data: item,
        updated_at: new Date().toISOString(),
      };
    });
    // Replace the collection atomically enough for a single-editor CMS.
    await db.from("site_collections").delete().eq("collection", key);
    if (rows.length) await db.from("site_collections").insert(rows);
  },

  async listLeads() {
    const db = getServerSupabase();
    if (!db) return [];
    const { data, error } = await db
      .from("leads")
      .select("data")
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    return data.map((r) => r.data as Lead);
  },

  async writeLeads(leads) {
    const db = getServerSupabase();
    if (!db) return;
    const rows = leads.map((lead) => ({
      id: lead.id,
      reference: lead.reference,
      status: lead.status,
      source: lead.source,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      service_slug: lead.serviceSlug,
      panel_count: lead.panelCount,
      estimated_value: lead.estimatedValue,
      assigned_to: lead.assignedTo,
      created_at: lead.createdAt,
      updated_at: lead.updatedAt,
      data: lead,
    }));
    if (rows.length) await db.from("leads").upsert(rows, { onConflict: "id" });
  },

  async listEvents() {
    const db = getServerSupabase();
    if (!db) return [];
    const since = new Date(Date.now() - 90 * 864e5).toISOString();
    const { data, error } = await db
      .from("analytics_events")
      .select("data")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(5000);
    if (error || !data) return [];
    return data.map((r) => r.data as AnalyticsEvent);
  },

  async appendEvent(event) {
    const db = getServerSupabase();
    if (!db) return;
    await db.from("analytics_events").insert({
      id: event.id,
      kind: event.kind,
      path: event.path,
      referrer: event.referrer,
      created_at: event.createdAt,
      data: event,
    });
  },
};
