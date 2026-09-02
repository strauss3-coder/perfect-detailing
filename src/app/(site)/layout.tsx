import { Suspense } from "react";
import { getSiteContent } from "@/lib/content/store";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Loader } from "@/components/motion/Loader";
import { PageTransition } from "@/components/motion/PageTransition";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { FloatingContact } from "@/components/site/FloatingContact";
import { AmbientField } from "@/components/site/AmbientField";
import { StructuredData } from "@/components/site/StructuredData";
import { Analytics } from "@/components/site/Analytics";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const content = await getSiteContent();
  const { appearance, navigation, brand, business, contact, footer } = content;

  return (
    <MotionProvider settings={appearance.motion}>
      <StructuredData content={content} />
      <Loader
        headline={appearance.loader.headline}
        subline={appearance.loader.subline}
        minDurationMs={appearance.loader.minDurationMs}
      />
      <AmbientField />

      <div className="relative z-10 flex min-h-dvh flex-col">
        {navigation.announcement.enabled ? (
          <AnnouncementBar items={navigation.announcement.items} />
        ) : null}
        <Header navigation={navigation} brand={brand} contact={contact} />

        <main id="main" className="flex-1 pt-[var(--nav-h)]">
          <PageTransition>{children}</PageTransition>
        </main>

        <Footer footer={footer} brand={brand} business={business} contact={contact} />
      </div>

      <FloatingContact contact={contact} />
      <Suspense fallback={null}>
        <Analytics />
      </Suspense>
    </MotionProvider>
  );
}
