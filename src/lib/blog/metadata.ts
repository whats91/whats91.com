import { contentDates } from "@/lib/content/dates";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/seo/config";
import { getPostBySlug } from "./registry";

/**
 * Builds route metadata for a blog post from the central registry.
 *
 * Article pages are server components; each existing
 * post directory may keep a thin server `layout.tsx` that calls this with its
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
  const { published: publishedTime, modified: modifiedTime } = contentDates(post);
  const shareImage = post.coverImage ? `${siteConfig.url}${post.coverImage}` : siteConfig.ogImage;

  return {
    title: post.seo.title,
    description: post.seo.description,
    keywords: post.seo.keywords.join(", "),
    authors: [],
    ...(post.indexHold && { robots: { index: false, follow: true } }),
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
      authors: undefined,
      tags: post.tags,
      // Defining `openGraph` here replaces the root layout's object wholesale,
      // so the share image must be re-declared or the post ships without one.
      images: [{ url: shareImage, width: 1200, height: 630, alt: post.coverAlt || post.seo.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo.title,
      description: post.seo.description,
      images: [shareImage],
    },
  };
}

export function generateBlogArticleSchema(slug: string) {
  const post = getPostBySlug(slug);
  if (!post) throw new Error(`generateBlogArticleSchema: unknown slug "${slug}"`);
  const url = `${siteConfig.url}/blog/${post.slug}`;
  const dates = contentDates(post);
  const shareImage = post.coverImage ? `${siteConfig.url}${post.coverImage}` : siteConfig.ogImage;
  return {
    "@context": "https://schema.org", "@type": "Article", "@id": `${url}#article`, url,
    headline: post.title, description: post.excerpt,
    ...(dates.published && { datePublished: dates.published }),
    ...(dates.modified && { dateModified: dates.modified }),
    publisher: { "@id": `${siteConfig.url}/#organization` },
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: shareImage, articleSection: post.category, inLanguage: siteConfig.language,
  };
}
