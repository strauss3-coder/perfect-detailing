"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { ContactSettings } from "@/content/types";
import { telHref, whatsappHref } from "@/lib/links";

/**
 * Persistent contact affordance. Collapsed to a single control until the
 * visitor has scrolled past the hero, so it never lands on top of the first
 * impression.
 */
export function FloatingContact({ contact }: { contact: ContactSettings }) {
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 620);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.94 }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="fixed right-4 bottom-4 z-[125] flex flex-col items-end gap-2.5 sm:right-6 sm:bottom-6"
        >
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="panel-glass flex flex-col overflow-hidden rounded-tile"
              >
                <a href={whatsappHref(contact)} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 text-[0.85rem] text-chrome transition-colors hover:bg-silver/8">
                  <WhatsAppGlyph /> WhatsApp us
                </a>
                <a href={telHref(contact)}
                  className="flex items-center gap-3 border-t border-silver/10 px-4 py-3 text-[0.85rem] text-chrome transition-colors hover:bg-silver/8">
                  <PhoneGlyph /> {contact.phoneDisplay}
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close contact options" : "Open contact options"}
            className="group relative grid h-13 w-13 place-items-center rounded-full bg-linear-115 from-ceramic to-electric text-ink shadow-[0_16px_44px_-12px_color-mix(in_oklab,var(--color-electric)_80%,transparent)]"
          >
            <span aria-hidden className="absolute inset-0 rounded-full border border-ceramic/45" style={{ animation: "pulse-ring 2.6s var(--ease-gloss) infinite" }} />
            <span className="relative">{open ? <CloseGlyph /> : <WhatsAppGlyph />}</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function WhatsAppGlyph() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3a9 9 0 0 0-7.7 13.7L3 21l4.4-1.2A9 9 0 1 0 12 3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M8.8 8.4c.3-.6 1.3-.5 1.5 0l.5 1.2c.1.3 0 .6-.2.8l-.4.4c.5 1 1.3 1.8 2.3 2.3l.4-.4c.2-.2.5-.3.8-.2l1.2.5c.5.2.6 1.2 0 1.5-2.2 1-6.7-3.5-6.1-6.1Z" fill="currentColor" />
    </svg>
  );
}

function PhoneGlyph() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 3h3l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 5.2 2 2 0 0 1 6 3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function CloseGlyph() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
