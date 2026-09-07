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
  { id: "g1", title: "55 kWp warehouse array, Midrand", categorySlug: "solar", status: "published", order: 1, kind: "image", media: { src: "", alt: "Warehouse rooftop solar array after ceramic coating with water beading across the modules", ratio: 4 / 3, motif: "solar-array" }, location: "Middelburg", serviceSlug: "solar-panel-ceramic-coating", year: 2026 },
  { id: "g2", title: "Residential rooftop, Fourways", categorySlug: "solar", status: "published", order: 2, kind: "image", media: { src: "", alt: "Sixteen panel residential rooftop array freshly coated", ratio: 4 / 3, motif: "solar-panel" }, location: "Witbank", serviceSlug: "solar-panel-ceramic-coating", year: 2026 },
  { id: "g3", title: "Beading test, coated module", categorySlug: "solar", status: "published", order: 3, kind: "video", media: { src: "", alt: "Close-up of water beading and rolling off a coated solar module", ratio: 9 / 16, motif: "droplet" }, poster: { src: "", alt: "Water beads on coated photovoltaic glass", ratio: 9 / 16, motif: "droplet" }, videoUrl: "", location: "Secunda", serviceSlug: "solar-panel-ceramic-coating", year: 2026 },
  { id: "g4", title: "Three-stage correction, black saloon", categorySlug: "automotive", status: "published", order: 4, kind: "image", media: { src: "", alt: "Black saloon after three stage paint correction under raking studio light", ratio: 3 / 2, motif: "sedan" }, location: "Witbank", serviceSlug: "automotive-detailing", year: 2026 },
  { id: "g5", title: "Interior reset, family SUV", categorySlug: "automotive", status: "published", order: 5, kind: "image", media: { src: "", alt: "SUV interior after hot water extraction and leather conditioning", ratio: 3 / 2, motif: "interior" }, location: "Middelburg", serviceSlug: "automotive-detailing", year: 2026 },
  { id: "g6", title: "Engine bay detail, six-cylinder", categorySlug: "automotive", status: "published", order: 6, kind: "image", media: { src: "", alt: "Detailed engine bay with satin dressed hoses and plastics", ratio: 3 / 2, motif: "engine-bay" }, location: "eMalahleni", serviceSlug: "automotive-detailing", year: 2025 },
  { id: "g7", title: "Headlight restoration and re-coat", categorySlug: "automotive", status: "published", order: 7, kind: "image", media: { src: "", alt: "Restored headlight lens with fresh UV coating beside an untreated one", ratio: 3 / 2, motif: "headlight" }, location: "Bethal", serviceSlug: "automotive-detailing", year: 2025 },
  { id: "g8", title: "Five-year coating, coupe", categorySlug: "ceramic", status: "published", order: 8, kind: "image", media: { src: "", alt: "Coupe with multi-layer ceramic coating, water beading tightly on the bonnet", ratio: 3 / 2, motif: "coupe" }, location: "Middelburg", serviceSlug: "ceramic-coating", year: 2026 },
  { id: "g9", title: "Coated glass, rain footage", categorySlug: "ceramic", status: "published", order: 9, kind: "video", media: { src: "", alt: "Rain running off coated windscreen glass at speed", ratio: 16 / 9, motif: "droplet" }, poster: { src: "", alt: "Coated windscreen in rain", ratio: 16 / 9, motif: "droplet" }, videoUrl: "", location: "Witbank", serviceSlug: "ceramic-coating", year: 2025 },
  { id: "g10", title: "Wheel faces and calipers coated", categorySlug: "ceramic", status: "published", order: 10, kind: "image", media: { src: "", alt: "Coated alloy wheel face with brake dust releasing under a rinse", ratio: 1, motif: "shield" }, location: "Witbank", serviceSlug: "ceramic-coating", year: 2025 },
  { id: "g11", title: "Single-engine piston, hangar dry wash", categorySlug: "aircraft", status: "published", order: 11, kind: "image", media: { src: "", alt: "Single engine aircraft in a hangar after dry wash and coating", ratio: 3 / 2, motif: "aircraft" }, location: "Witbank Airfield", serviceSlug: "aircraft-detailing", year: 2026 },
  { id: "g12", title: "Leading edge, insect strike removed", categorySlug: "aircraft", status: "published", order: 12, kind: "image", media: { src: "", alt: "Aircraft wing leading edge cleaned of insect strike", ratio: 3 / 2, motif: "aircraft" }, location: "Secunda", serviceSlug: "aircraft-detailing", year: 2025 },
  { id: "g15", title: "Gelcoat restoration, sports cruiser", categorySlug: "marine", status: "published", order: 15, kind: "image", media: { src: "", alt: "Sports cruiser topsides after multi-stage gelcoat correction and marine ceramic coating", ratio: 3 / 2, motif: "marine" }, location: "Witbank", serviceSlug: "marine-detailing", year: 2026 },
  { id: "g16", title: "Coated hull at the waterline", categorySlug: "marine", status: "published", order: 16, kind: "image", media: { src: "", alt: "Waterline of a coated hull showing salt and growth releasing under a freshwater rinse", ratio: 4 / 3, motif: "droplet" }, location: "Middelburg", serviceSlug: "marine-detailing", year: 2025 },
  { id: "g17", title: "Office park facade, west elevation", categorySlug: "windows", status: "published", order: 17, kind: "image", media: { src: "", alt: "Commercial glazing after ceramic coating with rain running clear off the panes", ratio: 16 / 9, motif: "window" }, location: "Witbank", serviceSlug: "building-window-coating", year: 2026 },
  { id: "g18", title: "Residential glazing, hard water recovery", categorySlug: "windows", status: "published", order: 18, kind: "image", media: { src: "", alt: "Residential window after mineral deposit removal and ceramic coating", ratio: 3 / 2, motif: "window" }, location: "eMalahleni", serviceSlug: "building-window-coating", year: 2025 },
  { id: "g13", title: "Eighteen-van distribution fleet", categorySlug: "fleet", status: "published", order: 13, kind: "image", media: { src: "", alt: "Row of branded panel vans in a depot after an overnight cycle", ratio: 16 / 9, motif: "fleet" }, location: "Witbank", serviceSlug: "fleet-services", year: 2026 },
  { id: "g14", title: "Wrap laminate coating, service bakkies", categorySlug: "fleet", status: "published", order: 14, kind: "image", media: { src: "", alt: "Wrapped service bakkie with coated laminate holding its colour", ratio: 3 / 2, motif: "fleet" }, location: "Middelburg", serviceSlug: "fleet-services", year: 2025 },
];

