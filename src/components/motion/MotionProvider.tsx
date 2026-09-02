"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { AppearanceSettings } from "@/content/types";

type MotionConfig = AppearanceSettings["motion"] & { reduced: boolean };

const FALLBACK: MotionConfig = {
  loadingScreen: true,
  pageTransitions: true,
  particles: true,
  parallax: true,
  cursorEffects: true,
  grain: true,
  intensity: "balanced",
  reduced: false,
};

const Ctx = createContext<MotionConfig>(FALLBACK);

/**
 * Motion is owner-configurable from the portal and user-configurable from the
 * operating system. The OS always wins: `prefers-reduced-motion` switches
 * every decorative animation off regardless of what Appearance says.
 */
export function MotionProvider({
  settings,
  children,
}: {
  settings: AppearanceSettings["motion"];
  children: React.ReactNode;
}) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const value = useMemo<MotionConfig>(() => {
    if (reduced) {
      return {
        ...settings,
        reduced: true,
        particles: false,
        parallax: false,
        cursorEffects: false,
        pageTransitions: false,
      };
    }
    return { ...settings, reduced: false };
  }, [settings, reduced]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useMotionConfig(): MotionConfig {
  return useContext(Ctx);
}

/** Multiplier applied to travel distances and durations. */
export function useIntensity(): number {
  const { intensity, reduced } = useMotionConfig();
  if (reduced) return 0;
  return intensity === "subtle" ? 0.55 : intensity === "full" ? 1.35 : 1;
}
