import type {
  AboutContent,
  ContactPageContent,
  FaqPageContent,
  GalleryPageContent,
  ProcessContent,
  QuotePageContent,
  ReviewsPageContent,
} from "@/content/types";

export const about: AboutContent = {
  hero: {
    eyebrow: "A decade of surface care",
    title: "We stopped repairing damage and started preventing it.",
    lede:
      "Perfect Detailing began in vehicle repair. Years of putting surfaces right after they had failed taught us something obvious in hindsight: almost all of that damage was preventable, and the customer would rather have never had it. So we made a deliberate move from reactive repair to proactive protection.",
    media: {
      src: "/work/poster/paint-correction.webp",
      alt: "A Perfect Detailing technician running a rotary polisher across the bonnet of a black Mercedes-AMG",
      ratio: 16 / 9,
      motif: "polisher",
      caption: "Cut stage, in our own bay",
    },
  },
  story: {
    title: "From putting it right to keeping it right",
    paragraphs: [
      "A decade in vehicle repair and surface care gives you an unusual view of the problem. You see the same failures arrive over and over — oxidised paint, etched glass, chalked gelcoat, hazed panels — and you notice that by the time the work reaches you, the owner has already lost most of the value they were trying to protect.",
      "Building on that foundation, and on the customer relationships that came with it, we made a strategic decision: move from purely reactive repair to proactive, premium surface protection and restoration. The skills transfer directly. The difference is that the work now happens before the damage instead of after it.",
      "That shift opened up sectors a repair shop never touches. The same chemistry and the same discipline that protect a bonnet also protect an airframe at altitude, a hull in salt water, a photovoltaic module losing yield to dust, and a facade quietly costing a building its cooling budget. Each needed its own products and its own method, and each took time to learn properly.",
      "We are surface care specialists, and we are committed to delivering more than a clean result. Your assets — whether mobility or structural — are valuable, and they deserve to be treated that way. What has not changed since the repair days is the method: measure it, correct it, protect it, measure it again, then hand over the readings.",
    ],
    media: {
      src: "/work/panamera/clay-bar.webp",
      alt: "A gloved hand drawing a clay bar across a foamed black panel beside the Porsche crest",
      ratio: 9 / 16,
      motif: "microfibre",
      caption: "Decontamination, before anything is corrected",
    },
  },
  principles: {
    eyebrow: "How we work",
    title: "Four rules we do not bend.",
    items: [
      {
        id: "p1",
        title: "Measure before you touch",
        body: "Paint depth, gloss units, contact angle, string output. If we cannot measure the starting point, we cannot prove the improvement, and neither can you.",
        motif: "gloss-meter",
      },
      {
        id: "p2",
        title: "Never coat over a defect",
        body: "A coating preserves whatever is underneath it for years. Applying one over swirls or embedded contamination is not protection, it is preservation of a problem.",
        motif: "shield",
      },
      {
        id: "p3",
        title: "Say no to the wrong job",
        body: "Some paint is too thin to correct safely. Some panels are past coating. We will tell you that and quote for what is actually appropriate, even when it is a smaller invoice.",
        motif: "droplet",
      },
      {
        id: "p4",
        title: "Claim only what we can show",
        body: "We will not put a fuel-burn figure on an aircraft wash or promise your solar array a number we have not measured on your roof. Overstated claims are how this industry lost its credibility.",
        motif: "sparkle",
      },
    ],
  },
  standards: {
    eyebrow: "Our standards",
    title: "The specifics, since everyone claims to be thorough.",
    lede:
      "These are the things we do on every job regardless of price, because they are the difference between detailing and washing.",
    items: [
      { id: "st1", label: "Water", value: "Deionised only", note: "Zero dissolved solids, so nothing dries into a spot or etches glass" },
      { id: "st2", label: "Wash media", value: "Fresh per panel", note: "Grit carried between panels is the leading cause of wash marring" },
      { id: "st3", label: "Correction", value: "Depth-gauged", note: "Clear coat measured before, during and after every correction stage" },
      { id: "st4", label: "Inspection light", value: "Three sources", note: "Raking, cross-polarised and daylight-balanced — defects hide under one light" },
      { id: "st5", label: "Coating conditions", value: "Controlled", note: "Temperature and humidity checked before any coating is opened" },
      { id: "st6", label: "Handover", value: "Written readings", note: "Before and after figures issued on every job, not on request" },
    ],
  },
  team: {
    enabled: false,
    eyebrow: "The people",
    title: "Who will actually be on your site.",
    lede:
      "Team profiles are managed in the portal. Switch this section on once you have added photographs and bios.",
    members: [],
  },
  cta: {
    title: "Come and look at the work.",
    body:
      "We would rather you inspected a coated car in daylight than read another paragraph about it. Tell us where you are and we will arrange it.",
    actions: [
      { label: "Get in touch", href: "/contact", intent: "primary" },
      { label: "See the gallery", href: "/gallery", intent: "secondary" },
    ],
  },
};

