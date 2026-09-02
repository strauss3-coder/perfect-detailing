import Link from "next/link";
import { notFound } from "next/navigation";
import { getSiteContent, listLeads } from "@/lib/content/store";
import { LeadDetail } from "@/components/portal/LeadDetail";
import { PageHeader } from "@/components/portal/Ui";

export const metadata = { title: "Lead" };

export default async function LeadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [leads, { business, users }] = await Promise.all([listLeads(), getSiteContent()]);
  const lead = leads.find((l) => l.id === id);
  if (!lead) notFound();

  return (
    <>
      <PageHeader
        title={lead.name}
        description={`${lead.reference} · submitted through the ${lead.source} form`}
        action={
          <Link href="/portal/leads" className="rounded-full border border-silver/15 px-4 py-2 text-[0.8rem] text-silver transition-colors hover:border-ceramic/45 hover:text-ceramic">
            ← All leads
          </Link>
        }
      />
      <LeadDetail
        lead={lead}
        staff={users.filter((u) => u.active).map((u) => u.name)}
        locale={business.locale}
        currency={business.currency}
      />
    </>
  );
}
