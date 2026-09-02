"use client";

import { useActionState, useId, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import type { ServiceDoc } from "@/content/types";
import { submitLead } from "@/app/actions/leads";
import { IDLE_STATE } from "@/lib/validation";
import { Button, Arrow } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface LeadFormProps {
  services: Pick<ServiceDoc, "slug" | "name" | "category">[];
  source: "contact" | "quote";
  title: string;
  lede: string;
  consentNote: string;
  successTitle: string;
  successBody: string;
  submitLabel: string;
  /** Pre-selects a service when the form is reached from a service page. */
  defaultService?: string;
  /** Used only by the static build's offline variant of this form. */
  enquiryEmail?: string;
  whatsappNumber?: string;
}

/**
 * The enquiry form.
 *
 * Fields adapt to the service selected: choosing solar asks for a panel
 * count, choosing aircraft or automotive asks for the asset. Asking every
 * visitor every question is how enquiry forms get abandoned.
 */
export function LeadForm({
  services,
  source,
  title,
  lede,
  consentNote,
  successTitle,
  successBody,
  submitLabel,
  defaultService = "",
}: LeadFormProps) {
  const [state, action, pending] = useActionState(submitLead, IDLE_STATE);
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();

  // The calculator hands the panel count over in the query string, so both
  // fields are seeded during the first render rather than corrected afterwards.
  const panelsFromUrl = searchParams.get("panels") ?? "";
  const [service, setService] = useState(() => {
    const fromQuery = searchParams.get("service");
    if (fromQuery) return fromQuery;
    if (defaultService) return defaultService;
    return panelsFromUrl ? "solar-panel-ceramic-coating" : "";
  });
  const [panels, setPanels] = useState(() => panelsFromUrl);

  const selected = services.find((s) => s.slug === service);
  const isSolar = selected?.category === "solar";
  const needsAsset = selected?.category === "automotive" || selected?.category === "ceramic" || selected?.category === "aircraft" || selected?.category === "fleet";

  const err = (field: string) => state.fieldErrors?.[field];

  if (state.status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="panel-glass relative overflow-hidden rounded-panel p-9 sm:p-12"
      >
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--color-ceramic), transparent)" }}
        />
        <span className="grid h-14 w-14 place-items-center rounded-full border border-ceramic/40 text-ceramic">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 12.5l4 4L18 8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h2 className="mt-7 font-display text-[1.6rem] tracking-tight text-chrome">{successTitle}</h2>
        <p className="mt-3 max-w-lg text-[0.95rem] leading-relaxed text-silver/70">{successBody}</p>
        {state.reference && state.reference !== "—" ? (
          <p className="numeral mt-7 inline-flex items-center gap-3 rounded-full border border-silver/15 px-5 py-2.5 text-[0.9rem] text-ceramic">
            <span className="label-tech text-silver/60">Reference</span>
            {state.reference}
          </p>
        ) : null}
      </motion.div>
    );
  }

  return (
    <form
      ref={formRef}
      action={action}
      className="panel-glass rounded-panel p-7 sm:p-10"
      noValidate
    >
      <h2 className="font-display text-[1.5rem] tracking-tight text-chrome">{title}</h2>
      <p className="mt-3 max-w-lg text-[0.9rem] leading-relaxed text-silver/65">{lede}</p>

      <input type="hidden" name="source" value={source} />
      <input type="hidden" name="pageUrl" value={typeof window === "undefined" ? "" : window.location.pathname} />
      {/* Honeypot — visually and programmatically hidden from people */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${uid}-website`}>Leave this empty</label>
        <input id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-9 grid gap-5 sm:grid-cols-2">
        <Field id={`${uid}-name`} name="name" label="Your name" autoComplete="name" error={err("name")} required />
        <Field id={`${uid}-phone`} name="phone" label="Phone" type="tel" autoComplete="tel" error={err("phone")} required />
        <Field id={`${uid}-email`} name="email" label="Email" type="email" autoComplete="email" error={err("email")} required className="sm:col-span-2" />

        <div className="flex flex-col gap-2">
          <label htmlFor={`${uid}-service`} className="label-tech text-silver/62">Service</label>
          <select
            id={`${uid}-service`}
            name="serviceSlug"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="h-12 rounded-tile border border-silver/15 bg-ink/50 px-4 text-[0.92rem] text-chrome outline-none transition-colors focus:border-ceramic/50"
          >
            <option value="">Not sure yet</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>{s.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={`${uid}-property`} className="label-tech text-silver/62">Residential or commercial</label>
          <select
            id={`${uid}-property`}
            name="propertyType"
            defaultValue=""
            className="h-12 rounded-tile border border-silver/15 bg-ink/50 px-4 text-[0.92rem] text-chrome outline-none transition-colors focus:border-ceramic/50"
          >
            <option value="">Prefer not to say</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>

        <AnimatePresence mode="popLayout">
          {isSolar ? (
            <motion.div
              key="panels"
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
              className="sm:col-span-2"
            >
              <Field
                id={`${uid}-panels`}
                name="panelCount"
                label="How many panels?"
                type="number"
                value={panels}
                onChange={setPanels}
                hint="A rough count is fine — we confirm it on site."
                error={err("panelCount")}
              />
            </motion.div>
          ) : null}

          {needsAsset ? (
            <motion.div
              key="asset"
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
              className="sm:col-span-2"
            >
              <Field
                id={`${uid}-asset`}
                name="assetDetails"
                label={
                  selected?.category === "aircraft"
                    ? "Aircraft type and registration"
                    : selected?.category === "fleet"
                      ? "Fleet size and vehicle types"
                      : "Vehicle make, model and colour"
                }
                error={err("assetDetails")}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <Field
          id={`${uid}-company`}
          name="company"
          label="Company (optional)"
          autoComplete="organization"
          error={err("company")}
          className="sm:col-span-2"
        />

        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor={`${uid}-message`} className="label-tech text-silver/62">
            What do you need? <span className="text-ceramic">*</span>
          </label>
          <textarea
            id={`${uid}-message`}
            name="message"
            rows={5}
            required
            aria-invalid={Boolean(err("message"))}
            aria-describedby={err("message") ? `${uid}-message-error` : undefined}
            className={cn(
              "resize-y rounded-tile border bg-ink/50 px-4 py-3.5 text-[0.92rem] leading-relaxed text-chrome outline-none transition-colors",
              err("message") ? "border-amber/60" : "border-silver/15 focus:border-ceramic/50",
            )}
          />
          {err("message") ? (
            <p id={`${uid}-message-error`} className="text-[0.78rem] text-amber">{err("message")}</p>
          ) : null}
        </div>
      </div>

      <label className="mt-7 flex items-start gap-3.5 text-[0.82rem] leading-relaxed text-silver/60">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-ceramic)]"
        />
        {consentNote}
      </label>

      {state.status === "error" && state.message ? (
        <p role="alert" className="mt-6 rounded-tile border border-amber/40 bg-amber/8 px-4 py-3 text-[0.85rem] text-amber">
          {state.message}
        </p>
      ) : null}

      <div className="mt-8">
        <Button type="submit" intent="primary" size="lg" disabled={pending}>
          {pending ? "Sending…" : submitLabel}
          {pending ? <Spinner /> : <Arrow />}
        </Button>
      </div>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  error,
  required,
  className,
  hint,
  value,
  onChange,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  error?: string;
  required?: boolean;
  className?: string;
  hint?: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  const controlled = value !== undefined && onChange !== undefined;
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="label-tech text-silver/62">
        {label} {required ? <span className="text-ceramic">*</span> : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        {...(controlled ? { value, onChange: (e) => onChange(e.target.value) } : {})}
        className={cn(
          "h-12 rounded-tile border bg-ink/50 px-4 text-[0.92rem] text-chrome outline-none transition-colors",
          error ? "border-amber/60" : "border-silver/15 focus:border-ceramic/50",
        )}
      />
      {hint && !error ? <p id={`${id}-hint`} className="text-[0.76rem] text-ash">{hint}</p> : null}
      {error ? <p id={`${id}-error`} className="text-[0.78rem] text-amber">{error}</p> : null}
    </div>
  );
}

function Spinner() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden className="animate-spin">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.5" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