export const process: ProcessContent = {
  hero: {
    eyebrow: "Method",
    title: "Eight stages. The same eight, every time.",
    lede:
      "The materials change between a bonnet, a wing and a photovoltaic module — the sequence does not. This is what happens between the moment we arrive and the moment you sign.",
  },
  steps: [
    {
      id: "pr1",
      index: 1,
      title: "Inspection",
      body: "Before anything is touched we record the starting condition: paint depth or glass state, defect type and severity under three light sources, existing damage, and a baseline reading we can measure against later.",
      duration: "30–90 min",
      motif: "gloss-meter",
      detail: [
        "Substrate measured — clear coat depth, or baseline string output on solar",
        "Defects catalogued under raking, cross-polarised and daylight light",
        "Existing damage photographed so nothing is disputed later",
        "Achievable outcome agreed and written down before work begins",
      ],
      media: {
        src: "/work/panamera/polish-before.webp",
        alt: "A black Porsche standing on a wet workshop floor under inspection lighting before any work begins",
        ratio: 16 / 9,
        motif: "gloss-meter",
        caption: "Stage 01 — baseline recorded",
      },
    },
    {
      id: "pr2",
      index: 2,
      title: "Cleaning",
      body: "Decontamination in the proper order — pre-soak, foam, contact wash with fresh media, then chemical removal of iron and tar. Deionised water throughout so nothing dries into the surface we are about to protect.",
      duration: "1–3 hours",
      motif: "foam-cannon",
      detail: [
        "Pre-soak and dwell to soften bonded road film",
        "Two-bucket contact wash, media changed per panel or section",
        "Iron and tar dissolved chemically, rinsed to neutral",
        "Deionised final rinse — zero dissolved solids left behind",
      ],
      media: {
        src: "/work/panamera/foam-car.webp",
        alt: "A car under a full covering of snow foam, left to dwell during the pre-soak",
        ratio: 16 / 9,
        motif: "foam-cannon",
        caption: "Stage 02 — foam dwell, contact wash",
      },
    },
    {
      id: "pr3",
      index: 3,
      title: "Correction",
      body: "Machine polishing to a defined finish. A test section establishes the least aggressive combination that achieves the result, then that combination is worked across the vehicle in stages — cut, then refine.",
      duration: "2–20 hours",
      motif: "polisher",
      detail: [
        "Test section sets pad, compound and machine before full work starts",
        "Cut stage removes defects; refine stage removes the cut's own haze",
        "Depth re-checked as work progresses — we stop where it is safe",
        "Complex curves and edges worked by hand where a machine is a risk",
      ],
      media: {
        src: "/work/poster/paint-correction.webp",
        videoSrc: "/video/paint-correction.mp4",
        alt: "A technician machine-polishing a black bonnet with a rotary and cutting pad",
        ratio: 16 / 9,
        motif: "polisher",
        caption: "Stage 03 — cut, then refine",
      },
    },
    {
      id: "pr4",
      index: 4,
      title: "Preparation",
      body: "Every surface is stripped with a prep solvent so the coating bonds to bare substrate. This is also the honest inspection: with the polishing oils gone, nothing is hidden.",
      duration: "45 min – 2 hours",
      motif: "microfibre",
      detail: [
        "Solvent wipe removes all polishing residue and handling oils",
        "Final defect inspection with nothing filled or masked",
        "Trim, glass and adjacent surfaces masked where required",
        "Environment checked — temperature, humidity, dust, light",
      ],
      media: {
        src: "/work/panamera/clay-bar.webp",
        alt: "A gloved hand drawing a clay bar across a lubricated panel to strip it back to bare substrate",
        ratio: 9 / 16,
        motif: "microfibre",
        caption: "Stage 04 — stripped to bare substrate",
      },
    },
    {
      id: "pr5",
      index: 5,
      title: "Ceramic application",
      body: "Coating is applied in controlled sections, levelled inside its flash window and inspected at a raking angle before we move on. High spots are far easier to fix in the next sixty seconds than the next morning.",
      duration: "1–8 hours",
      motif: "shield",
      detail: [
        "Applied section by section so nothing flashes before it is levelled",
        "Levelled to a uniform film with fresh media",
        "Raking-light inspection of every section before moving on",
        "Additional layers applied at the correct interval where specified",
      ],
      media: {
        src: "/work/sl65/windscreen-coating.webp",
        alt: "Coating worked across a windscreen with a block applicator and levelled inside its flash window",
        ratio: 16 / 9,
        motif: "shield",
        caption: "Stage 05 — levelled inside the flash window",
      },
    },
    {
      id: "pr6",
      index: 6,
      title: "Curing",
      body: "The film needs undisturbed time to cross-link. Vehicles stay indoors overnight, aircraft stay in the hangar, and solar arrays are scheduled around the forecast so the coating gets a dry window.",
      duration: "2–24 hours",
      motif: "coating-layers",
      detail: [
        "Protected from dew, dust and rain through the initial set",
        "Ambient conditions monitored across the cure window",
        "Full hardness continues developing for up to seven days",
        "Nothing washed, wiped or driven through weather before it is ready",
      ],
      media: {
        src: "/work/sl65/after-detailing.webp",
        alt: "A coated car left undisturbed indoors while the film cross-links",
        ratio: 16 / 9,
        motif: "coating-layers",
        caption: "Stage 06 — indoors, undisturbed",
      },
    },
    {
      id: "pr7",
      index: 7,
      title: "Quality inspection",
      body: "The same instruments come back out. Gloss, contact angle and — on solar — a post-coating string reading, compared against the baseline we took in stage one. If a section does not pass, it is redone before you see it.",
      duration: "30–60 min",
      motif: "sparkle",
      detail: [
        "Gloss units measured at the same points as the baseline",
        "Water behaviour tested and recorded",
        "Full walk-around under the same three light sources",
        "Anything below standard is corrected before handover, not after",
      ],
      media: {
        src: "/work/panamera/polish-flank.webp",
        alt: "The yard reflected without distortion along a finished coated flank",
        ratio: 16 / 9,
        motif: "gloss-meter",
        caption: "Stage 07 — measured against stage one",
      },
    },
    {
      id: "pr8",
      index: 8,
      title: "Customer handover",
      body: "We walk it with you in good light, hand over the readings and the warranty, explain exactly what will and will not keep the finish alive, and give you the wash media to do it with.",
      duration: "20–30 min",
      motif: "microfibre",
      detail: [
        "Before and after readings issued in writing",
        "Warranty terms explained and handed over, not emailed later",
        "Aftercare pack with the correct shampoo and drying media",
        "Next service date suggested and diarised if you want it",
      ],
      media: {
        src: "/work/panamera/polish-rear.webp",
        alt: "A finished car photographed in good light before it is handed back to its owner",
        ratio: 16 / 9,
        motif: "sparkle",
        caption: "Stage 08 — readings, warranty, wash media",
      },
    },
  ],
  guarantee: {
    title: "If it is not right, it is not finished",
    body:
      "Every coating carries a written warranty, and every job carries a simpler promise: if something we applied is not performing the way we said it would, we come back and deal with it.",
    points: [
      "Written warranty terms issued on the day, in your name",
      "Annual inspections included for the life of the coating",
      "Spot repairs on failed sections at no charge inside the warranty period",
      "If we cannot achieve what we quoted, you are told before we invoice, not after",
    ],
  },
  cta: {
    title: "Ready to start at stage one?",
    body: "Every job begins with an inspection. Tell us what we are looking at and we will book it in.",
    actions: [
      { label: "Get a quote", href: "/quote", intent: "primary" },
      { label: "Ask a question", href: "/contact", intent: "secondary" },
    ],
  },
};

