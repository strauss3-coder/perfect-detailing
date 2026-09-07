import type { Faq } from "@/content/types";

const f = (
  id: string,
  categorySlug: Faq["categorySlug"],
  order: number,
  question: string,
  answer: string,
  featured = false,
): Faq => ({ id, status: "published", order, question, answer, categorySlug, featured });

export const faqs: Faq[] = [
  /* ---------------------------------------------------------- General */
  f("faq-gen-1", "general", 1, "Where do you work?",
    "Our base is Witbank in Mpumalanga, and we work across the Highveld — eMalahleni, Middelburg, Secunda, Ermelo, Bethal and the surrounding areas. Larger commercial, solar, aviation and marine jobs are worth travelling further for, including into Gauteng; ask and we will tell you honestly whether the travel makes the price sensible.", true),
  f("faq-gen-2", "general", 2, "Do you work at your shop or at mine?",
    "Both. Our workshop and product shop are in Witbank — come in for coatings, aftercare products and advice. The detailing and coating work itself is done on site wherever the asset lives, with self-contained units carrying their own water, power, lighting and containment. It saves you a drop-off, and it means we see the conditions the surface actually lives in.", true),
  f("faq-gen-3", "general", 3, "What do you need from me on the day?",
    "Access, and somewhere to park the unit. We bring our own water and power. For solar work we need safe roof access and, on commercial sites, whatever induction your facility requires — tell us up front and we will arrive with the paperwork done.", false),
  f("faq-gen-4", "general", 4, "How far in advance should I book?",
    "Automotive work is usually one to two weeks out. Solar and fleet jobs depend on crew scheduling and weather windows — typically two to three weeks. Emergency and pre-sale work we will always try to fit in; just ask.", false),
  f("faq-gen-5", "general", 5, "How do I pay, and do you need a deposit?",
    "EFT or card on completion. No deposit on standard work under R15 000. Larger commercial, fleet and aviation jobs are done on a signed quote with agreed payment terms, usually 50% on commencement.", false),
  f("faq-gen-6", "general", 6, "What happens if it rains?",
    "Coatings need a dry cure window, so we watch the forecast and will move a date rather than apply into weather. There is no charge for a weather move. Automotive work continues regardless because it is done under cover.", false),

  /* ------------------------------------------------------------ Solar */
  f("faq-solar-1", "solar", 1, "What does solar panel ceramic coating cost?",
    "R280 per panel, which covers preparation, the coating itself and cure supervision. There is no separate call-out on standard rooftop arrays at accessible height. Difficult access, heavy pre-existing mineral scale needing treatment, and ground-mount arrays are quoted after a site visit.", true),
  f("faq-solar-2", "solar", 2, "How long does it take?",
    "Roughly ten minutes per panel of actual coating work, plus the wash and preparation beforehand. A typical twenty-panel residential array is a comfortable half day. A hundred-panel commercial array is two days with a two-person crew, allowing for cure windows.", true),
  f("faq-solar-3", "solar", 3, "Will it actually make my panels produce more power?",
    "Not on a panel that is already spotlessly clean — nothing can, and anyone claiming otherwise is misleading you. What it does is keep panels much closer to their clean-state output for far more of the year. On the installations we have monitored, annualised soiling loss drops from around 6% to under 3%. That recovered generation is the real return, and it is measurable.", true),
  f("faq-solar-4", "solar", 4, "How long does the coating last?",
    "Around five years with the recommended rinse schedule. It degrades gradually rather than failing suddenly — you will notice water beading less tightly before you notice anything on your production figures. We check the beading at every professional clean and tell you when a re-coat is genuinely due.", false),
  f("faq-solar-5", "solar", 5, "Do I still need to clean the panels?",
    "Yes, just far less often. Most coated arrays move from quarterly professional cleaning to twice a year, with plain-water rinses in between during the dry season. The coating makes each clean much quicker because contamination releases instead of needing to be scrubbed off.", false),
  f("faq-solar-6", "solar", 6, "Is it safe on anti-reflective coated glass?",
    "Yes, when applied properly. Most modern modules have a factory anti-reflective layer and the coating is formulated to bond to it without altering its optical behaviour. What is not safe is aggressive mechanical cleaning or acidic descaler on AR glass — which is one of the reasons we do the preparation ourselves rather than coating over someone else's cleaning.", false),
  f("faq-solar-7", "solar", 7, "Will it void my panel warranty?",
    "We have not encountered a manufacturer warranty that a non-abrasive surface coating breaches, but warranties differ. Send us your module make and model before booking and we will read the terms with you. If there is any doubt we will say so rather than risk your warranty.", false),
  f("faq-solar-8", "solar", 8, "Can you coat an array that is already badly stained?",
    "Usually. Mineral scale and lichen are treated and removed before coating, because a coating locks in whatever it is applied over. Where glass has been permanently etched by years of hard-water cleaning we will tell you that the haze is in the glass and cannot be recovered — and we will not charge you to coat over it.", false),

  /* ---------------------------------------------------------- Ceramic */
  f("faq-ceramic-1", "ceramic", 1, "What is a ceramic coating, in plain terms?",
    "A liquid silica polymer that cross-links into a hard, transparent film chemically bonded to your clear coat. Unlike wax, which sits on top and washes away over weeks, the coating becomes a semi-permanent sacrificial surface that takes chemical and ultraviolet attack instead of your paint.", true),
  f("faq-ceramic-2", "ceramic", 2, "Will it stop scratches?",
    "No, and be sceptical of anyone who says it will. It genuinely resists the fine wash-induced marring that dulls paint over a few years, and it adds a measurable sacrificial layer. It will not stop a key, a trolley, a stone chip or an automated wash brush. For impact protection you want paint protection film, which we are happy to discuss.", true),
  f("faq-ceramic-3", "ceramic", 3, "How long does it last?",
    "Two to three years for a single-layer system, five to seven for a multi-layer system over full correction. The variable is almost never the product — it is how the car is washed. Automated brush washes will take years off a coating in a handful of passes.", true),
  f("faq-ceramic-4", "ceramic", 4, "Why does correction cost more than the coating?",
    "Because it is where the time goes. Machine polishing a car to a defined finish is six to twenty hours of skilled work; applying the coating is a few hours. Coating over uncorrected paint locks the swirls in for the life of the film, so the correction is not an upsell — it is the job.", false),
  f("faq-ceramic-5", "ceramic", 5, "Can I wash it myself?",
    "Yes, and you should. A two-bucket contact wash with a pH-neutral shampoo every two weeks is ideal. We supply the shampoo and drying towel in the aftercare pack. The only hard rules: no automated brush washes, no dish soap, and never drag a dry chamois across the paint.", false),
  f("faq-ceramic-6", "ceramic", 6, "When can I wash the car after coating?",
    "Leave it a week. The film is touch-dry within hours and the car leaves after an overnight cure, but full hardness develops over about seven days. Rain in that window is fine — a wash with pressure and contact is not.", false),

  /* ------------------------------------------------------- Automotive */
  f("faq-auto-1", "automotive", 1, "How long does a full detail take?",
    "A full detail on a mid-size car is one to two days. Correction work runs two to four days depending on how much of the clear coat needs levelling and how bad the starting condition is. We would rather quote two days and take two days than promise same-day and rush the correction.", true),
  f("faq-auto-2", "automotive", 2, "Can you remove every scratch?",
    "Any scratch you can catch with a fingernail is through the clear coat and cannot be polished out — it needs paint. Everything shallower is usually correctable, subject to how much clear coat is left. We measure the depth first and tell you exactly what is achievable before starting, not halfway through.", true),
  f("faq-auto-3", "automotive", 3, "My headlights are yellow. Is that fixable?",
    "Almost always. The factory UV layer has failed and the polycarbonate underneath has oxidised. We sand the failed layer back through progressive grits, machine polish to optical clarity, then apply a fresh UV-stable coating. That last step is what most shops skip, which is why their restorations go yellow again within a year.", false),
  f("faq-auto-4", "automotive", 4, "Is engine bay cleaning risky?",
    "Not when it is done with control instead of a hose. Electronics, the alternator, air intake and exposed connectors are covered before any degreaser is used, we work with low-moisture methods and detail brushes, and everything is force-dried with filtered air. We have never caused an electrical fault, and we will not clean a bay we think is a bad idea.", false),
  f("faq-auto-5", "automotive", 5, "Do you do interiors only?",
    "Yes. Interior deep cleans are a standalone booking — hot-water extraction on fabric and carpets, leather cleaned in the grain and conditioned, vents and switchgear detailed, glass finished last. It is a popular pre-sale service on its own.", false),

  /* --------------------------------------------------------- Aircraft */
  f("faq-air-1", "aircraft", 1, "Why dry wash instead of a normal wash?",
    "Water is the risk. A flooded wash pushes moisture into control surface hinges, seams, fastener heads and behind fairings, and trapped moisture is how corrosion starts. An encapsulating dry wash lifts soiling into a lubricating film that is removed with clean media — no water enters a seam, and we can work inside the hangar with no run-off at all.", true),
  f("faq-air-2", "aircraft", 2, "Will this make my aircraft faster or reduce fuel burn?",
    "A clean, smooth airframe has less parasitic drag than a dirty one — that is straightforward aerodynamics. We will not put a number on your cruise speed or fuel burn, because the effect varies enormously by type and starting condition and any figure we quoted would be invented. Do it for paint life, inspection clarity and presentation; treat anything else as a bonus.", true),
  f("faq-air-3", "aircraft", 3, "Do you need maintenance approval to work on my aircraft?",
    "No, because everything we do is cosmetic — we never touch anything requiring an approved maintenance release. We agree a written scope with you or your maintenance organisation before the date, log every cover fitted to probes and ports on a checklist, and walk that checklist in reverse at completion. You get a completion record for the aircraft file.", false),
  f("faq-air-4", "aircraft", 4, "How often should the aircraft be done?",
    "Six to eight weeks for a hangared aircraft in regular use, four weekly if it lives outside or operates off grass. Leading edges and the belly deserve attention after any heavy insect season. The coating itself is inspected annually, ideally aligned to your scheduled maintenance so the aircraft is already down.", false),

  /* ----------------------------------------------------------- Marine */
  f("faq-marine-1", "marine", 1, "Is this the same as antifouling?",
    "No, and it does not replace it. Antifouling is a biocidal paint system applied below the waterline to stop marine growth taking hold, and that remains your yard's job. Our marine ceramic coating protects gelcoat, topsides, superstructure and metalwork against salt, ultraviolet and staining, and makes the surfaces above and around the waterline dramatically easier to keep clean. On running gear it reduces how readily barnacles adhere, which is a different mechanism to antifouling and complements it.", true),
  f("faq-marine-2", "marine", 2, "My gelcoat is chalky and faded. Is it recoverable?",
    "Usually, and further than most owners expect. Gelcoat is a thick pigmented layer that chalks from the surface down, so there is normally sound material underneath. Multi-stage machine correction removes the dead layer and brings colour and depth back. Where a hull has been compounded aggressively many times before, there may be less left to work with — we assess that at survey and tell you before quoting.", true),
  f("faq-marine-3", "marine", 3, "Does the vessel need to come out of the water?",
    "Yes. Correction and coating are done with the hull dry and the coating needs an undisturbed cure of 24 to 48 hours out of the water. We schedule around a lift you already have booked wherever possible, so you are not paying for a haul-out twice.", false),

  /* ---------------------------------------------------- Architectural glass */
  f("faq-windows-1", "windows", 1, "Is this window tint?",
    "No. Tint is a film adhered to the glass that can bubble, peel and discolour, and it darkens the pane. This is a liquid ceramic chemistry that bonds into the glass surface itself. It is optically clear — you do not lose daylight — and there is nothing stuck on to fail later. It rejects solar heat through nanoceramic particles rather than by blocking visible light.", true),
  f("faq-windows-2", "windows", 2, "My windows already have permanent-looking stains. Can you fix them?",
    "It depends whether the deposit is on the glass or in it. Hard water and irrigation overspray dry onto the pane and, over enough wet-dry cycles, chemically etch into the surface. Surface deposits come off. Etching sometimes polishes out and sometimes does not. We test a panel first and tell you honestly which you have — and we will not charge you to coat over damage that coating cannot hide.", true),
  f("faq-windows-3", "windows", 3, "How much will it actually save on cooling?",
    "Our published figure is up to 10–15% reduced cooling costs, and the honest answer is that it depends entirely on your building. Orientation, glazing type, how much of the envelope is glass and your local climate all move that number a great deal — a west-facing glass elevation in full afternoon sun behaves nothing like a shaded one. We survey the building and give you a figure for your elevations rather than an average.", false),

  /* ------------------------------------------------------------ Fleet */
  f("faq-fleet-1", "fleet", 1, "Will you take my vehicles off the road?",
    "No. Our units are self-contained, so we work overnight, early morning or over weekends in your yard — whatever window suits your operation. In nine years of fleet work we have not yet needed a vehicle during its operating hours.", true),
  f("faq-fleet-2", "fleet", 2, "Is it safe on printed wraps?",
    "Yes, with the right discipline. Wrap laminate is far more vulnerable than paint: alkaline degreasers attack it, high pressure lifts edges and abrasive washing hazes it. We use pH-neutral chemistry at controlled pressure, keep lances away from edges and seams, and coat the laminate so it holds its colour. Lifting edges get photographed and reported rather than washed over.", true),
  f("faq-fleet-3", "fleet", 3, "How is fleet work invoiced?",
    "One consolidated monthly invoice with per-vehicle line items, so cost centres can be allocated without anyone re-keying anything. Each visit also produces a per-vehicle service record with the date, work done and photographs of anything worth flagging.", false),
  f("faq-fleet-4", "fleet", 4, "What is the minimum fleet size?",
    "Three vehicles. Below that it is simply an automotive booking, which is often cheaper for you. Above about forty vehicles we assign a named account manager and dedicated crew nights.", false),
];
