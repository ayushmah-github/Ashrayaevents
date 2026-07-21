import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getPosts } from "@/lib/cms/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url.replace(/\/$/, "");
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/testimonials",
    "/blog",
    "/contact",
    "/estimate",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const posts = await getPosts();
  const postRoutes = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
