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

/** Deterministic pseudo-random in [0,1) so server and client agree. */
export function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}
