import type { ServiceDoc } from "@/content/types";

export const ceramicService: ServiceDoc = {
  id: "svc-ceramic",
  slug: "ceramic-coating",
  category: "ceramic",
  status: "published",
  order: 2,
  name: "Ceramic Coating",
  shortName: "Ceramic",
  cardSummary:
    "A semi-permanent silica layer bonded to corrected paint. Chemical resistance, UV stability and a surface that lets go of everything you drive through.",
  motif: "shield",
  featuredOnHome: true,

  eyebrow: "Paint · Glass · Wheels · Trim",
  headline: "Wax sits on paint. Ceramic becomes part of it.",
  lede:
    "A ceramic coating is a liquid silica polymer that cross-links into a hard, transparent film chemically bonded to your clear coat. It is not a shine you top up every few months — it is a sacrificial surface that takes the chemical and ultraviolet punishment your paint would otherwise absorb.",
  heroMedia: {
    src: "/work/sl65/body-coating.webp",
    alt: "The coated bonnet and wing of a Mercedes-AMG SL 65, the surface returning one clean reflection",
    ratio: 16 / 9,
    motif: "shield",
  },
  heroStats: [
    { id: "ch1", value: 9, suffix: "H", label: "Pencil hardness", detail: "Cured film hardness on the standard scale" },
    { id: "ch2", value: 112, suffix: "°", label: "Contact angle", detail: "Measured on a coated panel after full cure" },
    { id: "ch3", value: 5, suffix: "yrs", label: "Typical service life", detail: "Tiered by system, stated in your warranty" },
  ],
  actions: [
    { label: "Get a coating quote", href: "/quote", intent: "primary" },
    { label: "See correction work", href: "/gallery", intent: "secondary" },
  ],

  sections: [
    {
      id: "cc-what",
      eyebrow: "What it is",
      title: "Chemistry, not a product on a shelf",
      body:
        "The coating arrives as a solvent-carried silicon dioxide resin. Applied to clean, bare clear coat it flashes off its carrier and cross-links — silicon and oxygen forming a lattice that keys into the microscopic texture of your paint. What is left is a few microns of glass-like film with its own hardness, its own chemical resistance and its own surface energy, sitting above your clear coat and taking the abuse first.",
      bullets: [
        "Multi-layer nanotechnology application creating a 9H hardness glass barrier",
        "Bonds chemically to clear coat rather than sitting on it like wax",
        "Bonds equally to paint, metal and glass, so wheels and windows are covered too",
        "Optically clear — it deepens gloss without adding colour",
        "Removable only by machine abrasion, not by washing or solvent",
      ],
      motif: "coating-layers",
    },
    {
      id: "cc-chem",
      eyebrow: "Chemical resistance",
      title: "The things that etch paint stop reaching it",
      body:
        "Bird droppings are acidic and hot enough in Highveld sun to etch clear coat within hours. Bug residue, tree sap, industrial fallout, brake dust and the alkaline detergents at automated washes all attack a paint surface chemically. A cured ceramic film resists a far wider pH range than clear coat does, so those attacks land on a sacrificial layer instead.",
      bullets: [
        "Broad pH stability — resists both acidic fallout and alkaline detergent",
        "Bird and insect etching prevented if removed within a reasonable window",
        "Iron fallout and brake dust rinse away instead of embedding",
        "Fuel spill at the filler neck wipes off rather than staining",
      ],
      motif: "shield",
    },
    {
      id: "cc-uv",
      eyebrow: "UV protection",
      title: "Oxidation is a slow fire. This is the blanket.",
      body:
        "South African ultraviolet load is punishing. Clear coat contains UV absorbers that deplete over years; once they are gone, oxidation begins, pigment fades and single-stage reds and blacks chalk. A ceramic film is UV-stable and absorbs the exposure that would otherwise consume your clear coat's own protection, which is why coated cars hold their colour and their gloss far longer.",
      bullets: [
        "Shields clear coat's UV absorbers from depletion",
        "Slows oxidation, chalking and pigment fade",
        "Particularly valuable on reds, blacks and matte finishes",
        "Also stabilises coated plastic trim, which is where fade shows first",
      ],
      motif: "sparkle",
      media: {
        src: "/work/panamera/polish-flank.webp",
        alt: "A coated black Porsche flank returning the yard behind it without distortion",
        ratio: 16 / 9,
        motif: "sparkle",
        caption: "Coated flank, twelve months on",
      },
    },
    {
      id: "cc-hydro",
      eyebrow: "Hydrophobic behaviour",
      title: "Why the water looks like that",
      body:
        "Surface energy decides whether water spreads out or pulls into beads. Ceramic drops the paint's surface energy far enough that water contracts into tight, high-contact-angle beads which run off under their own weight, dragging loose dirt with them. This is not cosmetic — it is why a coated car comes out of a rainstorm cleaner than it went in, and why it dries without a water spot.",
      bullets: [
        "Contact angle above 110° — water beads tightly and self-releases",
        "Self-cleaning effect in rain; far less road film retained",
        "Drying is faster with less mechanical contact, so fewer wash marks",
        "Mineral spotting is reduced because water leaves rather than evaporating in place",
      ],
      motif: "droplet",
      media: {
        src: "/work/panamera/foam-badge.webp",
        alt: "Snow foam pulling into beads and running off the coated rear quarter of a Porsche around the e-hybrid badge",
        ratio: 16 / 9,
        motif: "droplet",
        caption: "Contact angle, coated rear quarter",
      },
    },
    {
      id: "cc-scratch",
      eyebrow: "Scratch resistance",
      title: "An honest account of hardness",
      body:
        "A cured coating is harder than clear coat and it genuinely resists the light marring that washing inflicts — the fine swirls that dull a finish over a few years. It will not stop a key, a trolley, a stone chip or a careless automated wash brush. Anyone who tells you their coating makes paint scratch-proof is selling you something we do not sell.",
      bullets: [
        "Resists wash-induced micro-marring, the main cause of dulling",
        "Adds a measurable sacrificial layer above your clear coat",
        "Does not prevent impact damage, stone chips or deliberate scratches",
        "Pairs well with paint protection film on high-impact panels",
      ],
      motif: "polisher",
      media: {
        src: "/work/i8/after-gloss-panel.webp",
        alt: "A coated dark panel returning a tree and open sky as one undistorted image",
        ratio: 16 / 9,
        motif: "sparkle",
        caption: "Coated clear coat, sky returned whole",
      },
    },
    {
      id: "cc-value",
      eyebrow: "Long-term value",
      title: "It is cheaper than the alternative",
      body:
        "A coating is a single outlay measured against several years of quarterly waxing, faster paint deterioration and a duller car at trade-in time. Coated cars wash faster, need no sealant top-ups, and present better when they are sold. On a vehicle you intend to keep past three years, the coating usually costs less than the wax and correction it replaces.",
      bullets: [
        "Replaces years of sealant and wax applications",
        "Washing takes noticeably less time and less contact",
        "Paint condition at resale is visibly better than an uncoated equivalent",
        "Correction done once, at the start, rather than repeatedly",
      ],
      motif: "gloss-meter",
      media: {
        src: "/work/bmw7/before-bonnet.webp",
        alt: "Raking sunlight across an uncoated black bonnet showing the haze left by years of automated washing",
        ratio: 16 / 9,
        motif: "gloss-meter",
        caption: "Unprotected, after years of automatic washing",
      },
    },
    {
      id: "cc-gloss",
      eyebrow: "Gloss & depth",
      title: "The coating does not add shine. It stops taking it away.",
      body:
        "A cured ceramic layer has a higher refractive index than bare clear coat and it is optically flatter, so light entering it is returned as one clean image rather than scattered by the micro-texture underneath. That is what people read as depth — the sense that you are looking into dark paint rather than at it. The catch is that a coating is transparent and perfectly faithful: it magnifies whatever surface it is laid over. On corrected paint that is the whole point. On swirled paint it preserves the swirls in high resolution for five years, which is exactly why we will not coat a car we have not corrected first.",
      bullets: [
        "Higher refractive index than bare clear coat — light returns as one image",
        "Optically flat film fills nothing, but scatters nothing either",
        "Typical measured gain of 15 to 25 gloss units over corrected paint",
        "Faithful to what is underneath — which is why correction comes first",
      ],
      motif: "sparkle",
      media: {
        src: "/work/panamera/polish-rear.webp",
        alt: "A coated black Porsche photographed from above the rear quarter, the reflection staying straight through the curve",
        ratio: 16 / 9,
        motif: "gloss-meter",
        caption: "Reflection held through the curve",
      },
    },
    {
      id: "cc-substrates",
      eyebrow: "Beyond the paint",
      title: "Glass, wheels, trim and plastics each get their own chemistry",
      body:
        "Coating only the painted panels solves a quarter of the problem. Glass is the surface you look through in the rain; wheels take more chemical and thermal punishment than anything else on the car; exterior trim is the first thing to chalk and go grey; and plastic headlight lenses yellow under ultraviolet until the beam pattern collapses. Each of those substrates needs a different formulation with a different bond mechanism and a different service life, so they are quoted and applied as separate treatments — not as one bottle wiped over everything.",
      bullets: [
        "Glass coating — rain clears at speed, wipers go quiet, no more etched water spots",
        "Wheel and caliper coating — heat-stable, so brake dust releases under a rinse rather than baking on",
        "Exterior trim and rubber — a coating that stops the chalking and greying, not a dressing that washes off",
        "Headlight lenses — restored, then sealed with a fresh ultraviolet layer to hold clarity",
        "Wrap and PPF-safe systems where the car is already filmed",
      ],
      motif: "window",
      media: {
        src: "/work/sl65/windscreen-coating.webp",
        alt: "A ceramic glass coating being worked across a windscreen with a block applicator",
        ratio: 16 / 9,
        motif: "window",
        caption: "Glass coated on its own chemistry",
      },
    },
    {
      id: "cc-care",
      eyebrow: "Living with it",
      title: "Washing a coated car is a genuinely different job",
      body:
        "This is the benefit owners actually notice, and it is the one nobody puts in the brochure. Because contamination cannot key into a slick, low-energy surface, it sits on top waiting to be rinsed away instead of bonding to the clear coat. The pre-soak does most of the work. The contact wash becomes shorter and gentler, which matters enormously, because contact is what put the swirl marks there in the first place. Brake dust releases from coated wheels. Bugs come off the front bar without a soak. What used to be a careful two hours becomes a comfortable forty minutes.",
      bullets: [
        "Most soiling leaves during the pre-soak, before anything touches the paint",
        "Shorter, lighter contact washing — the single biggest cause of new defects",
        "Brake dust releases from coated wheel faces under a rinse",
        "No more drying marks: water sheets off rather than sitting in droplets to evaporate",
        "A ceramic booster at each maintenance visit restores the contact angle",
      ],
      motif: "microfibre",
      media: {
        src: "/work/panamera/foam-crest.webp",
        alt: "Snow foam breaking and running off a coated bonnet, taking the soiling with it",
        ratio: 16 / 9,
        motif: "foam-cannon",
        caption: "Most of it leaves in the pre-soak",
      },
    },
  ],

  benefits: [
    { id: "cb1", title: "Chemical resistance", body: "Acidic fallout, alkaline detergents, bug residue and sap land on the coating instead of your clear coat.", motif: "shield", metric: "Broad pH" },
    { id: "cb2", title: "UV stability", body: "Absorbs the ultraviolet load that would otherwise deplete your paint's own protection and start oxidation.", motif: "sparkle", metric: "Anti-oxidation" },
    { id: "cb3", title: "Hydrophobic surface", body: "Water beads and self-releases, taking road film with it and leaving far less spotting behind.", motif: "droplet", metric: "112°" },
    { id: "cb4", title: "Marring resistance", body: "A harder sacrificial layer takes the light contact damage that ordinarily dulls paint over a few seasons.", motif: "polisher", metric: "9H film" },
    { id: "cb5", title: "Effortless washing", body: "Contamination has less to bond to, so a maintenance wash is quicker and needs far less mechanical contact.", motif: "microfibre", metric: "Half the time" },
    { id: "cb6", title: "Held gloss", body: "Corrected paint under a stable film keeps its reflection sharp instead of softening year on year.", motif: "gloss-meter", metric: "94 GU" },
  ],

  packages: [
    {
      id: "cp1",
      name: "Coating · Two year",
      summary: "Single-layer system on corrected paint. The sensible entry point for a daily driver.",
      priceFrom: null,
      priceNote: "Quoted after inspection",
      duration: "1–2 days",
      includes: ["Decontamination wash, iron and tar removal", "Clay treatment", "Single-stage machine polish", "One coating layer on paint", "Glass and wheel faces coated", "Written two-year warranty"],
      featured: false,
    },
    {
      id: "cp2",
      name: "Coating · Five year",
      summary: "Multi-layer system over two-stage correction. Our most requested package.",
      priceFrom: null,
      priceNote: "Quoted after inspection",
      duration: "2–3 days",
      includes: ["Full decontamination and clay treatment", "Two-stage correction — cut and refine", "Base coat plus top coat on paint", "Glass, wheels, calipers and exterior trim coated", "Interior leather and fabric protection", "Written five-year warranty and annual inspection"],
      featured: true,
    },
    {
      id: "cp3",
      name: "Coating · Concours",
      summary: "For collections, show cars and anything with paint that cannot be replaced.",
      priceFrom: null,
      priceNote: "Quoted after inspection",
      duration: "4–6 days",
      includes: ["Paint depth mapped panel by panel before any correction", "Three-stage correction to a defined finish", "Multi-layer coating with sacrificial top layer", "Every exterior surface coated including underbonnet", "Full photographic and measurement record", "Annual maintenance detail included"],
      featured: false,
    },
  ],

  steps: [
    { id: "cs1", index: 1, title: "Inspection & paint mapping", body: "Depth gauge readings panel by panel, defect assessment under multiple light sources, and an honest conversation about what correction is safe.", duration: "45–90 min", motif: "gloss-meter", detail: ["Clear coat thickness recorded per panel", "Previous repairs and thin areas flagged", "Achievable finish agreed in writing before work starts"] },
    { id: "cs2", index: 2, title: "Decontamination", body: "Chemical decontamination for iron and tar, then a mechanical clay treatment to shear off anything still bonded to the surface.", duration: "2–3 hours", motif: "foam-cannon", detail: ["Pre-soak and dwell to soften road film", "Iron remover and tar solvent, rinsed to neutral", "Clay treatment on lubricated paint"] },
    { id: "cs3", index: 3, title: "Correction", body: "Machine polishing in defined stages, working to a target finish rather than until the panel looks acceptable under bad light.", duration: "6–20 hours", motif: "polisher", detail: ["Test section sets pad and compound combination", "Cut stage removes defects, refine stage removes cut haze", "Progress checked under raking and cross-polarised light"] },
    { id: "cs4", index: 4, title: "Panel wipe", body: "Every surface stripped of polishing oils with a prep solvent so the coating bonds to bare clear coat and defects cannot be hidden.", duration: "1–2 hours", motif: "microfibre", detail: ["Solvent wipe removes all polishing residue", "Final inspection with oils gone — no filled defects", "Vehicle moved into controlled coating conditions"] },
    { id: "cs5", index: 5, title: "Coating application", body: "Applied panel by panel, levelled in the flash window, inspected at a raking angle for high spots before moving on.", duration: "3–6 hours", motif: "shield", detail: ["Controlled temperature and humidity", "Panel-by-panel application and levelling", "Raking-light inspection for streaks and high spots"] },
    { id: "cs6", index: 6, title: "Cure & handover", body: "The film sets overnight before the car leaves, and you go home with the readings, the warranty and the wash media that will not undo the work.", duration: "12–24 hours", motif: "sparkle", detail: ["Overnight cure indoors, out of dew and dust", "Post-coating gloss and contact angle recorded", "Aftercare pack and maintenance schedule issued"] },
  ],

  lifespan: [
    { id: "cl1", label: "Two-year system", value: "24–30 months", note: "Single layer, daily driver, washed correctly" },
    { id: "cl2", label: "Five-year system", value: "5–7 years", note: "Multi-layer over full correction, garaged where possible" },
    { id: "cl3", label: "Full hardness", value: "7 days", note: "Touch-dry in hours; avoid washing for the first week" },
    { id: "cl4", label: "Annual inspection", value: "Every 12 months", note: "Required to keep the warranty live; usually free" },
  ],

  maintenance: {
    title: "Keeping a coating alive",
    body:
      "Coatings fail from bad washing far more often than from age. The film is chemically tough but it can be abraded, and automated brush washes will take years off it in a single pass.",
    items: [
      "Two-bucket contact wash with a pH-neutral shampoo, or a touchless rinse",
      "Never use an automated brush wash — it is the single fastest way to ruin the finish",
      "Dry with a clean plush towel or filtered blower, never a chamois dragged across dry paint",
      "Remove bird droppings and bug residue within a day; the coating buys time, not immunity",
      "Book the annual inspection — a topper reset costs a fraction of a re-coat",
    ],
  },

  difference: {
    eyebrow: "The difference",
    title: "Half a bonnet tells the whole story.",
    body:
      "Paint that looks smooth is not. At the scale airflow cares about, uncorrected clear coat is a landscape of peaks and valleys, and every one of them trips the air passing over it.",
    media: {
      src: "/profile/automotive-aerodynamics.webp",
      alt: "Split comparison of a car with and without ceramic coating, showing laminar airflow against turbulent airflow and the resulting drag difference",
      ratio: 1536 / 856,
    },
    withoutLabel: "Without ceramic coating",
    withoutBody:
      "Microscopic paint surface roughness causes turbulent airflow, increasing skin friction and drag — and giving contamination somewhere to bond while it does.",
    withLabel: "With ceramic coating",
    withBody:
      "An ultra-smooth, hydrophobic surface minimises skin friction and promotes attached flow, for lower drag and greater aerodynamic stability at speed.",
    headline: {
      value: "Up to 2–4%",
      label: "Aerodynamic drag reduction",
      qualifier:
        "Perfect Detailing's published figure, alongside up to 2–4% track efficiency improvement. Savings and benefits vary based on driving conditions, environmental conditions and coating quality. On a road car this is a bonus rather than a reason to book — the reasons to book are the chemical resistance, the UV stability and the wash that takes half as long.",
    },
    benefits: [
      { id: "cd1", title: "Reduced drag & turbulence", body: "A smoother surface lowers skin friction and turbulent airflow.", motif: "coupe" },
      { id: "cd2", title: "Better energy efficiency", body: "Less dynamic drag contributes to fuel economy and energy use.", motif: "gloss-meter" },
      { id: "cd3", title: "More predictable handling", body: "Attached flow supports stable behaviour at sustained high speed.", motif: "sparkle" },
      { id: "cd4", title: "Long-term protective barrier", body: "The ceramic layer takes chemical attack, UV, etching and bird droppings.", motif: "shield" },
      { id: "cd5", title: "Easier to clean", body: "Hydrophobic properties reject dirt, dust and bugs with far less effort.", motif: "microfibre" },
    ],
  },

  faqIds: ["faq-ceramic-1", "faq-ceramic-2", "faq-ceramic-3", "faq-ceramic-4", "faq-ceramic-5", "faq-ceramic-6"],

  seo: {
    title: "Ceramic Coating",
    description:
      "Professional ceramic coating in Gauteng. Multi-stage paint correction, bonded SiO₂ protection, written warranty and measured results on paint, glass and wheels.",
    keywords: ["ceramic coating Witbank", "ceramic coating car Mpumalanga", "9H ceramic coating", "paint protection South Africa", "SiO2 coating", "hydrophobic car coating"],
    ogImageText: "Bonded, not applied",
  },
};