export const beforeAfter: BeforeAfterProject[] = [
  {
    id: "ba-solar-midrand",
    title: "55 kWp warehouse array, Midrand",
    status: "published",
    order: 1,
    serviceSlug: "solar-panel-ceramic-coating",
    categorySlug: "solar",
    summary:
      "Two years of quarterly cleaning with municipal water had left a mineral haze across every module. We treated the scale, coated the array, and monitored the strings for a full season afterwards.",
    before: { src: "", alt: "Solar module with mineral haze and dust film before treatment", ratio: 4 / 3, motif: "solar-panel" },
    after: { src: "", alt: "Same solar module after scale treatment and ceramic coating", ratio: 4 / 3, motif: "solar-panel" },
    metrics: [
      { id: "m1", label: "String output, clean state", before: "46.1 kW", after: "48.4 kW" },
      { id: "m2", label: "Annualised soiling loss", before: "6.4%", after: "2.3%" },
      { id: "m3", label: "Professional cleans per year", before: "4", after: "2" },
    ],
  },
  {
    id: "ba-auto-black",
    title: "Three-stage correction, black saloon",
    status: "published",
    order: 2,
    serviceSlug: "automotive-detailing",
    categorySlug: "automotive",
    summary:
      "Eleven years of automated car washes had put holograms and swirls through every horizontal panel. Depth readings allowed a three-stage correction with clear coat to spare.",
    before: { src: "", alt: "Black bonnet showing heavy swirl marks under raking light", ratio: 3 / 2, motif: "sedan" },
    after: { src: "", alt: "The same bonnet after three stage correction, reflection sharp", ratio: 3 / 2, motif: "sedan" },
    metrics: [
      { id: "m1", label: "Gloss at 60°", before: "71 GU", after: "94 GU" },
      { id: "m2", label: "Clear coat removed", before: "—", after: "3.1 µm" },
      { id: "m3", label: "Defects remaining", before: "Severe", after: "Trace, edges only" },
    ],
  },
  {
    id: "ba-air-cessna",
    title: "Single-engine piston, oxidised paint",
    status: "published",
    order: 3,
    serviceSlug: "aircraft-detailing",
    categorySlug: "aircraft",
    summary:
      "An airframe that had spent four years on an outside tie-down. Chalked upper surfaces corrected back to uniform gloss, then coated for ultraviolet stability.",
    before: { src: "", alt: "Chalked and faded aircraft upper wing surface", ratio: 3 / 2, motif: "aircraft" },
    after: { src: "", alt: "Same wing surface corrected and ceramic coated", ratio: 3 / 2, motif: "aircraft" },
    metrics: [
      { id: "m1", label: "Gloss, upper wing", before: "48 GU", after: "88 GU" },
      { id: "m2", label: "Water behaviour", before: "Sheets and pools", after: "Beads at 108°" },
      { id: "m3", label: "Wash time, next cycle", before: "5.5 hrs", after: "3.0 hrs" },
    ],
  },
  {
    id: "ba-fleet-vans",
    title: "Distribution fleet, faded livery",
    status: "published",
    order: 4,
    serviceSlug: "fleet-services",
    categorySlug: "fleet",
    summary:
      "Eighteen vans on a three-year-old wrap, cleaned with alkaline degreaser at a truck wash. The laminate was hazed but recoverable. Corrected, coated and moved to a fortnightly cycle.",
    before: { src: "", alt: "Faded and hazed vehicle wrap on a panel van", ratio: 16 / 9, motif: "fleet" },
    after: { src: "", alt: "Same van after laminate correction and ceramic coating", ratio: 16 / 9, motif: "fleet" },
    metrics: [
      { id: "m1", label: "Laminate gloss", before: "39 GU", after: "82 GU" },
      { id: "m2", label: "Cycle time per vehicle", before: "70 min", after: "35 min" },
      { id: "m3", label: "Wrap replacement due", before: "Year 4", after: "Year 6" },
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
    id: "post1", slug: "what-soiling-actually-costs-a-gauteng-array", status: "published", order: 1,
    title: "What soiling actually costs a Gauteng array",
    excerpt: "We monitored four commercial installations across a full dry season. The losses were larger than the owners expected, and almost none of them showed up as an alarm.",
    body: "Soiling is the only fault on a solar installation that never announces itself. Inverters do not alarm on it, monitoring platforms rarely flag it, and because it accumulates gradually there is no day on which anybody notices the array is producing less.\n\nAcross four Gauteng commercial installations monitored through a full dry season, annualised soiling losses on uncoated arrays ran between 5.2% and 7.1%. The upper end belonged to a site adjacent to an unpaved access road — unsurprising, but worth stating, because proximity to dust sources matters far more than most owners assume.\n\nThe pattern within each quarter was consistent. Output recovered to near clean-state immediately after a professional clean, then declined roughly linearly for six to eight weeks before flattening as the deposit reached a stable thickness. That flattening is the dangerous part: the array settles into a degraded steady state and stays there until the next clean.\n\nWhat coating changes is the slope of that decline, not the starting point. A coated array loses ground more slowly and recovers more fully from ordinary rain, so the area under the curve — which is what you actually get paid for — is substantially larger.",
    category: "Solar", author: "Perfect Detailing", publishedAt: "2026-07-14", readMinutes: 4,
    cover: { src: "", alt: "Commercial rooftop array under a dusty Highveld sky", ratio: 16 / 9, motif: "solar-array" },
    seo: { title: "What soiling actually costs a Gauteng array", description: "Four commercial installations monitored across a dry season, and what their soiling losses actually were." },
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
    id: "post3", slug: "the-case-against-hosing-down-an-aeroplane", status: "published", order: 3,
    title: "The case against hosing down an aeroplane",
    excerpt: "Water is the cheapest cleaning agent available and the most expensive thing you can leave inside an airframe.",
    body: "There is a reason maintenance organisations get nervous when somebody arrives at a hangar with a pressure washer.\n\nAn airframe has a great many places water can enter and very few from which it readily leaves. Control surface hinges, fastener heads, lap joints, the gap behind fairings and the recesses around inspection panels all hold moisture well past the point where the visible surface has dried. Trapped moisture against dissimilar metals is precisely the condition corrosion needs.\n\nEncapsulated dry washing sidesteps the problem entirely. The product lifts soiling into a lubricating film that is removed with clean media; the contamination leaves on the towel rather than in the run-off. Nothing enters a seam because nothing is flowing.\n\nThe secondary benefit is practical: with no run-off there is no containment requirement, no wet hangar floor and no argument with the airfield about where the water went. We can work alongside other aircraft without inconveniencing anybody.",
    category: "Aviation", author: "Perfect Detailing", publishedAt: "2026-03-02", readMinutes: 3,
    cover: { src: "", alt: "Aircraft being dry washed inside a hangar", ratio: 16 / 9, motif: "aircraft" },
    seo: { title: "The case against hosing down an aeroplane", description: "Why encapsulated dry washing is the right method for general aviation airframes." },
  },
  {
    id: "post4", slug: "reading-a-gloss-meter-without-fooling-yourself", status: "published", order: 4,
    title: "Reading a gloss meter without fooling yourself",
    excerpt: "A number is only useful if it was taken at the same point, at the same angle, on a surface in the same state. Most published readings fail at least one of those tests.",
    body: "Gloss units are the closest thing detailing has to an objective measure, which is exactly why they get abused.\n\nThree things make a reading meaningless. Taking the 'before' on a dirty panel and the 'after' on a clean one measures washing, not correction. Moving the measurement point between readings measures panel variation, not improvement. And taking the 'after' before a panel wipe measures polishing oils, which will be gone in a fortnight.\n\nOur job cards record the measurement point, the angle and the surface state for every reading, on both sides of the work. It makes our numbers look less impressive than the ones you see online. It also makes them true.\n\nIf a detailer shows you a before-and-after gloss figure, the useful question is not what the numbers were. It is where on the panel they were taken, and whether the paint had been wiped down first.",
    category: "Method", author: "Perfect Detailing", publishedAt: "2026-01-19", readMinutes: 3,
    cover: { src: "", alt: "Gloss meter placed on a corrected black panel", ratio: 16 / 9, motif: "gloss-meter" },
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
