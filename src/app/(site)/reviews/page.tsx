import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content/store";
import { pageMetadata } from "@/lib/seo";
import { ReviewCard } from "@/components/site/ReviewsCarousel";
import { Stars } from "@/components/site/Stars";
import { CtaBanner } from "@/components/site/CtaBanner";
import { Counter } from "@/components/motion/Counter";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { BeadField } from "@/components/motion/BeadField";
import { Eyebrow, MicronRule } from "@/components/ui/Section";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("reviews", "/reviews");
}

export default async function ReviewsPage() {
  const { reviewsPage, testimonials, contact } = await getSiteContent();
  const reviews = testimonials.filter((t) => t.status === "published").sort((a, b) => a.order - b.order);

  const average = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const breakdown = [5, 4, 3, 2, 1].map((score) => {
    const count = reviews.filter((r) => Math.round(r.rating) === score).length;
    return { score, count, pct: reviews.length ? (count / reviews.length) * 100 : 0 };
  });

  return (
    <>
      <section className="relative isolate overflow-hidden pt-14 pb-16 sm:pt-20">
        <BeadField density={24} rise />
        <div className="shell relative z-10 max-w-3xl">
          <Reveal>
            <Eyebrow>{reviewsPage.hero.eyebrow}</Eyebrow>
            <h1 className="text-display mt-5 text-balance text-chrome">{reviewsPage.hero.title}</h1>
            <p className="text-lede mt-6 text-pretty">{reviewsPage.hero.lede}</p>
          </Reveal>
        </div>
      </section>

      <section className="relative pb-16">
        <div className="shell">
          <Reveal delay={0.05}>
            <div className="panel-glass grid gap-10 rounded-panel p-8 sm:p-11 lg:grid-cols-[auto_1fr_1.1fr] lg:items-center lg:gap-14">
              <div>
                <p className="label-tech text-silver/60">{reviewsPage.summary.averageLabel}</p>
                <p className="numeral mt-3 text-[clamp(3rem,6vw,4.4rem)] leading-none font-medium text-chrome">
                  <Counter value={average} precision={1} />
                </p>
                <Stars rating={average} size={17} className="mt-3" />
              </div>

              <div className="lg:border-x lg:border-silver/10 lg:px-12">
                <p className="label-tech text-silver/60">{reviewsPage.summary.countLabel}</p>
                <p className="numeral mt-3 text-[clamp(2.2rem,4vw,3rem)] leading-none font-medium text-ceramic">
                  <Counter value={reviews.length} />
                </p>
              </div>

              <div>
                <p className="label-tech text-silver/60">{reviewsPage.summary.breakdownLabel}</p>
                <ul className="mt-4 flex flex-col gap-2">
                  {breakdown.map((row) => (
                    <li key={row.score} className="flex items-center gap-3">
                      <span className="numeral w-4 text-[0.75rem] text-ash">{row.score}</span>
                      <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-silver/10">
                        <span
                          className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-ceramic to-electric"
                          style={{ width: `${row.pct}%` }}
                        />
                      </span>
                      <span className="numeral w-6 text-right text-[0.72rem] text-ash">{row.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <RevealGroup className="mt-8 grid gap-px overflow-hidden rounded-panel bg-silver/10 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
            {reviewsPage.trustIndicators.map((item) => (
              <RevealItem key={item.id}>
                <div className="flex h-full flex-col gap-1.5 bg-graphite p-5">
                  <p className="text-[0.88rem] font-medium text-chrome">{item.label}</p>
                  <p className="text-[0.78rem] leading-relaxed text-ash">{item.detail}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="relative pb-20">
        <div className="shell">
          <MicronRule label={`All ${reviews.length} reviews`} />
          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
            {reviews.map((review) => (
              <RevealItem key={review.id} className="h-full">
                <ReviewCard review={review} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <div className="pb-24 sm:pb-32">
        <CtaBanner
          title={reviewsPage.cta.title}
          body={reviewsPage.cta.body}
          actions={reviewsPage.cta.actions}
          contact={contact}
        />
      </div>
    </>
  );
}
