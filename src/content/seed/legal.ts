import type { LegalSettings } from "@/content/types";

export const legal: LegalSettings = {
  privacy: {
    title: "Privacy policy",
    updated: "2026-08-01",
    intro:
      "We collect very little, we use it for exactly one thing, and we do not sell it. This page says so in more words because the law requires it, but that is the whole policy.",
    sections: [
      {
        id: "pv1",
        heading: "What we collect",
        body: [
          "When you submit an enquiry we collect your name, email address, telephone number and whatever you type into the message field. If you tell us about a vehicle, an aircraft or a panel count, we keep that too, because it is what the quote is built from.",
          "We also record which page an enquiry came from and how many people visited each page. That analytics data is aggregated and is not tied to you personally.",
        ],
      },
      {
        id: "pv2",
        heading: "Why we hold it",
        body: [
          "To prepare and send your quote, to arrange the work, and to find your job again if you come back to us in a year's time asking what we applied and when. That is the entire purpose.",
          "We do not add you to a mailing list unless you explicitly ask to be added.",
        ],
      },
      {
        id: "pv3",
        heading: "Who else sees it",
        body: [
          "Nobody. We do not sell, rent or share customer details with third parties. Our website and database are hosted by infrastructure providers who process data on our instruction and have no independent right to use it.",
          "The exception is a lawful request from a competent authority, which we would comply with as we are required to.",
        ],
      },
      {
        id: "pv4",
        heading: "How long we keep it",
        body: [
          "Enquiries that do not become jobs are deleted after two years. Records of completed work are kept for as long as any warranty on that work remains live, plus the period we are required to retain financial records.",
        ],
      },
      {
        id: "pv5",
        heading: "Your rights under POPIA",
        body: [
          "You may ask us what we hold about you, ask us to correct it, or ask us to delete it. Email us and we will action it within a reasonable period — in practice, the same week.",
          "If you are unhappy with how we have handled your information you may complain to the Information Regulator of South Africa.",
        ],
      },
      {
        id: "pv6",
        heading: "Cookies",
        body: [
          "This site sets no advertising or tracking cookies. It stores one flag in your browser so the loading screen does not play again in the same session, and nothing else.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms of service",
    updated: "2026-08-01",
    intro:
      "The commercial terms that apply to work we do. Nothing here is unusual — it is written out so that neither of us has to rely on memory later.",
    sections: [
      {
        id: "tm1",
        heading: "Quotes",
        body: [
          "Quotes are issued in writing and are itemised. They hold for 30 days. The quoted figure is the invoiced figure unless the scope changes, and any scope change is agreed in writing before we act on it.",
          "Prices published on this website — including the per-panel solar coating rate — apply to standard work at accessible height. Difficult access, pre-existing damage requiring treatment, and non-standard installations are quoted separately after a site visit.",
        ],
      },
      {
        id: "tm2",
        heading: "Bookings and cancellation",
        body: [
          "We do not take a deposit on standard work under R15 000. Larger commercial, fleet and aviation work proceeds on a signed quote with agreed payment terms.",
          "If you need to move a booking, tell us as far ahead as you can and there is no charge. If we move a booking because of weather — which we will do rather than apply a coating into rain — there is likewise no charge.",
        ],
      },
      {
        id: "tm3",
        heading: "Condition and pre-existing damage",
        body: [
          "We photograph and record existing damage before starting. Detailing frequently reveals defects that were previously hidden by dirt or filled by a prior polish; revealing a defect is not the same as causing it, and we will show you what we found.",
          "Some paint is too thin to correct safely and some surfaces are past recovery. Where that is the case we will say so, and quote for what is appropriate instead.",
        ],
      },
      {
        id: "tm4",
        heading: "Warranty",
        body: [
          "Coatings carry a written warranty issued on the day, in your name, with its terms stated. Warranty cover requires the maintenance schedule to be followed and the annual inspection to be attended.",
          "Damage from automated brush washing, abrasive cleaning, aggressive chemistry or impact is not a coating failure and is not covered. Genuine coating failure inside the warranty period is remedied at no charge.",
        ],
      },
      {
        id: "tm5",
        heading: "Liability",
        body: [
          "We carry public liability cover and a certificate is available on request. Our liability for any claim is limited to the value of the work performed.",
          "Aircraft work is cosmetic only. We do not perform any task requiring an approved maintenance release, and scope is agreed with the owner or maintenance organisation before the date.",
        ],
      },
      {
        id: "tm6",
        heading: "Payment",
        body: [
          "Payment is due on completion by EFT or card unless other terms have been agreed in writing. Fleet accounts are invoiced monthly with per-vehicle line items.",
        ],
      },
    ],
  },
};
