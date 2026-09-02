import type { HomeContent } from "@/content/types";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

/**
 * Trust row. Deliberately understated — a wall of gold seals reads as
 * decoration, so these are set as instrument labels with a hairline rule.
 */
export function TrustBadges({ section }: { section: HomeContent["trustBadges"] }) {
  if (!section.enabled || !section.items.length) return null;

  return (
    <section className="relative border-y border-silver/10 bg-pitch/60 py-8">
      <RevealGroup className="shell flex flex-wrap items-center justify-center gap-x-10 gap-y-6" stagger={0.06}>
        {section.items.map((item) => (
          <RevealItem key={item.id}>
            <div className="group flex items-center gap-3">
              <Seal />
              <span className="flex flex-col">
                <span className="text-[0.84rem] font-medium text-chrome">{item.label}</span>
                <span className="text-[0.72rem] text-ash">{item.detail}</span>
              </span>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}

function Seal() {
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden className="shrink-0">
      <circle
        cx="16" cy="16" r="13"
        stroke="color-mix(in oklab, var(--color-ceramic) 40%, transparent)"
        strokeWidth="1.2"
        strokeDasharray="3 3.4"
        className="origin-center transition-transform duration-[3s] ease-[var(--ease-gloss)] group-hover:rotate-90"
      />
      <path d="M11 16.4l3.4 3.4L21 13" stroke="var(--color-ceramic)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
