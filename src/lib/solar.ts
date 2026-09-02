import type { QuotePageContent, SolarEconomics } from "@/content/types";

/**
 * Solar coating maths.
 *
 * Every figure the site publishes about solar economics is derived here from
 * the CMS-editable assumptions, so a page can never quote a number that
 * contradicts the inputs an owner has since changed.
 */

export interface QuoteEstimate {
  panels: number;
  pricePerPanel: number;
  /** Before any volume band is applied. */
  listTotal: number;
  discountPct: number;
  discountLabel: string;
  total: number;
  effectivePerPanel: number;
  /** Coating labour, in crew-minutes. */
  totalMinutes: number;
  /** Elapsed time the crew is actually on site. */
  onSiteMinutes: number;
  onSiteDays: number;
  /** Human-readable booking suggestion, e.g. "Half a day". */
  slot: string;
}

export function estimateQuote(
  panels: number,
  economics: Pick<SolarEconomics, "pricePerPanel" | "minutesPerPanel">,
  calculator: QuotePageContent["calculator"],
): QuoteEstimate {
  const count = Math.max(0, Math.round(panels));
  const listTotal = count * economics.pricePerPanel;

  // Bands are opt-in from the portal; with none configured the rate is flat.
  const band = [...calculator.volumeBands]
    .sort((a, b) => a.minPanels - b.minPanels)
    .filter((b) => count >= b.minPanels)
    .at(-1);

  const discountPct = band?.discountPct ?? 0;
  const total = Math.round(listTotal * (1 - discountPct / 100));
  const totalMinutes = count * economics.minutesPerPanel;

  // Labour divides across the crew; the floor covers access, set-up and the
  // pre-coating wash, which a small array still needs in full.
  const crew = Math.max(1, calculator.crewSize);
  const perDay = Math.max(60, calculator.productiveMinutesPerDay);
  const onSiteMinutes =
    count === 0
      ? 0
      : Math.max(calculator.minimumOnSiteMinutes, Math.ceil(totalMinutes / crew));
  const onSiteDays = count === 0 ? 0 : Math.max(1, Math.ceil(onSiteMinutes / perDay));

  return {
    panels: count,
    pricePerPanel: economics.pricePerPanel,
    listTotal,
    discountPct,
    discountLabel: band?.label ?? "",
    total,
    effectivePerPanel: count > 0 ? Math.round(total / count) : economics.pricePerPanel,
    totalMinutes,
    onSiteMinutes,
    onSiteDays,
    slot: describeSlot(onSiteMinutes, perDay, onSiteDays),
  };
}

function describeSlot(onSiteMinutes: number, perDay: number, days: number): string {
  if (onSiteMinutes === 0) return "—";
  if (onSiteMinutes <= perDay * 0.4) return "One morning";
  if (onSiteMinutes <= perDay * 0.75) return "Half a day";
  if (days === 1) return "One full day";
  if (days === 2) return "Two consecutive days";
  return `${days} days on site`;
}

/* ------------------------------------------------------------------ */
/* Return on investment                                                */
/* ------------------------------------------------------------------ */

export interface RoiResult {
  panels: number;
  investment: number;
  annualGenerationKwh: number;
  /** kWh recovered each year by the lower soiling loss. */
  recoveredKwh: number;
  recoveredValue: number;
  cleaningBefore: number;
  cleaningAfter: number;
  cleaningSaving: number;
  annualBenefit: number;
  paybackMonths: number;
  lifetimeBenefit: number;
  netOverLifetime: number;
  returnPct: number;
  lifespanYears: number;
}

export function computeRoi(worked: SolarEconomics["worked"], pricePerPanel: number): RoiResult {
  const investment = worked.panelCount * pricePerPanel;
  const annualGenerationKwh = worked.systemKwp * worked.yieldPerKwpPerYear;

  const recoveredKwh = annualGenerationKwh * (worked.soilingLossBefore - worked.soilingLossAfter);
  const recoveredValue = recoveredKwh * worked.tariffPerKwh;

  const cleaningBefore = worked.panelCount * worked.costPerCleanPerPanel * worked.cleansPerYearBefore;
  const cleaningAfter = worked.panelCount * worked.costPerCleanPerPanel * worked.cleansPerYearAfter;
  const cleaningSaving = cleaningBefore - cleaningAfter;

  const annualBenefit = recoveredValue + cleaningSaving;
  const paybackMonths = annualBenefit > 0 ? (investment / annualBenefit) * 12 : Infinity;
  const lifetimeBenefit = annualBenefit * worked.coatingLifespanYears;

  return {
    panels: worked.panelCount,
    investment,
    annualGenerationKwh,
    recoveredKwh,
    recoveredValue,
    cleaningBefore,
    cleaningAfter,
    cleaningSaving,
    annualBenefit,
    paybackMonths,
    lifetimeBenefit,
    netOverLifetime: lifetimeBenefit - investment,
    returnPct: investment > 0 ? ((lifetimeBenefit - investment) / investment) * 100 : 0,
    lifespanYears: worked.coatingLifespanYears,
  };
}

/** Scales the worked example to an arbitrary array size, keeping ratios. */
export function scaleRoi(
  worked: SolarEconomics["worked"],
  pricePerPanel: number,
  panels: number,
): RoiResult {
  const factor = worked.panelCount > 0 ? panels / worked.panelCount : 0;
  return computeRoi(
    { ...worked, panelCount: panels, systemKwp: worked.systemKwp * factor },
    pricePerPanel,
  );
}
