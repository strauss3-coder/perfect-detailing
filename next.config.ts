import type { NextConfig } from "next";

/**
 * Two build targets.
 *
 * The default build is the full application: server components, server actions,
 * middleware and the CMS portal.
 *
 * `STATIC_EXPORT=1` produces the marketing site as plain files for GitHub
 * Pages. There is no server in that target, so the portal, the API routes and
 * the middleware are removed by the deploy workflow before the build runs, and
 * the enquiry form falls back to WhatsApp and email.
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";

/** Project pages live under /<repo>, so assets need that prefix. */
const basePath = process.env.PAGES_BASE_PATH ?? "";

const supabaseHost = (() => {
  try {
    return process.env.NEXT_PUBLIC_SUPABASE_URL
      ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
      : null;
  } catch {
    return null;
  }
})();

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,

  ...(isStaticExport
    ? {
        output: "export" as const,
        // Static hosts have no image optimiser; sizes and ratios still apply.
        images: { unoptimized: true },
        basePath: basePath || undefined,
        assetPrefix: basePath || undefined,
        trailingSlash: true,
      }
    : {}),

  ...(isStaticExport
    ? {}
    : {
        images: {
          formats: ["image/avif", "image/webp"] as ("image/avif" | "image/webp")[],
          deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920, 2048],
          imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
          minimumCacheTTL: 60 * 60 * 24 * 30,
          remotePatterns: supabaseHost
            ? [
                {
                  protocol: "https" as const,
                  hostname: supabaseHost,
                  pathname: "/storage/v1/object/public/**",
                },
              ]
            : [],
        },
      }),

  // Headers and redirects are served by the host, which a static export has no
  // control over — GitHub Pages ignores both.
  ...(isStaticExport
    ? {}
    : {
        async headers() {
          return [
            {
              source: "/:path*",
              headers: [
                { key: "X-Content-Type-Options", value: "nosniff" },
                { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                { key: "X-Frame-Options", value: "SAMEORIGIN" },
                {
                  key: "Permissions-Policy",
                  value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
                },
              ],
            },
            {
              source: "/brand/:path*",
              headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
            },
          ];
        },

        async redirects() {
          return [
            { source: "/solar", destination: "/services/solar-panel-ceramic-coating", permanent: true },
            { source: "/ceramic", destination: "/services/ceramic-coating", permanent: true },
            { source: "/detailing", destination: "/services/automotive-detailing", permanent: true },
            { source: "/aircraft", destination: "/services/aircraft-detailing", permanent: true },
            { source: "/fleet", destination: "/services/fleet-services", permanent: true },
            { source: "/blog", destination: "/journal", permanent: true },
            { source: "/admin", destination: "/portal", permanent: false },
          ];
        },
      }),
};

export default nextConfig;
