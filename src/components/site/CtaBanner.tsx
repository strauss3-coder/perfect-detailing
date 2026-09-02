import type { ContactSettings, LinkRef } from "@/content/types";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink, Arrow } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { resolveHref, isExternalHref } from "@/lib/links";

/**
 * The closing call to action, used at the foot of every page. Full-bleed with
 * its own light source so it reads as a distinct moment rather than another
 * content block.
 */
export function CtaBanner({
  eyebrow,
  title,
  body,
  actions,
  contact,
}: {
  eyebrow?: string;
  title: string;
  body: string;
  actions: LinkRef[];
  contact: ContactSettings;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="shell">
        <Reveal>
          <div className="panel-glass relative overflow-hidden rounded-panel px-7 py-14 sm:px-14 sm:py-20">
            <div
              aria-hidden
              className="absolute inset-0 -z-10"
              style={{ background: "radial-gradient(70% 120% at 15% 0%, color-mix(in oklab, var(--color-electric) 26%, transparent), transparent 68%)" }}
            />
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, color-mix(in oklab, var(--color-ceramic) 60%, transparent), transparent)" }}
            />

            <div className="flex max-w-3xl flex-col gap-5">
              {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
              <h2 className="text-display text-balance text-chrome">{title}</h2>
              <p className="text-lede max-w-xl text-pretty">{body}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {actions.map((action) => {
                  const href = resolveHref(action.href, contact);
                  return (
                    <ButtonLink
                      key={action.label + action.href}
                      href={href}
                      intent={action.intent ?? "primary"}
                      size="lg"
                      external={isExternalHref(href)}
                    >
                      {action.label}
                      <Arrow />
                    </ButtonLink>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
