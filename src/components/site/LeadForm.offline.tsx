"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { ServiceDoc } from "@/content/types";
import { Button, ButtonLink, Arrow } from "@/components/ui/Button";
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
  defaultService?: string;
  enquiryEmail?: string;
  whatsappNumber?: string;
}

/**
 * Enquiry form for the static build.
 *
 * GitHub Pages serves files and nothing else — there is no server to receive a
 * submission. Rather than pretend, this composes the enquiry from the same
 * fields and hands it to WhatsApp or email with everything already filled in.
 * The visitor still types once; the message simply travels by a different road.
 *
 * The server-backed version of this component lives in LeadForm.tsx and is used
 * whenever the app is deployed somewhere that can run it.
 */
/* The query string is browser state the server cannot see. Reading it through
   useSyncExternalStore keeps this component prerenderable — a `useSearchParams`
   here would make the whole form bail out to its Suspense fallback during
   static export, leaving an empty box in the HTML until JavaScript arrived. */
const subscribeToNothing = () => () => {};
const readSearch = () => window.location.search;
const readSearchOnServer = () => "";

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
  enquiryEmail = "",
  whatsappNumber = "",
}: LeadFormProps) {
  const search = useSyncExternalStore(subscribeToNothing, readSearch, readSearchOnServer);
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const panelsFromUrl = params.get("panels") ?? "";

  // `null` means the visitor has not touched the field yet, so it still
  // follows whatever the calculator put in the query string.
  const [serviceChoice, setServiceChoice] = useState<string | null>(null);
  const service =
    serviceChoice ??
    params.get("service") ??
    (defaultService || (panelsFromUrl ? "solar-panel-ceramic-coating" : ""));

  const [panelChoice, setPanelChoice] = useState<string | null>(null);
  const panelCount = panelChoice ?? panelsFromUrl;

  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    propertyType: "",
    assetDetails: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const selected = services.find((s) => s.slug === service);
  const isSolar = selected?.category === "solar";
  const needsAsset = Boolean(selected) && !isSolar;

  const set = (key: keyof typeof values, value: string) =>
    setValues((v) => ({ ...v, [key]: value }));

  const composed = useMemo(() => {
    const lines = [
      `New ${source === "quote" ? "quote request" : "enquiry"} from the website`,
      "",
      `Name: ${values.name}`,
      `Phone: ${values.phone}`,
      `Email: ${values.email}`,
      values.company ? `Company: ${values.company}` : "",
      values.propertyType ? `Property: ${values.propertyType}` : "",
      selected ? `Service: ${selected.name}` : "Service: not sure yet",
      isSolar && panelCount ? `Panels: ${panelCount}` : "",
      needsAsset && values.assetDetails ? `Details: ${values.assetDetails}` : "",
      "",
      values.message,
    ].filter(Boolean);
    return lines.join("\n");
  }, [values, panelCount, selected, isSolar, needsAsset, source]);

  const whatsappHref = `https://wa.me/${whatsappNumber.replace(/[^\d]/g, "")}?text=${encodeURIComponent(composed)}`;
  const subject = `${source === "quote" ? "Quote request" : "Enquiry"} — ${selected?.name ?? "Perfect Detailing"}`;
  const mailHref = `mailto:${enquiryEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(composed)}`;

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (values.name.trim().length < 2) next.name = "Please give us your name";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email.trim())) next.email = "That email address does not look right";
    if (values.phone.replace(/\D/g, "").length < 9) next.phone = "A contact number helps us reach you quickly";
    if (values.message.trim().length < 10) next.message = "Tell us a little about the job";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function submit(channel: "whatsapp" | "email") {
    if (!validate()) return;
    window.open(channel === "whatsapp" ? whatsappHref : mailHref, "_blank", "noopener");
    setSent(true);
  }

  if (sent) {
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
        <p className="mt-4 max-w-lg text-[0.85rem] leading-relaxed text-ash">
          If the message did not open, use one of these — your details are already in it.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href={whatsappHref} intent="primary" external magnetic={false}>
            Open in WhatsApp
            <Arrow />
          </ButtonLink>
          <ButtonLink href={mailHref} intent="secondary" magnetic={false}>
            Open in email
          </ButtonLink>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit("whatsapp");
      }}
      className="panel-glass rounded-panel p-7 sm:p-10"
      noValidate
    >
      <h2 className="font-display text-[1.5rem] tracking-tight text-chrome">{title}</h2>
      <p className="mt-3 max-w-lg text-[0.9rem] leading-relaxed text-silver/62">{lede}</p>

      <div className="mt-9 grid gap-5 sm:grid-cols-2">
        <Field id="lf-name" label="Your name" value={values.name} onChange={(v) => set("name", v)} error={errors.name} autoComplete="name" required />
        <Field id="lf-phone" label="Phone" type="tel" value={values.phone} onChange={(v) => set("phone", v)} error={errors.phone} autoComplete="tel" required />
        <Field id="lf-email" label="Email" type="email" value={values.email} onChange={(v) => set("email", v)} error={errors.email} autoComplete="email" required className="sm:col-span-2" />

        <div className="flex flex-col gap-2">
          <label htmlFor="lf-service" className="label-tech text-silver/60">Service</label>
          <select
            id="lf-service"
            value={service}
            onChange={(e) => setServiceChoice(e.target.value)}
            className="h-12 rounded-tile border border-silver/15 bg-ink/50 px-4 text-[0.92rem] text-chrome outline-none transition-colors focus:border-ceramic/50"
          >
            <option value="">Not sure yet</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>{s.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="lf-property" className="label-tech text-silver/60">Residential or commercial</label>
          <select
            id="lf-property"
            value={values.propertyType}
            onChange={(e) => set("propertyType", e.target.value)}
            className="h-12 rounded-tile border border-silver/15 bg-ink/50 px-4 text-[0.92rem] text-chrome outline-none transition-colors focus:border-ceramic/50"
          >
            <option value="">Prefer not to say</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>

        <AnimatePresence mode="popLayout">
          {isSolar ? (
            <motion.div key="panels" layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }} className="sm:col-span-2">
              <Field id="lf-panels" label="How many panels?" type="number" value={panelCount} onChange={setPanelChoice} hint="A rough count is fine — we confirm it on site." />
            </motion.div>
          ) : null}
          {needsAsset ? (
            <motion.div key="asset" layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }} className="sm:col-span-2">
              <Field
                id="lf-asset"
                label={
                  selected?.category === "aircraft" ? "Aircraft type and registration"
                    : selected?.category === "fleet" ? "Fleet size and vehicle types"
                      : "Vehicle make, model and colour"
                }
                value={values.assetDetails}
                onChange={(v) => set("assetDetails", v)}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <Field id="lf-company" label="Company (optional)" value={values.company} onChange={(v) => set("company", v)} autoComplete="organization" className="sm:col-span-2" />

        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor="lf-message" className="label-tech text-silver/60">
            What do you need? <span className="text-ceramic">*</span>
          </label>
          <textarea
            id="lf-message"
            rows={5}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "lf-message-error" : undefined}
            className={cn(
              "resize-y rounded-tile border bg-ink/50 px-4 py-3.5 text-[0.92rem] leading-relaxed text-chrome outline-none transition-colors",
              errors.message ? "border-amber/60" : "border-silver/15 focus:border-ceramic/50",
            )}
          />
          {errors.message ? <p id="lf-message-error" className="text-[0.78rem] text-amber">{errors.message}</p> : null}
        </div>
      </div>

      <p className="mt-7 text-[0.82rem] leading-relaxed text-silver/60">{consentNote}</p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button type="submit" intent="primary" size="lg">
          {submitLabel} on WhatsApp
          <Arrow />
        </Button>
        <button
          type="button"
          onClick={() => submit("email")}
          className="rounded-full border border-silver/20 px-6 py-3 text-[0.86rem] text-chrome transition-colors duration-300 hover:border-ceramic/45 hover:text-ceramic"
        >
          Send by email instead
        </button>
      </div>
    </form>
  );
}

function Field({
  id, label, value, onChange, type = "text", autoComplete, error, required, className, hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  error?: string;
  required?: boolean;
  className?: string;
  hint?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="label-tech text-silver/60">
        {label} {required ? <span className="text-ceramic">*</span> : null}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
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