export const galleryPage: GalleryPageContent = {
  hero: {
    eyebrow: "Recent work",
    title: "Our own cars, our own bay, our own phone.",
    lede:
      "Nothing on this page was bought from a stock library or borrowed from a supplier. It is a working record — correction in progress, foam breaking on a coated panel, water refusing to sit still, and cars going back to their owners. Shot in daylight and workshop light, unretouched.",
  },
  categories: [
    { id: "gc0", label: "All work", slug: "all" },
    { id: "gc1", label: "Paint correction", slug: "correction" },
    { id: "gc2", label: "Ceramic coating", slug: "ceramic" },
    { id: "gc3", label: "Finished vehicles", slug: "automotive" },
    { id: "gc4", label: "Interiors", slug: "interiors" },
    { id: "gc5", label: "Wheels, bays & trim", slug: "detail" },
  ],
  beforeAfterTitle: "Before and after",
  emptyState: "No work in this category yet. Try another filter.",
};

export const reviewsPage: ReviewsPageContent = {
  hero: {
    eyebrow: "Reviews",
    title: "Reviewed by the people who paid for it.",
    lede:
      "These are collected after the job, not during it — and we publish the whole set rather than a curated top five. Every review is tied to a real invoice.",
  },
  summary: {
    averageLabel: "Average rating",
    countLabel: "Reviews collected",
    breakdownLabel: "Rating breakdown",
  },
  trustIndicators: [
    { id: "ti1", label: "Verified against invoices", detail: "Every review matched to a completed job" },
    { id: "ti2", label: "Published unedited", detail: "We do not filter out the critical ones" },
    { id: "ti3", label: "Collected after handover", detail: "Requested a week later, never on the day" },
    { id: "ti4", label: "Replies on record", detail: "Where something went wrong, our response is public" },
  ],
  cta: {
    title: "Join them.",
    body: "Tell us what needs protecting and we will send a written quote within one working day.",
    actions: [
      { label: "Get a quote", href: "/quote", intent: "primary" },
      { label: "Call us", href: "/contact", intent: "secondary" },
    ],
  },
};

