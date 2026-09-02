"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { ContactSettings, HomeContent } from "@/content/types";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { ButtonLink, Arrow } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { Motif } from "@/components/icons/Motif";
import { BeadField } from "@/components/motion/BeadField";
import { Spotlight } from "@/components/motion/Interactive";
import { useMotionConfig } from "@/components/motion/MotionProvider";
import { resolveHref } from "@/lib/links";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero({ hero, contact }: { hero: HomeContent["hero"]; contact: ContactSettings }) {
  const ref = useRef<HTMLElement>(null);
  const { parallax } = useMotionConfig();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden">
      <Spotlight size={720} opacity={0.15} />
      <BeadField density={54} rise />

      {/* Horizon glow behind the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[18%] h-[46vh]"
        style={{ background: "radial-gradient(60% 100% at 22% 40%, color-mix(in oklab, var(--color-electric) 20%, transparent), transparent 72%)" }}
      />

      <div className="shell relative z-10 grid gap-14 pt-16 pb-24 lg:grid-cols-[1.06fr_0.94fr] lg:items-center lg:gap-16 lg:pt-24 lg:pb-32">
        <motion.div style={parallax ? { y: textY, opacity: fade } : undefined} className="flex flex-col gap-8">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </motion.div>

          <h1 className="text-hero text-chrome">
            {hero.headlineLines.map((line, i) => (
              <motion.span
                key={line}
                className="block overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.08 + i * 0.06, duration: 0.4 }}
              >
                <motion.span
                  className="block"
                  initial={{ y: "108%", rotate: 2 }}
                  animate={{ y: "0%", rotate: 0 }}
                  transition={{ delay: 0.1 + i * 0.09, duration: 1.02, ease: EASE }}
                >
                  {line === hero.accentWord ? <span className="specular">{line}</span> : line}
                </motion.span>
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="text-lede max-w-xl text-pretty"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.85, ease: EASE }}
          >
            {hero.lede}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.54, duration: 0.8, ease: EASE }}
          >
            {hero.actions.map((action) => (
              <ButtonLink
                key={action.href + action.label}
                href={resolveHref(action.href, contact)}
                intent={action.intent ?? "primary"}
                size="lg"
              >
                {action.label}
                <Arrow />
              </ButtonLink>
            ))}
          </motion.div>

          <motion.div
            className="mt-2 flex items-center gap-3 text-ash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.9 }}
          >
            <span className="relative flex h-9 w-5 items-start justify-center rounded-full border border-silver/25 p-1">
              <motion.span
                className="block h-1.5 w-1 rounded-full bg-ceramic"
                animate={{ y: [0, 12, 0], opacity: [1, 0.25, 1] }}
                transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
            <span className="label-tech text-ash">{hero.scrollHint}</span>
          </motion.div>
        </motion.div>

        {/* Instrument panel */}
        <motion.div
          style={parallax ? { y: mediaY } : undefined}
          initial={{ opacity: 0, scale: 0.95, filter: "blur(14px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.25, duration: 1.15, ease: EASE }}
          className="relative"
        >
          <MediaFrame media={hero.media} priority sizes="(min-width: 1024px) 45vw, 92vw" motifScale={0.42} />

          {/* Readouts pinned around the frame */}
          <ul className="pointer-events-none absolute inset-0">
            {hero.readouts.map((readout, i) => (
              <motion.li
                key={readout.id}
                className={`panel-glass absolute flex flex-col gap-0.5 rounded-tile px-3.5 py-2.5 ${
                  READOUT_POSITIONS[i % READOUT_POSITIONS.length]
                }`}
                initial={{ opacity: 0, y: 14, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.85 + i * 0.14, duration: 0.7, ease: EASE }}
              >
                <span className="label-tech text-[0.55rem] text-silver/62">{readout.label}</span>
                <span className="numeral text-[0.95rem] font-medium text-ceramic">{readout.value}</span>
              </motion.li>
            ))}
          </ul>

          {/* Floating equipment */}
          <FloatingMotif motif="polisher" className="hidden sm:grid sm:-top-7 sm:-left-6" delay={1.1} size={54} />
          <FloatingMotif motif="droplet" className="hidden sm:grid sm:-right-5 sm:bottom-16" delay={1.35} size={44} />
          <FloatingMotif motif="microfibre" className="hidden sm:grid sm:-bottom-6 sm:left-12" delay={1.5} size={40} />
        </motion.div>
      </div>
    </section>
  );
}

/* Negative insets only from `sm` up, so nothing hangs off a phone screen. */
const READOUT_POSITIONS = [
  "top-[7%] left-2 sm:top-[9%] sm:-left-[7%]",
  "top-[42%] right-2 sm:top-[44%] sm:-right-[6%]",
  "bottom-[14%] left-4 sm:bottom-[16%] sm:left-[6%]",
] as const;

function FloatingMotif({
  motif,
  className,
  delay,
  size,
}: {
  motif: Parameters<typeof Motif>[0]["motif"];
  className?: string;
  delay: number;
  size: number;
}) {
  return (
    <motion.div
      aria-hidden
      className={`panel-glass absolute place-items-center rounded-2xl p-3 text-silver/70 ${className ?? ""}`}
      initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay, duration: 0.85, ease: EASE }}
    >
      <span className="float-slow" style={{ animationDelay: `${delay}s` }}>
        <Motif motif={motif} size={size} strokeWidth={1.6} />
      </span>
    </motion.div>
  );
}
