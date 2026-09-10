import type { HomeContent } from "@/content/types";

export const home: HomeContent = {
  hero: {
    eyebrow: "Detailing · Paint correction · Ceramic coating",
    headlineLines: ["We don't wash", "cars.", "We correct them."],
    accentWord: "cars.",
    lede:
      "Premium vehicle detailing, multi-stage paint correction and ceramic coating. We level the clear coat, bond protection to the surface we have just built, and hand the car back with gloss readings rather than adjectives.",
    actions: [
      { label: "Book a paint inspection", href: "/quote", intent: "primary" },
      { label: "See the work", href: "/gallery", intent: "secondary" },
    ],
    media: {
      src: "/work/poster/hero-panamera.webp",
      videoSrc: "/video/hero-panamera.mp4",
      alt: "A black Porsche Panamera Sport Turismo in the Perfect Detailing bay, its bodywork holding an unbroken reflection after correction and coating",
      ratio: 16 / 9,
      motif: "coupe",
    },
    readouts: [
      { id: "r1", label: "Gloss", value: "94 GU" },
      { id: "r2", label: "Contact angle", value: "112°" },
      { id: "r3", label: "Film build", value: "2.1 µm" },
    ],
    scrollHint: "Scroll",
  },
  marquee: {
    enabled: true,
    items: [
      "Paint correction",
      "Ceramic coating",
      "Interior restoration",
      "Machine polishing",
      "Engine bays",
      "Wheel & caliper coating",
      "Glass coating",
      "Trim restoration",
      "Headlight restoration",
      "Maintenance plans",
      "Aircraft dry wash",
      "Solar arrays",
    ],
  },
  stats: {
    eyebrow: "What comes through the bay",
    title: "The cars people trust us with.",
    items: [
      {
        id: "s1",
        value: 25,
        prefix: "R",
        suffix: "m+",
        label: "Value of vehicles entrusted to us",
        detail: "The combined worth of what has stood in our bay since 2015.",
      },
      {
        id: "s2",
        value: 400,
        suffix: "+",
        label: "Vehicles corrected and coated",
        detail: "From a daily hatchback to a hybrid supercar — the same sequence on each.",
      },
      {
        id: "s3",
        value: 11,
        suffix: "yrs",
        label: "In surface care",
        detail: "Vehicle repair first, then the deliberate move to protecting paint instead.",
      },
      {
        id: "s4",
        value: 94,
        suffix: "GU",
        label: "Typical finished gloss",
        detail: "Measured at 60° on corrected black paint, before and after.",
      },
    ],
  },
  services: {
    eyebrow: "Capability",
    title: "Everything a car needs, in the order it needs it.",
    lede:
      "Detailing is a sequence, not a menu: decontaminate, correct, protect, then maintain. These five are that sequence — and the specialist divisions for aviation, solar, marine, architectural glass and fleet are one click further in.",
    /* The homepage shows the vehicle sequence. All ten live on /services. */
    featured: [
      "automotive-detailing",
      "ceramic-coating",
      "paint-correction",
      "interior-detailing",
      "maintenance-plans",
    ],
    action: { label: "All ten services", href: "/services", intent: "secondary" },
  },
  solarSpotlight: {
    eyebrow: "Specialist division",
    title: "The same chemistry, pointed at a solar array.",
    body:
      "Coating a photovoltaic module is the same argument as coating a bonnet: a slicker surface holds onto less, and what it does hold onto leaves with the next rain. On glass that happens to be a lens, that is measurable in generation. Our photovoltaic-grade coating sheds dust, resists mineral staining and cuts the cleaning cycle — R280 a panel, about ten minutes each.",
    bullets: [
      "Higher light transmission through a cleaner, flatter surface",
      "Dust and pollen release instead of bonding to the glass",
      "Bird droppings and hard-water scale lift without scrubbing",
      "Fewer cleaning visits across the life of the array",
    ],
    action: { label: "The full solar case", href: "/services/solar-panel-ceramic-coating", intent: "secondary" },
    secondaryAction: { label: "Calculate my array", href: "/quote#calculator", intent: "ghost" },
  },
  beforeAfter: {
    eyebrow: "Evidence",
    title: "Drag the handle. That is the same engine bay.",
    lede:
      "Same camera position, same bonnet angle, one working day apart. No filters, no wet-look dressing, and no reshoot from a kinder angle — the second frame is simply what the first one looks like once the work is done.",
    projectId: "ba-sl65-bay",
    action: { label: "Open the gallery", href: "/gallery", intent: "ghost" },
  },
  proof: {
    eyebrow: "Filmed on the job",
    title: "Three clips, three claims, no captions needed.",
    lede:
      "Everything below was shot on a working day in our own bay, on customers' cars, with a phone. Watch the pad load the panel, watch water refuse to sit on it, watch a reflection stay straight along the length of a door.",
    clips: [
      {
        id: "p1",
        label: "Stage two",
        title: "Correction, not concealment",
        body:
          "A rotary and a cutting pad taking a defined layer off a black bonnet. Filler waxes hide this damage for a fortnight; removing it is what makes the coating worth bonding on top.",
        media: {
          src: "/work/poster/paint-correction.webp",
          videoSrc: "/video/paint-correction.mp4",
          alt: "A Perfect Detailing technician machine-polishing the bonnet of a black Mercedes-AMG",
          ratio: 16 / 9,
          motif: "polisher",
          caption: "Machine correction · black metallic",
        },
      },
      {
        id: "p2",
        label: "Contact angle",
        title: "Water leaves before it can dry",
        body:
          "A plain hose over a coated roof and windscreen — no pressure washer, no chemistry, no drying towel. Water this reluctant to lie flat takes the dust with it as it goes and leaves nothing behind to etch or spot.",
        media: {
          src: "/work/poster/glass-rinse.webp",
          videoSrc: "/video/glass-rinse.mp4",
          alt: "Water sheeting cleanly off the coated roof and windscreen of a car under a plain hose rinse",
          ratio: 16 / 9,
          motif: "droplet",
          caption: "Rinse test · coated roof and glass",
        },
      },
      {
        id: "p3",
        label: "Gloss",
        title: "A reflection that stays straight",
        body:
          "The camera tracks the full length of a coated flank. Straight lines staying straight across a door and a rear quarter is the honest test of a finish — swirls and holograms break the reflection where the panel curves.",
        media: {
          src: "/work/poster/gloss-sweep.webp",
          videoSrc: "/video/gloss-sweep.mp4",
          alt: "Camera panning along the coated flank of a black Porsche, the reflected building line staying unbroken",
          ratio: 16 / 9,
          motif: "gloss-meter",
          caption: "Reflection sweep · coated flank",
        },
      },
    ],
    action: { label: "See more of the work", href: "/gallery", intent: "ghost" },
  },
  whyUs: {
    eyebrow: "Why owners keep us",
    title: "The difference is what happens before the coating.",
    lede:
      "Anyone can wipe on a bottle of ceramic. The finish you live with for the next five years is decided in the two hours of decontamination and correction that came first.",
    items: [
      {
        id: "w1",
        title: "We measure before and after",
        body: "Gloss units, paint depth and contact angle go on the job card. You get the readings, so improvement is a number rather than an opinion.",
        motif: "gloss-meter",
        metric: "Every job",
      },
      {
        id: "w2",
        title: "Correction, then protection",
        body: "Coating over swirl marks locks the defects in. We machine-polish to a defined finish first, then bond the coating to corrected paint.",
        motif: "polisher",
        metric: "2–3 stage",
      },
      {
        id: "w3",
        title: "We come to you",
        body: "Self-contained units carrying deionised water, power and containment. Your driveway, your yard, your roof, your hangar apron.",
        motif: "foam-cannon",
        metric: "Mobile",
      },
      {
        id: "w4",
        title: "Aftercare is part of the price",
        body: "You leave with a maintenance schedule, the right wash media and a standing invitation to send us a photo when something looks wrong.",
        motif: "microfibre",
        metric: "Included",
      },
    ],
  },
  industries: {
    eyebrow: "Who we work for",
    title: "It starts with cars. It does not end there.",
    lede:
      "Contamination bonds, light scatters, and value quietly leaves the asset. Most of our week is spent on vehicles — and the same physics is why an airframe, a hull, a facade and a solar array all end up on the same schedule.",
    items: [
      {
        id: "i1",
        name: "Private motoring",
        body: "Daily drivers, weekend cars and collections that live under covers between outings.",
        motif: "sedan",
      },
      {
        id: "i9",
        name: "Performance & prestige",
        body: "Dark paint, soft clear coats and owners who notice a hologram from across a car park.",
        motif: "coupe",
      },
      {
        id: "i6",
        name: "Dealerships & brokers",
        body: "Pre-delivery preparation and handover coatings applied on the dealership floor.",
        motif: "sparkle",
      },
      {
        id: "i4",
        name: "Fleet & logistics",
        body: "Panel vans, bakkies and branded vehicles on scheduled cycles that keep livery legible.",
        motif: "fleet",
      },
      {
        id: "i3",
        name: "General aviation",
        body: "Single-engine, light twin and turboprop airframes cleaned dry inside the hangar.",
        motif: "aircraft",
      },
      {
        id: "i2",
        name: "Solar & renewables",
        body: "Residential rooftops, commercial arrays and installer partnerships coated at handover.",
        motif: "solar-array",
      },
      {
        id: "i7",
        name: "Marine & leisure",
        body: "Recreational and commercial vessels, from weekend boats to working craft.",
        motif: "marine",
      },
      {
        id: "i8",
        name: "Commercial property",
        body: "Facades and glazing where cleaning costs and cooling load both matter.",
        motif: "window",
      },
    ],
  },
  trustBadges: {
    enabled: true,
    items: [
      { id: "t1", label: "Fully insured", detail: "Public liability cover on every site" },
      { id: "t2", label: "Manufacturer-trained", detail: "Certified on the coating systems we apply" },
      { id: "t3", label: "Written warranty", detail: "Terms issued in writing, not verbally" },
      { id: "t4", label: "Deionised water only", detail: "No spotting, no mineral etch" },
      { id: "t5", label: "POPIA compliant", detail: "Your details stay with us" },
    ],
  },
  reviewsTeaser: {
    eyebrow: "In their words",
    title: "Reviewed by the people who paid for it.",
    action: { label: "Read all reviews", href: "/reviews", intent: "ghost" },
  },
  ctaBanner: {
    eyebrow: "Next step",
    title: "Tell us what you drive.",
    body:
      "Send a photograph of the paint in daylight and tell us what is bothering you. You will have a written, itemised quote back within one working day — usually the same afternoon.",
    actions: [
      { label: "Get a quote", href: "/quote", intent: "primary" },
      { label: "WhatsApp us", href: "#whatsapp", intent: "secondary" },
    ],
  },
};
