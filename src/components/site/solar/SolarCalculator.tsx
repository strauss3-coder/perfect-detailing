"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import type { QuotePageContent } from "@/content/types";
import type { CalculatorEconomics } from "@/lib/projections";
import { estimateQuote } from "@/lib/solar";
import { formatCurrency, formatDuration, clamp } from "@/lib/utils";
import { ButtonLink, Arrow } from "@/components/ui/Button";
import { SolarPanelViz } from "@/components/site/SolarPanelViz";

/**
 * Live pricing for the one service that can honestly be priced without a site
 * visit. Everything it shows is derived from the CMS rate and timing, so the
 * portal is the single source of truth for what this quotes.
 */
export function SolarCalculator({
  economics,
  calculator,
  currency,
  locale,
  quoteHref = "/quote#enquiry",
  showViz = true,
}: {
  economics: CalculatorEconomics;
  calculator: QuotePageContent["calculator"];
  currency: string;
  locale: string;
  quoteHref?: string;
  showViz?: boolean;
}) {
  const [panels, setPanels] = useState(economics.defaultPanelCount);

  const estimate = useMemo(
    () => estimateQuote(panels, economics, calculator),
    [panels, economics, calculator],
  );

  const money = (v: number) => formatCurrency(v, { currency, locale });
  const setSafe = (v: number) => setPanels(clamp(Math.round(v), economics.minPanels, economics.maxPanels));

  return (
    <div className="panel-glass overflow-hidden rounded-panel">
      <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
        {/* Controls */}
        <div className="border-b border-silver/10 p-7 sm:p-10 lg:border-r lg:border-b-0">
          <h2 className="font-display text-[1.5rem] tracking-tight text-chrome">{calculator.title}</h2>
          <p className="mt-3 max-w-md text-[0.9rem] leading-relaxed text-silver/65">{calculator.lede}</p>

          <div className="mt-9">
            <div className="flex items-end justify-between gap-4">
              <label htmlFor="panel-count" className="label-tech text-silver/62">
                {calculator.panelLabel}
              </label>
              <div className="flex items-center gap-2">
                <StepButton label="Fewer panels" onClick={() => setSafe(panels - 1)} sign="−" />
                <input
                  id="panel-count"
                  type="number"
                  inputMode="numeric"
                  min={economics.minPanels}
                  max={economics.maxPanels}
                  value={panels}
                  onChange={(e) => setSafe(Number(e.target.value))}
                  className="numeral w-24 rounded-tile border border-silver/15 bg-ink/60 px-3 py-2 text-right text-[1.1rem] text-chrome outline-none focus:border-ceramic/50"
                />
                <StepButton label="More panels" onClick={() => setSafe(panels + 1)} sign="+" />
              </div>
            </div>

            <input
              type="range"
              aria-label={calculator.panelLabel}
              min={economics.minPanels}
              max={Math.min(economics.maxPanels, 300)}
              value={Math.min(panels, 300)}
              onChange={(e) => setSafe(Number(e.target.value))}
              className="mt-5 w-full accent-[var(--color-ceramic)]"
              style={{ accentColor: "var(--color-ceramic)" }}
            />

            <div className="mt-2 flex justify-between">
              <span className="numeral text-[0.68rem] text-ash">{economics.minPanels}</span>
              <span className="numeral text-[0.68rem] text-ash">300+</span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {[8, 16, 24, 50, 100, 250].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setSafe(preset)}
                  className={`numeral rounded-full border px-3.5 py-1.5 text-[0.75rem] transition-colors duration-300 ${
                    panels === preset
                      ? "border-ceramic/50 text-ceramic"
                      : "border-silver/15 text-silver/62 hover:border-silver/35 hover:text-chrome"
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {showViz ? (
            <div className="mt-10 hidden lg:block">
              <SolarPanelViz className="w-full max-w-sm opacity-90" />
            </div>
          ) : null}
        </div>

        {/* Readout */}
        <div className="relative flex flex-col p-7 sm:p-10">
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{ background: "radial-gradient(70% 60% at 80% 10%, color-mix(in oklab, var(--color-electric) 20%, transparent), transparent 70%)" }}
          />

          <dl className="flex flex-col gap-7">
            <div>
              <dt className="label-tech text-silver/60">{calculator.resultLabels.total}</dt>
              <dd className="numeral mt-2 text-[clamp(2.4rem,5vw,3.4rem)] leading-none font-medium text-chrome">
                <motion.span key={estimate.total} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32 }}>
                  {money(estimate.total)}
                </motion.span>
              </dd>
              {estimate.discountPct > 0 ? (
                <p className="mt-2 text-[0.8rem] text-ceramic">
                  {estimate.discountLabel} — {money(estimate.listTotal - estimate.total)} off
                </p>
              ) : null}
            </div>

            <div className="grid gap-px overflow-hidden rounded-tile bg-silver/10 sm:grid-cols-2">
              <Cell label={calculator.resultLabels.perPanel} value={money(estimate.effectivePerPanel)} />
              <Cell label={calculator.resultLabels.duration} value={formatDuration(estimate.onSiteMinutes)} />
              <Cell label={calculator.resultLabels.slot} value={estimate.slot} />
              <Cell label="Panels" value={String(estimate.panels)} />
            </div>
          </dl>

          <p className="mt-6 text-[0.78rem] leading-relaxed text-ash">{calculator.slotNote}</p>

          <div className="mt-8">
            <ButtonLink href={`${quoteHref}?panels=${estimate.panels}`} intent="primary" size="lg" magnetic={false}>
              Book this in
              <Arrow />
            </ButtonLink>
          </div>

          <p className="mt-auto pt-8 text-[0.74rem] leading-relaxed text-ash">{calculator.disclaimer}</p>
        </div>
      </div>
    </div>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-graphite/85 p-4">
      <p className="label-tech text-silver/60">{label}</p>
      <p className="numeral mt-1.5 text-[1.05rem] text-ceramic">{value}</p>
    </div>
  );
}

function StepButton({ label, onClick, sign }: { label: string; onClick: () => void; sign: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-full border border-silver/15 text-silver transition-colors duration-300 hover:border-ceramic/45 hover:text-ceramic"
    >
      {sign}
    </button>
  );
}
