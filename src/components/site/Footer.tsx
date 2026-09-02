import Link from "next/link";
import type { BrandSettings, BusinessSettings, ContactSettings, FooterSettings } from "@/content/types";
import { Logo } from "@/components/brand/Logo";
import { MicronRule } from "@/components/ui/Section";
import { resolveHref, isExternalHref } from "@/lib/links";

export function Footer({
  footer,
  brand,
  business,
  contact,
}: {
  footer: FooterSettings;
  brand: BrandSettings;
  business: BusinessSettings;
  contact: ContactSettings;
}) {
  const year = new Date().getFullYear();
  const enabledSocials = contact.socials.filter((s) => s.enabled);

  return (
    <footer className="relative overflow-hidden border-t border-silver/10 bg-pitch">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, color-mix(in oklab, var(--color-ceramic) 45%, transparent), transparent)" }}
      />

      <div className="shell relative z-10 pt-20 pb-10">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_2fr]">
          <div className="flex flex-col gap-6">
            <Logo mark={brand.activeMark} lead={brand.nameLead} trail={brand.nameTrail} size={38} />
            <p className="max-w-sm text-[0.92rem] leading-relaxed text-silver/65">{footer.blurb}</p>

            <div className="flex flex-col gap-1.5">
              <a href={resolveHref("#phone", contact)} className="numeral w-fit text-[0.95rem] tracking-[0.06em] text-chrome transition-colors hover:text-ceramic">
                {contact.phoneDisplay}
              </a>
              <a href={resolveHref("#email", contact)} className="w-fit text-[0.9rem] text-silver/70 transition-colors hover:text-ceramic">
                {contact.email}
              </a>
            </div>

            {enabledSocials.length ? (
              <ul className="flex flex-wrap gap-2">
                {enabledSocials.map((social) => (
                  <li key={social.id}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer me"
                      className="label-tech inline-flex items-center rounded-full border border-silver/15 px-3.5 py-2 text-silver/70 transition-colors duration-300 hover:border-ceramic/40 hover:text-ceramic"
                    >
                      {social.platform}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {footer.columns.map((column) => (
              <nav key={column.id} aria-label={column.title}>
                <h2 className="label-tech mb-5 text-silver/60">{column.title}</h2>
                <ul className="flex flex-col gap-3">
                  {column.links.map((link) => {
                    const href = resolveHref(link.href, contact);
                    return (
                      <li key={link.href + link.label}>
                        {isExternalHref(href) ? (
                          <a href={href} target="_blank" rel="noopener noreferrer" className="text-[0.88rem] text-silver/70 transition-colors duration-300 hover:text-ceramic">
                            {link.label}
                          </a>
                        ) : (
                          <Link href={href} className="text-[0.88rem] text-silver/70 transition-colors duration-300 hover:text-ceramic">
                            {link.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <MicronRule className="mt-16" label={business.hasPhysicalAddress ? "Visit us" : "Mobile across Gauteng"} />

        <div className="mt-8 flex flex-col gap-5">
          <p className="max-w-3xl text-[0.82rem] leading-relaxed text-ash">
            {business.hasPhysicalAddress
              ? [business.address.line1, business.address.line2, business.address.city, business.address.province, business.address.postalCode]
                  .filter(Boolean)
                  .join(", ")
              : business.serviceAreaNote}
          </p>
          <ul className="flex flex-wrap gap-x-3 gap-y-1.5">
            {business.serviceAreas.map((area) => (
              <li key={area} className="numeral text-[0.68rem] tracking-[0.14em] text-ash uppercase">
                {area}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col-reverse gap-5 border-t border-silver/8 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.78rem] text-ash">
            © {year} {business.legalName}. {footer.copyrightNote}
          </p>
          <ul className="flex gap-5">
            {footer.legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-[0.78rem] text-ash transition-colors hover:text-silver">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/portal" className="text-[0.78rem] text-ash transition-colors hover:text-ceramic">
                Portal
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {footer.showWatermark ? (
        <div aria-hidden className="pointer-events-none relative -mb-[0.22em] overflow-hidden select-none">
          <p
            className="font-display leading-[0.78] font-bold whitespace-nowrap"
            style={{
              fontSize: "clamp(3.5rem, 15.5vw, 15rem)",
              letterSpacing: "-0.05em",
              color: "transparent",
              WebkitTextStroke: "1px color-mix(in oklab, var(--color-silver) 12%, transparent)",
            }}
          >
            {brand.nameLead} {brand.nameTrail}
          </p>
        </div>
      ) : null}
    </footer>
  );
}
