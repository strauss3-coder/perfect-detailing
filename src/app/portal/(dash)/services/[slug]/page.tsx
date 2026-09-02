import Link from "next/link";
import { notFound } from "next/navigation";
import { getSiteContent } from "@/lib/content/store";
import { DocumentEditor } from "@/components/portal/DocumentEditor";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { services } = await getSiteContent();
  return { title: services.find((s) => s.slug === slug)?.name ?? "Service" };
}

export default async function EditServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { services } = await getSiteContent();
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <Link href="/portal/services" className="text-[0.8rem] text-ash transition-colors hover:text-ceramic">
          ← All services
        </Link>
        <span aria-hidden className="text-ash">·</span>
        <Link
          href={`/services/${service.slug}`}
          target="_blank"
          className="text-[0.8rem] text-ash transition-colors hover:text-ceramic"
        >
          View live page ↗
        </Link>
      </div>

      <DocumentEditor
        target={{ type: "collectionItem", key: "services", itemId: service.id }}
        initial={service}
        title={service.name}
        description="Everything on this service's public page, including its hero, sections, packages, process and pricing."
      />
    </>
  );
}
