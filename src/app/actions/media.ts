"use server";

import { getSiteContent, saveCollection } from "@/lib/content/store";
import { getServerSupabase } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/env";
import { getSession } from "@/lib/portal/auth";
import { redirect } from "next/navigation";
import type { MediaAsset } from "@/content/types";

export interface MediaResult {
  status: "idle" | "saved" | "error";
  message: string;
}

const BUCKET = "media";
const MAX_BYTES = 25 * 1024 * 1024;

const ALLOWED = new Set([
  "image/jpeg", "image/png", "image/webp", "image/avif", "image/svg+xml",
  "video/mp4", "video/webm", "application/pdf",
]);

function kindFor(type: string): MediaAsset["kind"] {
  if (type === "image/svg+xml") return "vector";
  if (type.startsWith("image/")) return "image";
  if (type.startsWith("video/")) return "video";
  return "document";
}

async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/portal/login");
  return session;
}

/**
 * Uploads a file to Supabase Storage and records it in the media library.
 *
 * Without Supabase configured there is nowhere durable to put a binary, so
 * rather than pretending, the action says so and points at the alternative:
 * add the asset by URL.
 */
export async function uploadMediaAction(_prev: MediaResult, formData: FormData): Promise<MediaResult> {
  await requireSession();

  const file = formData.get("file");
  const folder = String(formData.get("folder") ?? "uploads").replace(/[^a-z0-9/-]/gi, "") || "uploads";
  const alt = String(formData.get("alt") ?? "").trim();

  if (!(file instanceof File) || file.size === 0) {
    return { status: "error", message: "Choose a file to upload." };
  }
  if (file.size > MAX_BYTES) {
    return { status: "error", message: "That file is larger than 25 MB. Compress it and try again." };
  }
  if (!ALLOWED.has(file.type)) {
    return { status: "error", message: `${file.type || "That file type"} is not accepted. Use JPEG, PNG, WebP, AVIF, SVG, MP4, WebM or PDF.` };
  }
  if (!alt) {
    return { status: "error", message: "Describe the image so screen readers can announce it." };
  }

  if (!supabaseConfigured) {
    return {
      status: "error",
      message:
        "File uploads need Supabase Storage. Connect a project, or add the asset below by pasting a URL.",
    };
  }

  const db = getServerSupabase();
  if (!db) return { status: "error", message: "Supabase client unavailable." };

  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.-]+/g, "-");
  const path = `${folder}/${Date.now()}-${safeName}`;

  const { error } = await db.storage.from(BUCKET).upload(path, file, {
    cacheControl: "31536000",
    contentType: file.type,
    upsert: false,
  });
  if (error) return { status: "error", message: `Upload failed: ${error.message}` };

  const { data } = db.storage.from(BUCKET).getPublicUrl(path);

  await appendAsset({
    id: crypto.randomUUID(),
    name: file.name,
    kind: kindFor(file.type),
    src: data.publicUrl,
    alt,
    bytes: file.size,
    width: 0,
    height: 0,
    folder,
    createdAt: new Date().toISOString(),
  });

  return { status: "saved", message: `${file.name} uploaded.` };
}

/** Registers an externally hosted asset without uploading anything. */
export async function addMediaByUrlAction(_prev: MediaResult, formData: FormData): Promise<MediaResult> {
  await requireSession();

  const src = String(formData.get("src") ?? "").trim();
  const alt = String(formData.get("alt") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim() || src.split("/").pop() || "asset";
  const folder = String(formData.get("folder") ?? "external").trim() || "external";

  if (!src) return { status: "error", message: "Paste the file's URL or path." };
  if (!/^(https?:\/\/|\/)/.test(src)) {
    return { status: "error", message: "Use a full https:// URL, or a path beginning with a slash." };
  }
  if (!alt) return { status: "error", message: "Describe the image so screen readers can announce it." };

  const extension = src.split(".").pop()?.toLowerCase() ?? "";
  const kind: MediaAsset["kind"] =
    extension === "svg" ? "vector"
      : ["mp4", "webm", "mov"].includes(extension) ? "video"
        : ["pdf"].includes(extension) ? "document"
          : "image";

  await appendAsset({
    id: crypto.randomUUID(),
    name,
    kind,
    src,
    alt,
    bytes: 0,
    width: 0,
    height: 0,
    folder,
    createdAt: new Date().toISOString(),
  });

  return { status: "saved", message: `${name} added to the library.` };
}

export async function deleteMediaAction(id: string): Promise<void> {
  await requireSession();
  const { media } = await getSiteContent();
  await saveCollection("media", media.filter((asset) => asset.id !== id));
}

async function appendAsset(asset: MediaAsset): Promise<void> {
  const { media } = await getSiteContent();
  await saveCollection("media", [asset, ...media]);
}
