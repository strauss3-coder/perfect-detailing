"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useMotionConfig } from "./MotionProvider";
import { cn } from "@/lib/utils";

/** Moves its children against the scroll by `speed` × the element's height. */
export function Parallax({
  children,
  speed = 0.12,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { parallax } = useMotionConfig();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [`${speed * 100}%`, `${-speed * 100}%`]);
  const y = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div ref={ref} className={cn(className)}>
      <motion.div style={parallax ? { y } : undefined}>{children}</motion.div>
    </div>
  );
}
