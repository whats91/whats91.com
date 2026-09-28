import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { BlogCard } from "@/components/blog/BlogCard";
import { BreadcrumbJsonLD, PersonJsonLD } from "@/components/seo/JsonLD";
import { getAuthorBySlug, getAllAuthors } from "@/lib/blog/authors";
import { getPostsByAuthor } from "@/lib/blog/registry";
import { 
  User,
  MapPin,
  Calendar,
  ExternalLink,
  Twitter,
  Linkedin,
  Github,
  Globe,
  FileText
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface AuthorPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all authors
export async function generateStaticParams() {
  const authors = getAllAuthors();
  return authors.map((author) => ({
    slug: author.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const author = getAuthorBySlug(resolvedParams.slug);

  if (!author) {
    return {
      title: "Author Not Found | Whats91",
    };
  }

  const authorPosts = getPostsByAuthor(author.id);

  return {
    title: `${author.name} | Whats91 Blog Author`,
    description: author.shortBio,
    openGraph: {
      title: `${author.name} | Whats91 Blog Author`,
      description: author.shortBio,
      url: `https://whats91.com/authors/${author.slug}`,
      siteName: "Whats91",
      type: "profile",
      images: author.avatar ? [author.avatar] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${author.name} | Whats91 Blog Author`,
      description: author.shortBio,
    },
    alternates: {
      canonical: `https://whats91.com/authors/${author.slug}`,
    },
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const resolvedParams = await params;
  const author = getAuthorBySlug(resolvedParams.slug);

  if (!author) {
    notFound();
  }

  const authorPosts = getPostsByAuthor(author.id);

  // JSON-LD for Person schema
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    url: `https://whats91.com/authors/${author.slug}`,
    sameAs: [
      author.social.twitter,
      author.social.linkedin,
      author.social.github,
      author.social.website,
    ].filter(Boolean),
    worksFor: {
      "@type": "Organization",
      name: "Whats91",
      url: "https://whats91.com",
    },
    knowsAbout: author.expertise,
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <BreadcrumbJsonLD items={[
        { name: "Home", url: "https://whats91.com" },
        { name: "Blog", url: "https://whats91.com/blog" },
        { name: "Authors", url: "https://whats91.com/authors" },
        { name: author.name, url: `https://whats91.com/authors/${author.slug}` },
      ]} />

      <Header />
      <main className="flex-1">
        
        {/* Author Profile Hero */}
        <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 bg-gradient-to-b from-surface/80 to-background">
          <div className="absolute inset-0 gradient-brand-subtle pointer-events-none" />
          <div className="relative px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
            <div className="max-w-3xl mx-auto">
              
              {/* Breadcrumb */}
              <nav className="mb-6">
                <ol className="flex items-center gap-2 text-xs sm:text-sm text-text-muted">
                  <li>
                    <Link href="/blog" className="hover:text-brand-primary transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li>/</li>
                  <li>
                    <Link href="/authors" className="hover:text-brand-primary transition-colors">
                      Authors
                    </Link>
                  </li>
                  <li>/</li>
                  <li className="text-text-primary font-medium">{author.name}</li>
                </ol>
              </nav>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
                
                {/* Avatar */}
                <div className="shrink-0">
                  <div className="relative">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-brand-primary/20 to-brand-accent/10 border-2 border-brand-primary/20 flex items-center justify-center shadow-lg">
                      <User className="w-12 h-12 sm:w-16 sm:h-16 text-brand-primary" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center shadow-md">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="text-center sm:text-left flex-1">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-2">
                    {author.name}
                  </h1>
                  <p className="text-base sm:text-lg text-brand-primary font-medium mb-3">
                    {author.role}
                  </p>
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
                    {author.bio}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4 text-xs sm:text-sm text-text-muted mb-4">
                    {author.location && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{author.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Joined {new Date(author.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5" />
                      <span>{authorPosts.length} article{authorPosts.length !== 1 ? 's' : ''}</span>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center sm:justify-start gap-2">
                    {author.social.twitter && (
                      <a 
                        href={author.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-surface border border-border/60 hover:border-brand-primary/30 hover:bg-brand-primary/5 transition-colors"
                      >
                        <Twitter className="h-4 w-4 text-text-secondary hover:text-brand-primary" />
                      </a>
                    )}
                    {author.social.linkedin && (
                      <a 
                        href={author.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-surface border border-border/60 hover:border-brand-primary/30 hover:bg-brand-primary/5 transition-colors"
                      >
                        <Linkedin className="h-4 w-4 text-text-secondary hover:text-brand-primary" />
                      </a>
                    )}
                    {author.social.github && (
                      <a 
                        href={author.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-surface border border-border/60 hover:border-brand-primary/30 hover:bg-brand-primary/5 transition-colors"
                      >
                        <Github className="h-4 w-4 text-text-secondary hover:text-brand-primary" />
                      </a>
                    )}
                    {author.social.website && (
                      <a 
                        href={author.social.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-surface border border-border/60 hover:border-brand-primary/30 hover:bg-brand-primary/5 transition-colors"
                      >
                        <Globe className="h-4 w-4 text-text-secondary hover:text-brand-primary" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Expertise Tags */}
              <div className="mt-8 pt-6 border-t border-border/60">
                <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 text-center sm:text-left">
                  Areas of Expertise
                </h3>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  {author.expertise.map((skill, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center rounded-full bg-brand-primary/10 border border-brand-primary/10 px-3 py-1 text-xs font-medium text-brand-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Author's Articles */}
        <section className="py-12 sm:py-16">
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-6">
                Articles by {author.name}
              </h2>

              {authorPosts.length > 0 ? (
                <div className="space-y-6">
                  {authorPosts.map((post) => (
                    <BlogCard key={post.id} post={post} showAuthor={false} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-surface/50 rounded-2xl border border-border/60">
                  <FileText className="h-12 w-12 text-text-muted mx-auto mb-4" />
                  <p className="text-text-secondary mb-4">No articles published yet.</p>
                  <Link href="/blog">
                    <Button variant="outline" className="rounded-xl">
                      Browse All Articles
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Back to Authors */}
        <section className="py-8 border-t border-border/60">
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto text-center">
            <Link 
              href="/authors"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-brand-primary transition-colors"
            >
              <ExternalLink className="h-4 w-4 rotate-180" />
              View All Authors
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
