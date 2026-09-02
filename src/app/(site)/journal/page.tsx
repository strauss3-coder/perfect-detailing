import type { Metadata } from "next";
import Link from "next/link";
import { getSiteContent } from "@/lib/content/store";
import { pageMetadata } from "@/lib/seo";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import { formatDate } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("journal", "/journal");
}

export default async function JournalPage() {
  const { posts, business } = await getSiteContent();
  const published = posts
    .filter((p) => p.status === "published")
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <section className="relative pt-14 pb-28 sm:pt-20">
      <div className="shell">
        <Reveal>
          <div className="max-w-3xl">
            <Eyebrow>Field notes</Eyebrow>
            <h1 className="text-display mt-5 text-balance text-chrome">
              What we have measured, and what it taught us.
            </h1>
            <p className="text-lede mt-6 text-pretty">
              Occasional notes on coating chemistry, soiling economics and keeping a finish alive in
              Highveld conditions. Written by the people holding the polisher.
            </p>
          </div>
        </Reveal>

        {published.length ? (
          <RevealGroup className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {published.map((post) => (
              <RevealItem key={post.id} className="h-full">
                <article className="group flex h-full flex-col">
                  <Link href={`/journal/${post.slug}`} className="flex h-full flex-col">
                    <MediaFrame media={post.cover} sizes="(min-width: 1024px) 32vw, 92vw" plateLabel="" />
                    <div className="mt-5 flex flex-1 flex-col">
                      <div className="flex items-center gap-3">
                        <span className="label-tech text-ceramic">{post.category}</span>
                        <span aria-hidden className="h-px flex-1 bg-silver/12" />
                        <span className="numeral text-[0.7rem] text-ash">{post.readMinutes} min</span>
                      </div>
                      <h2 className="mt-3 font-display text-[1.16rem] leading-snug tracking-tight text-chrome transition-colors group-hover:text-ceramic">
                        {post.title}
                      </h2>
                      <p className="mt-2.5 flex-1 text-[0.86rem] leading-relaxed text-silver/62">
                        {post.excerpt}
                      </p>
                      <time dateTime={post.publishedAt} className="numeral mt-5 text-[0.72rem] text-ash">
                        {formatDate(post.publishedAt, business.locale)}
                      </time>
                    </div>
                  </Link>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        ) : (
          <p className="mt-16 text-[0.92rem] text-ash">No entries published yet.</p>
        )}
      </div>
    </section>
  );
}
