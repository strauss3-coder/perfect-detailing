import type {
  AppearanceSettings,
  BrandSettings,
  BusinessSettings,
  ContactSettings,
  FooterSettings,
  NavigationSettings,
  SeoSettings,
} from "@/content/types";

/* Business details below are taken from the company profile. The service-area
 * list is the one item that was not stated there — edit it in
 * Portal → Business information if the coverage is different. */

export const brand: BrandSettings = {
  name: "Perfect Detailing",
  nameLead: "PERFECT",
  nameTrail: "Detailing",
  tagline: "Premium vehicle detailing and ceramic coating",
  positioningStatement:
    "We are a detailing house. A decade of vehicle repair taught us that the cheapest work is the work you never have to redo — so we moved from fixing paint after the damage to correcting and protecting it before it. The same chemistry and the same discipline now go onto aircraft, boats, architectural glass and solar arrays, but the car is where it started and where it still lives.",
  descriptor: "Vehicle detailing · Ceramic coating · Paint correction",
};

export const business: BusinessSettings = {
  legalName: "Perfect Detailing",
  tradingName: "Perfect Detailing",
  registrationNumber: "",
  vatNumber: "",
  foundedYear: 2015,
  hasPhysicalAddress: true,
  address: {
    line1: "",
    line2: "",
    city: "Witbank",
    province: "Mpumalanga",
    postalCode: "",
    country: "South Africa",
  },
  serviceAreaNote:
    "Our workshop and product shop are in Witbank. Detailing and coating work is carried out on site wherever the asset lives — your driveway, your yard, your roof, your hangar or your mooring — and our units arrive with their own water, power and containment.",
  serviceAreas: [
    "Witbank",
    "eMalahleni",
    "Middelburg",
    "Secunda",
    "Ermelo",
    "Bethal",
    "Mpumalanga Highveld",
    "Gauteng on request",
  ],
  currency: "ZAR",
  currencySymbol: "R",
  locale: "en-ZA",
  timezone: "Africa/Johannesburg",
};

export const contact: ContactSettings = {
  phone: "+27844775125",
  phoneDisplay: "0844 775 125",
  whatsapp: "27844775125",
  whatsappMessage:
    "Hi Perfect Detailing — I would like a quote. Here is what I need:",
  email: "info@perfectdetailing.co.za",
  quotesEmail: "info@perfectdetailing.co.za",
  responseTimeNote:
    "Our team responds promptly to enquiries — usually the same working day.",
  mobileServiceNote:
    "Come to the shop in Witbank for products and advice, or have us come to you. Coating and detailing work is done on site, with our own water, power and containment.",
  hours: [
    { id: "mon", day: "Monday", opens: "08:00", closes: "17:00", closed: false },
    { id: "tue", day: "Tuesday", opens: "08:00", closes: "17:00", closed: false },
    { id: "wed", day: "Wednesday", opens: "08:00", closes: "17:00", closed: false },
    { id: "thu", day: "Thursday", opens: "08:00", closes: "17:00", closed: false },
    { id: "fri", day: "Friday", opens: "08:00", closes: "17:00", closed: false },
    { id: "sat", day: "Saturday", opens: "08:00", closes: "13:00", closed: false },
    { id: "sun", day: "Sunday", opens: "", closes: "", closed: true },
  ],
  socials: [
    { id: "fb", platform: "Facebook", handle: "Perfect Detailing", url: "https://facebook.com/perfectdetailing", enabled: true },
    { id: "ig", platform: "Instagram", handle: "@perfectdetailing", url: "https://instagram.com/perfectdetailing", enabled: true },
    { id: "li", platform: "LinkedIn", handle: "Perfect Detailing", url: "https://linkedin.com/company/perfectdetailing", enabled: false },
    { id: "yt", platform: "YouTube", handle: "Perfect Detailing", url: "https://youtube.com/@perfectdetailing", enabled: false },
  ],
};

