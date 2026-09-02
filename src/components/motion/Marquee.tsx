"use client";

import { cn } from "@/lib/utils";
import { useMotionConfig } from "./MotionProvider";

/**
 * Seamless horizontal ticker. The list is duplicated once and translated by
 * exactly -50%, so the loop point is invisible.
 */
export function Marquee({
  items,
  className,
  separator = "·",
  durationSeconds = 42,
  reverse = false,
}: {
  items: string[];
  className?: string;
  separator?: string;
  durationSeconds?: number;
  reverse?: boolean;
}) {
  const { reduced } = useMotionConfig();
  if (!items.length) return null;

  const run = (key: string) => (
    <span key={key} className="flex shrink-0 items-center" aria-hidden={key === "b"}>
      {items.map((item, i) => (
        <span key={`${key}-${i}`} className="flex items-center">
          <span className="px-6 whitespace-nowrap">{item}</span>
          <span className="text-ceramic/45" aria-hidden>{separator}</span>
        </span>
      ))}
    </span>
  );

  if (reduced) {
    return (
      <div className={cn("flex flex-wrap justify-center gap-x-2 gap-y-1", className)}>
        {items.map((item) => (
          <span key={item} className="px-3">{item}</span>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("relative flex overflow-hidden", className)}>
      <div
        className="flex w-max marquee-x"
        style={{
          animationDuration: `${durationSeconds}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {run("a")}
        {run("b")}
      </div>
    </div>
  );
}
