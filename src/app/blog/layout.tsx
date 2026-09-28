import { Metadata } from "next";
import { siteConfig, generateBreadcrumbSchema } from "@/lib/seo/config";

export const metadata: Metadata = {
  title: "Blog - WhatsApp API Insights & Enterprise Communication",
  description: "Expert insights on WhatsApp Cloud API, ERP integration, business automation, and enterprise messaging best practices. Stay updated with Whats91 blog.",
  keywords: [
    "WhatsApp API blog",
    "WhatsApp Cloud API insights",
    "ERP integration articles",
    "business automation tips",
    "enterprise messaging best practices",
    "WhatsApp marketing guide",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog`,
    types: {
      "application/rss+xml": `${siteConfig.url}/feed.xml`,
    },
  },
  openGraph: {
    title: "Whats91 Blog - WhatsApp API Insights & Enterprise Communication",
    description: "Expert insights on WhatsApp Cloud API, ERP integration, and business automation best practices.",
    url: `${siteConfig.url}/blog`,
    type: "website",
    // Defining `openGraph` replaces the root layout's object wholesale, so
    // the share image must be re-declared here.
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "Whats91 Blog" }],
  },
};

// JSON-LD for Blog listing
const blogListSchemas = [
  generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ]),
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Whats91 Blog",
    description: "Expert insights on WhatsApp Cloud API, ERP integration, and enterprise messaging",
    url: `${siteConfig.url}/blog`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  },
];

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* JSON-LD Structured Data */}
      {blogListSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {children}
    </>
  );
}
