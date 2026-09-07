/**
 * Prefixes a site-relative asset path with the deployment's base path.
 *
 * GitHub Pages serves this project from /<repo>, and `next/image` does not
 * prefix `src` itself when images are unoptimized — which is exactly the
 * configuration a static export uses. Absolute URLs (Supabase storage, say)
 * are returned untouched.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  if (!path || !path.startsWith("/")) return path;
  return `${BASE}${path}`;
}
