import type { HomeContent } from "@/content/types";

export const home: HomeContent = {
  hero: {
    eyebrow: "Automotive · Aviation · Marine · Solar · Glass",
    headlineLines: ["We don't clean", "surfaces.", "We engineer them."],
    accentWord: "surfaces.",
    lede:
      "Perfect Detailing corrects, coats and measures the surfaces that other people simply wash. Paint, glass, composite and photovoltaic — protected with ceramic chemistry and handed back with a reading, not a promise.",
    actions: [
      { label: "Coat my solar panels", href: "/services/solar-panel-ceramic-coating", intent: "primary" },
      { label: "See the process", href: "/process", intent: "secondary" },
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
      "Solar arrays",
      "Ceramic coating",
      "Paint correction",
      "Aircraft dry wash",
      "Fleet cycles",
      "Engine bays",
      "Headlight restoration",
      "Interior deep clean",
    ],
  },
  stats: {
    eyebrow: "Measured outcomes",
    title: "Numbers we are willing to be held to.",
    items: [
      {
        id: "s1",
        value: 280,
        prefix: "R",
        label: "Per solar panel",
        detail: "Coated, sealed and cured. Roughly ten minutes each.",
      },
      {
        id: "s2",
        value: 4.2,
        precision: 1,
        suffix: "%",
        label: "Typical yield recovered",
        detail: "Measured against soiled baselines on Highveld installations.",
      },
      {
        id: "s3",
        value: 112,
        suffix: "°",
        label: "Water contact angle",
        detail: "The steeper the bead, the less a surface holds onto dirt.",
      },
      {
        id: "s4",
        value: 9,
        suffix: "yrs",
        label: "Longest coating still under warranty",
        detail: "Inspected annually, still passing its beading test.",
      },
    ],
  },
  services: {
    eyebrow: "Capability",
    title: "Seven disciplines, one standard.",
    lede:
      "The chemistry changes between a bonnet, a wing, a hull, a window and a photovoltaic module. The method does not: inspect, correct, prepare, coat, cure, verify.",
    featured: [
      "solar-panel-ceramic-coating",
      "ceramic-coating",
      "automotive-detailing",
      "aircraft-detailing",
      "marine-detailing",
      "building-window-coating",
      "fleet-services",
    ],
    action: { label: "All services", href: "/services", intent: "ghost" },
  },
  solarSpotlight: {
    eyebrow: "Primary service",
    title: "A solar panel is a lens. Treat it like one.",
    body:
      "Every gram of dust on a module is light that never reaches the cell. Our photovoltaic-grade ceramic coating leaves a slick, hydrophobic surface that sheds dust, resists mineral staining and lets ordinary rain do most of the cleaning for you — at R280 a panel, applied in about ten minutes.",
    bullets: [
      "Higher light transmission through a cleaner, flatter surface",
      "Dust and pollen release instead of bonding to the glass",
      "Bird droppings and hard-water scale lift without scrubbing",
      "Fewer cleaning visits across the life of the array",
    ],
    action: { label: "Read the full case", href: "/services/solar-panel-ceramic-coating", intent: "primary" },
    secondaryAction: { label: "Calculate my array", href: "/quote#calculator", intent: "secondary" },
  },
  beforeAfter: {
    eyebrow: "Evidence",
    title: "Drag the handle. That is the same panel.",
    lede:
      "No filters, no wet-look dressing, no reshoot from a better angle. Both frames are the same lighting setup, minutes apart.",
    projectId: "ba-solar-midrand",
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
          "Poured, not sprayed, onto a coated bonnet in slow motion. A high contact angle means the water pulls itself into beads and runs — carrying dust with it and leaving nothing behind to etch.",
        media: {
          src: "/work/poster/water-sheeting.webp",
          videoSrc: "/video/water-sheeting.mp4",
          alt: "Slow-motion footage of water beading and running straight off a ceramic-coated bonnet",
          ratio: 9 / 16,
          motif: "droplet",
          caption: "Sheeting test · coated panel",
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
    eyebrow: "Industries we serve",
    title: "Different surfaces. Same physics.",
    lede:
      "Contamination bonds, light scatters, and value quietly leaves the asset. We work wherever that equation costs someone money — on the road, in the air, on the water and on the building.",
    items: [
      {
        id: "i1",
        name: "Private motoring",
        body: "Daily drivers, weekend cars and collections that live under covers between outings.",
        motif: "sedan",
      },
      {
        id: "i2",
        name: "Solar & renewables",
        body: "Residential rooftops, commercial arrays and installer partnerships coated at handover.",
        motif: "solar-array",
      },
      {
        id: "i3",
        name: "General aviation",
        body: "Single-engine, light twin and turboprop airframes cleaned dry inside the hangar.",
        motif: "aircraft",
      },
      {
        id: "i4",
        name: "Fleet & logistics",
        body: "Panel vans, bakkies and branded vehicles on scheduled cycles that keep livery legible.",
        motif: "fleet",
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
      {
        id: "i5",
        name: "Property & facilities",
        body: "Estates, office parks and body corporates managing glass and PV across many buildings.",
        motif: "shield",
      },
      {
        id: "i6",
        name: "Dealerships & brokers",
        body: "Pre-delivery preparation and handover coatings applied on the dealership floor.",
        motif: "sparkle",
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
    title: "Tell us what needs protecting.",
    body:
      "Send a photo and a rough panel count or registration number. You will have a written quote back within one working day — usually the same afternoon.",
    actions: [
      { label: "Get a quote", href: "/quote", intent: "primary" },
      { label: "WhatsApp us", href: "#whatsapp", intent: "secondary" },
    ],
  },
};
