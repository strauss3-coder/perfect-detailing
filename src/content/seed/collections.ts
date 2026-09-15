import type {
  BeforeAfterProject,
  EmailTemplate,
  GalleryItem,
  MediaAsset,
  PortalUser,
  Post,
  PricingItem,
  Testimonial,
} from "@/content/types";

/* ------------------------------------------------------------------ */
/* Gallery                                                             */
/* ------------------------------------------------------------------ */

export const galleryItems: GalleryItem[] = [
  { id: "g1", title: "Nine years of automatic washing", categorySlug: "correction", status: "published", order: 1, kind: "image", media: { src: "/work/bmw7/before-bonnet.webp", alt: "Raking sunlight across the uncorrected black bonnet of a BMW 7 Series, showing the haze left by years of automated washing", ratio: 16 / 9, motif: "gloss-meter" }, location: "Witbank", serviceSlug: "paint-correction", year: 2023 },
  { id: "g2", title: "Haze across the bootlid", categorySlug: "correction", status: "published", order: 2, kind: "image", media: { src: "/work/bmw7/before-bootlid.webp", alt: "The bootlid of a black BMW 7 Series before correction, the brickwork behind it breaking up in the reflection", ratio: 16 / 9, motif: "gloss-meter" }, location: "Witbank", serviceSlug: "paint-correction", year: 2023 },
  { id: "g3", title: "The same car, corrected", categorySlug: "correction", status: "published", order: 3, kind: "image", media: { src: "/work/bmw7/after-rear-quarter.webp", alt: "The corrected rear quarter and tail lamp of the same BMW 7 Series, reflection running clean through the curve", ratio: 16 / 9, motif: "sedan" }, location: "Witbank", serviceSlug: "paint-correction", year: 2023 },
  { id: "g4", title: "Before: AMG flank in the sun", categorySlug: "correction", status: "published", order: 4, kind: "image", media: { src: "/work/glc43/before-flank.webp", alt: "The flank of a black Mercedes-AMG GLC 43 before correction, sunlight showing the marring in the paint", ratio: 16 / 9, motif: "suv" }, location: "Witbank", serviceSlug: "paint-correction", year: 2023 },
  { id: "g5", title: "Before: 3 Series out of the bay", categorySlug: "correction", status: "published", order: 5, kind: "image", media: { src: "/work/bmw3/polish-before.webp", alt: "A blue BMW 3 Series photographed outside the wash bay before correction, still wet", ratio: 16 / 9, motif: "sedan" }, location: "Witbank", serviceSlug: "paint-correction", year: 2023 },
  { id: "g6", title: "After: 3 Series on the floor", categorySlug: "correction", status: "published", order: 6, kind: "image", media: { src: "/work/bmw3/polish-after.webp", alt: "The same blue BMW 3 Series on the showroom floor after correction, the paint returning a clean reflection", ratio: 16 / 9, motif: "sedan" }, location: "Witbank", serviceSlug: "paint-correction", year: 2023 },
  { id: "g7", title: "Before: i8 bonnet vent", categorySlug: "correction", status: "published", order: 7, kind: "image", media: { src: "/work/i8/before-vent.webp", alt: "The bonnet vent and surrounding paint of a BMW i8 before correction, the finish flat and dull", ratio: 16 / 9, motif: "coupe" }, location: "Witbank", serviceSlug: "paint-correction", year: 2023 },
  { id: "g8", title: "Before: i8 bonnet and screen", categorySlug: "correction", status: "published", order: 8, kind: "image", media: { src: "/work/i8/before-bonnet.webp", alt: "The bonnet and windscreen of a BMW i8 before correction", ratio: 16 / 9, motif: "coupe" }, location: "Witbank", serviceSlug: "paint-correction", year: 2023 },
  { id: "g9", title: "In the bay, before a machine is switched on", categorySlug: "correction", status: "published", order: 9, kind: "image", media: { src: "/work/panamera/polish-before.webp", alt: "A black Porsche Panamera standing in the wash bay under inspection lighting before correction begins", ratio: 16 / 9, motif: "gloss-meter" }, location: "Witbank", serviceSlug: "paint-correction", year: 2023 },
  { id: "g10", title: "Part-way through the cut", categorySlug: "correction", status: "published", order: 10, kind: "image", media: { src: "/work/panamera/polish-progress.webp", alt: "A black Porsche flank part-way through correction, compound haze still visible in the reflection", ratio: 16 / 9, motif: "polisher" }, location: "Witbank", serviceSlug: "paint-correction", year: 2023 },
  { id: "g11", title: "Bonded fallout lifting under clay", categorySlug: "correction", status: "published", order: 11, kind: "image", media: { src: "/work/panamera/clay-bar.webp", alt: "A gloved hand drawing a clay bar across a foamed black panel beside the Porsche crest", ratio: 9 / 16, motif: "microfibre" }, location: "Witbank", serviceSlug: "paint-correction", year: 2023 },
  { id: "g13", title: "Coated bonnet, SL 65 AMG", categorySlug: "ceramic", status: "published", order: 12, kind: "image", media: { src: "/work/sl65/body-coating.webp", alt: "The coated bonnet and wing of a Mercedes-AMG SL 65 returning one clean reflection", ratio: 16 / 9, motif: "shield" }, location: "Witbank", serviceSlug: "ceramic-coating", year: 2023 },
  { id: "g14", title: "Glass coating going on", categorySlug: "ceramic", status: "published", order: 13, kind: "image", media: { src: "/work/sl65/windscreen-coating.webp", alt: "A ceramic glass coating being worked across a windscreen with a block applicator", ratio: 16 / 9, motif: "window" }, location: "Witbank", serviceSlug: "ceramic-coating", year: 2023 },
  { id: "g15", title: "Sky returned whole", categorySlug: "ceramic", status: "published", order: 14, kind: "image", media: { src: "/work/i8/after-gloss-panel.webp", alt: "A coated dark panel returning a tree and open sky as one undistorted image", ratio: 16 / 9, motif: "sparkle" }, location: "Witbank", serviceSlug: "ceramic-coating", year: 2023 },
  { id: "g16", title: "Snow foam over a coated crest", categorySlug: "ceramic", status: "published", order: 15, kind: "image", media: { src: "/work/panamera/foam-crest.webp", alt: "Snow foam breaking and running off the coated bonnet of a black Porsche around the crest", ratio: 16 / 9, motif: "foam-cannon" }, location: "Witbank", serviceSlug: "ceramic-coating", year: 2023 },
  { id: "g17", title: "Full foam covering, left to dwell", categorySlug: "ceramic", status: "published", order: 16, kind: "image", media: { src: "/work/panamera/foam-car.webp", alt: "A black Porsche Panamera under a full covering of snow foam before any contact wash", ratio: 16 / 9, motif: "foam-cannon" }, location: "Witbank", serviceSlug: "ceramic-coating", year: 2023 },
  { id: "g18", title: "Foam over the e-hybrid badge", categorySlug: "ceramic", status: "published", order: 17, kind: "image", media: { src: "/work/panamera/foam-badge.webp", alt: "Snow foam running off the coated rear quarter of a Porsche around the e-hybrid badge", ratio: 16 / 9, motif: "droplet" }, location: "Witbank", serviceSlug: "ceramic-coating", year: 2023 },
  { id: "g19", title: "Reflection along the full flank", categorySlug: "ceramic", status: "published", order: 18, kind: "image", media: { src: "/work/panamera/polish-flank.webp", alt: "A coated black Porsche flank returning the yard behind it without distortion", ratio: 16 / 9, motif: "gloss-meter" }, location: "Witbank", serviceSlug: "ceramic-coating", year: 2023 },
  { id: "g20", title: "Coated, from above the quarter", categorySlug: "ceramic", status: "published", order: 19, kind: "image", media: { src: "/work/panamera/polish-rear.webp", alt: "A coated black Porsche photographed from above the rear quarter, panels returning a sharp reflection", ratio: 1600 / 1009, motif: "coupe" }, location: "Witbank", serviceSlug: "ceramic-coating", year: 2023 },
  { id: "g23", title: "Panamera, finished", categorySlug: "automotive", status: "published", order: 20, kind: "image", media: { src: "/work/panamera/polish-side.webp", alt: "A black Porsche Panamera Sport Turismo photographed outdoors after a full detail", ratio: 16 / 9, motif: "coupe" }, location: "Witbank", serviceSlug: "automotive-detailing", year: 2023 },
  { id: "g24", title: "7 Series, collected", categorySlug: "automotive", status: "published", order: 21, kind: "image", media: { src: "/work/bmw7/after-front.webp", alt: "A black BMW 7 Series photographed from the front quarter after detailing", ratio: 16 / 9, motif: "sedan" }, location: "Witbank", serviceSlug: "automotive-detailing", year: 2023 },
  { id: "g25", title: "3 Series, collected", categorySlug: "automotive", status: "published", order: 22, kind: "image", media: { src: "/work/bmw3/after-front.webp", alt: "A blue BMW 3 Series photographed from the front quarter after detailing", ratio: 16 / 9, motif: "sedan" }, location: "Witbank", serviceSlug: "automotive-detailing", year: 2023 },
  { id: "g26", title: "GLC 43 AMG, finished", categorySlug: "automotive", status: "published", order: 23, kind: "image", media: { src: "/work/glc43/after-front.webp", alt: "A black Mercedes-AMG GLC 43 photographed from the front quarter after detailing", ratio: 16 / 9, motif: "suv" }, location: "Witbank", serviceSlug: "automotive-detailing", year: 2023 },
  { id: "g27", title: "i8 nose, after", categorySlug: "automotive", status: "published", order: 24, kind: "image", media: { src: "/work/i8/after-nose.webp", alt: "The nose and bonnet vent of a BMW i8 after detailing, photographed square on", ratio: 9 / 16, motif: "coupe" }, location: "Witbank", serviceSlug: "automotive-detailing", year: 2023 },
  { id: "g28", title: "SL 65 AMG, bonnet up", categorySlug: "automotive", status: "published", order: 25, kind: "image", media: { src: "/work/sl65/after-detailing.webp", alt: "A Mercedes-AMG SL 65 with the bonnet raised after detailing, photographed from the front quarter", ratio: 1182 / 665, motif: "coupe" }, location: "Witbank", serviceSlug: "automotive-detailing", year: 2023 },
  { id: "g29", title: "Console detail, brush and foam", categorySlug: "interiors", status: "published", order: 26, kind: "image", media: { src: "/work/i8/interior-brush.webp", alt: "A detailing brush working foam through the switchgear of a car console", ratio: 9 / 16, motif: "interior" }, location: "Witbank", serviceSlug: "interior-detailing", year: 2023 },
  { id: "g30", title: "Panamera cabin, front seats", categorySlug: "interiors", status: "published", order: 27, kind: "image", media: { src: "/work/panamera/cabin-front.webp", alt: "The front cabin of a Porsche Panamera after a full interior detail", ratio: 16 / 9, motif: "interior" }, location: "Witbank", serviceSlug: "interior-detailing", year: 2023 },
  { id: "g31", title: "Dashboard and centre console", categorySlug: "interiors", status: "published", order: 28, kind: "image", media: { src: "/work/panamera/cabin-dash.webp", alt: "A cleaned Porsche dashboard, centre console and switchgear photographed from the passenger side", ratio: 16 / 9, motif: "interior" }, location: "Witbank", serviceSlug: "interior-detailing", year: 2023 },
  { id: "g32", title: "Sill, seat base and mat", categorySlug: "interiors", status: "published", order: 29, kind: "image", media: { src: "/work/panamera/cabin-sill.webp", alt: "A cleaned Porsche door sill, seat base and floor mat after protection was applied", ratio: 16 / 9, motif: "interior" }, location: "Witbank", serviceSlug: "interior-detailing", year: 2023 },
  { id: "g33", title: "The whole cabin, from the rear", categorySlug: "interiors", status: "published", order: 30, kind: "image", media: { src: "/work/panamera/cabin-wide.webp", alt: "The full cabin of a Porsche Panamera photographed from the rear after a complete interior detail", ratio: 16 / 9, motif: "interior" }, location: "Witbank", serviceSlug: "interior-detailing", year: 2023 },
  { id: "g34", title: "Boot before extraction", categorySlug: "interiors", status: "published", order: 31, kind: "image", media: { src: "/work/panamera/boot-before.webp", alt: "The open boot of a Porsche Panamera before the carpet was extracted", ratio: 16 / 9, motif: "interior" }, location: "Witbank", serviceSlug: "interior-detailing", year: 2023 },
  { id: "g35", title: "Boot carpet, extracted", categorySlug: "interiors", status: "published", order: 32, kind: "image", media: { src: "/work/panamera/boot-after.webp", alt: "The boot floor and carpet of a Porsche Panamera after hot-water extraction, the pile lifted and even", ratio: 16 / 9, motif: "interior" }, location: "Witbank", serviceSlug: "interior-detailing", year: 2023 },
  { id: "g36", title: "Red quilted leather, conditioned", categorySlug: "interiors", status: "published", order: 33, kind: "image", media: { src: "/work/sl65/cabin-red.webp", alt: "The red quilted leather cabin of a Mercedes-AMG SL 65 after cleaning and conditioning", ratio: 665 / 1182, motif: "interior" }, location: "Witbank", serviceSlug: "interior-detailing", year: 2023 },
  { id: "g37", title: "SL 65 cabin, seats and sill", categorySlug: "interiors", status: "published", order: 34, kind: "image", media: { src: "/work/sl65/cabin-red-wide.webp", alt: "The red quilted seats, sill and floor of a Mercedes-AMG SL 65 after an interior detail", ratio: 665 / 1182, motif: "interior" }, location: "Witbank", serviceSlug: "interior-detailing", year: 2023 },
  { id: "g38", title: "AMG mat, re-napped", categorySlug: "interiors", status: "published", order: 35, kind: "image", media: { src: "/work/sl65/floor-mat.webp", alt: "An AMG floor mat after extraction, the pile lifted and brushed to an even nap", ratio: 665 / 1182, motif: "microfibre" }, location: "Witbank", serviceSlug: "interior-detailing", year: 2023 },
  { id: "g39", title: "Engine bay before", categorySlug: "detail", status: "published", order: 36, kind: "image", media: { src: "/work/sl65/engine-bay-before.webp", alt: "The twin-turbo V12 engine bay of a Mercedes-AMG SL 65 before cleaning", ratio: 1182 / 665, motif: "engine-bay" }, location: "Witbank", serviceSlug: "automotive-detailing", year: 2023 },
  { id: "g40", title: "The same bay, cleaned and dressed", categorySlug: "detail", status: "published", order: 37, kind: "image", media: { src: "/work/sl65/engine-bay-after.webp", alt: "The same Mercedes-AMG V12 engine bay after a dry-biased clean and satin dressing", ratio: 16 / 9, motif: "engine-bay" }, location: "Witbank", serviceSlug: "automotive-detailing", year: 2023 },
  { id: "g41", title: "Wheel face and arch, coated", categorySlug: "detail", status: "published", order: 38, kind: "image", media: { src: "/work/panamera/polish-arch.webp", alt: "A cleaned and coated Porsche wheel face and arch, the paint above it holding a clean reflection", ratio: 1600 / 1076, motif: "shield" }, location: "Witbank", serviceSlug: "ceramic-coating", year: 2023 },
  { id: "g42", title: "i8 arch and wheel", categorySlug: "detail", status: "published", order: 39, kind: "image", media: { src: "/work/i8/after-wheel.webp", alt: "The front wheel and arch of a BMW i8 after detailing", ratio: 16 / 9, motif: "shield" }, location: "Witbank", serviceSlug: "automotive-detailing", year: 2023 },
];

