type Plain = Record<string, unknown>;

const isPlainObject = (v: unknown): v is Plain =>
  typeof v === "object" && v !== null && !Array.isArray(v);

/**
 * Deep-merges a CMS override over the seed default.
 *
 * Arrays are replaced wholesale rather than merged element-by-element: an
 * editor who removes the fourth stat means to have three stats, not to have
 * the seed's fourth quietly reappear.
 */
export function deepMerge<T>(base: T, override: unknown): T {
  if (override === undefined || override === null) return base;
  if (Array.isArray(override)) return override as unknown as T;
  if (!isPlainObject(override) || !isPlainObject(base)) return override as T;

  const out: Plain = { ...base };
  for (const [key, value] of Object.entries(override)) {
    out[key] = key in base ? deepMerge((base as Plain)[key], value) : value;
  }
  return out as T;
}
