import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import type { AnalyticsEvent, Lead } from "@/content/types";
import type { StoreAdapter } from "./types";

/**
 * Filesystem adapter — the zero-configuration default.
 *
 * It lets the portal be genuinely functional before anyone has provisioned a
 * database. The moment Supabase credentials appear in the environment the
 * store switches over and this adapter stops being used.
 */

const ROOT = path.join(process.cwd(), ".data");
const FILES = {
  singletons: path.join(ROOT, "singletons.json"),
  collections: path.join(ROOT, "collections.json"),
  leads: path.join(ROOT, "leads.json"),
  events: path.join(ROOT, "events.json"),
} as const;

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(file: string, value: unknown): Promise<void> {
  await fs.mkdir(ROOT, { recursive: true });
  const tmp = `${file}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(value, null, 2), "utf8");
  await fs.rename(tmp, file);
}

export const fileAdapter: StoreAdapter = {
  kind: "file",

  async readSingletons() {
    return readJson<Record<string, unknown>>(FILES.singletons, {});
  },

  async writeSingleton(key, value) {
    const current = await readJson<Record<string, unknown>>(FILES.singletons, {});
    current[key] = value;
    await writeJson(FILES.singletons, current);
  },

  async readCollections() {
    return readJson<Record<string, unknown[]>>(FILES.collections, {});
  },

  async writeCollection(key, items) {
    const current = await readJson<Record<string, unknown[]>>(FILES.collections, {});
    current[key] = items;
    await writeJson(FILES.collections, current);
  },

  async listLeads() {
    return readJson<Lead[]>(FILES.leads, []);
  },

  async writeLeads(leads) {
    await writeJson(FILES.leads, leads);
  },

  async listEvents() {
    return readJson<AnalyticsEvent[]>(FILES.events, []);
  },

  async appendEvent(event) {
    const events = await readJson<AnalyticsEvent[]>(FILES.events, []);
    events.push(event);
    // Keep the local log bounded; Supabase handles retention properly.
    await writeJson(FILES.events, events.slice(-5000));
  },
};