export const beforeAfter: BeforeAfterProject[] = [
  {
    id: "ba-sl65-bay",
    title: "AMG V12 engine bay, SL 65",
    status: "published",
    order: 1,
    serviceSlug: "automotive-detailing",
    categorySlug: "detail",
    summary:
      "Same camera position, same bonnet angle, one working day apart. An engine bay is cleaned with control rather than a hose — electronics and the alternator covered first, low-moisture degreasing with detail brushes, force-dried with filtered air, then a satin dressing on the plastics and hoses. No wet-look gloss, because that is what runs onto the block the first time the engine gets hot.",
    before: { src: "/work/sl65/engine-bay-before.webp", alt: "The twin-turbo V12 engine bay of a Mercedes-AMG SL 65 before cleaning, plastics dull and road film through the shuts", ratio: 1182 / 665, motif: "engine-bay" },
    after: { src: "/work/sl65/engine-bay-after.webp", alt: "The same Mercedes-AMG V12 engine bay after a dry-biased clean and satin dressing", ratio: 1182 / 665, motif: "engine-bay" },
    metrics: [
      { id: "m1", label: "Plastics", before: "Grey", after: "Satin dressed" },
      { id: "m2", label: "Shuts", before: "Debris held", after: "Cleared, dried" },
      { id: "m3", label: "Method", before: "—", after: "Low moisture" },
    ],
  },
  {
    id: "ba-panamera-boot",
    title: "Boot carpet extraction, Panamera",
    status: "published",
    order: 2,
    serviceSlug: "interior-detailing",
    categorySlug: "interiors",
    summary:
      "Same view into the load floor, before and after. An estate boot takes more abuse than any seat in the car and is the last thing anyone thinks to clean. Hot solution injected into the pile under pressure and pulled straight back out, repeated until the recovery water ran clear, then force-dried and the nap brushed back so it dried even rather than matted.",
    before: { src: "/work/panamera/boot-before.webp", alt: "The open boot of a Porsche Panamera before the carpet was extracted", ratio: 16 / 9, motif: "interior" },
    after: { src: "/work/panamera/boot-after.webp", alt: "The boot floor and carpet of a Porsche Panamera after hot-water extraction, the pile lifted and even", ratio: 16 / 9, motif: "interior" },
    metrics: [
      { id: "m1", label: "Method", before: "—", after: "Extraction" },
      { id: "m2", label: "Pile", before: "Flat, patchy", after: "Re-napped" },
      { id: "m3", label: "Handed back", before: "—", after: "Force-dried" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

const t = (
  id: string, order: number, name: string, role: string, company: string,
  rating: number, quote: string, serviceSlug: string, location: string,
  date: string, featured = false,
): Testimonial => ({ id, status: "published", order, name, role, company, rating, quote, serviceSlug, location, date, featured, verified: true });

export const testimonials: Testimonial[] = [
  t("tst1", 1, "Riaan van Niekerk", "Facilities Manager", "Highveld Logistics Park", 5,
    "We were cleaning 240 panels four times a year and still watching output drift. Perfect Detailing coated the array in March and we have been on two cleans a year since, with better numbers than we had on four. The payback argument was not marketing — it showed up in the meter data.",
    "solar-panel-ceramic-coating", "Middelburg", "2026-04-18", true),
  t("tst2", 2, "Nadia Pillay", "Homeowner", "", 5,
    "Sixteen panels on a double-storey roof, so I was mostly worried about someone falling off my house. They arrived with proper fall protection, were done by lunchtime, and showed me the before and after readings on the inverter app. Rain genuinely cleans them now.",
    "solar-panel-ceramic-coating", "Witbank", "2026-02-09", true),
  t("tst3", 3, "Marius Botha", "Owner", "", 5,
    "Eleven years of automated washes had wrecked the paint on my E-Class. They measured the clear coat first and told me exactly what they could and could not fix — which is the first time anyone in this industry has been straight with me. The finish is better than the car has looked since it was new.",
    "automotive-detailing", "Witbank", "2026-01-27", true),
  t("tst4", 4, "Thandeka Mokoena", "Operations Director", "Highveld Distribution", 5,
    "Eighteen vans, cleaned overnight, never once off the road. The per-vehicle records are what won me over — I get told when a wrap edge is lifting instead of finding out when it peels on the highway. One invoice a month and I stopped thinking about it.",
    "fleet-services", "Witbank", "2026-03-05", true),
  t("tst5", 5, "Dr Philip Naidoo", "Aircraft Owner", "", 5,
    "The dry wash sold me. My previous outfit hosed the aircraft down and I spent the next year worrying about what was sitting in the hinges. These guys used no water at all, covered every port on a checklist, and handed me a completion record for the aircraft file.",
    "aircraft-detailing", "Witbank Airfield", "2025-11-14", true),
  t("tst6", 6, "Kobus Steyn", "Owner", "", 5,
    "Five-year coating on a black M4. Three days, and they sent photographs at the end of each one so I could see the correction progressing. Two winters later it still beads like the day I collected it.",
    "ceramic-coating", "Middelburg", "2025-08-22", false),
  t("tst7", 7, "Lerato Dlamini", "Body Corporate Trustee", "Riverview Estate", 4,
    "Coordinating 12 rooftops across an estate was always going to be messy and it was — mostly on our side, with owners changing dates. They absorbed the rescheduling without complaint and finished the whole estate in a fortnight. I would have liked a little more notice on the two weather moves.",
    "solar-panel-ceramic-coating", "Witbank", "2025-10-30", false),
  t("tst8", 8, "Anton Ferreira", "Sales Manager", "eMalahleni Motor Group", 5,
    "We use them for pre-delivery on our approved-used stock. Handover coatings are applied on our floor, the documentation comes branded for the customer pack, and our sales team stopped fielding complaints about swirl marks on black cars.",
    "ceramic-coating", "Secunda", "2026-05-11", false),
  t("tst9", 9, "Sarah Whitehead", "Homeowner", "", 5,
    "Interior only — three kids, a golden retriever and six years of accumulated evidence. The extraction on the carpets was genuinely shocking to watch. It smells like a car again rather than like a dog.",
    "automotive-detailing", "Middelburg", "2025-09-03", false),
  t("tst10", 10, "Gerhard Loots", "Plant Manager", "Mpumalanga Agri Processing", 5,
    "A 400-panel ground array in a dusty environment, which is close to the worst case. They were honest that our soiling recovery would be at the top of their range and that cleaning frequency mattered more than usual. Both turned out to be true.",
    "solar-panel-ceramic-coating", "Ermelo", "2026-06-02", false),
  t("tst11", 11, "Imraan Adams", "Owner", "", 4,
    "Excellent work on the paint correction and the headlights look new. The only thing I would flag is that the job ran half a day over the estimate — they explained why and did not charge extra, but I had to rearrange a collection.",
    "automotive-detailing", "eMalahleni", "2025-12-08", false),
  t("tst12", 12, "Chris du Plessis", "Chief Pilot", "Highveld Air Charter", 5,
    "Three airframes on a rolling schedule. They work around our maintenance calendar rather than the other way round, the scope is agreed in writing before every visit, and the covers checklist is walked in reverse in front of me. That level of process is rare at this end of aviation.",
    "aircraft-detailing", "Secunda", "2026-04-29", false),
];

/* ------------------------------------------------------------------ */
/* Pricing                                                             */
/* ------------------------------------------------------------------ */

export const pricing: PricingItem[] = [
  { id: "pr1", status: "published", order: 1, serviceSlug: "solar-panel-ceramic-coating", name: "Solar panel ceramic coating", unit: "per panel", price: 280, priceNote: "Standard rooftop modules at accessible height", duration: "≈10 minutes per panel", includes: ["Deionised pre-wash", "Scale treatment where required", "Ceramic application and levelling", "Cure supervision and beading test", "Written aftercare schedule"], featured: true },
  { id: "pr2", status: "published", order: 2, serviceSlug: "solar-panel-ceramic-coating", name: "Solar array professional clean", unit: "per panel", price: 28, priceNote: "Standalone clean, or twice-yearly on coated arrays", duration: "≈3 minutes per panel", includes: ["Deionised low-pressure wash", "Frame and rail clean", "Beading check on coated arrays", "Condition report"], featured: false },
  { id: "pr3", status: "published", order: 3, serviceSlug: "automotive-detailing", name: "Maintenance detail", unit: "per vehicle", price: null, priceNote: "Quoted by vehicle size", duration: "3–4 hours", includes: ["Safe contact wash", "Light decontamination", "Interior vacuum and wipe-down", "Sealant top-up"], featured: false },
  { id: "pr4", status: "published", order: 4, serviceSlug: "automotive-detailing", name: "Full detail", unit: "per vehicle", price: null, priceNote: "Quoted by size and condition", duration: "1–2 days", includes: ["Full decontamination", "Single-stage machine polish", "Interior deep clean with extraction", "Engine bay", "Six-month sealant"], featured: true },
  { id: "pr5", status: "published", order: 5, serviceSlug: "ceramic-coating", name: "Ceramic coating — five year", unit: "per vehicle", price: null, priceNote: "Quoted after paint inspection", duration: "2–3 days", includes: ["Two-stage correction", "Base and top coat on paint", "Glass, wheels and trim coated", "Written five-year warranty"], featured: true },
  { id: "pr6", status: "published", order: 6, serviceSlug: "aircraft-detailing", name: "Aircraft dry wash", unit: "per airframe", price: null, priceNote: "Quoted by type", duration: "3–6 hours", includes: ["Encapsulated dry wash", "Leading edges and belly", "Glass with correct media", "Gear legs and wells"], featured: false },
  { id: "pr8", status: "published", order: 8, serviceSlug: "marine-detailing", name: "Marine gelcoat restoration & coating", unit: "per vessel", price: null, priceNote: "Quoted after vessel survey", duration: "2–4 days", includes: ["Deep clean and growth removal", "Multi-stage gelcoat correction", "Marine ceramic coating", "Stainless and running gear treated"], featured: false },
  { id: "pr9", status: "published", order: 9, serviceSlug: "building-window-coating", name: "Building window ceramic coating", unit: "per m²", price: null, priceNote: "Quoted after building survey", duration: "Phased by elevation", includes: ["Deep clean and deposit removal", "Etch assessment", "Ceramic coating", "Maintenance programme"], featured: false },
  { id: "pr7", status: "published", order: 7, serviceSlug: "fleet-services", name: "Fleet presentation cycle", unit: "per vehicle per cycle", price: null, priceNote: "Quoted after site survey", duration: "30–45 min per vehicle", includes: ["Wrap-safe exterior wash", "Wheels and arches", "Cab clean", "Per-vehicle service record"], featured: false },
];

/* ------------------------------------------------------------------ */
/* Journal                                                             */
/* ------------------------------------------------------------------ */

export const posts: Post[] = [
  {
    id: "post5", slug: "your-swirl-marks-came-from-the-wash", status: "published", order: 1,
    title: "Your swirl marks came from the wash, not the road",
    excerpt: "Owners assume paint wears out. It does not — it gets scratched, almost always by the thing that was supposed to be cleaning it.",
    body: "Ask an owner where the swirl marks on their bonnet came from and you will usually hear something about age, or sun, or the highway. It is an understandable answer and it is almost never the right one. Paint does not wear out from being driven. It gets scratched, and the overwhelming majority of those scratches are installed during washing.\n\nThe mechanism is not subtle. A car collects a film of road dust, and that dust is silica — mineral, angular, and harder than clear coat. Anything dragged across an unrinsed panel drags that grit with it. A forecourt brush that has already been through forty vehicles is carrying forty vehicles' worth of it. A sponge holds grit in its pores and releases it under pressure. A chamois pulled over a panel that is not perfectly clean is a lapping tool.\n\nYou can see the pattern in the damage. Swirls are circular because they were put in by something moving in circles. Straight-line scratches down a flank came from a straight-line motion — usually drying. Holograms, that shimmering buffer trail visible in direct sun, are the signature of a rotary polisher used too fast by someone who did not refine afterwards. Every one of those is a record of a specific human action, not of weather.\n\nWhich leads somewhere slightly uncomfortable for our industry: correcting a car and then handing it back without changing how it is washed is selling the same job twice. The correction is genuine and permanent — the clear coat really is level — but if it goes back into an automatic wash every fortnight it will be visibly marred again inside eighteen months.\n\nSo the two things that actually protect a correction are a coating, which puts a harder sacrificial layer between the grit and your paint, and a wash method that stops introducing grit in the first place. Pre-soak so the dust leaves before anything touches the panel. Foam and let it dwell. Two buckets with grit guards, fresh media, top down, straight lines. Rinse with deionised water so it dries without spotting, and dry with filtered air or a plush towel rather than dragging anything across the surface.\n\nNone of that is difficult. It is just slower than the thing most people do instead, and the cost of the faster option is paid in clear coat.",
    category: "Detailing", author: "Perfect Detailing", publishedAt: "2026-08-26", readMinutes: 5,
    cover: { src: "/work/bmw7/before-bonnet.webp", alt: "Raking sunlight across a black bonnet showing the haze and swirl marks left by years of automated washing", ratio: 16 / 9, motif: "gloss-meter" },
    seo: { title: "Your swirl marks came from the wash, not the road", description: "Why almost every defect in a car's clear coat was installed during washing — and what actually protects a correction afterwards." },
  },
  {
    id: "post1", slug: "what-soiling-actually-costs-a-highveld-array", status: "published", order: 4,
    title: "What soiling actually costs a Highveld array",
    excerpt: "We monitored four commercial installations across a full dry season. The losses were larger than the owners expected, and almost none of them showed up as an alarm.",
    body: "Soiling is the only fault on a solar installation that never announces itself. Inverters do not alarm on it, monitoring platforms rarely flag it, and because it accumulates gradually there is no day on which anybody notices the array is producing less.\n\nAcross four Highveld commercial installations monitored through a full dry season, annualised soiling losses on uncoated arrays ran between 5.2% and 7.1%. The upper end belonged to a site adjacent to an unpaved access road — unsurprising, but worth stating, because proximity to dust sources matters far more than most owners assume.\n\nThe pattern within each quarter was consistent. Output recovered to near clean-state immediately after a professional clean, then declined roughly linearly for six to eight weeks before flattening as the deposit reached a stable thickness. That flattening is the dangerous part: the array settles into a degraded steady state and stays there until the next clean.\n\nWhat coating changes is the slope of that decline, not the starting point. A coated array loses ground more slowly and recovers more fully from ordinary rain, so the area under the curve — which is what you actually get paid for — is substantially larger.",
    category: "Solar", author: "Perfect Detailing", publishedAt: "2026-07-14", readMinutes: 4,
    cover: { src: "", alt: "Commercial rooftop array under a dusty Highveld sky", ratio: 16 / 9, motif: "solar-array" },
    seo: { title: "What soiling actually costs a Highveld array", description: "Four commercial installations monitored across a dry season, and what their soiling losses actually were." },
  },
  {
    id: "post2", slug: "why-your-coating-failed-early", status: "published", order: 2,
    title: "Why your coating failed early",
    excerpt: "In nine years we have inspected a lot of underperforming coatings. Almost none of them failed because of the product.",
    body: "When somebody calls to say their two-year-old coating has stopped beading, the cause is nearly always one of four things, and only one of them is the coating itself.\n\nThe first and most common is automated brush washing. Rotating brushes at a fuel station carry grit from every vehicle that went before yours. A handful of passes will abrade a ceramic film badly enough to destroy its hydrophobic behaviour while leaving it visually intact — which is why people are surprised.\n\nThe second is application over uncorrected or improperly prepped paint. A coating bonds to whatever it lands on. If polishing oils were still present, it bonded to those, and it will leave with them.\n\nThe third is chemistry: dish soap, wheel cleaners used on paint, and traffic film removers left to dwell. These are all designed to strip surface protection, and they are extremely good at it.\n\nThe fourth, genuinely, is product failure — and in our experience it is the rarest. Which is why our warranty conversations always start with how the car has been washed.",
    category: "Ceramic", author: "Perfect Detailing", publishedAt: "2026-05-28", readMinutes: 3,
    cover: { src: "", alt: "Close inspection of a coated panel under raking light", ratio: 16 / 9, motif: "coating-layers" },
    seo: { title: "Why your coating failed early", description: "The four reasons ceramic coatings underperform, and why the product is almost never the culprit." },
  },
  {
    id: "post3", slug: "the-case-against-hosing-down-an-aeroplane", status: "published", order: 5,
    title: "The case against hosing down an aeroplane",
    excerpt: "Water is the cheapest cleaning agent available and the most expensive thing you can leave inside an airframe.",
    body: "There is a reason maintenance organisations get nervous when somebody arrives at a hangar with a pressure washer.\n\nAn airframe has a great many places water can enter and very few from which it readily leaves. Control surface hinges, fastener heads, lap joints, the gap behind fairings and the recesses around inspection panels all hold moisture well past the point where the visible surface has dried. Trapped moisture against dissimilar metals is precisely the condition corrosion needs.\n\nEncapsulated dry washing sidesteps the problem entirely. The product lifts soiling into a lubricating film that is removed with clean media; the contamination leaves on the towel rather than in the run-off. Nothing enters a seam because nothing is flowing.\n\nThe secondary benefit is practical: with no run-off there is no containment requirement, no wet hangar floor and no argument with the airfield about where the water went. We can work alongside other aircraft without inconveniencing anybody.",
    category: "Aviation", author: "Perfect Detailing", publishedAt: "2026-03-02", readMinutes: 3,
    cover: { src: "", alt: "Aircraft being dry washed inside a hangar", ratio: 16 / 9, motif: "aircraft" },
    seo: { title: "The case against hosing down an aeroplane", description: "Why encapsulated dry washing is the right method for general aviation airframes." },
  },
  {
    id: "post4", slug: "reading-a-gloss-meter-without-fooling-yourself", status: "published", order: 3,
    title: "Reading a gloss meter without fooling yourself",
    excerpt: "A number is only useful if it was taken at the same point, at the same angle, on a surface in the same state. Most published readings fail at least one of those tests.",
    body: "Gloss units are the closest thing detailing has to an objective measure, which is exactly why they get abused.\n\nThree things make a reading meaningless. Taking the 'before' on a dirty panel and the 'after' on a clean one measures washing, not correction. Moving the measurement point between readings measures panel variation, not improvement. And taking the 'after' before a panel wipe measures polishing oils, which will be gone in a fortnight.\n\nOur job cards record the measurement point, the angle and the surface state for every reading, on both sides of the work. It makes our numbers look less impressive than the ones you see online. It also makes them true.\n\nIf a detailer shows you a before-and-after gloss figure, the useful question is not what the numbers were. It is where on the panel they were taken, and whether the paint had been wiped down first.",
    category: "Method", author: "Perfect Detailing", publishedAt: "2026-01-19", readMinutes: 3,
    cover: { src: "/work/bmw7/after-rear-quarter.webp", alt: "A corrected black rear quarter returning a sharp, unbroken reflection", ratio: 16 / 9, motif: "gloss-meter" },
    seo: { title: "Reading a gloss meter without fooling yourself", description: "How to take a gloss reading that means something, and how to spot one that does not." },
  },
];

/* ------------------------------------------------------------------ */
/* Portal records                                                      */
/* ------------------------------------------------------------------ */

export const emailTemplates: EmailTemplate[] = [
  { id: "et1", key: "lead-received", name: "Enquiry acknowledgement", subject: "We have your enquiry — {{reference}}", description: "Sent automatically to the customer when any form is submitted.", enabled: true,
    body: "Hi {{name}},\n\nThanks for getting in touch with Perfect Detailing. Your enquiry is logged as {{reference}} and one of us will come back to you within one working day — usually sooner.\n\nWhat you told us:\n{{message}}\n\nIf anything changes in the meantime, reply to this email or send us a WhatsApp on {{phone}}.\n\nPerfect Detailing" },
  { id: "et2", key: "quote-sent", name: "Quote issued", subject: "Your quote from Perfect Detailing — {{reference}}", description: "Sent when a written quote is issued against a lead.", enabled: true,
    body: "Hi {{name}},\n\nYour quote is attached. It is itemised so you can see what each element costs, and it holds for 30 days.\n\nSummary: {{service}}\nEstimated total: {{total}}\n\nOnce you are happy, reply and we will find a date. Nothing is charged until the work is done.\n\nPerfect Detailing" },
  { id: "et3", key: "booking-confirmed", name: "Booking confirmation", subject: "Confirmed — {{date}} — Perfect Detailing", description: "Sent when a job is scheduled.", enabled: true,
    body: "Hi {{name}},\n\nYou are booked for {{date}}. We will arrive between {{window}}.\n\nWhat we need from you: access, and somewhere to park the unit. We bring our own water and power.\n\nIf the weather turns we will call you the day before rather than arrive and waste your morning.\n\nPerfect Detailing" },
  { id: "et4", key: "aftercare", name: "Aftercare follow-up", subject: "Looking after your {{service}}", description: "Sent a week after handover with maintenance guidance.", enabled: true,
    body: "Hi {{name}},\n\nIt has been a week, so your coating is at full hardness and you can wash normally again.\n\nThe short version: pH-neutral shampoo, two buckets, no automated brush washes, and dry with the towel we left you.\n\nAnything that looks wrong, send us a photograph. Spot repairs inside the warranty are free.\n\nPerfect Detailing" },
  { id: "et5", key: "review-request", name: "Review request", subject: "How did we do?", description: "Sent a week after handover, requesting a review.", enabled: false,
    body: "Hi {{name}},\n\nWe would appreciate a few honest lines about the work. We publish the critical ones too, so please do not spare us.\n\n{{reviewLink}}\n\nThank you,\nPerfect Detailing" },
];

export const users: PortalUser[] = [
  { id: "u1", name: "Owner", email: "hello@perfectdetailing.co.za", role: "owner", active: true, createdAt: "2026-01-05T08:00:00.000Z" },
];

export const media: MediaAsset[] = [
  { id: "md1", name: "logo-bead-primary.svg", kind: "vector", src: "/brand/logo-bead.svg", alt: "Perfect Detailing primary lockup", bytes: 0, width: 320, height: 80, folder: "brand", createdAt: "2026-01-05T08:00:00.000Z" },
  { id: "md2", name: "logo-monochrome.svg", kind: "vector", src: "/brand/logo-monochrome.svg", alt: "Perfect Detailing monochrome lockup", bytes: 0, width: 320, height: 80, folder: "brand", createdAt: "2026-01-05T08:00:00.000Z" },
  { id: "md3", name: "mark-social.svg", kind: "vector", src: "/brand/mark-social.svg", alt: "Perfect Detailing social avatar", bytes: 0, width: 512, height: 512, folder: "brand", createdAt: "2026-01-05T08:00:00.000Z" },
];
