"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { BeforeAfterProject } from "@/content/types";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { clamp } from "@/lib/utils";

/**
 * Before/after comparison.
 *
 * Pointer-draggable, and operable from the keyboard as a slider — arrow keys
 * step, Home/End jump to either extreme. The handle is a real focusable
 * control with an aria-valuetext, so a screen reader user is told which
 * proportion of each state is showing rather than being handed two images
 * with no relationship.
 */
export function BeforeAfter({
  project,
  className,
  ratio,
}: {
  project: BeforeAfterProject;
  className?: string;
  ratio?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100, 0, 100));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => updateFromClientX(e.clientX);
    const onUp = () => setDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [dragging, updateFromClientX]);

  function onKeyDown(event: React.KeyboardEvent) {
    const step = event.shiftKey ? 10 : 3;
    if (event.key === "ArrowLeft") setPosition((p) => clamp(p - step, 0, 100));
    else if (event.key === "ArrowRight") setPosition((p) => clamp(p + step, 0, 100));
    else if (event.key === "Home") setPosition(0);
    else if (event.key === "End") setPosition(100);
    else return;
    event.preventDefault();
  }

  const aspect = ratio ?? project.after.ratio ?? 3 / 2;

  return (
    <div className={className}>
      <div
        ref={containerRef}
        className="relative touch-pan-y overflow-hidden rounded-panel select-none ring-hairline"
        style={{ aspectRatio: String(aspect) }}
        onPointerDown={(e) => {
          setDragging(true);
          updateFromClientX(e.clientX);
        }}
      >
        {/* After sits underneath, full width */}
        <div className="absolute inset-0">
          <MediaFrame media={project.after} rounded="rounded-none" className="h-full w-full" plateLabel="" />
        </div>

        {/* Before is clipped to the handle position */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <MediaFrame media={project.before} rounded="rounded-none" className="h-full w-full" plateLabel="" />
        </div>

        {/* State labels */}
        <span className="label-tech pointer-events-none absolute top-4 left-4 rounded-full bg-ink/70 px-3 py-1.5 backdrop-blur-sm">
          Before
        </span>
        <span className="label-tech pointer-events-none absolute top-4 right-4 rounded-full bg-ink/70 px-3 py-1.5 text-ceramic backdrop-blur-sm">
          After
        </span>

        {/* Handle */}
        <div className="pointer-events-none absolute inset-y-0" style={{ left: `${position}%` }}>
          <span className="absolute inset-y-0 -left-px w-0.5 bg-linear-to-b from-transparent via-ceramic to-transparent" />
          <button
            type="button"
            role="slider"
            aria-label={`Compare before and after — ${project.title}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(position)}
            aria-valuetext={`${Math.round(position)}% before, ${100 - Math.round(position)}% after`}
            onKeyDown={onKeyDown}
            onPointerDown={(e) => {
              e.stopPropagation();
              setDragging(true);
            }}
            className="pointer-events-auto absolute top-1/2 left-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border border-ceramic/50 bg-ink/80 backdrop-blur-md transition-transform duration-300 hover:scale-110"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" stroke="var(--color-ceramic)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {project.metrics.length ? (
        <dl className="mt-5 grid gap-px overflow-hidden rounded-tile bg-silver/10 sm:grid-cols-3">
          {project.metrics.map((metric) => (
            <div key={metric.id} className="flex flex-col gap-2 bg-graphite p-4">
              <dt className="label-tech text-silver/60">{metric.label}</dt>
              <dd className="flex items-baseline gap-2.5">
                <span className="numeral text-[0.95rem] text-ash line-through decoration-ash/50">{metric.before}</span>
                <svg width="14" height="10" viewBox="0 0 16 10" fill="none" aria-hidden className="shrink-0">
                  <path d="M1 5h13M10 1l4 4-4 4" stroke="var(--color-ceramic)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="numeral text-[1.05rem] font-medium text-ceramic">{metric.after}</span>
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </div>
  );
}
