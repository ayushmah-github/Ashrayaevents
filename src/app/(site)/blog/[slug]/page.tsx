import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Container from "@/components/ui/Container";
import CTASection from "@/components/sections/CTASection";
import { getPost, getPosts } from "@/lib/cms/content";

// Always read the latest post content from the database.
export const revalidate = 0;

// Pre-render known slugs (placeholder + published).
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      <article className="pt-32 sm:pt-40">
        <Container size="narrow">
          <Link href="/blog" className="text-sm font-semibold text-gold-dark hover:text-maroon">
            ← Back to blog
          </Link>
          <div className="mt-6 text-center">
            {post.category && (
              <span className="eyebrow text-gold-dark">{post.category}</span>
            )}
            <h1 className="mt-3 text-4xl leading-tight text-maroon sm:text-5xl text-balance">
              {post.title}
            </h1>
            <p className="mt-4 text-sm text-ink-soft">
              {post.author ? `${post.author} · ` : ""}
              {formatDate(post.publishedAt)}
            </p>
          </div>

          {post.coverImage && (
            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[var(--radius-xl2)] shadow-[var(--shadow-soft)]">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose-blog mx-auto mt-12 max-w-none text-lg leading-relaxed text-ink">
            {post.body ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
            ) : (
              // Placeholder posts have no body yet.
              <div className="space-y-5">
                <p className="text-xl text-ink">{post.excerpt}</p>
                <p className="rounded-2xl bg-sand p-6 text-base text-ink-soft">
                  <strong>[PLACEHOLDER post]</strong> — Full article content will
                  appear here once this post is published from the admin panel at{" "}
                  <code>/admin</code>.
                </p>
              </div>
            )}
          </div>
        </Container>
      </article>

      <div className="mt-20">
        <CTASection title="Let's plan your celebration." />
      </div>
    </>
  );
}
