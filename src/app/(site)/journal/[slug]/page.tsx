import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSiteContent } from "@/lib/content/store";
import { metadataFromSeo } from "@/lib/seo";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { CtaBanner } from "@/components/site/CtaBanner";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow, MicronRule } from "@/components/ui/Section";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const { posts } = await getSiteContent();
  return posts.filter((p) => p.status === "published").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { posts } = await getSiteContent();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Not found" };
  return metadataFromSeo(post.seo, `/journal/${post.slug}`);
}

export default async function JournalPostPage({ params }: PageProps<"/journal/[slug]">) {
  const { slug } = await params;
  const { posts, business, contact, seo } = await getSiteContent();
  const post = posts.find((p) => p.slug === slug && p.status === "published");
  if (!post) notFound();

  const others = posts
    .filter((p) => p.status === "published" && p.slug !== post.slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: business.legalName },
    mainEntityOfPage: `${seo.siteUrl}/journal/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="relative pt-14 pb-20 sm:pt-20">
        <div className="shell max-w-3xl">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="label-tech flex items-center gap-2 text-ash">
                <li><Link href="/journal" className="transition-colors hover:text-ceramic">Journal</Link></li>
                <li aria-hidden>/</li>
                <li className="truncate text-silver/70">{post.category}</li>
              </ol>
            </nav>
            <Eyebrow>{post.category}</Eyebrow>
            <h1 className="text-display mt-5 text-balance text-chrome">{post.title}</h1>
            <p className="text-lede mt-6 text-pretty">{post.excerpt}</p>
            <p className="numeral mt-7 flex flex-wrap items-center gap-4 text-[0.74rem] tracking-[0.14em] text-ash uppercase">
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, business.locale)}</time>
              <span aria-hidden>·</span>
              <span>{post.readMinutes} minute read</span>
              <span aria-hidden>·</span>
              <span>{post.author}</span>
            </p>
          </Reveal>
        </div>

        <div className="shell mt-12 max-w-4xl">
          <Reveal delay={0.06}>
            <MediaFrame media={post.cover} priority sizes="(min-width: 1024px) 60vw, 92vw" />
          </Reveal>
        </div>

        <div className="shell mt-14 max-w-2xl">
          <Reveal delay={0.04}>
            <div className="flex flex-col gap-6">
              {post.body.split("\n\n").map((paragraph, i) => (
                <p
                  key={paragraph.slice(0, 30)}
                  className={
                    i === 0
                      ? "text-[1.08rem] leading-[1.8] text-silver/85"
                      : "text-[0.98rem] leading-[1.82] text-silver/70"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </article>

      {others.length ? (
        <section className="relative pb-20">
          <div className="shell max-w-4xl">
            <MicronRule label="Read next" />
            <ul className="mt-10 divide-y divide-silver/10 border-y border-silver/10">
              {others.map((other) => (
                <li key={other.id}>
                  <Link href={`/journal/${other.slug}`} className="group flex items-baseline justify-between gap-6 py-5">
                    <span>
                      <span className="label-tech block text-ceramic">{other.category}</span>
                      <span className="mt-1.5 block font-display text-[1.05rem] tracking-tight text-chrome transition-colors group-hover:text-ceramic">
                        {other.title}
                      </span>
                    </span>
                    <span className="numeral shrink-0 text-[0.72rem] text-ash">{other.readMinutes} min</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <div className="pb-24 sm:pb-32">
        <CtaBanner
          eyebrow="From reading to doing"
          title="Want this run on your own numbers?"
          body="Send us your tariff, panel count or vehicle details and we will do the calculation properly rather than in the abstract."
          actions={[
            { label: "Get a quote", href: "/quote", intent: "primary" },
            { label: "Ask a question", href: "/contact", intent: "secondary" },
          ]}
          contact={contact}
        />
      </div>
    </>
  );
}
