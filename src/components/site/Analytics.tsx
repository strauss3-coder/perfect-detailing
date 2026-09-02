"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Sends one beacon per page view to our own endpoint. Nothing is stored in the
 * browser and no identifier is generated, so there is nothing to consent to.
 */
/** The static build has no /api/track route, so the beacon is compiled out. */
const ENABLED = process.env.NEXT_PUBLIC_STATIC_EXPORT !== "1";

export function Analytics() {
  const pathname = usePathname();
  const last = useRef<string | null>(null);

  useEffect(() => {
    if (!ENABLED) return;
    if (last.current === pathname) return;
    last.current = pathname;

    const payload = JSON.stringify({
      path: pathname,
      referrer: document.referrer ? new URL(document.referrer).host : "",
      kind: "pageview",
    });

    // `sendBeacon` survives the page being closed mid-navigation.
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([payload], { type: "application/json" }));
    } else {
      void fetch("/api/track", { method: "POST", body: payload, keepalive: true });
    }
  }, [pathname]);

  return null;
}
