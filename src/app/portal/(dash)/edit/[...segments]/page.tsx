import { notFound } from "next/navigation";
import { getSiteContent } from "@/lib/content/store";
import { editorTargetFor } from "@/lib/portal/modules";
import { DocumentEditor } from "@/components/portal/DocumentEditor";

export async function generateMetadata({ params }: { params: Promise<{ segments: string[] }> }) {
  const { segments } = await params;
  const portalModule = editorTargetFor(segments);
  return { title: portalModule?.label ?? "Edit" };
}

export default async function EditPage({ params }: { params: Promise<{ segments: string[] }> }) {
  const { segments } = await params;
  const portalModule = editorTargetFor(segments);
  if (!portalModule?.target) notFound();

  const content = await getSiteContent();

  if (portalModule.target.type === "singleton") {
    return (
      <DocumentEditor
        target={{ type: "singleton", key: portalModule.target.key }}
        initial={content[portalModule.target.key]}
        title={portalModule.label}
        description={portalModule.description}
      />
    );
  }

  const collection = content[portalModule.target.key] as unknown as Record<string, unknown>[];

  if (portalModule.filter) {
    const subset = collection.filter(
      (item) => String(item[portalModule.filter!.key]) === portalModule.filter!.value,
    );
    return (
      <DocumentEditor
        target={{
          type: "collectionSubset",
          key: portalModule.target.key,
          filterKey: portalModule.filter.key,
          filterValue: portalModule.filter.value,
        }}
        initial={subset}
        title={portalModule.label}
        description={`${portalModule.description}. Other entries in this collection are left untouched.`}
      />
    );
  }

  return (
    <DocumentEditor
      target={{ type: "collection", key: portalModule.target.key }}
      initial={collection}
      title={portalModule.label}
      description={portalModule.description}
    />
  );
}
