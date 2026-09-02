import { cn } from "@/lib/utils";
import { MARKS, type MarkKey } from "./Marks";

interface LogoProps {
  mark?: MarkKey;
  lead?: string;
  trail?: string;
  /** `stacked` puts DETAILING under PERFECT; `inline` runs them together. */
  layout?: "inline" | "stacked" | "mark-only";
  tone?: "colour" | "mono";
  size?: number;
  className?: string;
  /** Rendered as an accessible name on the mark when the lockup has no text. */
  title?: string;
}

/**
 * The lockup. Wordmark is set in the display face at a tight tracking with
 * DETAILING opened right up — the two words read as one object at distance
 * and as a hierarchy up close.
 */
export function Logo({
  mark = "bead",
  lead = "PERFECT",
  trail = "DETAILING",
  layout = "stacked",
  tone = "colour",
  size = 34,
  className,
  title,
}: LogoProps) {
  const Mark = MARKS[mark] ?? MARKS.bead;

  if (layout === "mark-only") {
    return <Mark size={size} tone={tone} title={title ?? `${lead} ${trail}`} className={className} />;
  }

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Mark size={size} tone={tone} />
      <span className="sr-only">{`${lead} ${trail}`}</span>
      {layout === "stacked" ? (
        <span aria-hidden className="flex flex-col leading-none">
          <span
            className="font-display font-bold text-chrome"
            style={{ fontSize: size * 0.42, letterSpacing: "-0.02em" }}
          >
            {lead}
          </span>
          <span
            className="font-mono text-ceramic/85"
            style={{ fontSize: size * 0.235, letterSpacing: "0.44em", marginTop: size * 0.08 }}
          >
            {trail}
          </span>
        </span>
      ) : (
        <span
          aria-hidden
          className="font-display font-bold text-chrome"
          style={{ fontSize: size * 0.42, letterSpacing: "-0.02em" }}
        >
          {lead}
          <span className="text-ceramic">.</span>
          <span className="font-normal text-silver/70">{trail}</span>
        </span>
      )}
    </span>
  );
}
