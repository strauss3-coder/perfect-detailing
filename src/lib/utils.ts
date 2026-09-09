type ClassValue = string | number | bigint | false | null | undefined;

export function cn(...parts: ClassValue[]): string {
  return parts.filter((p): p is string => typeof p === "string" && p.length > 0).join(" ");
}

export function formatCurrency(
  value: number,
  { currency = "ZAR", locale = "en-ZA", decimals = 0 } = {},
): string {
  return (
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
      .format(value)
      // Normalise the narrow no-break space some locales emit, keep the group
      // separator unbreakable, then close the gap between symbol and figure —
      // "R28 000", the way South African invoices are written.
      .replace(/\u202f/g, "\u00a0")
      .replace(/^(\D+?)\u00a0/, "$1")
  );
}

export function formatNumber(value: number, locale = "en-ZA", decimals = 0): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
    .format(value)
    // Keep thousands groups unbreakable so a figure never wraps mid-number.
    .replace(/\u202f/g, "\u00a0");
}

export function formatDate(iso: string, locale = "en-ZA"): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

/** Turns 1000 minutes into "16 h 40 min". */
export function formatDuration(totalMinutes: number): string {
  const mins = Math.max(0, Math.round(totalMinutes));
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} h`;
  return `${h} h ${m} min`;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * Deterministic pseudo-random in [0,1) so server and client agree.
 *
 * Integer arithmetic only (mulberry32). The obvious `Math.sin(seed) * k`
 * trick is *not* stable across runtimes — `Math.sin` is implementation
 * defined, so Node and the browser disagree in the last few digits and every
 * value seeded that way arrives as a hydration mismatch.
 */
export function seededRandom(seed: number): number {
  let t = (Math.trunc(seed) + 0x6d2b79f5) | 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}
