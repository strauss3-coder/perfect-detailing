"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { GROUPS, MODULES, type ModuleGroup } from "@/lib/portal/modules";
import { Mark } from "@/components/brand/Marks";
import { logoutAction } from "@/app/actions/cms";
import { cn } from "@/lib/utils";

export function Sidebar({
  userName,
  storeKind,
  newLeadCount,
}: {
  userName: string;
  storeKind: "supabase" | "file";
  newLeadCount: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentSlug = pathname.replace(/^\/portal\/?/, "").replace(/\/$/, "");
  const currentCategory = searchParams.get("category");

  const isActive = (slug: string) => {
    const [base, query] = slug.split("?");
    if (base !== currentSlug) return false;
    if (!query) return !currentCategory || base !== "services";
    return query === `category=${currentCategory}`;
  };

  const nav = (
    <nav aria-label="Portal sections" className="flex flex-col gap-7">
      {GROUPS.map((group: ModuleGroup) => {
        const items = MODULES.filter((m) => m.group === group);
        if (!items.length) return null;
        return (
          <div key={group}>
            <p className="label-tech mb-3 px-3 text-silver/60">{group}</p>
            <ul className="flex flex-col gap-0.5">
              {items.map((module) => {
                const active = isActive(module.slug);
                return (
                  <li key={module.slug}>
                    <Link
                      href={`/portal${module.slug ? `/${module.slug}` : ""}`}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-tile px-3 py-2.5 text-[0.83rem] transition-colors duration-300",
                        active ? "text-ceramic" : "text-silver/65 hover:bg-silver/5 hover:text-chrome",
                      )}
                    >
                      {active ? (
                        <motion.span
                          layoutId="portal-nav-active"
                          className="absolute inset-0 -z-10 rounded-tile bg-ceramic/8 ring-1 ring-ceramic/20"
                          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                        />
                      ) : null}
                      <span className="flex-1 truncate">{module.label}</span>
                      {module.slug === "leads" && newLeadCount > 0 ? (
                        <span className="numeral rounded-full bg-ceramic px-1.5 py-0.5 text-[0.62rem] font-medium text-ink">
                          {newLeadCount}
                        </span>
                      ) : null}
                      {module.badge ? (
                        <span className="label-tech rounded-full border border-ceramic/30 px-1.5 py-0.5 text-[0.5rem] text-ceramic">
                          {module.badge}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between gap-4 border-b border-silver/10 bg-ink/90 px-4 py-3 backdrop-blur-xl lg:hidden">
        <Link href="/portal" className="flex items-center gap-2.5">
          <Mark size={26} />
          <span className="font-display text-[0.95rem] font-bold text-chrome">Portal</span>
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          className="rounded-full border border-silver/15 px-4 py-2 text-[0.78rem] text-silver"
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="sticky top-[3.4rem] z-30 max-h-[70vh] overflow-y-auto border-b border-silver/10 bg-graphite/95 px-4 py-6 backdrop-blur-xl lg:hidden"
          >
            {nav}
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Desktop rail */}
      <aside className="sticky top-0 hidden h-dvh w-[16.5rem] shrink-0 flex-col border-r border-silver/10 bg-pitch/70 lg:flex">
        <div className="flex items-center gap-3 border-b border-silver/10 px-5 py-5">
          <Mark size={30} />
          <div className="min-w-0">
            <p className="truncate font-display text-[0.95rem] font-bold tracking-tight text-chrome">Portal</p>
            <p className="label-tech truncate text-[0.55rem] text-silver/60">{userName}</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-6">{nav}</div>

        <div className="border-t border-silver/10 px-5 py-4">
          <p className="label-tech mb-3 flex items-center gap-2 text-[0.55rem] text-silver/60">
            <span
              className={cn("inline-block h-1.5 w-1.5 rounded-full", storeKind === "supabase" ? "bg-ceramic" : "bg-amber")}
            />
            {storeKind === "supabase" ? "Supabase connected" : "Local file store"}
          </p>
          <div className="flex flex-col gap-2">
            <Link href="/" target="_blank" className="text-[0.78rem] text-silver/60 transition-colors hover:text-ceramic">
              View website ↗
            </Link>
            <form action={logoutAction}>
              <button type="submit" className="text-[0.78rem] text-silver/60 transition-colors hover:text-amber">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </aside>
    </>
  );
}
