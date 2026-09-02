"use client";

import { motion } from "motion/react";
import { useMotionConfig } from "@/components/motion/MotionProvider";
import { seededRandom } from "@/lib/utils";

/**
 * Animated demonstration of what the coating does.
 *
 * A photovoltaic module drawn in perspective. Water beads form on the glass,
 * run down the tilt and leave at the bottom edge, carrying dust with them —
 * which is precisely the mechanism the page is arguing for. Everything is
 * seeded deterministically so the server and client render identically.
 */
export function SolarPanelViz({ className }: { className?: string }) {
  const { reduced } = useMotionConfig();

  const beads = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    x: 44 + seededRandom(i + 1) * 212,
    delay: seededRandom(i + 31) * 5.5,
    duration: 3.4 + seededRandom(i + 61) * 2.6,
    r: 2.4 + seededRandom(i + 91) * 3.4,
  }));

  const dust = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: 60 + seededRandom(i + 7) * 180,
    y: 40 + seededRandom(i + 17) * 60,
    delay: seededRandom(i + 41) * 4,
  }));

  return (
    <svg
      viewBox="0 0 300 210"
      className={className}
      role="img"
      aria-label="A coated solar module: water beads form on the glass, run down the tilt and carry dust off the bottom edge."
    >
      <defs>
        <linearGradient id="pv-glass" x1="40" y1="20" x2="260" y2="170" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1E2831" />
          <stop offset="0.5" stopColor="#131A22" />
          <stop offset="1" stopColor="#0C1117" />
        </linearGradient>
        <linearGradient id="pv-sheen" x1="40" y1="20" x2="200" y2="170" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38E8FF" stopOpacity="0.22" />
          <stop offset="0.45" stopColor="#38E8FF" stopOpacity="0.04" />
          <stop offset="1" stopColor="#1B6BFF" stopOpacity="0.14" />
        </linearGradient>
        <radialGradient id="pv-bead" cx="0.36" cy="0.32" r="0.75">
          <stop stopColor="#F6F9FB" stopOpacity="0.95" />
          <stop offset="0.4" stopColor="#8FF4FF" stopOpacity="0.7" />
          <stop offset="1" stopColor="#1B6BFF" stopOpacity="0.32" />
        </radialGradient>
        <clipPath id="pv-clip">
          <path d="M56 22h206l22 152H34L56 22Z" />
        </clipPath>
      </defs>

      {/* Frame */}
      <path d="M56 22h206l22 152H34L56 22Z" fill="url(#pv-glass)" stroke="#2C3844" strokeWidth="2" strokeLinejoin="round" />

      {/* Cell grid */}
      <g clipPath="url(#pv-clip)" stroke="#5A6875" strokeOpacity="0.35" strokeWidth="1">
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={`v${i}`} d={`M${73 + i * 43} 22 L${58 + i * 47} 174`} />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <path key={`h${i}`} d={`M${52 - i * 4} ${52 + i * 32} H${268 + i * 5}`} />
        ))}
      </g>

      {/* Coating sheen */}
      <path d="M56 22h206l22 152H34L56 22Z" fill="url(#pv-sheen)" />

      {/* Dust that arrives and is repelled */}
      {!reduced &&
        dust.map((mote) => (
          <motion.circle
            key={`d${mote.id}`}
            r="1.6"
            fill="#C9D4DE"
            fillOpacity="0.5"
            initial={{ cx: mote.x, cy: mote.y - 40, opacity: 0 }}
            animate={{
              cx: [mote.x, mote.x + 6, mote.x + 26],
              cy: [mote.y - 40, mote.y, mote.y - 22],
              opacity: [0, 0.7, 0],
            }}
            transition={{ duration: 4.2, delay: mote.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

      {/* Beads running down the tilt and off the bottom edge */}
      <g clipPath="url(#pv-clip)">
        {beads.map((bead) =>
          reduced ? (
            <circle key={bead.id} cx={bead.x} cy={60 + (bead.id % 5) * 24} r={bead.r} fill="url(#pv-bead)" />
          ) : (
            <motion.circle
              key={bead.id}
              r={bead.r}
              fill="url(#pv-bead)"
              initial={{ cx: bead.x, cy: 24, opacity: 0 }}
              animate={{
                cx: [bead.x, bead.x - 6, bead.x - 14],
                cy: [24, 100, 182],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: bead.duration,
                delay: bead.delay,
                repeat: Infinity,
                ease: [0.5, 0, 0.75, 0],
              }}
            />
          ),
        )}
      </g>

      {/* Specular rake */}
      {!reduced && (
        <motion.path
          d="M56 22h206l22 152H34L56 22Z"
          fill="none"
          stroke="#F6F9FB"
          strokeOpacity="0.5"
          strokeWidth="1.4"
          strokeDasharray="60 700"
          animate={{ strokeDashoffset: [0, -760] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* Mounting legs */}
      <path d="M74 174v20M244 174v20M74 194h170" stroke="#2C3844" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
