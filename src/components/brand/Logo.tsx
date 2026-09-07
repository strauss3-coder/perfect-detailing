import { cn } from "@/lib/utils";
import { Mark } from "./Marks";

interface LogoProps {
  lead?: string;
  trail?: string;
  /** `stacked` sets DETAILING under PERFECT; `inline` runs them together. */
  layout?: "inline" | "stacked" | "mark-only";
  tone?: "colour" | "mono";
  size?: number;
  className?: string;
  title?: string;
}

/**
 * The lockup, following the company profile: PERFECT set in the display face,
 * letterspaced, in the brand cyan; Detailing in a serif italic in the brand
 * grey. The contrast between the two is the whole idea — engineering and
 * craft, in one line.
 */
export function Logo({
  lead = "PERFECT",
  trail = "Detailing",
  layout = "inline",
  tone = "colour",
  size = 34,
  className,
  title,
}: LogoProps) {
  if (layout === "mark-only") {
    return <Mark size={size} tone={tone} title={title ?? `${lead} ${trail}`} className={className} />;
  }

  const mono = tone === "mono";

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Mark size={size} tone={tone} />
      <span className="sr-only">{`${lead} ${trail}`}</span>

      {layout === "stacked" ? (
        <span aria-hidden className="flex flex-col leading-none">
          <span
            className={cn("font-display font-bold", mono ? "text-current" : "text-brand-cyan")}
            style={{ fontSize: size * 0.34, letterSpacing: "0.14em" }}
          >
            {lead}
          </span>
          <span
            className={cn("font-serif italic", mono ? "text-current opacity-70" : "text-brand-grey")}
            style={{ fontSize: size * 0.36, marginTop: size * 0.04 }}
          >
            {trail}
          </span>
        </span>
      ) : (
        <span aria-hidden className="flex items-baseline gap-2">
          <span
            className={cn("font-display font-bold", mono ? "text-current" : "text-brand-cyan")}
            style={{ fontSize: size * 0.4, letterSpacing: "0.13em" }}
          >
            {lead}
          </span>
          <span
            className={cn("font-serif italic", mono ? "text-current opacity-70" : "text-brand-grey")}
            style={{ fontSize: size * 0.42 }}
          >
            {trail}
          </span>
        </span>
      )}
    </span>
  );
}
