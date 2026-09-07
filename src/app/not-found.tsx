import Link from "next/link";
import { Mark } from "@/components/brand/Marks";

export default function NotFound() {
  return (
    <html lang="en-ZA">
      <body style={{ background: "#05070a", color: "#e6edf3", margin: 0 }}>
        <main className="grid min-h-dvh place-items-center px-6 py-20 text-center">
          <div className="flex max-w-lg flex-col items-center gap-7">
            <Mark size={58} />
            <p className="numeral text-[0.72rem] tracking-[0.32em] text-ash uppercase">Error 404</p>
            <h1 className="font-display text-[clamp(2.2rem,6vw,3.4rem)] leading-[0.98] font-bold tracking-tight text-chrome">
              Nothing to polish here.
            </h1>
            <p className="text-[0.95rem] leading-relaxed text-silver/65">
              That page has either moved or never existed. The work is all still on the site — try the
              services, or tell us what you were looking for.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <Link
                href="/"
                className="rounded-full bg-linear-115 from-ceramic to-electric px-6 py-3 text-[0.88rem] font-medium text-ink"
              >
                Back to home
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-silver/20 px-6 py-3 text-[0.88rem] text-chrome transition-colors hover:border-ceramic/45 hover:text-ceramic"
              >
                Ask us
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
