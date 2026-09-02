import type { NextConfig } from "next";

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

  images: {
    // Modern formats first; the browser takes the first it understands.
    formats: ["image/avif", "image/webp"],
    // Matches the `sizes` attributes used across the site.
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: supabaseHost
      ? [{ protocol: "https", hostname: supabaseHost, pathname: "/storage/v1/object/public/**" }]
      : [],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
        ],
      },
      {
        // Brand assets are immutable once published.
        source: "/brand/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },

  async redirects() {
    return [
      // Friendly aliases for the service pages, since people type these.
      { source: "/solar", destination: "/services/solar-panel-ceramic-coating", permanent: true },
      { source: "/ceramic", destination: "/services/ceramic-coating", permanent: true },
      { source: "/detailing", destination: "/services/automotive-detailing", permanent: true },
      { source: "/aircraft", destination: "/services/aircraft-detailing", permanent: true },
      { source: "/fleet", destination: "/services/fleet-services", permanent: true },
      { source: "/blog", destination: "/journal", permanent: true },
      { source: "/admin", destination: "/portal", permanent: false },
    ];
  },
};

export default nextConfig;
