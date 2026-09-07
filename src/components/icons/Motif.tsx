import type { SVGProps } from "react";
import type { IllustrationMotif } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * Custom motif set — drawn for this brand, not pulled from an icon library.
 *
 * Every motif sits on the same 64×64 grid with a 2px stroke so they line up
 * optically when mixed in a grid. Each has two layers: a structural line in
 * `currentColor` and an accent element (the thing being protected, or the
 * protection itself) that inherits the ceramic cyan. Where a motif has a
 * moving part, it carries a class the stylesheet animates on hover.
 */

export interface MotifProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  motif: IllustrationMotif;
  size?: number;
  /** Draws the accent layer in the ceramic accent rather than currentColor. */
  accent?: boolean;
  strokeWidth?: number;
}

type Draw = (a: string, sw: number) => React.ReactNode;

const S = { fill: "none", strokeLinecap: "round", strokeLinejoin: "round" } as const;

const DRAW: Record<IllustrationMotif, Draw> = {
  /* ---------------------------------------------------------- Chemistry */
  droplet: (a, sw) => (
    <>
      <path d="M8 50h48" stroke="currentColor" strokeWidth={sw} opacity="0.45" {...S} />
      <path
        d="M23 50c-7-2.5-5.5-19 9-25.5C46.5 31 48 47.5 41 50c-5 1.8-13 1.8-18 0Z"
        stroke={a}
        strokeWidth={sw}
        {...S}
      />
      <path d="M27.5 37c.6-4.6 3-8 5.8-9.4" stroke={a} strokeWidth={sw * 0.75} opacity="0.6" {...S} />
      <path d="M23 50l-7.5-6.5" stroke="currentColor" strokeWidth={sw * 0.75} opacity="0.5" {...S} />
    </>
  ),
  shield: (a, sw) => (
    <>
      <path d="M32 7l20 8v18c0 12-8.6 20.6-20 24-11.4-3.4-20-12-20-24V15l20-8Z" stroke="currentColor" strokeWidth={sw} {...S} />
      <path d="M22.5 32.5l7 7L43 25" stroke={a} strokeWidth={sw} {...S} />
    </>
  ),
  "coating-layers": (a, sw) => (
    <>
      <path d="M32 43 8 51l24 8 24-8-24-8Z" stroke="currentColor" strokeWidth={sw} opacity="0.5" {...S} />
      <path d="M32 32 8 40l24 8 24-8-24-8Z" stroke="currentColor" strokeWidth={sw} opacity="0.75" {...S} />
      <path d="M32 21 8 29l24 8 24-8-24-8Z" stroke={a} strokeWidth={sw} {...S} />
      <path d="M32 5v10M27 9l5-5 5 5" stroke={a} strokeWidth={sw * 0.85} opacity="0.7" {...S} />
    </>
  ),
  sparkle: (a, sw) => (
    <>
      <path d="M30 8c0 11-5 16-16 16 11 0 16 5 16 16 0-11 5-16 16-16-11 0-16-5-16-16Z" stroke={a} strokeWidth={sw} {...S} />
      <path d="M48 38c0 5-2.2 7.2-7 7.2 4.8 0 7 2.2 7 7.2 0-5 2.2-7.2 7-7.2-4.8 0-7-2.2-7-7.2Z" stroke="currentColor" strokeWidth={sw * 0.8} opacity="0.7" {...S} />
      <path d="M15 44c0 3.2-1.4 4.6-4.5 4.6 3.1 0 4.5 1.4 4.5 4.6 0-3.2 1.4-4.6 4.5-4.6-3.1 0-4.5-1.4-4.5-4.6Z" stroke="currentColor" strokeWidth={sw * 0.7} opacity="0.5" {...S} />
    </>
  ),
  "gloss-meter": (a, sw) => (
    <>
      <path d="M10 52h44" stroke="currentColor" strokeWidth={sw} {...S} />
      <rect x="18" y="16" width="28" height="20" rx="4" stroke="currentColor" strokeWidth={sw} {...S} />
      <path d="M24 24h9M24 29h16" stroke={a} strokeWidth={sw * 0.85} {...S} />
      <path d="M26 36l-8 16M38 36l8 16" stroke={a} strokeWidth={sw * 0.9} opacity="0.8" {...S} />
      <circle cx="32" cy="52" r="1.6" fill={a} stroke="none" />
    </>
  ),

  /* --------------------------------------------------------- Automotive */
  sedan: (a, sw) => (
    <>
      <path d="M6 42h5m42 0h5" stroke="currentColor" strokeWidth={sw} opacity="0.5" {...S} />
      <path d="M9 42v-6l6-2 6-10h22l7 10 7 2v6" stroke="currentColor" strokeWidth={sw} {...S} />
      <path d="M23 24l-4.5 8h27L41 24H23Z" stroke={a} strokeWidth={sw * 0.85} {...S} />
      <circle cx="19" cy="42" r="5.5" stroke="currentColor" strokeWidth={sw} {...S} />
      <circle cx="45" cy="42" r="5.5" stroke="currentColor" strokeWidth={sw} {...S} />
    </>
  ),
  coupe: (a, sw) => (
    <>
      <path d="M6 42h5m42 0h5" stroke="currentColor" strokeWidth={sw} opacity="0.5" {...S} />
      <path d="M9 42v-5l7-3c4-8 9-11 16-11 8 0 13 4 18 11l6 3v5" stroke="currentColor" strokeWidth={sw} {...S} />
      <path d="M22 32c3-6 6.5-8.5 10.5-8.5 4.5 0 8 3 11 8.5H22Z" stroke={a} strokeWidth={sw * 0.85} {...S} />
      <circle cx="19" cy="42" r="5.5" stroke="currentColor" strokeWidth={sw} {...S} />
      <circle cx="45" cy="42" r="5.5" stroke="currentColor" strokeWidth={sw} {...S} />
    </>
  ),
  suv: (a, sw) => (
    <>
      <path d="M6 44h4m44 0h4" stroke="currentColor" strokeWidth={sw} opacity="0.5" {...S} />
      <path d="M9 44V30l5-2 5-11h26l5 11 5 2v14" stroke="currentColor" strokeWidth={sw} {...S} />
      <path d="M21 19v9m11-9v9m11 0-3-9" stroke={a} strokeWidth={sw * 0.8} {...S} />
      <path d="M14 28h36" stroke={a} strokeWidth={sw * 0.85} {...S} />
      <circle cx="19" cy="44" r="6" stroke="currentColor" strokeWidth={sw} {...S} />
      <circle cx="45" cy="44" r="6" stroke="currentColor" strokeWidth={sw} {...S} />
    </>
  ),
  fleet: (a, sw) => (
    <>
      <path d="M4 45h4m48 0h4" stroke="currentColor" strokeWidth={sw} opacity="0.5" {...S} />
      <path d="M7 45V18h28v27M35 27h9l7 8v10" stroke="currentColor" strokeWidth={sw} {...S} />
      <path d="M13 24h16M13 31h16" stroke={a} strokeWidth={sw * 0.85} {...S} />
      <circle cx="18" cy="45" r="5" stroke="currentColor" strokeWidth={sw} {...S} />
      <circle cx="45" cy="45" r="5" stroke="currentColor" strokeWidth={sw} {...S} />
    </>
  ),
  "engine-bay": (a, sw) => (
    <>
      <path d="M10 46V30h8V22h14v8h6l8 8h8v8" stroke="currentColor" strokeWidth={sw} {...S} />
      <path d="M10 46h44" stroke="currentColor" strokeWidth={sw} opacity="0.5" {...S} />
      <circle cx="20" cy="38" r="4.5" stroke={a} strokeWidth={sw * 0.9} {...S} />
      <circle cx="44" cy="40" r="3.5" stroke={a} strokeWidth={sw * 0.9} {...S} />
      <path d="M22 22V16h8v6" stroke={a} strokeWidth={sw * 0.85} {...S} />
    </>
  ),
  headlight: (a, sw) => (
    <>
      <path d="M12 22c14-6 22-6 30 0v20c-8 6-16 6-30 0V22Z" stroke="currentColor" strokeWidth={sw} {...S} />
      <ellipse cx="26" cy="32" rx="8" ry="9" stroke={a} strokeWidth={sw * 0.9} {...S} />
      <path d="M46 24l8-4M46 32h9M46 40l8 4" stroke={a} strokeWidth={sw * 0.9} opacity="0.8" {...S} />
    </>
  ),
  interior: (a, sw) => (
    <>
      <path d="M18 52V30c0-8 4-12 10-12h6c6 0 10 4 10 12v6" stroke="currentColor" strokeWidth={sw} {...S} />
      <path d="M18 40h20c5 0 8 3 8 8v4" stroke="currentColor" strokeWidth={sw} {...S} />
      <path d="M25 24h14" stroke={a} strokeWidth={sw * 0.9} {...S} />
      <path d="M22 32h16M22 38h10" stroke={a} strokeWidth={sw * 0.8} opacity="0.75" {...S} />
      <path d="M14 52h36" stroke="currentColor" strokeWidth={sw} opacity="0.5" {...S} />
    </>
  ),

  /* ---------------------------------------------------------- Equipment */
  polisher: (a, sw) => (
    <>
      <path d="M22 20h20a6 6 0 0 1 6 6v4H16v-4a6 6 0 0 1 6-6Z" stroke="currentColor" strokeWidth={sw} {...S} />
      <path d="M42 24h9a3 3 0 0 1 3 3v3" stroke="currentColor" strokeWidth={sw} {...S} />
      <path d="M16 30h32v5H16z" stroke="currentColor" strokeWidth={sw} {...S} />
      <ellipse cx="32" cy="43" rx="17" ry="6" stroke={a} strokeWidth={sw} {...S} />
      <path d="M20 51c4 2.5 20 2.5 24 0" stroke={a} strokeWidth={sw * 0.8} opacity="0.55" {...S} />
    </>
  ),
  "foam-cannon": (a, sw) => (
    <>
      <path d="M34 26h10l8-6v20l-8-6H34V26Z" stroke="currentColor" strokeWidth={sw} {...S} />
      <path d="M34 22h-8a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h8V22Z" stroke="currentColor" strokeWidth={sw} {...S} />
      <path d="M22 42v8h10v-8" stroke="currentColor" strokeWidth={sw} {...S} />
      <circle cx="55" cy="16" r="3" stroke={a} strokeWidth={sw * 0.9} {...S} />
      <circle cx="50" cy="8" r="2.2" stroke={a} strokeWidth={sw * 0.8} opacity="0.75" {...S} />
      <circle cx="58" cy="26" r="2" stroke={a} strokeWidth={sw * 0.8} opacity="0.6" {...S} />
    </>
  ),
  microfibre: (a, sw) => (
    <>
      <path d="M12 18h40v28H12z" stroke="currentColor" strokeWidth={sw} {...S} />
      <path d="M12 26c7-4 13 4 20 0s13 4 20 0M12 36c7-4 13 4 20 0s13 4 20 0" stroke={a} strokeWidth={sw * 0.9} {...S} />
      <path d="M20 18v28M44 18v28" stroke="currentColor" strokeWidth={sw * 0.6} opacity="0.35" {...S} />
    </>
  ),

  /* -------------------------------------------------------------- Solar */
  "solar-panel": (a, sw) => (
    <>
      <path d="M14 20h36l6 22H8l6-22Z" stroke="currentColor" strokeWidth={sw} {...S} />
      <path d="M11 31h42M26 20l-3 22M38 20l3 22" stroke="currentColor" strokeWidth={sw * 0.7} opacity="0.5" {...S} />
      <path d="M32 42v10M24 52h16" stroke="currentColor" strokeWidth={sw} {...S} />
      <path
        d="M31 17c-3-1-2.2-7.4 3.5-10 5.7 2.6 6.5 9 3.5 10-2 .7-5 .7-7 0Z"
        stroke={a}
        strokeWidth={sw * 0.9}
        {...S}
      />
    </>
  ),
  "solar-array": (a, sw) => (
    <>
      <path d="M6 26h16l4 14H8l-2-14Z" stroke="currentColor" strokeWidth={sw} {...S} />
      <path d="M24 26h16l2 14H28l-4-14Z" stroke={a} strokeWidth={sw} {...S} />
      <path d="M42 26h16l-2 14H44l-2-14Z" stroke="currentColor" strokeWidth={sw} {...S} />
      <path d="M14 40v10M34 40v10M52 40v10" stroke="currentColor" strokeWidth={sw * 0.85} opacity="0.6" {...S} />
      <path d="M8 50h48" stroke="currentColor" strokeWidth={sw} opacity="0.4" {...S} />
      <path d="M32 8v8M22 12l4 5M42 12l-4 5" stroke={a} strokeWidth={sw * 0.85} opacity="0.8" {...S} />
    </>
  ),

  /* ------------------------------------------------------------- Marine */
  marine: (a, sw) => (
    <>
      {/* Hull, deck and raked bow */}
      <path
        d="M9 34h41c5 0 8 2 9 5-6 7-15 10-27 10s-19-5-23-15Z"
        stroke="currentColor"
        strokeWidth={sw}
        {...S}
      />
      <path d="M26 34v-9h11v9M21 25h20" stroke="currentColor" strokeWidth={sw} {...S} />
      {/* Waterline — the surface the coating actually meets */}
      <path
        d="M4 55c5-2 9 2 14 0s9-2 14 0 9 2 14 0 9-2 14 0"
        stroke={a}
        strokeWidth={sw}
        {...S}
      />
      <path d="M14 46c8 3 28 3 36 0" stroke={a} strokeWidth={sw * 0.8} opacity="0.65" {...S} />
    </>
  ),

  /* --------------------------------------------------------- Architectural */
  window: (a, sw) => (
    <>
      <path d="M12 12h40v40H12z" stroke="currentColor" strokeWidth={sw} {...S} />
      <path d="M32 12v40M12 32h40" stroke="currentColor" strokeWidth={sw * 0.7} opacity="0.6" {...S} />
      {/* Beads running off the coated pane */}
      <circle cx="21" cy="41" r="3" stroke={a} strokeWidth={sw * 0.9} {...S} />
      <circle cx="25" cy="47" r="1.9" stroke={a} strokeWidth={sw * 0.8} opacity="0.8" {...S} />
      <circle cx="17" cy="47" r="1.4" stroke={a} strokeWidth={sw * 0.8} opacity="0.6" {...S} />
      {/* Solar gain being turned away */}
      <path d="M44 18l8-8M48 24h8M44 12V4" stroke={a} strokeWidth={sw * 0.85} opacity="0.8" {...S} />
    </>
  ),

  /* ----------------------------------------------------------- Aviation */
  aircraft: (a, sw) => (
    <>
      <path d="M32 6c2.6 0 4.4 3.4 4.6 10.6L58 30v6l-21.4-6.4v11.8L44 47v5l-12-3.4L20 52v-5l7.4-5.6V29.6L6 36v-6l21.4-13.4C27.6 9.4 29.4 6 32 6Z" stroke="currentColor" strokeWidth={sw} {...S} />
      <path d="M32 20v22" stroke={a} strokeWidth={sw * 0.85} opacity="0.75" {...S} />
    </>
  ),
};

export function Motif({
  motif,
  size = 44,
  accent = true,
  strokeWidth = 2,
  className,
  ...rest
}: MotifProps) {
  const draw = DRAW[motif] ?? DRAW.shield;
  const accentColour = accent ? "var(--color-ceramic)" : "currentColor";
  const dims = size > 0 ? { width: size, height: size } : {};
  return (
    <svg
      {...dims}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      {...rest}
    >
      {draw(accentColour, strokeWidth)}
    </svg>
  );
}

export const MOTIF_KEYS = Object.keys(DRAW) as IllustrationMotif[];
