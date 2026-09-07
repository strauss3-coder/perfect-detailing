/**
 * PERFECT DETAILING — content model.
 *
 * Every word, number, link and image on the public site resolves through
 * these types. Pages never hardcode copy; they render a document that the
 * CMS owns. Singletons live in `site_settings`, collections live in their
 * own document tables (see supabase/schema.sql).
 */

/* ------------------------------------------------------------------ */
/* Shared primitives                                                   */
/* ------------------------------------------------------------------ */

export type PublishStatus = "draft" | "published" | "archived";

export interface MediaRef {
  /** Storage path or absolute URL. Empty string renders the SVG placeholder. */
  src: string;
  alt: string;
  /** Intrinsic ratio, used to reserve space and avoid layout shift. */
  ratio?: number;
  /** Placeholder motif drawn when `src` is empty. */
  motif?: IllustrationMotif;
  caption?: string;
}

export type IllustrationMotif =
  | "sedan"
  | "suv"
  | "coupe"
  | "aircraft"
  | "solar-array"
  | "solar-panel"
  | "droplet"
  | "shield"
  | "polisher"
  | "foam-cannon"
  | "microfibre"
  | "engine-bay"
  | "headlight"
  | "interior"
  | "fleet"
  | "sparkle"
  | "coating-layers"
  | "gloss-meter"
  | "marine"
  | "window";

export interface LinkRef {
  label: string;
  href: string;
  /** Renders the link as a primary/secondary/ghost control. */
  intent?: "primary" | "secondary" | "ghost";
  external?: boolean;
}

export interface StatItem {
  id: string;
  value: number;
  /** Rendered after the counter, e.g. "%", "+", "µm". */
  suffix?: string;
  prefix?: string;
  /** Decimal places for the animated counter. */
  precision?: number;
  label: string;
  detail?: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  body: string;
  motif?: IllustrationMotif;
  metric?: string;
}

/* ------------------------------------------------------------------ */
/* Brand & business                                                    */
/* ------------------------------------------------------------------ */

export interface BrandSettings {
  name: string;
  /** Split for the stacked lockup: "PERFECT" / "DETAILING". */
  nameLead: string;
  nameTrail: string;
  tagline: string;
  positioningStatement: string;
  /** Short descriptor under the footer lockup. */
  descriptor: string;
}

export interface OperatingHour {
  id: string;
  day: string;
  opens: string;
  closes: string;
  closed: boolean;
}

export interface SocialLink {
  id: string;
  platform: string;
  handle: string;
  url: string;
  enabled: boolean;
}

