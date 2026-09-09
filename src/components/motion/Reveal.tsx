"use client";

import { motion, type Variants } from "motion/react";
import { useIntensity } from "./MotionProvider";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  /** Travel distance in px before the intensity multiplier. */
  distance?: number;
  once?: boolean;
  as?: "div" | "section" | "li" | "article" | "span" | "header";
}

const offsetFor = (d: Direction, px: number) => {
  switch (d) {
    case "up": return { y: px };
    case "down": return { y: -px };
    case "left": return { x: px };
    case "right": return { x: -px };
    default: return {};
  }
};

/**
 * The site's single scroll-reveal primitive. Everything else composes it.
 *
 * It moves and fades but deliberately does not blur. Motion leaves the settled
 * value on the element, and a `filter` of `blur(0px)` is still a filter: it
 * makes the revealed element the containing block for every `position: fixed`
 * descendant, so an overlay opened from inside a revealed section pins itself
 * to that section instead of to the viewport. `transform` is safe — Motion
 * resets it to `none` once the travel reaches zero.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 26,
  once = true,
  as = "div",
}: RevealProps) {
  const intensity = useIntensity();
  const travel = distance * intensity;

  const variants: Variants = {
    hidden: { opacity: 0, ...offsetFor(direction, travel) },
    shown: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.78 + delay * 0.05,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="shown"
      viewport={{ once, margin: "-12% 0px -8% 0px" }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

/** Staggers its children through the same reveal without per-child delays. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "section";
}) {
  const intensity = useIntensity();
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: stagger * (intensity || 1) } },
      }}
    >
      {children}
    </MotionTag>
  );
}

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag className={cn(className)} variants={revealItem}>
      {children}
    </MotionTag>
  );
}
