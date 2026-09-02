import type { ServiceDoc, SolarEconomics } from "@/content/types";

/**
 * Server-to-client projections.
 *
 * Client components are handed only the fields they paint. Passing a whole
 * ServiceDoc to a card would serialise that service's every section, package
 * and FAQ into the page's payload — five times over on the home page — for the
 * sake of a title and a summary.
 */

export type ServiceCardData = Pick<
  ServiceDoc,
  "id" | "slug" | "name" | "cardSummary" | "motif" | "flag"
>;

export function toCardData(service: ServiceDoc): ServiceCardData {
  return {
    id: service.id,
    slug: service.slug,
    name: service.name,
    cardSummary: service.cardSummary,
    motif: service.motif,
    flag: service.flag,
  };
}

export type ServiceOption = Pick<ServiceDoc, "slug" | "name" | "category">;

export function toServiceOption(service: ServiceDoc): ServiceOption {
  return { slug: service.slug, name: service.name, category: service.category };
}

/** Pricing inputs only — the ROI worksheet and neglect cards render on the server. */
export type CalculatorEconomics = Pick<
  SolarEconomics,
  "pricePerPanel" | "minutesPerPanel" | "defaultPanelCount" | "minPanels" | "maxPanels"
>;

export function toCalculatorEconomics(economics: SolarEconomics): CalculatorEconomics {
  return {
    pricePerPanel: economics.pricePerPanel,
    minutesPerPanel: economics.minutesPerPanel,
    defaultPanelCount: economics.defaultPanelCount,
    minPanels: economics.minPanels,
    maxPanels: economics.maxPanels,
  };
}
