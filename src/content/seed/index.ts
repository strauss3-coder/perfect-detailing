import type { ServiceDoc, SiteContent } from "@/content/types";
import { appearance, brand, business, contact, footer, navigation, seo } from "./identity";
import { home } from "./home";
import { legal } from "./legal";
import { about, contactPage, faqPage, galleryPage, process, quotePage, reviewsPage } from "./pages";
import { solarService } from "./service-solar";
import { ceramicService } from "./service-ceramic";
import { automotiveService } from "./service-automotive";
import { aircraftService } from "./service-aircraft";
import { fleetService } from "./service-fleet";
import { beforeAfter, emailTemplates, galleryItems, media, posts, pricing, testimonials, users } from "./collections";
import { faqs } from "./faqs";

export const services: ServiceDoc[] = [
  solarService,
  ceramicService,
  automotiveService,
  aircraftService,
  fleetService,
];

/** The full default content set. Anything the CMS has not overridden falls back here. */
export const seedContent: SiteContent = {
  brand,
  business,
  contact,
  navigation,
  footer,
  appearance,
  seo,
  legal,
  home,
  about,
  process,
  galleryPage,
  reviewsPage,
  faqPage,
  contactPage,
  quotePage,
  services,
  galleryItems,
  beforeAfter,
  testimonials,
  faqs,
  pricing,
  posts,
  emailTemplates,
  media,
  users,
};
