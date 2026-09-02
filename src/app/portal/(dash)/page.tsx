import Link from "next/link";
import { getSiteContent, listEvents, listLeads, storeKind } from "@/lib/content/store";
import { usingDefaultCredentials } from "@/lib/portal/auth";
import { PageHeader, Panel, StatTile, StatusPill, EmptyState } from "@/components/portal/Ui";
import { formatCurrency, formatDate } from "@/lib/utils";
import { nowMs } from "@/lib/time";

export const metadata = { title: "Dashboard" };

export default async function PortalDashboard() {
  const [content, leads, events] = await Promise.all([getSiteContent(), listLeads(), listEvents()]);
  const { services, testimonials, business, contact, seo, galleryItems } = content;

  const now = nowMs();
  const last30 = leads.filter((l) => now - new Date(l.createdAt).getTime() < 30 * 864e5);
  const newLeads = leads.filter((l) => l.status === "new");
  const won = leads.filter((l) => l.status === "won");
  const pageviews = events.filter((e) => e.kind === "pageview").length;

  const publishedTestimonials = testimonials.filter((t) => t.status === "published");
  const averageRating = publishedTestimonials.length
    ? publishedTestimonials.reduce((sum, t) => sum + t.rating, 0) / publishedTestimonials.length
    : 0;

  const pipelineValue = leads
    .filter((l) => !["won", "lost"].includes(l.status))
    .reduce((sum, l) => sum + (l.estimatedValue ?? 0), 0);

  /* Launch checklist — the things that must change before this site is live. */
  const checklist = [
    {
      id: "c1",
      done: storeKind() === "supabase",
      label: "Connect Supabase",
      body: "Content is currently stored in local JSON files. Add your project URL and service role key to move to the database.",
      href: undefined as string | undefined,
    },
    {
      id: "c2",
      done: !usingDefaultCredentials(),
      label: "Set a portal password",
      body: "The development default is active. Set PORTAL_EMAIL and PORTAL_PASSWORD_HASH before publishing.",
      href: undefined,
    },
    {
      id: "c3",
      done: !contact.phone.includes("5550187"),
      label: "Replace the placeholder phone number",
      body: "The number on the site is a formatted stand-in. Update it in Contact information.",
      href: "/portal/edit/contact",
    },
    {
      id: "c4",
      done: !seo.siteUrl.includes("perfectdetailing.co.za") || Boolean(seo.verification.google),
      label: "Confirm the site URL and search verification",
      body: "Set the live domain and paste your Google Search Console verification token.",
      href: "/portal/edit/seo",
    },
    {
      id: "c5",
      done: galleryItems.some((g) => g.media.src),
      label: "Upload real photography",
      body: "Gallery entries are rendering illustrated plates until images are added.",
      href: "/portal/media",
    },
  ];
  const outstanding = checklist.filter((c) => !c.done);

  return (
    <>
      <PageHeader
        title={`Good to see you${business.tradingName ? "" : ""}`}
        description="Everything on the public website is controlled from here. Changes publish the moment you save."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile
          label="New enquiries"
          value={newLeads.length}
          detail={`${last30.length} in the last 30 days`}
          tone={newLeads.length ? "accent" : "default"}
          href="/portal/leads"
        />
        <StatTile
          label="Open pipeline"
          value={formatCurrency(pipelineValue, { currency: business.currency, locale: business.locale })}
          detail="Estimated value of leads not yet won or lost"
        />
        <StatTile
          label="Jobs won"
          value={won.length}
          detail={leads.length ? `${Math.round((won.length / leads.length) * 100)}% of all enquiries` : "No enquiries yet"}
        />
        <StatTile
          label="Average rating"
          value={averageRating ? averageRating.toFixed(1) : "—"}
          detail={`${publishedTestimonials.length} published reviews`}
          href="/portal/edit/testimonials"
        />
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-[1.4fr_1fr]">
        <Panel
          title="Recent enquiries"
          action={<Link href="/portal/leads" className="text-[0.78rem] text-ceramic hover:underline">View all</Link>}
        >
          {leads.length ? (
            <ul className="divide-y divide-silver/8">
              {leads.slice(0, 7).map((lead) => (
                <li key={lead.id}>
                  <Link href={`/portal/leads/${lead.id}`} className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-silver/4">
                    <span className="numeral w-24 shrink-0 text-[0.72rem] text-ash">{lead.reference}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[0.86rem] text-chrome">{lead.name}</span>
                      <span className="block truncate text-[0.75rem] text-ash">
                        {lead.serviceSlug || "General enquiry"}
                        {lead.panelCount ? ` · ${lead.panelCount} panels` : ""}
                      </span>
                    </span>
                    <StatusPill status={lead.status} />
                    <span className="numeral hidden w-24 shrink-0 text-right text-[0.72rem] text-ash sm:block">
                      {formatDate(lead.createdAt, business.locale)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              title="No enquiries yet"
              body="Submissions from the contact and quote forms land here the moment they are sent."
            />
          )}
        </Panel>

        <div className="flex flex-col gap-3">
          <Panel title={outstanding.length ? `Before you launch · ${outstanding.length} left` : "Launch checklist"}>
            <ul className="divide-y divide-silver/8">
              {checklist.map((item) => (
                <li key={item.id} className="flex items-start gap-3 px-5 py-3.5">
                  <span
                    aria-hidden
                    className={`mt-0.5 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full border text-[0.6rem] ${
                      item.done ? "border-ceramic/50 text-ceramic" : "border-amber/45 text-amber"
                    }`}
                  >
                    {item.done ? "✓" : "!"}
                  </span>
                  <span className="min-w-0">
                    <span className={`block text-[0.83rem] ${item.done ? "text-ash line-through" : "text-chrome"}`}>
                      {item.href && !item.done ? (
                        <Link href={item.href} className="hover:text-ceramic">{item.label}</Link>
                      ) : (
                        item.label
                      )}
                    </span>
                    {!item.done ? (
                      <span className="mt-1 block text-[0.74rem] leading-relaxed text-ash">{item.body}</span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          </Panel>

          <div className="grid grid-cols-2 gap-3">
            <StatTile label="Services live" value={services.filter((s) => s.status === "published").length} href="/portal/services" />
            <StatTile label="Page views" value={pageviews} detail="Last 90 days" href="/portal/analytics" />
          </div>
        </div>
      </div>
    </>
  );
}
