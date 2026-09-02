import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/portal/auth";
import { listLeads, storeKind } from "@/lib/content/store";
import { Sidebar } from "@/components/portal/Sidebar";

export default async function DashLayout({ children }: { children: React.ReactNode }) {
  // The middleware bounces requests with no cookie; this verifies the
  // signature, which the edge runtime is not the right place for.
  const session = await getSession();
  if (!session) redirect("/portal/login");

  const leads = await listLeads();
  const newLeadCount = leads.filter((l) => l.status === "new").length;

  return (
    <div className="flex min-h-dvh flex-col lg:flex-row">
      <Suspense fallback={<div className="hidden w-[16.5rem] shrink-0 border-r border-silver/10 lg:block" />}>
        <Sidebar userName={session.name} storeKind={storeKind()} newLeadCount={newLeadCount} />
      </Suspense>
      <div className="min-w-0 flex-1">
        <div className="mx-auto max-w-6xl px-6 py-6">{children}</div>
      </div>
    </div>
  );
}
