import Link from "next/link";
import { getSiteContent, listEvents, listLeads, storeKind } from "@/lib/content/store";
import { PageHeader, Panel, StatTile, EmptyState } from "@/components/portal/Ui";
import { nowMs } from "@/lib/time";

export const metadata = { title: "Analytics" };

export default async function AnalyticsPage() {
  const [events, leads, { services, business }] = await Promise.all([
    listEvents(),
    listLeads(),
    getSiteContent(),
  ]);

  const pageviews = events.filter((e) => e.kind === "pageview");
  const now = nowMs();

  const byPath = new Map<string, number>();
  for (const view of pageviews) byPath.set(view.path, (byPath.get(view.path) ?? 0) + 1);
  const topPages = [...byPath.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
  const maxPageCount = topPages[0]?.[1] ?? 1;

  const bySource = new Map<string, number>();
  for (const lead of leads) bySource.set(lead.source, (bySource.get(lead.source) ?? 0) + 1);

  const byService = new Map<string, number>();
  for (const lead of leads) {
    const key = lead.serviceSlug || "unspecified";
    byService.set(key, (byService.get(key) ?? 0) + 1);
  }
  const serviceRows = [...byService.entries()].sort((a, b) => b[1] - a[1]);
  const maxServiceCount = serviceRows[0]?.[1] ?? 1;

  /* Fourteen-day activity band, oldest first. */
  const days = Array.from({ length: 14 }, (_, i) => {
    const start = new Date(now - (13 - i) * 864e5);
    start.setHours(0, 0, 0, 0);
    const end = start.getTime() + 864e5;
    return {
      label: start.toLocaleDateString(business.locale, { day: "numeric", month: "short" }),
      views: pageviews.filter((v) => {
        const t = new Date(v.createdAt).getTime();
        return t >= start.getTime() && t < end;
      }).length,
      leads: leads.filter((l) => {
        const t = new Date(l.createdAt).getTime();
        return t >= start.getTime() && t < end;
      }).length,
    };
  });
  const maxDay = Math.max(1, ...days.map((d) => d.views));

  const conversion = pageviews.length ? (leads.length / pageviews.length) * 100 : 0;

  return (
    <>
      <PageHeader
        title="Website analytics"
        description="First-party measurement — no cookies, no third-party scripts, and nothing that identifies a visitor."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Page views" value={pageviews.length} detail="Last 90 days" />
        <StatTile label="Pages viewed" value={byPath.size} detail="Distinct routes" />
        <StatTile label="Enquiries" value={leads.length} tone="accent" href="/portal/leads" />
        <StatTile
          label="View to enquiry"
          value={`${conversion.toFixed(1)}%`}
          detail={pageviews.length ? "Enquiries per page view" : "No traffic recorded yet"}
        />
      </div>

      <Panel title="Last fourteen days" className="mt-3">
        {pageviews.length || leads.length ? (
          <div className="p-5">
            <div className="flex h-40 items-end gap-1.5" role="img" aria-label="Daily page views over the last fourteen days">
              {days.map((day) => (
                <div key={day.label} className="group relative flex flex-1 flex-col items-center gap-2">
                  <div className="relative flex w-full flex-1 items-end">
                    <div
                      className="w-full rounded-t-sm bg-linear-to-t from-electric/40 to-ceramic/70 transition-all duration-500"
                      style={{ height: `${Math.max(2, (day.views / maxDay) * 100)}%` }}
                    />
                    {day.leads > 0 ? (
                      <span
                        aria-hidden
                        className="absolute inset-x-0 -top-2 mx-auto h-1.5 w-1.5 rounded-full bg-amber"
                        title={`${day.leads} enquiries`}
                      />
                    ) : null}
                  </div>
                  <span className="numeral hidden text-[0.6rem] text-ash sm:block">{day.label.split(" ")[0]}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 flex items-center gap-4 text-[0.72rem] text-ash">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-sm bg-ceramic/70" /> Page views
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber" /> Enquiry received
              </span>
            </p>
          </div>
        ) : (
          <EmptyState
            title="No traffic recorded yet"
            body={
              storeKind() === "file"
                ? "Page views are being written to the local file store. They will start accumulating as soon as the site is visited."
                : "Page views will appear here as soon as the site receives visitors."
            }
          />
        )}
      </Panel>

      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <Panel title="Most viewed pages">
          {topPages.length ? (
            <ul className="divide-y divide-silver/8">
              {topPages.map(([path, count]) => (
                <li key={path} className="flex items-center gap-4 px-5 py-3">
                  <span className="numeral min-w-0 flex-1 truncate text-[0.8rem] text-chrome">{path}</span>
                  <span className="relative hidden h-1.5 w-28 overflow-hidden rounded-full bg-silver/10 sm:block">
                    <span
                      className="absolute inset-y-0 left-0 rounded-full bg-ceramic/70"
                      style={{ width: `${(count / maxPageCount) * 100}%` }}
                    />
                  </span>
                  <span className="numeral w-10 shrink-0 text-right text-[0.78rem] text-ash">{count}</span>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState title="Nothing yet" body="Page view counts appear here once the site has visitors." />
          )}
        </Panel>

        <Panel title="Enquiries by service">
          {serviceRows.length ? (
            <ul className="divide-y divide-silver/8">
              {serviceRows.map(([slug, count]) => {
                const service = services.find((s) => s.slug === slug);
                return (
                  <li key={slug} className="flex items-center gap-4 px-5 py-3">
                    <span className="min-w-0 flex-1 truncate text-[0.83rem] text-chrome">
                      {service?.name ?? "Not specified"}
                    </span>
                    <span className="relative hidden h-1.5 w-28 overflow-hidden rounded-full bg-silver/10 sm:block">
                      <span
                        className="absolute inset-y-0 left-0 rounded-full bg-electric/70"
                        style={{ width: `${(count / maxServiceCount) * 100}%` }}
                      />
                    </span>
                    <span className="numeral w-10 shrink-0 text-right text-[0.78rem] text-ash">{count}</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <EmptyState title="No enquiries yet" body="Once the forms are used, this breaks enquiries down by service." />
          )}
        </Panel>
      </div>

      <Panel title="Enquiries by source" className="mt-3">
        {bySource.size ? (
          <ul className="grid gap-px bg-silver/8 sm:grid-cols-3 lg:grid-cols-5">
            {[...bySource.entries()].map(([source, count]) => (
              <li key={source} className="bg-graphite p-5">
                <p className="label-tech text-silver/60">{source}</p>
                <p className="numeral mt-1.5 text-[1.4rem] text-ceramic">{count}</p>
                <Link href={`/portal/leads?source=${source}`} className="mt-2 inline-block text-[0.74rem] text-ash hover:text-ceramic">
                  View →
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState title="No enquiries yet" body="Sources are recorded automatically with every submission." />
        )}
      </Panel>
    </>
  );
}
