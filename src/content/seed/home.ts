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
      src: "",
      alt: "A freshly coated dark panel under raking studio light, water beading on the surface",
      ratio: 16 / 10,
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
    title: "Six disciplines, one standard.",
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
    title: "Nine years of work, reviewed by the people who paid for it.",
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
