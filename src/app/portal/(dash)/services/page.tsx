import Link from "next/link";
import { getSiteContent } from "@/lib/content/store";
import { PageHeader, StatusPill, Panel } from "@/components/portal/Ui";
import { Motif } from "@/components/icons/Motif";

export const metadata = { title: "Services" };

const CATEGORY_LABEL: Record<string, string> = {
  solar: "Solar coatings",
  ceramic: "Ceramic coatings",
  automotive: "Automotive services",
  aircraft: "Aircraft services",
  fleet: "Fleet services",
};

export default async function PortalServicesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { services } = await getSiteContent();
  const params = await searchParams;
  const category = typeof params.category === "string" ? params.category : undefined;

  const filtered = [...services]
    .filter((s) => !category || s.category === category)
    .sort((a, b) => a.order - b.order);

  return (
    <>
      <PageHeader
        title={category ? CATEGORY_LABEL[category] ?? "Services" : "All services"}
        description={
          category
            ? "Each service is a full page on the website. Open one to edit its copy, sections, packages, pricing and FAQs."
            : "Every service page on the website. Open one to edit its hero, explanatory sections, benefits, packages, process and FAQs."
        }
        action={
          category ? (
            <Link href="/portal/services" className="rounded-full border border-silver/15 px-4 py-2 text-[0.8rem] text-silver transition-colors hover:border-ceramic/45 hover:text-ceramic">
              Show all
            </Link>
          ) : null
        }
      />

      <ul className="grid gap-3 sm:grid-cols-2">
        {filtered.map((service) => (
          <li key={service.id}>
            <Link
              href={`/portal/services/${service.slug}`}
              className="panel-solid group flex h-full flex-col gap-4 rounded-panel p-6 transition-colors duration-300 hover:border-ceramic/35"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-silver/60 transition-colors duration-300 group-hover:text-ceramic">
                  <Motif motif={service.motif} size={40} strokeWidth={1.6} />
                </span>
                <StatusPill status={service.status} />
              </div>
              <div>
                <h2 className="font-display text-[1.08rem] tracking-tight text-chrome">{service.name}</h2>
                <p className="mt-2 text-[0.82rem] leading-relaxed text-ash">{service.cardSummary}</p>
              </div>
              <dl className="mt-auto grid grid-cols-3 gap-3 border-t border-silver/10 pt-4">
                <Metric label="Sections" value={service.sections.length} />
                <Metric label="Packages" value={service.packages.length} />
                <Metric label="FAQs" value={service.faqIds.length} />
              </dl>
            </Link>
          </li>
        ))}
      </ul>

      {filtered.length === 0 ? (
        <Panel className="mt-3">
          <p className="px-6 py-14 text-center text-[0.85rem] text-ash">
            No services in this category yet. Add one from the full services list.
          </p>
        </Panel>
      ) : null}
    </>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <dt className="label-tech text-silver/60">{label}</dt>
      <dd className="numeral mt-1 text-[0.95rem] text-silver/75">{value}</dd>
    </div>
  );
}
