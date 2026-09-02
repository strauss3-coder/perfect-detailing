"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Lead, LeadStatus } from "@/content/types";
import { StatusPill, EmptyState } from "./Ui";
import { exportLeadsCsvAction } from "@/app/actions/cms";
import { formatCurrency, formatDate, cn } from "@/lib/utils";

const STATUSES: (LeadStatus | "all")[] = ["all", "new", "contacted", "quoted", "scheduled", "won", "lost"];

export function LeadsTable({
  leads,
  locale,
  currency,
  initialSource,
}: {
  leads: Lead[];
  locale: string;
  currency: string;
  initialSource?: string;
}) {
  const [status, setStatus] = useState<LeadStatus | "all">("all");
  const [source, setSource] = useState(initialSource ?? "all");
  const [query, setQuery] = useState("");
  const [exporting, setExporting] = useState(false);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return leads.filter((lead) => {
      if (status !== "all" && lead.status !== status) return false;
      if (source !== "all" && lead.source !== source) return false;
      if (!needle) return true;
      return [lead.name, lead.email, lead.phone, lead.reference, lead.company, lead.message]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [leads, status, source, query]);

  const counts = useMemo(() => {
    const map = new Map<string, number>([["all", leads.length]]);
    for (const lead of leads) map.set(lead.status, (map.get(lead.status) ?? 0) + 1);
    return map;
  }, [leads]);

  async function exportCsv() {
    setExporting(true);
    try {
      const csv = await exportLeadsCsvAction();
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `perfect-detailing-leads-${new Date().toISOString().slice(0, 10)}.csv`;
      anchor.click();
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-1.5">
          {STATUSES.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setStatus(option)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-[0.76rem] transition-colors duration-300",
                status === option
                  ? "border-ceramic/50 bg-ceramic/8 text-ceramic"
                  : "border-silver/15 text-silver/60 hover:border-silver/30 hover:text-chrome",
              )}
            >
              {option === "all" ? "All" : option}
              <span className="numeral ml-2 text-[0.66rem] text-ash">{counts.get(option) ?? 0}</span>
            </button>
          ))}
        </div>

        <div className="ms-auto flex flex-wrap items-center gap-2">
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            aria-label="Filter by source"
            className="h-9 rounded-full border border-silver/15 bg-ink/40 px-3.5 text-[0.78rem] text-silver outline-none focus:border-ceramic/50"
          >
            <option value="all">All sources</option>
            <option value="quote">Quote requests</option>
            <option value="contact">Enquiries</option>
            <option value="calculator">Calculator</option>
            <option value="phone">Phone</option>
            <option value="referral">Referral</option>
          </select>

          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, reference…"
            aria-label="Search leads"
            className="h-9 w-56 rounded-full border border-silver/15 bg-ink/40 px-4 text-[0.78rem] text-chrome outline-none placeholder:text-ash focus:border-ceramic/50"
          />

          <button
            type="button"
            onClick={exportCsv}
            disabled={exporting || leads.length === 0}
            className="h-9 rounded-full border border-silver/15 px-4 text-[0.78rem] text-silver transition-colors hover:border-ceramic/45 hover:text-ceramic disabled:opacity-40"
          >
            {exporting ? "Exporting…" : "Export CSV"}
          </button>
        </div>
      </div>

      <div className="panel-solid overflow-hidden rounded-panel">
        {filtered.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[52rem] border-collapse text-left">
              <caption className="sr-only">Enquiries received through the website</caption>
              <thead>
                <tr className="border-b border-silver/10">
                  {["Reference", "Name", "Service", "Value", "Status", "Received"].map((heading) => (
                    <th key={heading} scope="col" className="label-tech px-5 py-3.5 text-silver/60">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead) => (
                  <tr key={lead.id} className="border-b border-silver/6 transition-colors last:border-0 hover:bg-silver/4">
                    <td className="px-5 py-3.5">
                      <Link href={`/portal/leads/${lead.id}`} className="numeral text-[0.78rem] text-ceramic hover:underline">
                        {lead.reference}
                      </Link>
                    </td>
                    <td className="px-5 py-3.5">
                      <Link href={`/portal/leads/${lead.id}`} className="block">
                        <span className="block text-[0.86rem] text-chrome">{lead.name}</span>
                        <span className="block text-[0.74rem] text-ash">{lead.email}</span>
                      </Link>
                    </td>
                    <td className="px-5 py-3.5 text-[0.8rem] text-silver/70">
                      {lead.serviceSlug || "—"}
                      {lead.panelCount ? <span className="numeral block text-[0.72rem] text-ash">{lead.panelCount} panels</span> : null}
                    </td>
                    <td className="numeral px-5 py-3.5 text-[0.8rem] text-silver/70">
                      {lead.estimatedValue ? formatCurrency(lead.estimatedValue, { currency, locale }) : "—"}
                    </td>
                    <td className="px-5 py-3.5"><StatusPill status={lead.status} /></td>
                    <td className="numeral px-5 py-3.5 text-[0.76rem] whitespace-nowrap text-ash">
                      {formatDate(lead.createdAt, locale)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            title={leads.length ? "Nothing matches those filters" : "No enquiries yet"}
            body={
              leads.length
                ? "Try clearing the search or choosing a different status."
                : "Submissions from the contact and quote forms appear here immediately, with a reference number."
            }
          />
        )}
      </div>

      <p className="numeral text-[0.72rem] text-ash">
        {filtered.length} of {leads.length} enquiries
      </p>
    </div>
  );
}
