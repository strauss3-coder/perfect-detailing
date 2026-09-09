"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useMotionConfig } from "@/components/motion/MotionProvider";
import { seededRandom } from "@/lib/utils";
import { cn } from "@/lib/utils";

/**
 * Interactive contact-angle demonstration.
 *
 * A cross-section through a painted panel, switchable between bare clear coat
 * and a coated surface. It is a diagram of the mechanism rather than a
 * photograph of the result: on bare paint water spreads into a low film that
 * sits in the micro-texture and dries where it lies, taking dissolved minerals
 * and dirt down into the valleys with it. On a coated surface the same water
 * pulls itself into high-angle beads that carry contamination off the edge.
 *
 * The two contact angles drawn here are the ones quoted on the rest of the
 * page — roughly 30° on unprotected clear coat, 112° measured on a coated
 * panel after full cure.
 */

const STATES = {
  bare: {
    label: "Bare clear coat",
    angle: 30,
    readout: "≈30°",
    verdict: "Water spreads, sits in the texture and dries where it lies.",
  },
  coated: {
    label: "Ceramic coated",
    angle: 112,
    readout: "112°",
    verdict: "Water beads, runs, and takes the dirt with it.",
  },
} as const;

type State = keyof typeof STATES;

/** Beads are seeded so the server and the client draw the same frame. */
const DROPS = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  x: 104 + i * 34 + seededRandom(i + 3) * 10,
  scale: 0.78 + seededRandom(i + 40) * 0.44,
  delay: seededRandom(i + 70) * 2.4,
}));

/* The bead the callout measures. It never moves. */
const GAUGED = { id: -1, x: 52, scale: 1.05, delay: 0 };

const GRIME = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: 38 + seededRandom(i + 11) * 244,
  r: 1.1 + seededRandom(i + 55) * 1.3,
}));

