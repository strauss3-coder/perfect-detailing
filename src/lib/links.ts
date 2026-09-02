import type { ContactSettings } from "@/content/types";

export function telHref(contact: ContactSettings): string {
  return `tel:${contact.phone.replace(/[^\d+]/g, "")}`;
}

export function whatsappHref(contact: ContactSettings, message?: string): string {
  const number = contact.whatsapp.replace(/[^\d]/g, "");
  const text = encodeURIComponent(message ?? contact.whatsappMessage);
  return `https://wa.me/${number}?text=${text}`;
}

export function mailHref(address: string, subject?: string): string {
  return subject ? `mailto:${address}?subject=${encodeURIComponent(subject)}` : `mailto:${address}`;
}

/** Resolves the placeholder hrefs used in CMS link lists. */
export function resolveHref(href: string, contact: ContactSettings): string {
  switch (href) {
    case "#whatsapp": return whatsappHref(contact);
    case "#phone": return telHref(contact);
    case "#email": return mailHref(contact.email);
    default: return href;
  }
}

export function isExternalHref(href: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(href);
}
