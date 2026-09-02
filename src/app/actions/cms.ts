"use server";

import { redirect } from "next/navigation";
import {
  addLeadNote,
  getSiteContent,
  listLeads,
  saveCollection,
  saveSingleton,
  updateLead,
} from "@/lib/content/store";
import type { CollectionKey, LeadStatus, SingletonKey } from "@/content/types";
import { createSession, destroySession, getSession, verifyCredentials } from "@/lib/portal/auth";

export interface SaveResult {
  status: "idle" | "saved" | "error";
  message: string;
  savedAt?: string;
}

export const IDLE_SAVE: SaveResult = { status: "idle", message: "" };

async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/portal/login");
  return session;
}

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

export async function saveSingletonAction(
  key: SingletonKey,
  payload: string,
): Promise<SaveResult> {
  await requireSession();
  try {
    const value = JSON.parse(payload) as unknown;
    await saveSingleton(key, value);
    return { status: "saved", message: "Saved and published.", savedAt: new Date().toISOString() };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Could not save those changes.",
    };
  }
}

export async function saveCollectionAction(
  key: CollectionKey,
  payload: string,
): Promise<SaveResult> {
  await requireSession();
  try {
    const value = JSON.parse(payload) as unknown;
    if (!Array.isArray(value)) throw new Error("A collection must be a list.");
    await saveCollection(key, value);
    return { status: "saved", message: "Saved and published.", savedAt: new Date().toISOString() };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Could not save those changes.",
    };
  }
}

/**
 * Saves a subset of a collection — the Videos module edits only the gallery
 * items whose `kind` is video, and must not delete the photographs it never
 * showed the editor.
 */
export async function saveFilteredCollectionAction(
  key: CollectionKey,
  filterKey: string,
  filterValue: string,
  payload: string,
): Promise<SaveResult> {
  await requireSession();
  try {
    const edited = JSON.parse(payload) as Record<string, unknown>[];
    if (!Array.isArray(edited)) throw new Error("A collection must be a list.");

    const content = await getSiteContent();
    const existing = content[key] as unknown as Record<string, unknown>[];
    const untouched = existing.filter((item) => String(item[filterKey]) !== filterValue);

    await saveCollection(key, [...untouched, ...edited]);
    return { status: "saved", message: "Saved and published.", savedAt: new Date().toISOString() };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Could not save those changes.",
    };
  }
}

/** Replaces a single document inside a collection, leaving the rest alone. */
export async function saveCollectionItemAction(
  key: CollectionKey,
  itemId: string,
  payload: string,
): Promise<SaveResult> {
  await requireSession();
  try {
    const item = JSON.parse(payload) as Record<string, unknown>;
    const content = await getSiteContent();
    const existing = content[key] as unknown as Record<string, unknown>[];
    const index = existing.findIndex((row) => row.id === itemId);
    if (index === -1) throw new Error("That item no longer exists.");

    const next = [...existing];
    next[index] = item;
    await saveCollection(key, next);
    return { status: "saved", message: "Saved and published.", savedAt: new Date().toISOString() };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Could not save those changes.",
    };
  }
}

/* ------------------------------------------------------------------ */
/* Leads                                                               */
/* ------------------------------------------------------------------ */

export async function updateLeadStatusAction(id: string, status: LeadStatus): Promise<void> {
  const session = await requireSession();
  await updateLead(id, { status }, session.name);
}

export async function assignLeadAction(id: string, assignedTo: string): Promise<void> {
  const session = await requireSession();
  await updateLead(id, { assignedTo }, session.name);
}

export async function setLeadValueAction(id: string, value: number | null): Promise<void> {
  const session = await requireSession();
  await updateLead(id, { estimatedValue: value }, session.name);
}

export async function addLeadNoteAction(id: string, body: string): Promise<void> {
  const session = await requireSession();
  const trimmed = body.trim();
  if (!trimmed) return;
  await addLeadNote(id, trimmed, session.name);
}

export async function exportLeadsCsvAction(): Promise<string> {
  await requireSession();
  const leads = await listLeads();
  const columns = [
    "reference", "createdAt", "status", "source", "name", "email", "phone",
    "company", "propertyType", "serviceSlug", "panelCount", "estimatedValue",
    "assignedTo", "message",
  ] as const;

  const escape = (value: unknown) => {
    const text = value === null || value === undefined ? "" : String(value);
    return `"${text.replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;
  };

  return [
    columns.join(","),
    ...leads.map((lead) => columns.map((column) => escape(lead[column])).join(",")),
  ].join("\n");
}

/* ------------------------------------------------------------------ */
/* Session                                                             */
/* ------------------------------------------------------------------ */

export interface LoginResult {
  status: "idle" | "error";
  message: string;
}

export async function loginAction(_prev: LoginResult, formData: FormData): Promise<LoginResult> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/portal");

  const session = verifyCredentials(email, password);
  if (!session) {
    // A single deliberate delay so a wrong password cannot be distinguished
    // from an unknown address by timing.
    await new Promise((resolve) => setTimeout(resolve, 450));
    return { status: "error", message: "That email and password combination is not recognised." };
  }

  await createSession(session);
  redirect(next.startsWith("/portal") ? next : "/portal");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/portal/login");
}
