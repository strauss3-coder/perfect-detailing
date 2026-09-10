import type { ServiceDoc } from "@/content/types";

export const interiorService: ServiceDoc = {
  id: "svc-interior",
  slug: "interior-detailing",
  category: "automotive",
  status: "published",
  order: 4,
  name: "Interior Detailing & Restoration",
  shortName: "Interiors",
  cardSummary:
    "Hot-water extraction, leather cleaned in the grain, trim restored rather than dressed, and odour removed at source instead of perfumed over.",
  motif: "interior",
  featuredOnHome: true,

  eyebrow: "Leather · Fabric · Trim · Glass · Odour",
  headline: "The half of the car you actually spend your time inside.",
  lede:
    "Exterior work is what other people see. The interior is what you see, touch and breathe every day — and it is the part that ages fastest, because it lives under ultraviolet light, body oils, spilled coffee, dog hair and the friction of getting in and out ten thousand times. Restoring one is patient, methodical work with a lot of different chemistry, done in an order that stops each step undoing the last.",
  heroMedia: {
    src: "/work/panamera/cabin-wide.webp",
    alt: "The full cabin of a Porsche Panamera photographed from the rear after a complete interior detail",
    ratio: 16 / 9,
    motif: "interior",
  },
  heroStats: [
    { id: "ih1", value: 6, suffix: "hrs", label: "Typical full interior", detail: "On a five-seat car in ordinary condition" },
    { id: "ih2", value: 12, suffix: "mths", label: "Fabric and leather guard", detail: "Re-applied at each maintenance service" },
    { id: "ih3", value: 60, suffix: "°C", label: "Extraction temperature", detail: "Hot water lifts what cold shampoo leaves behind" },
  ],
  actions: [
    { label: "Book an interior detail", href: "/quote", intent: "primary" },
    { label: "See interior work", href: "/gallery", intent: "secondary" },
  ],

  sections: [
    {
      id: "in-order",
      eyebrow: "The order of operations",
      title: "Top down, dry to wet — or you will do it twice",
      body:
        "Everything in a cabin falls. Clean the seats before the headliner and you will be cleaning the seats again. So we work from the roof down and from dry methods to wet ones: headliner, pillars and vents first, then switchgear and console, then seats, then carpets last of all. Dry extraction — compressed air, soft brushes and a vacuum working together — pulls out grit and hair before any liquid is introduced, because water turns dust into mud and pushes it deeper into the weave.",
      bullets: [
        "Headliner, pillars, vents and roof console before anything below them",
        "Compressed air and soft detailing brushes through seams, rails and switchgear",
        "Grit and hair lifted dry, so no liquid ever turns dust into mud",
        "Carpets and mats last, when nothing above them can drop onto the result",
      ],
      motif: "interior",
      media: {
        src: "/work/poster/interior-detail.webp",
        videoSrc: "/video/interior-detail.mp4",
        alt: "A detailing brush working foam through the switchgear of a car console",
        ratio: 9 / 16,
        motif: "interior",
        caption: "Brush and foam through the switchgear",
      },
    },
    {
      id: "in-fabric",
      eyebrow: "Fabric, carpet and Alcantara",
      title: "Hot-water extraction removes what shampoo only rearranges",
      body:
        "A wet-vac and a bottle of upholstery cleaner move soiling around. Extraction removes it: hot solution is injected into the fibre under pressure and pulled straight back out with the dirt suspended in it, repeatedly, until the recovery water runs clear. That is the difference between a seat that looks better and a seat that is actually clean — and it is why the smell goes with it, because the smell was living in what came out. Alcantara and suede are treated differently again: low moisture, soft brush, and brushed back to a uniform nap while damp so it dries even.",
      bullets: [
        "Hot-water extraction on seats, carpets, boot and mats until recovery runs clear",
        "Pre-treatment dwelled on stains before extraction rather than scrubbed after",
        "Alcantara and suede cleaned low-moisture and re-napped while damp",
        "Forced-air drying so nothing is handed back damp under the foam",
      ],
      motif: "microfibre",
      media: {
        src: "/work/panamera/boot-after.webp",
        alt: "The boot floor and carpet of a Porsche Panamera after hot-water extraction, the pile lifted and even",
        ratio: 16 / 9,
        motif: "interior",
        caption: "Extracted, dried, re-napped",
      },
    },
    {
      id: "in-leather",
      eyebrow: "Leather",
      title: "Cleaned in the grain, conditioned matte, never dressed to a shine",
      body:
        "Almost all modern automotive leather is pigmented — a coloured, protective film over the hide. Soiling does not sit on top of it, it collects in the grain and at the seams, which is why a wipe with a cloth takes off the surface and leaves the pattern. We work a pH-appropriate cleaner into the grain with a soft brush, lift it out rather than spread it, then condition with something that feeds the finish and dries matte. If a cabin comes back glossy and slippery, it has been dressed, not cleaned — and that shine is a silicone film that attracts dust and glares in the windscreen.",
      bullets: [
        "pH-appropriate cleaner agitated into the grain with a soft brush, not a cloth",
        "Perforations cleaned without flooding the foam beneath them",
        "Seams, piping and bolsters worked individually — where wear actually shows",
        "Conditioned to a factory matte finish, never a wet-look dressing",
      ],
      motif: "sparkle",
      media: {
        src: "/work/sl65/cabin-red.webp",
        alt: "The red quilted leather cabin of a Mercedes-AMG SL 65 after cleaning and conditioning",
        ratio: 665 / 1182,
        motif: "interior",
        caption: "Cleaned in the grain, conditioned matte",
      },
    },
    {
      id: "in-trim",
      eyebrow: "Plastics, trim and switchgear",
      title: "The surfaces your hands are on all day",
      body:
        "Steering wheel, gear selector, door pulls, indicator stalks, the rim of the cupholder — these carry body oils and sunscreen and go glazed and slightly tacky long before anything else in the cabin does. They need degreasing, not dressing. Textured plastics get brushed so the cleaner reaches the bottom of the texture instead of skating over it. Piano-black trim, which scratches if you look at it wrongly, is cleaned with dedicated media and can be machine-refined where it has already been marked. Everything is finished with an ultraviolet protectant that leaves a satin surface, because a glossy dashboard reflects straight into the windscreen.",
      bullets: [
        "High-touch surfaces degreased, not dressed over",
        "Textured plastics brushed so the cleaner reaches the base of the grain",
        "Piano-black and gloss trim refined where marred, then protected",
        "UV protectant left satin — no glare on the windscreen, no greasy feel",
      ],
      motif: "shield",
      media: {
        src: "/work/panamera/cabin-dash.webp",
        alt: "A cleaned Porsche dashboard, centre console and switchgear photographed from the passenger side",
        ratio: 16 / 9,
        motif: "interior",
        caption: "Satin, not glossy",
      },
    },
    {
      id: "in-odour",
      eyebrow: "Odour",
      title: "Smell is a source, not a scent",
      body:
        "Air fresheners do not remove odour, they add a second one. Odour in a cabin lives somewhere specific: spilled milk under a seat rail, damp in the carpet underlay, cigarette residue on the headliner and glass, a blocked air-conditioning drain feeding mould on the evaporator. We find the source, remove it, and only then treat the air path. Where an odour is genuinely embedded we can follow up with an ozone or chlorine-dioxide treatment, which oxidises what is left in the ducting rather than covering it.",
      bullets: [
        "Source located and removed before anything is treated",
        "Carpet underlay lifted and dried where damp has got underneath",
        "Cabin filter replaced and the evaporator treated through the air path",
        "Ozone or chlorine-dioxide treatment available for embedded smoke and mould",
      ],
      motif: "droplet",
    },
    {
      id: "in-glass",
      eyebrow: "Glass, last of all",
      title: "The inside of a windscreen holds a film nobody thinks about",
      body:
        "Plasticisers off-gas out of a hot dashboard and condense on the inside of the windscreen as an oily haze. You never notice it until you drive into low sun and cannot see. It is cleaned last, after every other product in the cabin has been used, with a two-towel method — one to cut the film, one to buff dry — and finished edge to edge so there is no line where the glass meets the seal. Interior glass coating is available to slow the haze building back up.",
      bullets: [
        "Cleaned last, after every other product has been applied",
        "Two-towel method — one cuts the film, one buffs it dry",
        "Worked to the very edge, including under the seals",
        "Optional interior glass coating to slow re-hazing",
      ],
      motif: "window",
    },
    {
      id: "in-protect",
      eyebrow: "Keeping it",
      title: "Protection so the next spill is an incident, not a stain",
      body:
        "A restored interior is worth protecting for exactly the reason a corrected panel is: it is now at its best, and everything from here is downhill unless you intervene. Fabric guard puts a hydrophobic layer around each fibre so a spill beads on top long enough to be lifted rather than wicking into the foam. Leather guard does the same for pigmented hide, and slows dye transfer from denim — the single most common thing that ruins a light-coloured cabin. Both are re-applied at every maintenance service, which is included in a plan.",
      bullets: [
        "Fabric and carpet guard — spills bead and can be lifted instead of wicking in",
        "Leather guard slows dye transfer from denim onto light hide",
        "UV protectant on every plastic and vinyl surface that sees sun",
        "Re-applied at each maintenance service, and included in a plan",
      ],
      motif: "shield",
      media: {
        src: "/work/panamera/cabin-sill.webp",
        alt: "A cleaned Porsche door sill, seat base and floor mat after protection was applied",
        ratio: 16 / 9,
        motif: "interior",
        caption: "Finished and protected",
      },
    },
  ],

  benefits: [
    { id: "ib1", title: "Clean, not perfumed", body: "Extraction removes what was causing the smell. Nothing is sprayed over the top of anything.", motif: "microfibre", metric: "At source" },
    { id: "ib2", title: "Leather that lasts", body: "Cleaning in the grain and conditioning matte keeps the pigmented finish intact — which is what actually stops cracking.", motif: "sparkle", metric: "Factory matte" },
    { id: "ib3", title: "No glare, no grease", body: "Satin UV protection on every plastic surface. Nothing reflects into the windscreen, nothing feels tacky in summer.", motif: "shield", metric: "Satin finish" },
    { id: "ib4", title: "Healthier air", body: "Cabin filter, air path and evaporator treated, not just the surfaces you can see.", motif: "droplet", metric: "Air path treated" },
    { id: "ib5", title: "Spills stop being disasters", body: "Guarded fabric holds a spill on the surface long enough for you to lift it before it reaches the foam.", motif: "interior", metric: "12 months" },
    { id: "ib6", title: "It shows at resale", body: "Buyers forgive a stone chip. They do not forgive a stained driver's seat or a cabin that smells of dog.", motif: "sedan", metric: "Value held" },
  ],

  packages: [
    {
      id: "ip1",
      name: "Interior Refresh",
      summary: "For a cabin in good condition that needs resetting rather than rescuing.",
      priceFrom: null,
      priceNote: "Quoted by vehicle size",
      duration: "2–3 hours",
      includes: [
        "Full dry extraction — air, brushes and vacuum through every seam",
        "All hard surfaces cleaned and UV protected",
        "Leather cleaned and conditioned",
        "Interior glass, two-towel method",
        "Cabin filter checked and reported",
      ],
      featured: false,
    },
    {
      id: "ip2",
      name: "Full Interior Detail",
      summary: "The complete restoration. Our most common interior booking.",
      priceFrom: null,
      priceNote: "Quoted by vehicle size and condition",
      duration: "5–7 hours",
      includes: [
        "Everything in the Interior Refresh",
        "Hot-water extraction on seats, carpets, boot and mats",
        "Leather cleaned in the grain, seams and perforations worked individually",
        "Piano-black and gloss trim refined where marred",
        "Odour source located, removed and the air path treated",
        "Fabric and leather guard applied",
      ],
      featured: true,
    },
    {
      id: "ip3",
      name: "Restoration & Decontamination",
      summary: "Heavily soiled, smoked-in, flood-damp or long-neglected cabins.",
      priceFrom: null,
      priceNote: "Quoted after inspection — condition varies enormously",
      duration: "1–2 days",
      includes: [
        "Everything in the Full Interior Detail",
        "Seats removed where access requires it",
        "Carpet underlay lifted, cleaned and force-dried",
        "Ozone or chlorine-dioxide treatment for embedded odour",
        "Cabin filter replaced and evaporator treated",
        "Headliner cleaned low-moisture, at your risk and ours agreed in writing",
      ],
      featured: false,
    },
  ],

  steps: [
    { id: "is1", index: 1, title: "Strip and inspect", body: "Mats and loose items out, seats slid to their limits, and the cabin photographed as found so nothing is disputed later.", duration: "20 min", motif: "gloss-meter", detail: ["Existing damage, burns and tears photographed", "Trim condition assessed before any product is used", "Achievable result agreed — some stains are dye, not soiling"] },
    { id: "is2", index: 2, title: "Dry extraction", body: "Compressed air, soft brushes and a vacuum working together, from the headliner down, before a drop of liquid appears.", duration: "45–90 min", motif: "microfibre", detail: ["Seat rails, seam channels and boot recesses cleared", "Vents and switchgear blown out and brushed", "Grit lifted before it can be turned into mud"] },
    { id: "is3", index: 3, title: "Hard surfaces", body: "Dashboard, console, door cards, pillars and switchgear degreased with the texture brushed, then protected satin.", duration: "1–2 hours", motif: "shield", detail: ["High-touch surfaces degreased rather than dressed", "Textured plastics brushed to the base of the grain", "UV protectant applied and buffed to satin"] },
    { id: "is4", index: 4, title: "Leather and fabric", body: "Leather cleaned in the grain and conditioned; fabric and carpet hot-water extracted until the recovery water runs clear.", duration: "2–4 hours", motif: "interior", detail: ["Stains pre-treated and dwelled, not scrubbed", "Perforated leather cleaned without flooding the foam", "Extraction repeated until recovery is clear"] },
    { id: "is5", index: 5, title: "Dry, protect, glass", body: "Forced-air drying, fabric and leather guard applied, then the glass done last with a two-towel method.", duration: "1–2 hours", motif: "window", detail: ["Nothing handed back damp under the foam", "Fabric and leather guard applied and cured", "Interior glass cleaned edge to edge, last of all"] },
    { id: "is6", index: 6, title: "Handover", body: "We go through the cabin with you, point out anything that could not be recovered, and explain what will keep it this way.", duration: "15 min", motif: "sparkle", detail: ["Unrecoverable marks shown and explained honestly", "Aftercare guidance for leather and fabric", "Next service interval suggested, never pushed"] },
  ],

  lifespan: [
    { id: "il1", label: "The clean itself", value: "Permanent", note: "What has been extracted is gone. What happens next is ordinary use" },
    { id: "il2", label: "Fabric and carpet guard", value: "12 months", note: "Or one deep extraction, whichever comes first" },
    { id: "il3", label: "Leather guard", value: "9–12 months", note: "Shorter on bolsters and the driver's seat, where friction is highest" },
    { id: "il4", label: "UV protectant on trim", value: "3–4 months", note: "Re-applied at every maintenance service" },
  ],

  maintenance: {
    title: "Keeping an interior right",
    body:
      "Interiors degrade gradually and invisibly, which is why people only notice when it is a restoration job again. A short interior service on the same cycle as your exterior maintenance keeps it permanently at the standard it was handed back at, for a fraction of what recovering it costs.",
    items: [
      "Vacuum weekly — grit underfoot is what abrades carpet and sill trim",
      "Lift spills immediately; guarded fabric buys you minutes, not hours",
      "Keep a plain microfibre in the door bin for the wheel and selector",
      "Never use an all-purpose cleaner on leather, and never a silicone dressing on the wheel",
      "Cabin filter every 15 000 km — most of what you smell arrives through it",
      "An interior service at each maintenance detail, included in a plan",
    ],
  },

  faqIds: ["faq-int-1", "faq-int-2", "faq-int-3", "faq-int-4", "faq-int-5"],

  seo: {
    title: "Interior Detailing & Restoration",
    description:
      "Interior detailing in Witbank, Mpumalanga. Hot-water extraction, leather cleaned in the grain and conditioned, trim restored, odour removed at source, fabric and leather guard applied.",
    keywords: [
      "interior detailing Witbank",
      "car upholstery cleaning Mpumalanga",
      "leather cleaning and conditioning",
      "hot water extraction car seats",
      "car odour removal",
      "interior restoration eMalahleni",
    ],
    ogImageText: "Cleaned, not perfumed",
  },
};
