/**
 * Clock access, isolated.
 *
 * Server components legitimately read the wall clock while rendering — a
 * dashboard is a snapshot of "now". Keeping the call behind a function keeps
 * the impurity in one named place rather than scattered through components.
 */
export function nowMs(): number {
  return Date.now();
}

export function startOfDay(offsetDays = 0): Date {
  const d = new Date(nowMs() - offsetDays * 86_400_000);
  d.setHours(0, 0, 0, 0);
  return d;
}
