"use server";

import { headers } from "next/headers";
import { createLead, recordEvent } from "@/lib/content/store";
import { leadSchema, type FormState } from "@/lib/validation";

/**
 * Single entry point for every enquiry on the site.
 *
 * Validation happens on the server regardless of what the client did, the
 * honeypot is checked here rather than in the browser, and a submission that
 * fails is returned with per-field messages so the form can point at the
 * offending input rather than showing a generic failure.
 */
export async function submitLead(_prev: FormState, formData: FormData): Promise<FormState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = leadSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const data = parsed.data;

  // Honeypot: a bot fills every field it finds, including the hidden one.
  if (data.website) {
    return { status: "success", message: "Thank you.", reference: "—" };
  }

  const referrer = (await headers()).get("referer") ?? "";

  try {
    const lead = await createLead({
      source: data.source,
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company ?? "",
      propertyType: data.propertyType ?? "",
      serviceSlug: data.serviceSlug ?? "",
      assetDetails: data.assetDetails ?? "",
      panelCount: data.panelCount,
      estimatedValue: null,
      message: data.message,
      consent: true,
      pageUrl: data.pageUrl || referrer,
    });

    await recordEvent({
      kind: "lead",
      path: data.pageUrl || referrer,
      referrer,
      meta: { source: data.source, service: data.serviceSlug ?? "", reference: lead.reference },
    });

    return {
      status: "success",
      message: "Received.",
      reference: lead.reference,
    };
  } catch {
    return {
      status: "error",
      message:
        "Something went wrong saving your enquiry. Please call or WhatsApp us instead — we would rather hear from you than lose the message.",
    };
  }
}
