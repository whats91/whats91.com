import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { FAQJsonLD, BreadcrumbJsonLD } from "@/components/seo/JsonLD";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TemplateCard } from "./TemplateCard";
import { marketingTemplates, utilityTemplates, authenticationTemplates } from "@/lib/message-examples";
import { generatePageMetadata, siteConfig } from "@/lib/seo/config";
import {
  Megaphone,
  Settings,
  Shield,
  Check,
  ArrowRight,
  Sparkles,
  AlertCircle,
  FileText,
  X,
} from "lucide-react";

import { messageExampleDescription, messageExampleScope } from "@/lib/resource-content";

const pagePath = "/whatsapp-templates";
const pageUrl = `${siteConfig.url}${pagePath}`;
const seoTitle = "WhatsApp Business Message Template Library | Whats91";
const seoDescription = messageExampleDescription;

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: seoTitle,
    description: seoDescription,
    keywords: [
      "WhatsApp Message Templates",
      "WhatsApp Template Examples",
      "WhatsApp Marketing Templates",
      "WhatsApp Utility Templates",
      "WhatsApp OTP Template",
    ],
    path: pagePath,
  }),
  alternates: { canonical: pageUrl },
};

const templateFaqs = [
  {
    q: "How long does template approval take?",
    a: "Template review outcome and timing depend on the account, category and current provider process. Example content does not establish approval or instant availability.",
  },
  {
    q: "What is the difference between categories?",
    a: "These examples group promotional, transactional and verification scenarios. Confirm the category and current account conditions for your intended message.",
  },
  {
    q: "Why was my utility template marked as marketing?",
    a: "Review whether the final text promotes an offer and check your account’s current classification requirements. An example category is not a provider approval.",
  },
  {
    q: "Can I use emojis in templates?",
    a: "Check the current requirements for each message component and language before submitting. These examples do not establish which characters a provider will accept.",
  },
  {
    q: "What happens if users block my templates?",
    a: "Review your account’s quality and delivery feedback, consent and opt-out handling. Example text does not establish account status or provider enforcement.",
  },
  {
    q: "Can I edit an approved template?",
    a: "Check the current editing and resubmission process for your account. Copying an example does not change or approve an existing template.",
  },
];

