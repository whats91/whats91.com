import Link from "next/link";
import { featureRoutes, offeringScope, supportScope } from "@/lib/home-content";
import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/lib/seo/JsonLd";
import { generateBreadcrumbSchema, generatePageMetadata, siteConfig } from "@/lib/seo/config";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  LayoutDashboard,
  MessageSquareText,
  PlugZap,
  Workflow,
} from "lucide-react";

const pagePath = "/features";
const pageUrl = `${siteConfig.url}${pagePath}`;

export const metadata: Metadata = generatePageMetadata({
  title: "Whats91 Features for WhatsApp Automation | Chatbots, Flows, Shortcuts",
  description:
    "Explore Whats91 features for WhatsApp automation, including Chat Shortcuts, Flow Builder, chatbot flows, templates, integrations, and customer conversation tools.",
  keywords: [
    "Whats91 features",
    "WhatsApp automation features",
    "WhatsApp Chat Shortcuts",
    "WhatsApp Flow Builder",
    "WhatsApp chatbot flows",
    "WhatsApp business automation",
  ],
  path: pagePath,
});

const featureIcons = [MessageSquareText, Workflow, Bot, PlugZap];
const featureCards = featureRoutes.map((feature, index) => ({ ...feature, icon: featureIcons[index] }));

const structuredData = [
  generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Features", url: pagePath },
  ]),
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#collection`,
    url: pageUrl,
    name: "Whats91 Features",
    description:
      "Feature index for Whats91 WhatsApp automation capabilities, including Chat Shortcuts, Flow Builder, and chatbot flow templates.",
    inLanguage: "en-IN",
    isPartOf: { "@id": `${siteConfig.url}/#website` },
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={structuredData} />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-b from-surface/80 to-background py-14 sm:py-16 md:py-20">
          <div className="absolute inset-0 gradient-brand-subtle" aria-hidden="true" />
          <div className="relative mx-auto max-w-[1000px] px-4 text-center sm:px-6 lg:px-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-card px-3 py-1.5 text-xs font-semibold text-brand-primary shadow-sm">
              <LayoutDashboard className="h-3.5 w-3.5" />
              Whats91 feature library
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
              Choose a feature path for your customer workflow
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
              Browse Whats91 features for customer conversations, chatbot automation, visual workflows, templates, and ERP-connected WhatsApp journeys.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-body-sm">{offeringScope}</p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild className="min-h-11 h-auto py-3 whitespace-normal bg-brand-600 px-6 text-white hover:bg-brand-primary-hover">
                <Link href="/features/chat-shortcuts-conversation-automation">
                  Explore Chat Shortcuts
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="min-h-11 h-auto py-3 whitespace-normal border-border bg-card px-6 text-text-primary hover:bg-surface">
                <Link href="/contact">Request a demo</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-16 md:py-20" aria-labelledby="features-list-heading">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-primary">Featured capabilities</p>
              <h2 id="features-list-heading" className="text-2xl font-bold text-text-primary sm:text-3xl">
                Start with the feature that matches your workflow
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {featureCards.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Link
                    key={feature.href}
                    href={feature.href}
                    className="group rounded-2xl border border-border/70 bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold text-brand-primary">
                        {feature.badge}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-text-primary">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">{feature.description}</p>
                    <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-brand-primary">
                      View feature
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <aside className="max-w-4xl mx-auto px-4 sm:px-6 pb-8 text-body-sm space-y-3"><p>{supportScope}</p><p>A demo request is an enquiry, not a scheduled appointment or account activation.</p></aside>

        <section className="bg-surface/50 py-12 sm:py-14" aria-labelledby="feature-principles-heading">
          <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm sm:p-8">
              <h2 id="feature-principles-heading" className="text-2xl font-bold text-text-primary">
                Built around real WhatsApp operations
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  "Templates, incoming messages and workflow routing",
                  "ERP requests, customer replies and human handoff",
                  "Confirm prerequisites, enabled actions and exception handling",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm leading-relaxed text-text-secondary">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
