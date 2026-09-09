import type { ServiceDoc, SiteContent } from "@/content/types";
import { appearance, brand, business, contact, footer, navigation, seo } from "./identity";
import { home } from "./home";
import { legal } from "./legal";
import { about, contactPage, faqPage, galleryPage, process, quotePage, reviewsPage } from "./pages";
import { solarService } from "./service-solar";
import { ceramicService } from "./service-ceramic";
import { automotiveService } from "./service-automotive";
import { correctionService } from "./service-correction";
import { interiorService } from "./service-interior";
import { maintenanceService } from "./service-maintenance";
import { aircraftService } from "./service-aircraft";
import { marineService } from "./service-marine";
import { windowsService } from "./service-windows";
import { fleetService } from "./service-fleet";
import { beforeAfter, emailTemplates, galleryItems, media, posts, pricing, testimonials, users } from "./collections";
import { faqs } from "./faqs";

/* Order is the site's hierarchy: vehicle detailing leads, the specialist
   divisions follow. `order` on each document is what actually sorts them. */
export const services: ServiceDoc[] = [
  automotiveService,
  ceramicService,
  correctionService,
  interiorService,
  maintenanceService,
  aircraftService,
  solarService,
  marineService,
  windowsService,
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