function TemplatesAIJsonLD() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#collection`,
    name: "WhatsApp Business Message Template Library",
    url: pageUrl,
    description:
      "WhatsApp template examples and guidance for marketing, utility, and authentication messages.",
    isPartOf: {
      "@id": `${siteConfig.url}/#website`,
    },
    about: [
      { "@type": "Thing", name: "WhatsApp Templates" },
      { "@type": "Thing", name: "Marketing Templates" },
      { "@type": "Thing", name: "Utility Templates" },
      { "@type": "Thing", name: "Authentication Templates" },
    ],
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [...marketingTemplates, ...utilityTemplates, ...authenticationTemplates].map(
        (template, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            name: template.name,
            description: template.useCase,
            genre: template.category,
          },
        })
      ),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function WhatsAppTemplatesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <FAQJsonLD faqs={templateFaqs.map((faq) => ({ question: faq.q, answer: faq.a }))} />
      <BreadcrumbJsonLD
        items={[
          { name: "Home", url: `${siteConfig.url}/` },
          { name: "WhatsApp Templates", url: pageUrl },
        ]}
      />
      <TemplatesAIJsonLD />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-surface to-background py-16 sm:py-20 lg:py-24">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" aria-hidden="true" />
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto relative">
            <div className="text-center max-w-3xl mx-auto">
              <Badge variant="secondary" className="mb-4 px-3 py-1 text-sm font-medium">
                <FileText className="h-3.5 w-3.5 mr-1.5 text-brand-primary" aria-hidden="true" />
                Template Library
              </Badge>
              <h1 className="heading-1 mb-4">
                WhatsApp Business Message
                <span className="text-brand-primary"> Template Library</span>
              </h1>
              <p className="text-lead mb-8 max-w-2xl mx-auto">
                Illustrative message templates for marketing campaigns, transactional notifications,
                and authentication. Review and adapt an example; approval and deployment are not established here.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-text-secondary">
                <div className="flex items-center gap-2">
                  <Megaphone className="h-4 w-4 text-info" aria-hidden="true" />
                  <span>Marketing</span>
                </div>
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4 text-brand-primary" aria-hidden="true" />
                  <span>Utility</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-success" aria-hidden="true" />
                  <span>Authentication</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-8 border-b border-border/40">
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-brand-primary">{marketingTemplates.length + utilityTemplates.length + authenticationTemplates.length}</p>
                <p className="text-sm text-text-secondary">Message Examples</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-brand-primary">Review</p>
                <p className="text-sm text-text-secondary">For Your Use Case</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-brand-primary">Confirm</p>
                <p className="text-sm text-text-secondary">Account Approval</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-brand-primary">3</p>
                <p className="text-sm text-text-secondary">Categories</p>
              </div>
            </div>
          </div>
        </section>

        {/* Template Categories */}
        <section className="py-12">
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
            <p className="mb-6 text-body-sm">{messageExampleScope} Category tabs and copying need JavaScript; the initial marketing examples remain selectable without scripts.</p>
              <Tabs defaultValue="marketing" className="w-full">
              <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 mb-8">
                <TabsTrigger value="marketing" className="flex items-center gap-2">
                  <Megaphone className="h-4 w-4" aria-hidden="true" />
                  Marketing
                </TabsTrigger>
                <TabsTrigger value="utility" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" aria-hidden="true" />
                  Utility
                </TabsTrigger>
                <TabsTrigger value="authentication" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" aria-hidden="true" />
                  Auth
                </TabsTrigger>
              </TabsList>

              <TabsContent value="marketing" className="space-y-8">
                <div className="max-w-3xl mx-auto text-center mb-8">
                  <h2 className="text-2xl font-bold text-text-primary mb-2">Marketing Templates</h2>
                  <p className="text-text-secondary">
                    Promotional messages for brand engagement, conversions, and customer acquisition.
                    Review example headers and message actions for your use case.
                  </p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {marketingTemplates.map((template) => (
                    <TemplateCard key={template.id} template={template} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="utility" className="space-y-8">
                <div className="max-w-3xl mx-auto text-center mb-8">
                  <h2 className="text-2xl font-bold text-text-primary mb-2">Utility Templates</h2>
                  <p className="text-text-secondary">
                    Transactional notifications for order updates, appointments, and account alerts.
                    Neutral tone required to avoid marketing reclassification.
                  </p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {utilityTemplates.map((template) => (
                    <TemplateCard key={template.id} template={template} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="authentication" className="space-y-8">
                <div className="max-w-3xl mx-auto text-center mb-8">
                  <h2 className="text-2xl font-bold text-text-primary mb-2">Authentication Templates</h2>
                  <p className="text-text-secondary">
                    One-time passwords and verification codes with fixed Meta-mandated structure.
                    Highest delivery priority and lowest cost per message.
                  </p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
                  {authenticationTemplates.map((template) => (
                    <TemplateCard key={template.id} template={template} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Technical Guidelines */}
        <section className="py-12 bg-surface/50">
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">
                Template Structure & Guidelines
              </h2>

              {/* Anatomy of Template */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-brand-primary" aria-hidden="true" />
                    Anatomy of a WhatsApp Template
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 font-medium">Component</th>
                          <th className="text-left py-2 font-medium">Status</th>
                          <th className="text-left py-2 font-medium">Limit</th>
                          <th className="text-left py-2 font-medium">Notes</th>
                        </tr>
                      </thead>
                      <tbody className="text-text-secondary">
                        <tr className="border-b border-border/40">
                          <td className="py-2 font-medium text-text-primary">Header</td>
                          <td><Badge variant="outline">Optional</Badge></td>
                          <td>Confirm current limit</td>
                          <td>Text, image, video, or document</td>
                        </tr>
                        <tr className="border-b border-border/40">
                          <td className="py-2 font-medium text-text-primary">Body</td>
                          <td><Badge variant="destructive">Required</Badge></td>
                          <td>Confirm current limit</td>
                          <td>Supports variables like {"{{1}}, {{2}}"}</td>
                        </tr>
                        <tr className="border-b border-border/40">
                          <td className="py-2 font-medium text-text-primary">Footer</td>
                          <td><Badge variant="outline">Optional</Badge></td>
                          <td>Confirm current limit</td>
                          <td>No formatting allowed</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium text-text-primary">Buttons</td>
                          <td><Badge variant="outline">Optional</Badge></td>
                          <td>Confirm current limit</td>
                          <td>Confirm supported action types and count</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Common Rejection Reasons */}
              <Card className="mb-8 border-warning-border bg-warning-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-warning">
                    <AlertCircle className="h-5 w-5" aria-hidden="true" />
                    Common Rejection Reasons
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      { issue: "Grammatical Errors", fix: "Proofread all content before submission" },
                      { issue: "Variable Placement", fix: "Variables must have surrounding text, not at start/end" },
                      { issue: "Language Mismatch", fix: "Template language must match content language" },
                      { issue: "Vague Content", fix: "Templates must be specific, not generic spam-like content" },
                      { issue: "Promotional Utility", fix: "Utility templates cannot contain any promotional content" },
                    ].map((item) => (
                      <li key={item.issue} className="flex items-start gap-3">
                        <X className="h-4 w-4 text-error shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                          <p className="font-medium text-text-primary">{item.issue}</p>
                          <p className="text-sm text-text-secondary">{item.fix}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Best Practices */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-brand-primary" aria-hidden="true" />
                    Best Practices for Approval
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "Use clear, specific content that explains the message purpose",
                      "Include opt-out instructions for marketing templates (STOP button)",
                      "Keep utility templates neutral - no promotional language",
                      "Test variables with realistic placeholder values",
                      "Match category to actual content intent",
                      "Confirm supported media type, size and permissions before adding a header",
                    ].map((tip) => (
                      <li key={tip} className="flex items-start gap-3">
                        <Check className="h-4 w-4 text-success shrink-0 mt-0.5" aria-hidden="true" />
                        <p className="text-sm text-text-secondary">{tip}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12">
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {templateFaqs.map((faq) => (
                  <details key={faq.q} className="surface-card">
                    <summary className="min-h-11 cursor-pointer p-4 sm:p-5 text-sm sm:text-base font-medium text-text-primary">{faq.q}</summary>
                    <p className="text-body-sm px-4 pb-4 sm:px-5 sm:pb-5">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-brand-primary to-brand-primary-hover">
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Need Custom Templates?
            </h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Our team can help you create message examples tailored to your business needs
              and automate your WhatsApp communication workflow.
            </p>
            <Button size="lg" variant="secondary" asChild className="bg-white text-brand-700 hover:bg-white/90">
              <Link href="/contact">
                Get Expert Help
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
