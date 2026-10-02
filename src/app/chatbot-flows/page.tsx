import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import {
  Container,
  Section,
  SectionHeader,
  CTAGroup,
  PrimaryCTA,
  SecondaryCTA,
} from "@/components/shared";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChatbotFlowLibrary } from "./ChatbotFlowLibrary";
import { JsonLd } from "@/lib/seo/JsonLd";
import {
  generateBreadcrumbSchema,
  generatePageMetadata,
  generateServiceSchema,
  siteConfig,
} from "@/lib/seo/config";
import { flowCategories, flowRegistry } from "@/lib/flows/registry";
import { Bot, Code, Copy, Zap, Play, BookOpen } from "lucide-react";

import { flowResourceTitle, flowResourceDescription, flowResourceScope } from "@/lib/resource-content";

const pagePath = "/chatbot-flows";
const pageUrl = `${siteConfig.url}${pagePath}`;
const seoTitle = flowResourceTitle;
const seoDescription = flowResourceDescription;

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: seoTitle,
    description: seoDescription,
    keywords: [
      "WhatsApp Chatbot Templates",
      "WhatsApp Flow JSON Schema",
      "Chatbot Flow Library",
      "WhatsApp Chatbot Flow Builder",
      "Pre-built WhatsApp Automation",
    ],
    path: pagePath,
  }),
  alternates: { canonical: pageUrl },
};

const nodeTypeReference = [
  { type: "trigger.inbound_message", label: "Trigger Node", desc: "Entry point for flows" },
  { type: "message.compose", label: "Message Node", desc: "Send WhatsApp messages" },
  { type: "logic.condition", label: "Condition Node", desc: "Branch logic" },
  { type: "action.set_variable", label: "Set Variable", desc: "Store data" },
  { type: "action.tag_contact", label: "Tag Contact", desc: "Label contacts" },
  { type: "control.wait", label: "Wait Node", desc: "Pause execution" },
  { type: "control.end", label: "End Node", desc: "Terminate flow" },
  { type: "edges", label: "Edge Connections", desc: "Link nodes together" },
];

const usageSteps = [
  { step: 1, title: "Download or copy", description: "Download an example JSON file, or use Copy JSON with clipboard permission. Manual selectable JSON is shown after loading.", icon: Copy },
  { step: 2, title: "Review requirements", description: "Confirm the target builder’s supported schema/version, permissions, variables and connected services.", icon: Code },
  { step: 3, title: "Test separately", description: "Adapt an example and test it in your authorized environment. This website does not import or activate flows.", icon: BookOpen },
];

const schemaData = [
  generateServiceSchema({
    name: "WhatsApp Chatbot Flow Library",
    description: seoDescription,
    url: pageUrl,
  }),
  generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Features", url: "/features" },
    { name: "Chatbot Flow Library", url: pagePath },
  ]),
];

export default function ChatbotFlowLibraryPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd data={schemaData} />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-surface to-background py-16 sm:py-20 lg:py-24">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" aria-hidden="true" />
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <Badge variant="secondary" className="mb-4 px-3 py-1 text-sm font-medium">
                <Bot className="h-3.5 w-3.5 mr-1.5 text-brand-primary" aria-hidden="true" />
                JSON Example Library
              </Badge>
              <h1 className="heading-1 mb-4">
                Chatbot Flow
                <span className="text-brand-primary"> Library</span>
              </h1>
              <p className="text-lead mb-8 max-w-2xl mx-auto">
                {flowResourceDescription}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-text-secondary">
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-brand-primary" aria-hidden="true" />
                  <span>Example JSON</span>
                </div>
                <div className="flex items-center gap-2">
                  <Copy className="h-4 w-4 text-brand-primary" aria-hidden="true" />
                  <span>Copy & Download</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-brand-primary" aria-hidden="true" />
                  <span>Review Before Use</span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Quick Stats */}
        <Section pad="sm" bordered>
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-brand-primary">{flowRegistry.length}</p>
                <p className="text-sm text-text-secondary">JSON Examples</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-brand-primary">{flowCategories.length}</p>
                <p className="text-sm text-text-secondary">Categories</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-brand-primary">JSON</p>
                <p className="text-sm text-text-secondary">Download Original Files</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-brand-primary">Review</p>
                <p className="text-sm text-text-secondary">Before Separate Testing</p>
              </div>
            </div>
          </Container>
        </Section>

        {/* Interactive Flow Library */}
        <Section>
          <Container>
            <p className="mb-6 text-body-sm">{flowResourceScope}</p>
            <ChatbotFlowLibrary />
            <section aria-labelledby="flow-downloads-heading" className="mt-10">
              <h2 id="flow-downloads-heading" className="heading-3 mb-3">All {flowRegistry.length} JSON downloads</h2>
              <p className="mb-3 text-caption">These links work without JavaScript. A download requests a file; it does not import a flow.</p>
              <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {flowRegistry.map(flow => <li key={flow.id}><a href={`/api/flows/${flow.id}`} download={`${flow.id}.json`} className="block min-h-11 rounded-lg border border-border p-3 text-sm font-medium text-brand-700">{flow.name} · {flow.id}.json</a></li>)}
              </ul>
            </section>
          </Container>
        </Section>

        {/* How to Use */}
        <Section tone="surface" aria-labelledby="usage-heading">
          <Container>
            <SectionHeader
              id="usage-heading"
              title="How to Use Flow Templates"
              description="Review an example before considering it for your target environment. Import and activation are unavailable here."
            />
            <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
              {usageSteps.map((item) => (
                <div key={item.step} className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-brand-600 text-white font-bold text-lg mb-4">
                    {item.step}
                  </div>
                  <item.icon className="h-8 w-8 text-brand-primary mb-3" aria-hidden="true" />
                  <h3 className="text-base font-semibold text-text-primary mb-2">{item.title}</h3>
                  <p className="text-sm text-text-secondary">{item.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Schema Info */}
        <Section>
          <Container>
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Code className="h-5 w-5 text-brand-primary" aria-hidden="true" />
                  Chatbot Flow JSON Schema
                </CardTitle>
                <CardDescription>
                  These node labels describe the source examples. They do not certify Meta approval or compatibility with a connected builder.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {nodeTypeReference.map((item) => (
                    <div key={item.type} className="p-3 bg-surface rounded-lg border border-border/30">
                      <p className="text-xs font-mono text-brand-primary mb-1">{item.type}</p>
                      <p className="text-sm font-medium text-text-primary">{item.label}</p>
                      <p className="text-xs text-text-muted">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Container>
        </Section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-brand-primary/10 to-brand-primary/5">
          <Container>
            <div className="text-center">
              <h2 className="heading-2 mb-4">Review Your Flow Requirements</h2>
              <p className="text-body mb-8 max-w-xl mx-auto">
                Read the Flow Builder overview and confirm the requirements for your account before using a JSON example.
              </p>
              <CTAGroup align="center" className="justify-center">
                <PrimaryCTA href="/flow-builder" noArrow>
                  <Play className="h-4 w-4 mr-1" aria-hidden="true" />
                  Read Flow Builder Overview
                </PrimaryCTA>
                <SecondaryCTA href="https://developers.whats91.com/overview">
                  <BookOpen className="h-4 w-4 mr-1" aria-hidden="true" />
                  View Documentation
                </SecondaryCTA>
              </CTAGroup>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
