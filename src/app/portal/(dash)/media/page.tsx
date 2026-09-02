import { getSiteContent } from "@/lib/content/store";
import { supabaseConfigured } from "@/lib/supabase/env";
import { MediaLibrary } from "@/components/portal/MediaLibrary";
import { PageHeader } from "@/components/portal/Ui";

export const metadata = { title: "Media library" };

export default async function MediaPage() {
  const { media, business } = await getSiteContent();

  return (
    <>
      <PageHeader
        title="Media library"
        description="Every image, video and brand asset. Copy an asset's path and paste it into any image field elsewhere in the portal."
      />
      <MediaLibrary assets={media} supabaseConnected={supabaseConfigured} locale={business.locale} />
    </>
  );
}
