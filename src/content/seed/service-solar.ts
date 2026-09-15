import type { ServiceDoc } from "@/content/types";

export const solarService: ServiceDoc = {
  id: "svc-solar",
  slug: "solar-panel-ceramic-coating",
  category: "solar",
  status: "published",
  order: 7,
  name: "Solar Panel Ceramic Coating",
  shortName: "Solar Coating",
  cardSummary:
    "A photovoltaic-grade ceramic layer that keeps dust from bonding, lets rain do the cleaning, and puts lost generation back on the meter.",
  motif: "solar-panel",
  flag: "Specialist division",
  featuredOnHome: true,

  eyebrow: "Primary service · R280 per panel",
  headline: "Your array is losing power to a film you cannot see.",
  lede:
    "Soiling is the quietest fault on a solar installation. Nothing alarms, nothing trips — output simply drifts down as dust, pollen and mineral scale build a haze across the glass. A ceramic coating changes the surface itself so that contamination struggles to hold on, and rain removes most of what does.",
  heroMedia: {
    src: "/work/solar/hero.webp",
    alt: "A rooftop photovoltaic array at sunrise, the wet coated modules returning the low sun as one clean sheet of light",
    ratio: 16 / 9,
    motif: "solar-array",
  },
  heroStats: [
    { id: "sh1", value: 280, prefix: "R", label: "Per panel", detail: "Inclusive of preparation, coating and cure" },
    { id: "sh2", value: 10, suffix: "min", label: "Per panel", detail: "Typical on-site time once the array is prepped" },
    { id: "sh3", value: 5, suffix: "yrs", label: "Service life", detail: "With the recommended rinse schedule" },
  ],
  actions: [
    { label: "Calculate my array", href: "/quote#calculator", intent: "primary" },
    { label: "Talk to us first", href: "/contact", intent: "secondary" },
  ],

  sections: [
    {
      id: "sol-what",
      eyebrow: "What it is",
      title: "A bonded silica layer, not a polish",
      body:
        "The coating is a silicon-dioxide chemistry formulated for photovoltaic cover glass. Once applied it cross-links into a hard, transparent film measured in single-digit microns, bonded to the glass rather than resting on it. It does not tint, it does not haze, and it is engineered to stay optically neutral under constant ultraviolet load — which matters, because anything that shades a cell costs you generation.",
      bullets: [
        "High-transmission formulation designed for minimal light refraction",
        "Anti-static, so airborne dust is actively discouraged from settling",
        "Bonds to the cover glass, so it cannot be washed off like a wax",
        "Rated for continuous UV exposure and roof-surface temperatures",
        "Safe on anti-reflective coated glass when applied by trained hands",
      ],
      motif: "coating-layers",
      media: {
        src: "/work/solar/silica-application.webp",
        alt: "Gloved hands working Perfect Detailing silica coating across a solar module with a block applicator, the bottle standing on the panel alongside",
        ratio: 16 / 9,
      },
    },
    {
      id: "sol-how",
      eyebrow: "How it works",
      title: "Fewer places for dirt to hold on",
      body:
        "Uncoated cover glass looks smooth but is microscopically porous and slightly textured. Dust settles into that texture, moisture wicks in behind it, and each wet-dry cycle cements the deposit a little harder. The ceramic layer fills and flattens the surface, then presents a low-energy face to the world: water pulls into beads instead of sheeting, and those beads carry loose soiling off the panel as they run.",
      bullets: [
        "Contact angle rises past 110°, so water beads and rolls rather than pooling",
        "Flattened surface gives airborne dust far less to key into",
        "Dissolved minerals leave with the water instead of drying into scale",
        "Organic soiling — bird droppings, sap, pollen — releases with a rinse",
      ],
      motif: "droplet",
      media: {
        src: "/work/solar/coated-uncoated.webp",
        alt: "Two adjacent rooftop modules at sunrise: the coated one on the left holding water in discrete beads, the uncoated one on the right covered by a flat dirty film",
        ratio: 16 / 9,
      },
    },
    {
      id: "sol-gain",
      eyebrow: "The gain",
      title: "Where the recovered energy actually comes from",
      body:
        "There are two separate effects and it is worth keeping them apart. The first is soiling recovery: a coated panel accumulates less material between cleans, so its average annual loss is lower even though its peak clean output is unchanged. The second is cleaning efficiency: rain that used to leave a drying pattern of streaks and spots now clears the glass, which raises how often the array is effectively clean. Most of the money is in the first effect. We do not claim the coating makes a clean panel produce more than it was built to.",
      bullets: [
        "Annualised soiling loss typically falls from around 6% to under 3%",
        "Rain events do more useful cleaning, extending time between paid visits",
        "The array spends more of the year near its clean-state output",
        "No claim of increased output from an already-clean panel — that is physics, not chemistry",
      ],
      motif: "gloss-meter",
      media: {
        src: "/work/solar/inverter-yield.webp",
        alt: "A rooftop inverter display reading 48.7 kW of PV power and 286.4 MWh of total yield, mounted beside the array it monitors",
        ratio: 16 / 9,
      },
    },
    {
      id: "sol-install",
      eyebrow: "On the day",
      title: "What our team does on your roof",
      body:
        "We arrive self-contained with deionised water, low-pressure delivery, roof-safe access equipment and fall protection. The array is washed and, where mineral scale has already etched in, treated to remove it before anything is coated — the coating locks in whatever it is applied over, so preparation is not optional. Panels are dried, wiped down with a solvent prep, then coated section by section, levelled and left to flash. Work is scheduled around the weather because the film needs a dry cure window.",
      bullets: [
        "Deionised water only — no spotting, no dissolved minerals left behind",
        "Low pressure throughout; nothing that could compromise a frame seal or junction box",
        "Isolation coordinated with your installer or facility team where required",
        "Section-by-section application so no area cures before it is levelled",
      ],
      motif: "microfibre",
      media: {
        src: "/work/solar/roof-team.webp",
        alt: "A Perfect Detailing technician walking a rooftop array at sunset, working from a deionised water cleaning rig parked on the walkway",
        ratio: 16 / 9,
      },
    },
  ],

  benefits: [
    {
      id: "sb1",
      title: "Higher effective efficiency",
      body: "Less material sitting between the sun and the cell means the array spends more of the year producing close to its clean-state output.",
      motif: "solar-panel",
      metric: "≈3.5% recovered",
    },
    {
      id: "sb2",
      title: "Dirt struggles to bond",
      body: "A flattened, low-energy surface gives dust, pollen and diesel particulate far less to key into, so deposits stay loose.",
      motif: "shield",
      metric: "Anti-adhesion",
    },
    {
      id: "sb3",
      title: "Rain becomes a cleaning cycle",
      body: "Water beads and runs off carrying loose soiling with it, rather than sheeting out and drying into a streaked mineral pattern.",
      motif: "droplet",
      metric: "112° contact angle",
    },
    {
      id: "sb4",
      title: "Fewer paid cleaning visits",
      body: "Most coated arrays move from quarterly cleaning to twice a year without losing ground on output.",
      motif: "sparkle",
      metric: "Half the visits",
    },
    {
      id: "sb5",
      title: "Longer glass life",
      body: "A sacrificial ceramic layer takes the abrasion from wind-blown grit and repeat cleaning, instead of the cover glass taking it.",
      motif: "coating-layers",
      metric: "5 year film",
    },
    {
      id: "sb6",
      title: "Lower cleaning cost per clean",
      body: "Contamination releases with a rinse and a light wipe, so cleans are quicker and need no aggressive chemistry or scrubbing.",
      motif: "microfibre",
      metric: "Rinse-and-go",
    },
  ],

  packages: [
    {
      id: "sp1",
      name: "Residential rooftop",
      summary: "Typical home installation of eight to twenty-four panels, single storey or double.",
      priceFrom: 280,
      priceNote: "per panel",
      duration: "Half a day",
      includes: [
        "Pre-coating wash with deionised water",
        "Mineral scale treatment where required",
        "Full ceramic application and levelling",
        "Cure supervision and post-coating beading test",
        "Aftercare schedule and rinse guidance",
      ],
      featured: false,
    },
    {
      id: "sp2",
      name: "Commercial array",
      summary: "Office parks, warehousing, agricultural and body-corporate installations from fifty panels up.",
      priceFrom: 280,
      priceNote: "per panel",
      duration: "One to three days on site",
      includes: [
        "Site survey and access plan before the date",
        "Isolation coordinated with your O&M provider",
        "Section-by-section coating with progress sign-off",
        "String-level before and after output snapshot",
        "Written maintenance programme for the facility file",
      ],
      featured: true,
    },
    {
      id: "sp3",
      name: "Installer partnership",
      summary: "Coating applied at commissioning, before the array has ever been soiled.",
      priceFrom: 280,
      priceNote: "per panel",
      duration: "Aligned to your commissioning day",
      includes: [
        "Coating applied to factory-clean glass — the ideal substrate",
        "Scheduled alongside your commissioning team",
        "Handover documentation branded for your client pack",
        "Standing rate card for your project pipeline",
      ],
      featured: false,
    },
  ],

  steps: [
    {
      id: "ss1",
      index: 1,
      title: "Survey & string reading",
      body: "We record the array layout, panel count, tilt, access constraints and a baseline output reading per string before touching anything.",
      duration: "30–45 min",
      motif: "gloss-meter",
      detail: ["Panel count and layout confirmed against your quote", "Baseline per-string output captured", "Access, anchor points and isolation plan agreed"],
    },
    {
      id: "ss2",
      index: 2,
      title: "Deionised wash",
      body: "Low-pressure wash with deionised water and a pH-neutral solution, working top-down so nothing is re-soiled.",
      duration: "2–4 min per panel",
      motif: "foam-cannon",
      detail: ["No mains water — dissolved minerals cause the spotting we are removing", "Soft media only on the cover glass", "Frames and rails cleaned at the same time"],
    },
    {
      id: "ss3",
      index: 3,
      title: "Scale & stain treatment",
      body: "Where hard-water scale, cement dust or lichen has already etched in, it is chemically released and rinsed before coating.",
      duration: "As required",
      motif: "droplet",
      detail: ["Targeted treatment, never blanket-applied", "Rinsed to neutral and verified", "Panels beyond recovery are flagged in writing, not coated over"],
    },
    {
      id: "ss4",
      index: 4,
      title: "Solvent prep",
      body: "Each panel is dried and wiped with a prep solvent that strips any residue so the coating bonds to bare glass.",
      duration: "1 min per panel",
      motif: "microfibre",
      detail: ["Removes wash residue and handling oils", "Fresh media per section", "Bond surface verified before coating opens"],
    },
    {
      id: "ss5",
      index: 5,
      title: "Ceramic application",
      body: "Coating is laid down section by section, levelled while open, and inspected at a raking angle for high spots.",
      duration: "≈10 min per panel",
      motif: "shield",
      detail: ["Applied in controlled sections so nothing flashes early", "Levelled and buffed to a uniform film", "Raking-light inspection for streaks before moving on"],
    },
    {
      id: "ss6",
      index: 6,
      title: "Cure & verification",
      body: "The film sets in the open air, then we run a beading test and a post-coating string reading before you sign anything.",
      duration: "1–2 hours",
      motif: "gloss-meter",
      detail: ["Dry cure window protected — no work in imminent rain", "Water beading test recorded", "Post-coating string reading against the baseline"],
    },
  ],

  lifespan: [
    { id: "sl1", label: "Expected service life", value: "5 years", note: "With the recommended rinse schedule and no abrasive cleaning" },
    { id: "sl2", label: "Time to full hardness", value: "24 hours", note: "Rain after cure is fine; heavy cleaning should wait a day" },
    { id: "sl3", label: "Recommended rinse", value: "Quarterly", note: "Plain water rinse in the dry season, less in the rainy months" },
    { id: "sl4", label: "Professional clean", value: "Twice yearly", note: "Down from the quarterly cycle most uncoated arrays need" },
  ],

  maintenance: {
    title: "Living with a coated array",
    body:
      "A coated array is easier to look after, not maintenance-free. The coating's job is to make cleaning quick and infrequent — it is not a reason to stop looking at the roof.",
    items: [
      "Rinse with plain water in the dry season; let the rain handle the wet months",
      "Never use abrasive pads, scouring powder or high-pressure lances on cover glass",
      "Avoid cleaning in full midday sun — water dries before it can run off",
      "Book a professional clean twice a year and let us check the beading while we are up there",
      "Send us a photo if you see a patch that stops beading — spot repairs are inexpensive",
    ],
  },

  faqIds: ["faq-solar-1", "faq-solar-2", "faq-solar-3", "faq-solar-4", "faq-solar-5", "faq-solar-6"],

  difference: {
    eyebrow: "The difference",
    title: "One module, two surfaces, two yields.",
    body:
      "A photovoltaic cell can only convert the light that reaches it. Everything between the sun and the cell — dust, mineral haze, a rough surface scattering light back out — is generation you paid for and did not get.",
    media: {
      src: "/profile/solar-performance.webp",
      alt: "Split comparison of a solar panel with and without ceramic coating, showing light scattering off a soiled surface against clean transmission on a coated one",
      ratio: 1456 / 768,
    },
    withoutLabel: "Without ceramic coating",
    withoutBody:
      "Microscopic irregularities let particles adhere to the glass. Incident light scatters off the rough, soiled surface instead of passing through, and transmittance drops.",
    withLabel: "With ceramic coating",
    withBody:
      "A super-smooth, non-porous layer holds far less soiling and lets water bead cleanly away. More light passes through with minimal reflection, and rain does much of the cleaning.",
    headline: {
      value: "Up to 30%",
      label: "Efficiency increase on heavily soiled arrays",
      qualifier:
        "Perfect Detailing's published figure, and it describes the recovery available on an array that has been left to soil badly — not a gain over a clean panel, which is not physically possible. The worked example further down this page uses a far more conservative 6% to 2.5% annualised soiling loss, which is what we have measured on monitored Highveld installations. We would rather quote you the conservative number and beat it.",
    },
    benefits: [
      { id: "sd1", title: "Maximised light transmission", body: "A smoother surface reduces reflection and scattering, increasing photon capture.", motif: "solar-panel" },
      { id: "sd2", title: "Easier to clean", body: "Hydrophobic properties reject dirt, pollen and debris, allowing self-cleaning with rain.", motif: "droplet" },
      { id: "sd3", title: "Improved power output", body: "Less soiling means more consistent generation across the year.", motif: "gloss-meter" },
      { id: "sd4", title: "Long-term panel protection", body: "The ceramic layer shields the glass from UV degradation and abrasion.", motif: "shield" },
      { id: "sd5", title: "Better for the environment", body: "Less water and chemical cleaning, and more energy from the same array.", motif: "sparkle" },
    ],
  },

  solar: {
    pricePerPanel: 280,
    minutesPerPanel: 10,
    defaultPanelCount: 24,
    minPanels: 4,
    maxPanels: 2000,
    assumptions: [
      { id: "a1", label: "Panel rating", value: "550 W", note: "Typical of current residential and commercial modules" },
      { id: "a2", label: "Specific yield", value: "1 750 kWh/kWp", note: "Gauteng, well-oriented, annual average" },
      { id: "a3", label: "Electricity tariff", value: "R2.85/kWh", note: "Blended commercial rate — edit this for your own tariff" },
      { id: "a4", label: "Cleaning rate", value: "R28/panel", note: "Typical contract cleaning cost per panel per visit" },
      { id: "a5", label: "Soiling, uncoated", value: "6.0%", note: "Annualised average loss between quarterly cleans" },
      { id: "a6", label: "Soiling, coated", value: "2.5%", note: "Annualised average loss on the same site once coated" },
    ],
    worked: {
      panelCount: 100,
      cleansPerYearBefore: 4,
      cleansPerYearAfter: 2,
      costPerCleanPerPanel: 28,
      soilingLossBefore: 0.06,
      soilingLossAfter: 0.025,
      systemKwp: 55,
      yieldPerKwpPerYear: 1750,
      tariffPerKwh: 2.85,
      coatingLifespanYears: 5,
    },
    neglect: [
      {
        id: "n1",
        title: "Dust and pollen",
        body: "Fine Highveld dust settles every dry-season day and cements down with each night of dew. It is the single largest cause of quiet output loss on a South African array.",
        impact: "2–6% output, continuously",
        motif: "solar-panel",
      },
      {
        id: "n2",
        title: "Bird droppings",
        body: "An opaque deposit does not dim a cell, it shuts it down. The bypass diode takes that section of the string out, and the loss is wildly out of proportion to the area covered.",
        impact: "Whole substring offline",
        motif: "droplet",
      },
      {
        id: "n3",
        title: "Hard-water scale",
        body: "Cleaning with municipal water leaves dissolved calcium behind. It dries into a haze that etches into the glass and eventually stops coming off with washing at all.",
        impact: "Permanent haze",
        motif: "sparkle",
      },
      {
        id: "n4",
        title: "Ultraviolet degradation",
        body: "Constant UV attacks the encapsulant and any polymer surface treatment. Unprotected glass surfaces also micro-pit over time, giving dirt more to hold onto each year.",
        impact: "Accelerating soiling",
        motif: "shield",
      },
      {
        id: "n5",
        title: "Compounding production loss",
        body: "Soiling loss is not a one-off. It runs every daylight hour of every year, and on a commercial array it is measured in tens of thousands of rand before anyone notices.",
        impact: "R9 600/year on 55 kWp",
        motif: "gloss-meter",
      },
      {
        id: "n6",
        title: "Rising cleaning cost",
        body: "Once deposits have bonded, cleaning takes longer, needs stronger chemistry and has to happen more often — so the maintenance line item climbs every year.",
        impact: "2× cleaning frequency",
        motif: "foam-cannon",
      },
    ],
  },

  seo: {
    title: "Solar Panel Ceramic Coating — R280 per panel",
    description:
      "Photovoltaic-grade ceramic coating for solar arrays across Mpumalanga and the Highveld. R280 per panel, about ten minutes each. Less soiling, fewer cleans, measurable yield recovery.",
    keywords: [
      "solar panel ceramic coating",
      "solar panel coating South Africa",
      "solar panel cleaning Gauteng",
      "hydrophobic solar coating",
      "solar soiling loss",
    ],
    ogImageText: "R280 per panel · ten minutes each",
  },
};
