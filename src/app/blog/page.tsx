import BlogBrowser from "@/components/blog/BlogBrowser";
import { JsonLd } from "@/lib/seo/JsonLd";
import { generatePageMetadata, generateBreadcrumbSchema, siteConfig } from "@/lib/seo/config";

const title = "Whats91 Blog | Messaging, ERP and Account Guides";
const description = "Browse Whats91 guides about WhatsApp messaging, ERP connections, billing and account conditions. Search articles by topic and follow the supporting sources.";
export const metadata = generatePageMetadata({ title, description, path: "/blog" });
const schemas = [generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Blog", url: "/blog" }]), {
  "@context": "https://schema.org", "@type": "Blog", "@id": `${siteConfig.url}/blog#blog`,
  name: "Whats91 Blog", description, url: `${siteConfig.url}/blog`,
  isPartOf: { "@id": `${siteConfig.url}/#website` }, publisher: { "@id": `${siteConfig.url}/#organization` },
}];
export default function BlogPage() { return <><JsonLd data={schemas} /><BlogBrowser /></>; }