export interface BusinessSettings {
  legalName: string;
  tradingName: string;
  registrationNumber: string;
  vatNumber: string;
  foundedYear: number;
  /** No premises yet — the CMS can switch this on later. */
  hasPhysicalAddress: boolean;
  address: {
    line1: string;
    line2: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
  serviceAreaNote: string;
  serviceAreas: string[];
  currency: string;
  currencySymbol: string;
  locale: string;
  timezone: string;
}

export interface ContactSettings {
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  whatsappMessage: string;
  email: string;
  quotesEmail: string;
  responseTimeNote: string;
  hours: OperatingHour[];
  socials: SocialLink[];
  /** Shown on the contact page in place of a street address. */
  mobileServiceNote: string;
}

/* ------------------------------------------------------------------ */
/* Navigation & chrome                                                 */
/* ------------------------------------------------------------------ */

export interface NavChild {
  id: string;
  label: string;
  href: string;
  description: string;
  motif?: IllustrationMotif;
  flag?: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  children?: NavChild[];
}

export interface NavigationSettings {
  primary: NavItem[];
  cta: LinkRef;
  /** Rolling text in the top announcement strip. */
  announcement: { enabled: boolean; items: string[] };
}

export interface FooterSettings {
  blurb: string;
  columns: { id: string; title: string; links: LinkRef[] }[];
  legalLinks: LinkRef[];
  copyrightNote: string;
  /** Oversized outlined wordmark at the foot of the page. */
  showWatermark: boolean;
}

/* ------------------------------------------------------------------ */
/* Home                                                                */
/* ------------------------------------------------------------------ */

export interface HomeContent {
  hero: {
    eyebrow: string;
    headlineLines: string[];
    /** Word inside headlineLines that receives the specular treatment. */
    accentWord: string;
    lede: string;
    actions: LinkRef[];
    media: MediaRef;
    /** Small readouts pinned to the hero instrument panel. */
    readouts: { id: string; label: string; value: string }[];
    scrollHint: string;
  };
  marquee: { enabled: boolean; items: string[] };
  stats: { eyebrow: string; title: string; items: StatItem[] };
  services: {
    eyebrow: string;
    title: string;
    lede: string;
    /** Slugs, in display order. */
    featured: string[];
    action: LinkRef;
  };
  solarSpotlight: {
    eyebrow: string;
    title: string;
    body: string;
    bullets: string[];
    action: LinkRef;
    secondaryAction: LinkRef;
  };
  beforeAfter: {
    eyebrow: string;
    title: string;
    lede: string;
    projectId: string;
    action: LinkRef;
  };
  whyUs: {
    eyebrow: string;
    title: string;
    lede: string;
    items: FeatureItem[];
  };
  industries: {
    eyebrow: string;
    title: string;
    lede: string;
    items: { id: string; name: string; body: string; motif: IllustrationMotif }[];
  };
  trustBadges: {
    enabled: boolean;
    items: { id: string; label: string; detail: string }[];
  };
  reviewsTeaser: {
    eyebrow: string;
    title: string;
    action: LinkRef;
  };
  ctaBanner: {
    eyebrow: string;
    title: string;
    body: string;
    actions: LinkRef[];
  };
}

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export interface AboutContent {
  hero: { eyebrow: string; title: string; lede: string; media: MediaRef };
  story: { title: string; paragraphs: string[] };
  principles: { eyebrow: string; title: string; items: FeatureItem[] };
  standards: {
    eyebrow: string;
    title: string;
    lede: string;
    items: { id: string; label: string; value: string; note: string }[];
  };
  team: {
    enabled: boolean;
    eyebrow: string;
    title: string;
    lede: string;
    members: {
      id: string;
      name: string;
      role: string;
      bio: string;
      media: MediaRef;
    }[];
  };
  cta: { title: string; body: string; actions: LinkRef[] };
}

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export type ServiceCategory =
  | "automotive"
  | "ceramic"
  | "solar"
  | "aircraft"
  | "marine"
  | "windows"
  | "fleet";

export interface ServiceSection {
  id: string;
  eyebrow?: string;
  title: string;
  body: string;
  bullets?: string[];
  motif?: IllustrationMotif;
  media?: MediaRef;
}

export interface ServicePackage {
  id: string;
  name: string;
  summary: string;
  priceFrom: number | null;
  priceNote: string;
  duration: string;
  includes: string[];
  featured: boolean;
}

export interface ProcessStep {
  id: string;
  index: number;
  title: string;
  body: string;
  duration: string;
  motif?: IllustrationMotif;
  detail: string[];
}

/** Service-specific structured extras, all CMS-editable. */
export interface SolarEconomics {
  pricePerPanel: number;
  minutesPerPanel: number;
  /** Defaults for the on-site calculator. */
  defaultPanelCount: number;
  minPanels: number;
  maxPanels: number;
  /** Assumptions displayed alongside the ROI worksheet. */
  assumptions: {
    id: string;
    label: string;
    value: string;
    note: string;
  }[];
  /** Worked example the ROI table is built from. */
  worked: {
    panelCount: number;
    cleansPerYearBefore: number;
    cleansPerYearAfter: number;
    costPerCleanPerPanel: number;
    soilingLossBefore: number;
    soilingLossAfter: number;
    systemKwp: number;
    yieldPerKwpPerYear: number;
    tariffPerKwh: number;
    coatingLifespanYears: number;
  };
  neglect: {
    id: string;
    title: string;
    body: string;
    impact: string;
    motif?: IllustrationMotif;
  }[];
}

export interface ServiceDoc {
  id: string;
  slug: string;
  category: ServiceCategory;
  status: PublishStatus;
  order: number;
  /** Card + nav presentation. */
  name: string;
  shortName: string;
  cardSummary: string;
  motif: IllustrationMotif;
  flag?: string;
  featuredOnHome: boolean;

  /** Page hero. */
  eyebrow: string;
  headline: string;
  lede: string;
  heroMedia: MediaRef;
  heroStats: StatItem[];
  actions: LinkRef[];

  /** Body. */
  sections: ServiceSection[];
  benefits: FeatureItem[];
  packages: ServicePackage[];
  steps: ProcessStep[];
  lifespan: { id: string; label: string; value: string; note: string }[];
  maintenance: { title: string; body: string; items: string[] };
  faqIds: string[];

  /**
   * The with/without comparison for this discipline, taken from the company
   * profile. Its figures are the company's own published claims and carry
   * their own qualifier, which is rendered with them.
   */
  difference?: {
    eyebrow: string;
    title: string;
    body: string;
    media: MediaRef;
    withoutLabel: string;
    withoutBody: string;
    withLabel: string;
    withBody: string;
    benefits: { id: string; title: string; body: string; motif?: IllustrationMotif }[];
    headline: { value: string; label: string; qualifier: string };
  };

  /** Optional, category-specific. */
  solar?: SolarEconomics;
  aircraft?: {
    types: { id: string; name: string; note: string }[];
    schedule: { id: string; interval: string; work: string }[];
    compliance: string[];
  };
  fleet?: {
    tiers: { id: string; size: string; cadence: string; note: string }[];
    outcomes: FeatureItem[];
  };

