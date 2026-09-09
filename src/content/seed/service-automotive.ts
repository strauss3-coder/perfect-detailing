import type { ServiceDoc } from "@/content/types";

export const automotiveService: ServiceDoc = {
  id: "svc-auto",
  slug: "automotive-detailing",
  category: "automotive",
  status: "published",
  order: 1,
  name: "Automotive Detailing",
  shortName: "Automotive",
  cardSummary:
    "Decontamination, machine correction, interior deep cleaning, engine bays and headlights — the full discipline, done in the right order.",
  motif: "sedan",
  featuredOnHome: true,

  eyebrow: "Exterior · Interior · Correction · Protection",
  headline: "Detailing is a sequence. Skip a step and it shows.",
  lede:
    "A car is a set of very different materials pretending to be one object: clear coat, glass, chrome, anodised trim, textured plastic, leather, alcantara, carpet and painted metal under the bonnet. Each wants a different chemistry and a different order of operations. We work through them in sequence, because the shortcuts are always visible six months later.",
  heroMedia: {
    src: "/work/i8/doors-open.webp",
    alt: "A BMW i8 with both doors raised after a full detail, photographed head-on",
    ratio: 16 / 9,
    motif: "coupe",
  },
  heroStats: [
    { id: "ah1", value: 3, suffix: "stage", label: "Maximum correction", detail: "Cut, refine and finish, guided by depth readings" },
    { id: "ah2", value: 94, suffix: "GU", label: "Typical finished gloss", detail: "Measured at 60° on corrected black paint" },
    { id: "ah3", value: 18, suffix: "hrs", label: "Average full detail", detail: "Spread across two days for a mid-size car" },
  ],
  actions: [
    { label: "Book a detail", href: "/quote", intent: "primary" },
    { label: "See the results", href: "/gallery", intent: "secondary" },
  ],

  sections: [
    {
      id: "au-ext",
      eyebrow: "Exterior detailing",
      title: "Everything that happens before a polisher is switched on",
      body:
        "Most of the risk in detailing lives in the wash. Grit dragged across paint by a dirty mitt puts in more defects than a week of driving. We pre-soak to soften road film, foam and dwell, then wash with two buckets and fresh media, working panel by panel from the top down. Wheels, arches and exhaust tips are handled separately with their own tools so brake dust never reaches the paintwork.",
      bullets: [
        "Premium snow foam pre-soak and dwell before anything touches the paint",
        "Two-bucket contact wash with grit guards and fresh media per panel",
        "Wheels, barrels, arches and tips cleaned with dedicated tools",
        "Deionised final rinse so the car dries without mineral spotting",
      ],
      motif: "foam-cannon",
      media: {
        src: "/work/panamera/crest-foam.webp",
        alt: "Snow foam breaking and running off the bonnet of a black Porsche around the crest",
        ratio: 16 / 9,
        motif: "foam-cannon",
        caption: "Snow foam pre-soak",
      },
    },
    {
      id: "au-decon",
      eyebrow: "Paint decontamination",
      title: "Washing removes dirt. Decontamination removes what has bonded.",
      body:
        "Run your hand over washed paint through a plastic bag and you will feel it — the roughness is embedded iron from brake and rail dust, tar, overspray and industrial fallout. None of that comes off with shampoo. We dissolve the ferrous particles chemically, soften tar with a solvent, then shear off whatever remains with a lubricated clay treatment until the surface is genuinely smooth.",
      bullets: [
        "Iron remover dissolves embedded ferrous particles chemically",
        "Tar and adhesive residue softened and lifted with solvent",
        "Clay treatment on fully lubricated paint to shear off bonded contamination",
        "Surface checked by touch and under raking light before correction",
      ],
      motif: "droplet",
      media: {
        src: "/work/panamera/decontamination.webp",
        alt: "A gloved hand drawing a clay bar across a lubricated black panel to shear off bonded contamination",
        ratio: 16 / 9,
        motif: "droplet",
        caption: "Clay treatment on lubricated paint",
      },
    },
    {
      id: "au-correct",
      eyebrow: "Machine polishing & paint correction",
      title: "Removing defects, not hiding them",
      body:
        "Swirl marks, holograms, etching and oxidation are all missing clear coat — light scattering out of thousands of tiny valleys instead of reflecting cleanly. Correction levels the surface around them with abrasives on a machine polisher. It is a subtractive process on a finite layer, so we measure clear coat depth before we start, work a test section to find the least aggressive combination that works, and stop where it is safe to stop.",
      bullets: [
        "Paint depth gauged panel by panel; thin areas and repairs flagged",
        "Test section establishes the least aggressive pad and compound that works",
        "Cut stage removes defects; refine stage removes the cut's own haze",
        "Verified under raking, cross-polarised and daylight-balanced light",
      ],
      motif: "polisher",
      media: {
        src: "/work/poster/paint-correction.webp",
        videoSrc: "/video/paint-correction.mp4",
        alt: "A technician machine-polishing the bonnet of a black Mercedes-AMG with a rotary",
        ratio: 16 / 9,
        motif: "polisher",
        caption: "Cut stage, rotary and wool pad",
      },
    },
    {
      id: "au-int",
      eyebrow: "Interior deep cleaning",
      title: "The part you actually sit in",
      body:
        "Interiors are cleaned from the top down and dry to wet. Vents, headliner and pillars first, then trim and console, then seats and finally carpets, so nothing settles onto surfaces already finished. Fabric and carpet are hot-water extracted. Leather is cleaned with a pH-appropriate product and a soft brush to lift soiling out of the grain, then conditioned — never dressed with something that leaves a shine.",
      bullets: [
        "Compressed air and soft brushes through vents, seams and switchgear",
        "Hot-water extraction on fabric seats, carpets and mats",
        "Upholstery extraction and leather conditioning as standard, not an extra",
        "Leather cleaned in the grain, then conditioned — matte, never greasy",
        "Glass finished last, inside and out, with a streak-free two-towel method",
      ],
      motif: "interior",
      media: {
        src: "/work/sl65/cabin-red.webp",
        alt: "The red quilted leather cabin of a Mercedes-AMG SL 65 after cleaning and conditioning",
        ratio: 16 / 9,
        motif: "interior",
        caption: "Leather cleaned in the grain, then conditioned",
      },
    },
    {
      id: "au-engine",
      eyebrow: "Engine bay detailing",
      title: "Careful, dry-biased, and worth doing",
      body:
        "An engine bay is cleaned with control, not a hose. Sensitive electronics, the alternator, air intake and any exposed connectors are covered before a degreaser goes anywhere near them. We work with low-moisture methods and detail brushes, rinse minimally, force-dry with air, then dress plastics and hoses with a satin finish. A clean bay is easier to inspect, easier to sell, and shows a leak the day it starts rather than a year later.",
      bullets: [
        "Electronics, intake and alternator covered before any product is applied",
        "Low-moisture degreasing with detail brushes rather than flooding",
        "Force-dried with filtered air, including into connector recesses",
        "Satin dressing on plastics and hoses — no wet-look gloss",
      ],
      motif: "engine-bay",
      media: {
        src: "/work/sl65/engine-bay.webp",
        alt: "The twin-turbo V12 engine bay of a Mercedes-AMG SL 65 after a dry-biased clean and satin dressing",
        ratio: 16 / 9,
        motif: "engine-bay",
        caption: "Bay cleaned dry-biased, dressed matte",
      },
    },
    {
      id: "au-wheels",
      eyebrow: "Wheels, calipers & exhaust tips",
      title: "The details that decide how a car reads at ten paces",
      body:
        "Wheel faces, barrels, brake calipers and exhaust tips take more chemical and thermal punishment than any painted panel on the car, and they are the first thing that makes an otherwise clean vehicle look tired. We restore them properly — decontaminated, corrected where the finish allows, then coated so brake dust stops bonding and the tips stop bluing back to brown within a fortnight.",
      bullets: [
        "Wheel faces and barrels decontaminated and coated, not just wiped",
        "Brake calipers cleaned and, where appropriate, refinished",
        "Exhaust tips polished back and sealed against re-staining",
        "Coated surfaces release brake dust with a rinse rather than a scrub",
      ],
      motif: "sparkle",
      media: {
        src: "/work/sl65/wheel-caliper.webp",
        alt: "A cleaned AMG wheel face with the red brake caliper visible behind the spokes",
        ratio: 9 / 16,
        motif: "shield",
        caption: "Faces, barrels and calipers",
      },
    },
    {
      id: "au-lights",
      eyebrow: "Headlight restoration",
      title: "Yellowed lenses are a safety issue, not a cosmetic one",
      body:
        "Polycarbonate headlight lenses leave the factory with a hard UV coating. Once that coating fails the plastic underneath oxidises, goes yellow and scatters light — measurably reducing your beam pattern at exactly the moment you need it. We sand the failed layer back through progressive grits, machine polish the lens to optical clarity, then apply a fresh UV-stable coating so it does not simply yellow again in eighteen months.",
      bullets: [
        "Failed factory UV layer sanded back through progressive grits",
        "Machine polished to optical clarity, not just visual improvement",
        "Fresh UV-stable coating applied — the step most shops skip",
        "Beam clarity restored, which is the point of the exercise",
      ],
      motif: "headlight",
      media: {
        src: "/work/gladiator/lamp-detail.webp",
        alt: "Close view of a cleaned headlamp unit and arch liner on a Jeep Gladiator",
        ratio: 9 / 16,
        motif: "headlight",
        caption: "Lens clarity restored",
      },
    },
    {
      id: "au-protect",
      eyebrow: "Wax, sealant or coating",
      title: "Three ways to protect, honestly compared",
      body:
        "Carnauba wax gives a warm, deep look and lasts about six to eight weeks — lovely on a show car, impractical on a daily driver. A synthetic sealant is harder and more chemically stable, holding four to six months. A ceramic coating bonds to the paint and holds for years. There is no universally right answer: it depends on whether you enjoy waxing on a Saturday or would rather never think about it again.",
      bullets: [
        "Carnauba wax — 6–8 weeks, warmest appearance, needs re-application",
        "Synthetic sealant — 4–6 months, harder and more chemically resistant",
        "Ceramic coating — 2–7 years, bonded, best long-term value",
        "We will tell you when the cheaper option is the right one for your car",
      ],
      motif: "shield",
      media: {
        src: "/work/poster/water-sheeting.webp",
        videoSrc: "/video/water-sheeting.mp4",
        alt: "Slow-motion footage of water beading and running straight off a ceramic-coated bonnet",
        ratio: 9 / 16,
        motif: "droplet",
        caption: "Sheeting test on a coated panel",
      },
    },
  ],

  benefits: [
    { id: "ab1", title: "Defects removed, not filled", body: "Correction levels the clear coat rather than masking swirls with oils that wash out in a month.", motif: "polisher", metric: "Permanent" },
    { id: "ab2", title: "Measured, safe correction", body: "Depth gauge readings before and during work mean we never take more clear coat than the panel can spare.", motif: "gloss-meter", metric: "Depth-mapped" },
    { id: "ab3", title: "An interior that smells clean", body: "Extraction removes what sits in the fibres instead of perfuming over it, so the result lasts.", motif: "interior", metric: "Hot extraction" },
    { id: "ab4", title: "Restored light output", body: "Headlight restoration with a fresh UV layer puts your beam pattern back and keeps it there.", motif: "headlight", metric: "Re-coated" },
    { id: "ab5", title: "Better at resale", body: "Corrected paint, a clean bay and a fresh interior are the difference between a fair offer and a good one.", motif: "sparkle", metric: "Value held" },
    { id: "ab6", title: "Easier ownership", body: "Protected paint releases dirt, so every wash after ours is faster and safer than the one before.", motif: "microfibre", metric: "Less contact" },
  ],

  packages: [
    {
      id: "ap1",
      name: "Maintenance Detail",
      summary: "For a car already in good condition, kept that way on a regular cycle.",
      priceFrom: null,
      priceNote: "Quoted by vehicle size",
      duration: "3–4 hours",
      includes: ["Pre-soak, foam and two-bucket contact wash", "Wheels, arches and tips", "Light chemical decontamination", "Interior vacuum, wipe-down and glass", "Sealant top-up on paint"],
      featured: false,
    },
    {
      id: "ap2",
      name: "Full Detail",
      summary: "The complete exterior and interior reset. Our most common booking.",
      priceFrom: null,
      priceNote: "Quoted by vehicle size and condition",
      duration: "1–2 days",
      includes: ["Full decontamination — iron, tar and clay", "Single-stage machine polish", "Interior deep clean with hot-water extraction", "Leather clean and condition", "Engine bay detail", "Six-month sealant on paint and glass"],
      featured: true,
    },
    {
      id: "ap3",
      name: "Correction Detail",
      summary: "Multi-stage paint correction for tired, swirled or previously badly polished paint.",
      priceFrom: null,
      priceNote: "Quoted after paint inspection",
      duration: "2–4 days",
      includes: ["Paint depth mapping across every panel", "Two or three stage correction to a defined finish", "Headlight restoration where required", "Full interior detail", "Choice of sealant or ceramic coating", "Before and after gloss readings"],
      featured: false,
    },
  ],

  steps: [
    { id: "as1", index: 1, title: "Walk-around & agreement", body: "We go over the car together, note existing damage, take depth readings and agree what is achievable before anything is touched.", duration: "30 min", motif: "gloss-meter", detail: ["Existing chips, dents and repairs photographed", "Clear coat depth recorded", "Realistic finish agreed and written down"] },
    { id: "as2", index: 2, title: "Wash & decontaminate", body: "Pre-soak, foam, safe contact wash, then chemical and mechanical decontamination until the paint is genuinely bare.", duration: "2–3 hours", motif: "foam-cannon", detail: ["Wheels and arches first, with separate tools", "Iron and tar removal, rinsed to neutral", "Clay treatment on lubricated paint"] },
    { id: "as3", index: 3, title: "Correct", body: "Machine polishing in stages, checked constantly under multiple light sources against the finish we agreed.", duration: "6–20 hours", motif: "polisher", detail: ["Test section first", "Cut then refine", "Edges and complex curves worked by hand where safer"] },
    { id: "as4", index: 4, title: "Interior", body: "Top-down, dry-to-wet, extraction on fabric and a proper clean rather than a dressing on leather.", duration: "3–6 hours", motif: "interior", detail: ["Air and brushes through vents and seams", "Hot-water extraction on carpets and fabric", "Leather cleaned in the grain and conditioned"] },
    { id: "as5", index: 5, title: "Protect", body: "Panel wipe to bare clear coat, then wax, sealant or coating applied to the surface we just created.", duration: "1–5 hours", motif: "shield", detail: ["Solvent wipe removes all polishing oils", "Protection applied evenly, panel by panel", "Glass, wheels and trim treated to match"] },
    { id: "as6", index: 6, title: "Handover", body: "We walk the car with you in good light, hand over the readings and the aftercare, and answer the questions that matter.", duration: "20 min", motif: "sparkle", detail: ["Before and after gloss readings", "Aftercare pack and wash guidance", "Next service date suggested, never pushed"] },
  ],

  lifespan: [
    { id: "al1", label: "Correction", value: "Permanent", note: "Until new defects are put in by washing — which is why aftercare matters" },
    { id: "al2", label: "Carnauba wax", value: "6–8 weeks", note: "Warmest look, shortest life" },
    { id: "al3", label: "Synthetic sealant", value: "4–6 months", note: "The sensible default on a daily driver" },
    { id: "al4", label: "Interior protection", value: "12 months", note: "Fabric and leather guard, re-applied at service" },
  ],

  maintenance: {
    title: "Maintenance plans",
    body:
      "The cars that still look right three years later are on a cycle. We run scheduled maintenance details at six, eight or twelve-week intervals — priced well below a full detail because we are keeping a finish rather than rescuing one.",
    items: [
      "Six-weekly for daily drivers parked outside",
      "Eight-weekly for garaged cars doing normal mileage",
      "Quarterly for low-mileage and weekend cars",
      "Annual correction top-up on coated vehicles to keep the warranty live",
      "Wash media and a pH-neutral shampoo supplied so home washes do not undo the work",
    ],
  },

  faqIds: ["faq-auto-1", "faq-auto-2", "faq-auto-3", "faq-auto-4", "faq-auto-5"],

  seo: {
    title: "Automotive Detailing",
    description:
      "Premium vehicle detailing in Witbank, Mpumalanga — paint decontamination, machine polishing and correction, interior deep cleaning, engine bays, wheels and headlight restoration. Carried out on site or at our workshop.",
    keywords: ["car detailing Witbank", "vehicle detailing Mpumalanga", "car detailing eMalahleni", "paint correction", "machine polishing", "interior deep clean", "engine bay detailing", "headlight restoration"],
    ogImageText: "The full discipline, in order",
  },
};
