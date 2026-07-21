import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { getPosts } from "@/lib/cms/content";

/** Latest 3 blog posts, for the Home page. */
export default async function LatestPosts() {
  const posts = (await getPosts()).slice(0, 3);
  return (
    <div className="mt-14 grid gap-8 md:grid-cols-3">
      {posts.map((post, i) => (
        <Reveal key={post.id} delayIndex={i % 3} as="div">
          <Link
            href={`/blog/${post.slug}`}
            className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-xl2)] bg-white shadow-[0_10px_40px_-28px_rgba(74,16,32,0.4)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-soft)]"
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
              </div>
            )}
            <div className="flex flex-1 flex-col p-6">
              {post.category && (
                <span className="text-xs font-semibold uppercase tracking-wider text-gold-dark">
                  {post.category}
                </span>
              )}
              <h3 className="mt-2 text-xl leading-snug text-maroon">{post.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{post.excerpt}</p>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
