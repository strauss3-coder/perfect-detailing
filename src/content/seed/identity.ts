import type {
  AppearanceSettings,
  BrandSettings,
  BusinessSettings,
  ContactSettings,
  FooterSettings,
  NavigationSettings,
  SeoSettings,
} from "@/content/types";

/* NOTE FOR THE OWNER
 * Phone, WhatsApp and email below are formatted stand-ins. Replace them in
 * Portal → Contact Information before the site goes live. Nothing else in
 * the build depends on their literal values. */

export const brand: BrandSettings = {
  name: "Perfect Detailing",
  nameLead: "PERFECT",
  nameTrail: "DETAILING",
  tagline: "Surface engineering for things that matter",
  activeMark: "bead",
  positioningStatement:
    "We do not clean surfaces. We engineer them — measuring gloss, correcting defects and bonding a coating that holds the finish long after we have left site.",
  descriptor: "Detailing & protective coatings — automotive, aviation, solar",
};

export const business: BusinessSettings = {
  legalName: "Perfect Detailing",
  tradingName: "Perfect Detailing",
  registrationNumber: "",
  vatNumber: "",
  foundedYear: 2016,
  hasPhysicalAddress: false,
  address: {
    line1: "",
    line2: "",
    city: "",
    province: "",
    postalCode: "",
    country: "South Africa",
  },
  serviceAreaNote:
    "We are a mobile operation. Our units arrive with water, power and containment, so we work at your home, office, yard or hangar without needing anything from you.",
  serviceAreas: [
    "Johannesburg",
    "Sandton",
    "Midrand",
    "Centurion",
    "Pretoria",
    "Krugersdorp",
    "Lanseria",
    "Grand Central",
    "Vaal Triangle",
  ],
  currency: "ZAR",
  currencySymbol: "R",
  locale: "en-ZA",
  timezone: "Africa/Johannesburg",
};

export const contact: ContactSettings = {
  phone: "+27825550187",
  phoneDisplay: "082 555 0187",
  whatsapp: "27825550187",
  whatsappMessage:
    "Hi Perfect Detailing — I would like a quote. Here is what I need:",
  email: "hello@perfectdetailing.co.za",
  quotesEmail: "quotes@perfectdetailing.co.za",
  responseTimeNote: "Quotes returned within one working day, usually the same afternoon.",
  mobileServiceNote:
    "We do not run a walk-in workshop. Every job is done on site — your driveway, your parking bay, your roof or your hangar — which is why there is no address on this page.",
  hours: [
    { id: "mon", day: "Monday", opens: "07:00", closes: "17:00", closed: false },
    { id: "tue", day: "Tuesday", opens: "07:00", closes: "17:00", closed: false },
    { id: "wed", day: "Wednesday", opens: "07:00", closes: "17:00", closed: false },
    { id: "thu", day: "Thursday", opens: "07:00", closes: "17:00", closed: false },
    { id: "fri", day: "Friday", opens: "07:00", closes: "17:00", closed: false },
    { id: "sat", day: "Saturday", opens: "08:00", closes: "13:00", closed: false },
    { id: "sun", day: "Sunday", opens: "", closes: "", closed: true },
  ],
  socials: [
    {
      id: "ig",
      platform: "Instagram",
      handle: "@perfectdetailing",
      url: "https://instagram.com/perfectdetailing",
      enabled: true,
    },
    {
      id: "fb",
      platform: "Facebook",
      handle: "Perfect Detailing",
      url: "https://facebook.com/perfectdetailing",
      enabled: true,
    },
    {
      id: "li",
      platform: "LinkedIn",
      handle: "Perfect Detailing",
      url: "https://linkedin.com/company/perfectdetailing",
      enabled: true,
    },
    {
      id: "yt",
      platform: "YouTube",
      handle: "Perfect Detailing",
      url: "https://youtube.com/@perfectdetailing",
      enabled: false,
    },
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
          description: "Semi-permanent SiO₂ protection for paint and glass.",
          motif: "shield",
        },
        {
          id: "automotive",
          label: "Automotive Detailing",
          href: "/services/automotive-detailing",
          description: "Correction, interiors, engine bays, headlights.",
          motif: "sedan",
        },
        {
          id: "aircraft",
          label: "Aircraft Detailing",
          href: "/services/aircraft-detailing",
          description: "Dry wash and coating, hangar or apron.",
          motif: "aircraft",
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
      "Mobile units across Gauteng — we bring water and power",
      "Quotes returned within one working day",
    ],
  },
};

