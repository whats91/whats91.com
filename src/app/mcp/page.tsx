import "../connector-scenes.css";
import "./scenes.css";
import type { Metadata } from "next";
import { mcpTitle, mcpDescription, mcpQualification, mcpAccessNote, mcpResourceNote, mcpGatewayNote } from "@/lib/mcp-contract";
import Link from "next/link";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { JsonLd } from "@/lib/seo/JsonLd";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generatePageMetadata,
  generateSoftwareApplicationSchema,
  siteConfig,
} from "@/lib/seo/config";
import {
  Container,
  CTAGroup,
  Eyebrow,
  FeatureCard,
  PrimaryCTA,
  Reveal,
  SecondaryCTA,
  Section,
  SectionHeader,
  TrustPill,
} from "@/components/shared";
import { McpHeroScene } from "@/components/landing/mcp/McpHeroScene";
import { McpClientCard } from "@/components/landing/mcp/McpClientCard";
import { McpComparison } from "@/components/landing/mcp/McpComparison";
import { McpCapabilityGrid } from "@/components/landing/mcp/McpCapabilityGrid";
import { McpExamplePrompt } from "@/components/landing/mcp/McpExamplePrompt";
import { McpFlowSteps } from "@/components/landing/mcp/McpFlowSteps";
import { McpTrustGrid } from "@/components/landing/mcp/McpTrustGrid";
import { McpArchitectureDiagram } from "@/components/landing/mcp/McpArchitectureDiagram";
import { McpFaq } from "@/components/landing/mcp/McpFaq";
import {
  mcpAccess,
  mcpClients,
  mcpFaqItems,
  mcpPromptGroups,
  mcpPrompts,
  statusLabel,
} from "@/components/landing/mcp/mcpContent";
import { CheckCircle2, Clock, MessageSquareOff, ScanSearch, ShieldCheck } from "lucide-react";

const pagePath = "/mcp";
const pageUrl = `${siteConfig.url}${pagePath}`;
const seoTitle = mcpTitle;
const seoDescription = mcpDescription;

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: seoTitle,
    description: seoDescription,
    keywords: [
      "Whats91 MCP",
      "WhatsApp MCP server",
      "connect WhatsApp data to ChatGPT",
      "Whats91 ChatGPT integration",
      "Whats91 Claude Code integration",
      "WhatsApp Business MCP",
      "MCP server for WhatsApp reports",
      "AI assistant for WhatsApp Business data",
    ],
    path: pagePath,
  }),
  alternates: { canonical: pageUrl, types: { "text/markdown": `${siteConfig.url}/api/md/mcp`, "application/json": `${siteConfig.url}/api/mcp/pages/mcp` } },
};

const structuredData = [
  generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "MCP", url: pagePath },
  ]),
  generateFAQSchema(mcpFaqItems.map((f) => ({ question: f.q, answer: f.a }))),
  generateSoftwareApplicationSchema({
    name: "Whats91 MCP",
    description: seoDescription,
    url: pageUrl,
    applicationCategory: "BusinessApplication",
  }),
];

const painCards = [
  { icon: ScanSearch, title: "Scattered reports", line: '"Which report was that in again?" — answers scattered across screens.' },
  { icon: Clock, title: "Manual exports", line: '"Give me a minute to pull that up." — manual filtering and exporting.' },
  { icon: MessageSquareOff, title: "Trapped data", line: '"Let me copy this into a message." — data trapped, re-typed, out of date.' },
];

const notCards = [
  { negative: "Not direct database access", positive: "a fixed set of approved tools" },
  { negative: "Not shared passwords or keys", positive: "review authentication and revocation" },
  { negative: "Not an open, unrestricted API", positive: "confirm enabled tools and permissions" },
  { negative: "Not manual exports & copy-paste", positive: "results from permitted tools" },
];

