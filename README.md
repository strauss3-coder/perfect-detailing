# Perfect Detailing

Marketing site and content portal for Perfect Detailing — automotive, aviation
and solar protective coatings.

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · Motion · Supabase.

---

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
```

Nothing needs configuring to start. Without Supabase credentials the site keeps
content and leads in `./.data/*.json`, and the portal accepts a development
login. Both are replaced by real infrastructure through environment variables —
see **Going live** below.

```bash
npm run build        # production build
npm run start        # serve the build
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
```

---

## The idea

The design concept is **the mirror finish**: the brand does not clean surfaces,
it engineers them. The visual language is borrowed from optical instrumentation
and surface metrology rather than from car-wash imagery — micron rules, contact
angle geometry, gloss-meter readouts, raking specular light.

Three original logo concepts live in `src/components/brand/Marks.tsx`:

| Concept | Idea |
| --- | --- |
| **Bead** *(active)* | A water bead resting on a coated surface, drawn at the contact angle a working coating actually produces. The rule beneath it runs past the bead because the surface is the product. |
| **Facet** | Chamfered planes — the brand read as a polished panel catching light from four directions. |
| **Sweep** | Three nested arcs of decreasing weight: one polishing pass, refined twice. |

Each renders in colour and single-colour monochrome. Static exports for print,
email signatures and social profiles are in `public/brand/`, the favicon is
`src/app/icon.svg`, and the social card is generated at
`src/app/opengraph-image.tsx` from live CMS content.

Switch the active mark in **Portal → Brand → Active mark**.

---

## Content model

Nothing displayed on the public site is written into a page component. Every
page reads a typed document defined in `src/content/types.ts`, with defaults in
`src/content/seed/`.

There are two kinds of document:

* **Singletons** — `home`, `about`, `process`, `contact`, `seo`, `appearance`,
  `navigation`, `footer`, `brand`, `business`, `legal`, and one per remaining page.
* **Collections** — `services`, `galleryItems`, `beforeAfter`, `testimonials`,
  `faqs`, `pricing`, `posts`, `media`, `emailTemplates`, `users`.

### Seed content is the floor, not the starting copy

The store merges CMS overrides *over* the seed. An editor who changes only
`home.hero.lede` stores exactly that; every other field still resolves from the
seed. Two consequences worth knowing:

1. **You never need to import content into a fresh database.** Connect Supabase,
   open the portal, and the first save of a module writes that module's row.
2. **Adding a field to the content model makes it appear everywhere at once** —
   in the type, on the page, and as a control in the portal — with no migration
   and no portal work.

Arrays are the exception: they are replaced wholesale, because an editor who
deletes the fourth statistic means to have three.

---

## The portal

`/portal` — sign in, then everything on the website is editable.

| Group | Modules |
| --- | --- |
| Overview | Dashboard, Website analytics, Leads |
| Pages | Homepage, About, Process, Gallery, Reviews, FAQ, Contact, Quote |
| Services | All services, plus a view per category (solar, ceramic, automotive, aircraft, fleet) |
| Content | Gallery, Videos, Before & after, Testimonials, FAQs, Pricing, Journal, Media library |
| Business | Business information, Contact information, Email templates, Users |
| System | Brand, Navigation, Footer, SEO, Appearance, Legal pages |

The editor infers its controls from the shape of the document it is handed
(`src/lib/portal/fields.ts`): strings become text or textarea by length and key,
numbers become steppers, booleans become switches, `motif` and `status` become
selects, colours get a picker, arrays of objects become reorderable cards with
add, duplicate and delete. That is why there is no separate schema to maintain.

Saving publishes immediately — the affected routes are revalidated in the same
request.

### Leads

Every form submission creates a lead with a reference (`PD-26-0001`), full
status history, notes, assignment and an estimated value, exportable to CSV.
Validation is server-side, with a honeypot field and per-field error messages.

### Analytics

First-party, cookie-free. One beacon per page view records the path and the
referrer host — no identifiers, nothing stored in the browser, nothing to
consent to.

---

## Going live

Copy `.env.example` to `.env.local`.

### 1. Portal credentials — required

```bash
npm run hash-password "a long password you choose"
```

That prints `PORTAL_PASSWORD_HASH` and `PORTAL_SESSION_SECRET`. Put both in the
environment along with `PORTAL_EMAIL`. **The app refuses to start in production
without `PORTAL_SESSION_SECRET`**, and the dashboard shows an outstanding
checklist item until a password is configured.

### 2. Supabase

```sql
-- in the SQL editor, in this order
\i supabase/schema.sql     -- tables, indexes, triggers, storage buckets
\i supabase/policies.sql   -- row level security
\i supabase/seed.sql       -- the staff row RLS keys off
```

Then set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` and
`SUPABASE_SERVICE_ROLE_KEY`. The store switches over on the next request and the
sidebar footer changes from *Local file store* to *Supabase connected*.

Editorial content is stored as JSONB documents (`site_settings`,
`site_collections`) because the content model evolves faster than a migration
cycle. Everything that is *queried* rather than *rendered* — leads, analytics,
media, audit — has real columns, foreign keys and indexes. Writes to content and
leads are captured in `audit_log` by trigger.

### 3. Replace the placeholder contact details

The phone and WhatsApp numbers in the seed are **formatted stand-ins**
(`082 555 0187`). Change them in **Portal → Contact information** before
launch — the dashboard checklist flags this until you do. Email addresses and
social handles in the same module are also assumed rather than confirmed.

### 4. Set the live domain

**Portal → SEO settings → Site URL**. It drives canonical URLs, the sitemap,
`robots.txt` and the social card. Paste your Search Console token into
*Verification → Google* at the same time.

### 5. Add photography

The site is entirely photographic — there is no video. Fifty-one stills live in
`public/work/`, all shot on real jobs, and every one of them traces back to an
original in `media-source/`, which is gitignored and must not reach the
repository or the dev server's watcher.

**Still missing: marine, architectural glass and fleet.** Those disciplines
have no photography, so their slots still draw an illustrated technical plate —
the motif for that subject, registration brackets and a specular band — sized
to the exact aspect ratio the photograph will occupy, so swapping an image in
shifts nothing on the page.

Aircraft and solar are photographed as of September 2026, but their process
timelines are not: `ProcessTimeline` shows its companion panel only when
**every** stage carries an image, so a page needs all six stage photographs
before any of them appear.

Upload through **Portal → Media library** (needs Supabase Storage), or register
files that already live elsewhere by URL. Copy an asset's path and paste it into
any image field in the portal.

Any `MediaRef` still takes a `videoSrc`, and the machinery behind it is intact
even though nothing uses it today. Set it and the slot becomes a silent,
looping clip with the still as its poster: the source is fetched only when the
frame comes within a screen of the viewport, playback stops when it leaves or
the tab is hidden, and `prefers-reduced-motion` leaves the poster alone. Keep
clips short and under about 2 MB — see `AmbientVideo`.

---

## Notes on the numbers

The solar page is the commercial centre of the site, so its arithmetic is
derived rather than written. `src/lib/solar.ts` computes the quote and the ROI
worksheet from the assumptions stored on the service document — panel rate,
minutes per panel, tariff, yield, soiling loss, cleaning frequency. Change an
assumption in the portal and every published figure moves with it. No number on
that page is typed into copy.

The claims are deliberately conservative. The page states plainly that a coating
does **not** make a clean panel produce more than it was built to, and the
aircraft page publishes no cruise-speed or fuel-burn figure, because those
numbers would be invented.

---

## Motion

Motion is owner-configurable in **Portal → Appearance** — loading screen, page
transitions, particles, parallax, cursor effects, grain, and an overall
intensity. The operating system always wins: `prefers-reduced-motion` disables
every decorative animation regardless of those settings, and counters render
their finished value rather than starting at zero.

The bead particle field is canvas-drawn and idles when its section scrolls out
of view or the tab is hidden.

---

## Layout

```
src/
  app/
    (site)/            public pages
    portal/            CMS — login, then (dash) for the authenticated shell
    api/track/         first-party analytics beacon
    actions/           server actions: leads, CMS, media
  components/
    brand/             logo marks and lockup
    icons/             the custom motif set
    motion/            reveals, counters, parallax, particles, transitions
    site/              page sections
    portal/            editor, tables, media library
    ui/                buttons, sections, media frames
  content/
    types.ts           the whole content model
    seed/              default content
  lib/
    content/           store, adapters (Supabase + file), deep merge
    portal/            auth, field inference, module registry
    solar.ts           quote and ROI maths
supabase/              schema.sql, policies.sql, seed.sql
```

---

## Accessibility

Every text colour in the palette meets WCAG AA against its background at body
size (verified: `ash` 5.2:1, the lightest label 5.1:1). Headings run in order on
every page with exactly one `h1`. The before/after slider is a real
`role="slider"` with arrow, Home and End keys and an `aria-valuetext` that names
the proportion showing. Disclosure widgets use `aria-expanded` with linked
regions. Every form control has an associated label, and errors are announced.
