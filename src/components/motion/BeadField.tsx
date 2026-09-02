"use client";

import { useEffect, useRef } from "react";
import { useMotionConfig } from "./MotionProvider";
import { cn } from "@/lib/utils";

interface BeadFieldProps {
  className?: string;
  density?: number;
  /** Beads rise instead of falling — used behind the hero. */
  rise?: boolean;
}

interface Bead {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  alpha: number;
  phase: number;
}

/**
 * The ambient particle layer: water beads drifting through the dark.
 *
 * Canvas rather than DOM nodes so a hundred of them cost one composited
 * layer. It idles when the tab is hidden or the section scrolls out of view,
 * and never starts at all under `prefers-reduced-motion`.
 */
export function BeadField({ className, density = 42, rise = true }: BeadFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { particles } = useMotionConfig();

  useEffect(() => {
    if (!particles) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let beads: Bead[] = [];
    let raf = 0;
    let running = true;

    const seed = (count: number) =>
      Array.from({ length: count }, (): Bead => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.8 + Math.random() * 2.6,
        vy: (0.09 + Math.random() * 0.34) * (rise ? -1 : 1),
        vx: (Math.random() - 0.5) * 0.09,
        alpha: 0.1 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
      }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(density, (width * height) / 12000));
      beads = seed(Math.max(10, count));
    };

    const draw = (t: number) => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      for (const bead of beads) {
        bead.y += bead.vy;
        bead.x += bead.vx + Math.sin(t / 2600 + bead.phase) * 0.16;

        if (rise && bead.y < -8) {
          bead.y = height + 8;
          bead.x = Math.random() * width;
        } else if (!rise && bead.y > height + 8) {
          bead.y = -8;
          bead.x = Math.random() * width;
        }
        if (bead.x < -10) bead.x = width + 10;
        if (bead.x > width + 10) bead.x = -10;

        // Body
        ctx.beginPath();
        ctx.arc(bead.x, bead.y, bead.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(140, 226, 255, ${bead.alpha * 0.55})`;
        ctx.fill();

        // Specular pin — what makes it read as a bead rather than a dot
        if (bead.r > 1.5) {
          ctx.beginPath();
          ctx.arc(bead.x - bead.r * 0.34, bead.y - bead.r * 0.34, bead.r * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(246, 249, 251, ${bead.alpha * 0.85})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting && !document.hidden;
        if (running && !raf) raf = requestAnimationFrame(draw);
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const onVisibility = () => {
      running = !document.hidden;
      if (running) raf = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [particles, density, rise]);

  if (!particles) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
