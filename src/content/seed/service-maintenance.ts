import type { ServiceDoc } from "@/content/types";

export const maintenanceService: ServiceDoc = {
  id: "svc-maintenance",
  slug: "maintenance-plans",
  category: "automotive",
  status: "published",
  order: 5,
  name: "Maintenance Plans",
  shortName: "Maintenance",
  cardSummary:
    "Scheduled safe washing, protection top-ups and an annual coating inspection. The reason some cars still look corrected four years later and most do not.",
  motif: "microfibre",
  featuredOnHome: true,

  eyebrow: "Scheduled · Safe wash · Protection kept live",
  headline: "Correction is an event. A finish is a habit.",
  lede:
    "We can hand back a flawless car on a Friday. What happens on the following two hundred Saturdays decides whether it is still flawless in three years. Almost every defect we remove was put there by a wash, so the most valuable thing we sell is not the correction — it is the discipline that protects it afterwards, on a schedule, with the right media, by people who are not in a hurry.",
  heroMedia: {
    src: "/work/poster/glass-rinse.webp",
    videoSrc: "/video/glass-rinse.mp4",
    alt: "Water sheeting cleanly off the coated roof and glass of a car during a maintenance wash",
    ratio: 16 / 9,
    motif: "microfibre",
  },
  heroStats: [
    { id: "mh1", value: 6, suffix: "wks", label: "Standard interval", detail: "Stretched to eight or twelve for garaged and low-mileage cars" },
    { id: "mh2", value: 90, suffix: "min", label: "Typical maintenance visit", detail: "On a coated car in normal condition" },
    { id: "mh3", value: 1, suffix: "/yr", label: "Coating inspection", detail: "Included, and what keeps a written warranty live" },
  ],
  actions: [
    { label: "Start a maintenance plan", href: "/quote", intent: "primary" },
    { label: "Ask about intervals", href: "/contact", intent: "secondary" },
  ],

  sections: [
    {
      id: "mp-why",
      eyebrow: "The uncomfortable arithmetic",
      title: "The wash is what damages the car",
      body:
        "Not the road, not the weather, not the sun — the wash. Every swirl mark on every dark car in every car park was installed by something dragged across the paint: a forecourt brush that has already been through forty vehicles, a sponge that picked up grit on the sill, a chamois used on a panel that was not quite clean. Driving puts dust on a car. Washing it badly puts scratches in it. That is why a maintenance plan is not a luxury service on top of the detail; it is the thing that stops you paying for the detail twice.",
      bullets: [
        "Automatic and brush washes are the single biggest source of swirl marks",
        "A dirty mitt or sponge carries the grit from the last panel to the next",
        "Dry-wiping a dusty car is the fastest way to marr fresh paint",
        "Bird lime and sap etch coated paint too — they just take longer",
      ],
      motif: "gloss-meter",
      media: {
        src: "/work/seven/bonnet-haze.webp",
        alt: "Raking sunlight across a black bonnet showing the haze and swirl marks left by years of automated washing",
        ratio: 16 / 9,
        motif: "gloss-meter",
        caption: "Nine minutes at a forecourt, several years of damage",
      },
    },
    {
      id: "mp-what",
      eyebrow: "What a visit involves",
      title: "A maintenance detail is not a car wash with a better name",
      body:
        "It is the front half of a full detail, done properly, on a surface that is already in good condition. Citrus pre-soak to soften road film, thick foam left to dwell so grit lifts before anything touches the paint, then a contact wash with two buckets, grit guards and a fresh mitt per section — top down, never in circles. Wheels, arches and tips have their own tools that never go near the bodywork. A deionised final rinse means the car dries without mineral spotting, and it is dried with filtered air and a plush towel rather than wiped.",
      bullets: [
        "Citrus pre-soak and a dwelling foam layer before any contact",
        "Two-bucket contact wash, grit guards, fresh media per section",
        "Separate tools for wheels, barrels, arches and exhaust tips",
        "Deionised final rinse — no mineral spotting as it dries",
        "Force-dried with filtered air, then a plush towel and a drying aid",
      ],
      motif: "foam-cannon",
      media: {
        src: "/work/panamera/crest-foam.webp",
        alt: "Snow foam dwelling and running off the bonnet of a black Porsche during a maintenance wash",
        ratio: 16 / 9,
        motif: "foam-cannon",
        caption: "Foam dwelling before anything touches the paint",
      },
    },
    {
      id: "mp-topup",
      eyebrow: "Protection",
      title: "Topping up what the last twelve weeks took off",
      body:
        "Protection is consumable. Detergents, ultraviolet light, road salt and heat all deplete it, and a coating that beaded tightly in March will bead lazily by spring if nothing is done. Every visit ends with a ceramic booster or sealant top-up on paint and glass — a maintenance layer that sits on the coating, restores the contact angle and takes the wear that would otherwise reach the coating itself. Wheel faces, trim and glass get their own treatment on the same cycle. It takes twenty minutes and it is the difference between a five-year coating lasting five years and lasting three.",
      bullets: [
        "Ceramic booster or sealant top-up on paint at every visit",
        "Glass re-treated so wipers stay quiet and rain clears at speed",
        "Wheel faces re-coated so brake dust keeps releasing under a rinse",
        "Exterior trim and rubber fed so it does not chalk or go grey",
      ],
      motif: "shield",
      media: {
        src: "/work/glc43/wheel.webp",
        alt: "A cleaned and re-coated AMG alloy wheel, brake dust fully released from the face",
        ratio: 9 / 16,
        motif: "shield",
        caption: "Wheel faces re-coated at every visit",
      },
    },
    {
      id: "mp-interval",
      eyebrow: "Choosing an interval",
      title: "How often depends on where the car sleeps",
      body:
        "There is no universal answer, and anyone who gives you one is selling a subscription rather than a service. What matters is exposure: a car parked outside under trees in Witbank picks up sap, dust and bird lime at a rate a garaged weekend car simply does not. We set the interval from how and where you actually use the vehicle, review it after the first two visits, and stretch it if the car is holding up better than expected. Nobody should be paying for a wash their car did not need.",
      bullets: [
        "Six-weekly — daily drivers parked outside, high mileage, or under trees",
        "Eight-weekly — garaged cars on normal mileage, the most common choice",
        "Twelve-weekly — low-mileage, weekend and covered collection cars",
        "Reviewed after two visits and adjusted to what the car is actually doing",
      ],
      motif: "sedan",
    },
    {
      id: "mp-inspect",
      eyebrow: "The annual",
      title: "One visit a year is an inspection, not a wash",
      body:
        "Once a year the car comes in for longer. We take gloss readings and compare them against the figures on your original job card, check the contact angle against where it was at handover, and go over the paint under raking and cross-polarised light for anything that has crept in. Isolated defects get spot-corrected and re-coated while they are still isolated. On a warranted coating this inspection is what keeps the warranty live — and it is included in the plan rather than charged as an extra when you need it.",
      bullets: [
        "Gloss and contact angle measured against your original handover figures",
        "Full paint inspection under raking and cross-polarised light",
        "Isolated defects spot-corrected and re-coated before they spread",
        "Written record added to your file — and the coating warranty stays live",
      ],
      motif: "gloss-meter",
      media: {
        src: "/work/seven/bootlid-mirror.webp",
        alt: "A corrected and coated black bootlid returning a sharp, unbroken reflection during an annual inspection",
        ratio: 16 / 9,
        motif: "gloss-meter",
        caption: "Measured against the handover figures",
      },
    },
    {
      id: "mp-diy",
      eyebrow: "Between visits",
      title: "We would rather you washed it properly than washed it often",
      body:
        "Plenty of owners enjoy washing their own car, and we are not going to pretend that is a problem — done correctly it is genuinely good for the finish. What we will not do is leave you to guess. Every plan starts with a handover kit and a method: pH-neutral shampoo that will not strip the coating, two buckets with grit guards, a fresh mitt, a drying towel and a drying aid. Send us a photo any time something looks wrong and we will tell you what it is, whether it needs us, and whether it can wait until the next visit.",
      bullets: [
        "Handover kit — pH-neutral shampoo, mitt, drying towel and drying aid",
        "Written wash method, and a standing invitation to send us a photo",
        "Bird lime and fuel spills: we will tell you what to do in the moment",
        "Never a coin-op brush, never an automatic wash, never a dry wipe",
      ],
      motif: "microfibre",
    },
    {
      id: "mp-value",
      eyebrow: "What it is worth",
      title: "Cheaper than the correction you are avoiding",
      body:
        "A maintenance visit is priced well below a full detail because we are preserving a finish rather than rescuing one — there is no decontamination backlog, no correction, and no surprises. Run the numbers over three years and a plan costs meaningfully less than one full correction detail, which is roughly what an unmaintained car will need in that time. It also keeps the vehicle permanently in the condition a buyer values, rather than in the condition it happens to be in on the week you decide to sell.",
      bullets: [
        "Priced below a full detail — no correction backlog to work through",
        "Three years of maintenance typically costs less than one recovery detail",
        "The car is always in sale condition, not just after a panic booking",
        "One monthly invoice on multi-vehicle households and small fleets",
      ],
      motif: "sparkle",
      media: {
        src: "/work/three/outdoor-front.webp",
        alt: "A coated blue BMW photographed outdoors, held in sale condition on a maintenance plan",
        ratio: 16 / 9,
        motif: "sedan",
        caption: "Permanently in the condition a buyer values",
      },
    },
  ],

  benefits: [
    { id: "mb1", title: "Your correction survives", body: "Safe washing on a schedule is the only thing that keeps a corrected finish corrected. Everything else is decoration.", motif: "polisher", metric: "Years, not months" },
    { id: "mb2", title: "Protection stays at full strength", body: "A booster at every visit restores the contact angle instead of letting the coating slowly wear down to nothing.", motif: "droplet", metric: "Every visit" },
    { id: "mb3", title: "Warranty kept live", body: "The annual inspection is what a written coating warranty requires — and it is included, not billed when you need it.", motif: "shield", metric: "Included" },
    { id: "mb4", title: "Problems caught small", body: "An isolated etch spot-corrected in April is twenty minutes. Found in November it is a panel.", motif: "gloss-meter", metric: "Spot-corrected" },
    { id: "mb5", title: "Never a panic booking", body: "The car is in sale or show condition on any given weekend, because it never left it.", motif: "sedan", metric: "Always ready" },
    { id: "mb6", title: "One invoice, no thinking", body: "Scheduled, reminded and invoiced monthly. Multi-car households and small fleets on a single account.", motif: "fleet", metric: "Monthly" },
  ],

  packages: [
    {
      id: "mpk1",
      name: "Essential",
      summary: "Safe washing on a schedule, for a car that is protected and in good order.",
      priceFrom: null,
      priceNote: "Monthly, by vehicle size and interval",
      duration: "60–90 min per visit",
      includes: [
        "Pre-soak, foam dwell and two-bucket contact wash",
        "Wheels, arches and exhaust tips with dedicated tools",
        "Deionised rinse and forced-air dry",
        "Sealant top-up on paint and glass",
        "Interior vacuum, wipe-down and glass",
      ],
      featured: false,
    },
    {
      id: "mpk2",
      name: "Protected",
      summary: "The full cycle for a corrected and ceramic-coated car. Our standard plan.",
      priceFrom: null,
      priceNote: "Monthly, by vehicle size and interval",
      duration: "2–3 hours per visit",
      includes: [
        "Everything in Essential",
        "Ceramic booster on paint, glass and wheel faces at every visit",
        "Light chemical decontamination each quarter",
        "Interior service — extraction touch-up, leather and UV protectant",
        "Annual inspection with gloss and contact-angle readings",
        "Coating warranty kept live, spot correction included",
      ],
      featured: true,
    },
    {
      id: "mpk3",
      name: "Collection",
      summary: "Multiple vehicles, or cars that sit between outings and need watching rather than washing.",
      priceFrom: null,
      priceNote: "Quoted by fleet size and storage conditions",
      duration: "Scheduled around you",
      includes: [
        "Everything in Protected, per vehicle",
        "Dust-off visits between full services on stored cars",
        "Covers checked, tyres and trim conditioned, batteries reported",
        "Pre-event preparation to a booked date",
        "One monthly invoice across every vehicle on the account",
      ],
      featured: false,
    },
  ],

  steps: [
    { id: "ms1", index: 1, title: "Baseline", body: "Your first visit records where the car actually is — gloss, contact angle, defect map — so every visit afterwards has something to be measured against.", duration: "30 min", motif: "gloss-meter", detail: ["Gloss readings at 60° recorded panel by panel", "Contact angle checked on paint and glass", "Interval proposed from how and where the car lives"] },
    { id: "ms2", index: 2, title: "Scheduled visit", body: "Pre-soak, foam, safe contact wash, deionised rinse and a forced-air dry, with wheels and arches on their own tools.", duration: "60–90 min", motif: "foam-cannon", detail: ["No brush, no sponge, no automatic wash, ever", "Fresh media per section, top down", "Dried with filtered air and a plush towel, never wiped dry"] },
    { id: "ms3", index: 3, title: "Top up", body: "A ceramic booster or sealant on paint and glass, wheels re-coated, trim and rubber fed.", duration: "20–40 min", motif: "shield", detail: ["Contact angle restored on paint and glass", "Wheel faces re-coated so brake dust keeps releasing", "Exterior trim fed so it does not chalk"] },
    { id: "ms4", index: 4, title: "Interior service", body: "Vacuum, hard surfaces, leather and glass — the cabin held at the standard it was handed back at.", duration: "30–60 min", motif: "interior", detail: ["Extraction touch-up where needed rather than on schedule", "Leather cleaned and conditioned, UV protectant on trim", "Interior glass done last, two-towel method"] },
    { id: "ms5", index: 5, title: "Report", body: "Anything found — a fresh chip, a lifting trim edge, an etch starting — is photographed and sent to you the same day.", duration: "10 min", motif: "microfibre", detail: ["Photographed and reported, not quietly noted", "Told what needs doing now and what can wait", "No work carried out beyond the plan without your say-so"] },
    { id: "ms6", index: 6, title: "Annual inspection", body: "Once a year the visit is longer: full measurement against your handover figures, spot correction, and the warranty signed off.", duration: "3–5 hours", motif: "sparkle", detail: ["Measured against the original job card", "Isolated defects corrected and re-coated", "Written record filed and the coating warranty kept live"] },
  ],

  lifespan: [
    { id: "ml1", label: "Ceramic booster top-up", value: "6–10 weeks", note: "Which is exactly why the standard interval is what it is" },
    { id: "ml2", label: "Sealant top-up", value: "4–6 months", note: "On uncoated cars kept on the Essential plan" },
    { id: "ml3", label: "Coating under a plan", value: "Full rated life", note: "Five-year systems reaching five years rather than three" },
    { id: "ml4", label: "Coating without a plan", value: "50–70% of rated life", note: "The most common reason a coating is judged to have failed" },
  ],

  maintenance: {
    title: "What we ask of you",
    body:
      "Very little, and all of it is in the handover kit. A plan works because the damaging washes stop, not because the good ones start — so the only genuine requirement is that nothing abrasive touches the car between visits.",
    items: [
      "No automatic washes, no forecourt brushes, no coin-op lances with a brush attached",
      "If you wash at home, use the kit and the method we handed over",
      "Never dry-wipe dust off a panel — rinse it or leave it for us",
      "Get bird lime and fuel spills off quickly; message us if you are unsure",
      "Tell us when the car's use changes, so we can move the interval with it",
      "Send photographs of anything that looks wrong — that is what we are for",
    ],
  },

  faqIds: ["faq-maint-1", "faq-maint-2", "faq-maint-3", "faq-maint-4", "faq-maint-5"],

  seo: {
    title: "Maintenance Plans",
    description:
      "Scheduled detailing maintenance in Witbank, Mpumalanga. Safe contact washing, ceramic booster top-ups, interior servicing and an annual coating inspection that keeps your warranty live.",
    keywords: [
      "car maintenance plan Witbank",
      "detailing maintenance Mpumalanga",
      "ceramic coating maintenance",
      "safe car wash service",
      "coating warranty inspection",
    ],
    ogImageText: "A finish is a habit",
  },
};
