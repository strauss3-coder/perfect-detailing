"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import type { BrandSettings, ContactSettings, NavigationSettings } from "@/content/types";
import { Logo } from "@/components/brand/Logo";
import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { Motif } from "@/components/icons/Motif";
import { ButtonLink, Arrow } from "@/components/ui/Button";
import { resolveHref } from "@/lib/links";
import { cn } from "@/lib/utils";

export function Header({
  navigation,
  brand,
  contact,
}: {
  navigation: NavigationSettings;
  brand: BrandSettings;
  contact: ContactSettings;
}) {
  const announcement = navigation.announcement;
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  const closeMenus = () => {
    setMobileOpen(false);
    setOpenMenu(null);
  };

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[300] focus:rounded-full focus:bg-ceramic focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-ink"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[120] transition-[background-color,backdrop-filter,border-color] duration-500 ease-[var(--ease-gloss)]",
          scrolled
            ? "border-b border-silver/10 bg-ink/72 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent",
        )}
        onMouseLeave={() => setOpenMenu(null)}
      >
        {/* Inside the fixed header rather than above it — as a sibling in
            normal flow the strip sat underneath this element and was never
            visible. */}
        {announcement.enabled && announcement.items.length ? (
          <AnnouncementBar items={announcement.items} />
        ) : null}

        <div className="shell flex h-[var(--nav-h)] items-center justify-between gap-6">
          <Link href="/" aria-label={`${brand.name} — home`} className="shrink-0">
            <Logo lead={brand.nameLead} trail={brand.nameTrail} size={34} />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navigation.primary.map((item) => (
                <li key={item.id} className="relative">
                  {item.children?.length ? (
                    <button
                      type="button"
                      onMouseEnter={() => setOpenMenu(item.id)}
                      onFocus={() => setOpenMenu(item.id)}
                      onClick={() => setOpenMenu(openMenu === item.id ? null : item.id)}
                      aria-expanded={openMenu === item.id}
                      className={cn(
                        "flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.84rem] transition-colors duration-300",
                        isActive(item.href) ? "text-ceramic" : "text-silver/85 hover:text-chrome",
                      )}
                    >
                      {item.label}
                      <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden
                        className={cn("transition-transform duration-300", openMenu === item.id && "rotate-180")}>
                        <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={closeMenus}
                      onMouseEnter={() => setOpenMenu(null)}
                      className={cn(
                        "relative block rounded-full px-3.5 py-2 text-[0.84rem] transition-colors duration-300",
                        isActive(item.href) ? "text-ceramic" : "text-silver/85 hover:text-chrome",
                      )}
                    >
                      {item.label}
                      {isActive(item.href) && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-x-3 -bottom-0.5 h-px bg-linear-to-r from-transparent via-ceramic to-transparent"
                        />
                      )}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={resolveHref("#phone", contact)}
              className="numeral hidden text-[0.78rem] tracking-[0.08em] text-silver/70 transition-colors hover:text-ceramic xl:block"
            >
              {contact.phoneDisplay}
            </a>
            {/* `max-sm:hidden`, not `hidden sm:inline-flex`: the button's own
                base class is `inline-flex`, and between two unprefixed display
                utilities it is stylesheet order that decides, not class order. */}
            <ButtonLink href={navigation.cta.href} intent="primary" size="sm" className="max-sm:hidden">
              {navigation.cta.label}
              <Arrow />
            </ButtonLink>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="relative grid h-10 w-10 place-items-center rounded-full border border-silver/15 lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <span className={cn("absolute inset-x-0 top-0 h-px bg-chrome transition-transform duration-400 ease-[var(--ease-gloss)]", mobileOpen && "top-1.5 rotate-45")} />
                <span className={cn("absolute inset-x-0 top-1.5 h-px bg-chrome transition-opacity duration-300", mobileOpen && "opacity-0")} />
                <span className={cn("absolute inset-x-0 top-3 h-px bg-chrome transition-transform duration-400 ease-[var(--ease-gloss)]", mobileOpen && "top-1.5 -rotate-45")} />
              </span>
            </button>
          </div>
        </div>

        {/* Mega menu */}
        <AnimatePresence>
          {openMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 top-full hidden lg:block"
            >
              <div className="shell pb-4">
                <div className="panel-glass overflow-hidden rounded-panel p-2">
                  <ul className="grid grid-cols-2 gap-1 xl:grid-cols-3">
                    {navigation.primary
                      .find((i) => i.id === openMenu)
                      ?.children?.map((child) => (
                        <li key={child.id}>
                          <Link
                            href={child.href}
                            onClick={closeMenus}
                            className="group/mm flex items-start gap-3.5 rounded-tile p-4 transition-colors duration-300 hover:bg-silver/6"
                          >
                            <span className="mt-0.5 text-silver/62 transition-colors duration-300 group-hover/mm:text-ceramic">
                              <Motif motif={child.motif ?? "shield"} size={28} strokeWidth={1.7} />
                            </span>
                            <span className="min-w-0">
                              <span className="flex flex-wrap items-center gap-2">
                                <span className="text-[0.92rem] font-medium text-chrome">{child.label}</span>
                                {child.flag ? (
                                  <span className="label-tech rounded-full border border-ceramic/30 px-2 py-0.5 text-[0.55rem] text-ceramic">
                                    {child.flag}
                                  </span>
                                ) : null}
                              </span>
                              <span className="mt-1 block text-[0.8rem] leading-relaxed text-silver/60">
                                {child.description}
                              </span>
                            </span>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[110] bg-ink/96 backdrop-blur-xl lg:hidden"
          >
            <div className="shell flex h-full flex-col gap-6 overflow-y-auto pt-[calc(var(--nav-h)+var(--announce-h)+1.5rem)] pb-10">
              <nav aria-label="Mobile">
                <ul className="flex flex-col">
                  {navigation.primary.map((item, i) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="border-b border-silver/8"
                    >
                      <Link
                        href={item.href}
                        onClick={closeMenus}
                        className={cn(
                          "flex items-center justify-between py-4 font-display text-2xl tracking-tight",
                          isActive(item.href) ? "text-ceramic" : "text-chrome",
                        )}
                      >
                        {item.label}
                        <Arrow className="opacity-40" />
                      </Link>
                      {item.children?.length ? (
                        <ul className="-mt-1 flex flex-col gap-1 pb-4">
                          {item.children.map((child) => (
                            <li key={child.id}>
                              <Link href={child.href} onClick={closeMenus} className="flex items-center gap-2.5 py-1.5 text-[0.88rem] text-silver/70">
                                <Motif motif={child.motif ?? "shield"} size={18} strokeWidth={2} />
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="mt-auto flex flex-col gap-3">
                <ButtonLink href={navigation.cta.href} intent="primary" size="lg" magnetic={false} onNavigate={closeMenus}>
                  {navigation.cta.label}
                  <Arrow />
                </ButtonLink>
                <a
                  href={resolveHref("#phone", contact)}
                  className="numeral rounded-full border border-silver/15 py-3 text-center text-sm tracking-[0.08em] text-chrome"
                >
                  {contact.phoneDisplay}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