export const faqPage: FaqPageContent = {
  hero: {
    eyebrow: "Answers",
    title: "The questions we actually get asked.",
    lede:
      "Written by the people who do the work, not by a marketing department. Where the honest answer is 'it depends', we say so and explain what it depends on.",
  },
  categories: [
    { id: "fq0", slug: "general", label: "General", blurb: "Booking, areas we cover, payment and how we work." },
    { id: "fq1", slug: "solar", label: "Solar coating", blurb: "Pricing, efficiency claims, cleaning cycles and lifespan." },
    { id: "fq2", slug: "ceramic", label: "Ceramic coating", blurb: "What it does, what it does not do, and how long it lasts." },
    { id: "fq3", slug: "automotive", label: "Automotive", blurb: "Correction, interiors, headlights and maintenance." },
    { id: "fq4", slug: "aircraft", label: "Aircraft", blurb: "Dry washing, scope, compliance and scheduling." },
    { id: "fq6", slug: "marine", label: "Marine", blurb: "Gelcoat, salt, fouling and running gear." },
    { id: "fq7", slug: "windows", label: "Architectural glass", blurb: "Self-cleaning, heat rejection and etch prevention." },
    { id: "fq5", slug: "fleet", label: "Fleet", blurb: "Cycles, downtime, wraps and invoicing." },
  ],
  cta: {
    title: "Still not answered?",
    body: "Send the question through. We answer them personally, usually within a few hours.",
    actions: [
      { label: "Ask us directly", href: "/contact", intent: "primary" },
      { label: "Get a quote", href: "/quote", intent: "secondary" },
    ],
  },
};

