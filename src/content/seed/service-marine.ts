import type { ServiceDoc } from "@/content/types";

export const marineService: ServiceDoc = {
  id: "svc-marine",
  slug: "marine-detailing",
  category: "marine",
  status: "published",
  order: 5,
  name: "Marine Detailing & Protection",
  shortName: "Marine",
  cardSummary:
    "Gelcoat restoration and marine ceramic coating for recreational and commercial vessels — hull, topsides, metalwork and running gear.",
  motif: "marine",
  flag: "Marine Division",
  featuredOnHome: true,

  eyebrow: "Marine Division · Gelcoat, metal and running gear",
  headline: "Saltwater is patient. It takes the hull a season at a time.",
  lede:
    "A boat lives in the most aggressive environment we work in. Salt, constant ultraviolet, waterline growth and the mechanical punishment of moving through water all attack gelcoat and metalwork at once. Our marine division corrects those surfaces back and then puts a ceramic layer between them and the sea.",
  heroMedia: {
    src: "",
    alt: "Coated hull sitting clean at the waterline with water sheeting off the topsides",
    ratio: 16 / 9,
    motif: "marine",
  },
  heroStats: [
    { id: "mh1", value: 3, suffix: "yrs", label: "Coating service life", detail: "On gelcoat, with the recommended wash cycle" },
    { id: "mh2", value: 5, suffix: "%", label: "Performance improvement", detail: "Published figure, up to — see the qualifier below" },
    { id: "mh3", value: 2, suffix: "days", label: "Typical vessel", detail: "Correction and coating on a mid-size hull" },
  ],
  actions: [
    { label: "Request a vessel survey", href: "/quote", intent: "primary" },
    { label: "Talk to the marine team", href: "/contact", intent: "secondary" },
  ],

  sections: [
    {
      id: "mr-clean",
      eyebrow: "Deep clean & growth removal",
      title: "Everything below the waterline has to come off first",
      body:
        "Marine growth, waterline scum and the tide-line stain that comes with a season in the water are removed before any correction begins. Growth is not simply scrubbed away — it is released and lifted so that the gelcoat underneath is not scoured in the process, because gelcoat that has been sanded by a careless wash is exactly what we then have to correct.",
      bullets: [
        "Hull growth and waterline staining released chemically, then rinsed",
        "Topsides, non-skid and deck hardware cleaned separately",
        "No aggressive scouring on gelcoat — it causes the dullness we are here to fix",
        "Bilges, lockers and hatch gutters cleaned while access is open",
      ],
      motif: "foam-cannon",
    },
    {
      id: "mr-correct",
      eyebrow: "Gelcoat correction",
      title: "Chalked gelcoat comes back further than most owners expect",
      body:
        "Oxidised gelcoat is not paint and does not behave like it. It is a thick, pigmented layer that chalks from the surface down under sustained ultraviolet load, which means there is usually a great deal of sound material underneath. Multi-stage machine correction removes the dead layer and restores depth and colour, and on a hull that has been neglected for a few seasons the difference is the single most dramatic result we produce.",
      bullets: [
        "Multi-stage cut and refine, worked to a defined finish",
        "Colour and clarity restored rather than masked with a filler polish",
        "Non-skid and textured areas worked by hand where a machine would burn",
        "Thin or previously repaired areas identified and flagged before work starts",
      ],
      motif: "polisher",
    },
    {
      id: "mr-coat",
      eyebrow: "Marine ceramic coating",
      title: "A barrier built for salt and sun",
      body:
        "Once the surface is corrected we apply a marine-grade ceramic system rated for continuous saltwater exposure. It bonds to the gelcoat and gives a hard, ultraviolet-stable, strongly hydrophobic surface: salt rinses off instead of drying into the pores, staining is dramatically reduced, and the wash-down at the end of a day on the water becomes a fraction of the job it was.",
      bullets: [
        "Rated for continuous saltwater immersion and spray",
        "Ultraviolet-stable — the mechanism that chalks gelcoat in the first place",
        "Salt and organic staining release with a freshwater rinse",
        "Applied to topsides, hull and superstructure as scoped",
      ],
      motif: "shield",
    },
    {
      id: "mr-metal",
      eyebrow: "Metalwork & running gear",
      title: "Propellers, railings and hardware",
      body:
        "Stainless railings, pulpits, cleats and fittings are polished and coated so they stop tea-staining between washes. Propellers and running gear get their own treatment: a smooth, coated prop fouls more slowly and stays cleaner between lifts, and reduced barnacle adhesion on the blades is worth more to a vessel's efficiency than almost anything else we do underwater.",
      bullets: [
        "Stainless polished and coated to slow tea-staining",
        "Propellers and shafts treated to reduce barnacle adhesion",
        "Anodised and painted metalwork handled with the appropriate chemistry",
        "Anodes, transducers and sacrificial fittings deliberately left alone",
      ],
      motif: "sparkle",
    },
  ],

  benefits: [
    { id: "mb1", title: "Salt stops soaking in", body: "A sealed, non-porous surface means salt rinses away instead of drying into the gelcoat and etching it.", motif: "droplet", metric: "Hydrophobic" },
    { id: "mb2", title: "Ultraviolet stability", body: "The coating absorbs the exposure that chalks gelcoat and fades pigment across a season on the water.", motif: "shield", metric: "UV-stable" },
    { id: "mb3", title: "Faster wash-downs", body: "Contamination releases with a freshwater rinse, turning a long end-of-day job into a short one.", motif: "microfibre", metric: "Rinse-and-go" },
    { id: "mb4", title: "Slower fouling", body: "A slicker hull and coated running gear give marine growth far less to key into between lifts.", motif: "marine", metric: "Less adhesion" },
    { id: "mb5", title: "Restored colour", body: "Multi-stage correction brings chalked gelcoat back to depth and clarity rather than dressing over it.", motif: "polisher", metric: "Multi-stage" },
    { id: "mb6", title: "Value held", body: "A vessel that has been protected rather than rescued presents very differently at survey and at sale.", motif: "gloss-meter", metric: "At resale" },
  ],

  difference: {
    eyebrow: "The difference",
    title: "A slick hull moves through water differently.",
    body:
      "Water behaves like any other fluid across a surface. A rough, fouled hull drags a turbulent boundary layer behind it; a smooth, hydrophobic one keeps that flow attached for longer. It is the same physics we work with on paint and on wings, in a far less forgiving medium.",
    media: {
      src: "/profile/marine-performance.webp",
      alt: "Split comparison of a hull with and without ceramic coating, showing laminar flow against turbulent flow and the resulting drag difference",
      ratio: 1456 / 768,
    },
    withoutLabel: "Without ceramic coating",
    withoutBody:
      "Microscopic surface roughness and early fouling break up the flow along the hull. The boundary layer becomes turbulent, drag rises, and the vessel works harder for the same speed.",
    withLabel: "With ceramic coating",
    withBody:
      "An ultra-smooth, hydrophobic surface keeps water flow attached for longer, reducing skin friction. The hull stays cleaner between lifts, which compounds the effect across a season.",
    headline: {
      value: "Up to 3–5%",
      label: "Performance improvement",
      qualifier:
        "Perfect Detailing's published figure. Performance improvements vary based on boat type, hull condition, coating application quality and water conditions — a heavily fouled hull recovers far more than a well-maintained one, and no figure should be treated as a guarantee for a specific vessel.",
    },
    benefits: [
      { id: "md1", title: "Reduced drag", body: "A slicker surface lowers water friction and overall hull drag.", motif: "marine" },
      { id: "md2", title: "Better fuel efficiency", body: "Less drag means lower burn at cruise and at top speed.", motif: "gloss-meter" },
      { id: "md3", title: "Improved speed", body: "More efficient water flow supports cruise speed and hull stability.", motif: "sparkle" },
      { id: "md4", title: "Long-term protection", body: "Guards the hull against saltwater corrosion, growth adhesion and UV fading.", motif: "shield" },
      { id: "md5", title: "Easier to clean", body: "Hydrophobic behaviour cuts hull wash time and maintenance effort.", motif: "microfibre" },
    ],
  },

  packages: [
    {
      id: "mp1",
      name: "Seasonal wash & protect",
      summary: "Maintenance treatment for a vessel already in good condition.",
      priceFrom: null,
      priceNote: "Quoted by vessel length",
      duration: "Half a day to a day",
      includes: ["Full exterior wash and salt removal", "Waterline treatment", "Topside sealant refresh", "Stainless polish", "Interior wipe-down and glass"],
      featured: false,
    },
    {
      id: "mp2",
      name: "Gelcoat restoration & coating",
      summary: "Full correction and marine ceramic coating. The division's core service.",
      priceFrom: null,
      priceNote: "Quoted after vessel survey",
      duration: "2–4 days",
      includes: [
        "Deep clean and marine growth removal",
        "Multi-stage gelcoat correction",
        "Marine ceramic coating on hull and topsides",
        "Stainless and metalwork polished and coated",
        "Running gear treated for reduced fouling",
        "Written aftercare programme",
      ],
      featured: true,
    },
    {
      id: "mp3",
      name: "Commercial vessel programme",
      summary: "Scheduled protection for charter, ferry and working craft.",
      priceFrom: null,
      priceNote: "Quoted per vessel, per cycle",
      duration: "Scheduled around your operating window",
      includes: [
        "Survey and cycle planned around your operations",
        "Coating applied at a scheduled lift",
        "Reduced-cost maintenance washes between lifts",
        "Condition reporting for the vessel file",
        "Consolidated invoicing across a fleet",
      ],
      featured: false,
    },
  ],

  steps: [
    { id: "ms1", index: 1, title: "Vessel survey", body: "We look at the hull, topsides, metalwork and running gear, and agree in writing what is in scope and what is excluded.", duration: "45–60 min", motif: "gloss-meter", detail: ["Gelcoat condition and oxidation assessed", "Previous repairs and thin areas flagged", "Anodes and sacrificial fittings excluded by default"] },
    { id: "ms2", index: 2, title: "Deep clean", body: "Growth, waterline staining and salt are released and rinsed before anything abrasive touches the surface.", duration: "2–5 hours", motif: "foam-cannon", detail: ["Growth released chemically rather than scoured", "Topsides, non-skid and deck cleaned separately", "Freshwater rinse to neutral"] },
    { id: "ms3", index: 3, title: "Correction", body: "Multi-stage machine work brings chalked gelcoat back to depth and colour, with textured areas handled by hand.", duration: "6–20 hours", motif: "polisher", detail: ["Test section first", "Cut then refine to a defined finish", "Non-skid and awkward curves worked by hand"] },
    { id: "ms4", index: 4, title: "Prep & coat", body: "Every surface is stripped of polishing residue, then the marine ceramic is applied section by section and levelled.", duration: "4–10 hours", motif: "shield", detail: ["Solvent wipe to bare gelcoat", "Applied and levelled in controlled sections", "Metalwork and running gear treated separately"] },
    { id: "ms5", index: 5, title: "Cure & handover", body: "The film cures out of the water, then we walk the vessel with you and hand over the aftercare programme.", duration: "12–24 hours", motif: "sparkle", detail: ["Vessel stays out of the water through the cure", "Full walk-around in daylight", "Wash media and aftercare schedule issued"] },
  ],

  lifespan: [
    { id: "ml1", label: "Coating on gelcoat", value: "2–3 years", note: "Depending on time in the water and whether the vessel is covered" },
    { id: "ml2", label: "Coating on metalwork", value: "12–18 months", note: "Stainless and hardware, refreshed at the annual service" },
    { id: "ml3", label: "Full hardness", value: "24–48 hours", note: "The vessel should stay out of the water through the cure" },
    { id: "ml4", label: "Annual inspection", value: "Every 12 months", note: "Ideally aligned to a scheduled lift" },
  ],

  maintenance: {
    title: "Living with a coated hull",
    body:
      "The coating makes maintenance quicker; it does not remove it. Salt left to dry on any surface, coated or not, is still salt left to dry.",
    items: [
      "Rinse with fresh water after every outing — this is the single most valuable habit",
      "Use a pH-neutral boat soap; avoid acidic hull cleaners on coated gelcoat",
      "Never use abrasive pads or scouring powder on a coated surface",
      "Book the annual inspection at a lift, when the hull is accessible anyway",
      "Tell us if the vessel changes mooring or usage — the cycle should change with it",
    ],
  },

  faqIds: ["faq-marine-1", "faq-marine-2", "faq-marine-3"],

  seo: {
    title: "Marine Detailing & Ceramic Coating",
    description:
      "Marine ceramic coating and gelcoat restoration for recreational and commercial vessels. Hull, topsides, stainless and running gear protected against salt, UV and fouling.",
    keywords: ["marine ceramic coating South Africa", "gelcoat restoration", "boat detailing Mpumalanga", "hull coating"],
    ogImageText: "Built for salt and sun",
  },
};
