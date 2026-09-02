"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Drives the boot overlay.
 *
 * The overlay itself is server-rendered HTML (see BootLoader) and is already on
 * screen before this file has been parsed. All this does is decide when to take
 * it away, and put it back during navigation.
 *
 * Everything is expressed as one attribute on <html>, so there is exactly one
 * overlay in the document at any moment and duplicate or competing loaders are
 * structurally impossible.
 */

/** A navigation faster than this never shows the loader at all. */
const SHOW_DELAY_MS = 140;
/** Once shown, it stays at least this long so it reads as a transition. */
const MIN_VISIBLE_MS = 420;
/** Fade duration; must match the transition in globals.css. */
const FADE_MS = 620;
/** Nothing may leave the overlay up longer than this, whatever goes wrong. */
const SAFETY_MS = 8000;

type BootState = "loading" | "exiting" | "done";

function setBoot(state: BootState) {
  document.documentElement.setAttribute("data-boot", state);
}

function bootState(): string | null {
  return document.documentElement.getAttribute("data-boot");
}

export function LoaderController({ minDurationMs = 600 }: { minDurationMs?: number }) {
  const pathname = usePathname();

  const shownAt = useRef<number>(0);
  const showTimer = useRef<number | null>(null);
  const hideTimer = useRef<number | null>(null);
  const safetyTimer = useRef<number | null>(null);
  const navigating = useRef(false);
  /* The first pathname is the page we booted on, not a navigation. */
  const bootPath = useRef<string | null>(null);

  useEffect(() => {
    const clearTimers = () => {
      for (const t of [showTimer, hideTimer, safetyTimer]) {
        if (t.current !== null) {
          window.clearTimeout(t.current);
          t.current = null;
        }
      }
    };

    const dismiss = () => {
      if (bootState() === "done" || bootState() === null) return;
      setBoot("exiting");
      try {
        sessionStorage.setItem("pd-loaded", "1");
      } catch {
        /* storage unavailable — the loader simply shows again next session */
      }
      hideTimer.current = window.setTimeout(() => {
        setBoot("done");
        navigating.current = false;
      }, FADE_MS);
    };

    /* Hold the overlay until the page is genuinely usable: hydration has run
       (this effect is proof of that) and webfonts have resolved, so nothing
       swaps typeface underneath the overlay. The floor only stops the loader
       flashing past on a fast connection — it is not a delay, and if the page
       takes longer than the floor there is no extra wait at all. */
    const finishBoot = () => {
      const started = (window as { __pdBootStart?: number }).__pdBootStart ?? Date.now();
      const elapsed = Date.now() - started;
      const remaining = Math.max(0, minDurationMs - elapsed);
      showTimer.current = window.setTimeout(dismiss, remaining);
    };

    if (bootState() === "loading") {
      const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
      const ready = fonts?.ready ?? Promise.resolve();
      let settled = false;
      const go = () => {
        if (settled) return;
        settled = true;
        finishBoot();
      };
      void ready.then(go).catch(go);
      // Never let a font that will not resolve hold the page hostage.
      safetyTimer.current = window.setTimeout(go, 2500);
    }

    bootPath.current = pathname;

    /* ---------------------------------------------------------------- */
    /* Navigation                                                        */
    /* ---------------------------------------------------------------- */

    const begin = () => {
      if (navigating.current) return;
      navigating.current = true;

      showTimer.current = window.setTimeout(() => {
        // Still pending after the grace period, so this is a slow enough
        // navigation to be worth covering.
        if (!navigating.current) return;
        shownAt.current = Date.now();
        setBoot("loading");
      }, SHOW_DELAY_MS);

      safetyTimer.current = window.setTimeout(() => {
        navigating.current = false;
        dismiss();
      }, SAFETY_MS);
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as Element | null;
      const anchor = target?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      if (anchor.hasAttribute("download")) return;
      if (anchor.target && anchor.target !== "_self") return;

      let url: URL;
      try {
        url = new URL((anchor as HTMLAnchorElement).href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;

      // Same page. An in-page anchor or a query-only change repaints in place
      // and never reports a new pathname, so there is nothing to cover — and
      // covering it would leave the overlay waiting for a route change that
      // is never coming.
      if (url.pathname === window.location.pathname) return;

      begin();
    };

    const onPopState = () => begin();

    document.addEventListener("click", onClick, { capture: true });
    window.addEventListener("popstate", onPopState);

    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      window.removeEventListener("popstate", onPopState);
      clearTimers();
      /* This component owns the attribute. If it unmounts — navigating out of
         the site layout into the portal, say — the attribute must not outlive
         it, or the next page inherits a locked scroll and a hidden shell. */
      if (bootState() !== null) setBoot("done");
    };
    // Boot logic runs once; the navigation listeners are stable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minDurationMs]);

  /* The route has changed, which means the new page is rendered. */
  useEffect(() => {
    if (bootPath.current === null || bootPath.current === pathname) return;
    bootPath.current = pathname;

    if (showTimer.current !== null) {
      window.clearTimeout(showTimer.current);
      showTimer.current = null;
    }
    if (safetyTimer.current !== null) {
      window.clearTimeout(safetyTimer.current);
      safetyTimer.current = null;
    }

    const wasShown = bootState() === "loading";
    navigating.current = false;

    /* Land at the top of the new page, immediately.
       Two things otherwise go wrong. `scroll-behavior: smooth` turns the
       router's scroll into a visible animation, so the outgoing page's scroll
       position slides down the incoming one. And the router scrolls the
       changed segment into view rather than the document, which settles about
       125px down and leaves the header already scrolled away on arrival.
       An explicit instant scroll overrides the CSS behaviour and aborts any
       smooth scroll already in flight. */
    const hash = window.location.hash;
    const settle = () => {
      if (hash) {
        /* Cross-page anchors — "/quote#calculator" from the header — arrive
           with no scroll handling of their own, because the browser only
           honours a fragment on a real document load, not a client-side route
           change. Without this they simply keep the previous page's position. */
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
          return;
        }
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    };

    settle();
    // The router may scroll after this effect, and the target may only exist
    // once the incoming page has painted; take the next frame as well.
    requestAnimationFrame(settle);

    if (!wasShown) return;

    const visibleFor = Date.now() - shownAt.current;
    const remaining = Math.max(0, MIN_VISIBLE_MS - visibleFor);

    showTimer.current = window.setTimeout(() => {
      setBoot("exiting");
      hideTimer.current = window.setTimeout(() => setBoot("done"), FADE_MS);
    }, remaining);
  }, [pathname]);

  return null;
}
