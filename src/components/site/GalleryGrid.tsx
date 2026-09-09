"use client";

import { useMemo, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import type { GalleryCategory, GalleryItem } from "@/content/types";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

/**
 * Filterable work grid with a lightbox.
 *
 * Filtering animates the layout rather than swapping it, so the eye can
 * follow which pieces stayed. Items past the first row are lazily decoded by
 * the browser through MediaFrame's underlying next/image.
 *
 * Video items show their poster in the grid — a wall of clips playing at once
 * helps nobody — and play only once opened in the lightbox.
 */
export function GalleryGrid({
  items,
  categories,
  emptyState,
}: {
  items: GalleryItem[];
  categories: GalleryCategory[];
  emptyState: string;
}) {
  const [active, setActive] = useState("all");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const filtered = useMemo(
    () => (active === "all" ? items : items.filter((i) => i.categorySlug === active)),
    [active, items],
  );

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  /* Under each tile the discipline is worth more than the town, which is the
     same on every card. The town stays, in the lightbox. */
  const categoryLabels = useMemo(
    () => new Map(categories.map((c) => [c.slug, c.label])),
    [categories],
  );

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    map.set("all", items.length);
    for (const item of items) {
      map.set(item.categorySlug, (map.get(item.categorySlug) ?? 0) + 1);
    }
    return map;
  }, [items]);

  return (
    <>
      <div role="tablist" aria-label="Filter work by category" className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isActive = active === category.slug;
          const count = counts.get(category.slug) ?? 0;
          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(category.slug)}
              disabled={count === 0}
              className={cn(
                "group relative inline-flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-[0.83rem] transition-colors duration-400",
                isActive
                  ? "border-ceramic/50 text-ceramic"
                  : "border-silver/15 text-silver/65 hover:border-silver/35 hover:text-chrome",
                count === 0 && "cursor-not-allowed opacity-35",
              )}
            >
              {category.label}
              <span className="numeral text-[0.68rem] text-ash">{count}</span>
              {isActive ? (
                <motion.span
                  layoutId="gallery-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-ceramic/8"
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              ) : null}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-[0.92rem] text-ash">{emptyState}</p>
      ) : (
        <motion.ul layout className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.li
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  type="button"
                  onClick={() => setLightbox(item)}
                  className="group block w-full text-left"
                  aria-label={`View ${item.title}`}
                >
                  <span className="relative block">
                    {/* One ratio for every tile. Mixed portrait and landscape
                        intrinsics in a three-column grid leave holes; the
                        lightbox shows each piece at its true shape. */}
                    <MediaFrame
                      media={{ ...item.media, ratio: 4 / 3 }}
                      sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 92vw"
                      plateLabel={item.media.src ? "" : item.title}
                    />
                    {item.kind === "video" ? (
                      <span
                        aria-hidden
                        className="absolute top-1/2 left-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-ceramic/45 bg-ink/70 backdrop-blur-md transition-transform duration-500 group-hover:scale-110"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="var(--color-ceramic)" />
                        </svg>
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-3.5 flex items-baseline justify-between gap-4">
                    <span className="text-[0.9rem] font-medium text-chrome transition-colors group-hover:text-ceramic">
                      {item.title}
                    </span>
                    <span className="numeral shrink-0 text-[0.7rem] text-ash">{item.year}</span>
                  </span>
                  <span className="label-tech mt-1 block text-ash">
                    {categoryLabels.get(item.categorySlug) ?? item.location}
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}

      {/* Mounted on the body: a dialog must not inherit a stacking context or
          a containing block from whichever section it was opened from. There
          is no body to mount onto while this renders on the server, and
          nothing to render into it either — the lightbox always starts
          closed, so both sides agree on an empty overlay. */}
      {typeof document === "undefined" ? null : createPortal(
        <AnimatePresence>
          {lightbox ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="fixed inset-0 z-[190] grid place-items-center bg-ink/94 p-4 backdrop-blur-xl sm:p-10"
              role="dialog"
              aria-modal="true"
              aria-label={lightbox.title}
              onClick={() => setLightbox(null)}
            >
              <motion.div
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "w-full",
                  /* A portrait clip at 4xl would run off the bottom of the screen. */
                  (lightbox.media.ratio ?? 16 / 9) < 1 ? "max-w-[min(26rem,52vh)]" : "max-w-4xl",
                )}
                onClick={(e) => e.stopPropagation()}
              >
                {lightbox.kind === "video" && lightbox.videoUrl ? (
                  <div
                    className="media-frame ring-hairline rounded-panel"
                    style={{ aspectRatio: String(lightbox.media.ratio ?? 16 / 9) }}
                  >
                    <video
                      /* `muted` must be a property before the browser runs its
                         autoplay check, and React applies it too late for that. */
                      ref={(el) => {
                        if (!el) return;
                        el.muted = true;
                        void el.play().catch(() => undefined);
                      }}
                      className="absolute inset-0 h-full w-full object-contain"
                      src={asset(lightbox.videoUrl)}
                      poster={asset((lightbox.poster ?? lightbox.media).src)}
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                      aria-label={lightbox.media.alt}
                    />
                  </div>
                ) : (
                  <MediaFrame media={lightbox.media} sizes="90vw" plateLabel={lightbox.title} priority />
                )}
                <div className="mt-5 flex flex-wrap items-baseline justify-between gap-4">
                  <div>
                    <p className="font-display text-[1.2rem] tracking-tight text-chrome">{lightbox.title}</p>
                    <p className="label-tech mt-1.5 text-ash">
                      {lightbox.location} · {lightbox.year}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLightbox(null)}
                    className="rounded-full border border-silver/20 px-5 py-2.5 text-[0.82rem] text-silver transition-colors hover:border-ceramic/45 hover:text-ceramic"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
