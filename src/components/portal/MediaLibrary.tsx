"use client";

import { useActionState, useState, useTransition } from "react";
import Image from "next/image";
import type { MediaAsset } from "@/content/types";
import { addMediaByUrlAction, deleteMediaAction, uploadMediaAction } from "@/app/actions/media";
import { Panel, EmptyState } from "./Ui";
import { formatDate, cn } from "@/lib/utils";

const IDLE = { status: "idle" as const, message: "" };

export function MediaLibrary({
  assets,
  supabaseConnected,
  locale,
}: {
  assets: MediaAsset[];
  supabaseConnected: boolean;
  locale: string;
}) {
  const [uploadState, upload, uploading] = useActionState(uploadMediaAction, IDLE);
  const [urlState, addByUrl, addingUrl] = useActionState(addMediaByUrlAction, IDLE);
  const [pending, startTransition] = useTransition();
  const [folder, setFolder] = useState("all");

  const folders = ["all", ...Array.from(new Set(assets.map((a) => a.folder)))];
  const filtered = folder === "all" ? assets : assets.filter((a) => a.folder === folder);

  return (
    <div className="flex flex-col gap-3">
      <div className="grid gap-3 lg:grid-cols-2">
        <Panel title="Upload a file">
          <form action={upload} className="flex flex-col gap-4 p-5">
            {!supabaseConnected ? (
              <p className="rounded-tile border border-amber/30 bg-amber/6 px-3.5 py-3 text-[0.76rem] leading-relaxed text-amber/90">
                Uploads need Supabase Storage. Until a project is connected, add assets by URL using the
                panel beside this one — everything else in the library works normally.
              </p>
            ) : null}

            <div className="flex flex-col gap-1.5">
              <label htmlFor="media-file" className="label-tech text-silver/60">File</label>
              <input
                id="media-file"
                name="file"
                type="file"
                accept="image/*,video/mp4,video/webm,application/pdf"
                className="rounded-tile border border-silver/15 bg-ink/40 px-3.5 py-2.5 text-[0.82rem] text-silver file:mr-3 file:rounded-full file:border-0 file:bg-ceramic/15 file:px-3 file:py-1.5 file:text-[0.78rem] file:text-ceramic"
              />
              <p className="text-[0.72rem] text-ash">JPEG, PNG, WebP, AVIF, SVG, MP4, WebM or PDF. Up to 25 MB.</p>
            </div>

            <Text id="media-alt" name="alt" label="Description (alt text)" placeholder="Coated rooftop array with water beading" />
            <Text id="media-folder" name="folder" label="Folder" defaultValue="uploads" />

            <Result state={uploadState} />

            <button
              type="submit"
              disabled={uploading}
              className="w-fit rounded-full bg-linear-115 from-ceramic to-electric px-5 py-2.5 text-[0.83rem] font-medium text-ink disabled:opacity-50"
            >
              {uploading ? "Uploading…" : "Upload"}
            </button>
          </form>
        </Panel>

        <Panel title="Add by URL">
          <form action={addByUrl} className="flex flex-col gap-4 p-5">
            <p className="text-[0.78rem] leading-relaxed text-ash">
              Register a file that already lives somewhere — your storage bucket, a CDN, or a path inside
              this site&rsquo;s public folder.
            </p>
            <Text id="url-src" name="src" label="URL or path" placeholder="https://… or /brand/logo-bead.svg" />
            <Text id="url-alt" name="alt" label="Description (alt text)" />
            <Text id="url-name" name="name" label="Name (optional)" />
            <Text id="url-folder" name="folder" label="Folder" defaultValue="external" />

            <Result state={urlState} />

            <button
              type="submit"
              disabled={addingUrl}
              className="w-fit rounded-full border border-silver/20 px-5 py-2.5 text-[0.83rem] text-chrome transition-colors hover:border-ceramic/45 hover:text-ceramic disabled:opacity-50"
            >
              {addingUrl ? "Adding…" : "Add to library"}
            </button>
          </form>
        </Panel>
      </div>

      <Panel
        title={`Library · ${assets.length}`}
        action={
          folders.length > 1 ? (
            <select
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
              aria-label="Filter by folder"
              className="h-8 rounded-full border border-silver/15 bg-ink/40 px-3 text-[0.76rem] text-silver outline-none focus:border-ceramic/50"
            >
              {folders.map((name) => (
                <option key={name} value={name}>{name === "all" ? "All folders" : name}</option>
              ))}
            </select>
          ) : null
        }
      >
        {filtered.length ? (
          <ul className="grid gap-px bg-silver/8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((asset) => (
              <li key={asset.id} className="group flex flex-col bg-graphite">
                <div className="media-frame relative aspect-[4/3] overflow-hidden">
                  {asset.kind === "image" || asset.kind === "vector" ? (
                    <Image
                      src={asset.src}
                      alt={asset.alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, 50vw"
                      className="object-contain p-4"
                      unoptimized={asset.kind === "vector"}
                    />
                  ) : (
                    <div className="grid h-full place-items-center">
                      <span className="label-tech text-silver/60">{asset.kind}</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-1.5 p-4">
                  <p className="truncate text-[0.84rem] text-chrome" title={asset.name}>{asset.name}</p>
                  <p className="line-clamp-2 text-[0.74rem] leading-relaxed text-ash">{asset.alt}</p>
                  <p className="numeral mt-auto flex items-center gap-2 pt-2 text-[0.68rem] text-ash">
                    <span>{asset.folder}</span>
                    <span aria-hidden>·</span>
                    <span>{asset.bytes ? `${Math.round(asset.bytes / 1024)} KB` : "linked"}</span>
                    <span aria-hidden>·</span>
                    <span>{formatDate(asset.createdAt, locale)}</span>
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <CopyButton value={asset.src} />
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => startTransition(() => deleteMediaAction(asset.id))}
                      className="rounded-full border border-silver/12 px-3 py-1.5 text-[0.72rem] text-ash transition-colors hover:border-amber/40 hover:text-amber disabled:opacity-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            title="Nothing in this folder"
            body="Upload a file or register one by URL, then paste its path into any image field across the portal."
          />
        )}
      </Panel>
    </div>
  );
}

function Text({
  id, name, label, placeholder, defaultValue,
}: {
  id: string; name: string; label: string; placeholder?: string; defaultValue?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="label-tech text-silver/60">{label}</label>
      <input
        id={id}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="h-11 rounded-tile border border-silver/15 bg-ink/40 px-3.5 text-[0.85rem] text-chrome outline-none placeholder:text-ash focus:border-ceramic/50"
      />
    </div>
  );
}

function Result({ state }: { state: { status: string; message: string } }) {
  if (state.status === "idle" || !state.message) return null;
  return (
    <p
      role="status"
      className={cn(
        "rounded-tile border px-3.5 py-2.5 text-[0.78rem] leading-relaxed",
        state.status === "saved" ? "border-ceramic/35 bg-ceramic/6 text-ceramic" : "border-amber/40 bg-amber/6 text-amber",
      )}
    >
      {state.message}
    </p>
  );
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          setCopied(false);
        }
      }}
      className="rounded-full border border-silver/12 px-3 py-1.5 text-[0.72rem] text-silver/70 transition-colors hover:border-ceramic/45 hover:text-ceramic"
    >
      {copied ? "Copied" : "Copy path"}
    </button>
  );
}
