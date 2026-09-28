import { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { AuthorCard } from "@/components/blog/AuthorCard";
import { BreadcrumbJsonLD } from "@/components/seo/JsonLD";
import { getAllAuthors } from "@/lib/blog/authors";

export const metadata: Metadata = {
  title: "Authors | Whats91 Blog",
  description: "Meet the expert writers and contributors behind the Whats91 blog. Our team of WhatsApp API specialists, developers, and business strategists share insights on enterprise messaging.",
  openGraph: {
    title: "Authors | Whats91 Blog",
    description: "Meet the expert writers and contributors behind the Whats91 blog.",
    url: "https://whats91.com/authors",
    siteName: "Whats91",
    type: "website",
    // Defining `openGraph` replaces the root layout's object wholesale, so
    // the share image must be re-declared here.
    images: [{ url: "https://whats91.com/og-image.png", width: 1200, height: 630, alt: "Whats91 Blog Authors" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Authors | Whats91 Blog",
    description: "Meet the expert writers and contributors behind the Whats91 blog.",
  },
  alternates: {
    canonical: "https://whats91.com/authors",
  },
};

export default function AuthorsPage() {
  const authors = getAllAuthors();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <BreadcrumbJsonLD items={[
        { name: "Home", url: "https://whats91.com" },
        { name: "Blog", url: "https://whats91.com/blog" },
        { name: "Authors", url: "https://whats91.com/authors" },
      ]} />

      <Header />
      <main className="flex-1">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 bg-gradient-to-b from-surface/80 to-background">
          <div className="absolute inset-0 gradient-brand-subtle pointer-events-none" />
          <div className="relative px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-4">
                Meet Our Authors
              </h1>
              <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
                Expert writers and contributors sharing insights on WhatsApp Business API, 
                enterprise messaging, and digital transformation strategies.
              </p>
            </div>
          </div>
        </section>

        {/* Authors Grid */}
        <section className="py-12 sm:py-16">
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
            <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {authors.map((author) => (
                <AuthorCard key={author.id} author={author} />
              ))}
            </div>
          </div>
        </section>

        {/* SEO Section */}
        <section className="py-12 sm:py-16 bg-surface/50">
          <div className="px-4 sm:px-6 lg:px-8 max-w-[800px] mx-auto text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4">
              Expert Knowledge, Real Experience
            </h2>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Our authors bring years of hands-on experience in WhatsApp Cloud API implementation, 
              enterprise integration, and business messaging. Each article is crafted with practical 
              insights from real-world projects, helping businesses navigate the evolving landscape 
              of customer communication.
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
