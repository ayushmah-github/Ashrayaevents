import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import CTASection from "@/components/sections/CTASection";
import { getPosts } from "@/lib/cms/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Wedding and event planning tips, trends and inspiration from the Ashraya Events team.",
};

// Read fresh posts from the admin/database on every request.
export const dynamic = "force-dynamic";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <PageHeader
        eyebrow="Journal"
        title="The Ashraya Blog"
        intro="Planning tips, trends and stories to inspire your celebration."
      />

      <Section tone="cream">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.id} delayIndex={i % 3} as="div">
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-xl2)] bg-white shadow-[0_10px_40px_-28px_rgba(74, 16, 32,0.4)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-soft)]"
              >
                {post.coverImage && (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {post.category && (
                      <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-xs font-semibold text-maroon">
                        {post.category}
                      </span>
                    )}
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs text-ink-soft">{formatDate(post.publishedAt)}</p>
                  <h2 className="mt-2 text-2xl leading-snug text-maroon">{post.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-dark transition-colors group-hover:text-maroon">
                    Read more{" "}
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection title="Planning your own celebration?" />
    </>
  );
}