export const footer: FooterSettings = {
  blurb:
    "Perfect Detailing protects the surfaces that other people only clean. Paint, glass, composite and photovoltaic — corrected, coated and measured.",
  columns: [
    {
      id: "services",
      title: "Services",
      links: [
        { label: "Solar Panel Ceramic Coating", href: "/services/solar-panel-ceramic-coating" },
        { label: "Ceramic Coating", href: "/services/ceramic-coating" },
        { label: "Automotive Detailing", href: "/services/automotive-detailing" },
        { label: "Aircraft Detailing", href: "/services/aircraft-detailing" },
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
  accent: "#38e8ff",
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
    minDurationMs: 900,
  },
  radius: 20,
};

export const seo: SeoSettings = {
  siteUrl: "https://perfectdetailing.co.za",
  titleTemplate: "%s — Perfect Detailing",
  defaultTitle: "Perfect Detailing — Ceramic coatings for solar, cars and aircraft",
  defaultDescription:
    "Mobile detailing and ceramic coating across Gauteng. Solar panel ceramic coating at R280 per panel, paint correction, aircraft dry washing and fleet programmes.",
  keywords: [
    "solar panel ceramic coating",
    "solar panel cleaning Gauteng",
    "ceramic coating Johannesburg",
    "paint correction",
    "aircraft detailing South Africa",
    "fleet detailing",
    "mobile car detailing",
  ],
  twitterHandle: "@perfectdetailing",
  organisationType: "AutoDetailing",
  verification: { google: "", bing: "" },
  pages: {
    home: {
      title: "Ceramic coatings for solar, cars and aircraft",
      description:
        "Perfect Detailing engineers surfaces across Gauteng — solar panel ceramic coating from R280 a panel, paint correction, aircraft dry washing and fleet cycles.",
      ogImageText: "Surface engineering for things that matter",
    },
    about: {
      title: "About",
      description:
        "Who we are, how we measure our work, and why every Perfect Detailing job ends with a gloss reading rather than a photograph.",
      ogImageText: "Measured, not guessed",
    },
    process: {
      title: "Our process",
      description:
        "Eight stages from inspection to handover: how a Perfect Detailing coating is actually applied, and what happens at each step.",
      ogImageText: "Eight stages, no shortcuts",
    },
    gallery: {
      title: "Gallery",
      description:
        "Recent work across automotive, solar, aviation and fleet — with before and after comparisons and the numbers behind them.",
      ogImageText: "The work, uncropped",
    },
    reviews: {
      title: "Reviews",
      description:
        "What owners, facility managers and pilots say after living with a Perfect Detailing coating.",
      ogImageText: "Verified customer reviews",
    },
    faq: {
      title: "Frequently asked questions",
      description:
        "Straight answers on ceramic coating lifespan, solar panel coating economics, aircraft compliance and aftercare.",
      ogImageText: "Straight answers",
    },
    contact: {
      title: "Contact",
      description:
        "Call, WhatsApp or email Perfect Detailing. We are mobile across Gauteng and reply within one working day.",
      ogImageText: "Talk to us",
    },
    quote: {
      title: "Get a quote",
      description:
        "Estimate solar panel ceramic coating instantly at R280 a panel, or send us the details of your vehicle, fleet or aircraft.",
      ogImageText: "Price it in ten seconds",
    },
    services: {
      title: "Services",
      description:
        "Solar panel ceramic coating, automotive detailing, paint correction, aircraft cleaning and fleet programmes.",
      ogImageText: "What we protect",
    },
    journal: {
      title: "Journal",
      description:
        "Field notes on coating chemistry, soiling losses and keeping a finish alive in Highveld conditions.",
      ogImageText: "Field notes",
    },
  },
};