  seo: PageSeo;
}

/* ------------------------------------------------------------------ */
/* Process, gallery, reviews, FAQ                                      */
/* ------------------------------------------------------------------ */

export interface ProcessContent {
  hero: { eyebrow: string; title: string; lede: string };
  steps: ProcessStep[];
  guarantee: { title: string; body: string; points: string[] };
  cta: { title: string; body: string; actions: LinkRef[] };
}

export interface GalleryCategory {
  id: string;
  label: string;
  slug: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  categorySlug: string;
  status: PublishStatus;
  order: number;
  kind: "image" | "video";
  media: MediaRef;
  /** Poster for video items. */
  poster?: MediaRef;
  videoUrl?: string;
  location: string;
  serviceSlug: string;
  year: number;
}

export interface BeforeAfterProject {
  id: string;
  title: string;
  status: PublishStatus;
  order: number;
  serviceSlug: string;
  categorySlug: string;
  summary: string;
  before: MediaRef;
  after: MediaRef;
  /** Measured outcome shown beside the slider. */
  metrics: { id: string; label: string; before: string; after: string }[];
}

export interface GalleryPageContent {
  hero: { eyebrow: string; title: string; lede: string };
  categories: GalleryCategory[];
  beforeAfterTitle: string;
  emptyState: string;
}

export interface Testimonial {
  id: string;
  status: PublishStatus;
  order: number;
  name: string;
  role: string;
  company: string;
  rating: number;
  quote: string;
  serviceSlug: string;
  location: string;
  date: string;
  featured: boolean;
  verified: boolean;
}

export interface ReviewsPageContent {
  hero: { eyebrow: string; title: string; lede: string };
  summary: {
    averageLabel: string;
    countLabel: string;
    breakdownLabel: string;
  };
  trustIndicators: { id: string; label: string; detail: string }[];
  cta: { title: string; body: string; actions: LinkRef[] };
}

export interface Faq {
  id: string;
  status: PublishStatus;
  order: number;
  question: string;
  answer: string;
  categorySlug: ServiceCategory | "general";
  featured: boolean;
}

export interface FaqPageContent {
  hero: { eyebrow: string; title: string; lede: string };
  categories: { id: string; slug: string; label: string; blurb: string }[];
  cta: { title: string; body: string; actions: LinkRef[] };
}

/* ------------------------------------------------------------------ */
/* Contact & quote                                                     */
/* ------------------------------------------------------------------ */

export interface ContactPageContent {
  hero: { eyebrow: string; title: string; lede: string };
  channels: {
    id: string;
    kind: "phone" | "whatsapp" | "email" | "social" | "form";
    label: string;
    value: string;
    href: string;
    note: string;
  }[];
  form: {
    title: string;
    lede: string;
    consentNote: string;
    successTitle: string;
    successBody: string;
    submitLabel: string;
  };
  addressCard: {
    title: string;
    body: string;
  };
}

export interface QuotePageContent {
  hero: { eyebrow: string; title: string; lede: string };
  calculator: {
    title: string;
    lede: string;
    panelLabel: string;
    resultLabels: {
      total: string;
      perPanel: string;
      duration: string;
      slot: string;
    };
    slotNote: string;
    disclaimer: string;
    /** Used to turn coating minutes into realistic time on site. */
    crewSize: number;
    productiveMinutesPerDay: number;
    /** Floor covering access, set-up and the pre-coating wash. */
    minimumOnSiteMinutes: number;
    /** Volume bands the calculator applies, largest threshold last. */
    volumeBands: {
      id: string;
      minPanels: number;
      discountPct: number;
      label: string;
    }[];
  };
  form: {
    title: string;
    lede: string;
    consentNote: string;
    successTitle: string;
    successBody: string;
    submitLabel: string;
  };
  assurances: { id: string; label: string; detail: string }[];
}

/* ------------------------------------------------------------------ */
/* SEO & appearance                                                    */
/* ------------------------------------------------------------------ */

export interface PageSeo {
  title: string;
  description: string;
  keywords?: string[];
  ogImageText?: string;
  noindex?: boolean;
}

export interface SeoSettings {
  siteUrl: string;
  titleTemplate: string;
  defaultTitle: string;
  defaultDescription: string;
  keywords: string[];
  twitterHandle: string;
  organisationType: string;
  verification: { google: string; bing: string };
  pages: Record<string, PageSeo>;
}

export interface AppearanceSettings {
  accent: string;
  accentSecondary: string;
  /** Master switches so the owner can dial motion down without code. */
  motion: {
    loadingScreen: boolean;
    pageTransitions: boolean;
    particles: boolean;
    parallax: boolean;
    cursorEffects: boolean;
    grain: boolean;
    intensity: "subtle" | "balanced" | "full";
  };
  loader: { headline: string; subline: string; minDurationMs: number };
  radius: number;
}

/* ------------------------------------------------------------------ */
/* Legal                                                               */
/* ------------------------------------------------------------------ */

export interface LegalDocument {
  title: string;
  intro: string;
  updated: string;
  sections: { id: string; heading: string; body: string[] }[];
}

export interface LegalSettings {
  privacy: LegalDocument;
  terms: LegalDocument;
}

/* ------------------------------------------------------------------ */
/* Blog / news                                                         */
/* ------------------------------------------------------------------ */

export interface Post {
  id: string;
  slug: string;
  status: PublishStatus;
  order: number;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  author: string;
  publishedAt: string;
  readMinutes: number;
  cover: MediaRef;
  seo: PageSeo;
}

/* ------------------------------------------------------------------ */
/* Leads                                                               */
/* ------------------------------------------------------------------ */

export type LeadStatus =
  | "new"
  | "contacted"
  | "quoted"
  | "scheduled"
  | "won"
  | "lost";

export type LeadSource = "contact" | "quote" | "calculator" | "phone" | "referral";

export interface LeadNote {
  id: string;
  body: string;
  author: string;
  createdAt: string;
}

export interface LeadEvent {
  id: string;
  kind: "status" | "note" | "assignment" | "created";
  from?: string;
  to?: string;
  body?: string;
  author: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  reference: string;
  createdAt: string;
  updatedAt: string;
  status: LeadStatus;
  source: LeadSource;
  name: string;
  email: string;
  phone: string;
  company: string;
  propertyType: "residential" | "commercial" | "";
  serviceSlug: string;
  /** Free-form vehicle / aircraft identification. */
  assetDetails: string;
  panelCount: number | null;
  estimatedValue: number | null;
  message: string;
  assignedTo: string;
  notes: LeadNote[];
  history: LeadEvent[];
  consent: boolean;
  pageUrl: string;
}

/* ------------------------------------------------------------------ */
/* Portal-side records                                                 */
/* ------------------------------------------------------------------ */

export interface PortalUser {
  id: string;
  name: string;
  email: string;
  role: "owner" | "manager" | "staff";
  active: boolean;
  createdAt: string;
}

export interface EmailTemplate {
  id: string;
  key: string;
  name: string;
  subject: string;
  body: string;
  description: string;
  enabled: boolean;
}

export interface MediaAsset {
  id: string;
  name: string;
  kind: "image" | "video" | "document" | "vector";
  src: string;
  alt: string;
  bytes: number;
  width: number;
  height: number;
  folder: string;
  createdAt: string;
}

export interface PricingItem {
  id: string;
  status: PublishStatus;
  order: number;
  serviceSlug: string;
  name: string;
  unit: string;
  price: number | null;
  priceNote: string;
  duration: string;
  includes: string[];
  featured: boolean;
}

export interface AnalyticsEvent {
  id: string;
  kind: "pageview" | "lead" | "calculator" | "cta";
  path: string;
  referrer: string;
  createdAt: string;
  meta: Record<string, string | number>;
}

/* ------------------------------------------------------------------ */
/* The aggregate document                                              */
/* ------------------------------------------------------------------ */

export interface SiteContent {
  brand: BrandSettings;
  business: BusinessSettings;
  contact: ContactSettings;
  navigation: NavigationSettings;
  footer: FooterSettings;
  appearance: AppearanceSettings;
  seo: SeoSettings;
  legal: LegalSettings;
  home: HomeContent;
  about: AboutContent;
  process: ProcessContent;
  galleryPage: GalleryPageContent;
  reviewsPage: ReviewsPageContent;
  faqPage: FaqPageContent;
  contactPage: ContactPageContent;
  quotePage: QuotePageContent;
  services: ServiceDoc[];
  galleryItems: GalleryItem[];
  beforeAfter: BeforeAfterProject[];
  testimonials: Testimonial[];
  faqs: Faq[];
  pricing: PricingItem[];
  posts: Post[];
  emailTemplates: EmailTemplate[];
  media: MediaAsset[];
  users: PortalUser[];
}

/** Keys addressable as CMS singletons. */
export type SingletonKey =
  | "brand"
  | "business"
  | "contact"
  | "navigation"
  | "footer"
  | "appearance"
  | "seo"
  | "legal"
  | "home"
  | "about"
  | "process"
  | "galleryPage"
  | "reviewsPage"
  | "faqPage"
  | "contactPage"
  | "quotePage";

/** Keys addressable as CMS collections. */
export type CollectionKey =
  | "services"
  | "galleryItems"
  | "beforeAfter"
  | "testimonials"
  | "faqs"
  | "pricing"
  | "posts"
  | "emailTemplates"
  | "media"
  | "users";
