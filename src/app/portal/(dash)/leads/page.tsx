import { getSiteContent, listLeads } from "@/lib/content/store";
import { LeadsTable } from "@/components/portal/LeadsTable";
import { PageHeader } from "@/components/portal/Ui";

export const metadata = { title: "Leads" };

export default async function LeadsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const [leads, { business }] = await Promise.all([listLeads(), getSiteContent()]);
  const params = await searchParams;
  const source = typeof params.source === "string" ? params.source : undefined;

  return (
    <>
      <PageHeader
        title="Leads"
        description="Every enquiry, quote request and calculator submission, with its full follow-up history."
      />
      <LeadsTable
        leads={leads}
        locale={business.locale}
        currency={business.currency}
        initialSource={source}
      />
    </>
  );
}
