"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { asset } from "@/lib/asset";
import { useMotionConfig } from "@/components/motion/MotionProvider";

/**
 * A silent, looping clip that behaves itself.
 *
 * The poster is a real image and is always painted, so the frame is filled
 * before a single byte of video is fetched. The source is attached only when
 * the element comes within a screen of the viewport, playback stops when it
 * leaves or the tab is hidden, and `prefers-reduced-motion` means the poster
 * is all anyone ever gets.
 */
export function AmbientVideo({
  src,
  poster,
  alt,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
}: {
  src: string;
  poster: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const { reduced } = useMotionConfig();

  /* Arm — attach the source once the clip is nearly on screen. */
  useEffect(() => {
    if (reduced) return;
    const el = wrap.current;
    /* No IntersectionObserver, no clip — the poster is already painted and is
       a perfectly good still. */
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setArmed(true);
          io.disconnect();
        }
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  /* Idle — a clip nobody is looking at should not be decoding frames. */
  useEffect(() => {
    if (!armed || reduced) return;
    const el = wrap.current;
    const v = video.current;
    if (!el || !v) return;

    const play = () => {
      void v.play().catch(() => undefined);
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !document.hidden) play();
          else v.pause();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);

    const onVisibility = () => {
      if (document.hidden) v.pause();
      else if (v.getBoundingClientRect().top < window.innerHeight) play();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [armed, reduced]);

  return (
    <div ref={wrap} className={className ?? "absolute inset-0"}>
      <Image
        src={asset(poster)}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
      {armed ? (
        <video
          ref={video}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          tabIndex={-1}
          onPlaying={() => setPlaying(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1.2s] ease-[var(--ease-gloss)] ${
            playing ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={asset(src)} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
