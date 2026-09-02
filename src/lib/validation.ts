import { z } from "zod";

/** Shared shape for both the contact form and the quote request. */
export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please give us your name").max(120),
  email: z.string().trim().email("That email address does not look right").max(180),
  phone: z
    .string()
    .trim()
    .min(9, "A contact number helps us reach you quickly")
    .max(30)
    .regex(/^[\d\s()+-]+$/, "Digits, spaces and + only"),
  company: z.string().trim().max(160).optional().default(""),
  propertyType: z.enum(["residential", "commercial", ""]).optional().default(""),
  serviceSlug: z.string().trim().max(120).optional().default(""),
  assetDetails: z.string().trim().max(400).optional().default(""),
  panelCount: z
    .union([z.coerce.number().int().min(0).max(100000), z.literal("")])
    .optional()
    .transform((v) => (v === "" || v === undefined ? null : Number(v))),
  message: z.string().trim().min(10, "Tell us a little about the job").max(4000),
  consent: z
    .union([z.literal("on"), z.literal("true"), z.boolean()])
    .transform(() => true)
    .optional(),
  source: z.enum(["contact", "quote", "calculator", "phone", "referral"]).default("contact"),
  pageUrl: z.string().trim().max(400).optional().default(""),
  /** Honeypot — real people leave it empty. */
  website: z.string().max(0).optional().default(""),
});

export type LeadInput = z.infer<typeof leadSchema>;

export interface FormState {
  status: "idle" | "success" | "error";
  message: string;
  reference?: string;
  fieldErrors?: Record<string, string>;
}

export const IDLE_STATE: FormState = { status: "idle", message: "" };
