import type { ServiceDoc } from "@/content/types";

export const windowsService: ServiceDoc = {
  id: "svc-windows",
  slug: "building-window-coating",
  category: "windows",
  status: "published",
  order: 6,
  name: "Building Window Ceramic Coating",
  shortName: "Architectural Glass",
  cardSummary:
    "Architectural glazing that cleans itself in the rain, rejects solar heat gain and stops hard water etching the glass permanently.",
  motif: "window",
  featuredOnHome: true,

  eyebrow: "Architectural glazing · High-rise & residential",
  headline: "Glass is the one building material nobody maintains until it is ruined.",
  lede:
    "Facade glass takes rain, irrigation overspray, airborne dust and constant ultraviolet, and almost nothing is done about it until the panes look permanently dirty. By that point the damage is usually in the glass rather than on it. A ceramic coating changes the surface so contamination cannot bond, rain runs clear instead of streaking, and the heat coming through the pane drops.",
  heroMedia: {
    src: "",
    alt: "Coated architectural glazing with rain running clear off the pane",
    ratio: 16 / 9,
    motif: "window",
  },
  heroStats: [
    { id: "wh1", value: 15, suffix: "%", label: "Reduced cooling costs", detail: "Published figure, up to — see the qualifier below" },
    { id: "wh2", value: 5, suffix: "yrs", label: "Coating service life", detail: "On vertical glazing in normal exposure" },
    { id: "wh3", value: 0, suffix: "%", label: "Visible tint added", detail: "Optically clear — daylight is not traded away" },
  ],
  actions: [
    { label: "Request a building survey", href: "/quote", intent: "primary" },
    { label: "Discuss a facility programme", href: "/contact", intent: "secondary" },
  ],

  sections: [
    {
      id: "wn-what",
      eyebrow: "What it is",
      title: "A specially formulated coating for glazing, not a film",
      body:
        "This is not window tint and not an applied film. It is a liquid silica chemistry formulated for architectural glass that bonds into the surface and cross-links, leaving a hard, transparent, non-porous layer. Nothing is stuck on that can bubble, peel at the edge or discolour, and the glass keeps its optical clarity because the coating is measured in microns and is optically neutral.",
      bullets: [
        "Bonded into the glass surface, not adhered on top of it",
        "Nothing to bubble, peel or lift at the edges over time",
        "Optically clear — no tint, no haze, no loss of daylight",
        "Suitable for high-rise curtain walling and residential glazing alike",
      ],
      motif: "coating-layers",
    },
    {
      id: "wn-selfclean",
      eyebrow: "Self-cleaning",
      title: "Rain stops leaving a pattern behind",
      body:
        "Uncoated glass is microscopically porous. Water spreads across it, dries in place and leaves the dissolved minerals it was carrying behind as a streak. On a coated pane the water pulls into beads and runs off under its own weight, carrying loose dust with it and leaving very little behind to dry. The practical result is that ordinary rain does most of the cleaning, and the building looks presentable for far longer between visits.",
      bullets: [
        "Water beads and sheets off instead of drying in place",
        "Non-streaking rain flow — the difference is visible after the first storm",
        "Dust, pollen and airborne grime have far less to key into",
        "Fewer cleaning visits needed to keep a facade looking maintained",
      ],
      motif: "droplet",
    },
    {
      id: "wn-heat",
      eyebrow: "Solar heat gain",
      title: "The cooling load through a window is a running cost",
      body:
        "A large glazed elevation facing the sun is, in cooling terms, a heater. Nanoceramic particles in the coating reflect a meaningful portion of solar heat and block ultraviolet, so less of that energy arrives inside as heat the air conditioning then has to remove. On a commercial building with a big glass envelope, that shows up on the electricity account rather than in a comfort survey.",
      bullets: [
        "Reflects a portion of incoming solar heat before it enters the space",
        "Blocks ultraviolet, which is what fades floors, furniture and artwork",
        "Reduces the cooling demand a large glazed elevation creates",
        "Achieved without darkening the glass or reducing daylight",
      ],
      motif: "shield",
    },
    {
      id: "wn-etch",
      eyebrow: "Hard water & etching",
      title: "The damage that cannot be cleaned off",
      body:
        "Irrigation overspray and repeated cleaning with municipal water are the two things that permanently ruin glass. Dissolved calcium dries onto the pane, and every wet-dry cycle bonds it harder until it is chemically etched into the surface. At that point no amount of washing will remove it — the haze is in the glass. A coating prevents the deposit from bonding in the first place, which is the only real defence.",
      bullets: [
        "Hard water spots are prevented rather than removed later",
        "Irrigation overspray stops etching a permanent pattern into the pane",
        "Existing light etching can often be polished out before coating",
        "Extends the usable life and clarity of the glazing itself",
      ],
      motif: "sparkle",
    },
  ],

  benefits: [
    { id: "wb1", title: "Maximised daylighting", body: "A smoother surface reduces reflection and scattering, so more natural light comes through while heat is blocked.", motif: "window", metric: "No tint" },
    { id: "wb2", title: "Easier to clean", body: "Dirt, pollen and debris release with rain or a simple rinse instead of needing detergent and effort.", motif: "microfibre", metric: "Self-cleaning" },
    { id: "wb3", title: "Lower cooling demand", body: "Reduced solar heat gain means the air conditioning works less on the elevations that catch the sun.", motif: "gloss-meter", metric: "Energy saved" },
    { id: "wb4", title: "Fade protection", body: "Ultraviolet rejection protects floors, furniture, stock and artwork sitting behind the glass.", motif: "shield", metric: "UV blocked" },
    { id: "wb5", title: "Etch prevention", body: "Hard water and irrigation overspray stop bonding into the glass, which is damage that cannot be undone.", motif: "droplet", metric: "Permanent damage avoided" },
    { id: "wb6", title: "Longer glass life", body: "A sacrificial layer takes the abrasion of repeat cleaning instead of the pane taking it.", motif: "coating-layers", metric: "5 year film" },
  ],

  difference: {
    eyebrow: "The difference",
    title: "Two panes, the same weather, a different result.",
    body:
      "The mechanism is the same one that makes a coated solar module produce more: a flatter, non-porous surface scatters less light and holds less dirt. On a building it buys daylight and comfort instead of generation.",
    media: {
      src: "/profile/windows-performance.webp",
      alt: "Split comparison of building glazing with and without ceramic coating, showing solar and UV rejection against light scattering and dust adhesion",
      ratio: 1456 / 768,
    },
    withoutLabel: "Without ceramic coating",
    withoutBody:
      "Microscopic surface irregularities let airborne contaminants, dust and pollen adhere. Light scatters, transparency drops, and solar heat passes straight through into the space.",
    withLabel: "With ceramic coating",
    withBody:
      "A super-smooth, non-porous layer keeps the pane clear and lets water bead away cleanly, while nanoceramic particles reflect solar heat and block ultraviolet before it enters.",
    headline: {
      value: "Up to 10–15%",
      label: "Reduced cooling costs",
      qualifier:
        "Perfect Detailing's published figure. Savings vary based on building location, window type, orientation and environmental factors — an elevation in full afternoon sun behaves very differently from a shaded one, and we would rather survey your building than quote you an average.",
    },
    benefits: [
      { id: "wd1", title: "Maximised daylighting", body: "Less reflection and scattering, more usable natural light.", motif: "window" },
      { id: "wd2", title: "Easier to clean", body: "Self-cleaning with rain or a simple rinse.", motif: "microfibre" },
      { id: "wd3", title: "Improved energy efficiency", body: "Reduced heat gain lowers cooling demand.", motif: "gloss-meter" },
      { id: "wd4", title: "Long-term fade protection", body: "Shields floors, furniture and stock from UV.", motif: "shield" },
      { id: "wd5", title: "Better for the environment", body: "Less water and chemical cleaning, lower energy use.", motif: "droplet" },
    ],
  },

  packages: [
    {
      id: "wp1",
      name: "Residential glazing",
      summary: "Homes and estates, particularly where irrigation reaches the glass.",
      priceFrom: null,
      priceNote: "Quoted per square metre",
      duration: "One to two days",
      includes: ["Glass condition assessment", "Deep clean and mineral deposit removal", "Light etch polishing where recoverable", "Ceramic coating on all treated panes", "Aftercare guidance"],
      featured: false,
    },
    {
      id: "wp2",
      name: "Commercial facade",
      summary: "Office parks, retail and low-rise commercial elevations.",
      priceFrom: null,
      priceNote: "Quoted after building survey",
      duration: "Phased by elevation",
      includes: [
        "Building survey with elevation-by-elevation assessment",
        "Access and safety plan agreed with the facility team",
        "Deep clean, deposit removal and coating",
        "Phased by elevation to keep the building operating",
        "Documentation for the facility maintenance file",
      ],
      featured: true,
    },
    {
      id: "wp3",
      name: "High-rise curtain walling",
      summary: "Rope access and cradle work on tall glazed envelopes.",
      priceFrom: null,
      priceNote: "Quoted after survey",
      duration: "Programme agreed per building",
      includes: [
        "Access method agreed with your building manager",
        "Certified access partners where rope or cradle work is required",
        "Coating applied in a planned sequence",
        "Maintenance cycle costed for the building's budget",
        "Annual inspection included",
      ],
      featured: false,
    },
  ],

  steps: [
    { id: "ws1", index: 1, title: "Building survey", body: "We assess each elevation, the state of the glass and how it is currently cleaned — irrigation overspray is the usual culprit.", duration: "1–2 hours", motif: "gloss-meter", detail: ["Elevation-by-elevation condition record", "Existing etching identified and separated from surface soiling", "Access and safety requirements agreed"] },
    { id: "ws2", index: 2, title: "Deep clean & deposit removal", body: "Mineral deposits and bonded soiling are chemically released and rinsed until the glass is genuinely bare.", duration: "Per elevation", motif: "foam-cannon", detail: ["Deionised water throughout", "Targeted mineral treatment, never blanket-applied", "Frames and seals protected"] },
    { id: "ws3", index: 3, title: "Etch assessment", body: "Where the glass has been etched rather than soiled, we test whether it polishes out and tell you honestly if it does not.", duration: "As required", motif: "polisher", detail: ["Test panel first", "Recoverable etching machine polished", "Unrecoverable panes reported, not coated over and charged for"] },
    { id: "ws4", index: 4, title: "Coating", body: "The ceramic is applied pane by pane and levelled while open, then inspected at a raking angle before moving on.", duration: "Per elevation", motif: "shield", detail: ["Pane-by-pane application", "Levelled to a uniform film", "Raking-light inspection for streaks"] },
    { id: "ws5", index: 5, title: "Cure & sign-off", body: "The film sets, we run a water test on a sample pane in front of you, and the building file gets its documentation.", duration: "12–24 hours", motif: "sparkle", detail: ["Water behaviour demonstrated on site", "Coverage record per elevation", "Maintenance programme issued for the facility file"] },
  ],

  lifespan: [
    { id: "wl1", label: "Coating on vertical glazing", value: "4–5 years", note: "Normal exposure, cleaned as recommended" },
    { id: "wl2", label: "Coating on sloped or skylight glass", value: "3–4 years", note: "Shorter, because the exposure is far harsher" },
    { id: "wl3", label: "Full hardness", value: "24 hours", note: "Rain after cure is fine; heavy cleaning should wait a day" },
    { id: "wl4", label: "Professional clean", value: "Twice yearly", note: "Down from the quarterly cycle most facades need" },
  ],

  maintenance: {
    title: "Looking after coated glazing",
    body:
      "Coated glass needs less attention, but the way it is cleaned still decides how long the coating lasts.",
    items: [
      "Rinse with clean water; a pH-neutral glass cleaner where more is needed",
      "Never use abrasive pads, scrapers or scouring powder on coated glass",
      "Redirect irrigation away from the glass — it is the leading cause of permanent etching",
      "Tell your cleaning contractor the glass is coated, and give them the aftercare sheet",
      "Book the annual inspection so we can check the beading and spot-repair if needed",
    ],
  },

  faqIds: ["faq-windows-1", "faq-windows-2", "faq-windows-3"],

  seo: {
    title: "Building Window Ceramic Coating",
    description:
      "Ceramic coating for architectural glazing — self-cleaning, solar heat rejection, hard water etch prevention and longer glass life for high-rise and residential buildings.",
    keywords: ["building window coating", "architectural glass coating South Africa", "self-cleaning glass", "solar heat rejection glazing"],
    ogImageText: "Glass that cleans itself",
  },
};
