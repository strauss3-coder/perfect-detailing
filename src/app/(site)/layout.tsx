import { Suspense } from "react";
import { getSiteContent } from "@/lib/content/store";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { BootLoader } from "@/components/site/BootLoader";
import { LoaderController } from "@/components/motion/LoaderController";
import { PageTransition } from "@/components/motion/PageTransition";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingContact } from "@/components/site/FloatingContact";
import { AmbientField } from "@/components/site/AmbientField";
import { StructuredData } from "@/components/site/StructuredData";
import { Analytics } from "@/components/site/Analytics";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const content = await getSiteContent();
  const { appearance, navigation, brand, business, contact, footer } = content;

  return (
    <MotionProvider settings={appearance.motion}>
      {/* First in the body: the overlay is painted before anything below it
          is even laid out. */}
      <BootLoader appearance={appearance} />
      <LoaderController minDurationMs={appearance.loader.minDurationMs} />

      <StructuredData content={content} />
      <AmbientField />

      <div
        className="pd-shell relative z-10 flex min-h-dvh flex-col"
        style={
          {
            // The announcement strip lives inside the fixed header, so the
            // page has to be pushed clear of both, not just the nav row.
            "--announce-h":
              navigation.announcement.enabled && navigation.announcement.items.length
                ? "2.25rem"
                : "0rem",
          } as React.CSSProperties
        }
      >
        <Header navigation={navigation} brand={brand} contact={contact} />

        <main id="main" className="flex-1 pt-[calc(var(--nav-h)+var(--announce-h))]">
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
