import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { BlogCard } from "@/components/blog/BlogCard";
import { AvatarImage } from "@/components/blog/AvatarImage";
import { BreadcrumbJsonLD } from "@/components/seo/JsonLD";
import { getAuthorBySlug, getAllAuthors } from "@/lib/blog/authors";
import { getAuthorLink } from "@/lib/blog/author-links";
import { getPostsByAuthor } from "@/lib/blog/registry";
import { siteConfig } from "@/lib/seo/config";
// Only the four existing public record routes are available. Unknown slugs
// must use the server-readable not-found document before streaming begins.
export const dynamicParams = false;
interface AuthorPageProps { params: Promise<{ slug: string }> }
export function generateStaticParams() { return getAllAuthors().map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const author = getAuthorBySlug((await params).slug);
  if (!author) return { title: "Author Not Found | Whats91", robots: { index: false, follow: true } };
  const title = `Author information ${author.id} | Whats91 Blog`;
  const description = "Attribution is being reviewed. Find articles linked to this existing author record or browse the Whats91 blog.";
  const url = `${siteConfig.url}/authors/${author.slug}`;
  return { title, description, authors: [], robots: { index: false, follow: true }, alternates: { canonical: url },
    openGraph: { title, description, url, siteName: siteConfig.name, type: "website", images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "Whats91 blog" }] },
    twitter: { card: "summary_large_image", title, description, images: [siteConfig.ogImage] } };
}
export default async function AuthorPage({ params }: AuthorPageProps) {
  const author = getAuthorBySlug((await params).slug);
  if (!author) notFound();
  const posts = getPostsByAuthor(author.id);
  const display = getAuthorLink(author.id);
  return <div className="min-h-screen flex flex-col bg-background">
    <BreadcrumbJsonLD items={[{ name: "Home", url: siteConfig.url }, { name: "Blog", url: `${siteConfig.url}/blog` }, { name: "Authors", url: `${siteConfig.url}/authors` }, { name: `Author information ${author.id}`, url: `${siteConfig.url}/authors/${author.slug}` }]} />
    <Header /><main id="main-content" tabIndex={-1} className="flex-1">
      <section className="py-12 sm:py-16 bg-surface/50"><div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-5 break-words">
        <nav aria-label="Breadcrumb" className="flex flex-wrap gap-3 text-sm"><Link className="underline min-h-11 inline-flex items-center" href="/blog">Blog</Link><Link className="underline min-h-11 inline-flex items-center" href="/authors">Authors</Link></nav>
        <AvatarImage name={display?.initials || ""} alt="" size="lg" />
        <h1 className="text-3xl sm:text-4xl font-bold">Author information {author.id}</h1>
        <p className="text-text-secondary">Profile details and article attribution are being reviewed. A biography, role and personal social links are not available.</p>
        <p className="text-sm text-text-secondary">The initials are a display placeholder, not a photograph or identity verification.</p>
      </div></section>
      <section className="py-12 sm:py-16"><div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-semibold mb-6">Linked articles</h2>
        {posts.length ? <div className="space-y-6">{posts.map(post => <BlogCard key={post.id} post={post} showAuthor={false} />)}</div> : <div className="rounded-2xl border border-border/60 p-6 bg-surface/50"><p>No articles are linked to this record.</p><Link className="inline-flex min-h-11 items-center underline text-brand-primary" href="/blog">Browse all articles</Link></div>}
        <Link href="/authors" className="inline-flex min-h-11 items-center underline mt-6">View author information</Link>
      </div></section>
    </main><Footer /></div>;
}
