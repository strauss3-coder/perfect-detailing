import type { ServiceDoc } from "@/content/types";

export const correctionService: ServiceDoc = {
  id: "svc-correction",
  slug: "paint-correction",
  category: "automotive",
  status: "published",
  order: 3,
  name: "Paint Correction",
  shortName: "Correction",
  cardSummary:
    "Multi-stage machine polishing that removes swirls, holograms and etching from the clear coat instead of filling them. Measured before, during and after.",
  motif: "polisher",
  featuredOnHome: true,

  eyebrow: "Cut · Refine · Finish · Verify",
  headline: "Gloss is not something you add. It is something you uncover.",
  lede:
    "A swirled panel is not dirty and it is not dull — it is uneven. Thousands of microscopic valleys in the clear coat scatter light in every direction instead of returning it as one image. Paint correction levels that surface with abrasives on a machine polisher until the reflection is whole again. It is subtractive work on a finite layer, which is why we measure the layer first.",
  heroMedia: {
    src: "/work/glc43/before-flank.webp",
    alt: "Raking sunlight across the uncorrected flank of a black Mercedes-AMG GLC 43, the marring in the clear coat scattering the light",
    ratio: 16 / 9,
    motif: "polisher",
  },
  heroStats: [
    { id: "xh1", value: 3, suffix: "stage", label: "Maximum correction", detail: "Cut, refine and finish, each with its own pad and abrasive" },
    { id: "xh2", value: 94, suffix: "GU", label: "Typical finished gloss", detail: "Measured at 60° on corrected black paint" },
    { id: "xh3", value: 120, suffix: "µm", label: "Typical total film build", detail: "Depth gauged panel by panel before a machine is switched on" },
  ],
  actions: [
    { label: "Book a paint inspection", href: "/quote", intent: "primary" },
    { label: "See correction work", href: "/gallery", intent: "secondary" },
  ],

  sections: [
    {
      id: "pc-what",
      eyebrow: "What you are actually looking at",
      title: "Swirl marks are missing clear coat, not dirt on top of it",
      body:
        "Park a dark car in direct sun and you will see it: a spiderweb of fine circular scratches that seems to rotate around the light source. Each one is a scratch cut into the clear coat by grit dragged across the paint — almost always by an automatic wash, a dirty mitt or a dry chamois. Light entering a scratch bounces off its walls and leaves in the wrong direction. Enough of them and the panel stops returning an image and starts returning a haze. Nothing you spray on removes them, because there is nothing there to remove.",
      bullets: [
        "Swirls and wash marring — fine, circular, worst on horizontal panels",
        "Holograms — a shimmering buffer trail, the signature of a rushed rotary",
        "Etching — bird lime, sap and water spots that have eaten into the clear",
        "Oxidation — a chalked, milky surface on paint left unprotected in the sun",
      ],
      motif: "gloss-meter",
      media: {
        src: "/work/bmw7/before-bonnet.webp",
        alt: "Raking sunlight across an uncoated black bonnet showing the haze and swirl marks left by years of automated washing",
        ratio: 16 / 9,
        motif: "gloss-meter",
        caption: "Uncorrected, after years of automatic washing",
      },
    },
    {
      id: "pc-measure",
      eyebrow: "Before anything is switched on",
      title: "We measure the layer before we start removing it",
      body:
        "Factory clear coat is typically 40 to 60 microns thick — about half the width of a human hair — and it is all you have. Every correction stage takes some of it away, and it never grows back. So the first hour is a gauge and a notebook: readings across every panel, mapped and recorded, with resprayed sections, thin edges and previous polishing flagged. On a car that has been machined badly before, that map is the difference between a safe correction and a burn-through onto primer.",
      bullets: [
        "Electronic depth gauge readings taken across every panel and recorded",
        "Resprays and filler found by the readings before they are found by a pad",
        "Thin edges, swage lines and badge surrounds marked and worked by hand",
        "A panel with nothing to spare is protected as it is — and we tell you so",
      ],
      motif: "shield",
    },
    {
      id: "pc-test",
      eyebrow: "The test section",
      title: "The least aggressive combination that actually works",
      body:
        "Pad and compound are not chosen from a price list; they are found. We tape off a small section on a representative panel and work up from the gentlest combination until defects stop coming out, then settle on the first one that fully clears them. Harder abrasives cut faster and cost you more clear coat, so the goal is always the softest pad and the finest compound that will still do the job. That test section is then shown to you, wiped down beside untouched paint, before the rest of the car is committed.",
      bullets: [
        "A taped 50/50 on a representative panel, worked before anything else",
        "Pad and abrasive stepped up only until the defects clear, never further",
        "Result inspected wet-wiped, with the polishing oils removed",
        "You see the achievable finish beside the current one and approve it",
      ],
      motif: "microfibre",
      media: {
        src: "/work/panamera/polish-progress.webp",
        alt: "A black Porsche flank part-way through correction, compound haze still showing in the reflection",
        ratio: 16 / 9,
        motif: "polisher",
        caption: "Working the agreed combination across the panel",
      },
    },
    {
      id: "pc-stages",
      eyebrow: "How far it goes",
      title: "One stage, two, or three — and what each one buys",
      body:
        "Correction is sold in stages because clear coat is finite and budgets are real. A single stage brightens a tired car and removes the lightest marring in a day. Two stages is where most cars land: a cutting pass to take the defects out, then a refining pass to remove the haze the cutting pass itself leaves behind. Three stages is for dark paint that has to be flawless under a showroom light, finishing with a soft pad and an ultra-fine polish that adds nothing but clarity. We will tell you which one your paint can support, and we will talk you out of the one it cannot.",
      bullets: [
        "Single stage — 60 to 80% defect removal, one day, ideal before resale",
        "Two stage — 85 to 95%, the standard for a car you intend to keep",
        "Three stage — as close to flawless as the paint allows, for dark and show finishes",
        "Wet sanding is available on isolated defects, quoted separately and never casually",
      ],
      motif: "coating-layers",
    },
    {
      id: "pc-light",
      eyebrow: "Inspection",
      title: "Three light sources, because one will lie to you",
      body:
        "Paint that looks perfect under workshop fluorescents can be a mess in sunlight. We check under raking halogen for depth of defect, under cross-polarised light to strip the surface reflection and show what is really left in the clear, and under a daylight-balanced source that matches what you will see in a car park. Every panel is wiped with a solvent between checks so the polishing oils are gone — because oils fill defects temporarily, and a finish inspected through them is a finish you will lose at the first wash.",
      bullets: [
        "Raking halogen for defect depth and direction",
        "Cross-polarised inspection to see past the surface reflection",
        "Daylight-balanced light for the finish you will actually live with",
        "Solvent wipe between stages so nothing is judged through filler oils",
      ],
      motif: "gloss-meter",
      media: {
        src: "/work/bmw7/after-rear-quarter.webp",
        alt: "The corrected rear quarter and tail lamp of a black BMW 7 Series holding a clean reflection through the curve",
        ratio: 16 / 9,
        motif: "sedan",
        caption: "Reflection held through the curve",
      },
    },
    {
      id: "pc-honest",
      eyebrow: "What correction will not do",
      title: "An honest list of the things a polisher cannot fix",
      body:
        "A scratch you can catch with a fingernail is through the clear coat, and levelling the surrounding paint down to meet it would take more than the panel has. Stone chips are missing paint, not displaced paint. Dents are a panel shop's work. Faded plastic trim needs restoring, not polishing. Clear coat that has already begun to peel or flake has failed, and abrasives accelerate it. We would rather show you the limit on the day and quote for what is genuinely achievable than hand back a car that is 80% of what you were promised.",
      bullets: [
        "Deep scratches through the clear coat — improved in appearance, not removed",
        "Stone chips — touched in on request, but they are missing paint",
        "Dents, creases and previous poor bodywork — referred, not disguised",
        "Failed or peeling lacquer — correction is refused; it makes it worse",
      ],
      motif: "droplet",
    },
    {
      id: "pc-protect",
      eyebrow: "Locking it in",
      title: "Correction without protection is a countdown",
      body:
        "A freshly corrected panel is the most vulnerable it will ever be: bare clear coat, stripped of every oil and sealant, with nothing between it and the next wash. That is precisely why correction and coating belong in the same booking. The coating bonds to the surface we have just created and preserves it — and because a coated surface releases dirt rather than gripping it, the washing that put the swirls there in the first place becomes far less damaging. Correct, then protect, then wash properly. Skip the middle step and you will be back inside two years.",
      bullets: [
        "Panel wiped to bare clear coat so nothing is sealed in underneath",
        "Ceramic coating, sealant or wax applied to the surface just created",
        "Coated paint releases contamination, so future washes contact it less",
        "Aftercare media supplied — the wash is what decides how long this lasts",
      ],
      motif: "shield",
      media: {
        src: "/work/i8/after-gloss-panel.webp",
        alt: "A freshly coated dark panel returning a tree and open sky as one undistorted image",
        ratio: 16 / 9,
        motif: "droplet",
        caption: "Corrected, then coated",
      },
    },
  ],

  benefits: [
    { id: "xb1", title: "Defects removed, not filled", body: "Abrasives level the clear coat. Glazes and filler waxes hide the same damage for about three washes and then hand it back.", motif: "polisher", metric: "Permanent" },
    { id: "xb2", title: "Depth-mapped and safe", body: "Gauge readings before and during the work mean we never take more clear coat than the panel can spare.", motif: "gloss-meter", metric: "Measured" },
    { id: "xb3", title: "Colour that reads as depth", body: "A level surface returns one image instead of scattering. Dark paint stops looking grey and starts looking wet.", motif: "sparkle", metric: "+20 GU typical" },
    { id: "xb4", title: "The right base for a coating", body: "A coating preserves whatever is under it for years. Correction is what makes that a good thing rather than a bad one.", motif: "shield", metric: "Bonded to bare" },
    { id: "xb5", title: "Real money at resale", body: "Corrected paint moves a car out of the trade-in conversation and into the private-sale one.", motif: "sedan", metric: "Value held" },
    { id: "xb6", title: "Numbers, not adjectives", body: "Gloss readings at 60° before and after go on your job card, so the improvement is a figure you can check.", motif: "gloss-meter", metric: "Every job" },
  ],

  packages: [
    {
      id: "xp1",
      name: "Enhancement Polish",
      summary: "One stage. For a car in fair condition that needs its colour and clarity back.",
      priceFrom: null,
      priceNote: "Quoted by vehicle size and paint condition",
      duration: "1 day",
      includes: [
        "Full decontamination — iron, tar and clay",
        "Paint depth readings recorded across every panel",
        "Single-stage machine polish, 60–80% defect removal",
        "Six-month sealant on paint and glass",
        "Before and after gloss readings",
      ],
      featured: false,
    },
    {
      id: "xp2",
      name: "Two-Stage Correction",
      summary: "Cut, then refine. The standard for a car you intend to keep.",
      priceFrom: null,
      priceNote: "Quoted after a paint inspection",
      duration: "2–3 days",
      includes: [
        "Depth mapping and a taped test section approved by you",
        "Cutting stage to remove defects, refining stage to remove its haze",
        "Edges, swage lines and badge surrounds finished by hand",
        "Three-light inspection with a solvent wipe between stages",
        "Choice of sealant or ceramic coating over the result",
        "Before and after gloss readings on your job card",
      ],
      featured: true,
    },
    {
      id: "xp3",
      name: "Show Correction",
      summary: "Three stages on dark or show paint, finished with an ultra-fine polish.",
      priceFrom: null,
      priceNote: "Quoted after a paint inspection",
      duration: "3–5 days",
      includes: [
        "Everything in the two-stage correction",
        "A third finishing pass on a soft pad with an ultra-fine polish",
        "Isolated wet sanding where a defect justifies it and the paint allows",
        "Trim, glass and wheel faces corrected and coated to match",
        "Multi-layer ceramic coating with a written warranty",
      ],
      featured: false,
    },
  ],

  steps: [
    { id: "xs1", index: 1, title: "Paint inspection", body: "Depth gauge across every panel, defects catalogued under three light sources, and an honest conversation about what this paint can and cannot support.", duration: "45–90 min", motif: "gloss-meter", detail: ["Readings recorded panel by panel", "Resprays, filler and thin edges flagged", "Achievable finish agreed in writing before work starts"], media: { src: "/work/panamera/polish-before.webp", alt: "A black Porsche standing in the wash bay under inspection lighting before correction begins", ratio: 16 / 9, motif: "gloss-meter", caption: "Stage 01 — depth mapped" } },
    { id: "xs2", index: 2, title: "Decontaminate", body: "Correction over bonded contamination drags it across the paint. Iron, tar and everything embedded comes off first.", duration: "2–3 hours", motif: "foam-cannon", detail: ["Iron remover dissolves ferrous fallout chemically", "Tar softened and lifted with solvent", "Clay treatment on fully lubricated paint"], media: { src: "/work/panamera/clay-bar.webp", alt: "A gloved hand drawing a clay bar across a lubricated black panel", ratio: 9 / 16, motif: "microfibre", caption: "Stage 02 — back to bare paint" } },
    { id: "xs3", index: 3, title: "Test section", body: "A taped 50/50 finds the least aggressive pad and compound that clears the defects, and you approve the result before the car is committed.", duration: "45 min", motif: "microfibre", detail: ["Worked up from the gentlest combination", "Wiped down with solvent so oils cannot flatter it", "Shown to you beside untouched paint"], media: { src: "/work/panamera/polish-arch.webp", alt: "A cleaned and corrected Porsche wheel face and arch, the paint above it holding a clean reflection", ratio: 16 / 9, motif: "polisher", caption: "Stage 03 — combination agreed" } },
    { id: "xs4", index: 4, title: "Cut", body: "The defect removal pass, worked in sections at controlled speed and pressure, checked constantly rather than at the end.", duration: "5–14 hours", motif: "polisher", detail: ["Worked in small sections, never over a whole panel at once", "Pad condition monitored and changed on schedule", "Complex curves and edges taken by hand"], media: { src: "/work/panamera/polish-flank.webp", alt: "The corrected flank of a black Porsche, the reflection running unbroken along its full length", ratio: 16 / 9, motif: "polisher", caption: "Stage 04 — defects levelled" } },
    { id: "xs5", index: 5, title: "Refine", body: "The cutting pass leaves its own micro-haze. A finer abrasive on a softer pad removes it and brings the gloss up.", duration: "3–10 hours", motif: "sparkle", detail: ["Softer pad, finer abrasive, lighter pressure", "Cross-polarised inspection between passes", "Third finishing pass on dark paint where specified"], media: { src: "/work/panamera/polish-rear.webp", alt: "A corrected black Porsche photographed from above the rear quarter, the panels returning a sharp reflection", ratio: 16 / 9, motif: "gloss-meter", caption: "Stage 05 — reflection whole" } },
    { id: "xs6", index: 6, title: "Protect and hand over", body: "Panel wipe to bare clear coat, protection applied to the surface we just built, then the readings and the aftercare that keep it.", duration: "1–5 hours", motif: "shield", detail: ["Solvent wipe removes every trace of polishing oil", "Sealant or ceramic coating applied panel by panel", "Before and after gloss readings handed over with wash media"], media: { src: "/work/panamera/polish-side.webp", alt: "A finished black Porsche photographed outdoors after correction and coating", ratio: 16 / 9, motif: "sparkle", caption: "Stage 06 — handed back" } },
  ],

  lifespan: [
    { id: "xl1", label: "The correction itself", value: "Permanent", note: "The clear coat is level. It stays level until something puts new scratches in it" },
    { id: "xl2", label: "Corrected and left unprotected", value: "12–24 months", note: "Ordinary washing re-marrs bare clear coat surprisingly quickly" },
    { id: "xl3", label: "Corrected and sealed", value: "2–3 years", note: "With a sealant re-applied twice a year and a safe wash method" },
    { id: "xl4", label: "Corrected and ceramic coated", value: "4–6 years", note: "The coating takes the contact damage instead of the clear coat" },
  ],

  maintenance: {
    title: "Keeping a corrected finish",
    body:
      "Correction is a one-off. Keeping it is a habit. Almost every swirl we remove was put there by a wash, which means the way your car is washed from here decides whether this lasts two years or six. We hand over the method and the media, and we would genuinely rather you used them than booked us again sooner.",
    items: [
      "Two buckets, grit guards and a fresh mitt — never a sponge, never a brush",
      "Never an automatic wash, and never a dry wipe on a dusty panel",
      "Pre-soak and foam before anything touches the paint",
      "Dry with a plush drying towel and a drying aid, or force-dry with filtered air",
      "A maintenance detail every six to twelve weeks keeps contact washing to a minimum",
      "An annual inspection on coated cars keeps the warranty live",
    ],
  },

  faqIds: ["faq-corr-1", "faq-corr-2", "faq-corr-3", "faq-corr-4", "faq-corr-5"],

  seo: {
    title: "Paint Correction",
    description:
      "Multi-stage paint correction in Witbank, Mpumalanga. Swirl marks, holograms, etching and oxidation removed from the clear coat by machine, with depth readings and gloss figures on every job card.",
    keywords: [
      "paint correction Witbank",
      "paint correction Mpumalanga",
      "swirl mark removal",
      "machine polishing",
      "car scratch removal eMalahleni",
      "multi-stage correction",
    ],
    ogImageText: "Cut, refine, verify",
  },
};