export const navigation: NavigationSettings = {
  primary: [
    { id: "home", label: "Home", href: "/" },
    {
      id: "services",
      label: "Services",
      href: "/services",
      children: [
        {
          id: "automotive",
          label: "Vehicle Detailing",
          href: "/services/automotive-detailing",
          description: "The full discipline — exterior, interior, engine bay and trim.",
          motif: "sedan",
          flag: "Most booked",
        },
        {
          id: "ceramic",
          label: "Ceramic Coating",
          href: "/services/ceramic-coating",
          description: "Multi-layer 9H protection bonded to corrected paint, glass and wheels.",
          motif: "shield",
        },
        {
          id: "correction",
          label: "Paint Correction",
          href: "/services/paint-correction",
          description: "Swirls, holograms and etching removed by machine, not filled.",
          motif: "polisher",
        },
        {
          id: "interior",
          label: "Interior Detailing",
          href: "/services/interior-detailing",
          description: "Extraction, leather, trim restoration and odour removed at source.",
          motif: "interior",
        },
        {
          id: "maintenance",
          label: "Maintenance Plans",
          href: "/services/maintenance-plans",
          description: "Scheduled safe washing that keeps a correction alive for years.",
          motif: "microfibre",
        },
        {
          id: "aircraft",
          label: "Aircraft Detailing",
          href: "/services/aircraft-detailing",
          description: "Airframe, cabin and cockpit, hangar-based and dry washed.",
          motif: "aircraft",
        },
        {
          id: "solar",
          label: "Solar Panel Ceramic Coating",
          href: "/services/solar-panel-ceramic-coating",
          description: "R280 per panel. Our specialist renewable-energy division.",
          motif: "solar-panel",
          flag: "Specialist",
        },
        {
          id: "marine",
          label: "Marine Division",
          href: "/services/marine-detailing",
          description: "Hull, gelcoat and hardware protection.",
          motif: "marine",
        },
        {
          id: "windows",
          label: "Building Windows",
          href: "/services/building-window-coating",
          description: "Architectural glazing, self-cleaning and heat rejecting.",
          motif: "window",
        },
        {
          id: "fleet",
          label: "Fleet & Commercial",
          href: "/services/fleet-services",
          description: "Scheduled cycles for vehicles that earn their keep.",
          motif: "fleet",
        },
      ],
    },
    { id: "process", label: "Process", href: "/process" },
    { id: "gallery", label: "Gallery", href: "/gallery" },
    { id: "reviews", label: "Reviews", href: "/reviews" },
    { id: "about", label: "About", href: "/about" },
    { id: "faq", label: "FAQ", href: "/faq" },
    { id: "contact", label: "Contact", href: "/contact" },
  ],
  cta: { label: "Get a quote", href: "/quote", intent: "primary" },
  announcement: {
    enabled: true,
    items: [
      "Premium vehicle detailing, paint correction and ceramic coating",
      "Multi-layer 9H ceramic systems with a written warranty",
      "Maintenance plans from six-weekly — the wash is what damages paint",
      "Witbank workshop and product shop — Mon to Fri 08:00–17:00, Sat 08:00–13:00",
    ],
  },
};

export const footer: FooterSettings = {
  blurb:
    "Perfect Detailing corrects and protects paint that other people only wash. Vehicle detailing, machine correction and ceramic coating first — with the same discipline carried onto aircraft, boats, architectural glass and solar arrays.",
  columns: [
    {
      id: "services",
      title: "Services",
      links: [
        { label: "Vehicle Detailing", href: "/services/automotive-detailing" },
        { label: "Ceramic Coating", href: "/services/ceramic-coating" },
        { label: "Paint Correction", href: "/services/paint-correction" },
        { label: "Interior Detailing", href: "/services/interior-detailing" },
        { label: "Maintenance Plans", href: "/services/maintenance-plans" },
        { label: "Aircraft Detailing", href: "/services/aircraft-detailing" },
        { label: "Solar Panel Ceramic Coating", href: "/services/solar-panel-ceramic-coating" },
        { label: "Marine Division", href: "/services/marine-detailing" },
        { label: "Building Windows", href: "/services/building-window-coating" },
        { label: "Fleet & Commercial", href: "/services/fleet-services" },
      ],
    },
    {
      id: "company",
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Our process", href: "/process" },
        { label: "Gallery", href: "/gallery" },
        { label: "Reviews", href: "/reviews" },
        { label: "Journal", href: "/journal" },
      ],
    },
    {
      id: "help",
      title: "Get started",
      links: [
        { label: "Get a quote", href: "/quote" },
        { label: "Maintenance plans", href: "/services/maintenance-plans" },
        { label: "Solar cost calculator", href: "/quote#calculator" },
        { label: "Frequently asked questions", href: "/faq" },
        { label: "Contact us", href: "/contact" },
      ],
    },
  ],
  legalLinks: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
  copyrightNote: "All rights reserved.",
  showWatermark: true,
};

