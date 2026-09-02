import type { SVGProps } from "react";

/**
 * PERFECT DETAILING — logo concepts.
 *
 * Three original marks, none of them a bubble, a sponge or a shiny car
 * silhouette. Each is drawn on a 64×64 grid so they align optically in the
 * same lockup, and each has a flat monochrome path set for stamping,
 * embroidery, invoices and single-colour print.
 *
 * A — BEAD (primary). A water bead resting on a coated surface, drawn at the
 *     contact angle a working coating actually produces (>90°, so the droplet
 *     is wider than its footprint). The horizontal rule is the surface; it
 *     runs past the bead on both sides because the surface is the product.
 * B — FACET. A cut, chamfered plane structure — the brand read as a polished
 *     panel catching light from four directions at once.
 * C — SWEEP. Three nested arcs of decreasing weight: one polishing pass,
 *     refined twice. Reads as a "D" and as light raking across a curve.
 */

export type MarkProps = SVGProps<SVGSVGElement> & {
  size?: number;
  /** `mono` collapses to a single currentColor path set. */
  tone?: "colour" | "mono";
  title?: string;
};

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 64 64",
  fill: "none" as const,
  xmlns: "http://www.w3.org/2000/svg",
});

/* --------------------------------------------------------------- Gradients */

function MarkDefs() {
  return (
    <defs>
      <linearGradient id="pd-bead" x1="18" y1="18" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#8FF4FF" />
        <stop offset="0.45" stopColor="#38E8FF" />
        <stop offset="1" stopColor="#1B6BFF" />
      </linearGradient>
      <linearGradient id="pd-surface" x1="4" y1="46" x2="60" y2="46" gradientUnits="userSpaceOnUse">
        <stop stopColor="#C9D4DE" stopOpacity="0" />
        <stop offset="0.3" stopColor="#C9D4DE" />
        <stop offset="0.7" stopColor="#C9D4DE" />
        <stop offset="1" stopColor="#C9D4DE" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="pd-facet-a" x1="32" y1="6" x2="32" y2="34" gradientUnits="userSpaceOnUse">
        <stop stopColor="#E6EDF3" />
        <stop offset="1" stopColor="#8FF4FF" />
      </linearGradient>
      <linearGradient id="pd-facet-b" x1="10" y1="24" x2="32" y2="58" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38E8FF" />
        <stop offset="1" stopColor="#0A3FB0" />
      </linearGradient>
      <linearGradient id="pd-facet-c" x1="54" y1="24" x2="32" y2="58" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1B6BFF" />
        <stop offset="1" stopColor="#05070A" />
      </linearGradient>
      <linearGradient id="pd-sweep" x1="12" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
        <stop stopColor="#8FF4FF" />
        <stop offset="1" stopColor="#1B6BFF" />
      </linearGradient>
    </defs>
  );
}

/* ------------------------------------------------------------------ A — Bead */

/** Bead silhouette: contact points at x=22/42, widest at x=17/47. */
const BEAD_PATH =
  "M22 46C14.6 43.4 16.2 26.4 32 19.5C47.8 26.4 49.4 43.4 42 46C37 47.8 27 47.8 22 46Z";
/** Specular crescent, upper-left, where a real bead catches a key light. */
const BEAD_SPEC = "M24.6 33.4C25.2 28 28 24 31.4 22.6C28.6 25.9 27.2 29.4 27.2 33.4C27.2 34.5 25.9 35 24.6 33.4Z";

export function MarkBead({ size = 40, tone = "colour", title, ...rest }: MarkProps) {
  const mono = tone === "mono";
  return (
    <svg {...base(size)} role={title ? "img" : "presentation"} aria-hidden={title ? undefined : true} {...rest}>
      {title ? <title>{title}</title> : null}
      {!mono && <MarkDefs />}
      <path d="M6 46H58" stroke={mono ? "currentColor" : "url(#pd-surface)"} strokeWidth="2" strokeLinecap="round" opacity={mono ? 0.55 : 1} />
      <path d={BEAD_PATH} fill={mono ? "currentColor" : "url(#pd-bead)"} />
      {!mono && <path d={BEAD_SPEC} fill="#F6F9FB" opacity="0.85" />}
      {/* Contact-angle tick — the instrumentation detail the brand is built on. */}
      <path
        d="M22 46L13.6 38.2"
        stroke={mono ? "currentColor" : "#C9D4DE"}
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity={mono ? 0.4 : 0.55}
      />
    </svg>
  );
}

/* ----------------------------------------------------------------- B — Facet */

export function MarkFacet({ size = 40, tone = "colour", title, ...rest }: MarkProps) {
  const mono = tone === "mono";
  return (
    <svg {...base(size)} role={title ? "img" : "presentation"} aria-hidden={title ? undefined : true} {...rest}>
      {title ? <title>{title}</title> : null}
      {!mono && <MarkDefs />}
      {mono ? (
        <path
          d="M32 5L57 22V44L32 59L7 44V22L32 5ZM32 12.4L13 25.3V40.6L32 52L51 40.6V25.3L32 12.4Z"
          fill="currentColor"
        />
      ) : (
        <>
          <path d="M32 5L57 22L32 33L7 22L32 5Z" fill="url(#pd-facet-a)" />
          <path d="M7 22L32 33V59L7 44V22Z" fill="url(#pd-facet-b)" />
          <path d="M57 22L32 33V59L57 44V22Z" fill="url(#pd-facet-c)" />
          <path d="M32 5L57 22L32 33L7 22L32 5Z" stroke="#F6F9FB" strokeOpacity="0.35" strokeWidth="0.8" />
        </>
      )}
      <path d="M32 33V59" stroke={mono ? "currentColor" : "#F6F9FB"} strokeOpacity={mono ? 0.35 : 0.28} strokeWidth="0.9" />
    </svg>
  );
}

/* ----------------------------------------------------------------- C — Sweep */

export function MarkSweep({ size = 40, tone = "colour", title, ...rest }: MarkProps) {
  const mono = tone === "mono";
  const stroke = mono ? "currentColor" : "url(#pd-sweep)";
  return (
    <svg {...base(size)} role={title ? "img" : "presentation"} aria-hidden={title ? undefined : true} {...rest}>
      {title ? <title>{title}</title> : null}
      {!mono && <MarkDefs />}
      <path d="M18 8V56" stroke={stroke} strokeWidth="6" strokeLinecap="round" />
      <path d="M18 11C40 11 52 20 52 32C52 44 40 53 18 53" stroke={stroke} strokeWidth="6" strokeLinecap="round" />
      <path d="M18 21C31 21 38 25 38 32C38 39 31 43 18 43" stroke={stroke} strokeWidth="3.4" strokeLinecap="round" opacity="0.66" />
      <path d="M18 29C24 29 27 30 27 32C27 34 24 35 18 35" stroke={stroke} strokeWidth="2" strokeLinecap="round" opacity="0.42" />
    </svg>
  );
}

export const MARKS = {
  bead: MarkBead,
  facet: MarkFacet,
  sweep: MarkSweep,
} as const;

export type MarkKey = keyof typeof MARKS;
