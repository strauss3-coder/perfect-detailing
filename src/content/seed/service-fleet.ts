import type { ServiceDoc } from "@/content/types";

export const fleetService: ServiceDoc = {
  id: "svc-fleet",
  slug: "fleet-services",
  category: "fleet",
  status: "published",
  order: 7,
  name: "Fleet & Commercial Vehicle Detailing",
  shortName: "Fleet",
  cardSummary:
    "Scheduled cycles for vehicles that earn their keep — livery kept legible, downtime kept to zero, invoicing kept simple.",
  motif: "fleet",
  featuredOnHome: true,

  eyebrow: "Fleet · Commercial · Dealer",
  headline: "Your vehicles are advertising. Faded advertising is worse than none.",
  lede:
    "A branded vehicle is seen thousands of times a week. When the livery has gone chalky, the roof has oxidised and the front is stippled with insect strike, the message people receive is about how the business is run — not about what it sells. Fleet work is about protecting that impression on a schedule, without taking vehicles off the road to do it.",
  heroMedia: {
    src: "",
    alt: "Row of branded commercial vans being worked on in a depot yard at dawn",
    ratio: 16 / 9,
    motif: "fleet",
  },
  heroStats: [
    { id: "flh1", value: 0, suffix: "hrs", label: "Downtime", detail: "We work overnight and on weekends, in your yard" },
    { id: "flh2", value: 45, suffix: "min", label: "Typical per vehicle", detail: "On a maintenance cycle, panel van size" },
    { id: "flh3", value: 1, label: "Monthly invoice", detail: "One consolidated account, per-vehicle line items" },
  ],
  actions: [
    { label: "Request a fleet proposal", href: "/quote", intent: "primary" },
    { label: "Arrange a site visit", href: "/contact", intent: "secondary" },
  ],

  sections: [
    {
      id: "fl-cycle",
      eyebrow: "How it works",
      title: "A cycle, not a series of emergencies",
      body:
        "We survey your yard, agree a cycle length per vehicle class and then simply arrive. Vehicles are worked in a fixed rotation so every unit is treated on a known date, and the ones that come back filthiest get the shortest cycle. You approve the schedule once; after that it runs without anybody in your operation having to think about it.",
      bullets: [
        "Site survey to agree access, water, power and working window",
        "Cycle length set per vehicle class, not one rule for the whole fleet",
        "Fixed rotation so every vehicle has a known service date",
        "Schedule changes handled by exception, not by weekly phone calls",
      ],
      motif: "fleet",
    },
    {
      id: "fl-livery",
      eyebrow: "Livery & wraps",
      title: "Vinyl fails differently to paint",
      body:
        "Printed wraps and cut vinyl are far more vulnerable than the paint underneath them. Ultraviolet fades the inks, aggressive detergents attack the laminate, high-pressure water lifts edges, and abrasive washing hazes the surface until the colours look tired. We wash wrapped vehicles with pH-neutral chemistry at controlled pressure, keep lances away from edges and seams, and coat the laminate so it holds its colour and releases road film.",
      bullets: [
        "pH-neutral chemistry only — alkaline degreasers destroy laminate",
        "Controlled pressure, never directed at a wrap edge or seam",
        "Ceramic on the laminate to slow ultraviolet fade and ease washing",
        "Lifting edges and failures reported to you in writing with photographs",
      ],
      motif: "shield",
    },
    {
      id: "fl-downtime",
      eyebrow: "Downtime",
      title: "We work when your vehicles do not",
      body:
        "Fleet vehicles do not generate anything while they are being cleaned, so we do not take them out of service. Our units are self-contained — water, power, lighting and containment — which means we work overnight, over weekends or in the gap between the last return and the first departure. In nine years of fleet work we have not yet needed a vehicle during its operating hours.",
      bullets: [
        "Self-contained units — no demand on your water or power",
        "Overnight, early morning and weekend working windows",
        "Bunded containment where run-off is a site condition",
        "Vehicles returned to their bays, keys handled to your protocol",
      ],
      motif: "foam-cannon",
    },
    {
      id: "fl-admin",
      eyebrow: "Reporting & billing",
      title: "One invoice, and a record of every vehicle",
      body:
        "Every visit produces a per-vehicle record: registration, work done, date, and photographs of anything worth flagging — a cracked lamp, a lifting wrap edge, fresh panel damage. That record goes to whoever manages the fleet, and the month goes onto a single consolidated invoice with per-vehicle line items so cost centres can be allocated without anyone re-keying anything.",
      bullets: [
        "Per-vehicle service record with date and work performed",
        "Damage and defects photographed and reported, not quietly washed over",
        "One monthly invoice with per-vehicle line items",
        "Cost-centre or department allocation on request",
      ],
      motif: "gloss-meter",
    },
  ],

  benefits: [
    { id: "flb1", title: "Livery stays legible", body: "Protected laminate holds its colour, so the brand on the vehicle still looks like the brand in the brochure.", motif: "shield", metric: "UV-stable" },
    { id: "flb2", title: "No operational downtime", body: "Overnight and weekend working means vehicles are never off the road for cleaning.", motif: "fleet", metric: "Zero hours" },
    { id: "flb3", title: "Lower cost per clean", body: "Coated vehicles release road film quickly, so each cycle takes less time and less chemistry.", motif: "droplet", metric: "Faster cycles" },
    { id: "flb4", title: "Defects found early", body: "Somebody looks closely at every vehicle every cycle, and tells you what they found.", motif: "gloss-meter", metric: "Reported" },
    { id: "flb5", title: "Better residuals", body: "Vehicles that arrive at disposal with intact paint and clean interiors return meaningfully more.", motif: "sparkle", metric: "Value held" },
    { id: "flb6", title: "Simple administration", body: "One account, one invoice, per-vehicle line items and a service record you can file.", motif: "microfibre", metric: "One invoice" },
  ],

  packages: [
    { id: "flp1", name: "Presentation cycle", summary: "Regular exterior and cab clean to keep vehicles looking run properly.", priceFrom: null, priceNote: "Per vehicle, per cycle", duration: "30–45 min per vehicle", includes: ["Exterior wash with wrap-safe chemistry", "Wheels, arches and steps", "Glass inside and out", "Cab vacuum and wipe-down", "Per-vehicle service record"], featured: false },
    { id: "flp2", name: "Protected fleet", summary: "Ceramic coating at onboarding, then a lighter and cheaper maintenance cycle.", priceFrom: null, priceNote: "Coating once, then per cycle", duration: "Coating day, then 30 min per cycle", includes: ["Full decontamination at onboarding", "Ceramic coating on paint and wrap laminate", "Reduced-cost maintenance cycles thereafter", "Quarterly condition report across the fleet", "Consolidated monthly invoicing"], featured: true },
    { id: "flp3", name: "Dealer & handover", summary: "Pre-delivery preparation and handover coatings applied on your floor.", priceFrom: null, priceNote: "Per unit", duration: "2–4 hours per unit", includes: ["Transport film and adhesive removal", "Full pre-delivery preparation", "Optional handover ceramic coating", "Coating documentation for the customer pack", "Volume rate card"], featured: false },
  ],

  steps: [
    { id: "fls1", index: 1, title: "Site survey", body: "We visit the yard, look at the vehicles, and work out access, water, power, lighting and the working window.", duration: "1 hour", motif: "gloss-meter", detail: ["Vehicle classes and counts recorded", "Access, drainage and run-off conditions assessed", "Working window agreed with your operations team"] },
    { id: "fls2", index: 2, title: "Proposal & cycle", body: "You get a written proposal with cycle length and price per vehicle class, and a rotation calendar for the year.", duration: "2 working days", motif: "shield", detail: ["Price per vehicle class, not a fleet average", "Rotation calendar issued for the year", "Escalation and change process agreed up front"] },
    { id: "fls3", index: 3, title: "Onboarding detail", body: "Every vehicle gets one deeper reset — decontamination and, where specified, coating — so the cycle starts from a known baseline.", duration: "Scheduled in batches", motif: "foam-cannon", detail: ["Full decontamination on first visit", "Coating applied where specified", "Baseline condition photographed per vehicle"] },
    { id: "fls4", index: 4, title: "Scheduled cycles", body: "We arrive on the agreed nights, work the rotation, and leave vehicles back in their bays ready for the morning.", duration: "Ongoing", motif: "fleet", detail: ["Fixed rotation, known dates", "Self-contained units, no site demand", "Vehicles returned to bays before first departure"] },
    { id: "fls5", index: 5, title: "Report & invoice", body: "Per-vehicle records go to your fleet manager, and the month arrives as one invoice with per-vehicle lines.", duration: "Monthly", motif: "microfibre", detail: ["Service record per registration", "Defects photographed and flagged", "Single consolidated invoice"] },
  ],

  lifespan: [
    { id: "fll1", label: "Coating on paint", value: "3 years", note: "Commercial-duty system, washed on cycle" },
    { id: "fll2", label: "Coating on wrap laminate", value: "2 years", note: "Extends wrap life and slows ultraviolet fade" },
    { id: "fll3", label: "Presentation cycle", value: "2–4 weeks", note: "Set per vehicle class and route conditions" },
    { id: "fll4", label: "Condition report", value: "Quarterly", note: "Whole-fleet summary with photographs" },
  ],

  maintenance: {
    title: "Between our visits",
    body:
      "Fleet cycles work best when drivers are not undoing them. We supply simple guidance and, where useful, a short toolbox talk at your depot.",
    items: [
      "Keep vehicles out of automated brush washes — they haze wrap laminate fast",
      "Report fresh damage on the day it happens so we can photograph it at the next visit",
      "Insect strike is easier to remove within a week than after a month in the sun",
      "Tell us when a route or duty cycle changes; the cleaning cycle should change with it",
      "New vehicles should be coated before their first winter, not after",
    ],
  },

  faqIds: ["faq-fleet-1", "faq-fleet-2", "faq-fleet-3"],

  fleet: {
    tiers: [
      { id: "ft1", size: "3–10 vehicles", cadence: "Fortnightly or monthly", note: "Owner-operated businesses and small service fleets" },
      { id: "ft2", size: "11–40 vehicles", cadence: "Weekly or fortnightly rotation", note: "Distribution, trades and regional service fleets" },
      { id: "ft3", size: "41–150 vehicles", cadence: "Continuous rotation", note: "Dedicated crew nights and a named account manager" },
      { id: "ft4", size: "150+ vehicles", cadence: "Multi-site programme", note: "Multiple depots, coordinated schedule, quarterly review" },
    ],
    outcomes: [
      { id: "fo1", title: "Brand consistency", body: "Every vehicle in the fleet looks the same age, which is the entire point of a livery.", motif: "shield" },
      { id: "fo2", title: "Driver pride", body: "Depots consistently report better interior condition once vehicles are cleaned on a visible schedule.", motif: "interior" },
      { id: "fo3", title: "Predictable spend", body: "A fixed cycle price replaces the ad-hoc cleaning spend nobody was tracking.", motif: "gloss-meter" },
      { id: "fo4", title: "Stronger disposals", body: "Vehicles reaching end of life with sound paint and clean cabs return more at auction.", motif: "sparkle" },
    ],
  },

  seo: {
    title: "Fleet & Commercial Vehicle Detailing",
    description:
      "Scheduled fleet detailing across Gauteng. Wrap-safe cleaning, ceramic coating for livery, overnight working with zero downtime and one consolidated monthly invoice.",
    keywords: ["fleet detailing South Africa", "commercial vehicle cleaning", "vehicle wrap care", "fleet washing Gauteng"],
    ogImageText: "Zero downtime. One invoice.",
  },
};