export const appearance: AppearanceSettings = {
  accent: "#02c9e6",
  accentSecondary: "#1b6bff",
  motion: {
    loadingScreen: true,
    pageTransitions: true,
    particles: true,
    parallax: true,
    cursorEffects: true,
    grain: true,
    intensity: "balanced",
  },
  loader: {
    headline: "Perfect Detailing",
    subline: "Calibrating surface",
    minDurationMs: 600,
  },
  radius: 20,
};

export const seo: SeoSettings = {
  siteUrl: "https://perfectdetailing.co.za",
  titleTemplate: "%s — Perfect Detailing",
  defaultTitle: "Perfect Detailing — Premium vehicle detailing and ceramic coating",
  defaultDescription:
    "Premium vehicle detailing, multi-stage paint correction and ceramic coating in Witbank, Mpumalanga. Interior restoration, maintenance plans, and specialist coating for aircraft, boats, architectural glass and solar arrays.",
  keywords: [
    "car detailing Witbank",
    "vehicle detailing Mpumalanga",
    "ceramic coating Witbank",
    "ceramic coating car Mpumalanga",
    "paint correction Witbank",
    "swirl mark removal eMalahleni",
    "interior detailing Witbank",
    "car detailing eMalahleni",
    "detailing maintenance plan",
    "aircraft detailing South Africa",
    "solar panel ceramic coating",
    "marine ceramic coating",
  ],
  twitterHandle: "",
  organisationType: "AutoDetailing",
  verification: { google: "", bing: "" },
  pages: {
    home: {
      title: "Premium vehicle detailing and ceramic coating",
      description:
        "Perfect Detailing corrects and protects paint from our base in Witbank — multi-stage paint correction, multi-layer ceramic coating, interior restoration and maintenance plans, plus specialist coating for aircraft, marine, architectural glass and solar.",
      ogImageText: "Premium detailing and ceramic coating",
    },
    about: {
      title: "About",
      description:
        "A decade in vehicle repair, then a deliberate move from reactive repair to proactive surface protection. Who we are and how we measure our work.",
      ogImageText: "From repair to protection",
    },
    process: {
      title: "Our process",
      description:
        "Eight stages from inspection to handover: how a Perfect Detailing coating is applied and what happens at each step.",
      ogImageText: "Eight stages, no shortcuts",
    },
    gallery: {
      title: "Gallery",
      description:
        "Recent detailing work — machine correction in progress, decontamination, coated finishes, interiors and engine bays. Shot in our own bay, unretouched.",
      ogImageText: "The work, uncropped",
    },
    reviews: {
      title: "Reviews",
      description: "What owners, facility managers, pilots and skippers say after living with a Perfect Detailing coating.",
      ogImageText: "Verified customer reviews",
    },
    faq: {
      title: "Frequently asked questions",
      description:
        "Straight answers on paint correction, ceramic coating lifespan, interior restoration, maintenance intervals — and on solar economics, aviation compliance and marine antifouling.",
      ogImageText: "Straight answers",
    },
    contact: {
      title: "Contact",
      description:
        "Call, WhatsApp or email Perfect Detailing in Witbank, Mpumalanga. Workshop and product shop open six days a week.",
      ogImageText: "Talk to us",
    },
    quote: {
      title: "Get a quote",
      description:
        "Send us your vehicle and what you want done — correction, coating, interior or a maintenance plan — and get a written quote back within one working day. Solar arrays price instantly at R280 a panel.",
      ogImageText: "A written quote in one day",
    },
    services: {
      title: "Services",
      description:
        "Vehicle detailing, ceramic coating, paint correction, interior restoration and maintenance plans — plus specialist coating divisions for aviation, solar, marine and architectural glass.",
      ogImageText: "What we protect",
    },
    journal: {
      title: "Journal",
      description: "Field notes on coating chemistry, soiling losses and keeping a finish alive in Highveld conditions.",
      ogImageText: "Field notes",
    },
  },
};
