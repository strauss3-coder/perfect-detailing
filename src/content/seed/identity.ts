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
  tagline: "Advanced care for multi-sector assets",
  positioningStatement:
    "We are surface care specialists. A decade of vehicle repair taught us that the cheapest work is the work you never have to redo — so we moved from fixing surfaces after the damage to protecting them before it.",
  descriptor: "Automotive · Aviation · Marine · Solar · Architectural glass",
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
          id: "solar",
          label: "Solar Panel Ceramic Coating",
          href: "/services/solar-panel-ceramic-coating",
          description: "R280 per panel. Roughly ten minutes each.",
          motif: "solar-panel",
          flag: "Primary service",
        },
        {
          id: "ceramic",
          label: "Ceramic Coating",
          href: "/services/ceramic-coating",
          description: "Multi-layer 9H nanotechnology for paint, metal and glass.",
          motif: "shield",
        },
        {
          id: "automotive",
          label: "Automotive Detailing",
          href: "/services/automotive-detailing",
          description: "Paint correction, interiors, wheels and trim.",
          motif: "sedan",
        },
        {
          id: "aircraft",
          label: "Aircraft Detailing",
          href: "/services/aircraft-detailing",
          description: "Airframe, cabin and cockpit, hangar-based.",
          motif: "aircraft",
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
      "Solar panel ceramic coating — R280 per panel, about 10 minutes each",
      "Automotive · Aviation · Marine · Solar · Architectural glass",
      "Witbank workshop and product shop — Mon to Fri 08:00–17:00, Sat 08:00–13:00",
    ],
  },
};

export const footer: FooterSettings = {
  blurb:
    "Perfect Detailing protects the surfaces other people only clean. Paint, gelcoat, composite, architectural glass and photovoltaic — corrected, coated and measured.",
  columns: [
    {
      id: "services",
      title: "Services",
      links: [
        { label: "Solar Panel Ceramic Coating", href: "/services/solar-panel-ceramic-coating" },
        { label: "Ceramic Coating", href: "/services/ceramic-coating" },
        { label: "Automotive Detailing", href: "/services/automotive-detailing" },
        { label: "Aircraft Detailing", href: "/services/aircraft-detailing" },
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
  defaultTitle: "Perfect Detailing — Ceramic coatings for vehicles, aircraft, boats and solar",
  defaultDescription:
    "Surface care specialists in Witbank, Mpumalanga. Ceramic coating and detailing for cars, aircraft, boats, solar panels and architectural glass. Solar panel coating from R280 a panel.",
  keywords: [
    "ceramic coating Witbank",
    "ceramic coating Mpumalanga",
    "solar panel ceramic coating",
    "solar panel cleaning South Africa",
    "paint correction Witbank",
    "aircraft detailing South Africa",
    "marine ceramic coating",
    "building window coating",
    "fleet detailing Mpumalanga",
  ],
  twitterHandle: "",
  organisationType: "AutoDetailing",
  verification: { google: "", bing: "" },
  pages: {
    home: {
      title: "Ceramic coatings for vehicles, aircraft, boats and solar",
      description:
        "Perfect Detailing protects high-value surfaces across five sectors from our base in Witbank — solar panel ceramic coating from R280 a panel, paint correction, aviation, marine and architectural glass.",
      ogImageText: "Advanced care for multi-sector assets",
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
        "Recent work across automotive, solar, aviation, marine and architectural glass — with before and after comparisons.",
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
        "Straight answers on ceramic coating lifespan, solar panel economics, aviation compliance, marine antifouling and aftercare.",
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
        "Estimate solar panel ceramic coating instantly at R280 a panel, or send us the details of your vehicle, aircraft, boat or building.",
      ogImageText: "Price it in ten seconds",
    },
    services: {
      title: "Services",
      description:
        "Ceramic coating and detailing across five sectors: automotive, aviation, marine, solar and architectural glass, plus fleet programmes.",
      ogImageText: "What we protect",
    },
    journal: {
      title: "Journal",
      description: "Field notes on coating chemistry, soiling losses and keeping a finish alive in Highveld conditions.",
      ogImageText: "Field notes",
    },
  },
};
