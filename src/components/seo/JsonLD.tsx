import { JsonLd } from "@/lib/seo/JsonLd";
import { generateOrganizationSchema, generateWebSiteSchema, generateSoftwareApplicationSchema, generateFAQSchema, generateBreadcrumbSchema, siteConfig } from "@/lib/seo/config";

// Global output identifies this website only. Product, offer, contact, legal
// identity, social affiliation and author facts need their own approved scope.
export function SEOJsonLD() {
  return <JsonLd data={[generateOrganizationSchema(), generateWebSiteSchema()]} />;
}

interface OrganizationJsonLDProps { name?: string; url?: string; logo?: string; description?: string }
export function OrganizationJsonLD({ name = siteConfig.name, url = siteConfig.url, logo = `${siteConfig.url}/logo.svg`, description }: OrganizationJsonLDProps) {
  return <JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", "@id": `${url}/#organization`, name, url, logo, ...(description && { description }) }} />;
}
export function SoftwareApplicationJsonLD({ name = siteConfig.name, description = siteConfig.description, url = siteConfig.url }: { name?: string; description?: string; url?: string }) {
  return <JsonLd data={generateSoftwareApplicationSchema({ name, description, url })} />;
}
export function FAQJsonLD({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  return faqs.length ? <JsonLd data={generateFAQSchema(faqs)} /> : null;
}
export function BreadcrumbJsonLD({ items }: { items: Array<{ name: string; url: string }> }) {
  return <JsonLd data={generateBreadcrumbSchema(items)} />;
}
export function WebSiteJsonLD({ name = siteConfig.name, url = siteConfig.url, description }: { name?: string; url?: string; description?: string }) {
  return <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", "@id": `${url}/#website`, name, url, ...(description && { description }) }} />;
}

// Person JSON-LD for Author Pages
interface PersonJsonLDProps {
  publicUse?: "approved";
  name: string;
  url: string;
  jobTitle?: string;
  description?: string;
  image?: string;
  sameAs?: string[];
  worksFor?: {
    name: string;
    url: string;
  };
  knowsAbout?: string[];
}

export function PersonJsonLD({
  publicUse,
  name,
  url,
  jobTitle,
  description,
  image,
  sameAs,
  worksFor,
  knowsAbout,
}: PersonJsonLDProps) {
  if (publicUse !== "approved") return null;
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    url,
  };

  if (jobTitle) jsonLd.jobTitle = jobTitle;
  if (description) jsonLd.description = description;
  if (image) jsonLd.image = image;
  if (sameAs && sameAs.length > 0) jsonLd.sameAs = sameAs;
  if (worksFor) {
    jsonLd.worksFor = {
      "@type": "Organization",
      name: worksFor.name,
      url: worksFor.url,
    };
  }
  if (knowsAbout && knowsAbout.length > 0) jsonLd.knowsAbout = knowsAbout;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