export default function McpPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd data={structuredData} />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {/* B1 — Hero */}
        <Section tone="brand-soft" aria-labelledby="mcp-hero-heading">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 items-center">
              <div className="min-w-0 text-center lg:text-left">
                <Eyebrow className="mb-5 max-w-full whitespace-normal">Whats91 MCP · Confirm access</Eyebrow>
                <h1 id="mcp-hero-heading" className="heading-1 mb-5">
                  Your WhatsApp business, answerable by AI.
                </h1>
                <p className="text-lead mb-6 max-w-xl mx-auto lg:mx-0">
                  Explore asking an AI assistant about your WhatsApp business data. Start with an access enquiry
                  to confirm what your assistant, plan and account can use.
                </p>
                <p className="text-body-sm mb-5">{mcpQualification}</p>
                <CTAGroup align="responsive-hero" className="mb-6 flex-wrap">
                  <PrimaryCTA href={mcpAccess.primaryHref} className="max-w-full whitespace-normal h-auto min-h-11 py-3 text-center">{mcpAccess.primaryLabel}</PrimaryCTA>
                  <SecondaryCTA href={mcpAccess.secondaryHref} className="max-w-full whitespace-normal h-auto min-h-11 py-3 text-center">{mcpAccess.secondaryLabel}</SecondaryCTA>
                </CTAGroup>
                <p className="text-caption mb-5">{mcpAccessNote}</p>
                <div className="flex flex-wrap justify-center gap-2.5 lg:justify-start mb-7">
                  <TrustPill className="max-w-full whitespace-normal">Review permissions</TrustPill>
                  <TrustPill className="max-w-full whitespace-normal">Documented tool-based design</TrustPill>
                  <TrustPill className="max-w-full whitespace-normal">Confirm disconnect controls</TrustPill>
                </div>
                <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                  {mcpClients.map((client) => (
                    <span
                      key={client.id}
                      className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-text-secondary shadow-sm"
                    >
                      {client.name} · {statusLabel[client.status]}
                    </span>
                  ))}
                </div>
              </div>
              <McpHeroScene />
            </div>
          </Container>
        </Section>

        {/* B2 — The problem */}
        <Section aria-labelledby="mcp-problem-heading">
          <Container>
            <SectionHeader
              eyebrow="Sound familiar?"
              id="mcp-problem-heading"
              title="You run your business on WhatsApp. Your answers shouldn't be this hard."
              description="Your customers, campaigns, and conversations live on WhatsApp. But every time you need a number, you're back in dashboards — filtering, exporting, screenshotting, and pasting it somewhere else. The data is yours. Getting to it shouldn't cost you an afternoon."
            />
            <div className="grid gap-5 sm:grid-cols-3">
              {painCards.map((card) => (
                <Reveal key={card.title}>
                  <FeatureCard icon={card.icon} title={card.title} description={card.line} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>

        {/* B3 — Before / After */}
        <Section tone="surface" aria-labelledby="mcp-comparison-heading">
          <Container>
            <SectionHeader
              eyebrow="The relief"
              id="mcp-comparison-heading"
              title="From digging for data to just asking."
            />
            <Reveal>
              <McpComparison />
            </Reveal>
          </Container>
        </Section>

        {/* B4 — What is Whats91 MCP */}
        <Section id="what-is-mcp" aria-labelledby="mcp-what-is-heading">
          <Container size="narrow">
            <SectionHeader
              eyebrow="Plain language"
              id="mcp-what-is-heading"
              title="What is Whats91 MCP?"
            />
            <p className="text-lead text-center mb-10 max-w-2xl mx-auto">
              MCP (Model Context Protocol) is an open standard for AI assistants to use external tools and data.
              The Whats91 product platform was source-reported available in July 2026. Its documented design
              uses an authorised connection and approved tools. Confirm the current setup and tools for your account.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {notCards.map((card) => (
                <div key={card.negative} className="surface-card p-4 flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-primary mt-0.5" aria-hidden="true" />
                  <p className="text-sm text-text-secondary">
                    <span className="line-through text-text-muted">{card.negative}</span>
                    {" — "}
                    <span className="font-medium text-text-primary">{card.positive}</span>
                  </p>
                </div>
              ))}
            </div>
            <p className="text-caption text-center mt-6">Open standard · spec revision 2025-11-25.</p>
          </Container>
        </Section>

        {/* B5 — Supported AI clients */}
        <Section tone="surface" aria-labelledby="mcp-clients-heading">
          <Container>
            <SectionHeader
              eyebrow="Assistant paths to confirm"
              id="mcp-clients-heading"
              title="Explore a setup for the assistant you use."
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {mcpClients.map((client) => (
                <Reveal key={client.id}>
                  <McpClientCard client={client} />
                </Reveal>
              ))}
            </div>
            <p className="text-caption text-center mt-6">
              Client support, provider tiers and authentication flows need individual confirmation.
            </p>
          </Container>
        </Section>

        {/* B6 — Capabilities */}
        <Section aria-labelledby="mcp-capabilities-heading">
          <Container>
            <SectionHeader
              eyebrow="Capabilities"
              id="mcp-capabilities-heading"
              title="Discuss the tools your team needs."
              description="These capability areas were source-reported. Confirm each currently enabled tool and its account entitlement before use."
            />
            <Reveal>
              <McpCapabilityGrid />
            </Reveal>
            <div className="mt-10 flex justify-center">
              <PrimaryCTA href={mcpAccess.primaryHref} className="max-w-full whitespace-normal h-auto min-h-11 py-3 text-center">{mcpAccess.primaryLabel}</PrimaryCTA>
            </div>
          </Container>
        </Section>

        {/* B7 — Live prompt examples */}
        <Section tone="surface" aria-labelledby="mcp-examples-heading">
          <Container size="narrow">
            <SectionHeader
              eyebrow="Example prompts"
              id="mcp-examples-heading"
              title="Questions you could ask an enabled tool."
              description="Illustrative prompts and sample answers. Copying a prompt does not run a tool or access an account."
            />
            <div className="space-y-10">
              {mcpPromptGroups.map((group) => {
                const groupPrompts = mcpPrompts.filter((p) => p.group === group);
                return (
                  <div key={group}>
                    <h3 className="heading-4 mb-4">{group}</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {groupPrompts.map((prompt) => (
                        <McpExamplePrompt key={prompt.id} prompt={prompt} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </Section>

        {/* B8 — How it works */}
        <Section id="how-it-works" aria-labelledby="mcp-how-heading">
          <Container>
            <SectionHeader eyebrow="Getting started" id="mcp-how-heading" title="Start with an access enquiry." />
            <McpFlowSteps />
            <p className="text-caption text-center mt-8 max-w-2xl mx-auto">
              {mcpAccessNote}
            </p>
          </Container>
        </Section>

        {/* B9 — Trust & control */}
        <Section tone="surface" aria-labelledby="mcp-trust-heading">
          <Container>
            <SectionHeader
              eyebrow="Trust & control"
              id="mcp-trust-heading"
              title="Your data. Your rules."
              description="The documented design includes these controls. Confirm their current operation in the product service; this website review does not certify them."
            />
            <McpTrustGrid />
            <div className="mt-10 flex justify-center">
              <SecondaryCTA href="/contact">Talk to us</SecondaryCTA>
            </div>
          </Container>
        </Section>

        {/* B11 — Architecture (the one dev moment) */}
        <Section id="architecture" tone="ink" aria-labelledby="mcp-architecture-heading">
          <Container>
            <p className="text-overline mb-3 !text-brand-accent">For developers</p>
            <h2 id="mcp-architecture-heading" className="heading-2 !text-white mb-4">
              How the documented architecture fits together.
            </h2>
            <p className="text-body !text-ink-text mb-8 max-w-2xl">
              This illustrative flow describes the source-reported product design using MCP (spec 2025-11-25).
              Current transport, authentication, tool validation, permissions and account isolation need
              verification in the product service.
            </p>
            <p className="text-body-sm !text-ink-text mb-5">{mcpGatewayNote}</p>
            <p className="text-body-sm !text-ink-text mb-8">{mcpResourceNote}</p>
            <Reveal>
              <McpArchitectureDiagram />
            </Reveal>
          </Container>
        </Section>

        {/* B13 — FAQ */}
        <Section tone="surface" id="faq" aria-labelledby="mcp-faq-heading">
          <Container size="narrow">
            <SectionHeader eyebrow="Frequently asked questions" id="mcp-faq-heading" title="Questions about Whats91 MCP" />
            <McpFaq />
          </Container>
        </Section>

        {/* B14 — Final CTA */}
        <Section aria-labelledby="mcp-final-cta-heading">
          <Container>
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-brand-primary via-brand-primary to-brand-accent p-7 sm:p-8 md:p-12 lg:p-16 shadow-xl text-center">
              <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <div className="absolute -top-1/2 -right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-1/2 -left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-white/10 rounded-full blur-3xl" />
              </div>
              <div className="relative z-10 max-w-2xl mx-auto">
                <ShieldCheck className="h-8 w-8 text-white/80 mx-auto mb-4" aria-hidden="true" />
                <h2 id="mcp-final-cta-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                  Ask about Whats91 MCP access.
                </h2>
                <p className="text-base sm:text-lg text-white/90 mb-8">
                  Tell us your assistant and the tools you need. Our team can confirm current availability and the approved setup.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <PrimaryCTA href={mcpAccess.primaryHref} className="max-w-full whitespace-normal h-auto min-h-11 py-3 text-center !bg-white !text-brand-primary hover:!bg-white/95 !shadow-lg">
                    {mcpAccess.primaryLabel}
                  </PrimaryCTA>
                  <SecondaryCTA href={mcpAccess.docsHref} className="max-w-full whitespace-normal h-auto min-h-11 py-3 text-center !bg-white/10 !border-white/20 !text-white hover:!bg-white/20">
                    {mcpAccess.docsLabel}
                  </SecondaryCTA>
                </div>
                <p className="text-sm text-white/80 mt-6">{mcpAccessNote}</p>
                <p className="text-xs text-white/70 mt-3">
                  See our{" "}
                  <Link href="/privacy#ai-mcp" className="underline underline-offset-2 hover:text-white">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/terms#services" className="underline underline-offset-2 hover:text-white">
                    Terms
                  </Link>{" "}
                  for details on the Whats91 MCP integration.
                </p>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
