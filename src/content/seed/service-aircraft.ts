import type { ServiceDoc } from "@/content/types";

export const aircraftService: ServiceDoc = {
  id: "svc-air",
  slug: "aircraft-detailing",
  category: "aircraft",
  status: "published",
  order: 4,
  name: "Aircraft Cleaning & Ceramic Coating",
  shortName: "Aircraft",
  cardSummary:
    "Dry washing and ceramic protection for general aviation airframes, done in your hangar to a written scope your maintenance organisation can file.",
  motif: "aircraft",
  featuredOnHome: true,

  eyebrow: "General aviation · Hangar or apron",
  headline: "An airframe is a surface that lives outdoors at altitude.",
  lede:
    "Paint on an aircraft takes ultraviolet exposure at altitude, thermal cycling every flight, hydraulic and exhaust residue, and constant airflow carrying whatever is in it. Cleaning it is not the same job as cleaning a car — the chemistry, the water discipline and the areas you are not allowed to touch are all different.",
  heroMedia: {
    src: "",
    alt: "Light twin aircraft in a hangar with a technician working along the leading edge",
    ratio: 16 / 9,
    motif: "aircraft",
  },
  heroStats: [
    { id: "fh1", value: 0, suffix: "L", label: "Water used on a dry wash", detail: "Encapsulated cleaning, no run-off in the hangar" },
    { id: "fh2", value: 3, suffix: "yrs", label: "Typical coating life", detail: "On painted composite and aluminium surfaces" },
    { id: "fh3", value: 2, suffix: "days", label: "Typical single-engine job", detail: "Wash, correction and coating, hangar-based" },
  ],
  actions: [
    { label: "Request a hangar visit", href: "/contact", intent: "primary" },
    { label: "Discuss a schedule", href: "/quote", intent: "secondary" },
  ],

  sections: [
    {
      id: "ac-wash",
      eyebrow: "Exterior cleaning",
      title: "Dry washing, because water is the problem",
      body:
        "A flooded wash puts water into places on an airframe that are difficult to dry: control surface hinges, static ports, seams, fastener heads and the gap behind fairings. Trapped moisture is how corrosion starts. We use an encapsulating dry-wash system — the product lifts soiling into a lubricating film that is removed with clean media — so contamination leaves the aircraft without water ever entering a seam. It also means we can work inside a hangar with no run-off, no containment and no wet floor.",
      bullets: [
        "Encapsulated dry wash — no water into seams, hinges or static ports",
        "Works inside the hangar with no run-off or containment required",
        "Media changed constantly; nothing abrasive dragged across paint",
        "Pitot, static ports and probes covered before work begins",
      ],
      motif: "microfibre",
    },
    {
      id: "ac-coat",
      eyebrow: "Ceramic coating",
      title: "Protection sized to an airframe",
      body:
        "Once the surface is clean and, where appropriate, corrected, we apply a ceramic system rated for aviation surfaces across painted aluminium and composite. The result is a hard, UV-stable, hydrophobic film that resists exhaust staining, hydraulic residue and insect strike, and releases them with far less mechanical effort at the next clean. It is applied panel by panel with the same levelling discipline we use on paint, because streaks on a wing are visible from a long way off.",
      bullets: [
        "Rated for painted aluminium and composite airframe surfaces",
        "UV-stable — the dominant ageing mechanism at altitude",
        "Exhaust staining and hydraulic residue release rather than bond",
        "Applied panel by panel and levelled while open",
      ],
      motif: "shield",
    },
    {
      id: "ac-ox",
      eyebrow: "Oxidation & polished surfaces",
      title: "Stopping the chalk before it starts",
      body:
        "Older paint schemes chalk and fade under sustained ultraviolet load; unpainted polished aluminium oxidises and hazes continuously and needs regular attention to stay bright. Both respond to the same approach: correct the surface back to a clean, uniform finish, then seal it so the oxidation clock resets rather than continuing where it left off.",
      bullets: [
        "Chalked paint corrected and sealed instead of dressed over",
        "Polished aluminium brought back and protected to slow re-oxidation",
        "Registration marks and decals worked around, never polished across",
        "Boots, de-ice panels and non-painted surfaces excluded by default",
      ],
      motif: "polisher",
    },
    {
      id: "ac-drag",
      eyebrow: "Surface condition",
      title: "On drag — a careful claim",
      body:
        "A clean, smooth airframe has less parasitic drag than a dirty one carrying insect strike and accumulated grime on its leading edges. That is aerodynamics and it is not controversial. What we will not do is put a number on your cruise speed or fuel burn: the effect is real but modest, it varies enormously with aircraft type and how dirty the airframe was, and anyone quoting you a percentage is guessing. Clean it because it protects the paint, makes inspection easier, and keeps the aircraft presentable.",
      bullets: [
        "Smoother leading edges genuinely mean less parasitic drag",
        "We publish no cruise-speed or fuel-burn figures — they would be invented",
        "The measurable wins are paint life, inspection clarity and presentation",
        "Any performance benefit is a bonus, never the reason we quote",
      ],
      motif: "aircraft",
    },
    {
      id: "ac-int",
      eyebrow: "Interior",
      title: "Cabin, cockpit and the surfaces you touch on every flight",
      body:
        "Cabin work covers leather and fabric seating, carpets, sidewalls and headliner, plus careful attention to the cockpit — instrument panel, glareshield, switch panels and glass. Screens and instrument faces are cleaned with appropriate media only, and nothing is sprayed near a panel: product goes onto the cloth, never onto the aircraft.",
      bullets: [
        "Leather and fabric seating cleaned and conditioned appropriately",
        "Carpets extracted and dried before the aircraft is closed up",
        "Instrument faces and screens cleaned with correct media only",
        "Product applied to cloth, never sprayed into a cockpit",
      ],
      motif: "interior",
    },
  ],

  benefits: [
    { id: "fb1", title: "No water into seams", body: "Dry wash means no moisture trapped in hinges, fasteners or behind fairings, which is where corrosion begins.", motif: "microfibre", metric: "Zero run-off" },
    { id: "fb2", title: "UV and oxidation control", body: "A stable coating takes the ultraviolet load that chalks paint and hazes polished aluminium.", motif: "shield", metric: "UV-stable" },
    { id: "fb3", title: "Contaminants release", body: "Exhaust staining, hydraulic residue and insect strike lift with far less mechanical effort at the next clean.", motif: "droplet", metric: "Hydrophobic" },
    { id: "fb4", title: "Easier inspection", body: "A clean, uniform surface makes a developing crack, a weep or a fastener working loose obvious far sooner.", motif: "gloss-meter", metric: "Visual clarity" },
    { id: "fb5", title: "Faster turnarounds", body: "Coated airframes clean in a fraction of the time, which matters when the aircraft is scheduled.", motif: "sparkle", metric: "Quicker cleans" },
    { id: "fb6", title: "Presentation holds", body: "Charter, syndicate and resale aircraft keep looking like they are looked after, because they are.", motif: "aircraft", metric: "Value held" },
  ],

  packages: [
    { id: "fp1", name: "Exterior dry wash", summary: "Scheduled airframe clean, hangar-based, no water.", priceFrom: null, priceNote: "Quoted by type", duration: "3–6 hours", includes: ["Full encapsulated dry wash", "Leading edge insect removal", "Belly degrease and exhaust stain treatment", "Glass and windscreen with correct media", "Gear legs, wells and wheels"], featured: false },
    { id: "fp2", name: "Wash & ceramic coating", summary: "Full exterior treatment with coating applied to painted surfaces.", priceFrom: null, priceNote: "Quoted after survey", duration: "2–3 days", includes: ["Dry wash and full decontamination", "Correction on chalked or oxidised areas", "Ceramic coating across painted surfaces", "Glass coated separately", "Written scope and completion record"], featured: true },
    { id: "fp3", name: "Full interior & exterior", summary: "Exterior coating plus complete cabin and cockpit work.", priceFrom: null, priceNote: "Quoted after survey", duration: "3–5 days", includes: ["Everything in the wash and coating package", "Leather and fabric seating cleaned and conditioned", "Carpets extracted and dried", "Cockpit panels, screens and switchgear", "Scheduled return visit included"], featured: false },
  ],

  steps: [
    { id: "fs1", index: 1, title: "Survey & scope", body: "We walk the aircraft with you or your maintenance organisation and agree in writing what is in scope and what is excluded.", duration: "45 min", motif: "gloss-meter", detail: ["Paint condition and oxidation assessed", "Exclusions agreed — boots, de-ice panels, probes", "Written scope issued before the date"] },
    { id: "fs2", index: 2, title: "Mask & protect", body: "Pitot tubes, static ports, probes, vents and any sensitive fittings are covered and logged before work starts.", duration: "30 min", motif: "shield", detail: ["Covers fitted and recorded on a checklist", "Same checklist walked in reverse at completion", "Nothing left on the aircraft — verified twice"] },
    { id: "fs3", index: 3, title: "Dry wash", body: "Encapsulated wash worked in sections from the top down, media changed constantly, belly and exhaust areas treated last.", duration: "3–6 hours", motif: "microfibre", detail: ["Top-down section order so nothing is re-soiled", "Leading edges and insect strike given dedicated time", "Belly degrease and exhaust staining handled separately"] },
    { id: "fs4", index: 4, title: "Correct where needed", body: "Chalked, faded or oxidised areas corrected back to a uniform finish, working around registration marks and decals.", duration: "As scoped", motif: "polisher", detail: ["Only where agreed in the written scope", "Decals and registration never polished across", "Finish checked for uniformity across adjacent panels"] },
    { id: "fs5", index: 5, title: "Coat & level", body: "Ceramic applied panel by panel across painted surfaces, levelled in the flash window and inspected at a raking angle.", duration: "4–8 hours", motif: "coating-layers", detail: ["Panel-by-panel application", "Levelled while open — streaks show at distance", "Glass coated as a separate operation"] },
    { id: "fs6", index: 6, title: "Cure, uncover & sign off", body: "The film cures in the hangar, every cover is removed against the checklist, and you receive a completion record for the file.", duration: "12–24 hours", motif: "sparkle", detail: ["Cure inside the hangar, aircraft not moved", "Cover checklist walked in reverse and signed", "Completion record issued for your maintenance file"] },
  ],

  lifespan: [
    { id: "fl1", label: "Coating on painted surfaces", value: "2–3 years", note: "Depending on hours flown and whether the aircraft is hangared" },
    { id: "fl2", label: "Dry wash interval", value: "6–8 weeks", note: "Hangared aircraft in normal use" },
    { id: "fl3", label: "Full hardness", value: "24–48 hours", note: "Aircraft should remain hangared through cure" },
    { id: "fl4", label: "Inspection", value: "Every 12 months", note: "Coating condition checked and topped where needed" },
  ],

  maintenance: {
    title: "Maintenance schedules",
    body:
      "Aircraft respond to routine far better than to rescue work. We schedule around your utilisation and your maintenance calendar rather than the other way round.",
    items: [
      "Six to eight weekly dry wash for hangared aircraft in regular use",
      "Four weekly for aircraft parked outside or flown off grass",
      "Leading edge and belly attention after any high-insect season",
      "Annual coating inspection aligned to your scheduled maintenance",
      "Pre-sale or pre-charter presentation detail on request",
    ],
  },

  faqIds: ["faq-air-1", "faq-air-2", "faq-air-3", "faq-air-4"],

  aircraft: {
    types: [
      { id: "at1", name: "Single-engine piston", note: "Cessna 172/182, Piper PA-28, Cirrus SR20/22 and similar" },
      { id: "at2", name: "Light twin piston", note: "Baron, Seneca, Aztec and comparable airframes" },
      { id: "at3", name: "Turboprop", note: "PC-12, King Air and similar, subject to hangar access" },
      { id: "at4", name: "Light sport & experimental", note: "Composite airframes welcome; we confirm coating compatibility first" },
      { id: "at5", name: "Helicopters", note: "Piston and light turbine, main rotor area excluded from scope" },
    ],
    schedule: [
      { id: "as1", interval: "Every 6–8 weeks", work: "Exterior dry wash, leading edges, belly and glass" },
      { id: "as2", interval: "Every 6 months", work: "Full exterior plus cabin refresh and coating check" },
      { id: "as3", interval: "Every 12 months", work: "Coating inspection, correction where needed, top-up layer" },
      { id: "as4", interval: "Before sale or charter", work: "Full presentation detail, interior and exterior" },
    ],
    compliance: [
      "Work is cosmetic only — we do not touch anything requiring an approved maintenance release",
      "Scope agreed in writing with the owner or maintenance organisation before the date",
      "Covers on probes and ports logged on a checklist and walked in reverse at completion",
      "Public liability cover in place; certificate available on request",
      "Products confirmed compatible with your paint scheme before first application",
    ],
  },

  seo: {
    title: "Aircraft Cleaning & Ceramic Coating",
    description:
      "General aviation aircraft detailing in Gauteng. Encapsulated dry washing with no water into seams, ceramic coating for painted airframes, hangar-based and fully scoped.",
    keywords: ["aircraft detailing South Africa", "aircraft dry wash", "aviation ceramic coating", "aircraft cleaning Lanseria"],
    ogImageText: "Dry washed. Hangar based.",
  },
};
