"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import type { Testimonial } from "@/content/types";
import { Stars } from "./Stars";
import { formatDate, initials } from "@/lib/utils";
import { useMotionConfig } from "@/components/motion/MotionProvider";

/**
 * Review carousel.
 *
 * A native scroll-snap track rather than a transform carousel: it keeps
 * keyboard focus, touch momentum and screen-reader order intact for free, and
 * the arrow controls simply scroll it.
 */
export function ReviewsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const { reduced } = useMotionConfig();

  const syncProgress = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  const scrollByCard = useCallback((direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("li");
    const amount = card ? card.clientWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: amount * direction, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (reduced || paused || testimonials.length < 3) return;
    const id = setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 8;
      if (atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
      else scrollByCard(1);
    }, 5200);
    return () => clearInterval(id);
  }, [paused, reduced, scrollByCard, testimonials.length]);

  if (!testimonials.length) return null;

  return (
    <div
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <ul
        ref={trackRef}
        onScroll={syncProgress}
        className="-mx-[max(1.15rem,4vw)] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[max(1.15rem,4vw)] pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((review) => (
          <li
            key={review.id}
            className="w-[min(88vw,26rem)] shrink-0 snap-start"
          >
            <ReviewCard review={review} />
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center gap-5">
        <div className="relative h-px flex-1 bg-silver/12">
          <motion.span
            className="absolute inset-y-0 left-0 bg-linear-to-r from-ceramic to-electric"
            style={{ width: `${Math.max(8, progress * 100)}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex gap-2">
          <CarouselButton label="Previous reviews" onClick={() => scrollByCard(-1)} direction="left" />
          <CarouselButton label="Next reviews" onClick={() => scrollByCard(1)} direction="right" />
        </div>
      </div>
    </div>
  );
}

function CarouselButton({
  label,
  onClick,
  direction,
}: {
  label: string;
  onClick: () => void;
  direction: "left" | "right";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-full border border-silver/15 text-silver transition-colors duration-300 hover:border-ceramic/45 hover:text-ceramic"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className={direction === "left" ? "rotate-180" : ""}>
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

export function ReviewCard({ review }: { review: Testimonial }) {
  return (
    <figure className="panel-solid group relative flex h-full flex-col gap-5 overflow-hidden rounded-panel p-7 transition-colors duration-500 hover:border-ceramic/30">
      <span
        aria-hidden
        className="absolute -top-8 -right-3 font-display text-[7rem] leading-none text-silver/5 select-none"
      >
        &rdquo;
      </span>

      <div className="flex items-center justify-between gap-4">
        <Stars rating={review.rating} />
        {review.verified ? (
          <span className="label-tech inline-flex items-center gap-1.5 text-[0.55rem] text-ceramic/80">
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M5 8.4l2.2 2.2L11.4 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="8" cy="8" r="6.4" stroke="currentColor" strokeWidth="1.1" />
            </svg>
            Verified
          </span>
        ) : null}
      </div>

      <blockquote className="relative flex-1 text-[0.92rem] leading-relaxed text-silver/85">
        {review.quote}
      </blockquote>

      <figcaption className="flex items-center gap-3.5 border-t border-silver/10 pt-5">
        <span
          aria-hidden
          className="numeral grid h-10 w-10 shrink-0 place-items-center rounded-full border border-silver/15 text-[0.72rem] text-ceramic"
        >
          {initials(review.name)}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[0.88rem] font-medium text-chrome">{review.name}</span>
          <span className="block truncate text-[0.75rem] text-ash">
            {[review.role, review.company].filter(Boolean).join(", ") || review.location}
          </span>
        </span>
        <time dateTime={review.date} className="numeral ml-auto shrink-0 text-[0.68rem] text-ash">
          {formatDate(review.date)}
        </time>
      </figcaption>
    </figure>
  );
}