export const contactPage: ContactPageContent = {
  hero: {
    eyebrow: "Contact",
    title: "Talk to the person who will do the work.",
    lede:
      "There is no call centre and no enquiry queue. Whichever channel you use, you are speaking to someone who has held a polisher. Our team responds promptly — usually the same working day.",
  },
  channels: [
    { id: "ch1", kind: "phone", label: "Call", value: "", href: "", note: "Fastest between 07:00 and 17:00 on weekdays" },
    { id: "ch2", kind: "whatsapp", label: "WhatsApp", value: "", href: "", note: "Best for photographs — send us what we are looking at" },
    { id: "ch3", kind: "email", label: "Email", value: "", href: "", note: "For scopes, fleet proposals and anything needing a paper trail" },
    { id: "ch4", kind: "form", label: "Send a message", value: "Use the form", href: "#enquiry", note: "Goes straight into our job board, not an inbox" },
  ],
  form: {
    title: "Send us the details",
    lede:
      "The more you tell us, the more accurate the quote. Vehicle and registration, panel count, aircraft type — whatever applies.",
    consentNote:
      "We use these details to prepare your quote and nothing else. No lists, no third parties, no marketing you did not ask for.",
    successTitle: "Received — reference on its way",
    successBody:
      "Your enquiry is in our job board with a reference number. You will hear from a person within one working day, usually sooner.",
    submitLabel: "Send enquiry",
  },
  addressCard: {
    title: "Come to the shop, or have us come to you",
    body:
      "Our workshop and product shop are in Witbank, Mpumalanga — come in for coatings, aftercare products and advice from someone who actually applies them. Detailing and coating work itself is done on site wherever the asset lives: your driveway, your yard, your roof, your hangar or your mooring. Our units carry their own water, power, lighting and containment, so we need nothing from you but access.",
  },
};

export const quotePage: QuotePageContent = {
  hero: {
    eyebrow: "Quotes",
    title: "Price your array in ten seconds. Everything else, in one day.",
    lede:
      "Solar panel coating is priced per panel, so you can work it out yourself right here. For vehicles, aircraft and fleets we need to see what we are dealing with before putting a number on it.",
  },
  calculator: {
    title: "Solar coating calculator",
    lede:
      "Drag the panel count. The figures update live at R280 per panel and roughly ten minutes of coating work per panel, worked by a two-person crew.",
    panelLabel: "Number of panels",
    resultLabels: {
      total: "Total investment",
      perPanel: "Rate per panel",
      duration: "Estimated time on site",
      slot: "Suggested booking",
    },
    slotNote:
      "Slots are indicative. We confirm a date once we have seen roof access and the weather window.",
    disclaimer:
      "This estimate covers preparation, coating and cure for standard rooftop modules at accessible height. Difficult access, heavy mineral scale requiring pre-treatment, or ground-mount arrays are quoted separately after a site visit.",
    crewSize: 2,
    productiveMinutesPerDay: 420,
    minimumOnSiteMinutes: 90,
    volumeBands: [],
  },
  form: {
    title: "Tell us about the job",
    lede:
      "Anything you can add helps — photographs, a registration number, a panel count, an aircraft type or a fleet size.",
    consentNote:
      "Your details are used to prepare this quote and are never shared. We keep them so we can find your job again next year.",
    successTitle: "Quote request logged",
    successBody:
      "We have your details and a reference number. Expect a written quote within one working day — usually the same afternoon.",
    submitLabel: "Request my quote",
  },
  assurances: [
    { id: "qa1", label: "Written, itemised quotes", detail: "You see what each element costs before agreeing to anything" },
    { id: "qa2", label: "No deposit on standard work", detail: "Payment on completion for jobs under R15 000" },
    { id: "qa3", label: "Fixed price once agreed", detail: "The quote is the invoice unless the scope changes in writing" },
    { id: "qa4", label: "One working day turnaround", detail: "Most quotes are back the same afternoon" },
  ],
};
