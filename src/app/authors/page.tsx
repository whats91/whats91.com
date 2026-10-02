import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { AuthorCard } from "@/components/blog/AuthorCard";
import { BreadcrumbJsonLD } from "@/components/seo/JsonLD";
import { authorLinks } from "@/lib/blog/author-links";
import { getPostsByAuthor } from "@/lib/blog/registry";
import { siteConfig } from "@/lib/seo/config";
const title = "Author information | Whats91 Blog";
const description = "Find articles linked to existing author records. Public profile details and bylines are being reviewed; browse the blog by topic.";
export const metadata: Metadata = { title, description, authors: [], robots: { index: false, follow: true }, alternates: { canonical: `${siteConfig.url}/authors` },
  openGraph: { title, description, url: `${siteConfig.url}/authors`, siteName: siteConfig.name, type: "website", images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "Whats91 blog" }] },
  twitter: { card: "summary_large_image", title, description, images: [siteConfig.ogImage] } };
export default function AuthorsPage() {
  return <div className="min-h-screen flex flex-col bg-background"><BreadcrumbJsonLD items={[{ name: "Home", url: siteConfig.url }, { name: "Blog", url: `${siteConfig.url}/blog` }, { name: "Authors", url: `${siteConfig.url}/authors` }]} /><Header />
    <main id="main-content" tabIndex={-1} className="flex-1">
      <section className="py-12 sm:py-16 bg-surface/50"><div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-4"><h1 className="text-3xl sm:text-4xl font-bold">Author information</h1><p className="text-text-secondary">Public profiles and article bylines are being reviewed. These existing links remain available to help you find related articles.</p><Link href="/blog" className="inline-flex min-h-11 items-center underline text-brand-primary">Browse the blog by topic</Link></div></section>
      <section aria-label="Existing author records" className="py-12 sm:py-16"><div className="max-w-5xl mx-auto px-4 sm:px-6 grid gap-6 md:grid-cols-2">{authorLinks.map(author => <AuthorCard key={author.id} author={author} articleCount={getPostsByAuthor(author.id).length} />)}</div></section>
    </main><Footer /></div>;
}
