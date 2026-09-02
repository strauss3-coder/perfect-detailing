import { ImageResponse } from "next/og";
import { getSiteContent } from "@/lib/content/store";

export const alt = "Perfect Detailing — surface engineering for things that matter";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Rendered once at build time from CMS content. */
export const dynamic = "force-static";

/**
 * Social card. Drawn rather than photographed so it stays on-brand before any
 * photography exists, and so it updates automatically when the CMS tagline or
 * business name changes.
 */
export default async function OpengraphImage() {
  const { brand, seo } = await getSiteContent();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #0C1117 0%, #05070A 60%)",
          color: "#E6EDF3",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -180,
            left: -120,
            width: 620,
            height: 620,
            borderRadius: 999,
            background: "radial-gradient(circle, rgba(27,107,255,0.34), rgba(27,107,255,0))",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            right: -140,
            width: 560,
            height: 560,
            borderRadius: 999,
            background: "radial-gradient(circle, rgba(56,232,255,0.2), rgba(56,232,255,0))",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <svg width="72" height="72" viewBox="0 0 64 64">
            <path d="M6 46H58" stroke="#C9D4DE" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
            <path
              d="M22 46C14.6 43.4 16.2 26.4 32 19.5C47.8 26.4 49.4 43.4 42 46C37 47.8 27 47.8 22 46Z"
              fill="#38E8FF"
            />
            <path
              d="M24.6 33.4C25.2 28 28 24 31.4 22.6C28.6 25.9 27.2 29.4 27.2 33.4C27.2 34.5 25.9 35 24.6 33.4Z"
              fill="#F6F9FB"
            />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>{brand.nameLead}</span>
            <span style={{ fontSize: 17, letterSpacing: 8, color: "#38E8FF" }}>{brand.nameTrail}</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <span style={{ fontSize: 66, fontWeight: 700, letterSpacing: -2.4, lineHeight: 1.05, maxWidth: 940 }}>
            {seo.pages.home?.ogImageText ?? brand.tagline}
          </span>
          <span style={{ fontSize: 25, color: "#8A99A8", maxWidth: 860, lineHeight: 1.35 }}>
            {brand.descriptor}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 19, color: "#5A6875" }}>
          <span style={{ display: "flex", width: 64, height: 2, background: "#38E8FF" }} />
          <span>{seo.siteUrl.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    ),
    size,
  );
}
