"use client";

import { useState, useTransition } from "react";
import type { Lead, LeadStatus } from "@/content/types";
import { addLeadNoteAction, assignLeadAction, setLeadValueAction, updateLeadStatusAction } from "@/app/actions/cms";
import { Panel, StatusPill } from "./Ui";
import { formatCurrency, formatDate, cn } from "@/lib/utils";

const STATUSES: LeadStatus[] = ["new", "contacted", "quoted", "scheduled", "won", "lost"];

export function LeadDetail({
  lead,
  staff,
  locale,
  currency,
}: {
  lead: Lead;
  staff: string[];
  locale: string;
  currency: string;
}) {
  const [pending, startTransition] = useTransition();
  const [note, setNote] = useState("");
  const [value, setValue] = useState(lead.estimatedValue?.toString() ?? "");

  const run = (fn: () => Promise<void>) => startTransition(async () => { await fn(); });

  return (
    <div className="grid gap-3 lg:grid-cols-[1.35fr_1fr]">
      <div className="flex flex-col gap-3">
        <Panel title="Enquiry">
          <dl className="grid gap-px bg-silver/8 sm:grid-cols-2">
            <Row label="Name" value={lead.name} />
            <Row label="Received" value={formatDate(lead.createdAt, locale)} />
            <Row label="Email" value={lead.email} href={`mailto:${lead.email}`} />
            <Row label="Phone" value={lead.phone} href={`tel:${lead.phone.replace(/[^\d+]/g, "")}`} />
            <Row label="Service" value={lead.serviceSlug || "Not specified"} />
            <Row label="Source" value={lead.source} />
            {lead.company ? <Row label="Company" value={lead.company} /> : null}
            {lead.propertyType ? <Row label="Property type" value={lead.propertyType} /> : null}
            {lead.panelCount ? <Row label="Panel count" value={String(lead.panelCount)} /> : null}
            {lead.assetDetails ? <Row label="Asset details" value={lead.assetDetails} /> : null}
            {lead.pageUrl ? <Row label="Submitted from" value={lead.pageUrl} /> : null}
          </dl>
          <div className="border-t border-silver/10 p-5">
            <p className="label-tech mb-2.5 text-silver/60">Message</p>
            <p className="text-[0.9rem] leading-relaxed whitespace-pre-wrap text-silver/80">{lead.message}</p>
          </div>
        </Panel>

        <Panel title="Notes & follow-up">
          <div className="p-5">
            <label htmlFor="lead-note" className="label-tech text-silver/60">Add a note</label>
            <textarea
              id="lead-note"
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Called, left voicemail. Quote to follow Thursday."
              className="mt-2 w-full resize-y rounded-tile border border-silver/15 bg-ink/40 px-3.5 py-3 text-[0.86rem] leading-relaxed text-chrome outline-none placeholder:text-ash focus:border-ceramic/50"
            />
            <button
              type="button"
              disabled={pending || !note.trim()}
              onClick={() => run(async () => { await addLeadNoteAction(lead.id, note); setNote(""); })}
              className="mt-3 rounded-full bg-linear-115 from-ceramic to-electric px-4 py-2 text-[0.8rem] font-medium text-ink disabled:opacity-45"
            >
              {pending ? "Saving…" : "Add note"}
            </button>
          </div>

          {lead.history.length ? (
            <ol className="border-t border-silver/10">
              {[...lead.history].reverse().map((event) => (
                <li key={event.id} className="flex gap-4 border-b border-silver/6 px-5 py-3.5 last:border-0">
                  <span className="numeral w-24 shrink-0 text-[0.7rem] text-ash">
                    {formatDate(event.createdAt, locale)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.84rem] text-chrome">
                      {event.kind === "status"
                        ? `Status changed from ${event.from} to ${event.to}`
                        : event.kind === "assignment"
                          ? `Assigned from ${event.from} to ${event.to}`
                          : event.kind === "created"
                            ? event.body
                            : event.body}
                    </span>
                    <span className="mt-0.5 block text-[0.72rem] text-ash">{event.author}</span>
                  </span>
                </li>
              ))}
            </ol>
          ) : null}
        </Panel>
      </div>

      <div className="flex flex-col gap-3">
        <Panel title="Status">
          <div className="flex flex-wrap gap-1.5 p-5">
            {STATUSES.map((status) => (
              <button
                key={status}
                type="button"
                disabled={pending}
                onClick={() => run(() => updateLeadStatusAction(lead.id, status))}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-[0.76rem] transition-colors duration-300 disabled:opacity-50",
                  lead.status === status
                    ? "border-ceramic/50 bg-ceramic/10 text-ceramic"
                    : "border-silver/15 text-silver/60 hover:border-silver/35 hover:text-chrome",
                )}
              >
                {status}
              </button>
            ))}
          </div>
        </Panel>

        <Panel title="Assignment">
          <div className="p-5">
            <select
              value={lead.assignedTo}
              disabled={pending}
              onChange={(e) => run(() => assignLeadAction(lead.id, e.target.value))}
              aria-label="Assign to staff member"
              className="h-11 w-full rounded-tile border border-silver/15 bg-ink/40 px-3.5 text-[0.86rem] text-chrome outline-none focus:border-ceramic/50"
            >
              <option value="">Unassigned</option>
              {staff.map((member) => (
                <option key={member} value={member}>{member}</option>
              ))}
            </select>
          </div>
        </Panel>

        <Panel title="Estimated value">
          <div className="flex gap-2 p-5">
            <input
              type="number"
              min={0}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              aria-label="Estimated job value"
              className="numeral h-11 flex-1 rounded-tile border border-silver/15 bg-ink/40 px-3.5 text-[0.9rem] text-chrome outline-none focus:border-ceramic/50"
            />
            <button
              type="button"
              disabled={pending}
              onClick={() => run(() => setLeadValueAction(lead.id, value === "" ? null : Number(value)))}
              className="rounded-full border border-silver/15 px-4 text-[0.8rem] text-silver transition-colors hover:border-ceramic/45 hover:text-ceramic disabled:opacity-50"
            >
              Save
            </button>
          </div>
          {lead.estimatedValue ? (
            <p className="numeral border-t border-silver/10 px-5 py-3 text-[0.82rem] text-ceramic">
              {formatCurrency(lead.estimatedValue, { currency, locale })}
            </p>
          ) : null}
        </Panel>

        <Panel>
          <div className="flex flex-col gap-2 p-5">
            <p className="label-tech mb-1 text-silver/60">Quick actions</p>
            <a href={`mailto:${lead.email}?subject=${encodeURIComponent(`Your quote from Perfect Detailing — ${lead.reference}`)}`}
              className="rounded-tile border border-silver/15 px-4 py-3 text-[0.83rem] text-chrome transition-colors hover:border-ceramic/45 hover:text-ceramic">
              Email {lead.name.split(" ")[0]}
            </a>
            <a href={`https://wa.me/${lead.phone.replace(/[^\d]/g, "")}`} target="_blank" rel="noopener noreferrer"
              className="rounded-tile border border-silver/15 px-4 py-3 text-[0.83rem] text-chrome transition-colors hover:border-ceramic/45 hover:text-ceramic">
              WhatsApp
            </a>
            <a href={`tel:${lead.phone.replace(/[^\d+]/g, "")}`}
              className="rounded-tile border border-silver/15 px-4 py-3 text-[0.83rem] text-chrome transition-colors hover:border-ceramic/45 hover:text-ceramic">
              Call {lead.phone}
            </a>
          </div>
        </Panel>

        <div className="flex items-center justify-between gap-4 px-1">
          <span className="numeral text-[0.74rem] text-ash">{lead.reference}</span>
          <StatusPill status={lead.status} />
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="bg-graphite p-4">
      <dt className="label-tech text-silver/60">{label}</dt>
      <dd className="mt-1.5 text-[0.86rem] break-words text-chrome">
        {href ? (
          <a href={href} className="text-ceramic hover:underline">{value}</a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}