export function CoatingViz({ className }: { className?: string }) {
  const [state, setState] = useState<State>("coated");
  const { reduced } = useMotionConfig();
  const active = STATES[state];
  const coated = state === "coated";

  return (
    <figure className={cn("panel-glass overflow-hidden rounded-panel", className)}>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-silver/10 px-6 py-5 sm:px-8">
        <div>
          <span className="label-tech">Contact angle</span>
          <p className="mt-1.5 text-[0.86rem] text-silver/70">{active.verdict}</p>
        </div>

        <div role="group" aria-label="Surface condition" className="flex shrink-0 gap-1 rounded-full border border-silver/15 p-1">
          {(Object.keys(STATES) as State[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setState(key)}
              aria-pressed={state === key}
              className={cn(
                "relative rounded-full px-4 py-2 text-[0.78rem] transition-colors duration-400",
                state === key ? "text-ink" : "text-silver/70 hover:text-chrome",
              )}
            >
              {state === key ? (
                <motion.span
                  layoutId="coating-viz-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-ceramic"
                  transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                />
              ) : null}
              {STATES[key].label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <svg
          /* Cropped to the action: the empty air above the beads is not
             carrying any of the argument. */
          viewBox="0 56 320 94"
          className="w-full"
          role="img"
          aria-label={`Cross-section of a painted panel, ${active.label.toLowerCase()}. ${active.verdict} Water contact angle ${active.readout}.`}
        >
          <defs>
            <linearGradient id="cv-sky" x1="0" y1="0" x2="0" y2="104" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0A0E13" />
              <stop offset="1" stopColor="#111925" />
            </linearGradient>
            <linearGradient id="cv-panel" x1="0" y1="104" x2="0" y2="150" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1B242D" />
              <stop offset="1" stopColor="#080B10" />
            </linearGradient>
            <linearGradient id="cv-film" x1="0" y1="99" x2="0" y2="105" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38E8FF" stopOpacity="0.42" />
              <stop offset="1" stopColor="#1B6BFF" stopOpacity="0.1" />
            </linearGradient>
            <radialGradient id="cv-drop" cx="0.32" cy="0.26" r="0.85">
              <stop stopColor="#F2FDFF" stopOpacity="0.92" />
              <stop offset="0.38" stopColor="#7FE6F5" stopOpacity="0.5" />
              <stop offset="1" stopColor="#1B6BFF" stopOpacity="0.22" />
            </radialGradient>
            <clipPath id="cv-clip">
              <rect x="0" y="0" width="320" height="150" />
            </clipPath>
          </defs>

          <g clipPath="url(#cv-clip)">
            <rect x="0" y="0" width="320" height="104" fill="url(#cv-sky)" />
            <rect x="0" y="104" width="320" height="46" fill="url(#cv-panel)" />

            {/* Specular band across the panel — the raking light used elsewhere */}
            <rect
              x="0"
              y="104"
              width="320"
              height="46"
              fill="url(#cv-film)"
              opacity="0.22"
            />

            {/* The coating film. Thin, because it is thin. */}
            <motion.rect
              x="0"
              y="100"
              width="320"
              height="4.5"
              fill="url(#cv-film)"
              initial={false}
              animate={{ opacity: coated ? 1 : 0 }}
              transition={{ duration: reduced ? 0 : 0.5 }}
            />

            {/* Surface: micro-texture when bare, levelled once coated */}
            <motion.path
              d={coated ? FLAT_SURFACE : ROUGH_SURFACE}
              initial={false}
              animate={{ d: coated ? FLAT_SURFACE : ROUGH_SURFACE }}
              transition={{ duration: reduced ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
              fill="none"
              stroke="#63727F"
              strokeWidth="1.3"
            />

            {/* Contamination: keyed into the texture, or lifted clear of it */}
            {GRIME.map((g) => (
              <motion.circle
                key={g.id}
                cx={g.x}
                r={g.r}
                fill="#8A6F52"
                initial={false}
                animate={coated ? { cy: 96, opacity: 0.2 } : { cy: 106 + (g.id % 3), opacity: 0.9 }}
                transition={{ duration: reduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}

            {/* The measured bead — held still so the callout has something to
                actually point at — and then the ones that run. */}
            <Drop drop={GAUGED} coated={coated} reduced={reduced} still />
            {DROPS.map((d) => (
              <Drop key={d.id} drop={d} coated={coated} reduced={reduced} />
            ))}

            <AngleMark coated={coated} reduced={reduced} />
          </g>
        </svg>

        {/* Readout, in the instrument idiom used across the site */}
        <div className="pointer-events-none absolute top-4 right-4 rounded-tile border border-silver/15 bg-ink/70 px-3.5 py-2.5 backdrop-blur-md sm:top-5 sm:right-5">
          <span className="label-tech block text-[0.55rem] text-silver/60">Contact angle</span>
          <motion.span
            key={active.readout}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.35 }}
            className="numeral block text-[1.05rem] font-medium text-ceramic"
          >
            {active.readout}
          </motion.span>
        </div>
      </div>

      <figcaption className="border-t border-silver/10 px-6 py-5 text-[0.82rem] leading-relaxed text-ash sm:px-8">
        A cross-section, drawn to the angles we actually measure. The steeper the bead, the less
        surface area the water shares with your paint — and the less of what is dissolved in it
        gets left behind when it dries.
      </figcaption>
    </figure>
  );
}

/* A real surface at this scale is peaks and valleys; a coated one is not. */
const ROUGH_SURFACE =
  "M0 104 L14 101 L26 106 L40 100 L52 105 L68 101 L80 106 L96 100 L110 105 L124 101 L138 106 L152 100 L166 105 L180 101 L194 106 L208 100 L222 105 L236 101 L250 106 L264 100 L278 105 L292 101 L306 106 L320 102";
const FLAT_SURFACE =
  "M0 104 L14 104 L26 104 L40 104 L52 104 L68 104 L80 104 L96 104 L110 104 L124 104 L138 104 L152 104 L166 104 L180 104 L194 104 L208 104 L222 104 L236 104 L250 104 L264 104 L278 104 L292 104 L306 104 L320 104";

function Drop({
  drop,
  coated,
  reduced,
  still,
}: {
  drop: (typeof DROPS)[number];
  coated: boolean;
  reduced: boolean;
  /** The gauged bead stays put so the angle callout has a subject. */
  still?: boolean;
}) {
  const runs = coated && !reduced && !still;
  /* A bead at 112° is nearly a sphere resting on a small contact patch. The
     same volume at 30° is a wide, shallow film. */
  const bead = { rx: 11 * drop.scale, ry: 11 * drop.scale, cy: 93 - 9 * (drop.scale - 1) };
  const film = { rx: 25 * drop.scale, ry: 4 * drop.scale, cy: 100.5 };
  const shape = coated ? bead : film;

  return (
    <motion.ellipse
      cx={drop.x}
      fill="url(#cv-drop)"
      initial={false}
      animate={{
        rx: shape.rx,
        ry: shape.ry,
        cy: shape.cy,
        /* Coated beads run off to the right and return; bare film stays put. */
        cx: runs ? [drop.x, drop.x + 8, drop.x + 240] : drop.x,
        opacity: runs ? [0, 1, 0] : 1,
      }}
      transition={
        runs
          ? {
              cx: { duration: 4.6, delay: drop.delay, repeat: Infinity, ease: [0.5, 0, 0.75, 0] },
              opacity: { duration: 4.6, delay: drop.delay, repeat: Infinity, times: [0, 0.12, 1] },
              rx: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
              ry: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
              cy: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
            }
          : { duration: reduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }
      }
    />
  );
}

/* The arc is drawn from the surface line up to the tangent of the bead. */
const ARC_COATED = "M74 104 A22 22 0 0 0 56 91";
const ARC_BARE = "M74 104 A22 22 0 0 0 52 100";

/** The angle itself, drawn against the surface line. */
function AngleMark({ coated, reduced }: { coated: boolean; reduced: boolean }) {
  const x = GAUGED.x;
  return (
    <motion.g
      initial={false}
      animate={{ opacity: 1 }}
      transition={{ duration: reduced ? 0 : 0.4 }}
      aria-hidden
    >
      <line x1={x - 6} y1={104} x2={x + 42} y2={104} stroke="var(--color-ceramic)" strokeOpacity="0.45" strokeWidth="1" />
      {/* Every animated attribute is also set as a prop: Motion only writes
          the animated value on the client, and an SVG rendered on the server
          with `d="undefined"` is an invalid path. */}
      <motion.line
        x1={x}
        y1={104}
        x2={coated ? x - 12 : x - 34}
        y2={coated ? 104 - 30 : 104 - 15}
        initial={false}
        animate={{ x2: coated ? x - 12 : x - 34, y2: coated ? 104 - 30 : 104 - 15 }}
        transition={{ duration: reduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
        stroke="var(--color-ceramic)"
        strokeWidth="1.3"
        strokeDasharray="3 3"
      />
      <motion.path
        d={coated ? ARC_COATED : ARC_BARE}
        initial={false}
        animate={{ d: coated ? ARC_COATED : ARC_BARE }}
        transition={{ duration: reduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
        fill="none"
        stroke="var(--color-ceramic)"
        strokeWidth="1.3"
      />
    </motion.g>
  );
}
