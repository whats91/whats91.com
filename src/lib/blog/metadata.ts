import type { Metadata } from "next";
import { siteConfig } from "@/lib/seo/config";
import { getPostBySlug } from "./registry";
import { getAuthorById } from "./authors";

/**
 * Builds route metadata for a blog post from the central registry.
 *
 * Most post pages are client components and cannot export metadata; each
 * post directory has a thin server `layout.tsx` that calls this with its
 * slug so the post gets its own title/description/canonical and
 * `og:type=article` data instead of inheriting the blog-index metadata.
 */
export function generateBlogPostMetadata(slug: string): Metadata {
  const post = getPostBySlug(slug);
  if (!post) {
    // Should never happen for a statically routed post; fail loud in dev.
    throw new Error(`generateBlogPostMetadata: unknown blog post slug "${slug}"`);
  }

  const url = `${siteConfig.url}/blog/${post.slug}`;
  const author = getAuthorById(post.authorId);
  const publishedTime = new Date(post.publishedAt).toISOString();
  const modifiedTime = new Date(post.updatedAt || post.publishedAt).toISOString();

  return {
    title: post.seo.title,
    description: post.seo.description,
    keywords: post.seo.keywords.join(", "),
    authors: author ? [{ name: author.name, url: `${siteConfig.url}/authors/${author.slug}` }] : undefined,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.seo.title,
      description: post.seo.description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "article",
      publishedTime,
      modifiedTime,
      authors: author ? [author.name] : undefined,
      tags: post.tags,
      // Defining `openGraph` here replaces the root layout's object wholesale,
      // so the share image must be re-declared or the post ships without one.
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: post.seo.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo.title,
      description: post.seo.description,
      images: [siteConfig.ogImage],
    },
  };
}
