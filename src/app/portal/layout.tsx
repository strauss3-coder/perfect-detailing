import type { Metadata } from "next";
import { JetBrains_Mono, Manrope, Playfair_Display, Sora } from "next/font/google";
import "../globals.css";

const sora = Sora({ variable: "--font-sora", subsets: ["latin"], weight: ["400", "600", "700"], display: "swap" });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });
const jet = JetBrains_Mono({ variable: "--font-jet", subsets: ["latin"], weight: ["400", "500"], display: "swap" });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], weight: ["400"], style: ["italic"], display: "swap" });

export const metadata: Metadata = {
  title: { default: "Portal — Perfect Detailing", template: "%s — Perfect Detailing Portal" },
  robots: { index: false, follow: false },
};

/**
 * The portal is a separate application shell from the marketing site: no
 * ambient motion, no loader, no page transitions. Editing tools should feel
 * instant and quiet.
 */
export default function PortalRootLayout({ children }: LayoutProps<"/portal">) {
  return (
    <div className={`${sora.variable} ${manrope.variable} ${jet.variable} ${playfair.variable} min-h-dvh bg-ink`}>
      {children}
    </div>
  );
}
