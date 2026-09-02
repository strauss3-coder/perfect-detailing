"use client";

import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useMotionConfig } from "./MotionProvider";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Tilt card — perspective tilt plus a sheen that tracks the pointer   */
/* ------------------------------------------------------------------ */

export function TiltCard({
  children,
  className,
  strength = 7,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLSpanElement>(null);
  const { cursorEffects } = useMotionConfig();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rx = useSpring(useTransform(py, [0, 1], [strength, -strength]), { stiffness: 220, damping: 24 });
  const ry = useSpring(useTransform(px, [0, 1], [-strength, strength]), { stiffness: 220, damping: 24 });

  function onMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!cursorEffects) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width;
    const ny = (event.clientY - rect.top) / rect.height;
    px.set(nx);
    py.set(ny);
    // The sheen is written straight to CSS custom properties: it tracks the
    // pointer at display rate without a React render per frame.
    sheenRef.current?.style.setProperty("--sx", `${nx * 100}%`);
    sheenRef.current?.style.setProperty("--sy", `${ny * 100}%`);
  }

  function reset() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={cursorEffects ? { rotateX: rx, rotateY: ry, transformPerspective: 1100 } : undefined}
      className={cn("relative", className)}
    >
      {children}
      {cursorEffects && (
        <span
          ref={sheenRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(340px circle at var(--sx, 50%) var(--sy, 50%), color-mix(in oklab, var(--color-ceramic) 14%, transparent), transparent 62%)",
          }}
        />
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Magnetic — pulls toward the pointer, springs back on leave          */
/* ------------------------------------------------------------------ */

export function Magnetic({
  children,
  className,
  radius = 46,
}: {
  children: React.ReactNode;
  className?: string;
  radius?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const { cursorEffects } = useMotionConfig();
  const x = useSpring(0, { stiffness: 260, damping: 18, mass: 0.35 });
  const y = useSpring(0, { stiffness: 260, damping: 18, mass: 0.35 });

  function onMove(event: ReactPointerEvent<HTMLSpanElement>) {
    if (!cursorEffects) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    const dist = Math.hypot(dx, dy) || 1;
    const pull = Math.min(1, radius / dist);
    x.set(dx * 0.32 * pull);
    y.set(dy * 0.32 * pull);
  }

  return (
    <motion.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={cursorEffects ? { x, y } : undefined}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/* Spotlight — a soft light that follows the pointer across a section  */
/* ------------------------------------------------------------------ */

export function Spotlight({
  className,
  size = 620,
  opacity = 0.16,
}: {
  className?: string;
  size?: number;
  opacity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { cursorEffects } = useMotionConfig();

  useEffect(() => {
    if (!cursorEffects) return;
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = host.getBoundingClientRect();
        el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        el.style.setProperty("--my", `${event.clientY - rect.top}px`);
      });
    };

    host.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      host.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [cursorEffects]);

  if (!cursorEffects) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 z-0", className)}
      style={{
        background: `radial-gradient(${size}px circle at var(--mx, 50%) var(--my, 30%), color-mix(in oklab, var(--color-electric) ${opacity * 100}%, transparent), transparent 68%)`,
      }}
    />
  );
}
