import { PlatformConditions } from "@/components/shared/PlatformConditions";
import { compatibilityFAQs, compatibilityQualification, historyQualification } from "@/lib/platform-compatibility";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { FAQJsonLD, BreadcrumbJsonLD } from "@/components/seo/JsonLD";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generatePageMetadata, siteConfig } from "@/lib/seo/config";
import {
  Smartphone,
  Cloud,
  RefreshCw,
  Zap,
  Check,
  X,
  ArrowRight,
  Home,
  ShoppingCart,
  Briefcase,
} from "lucide-react";

const pagePath = "/whatsapp-coexistence";
const pageUrl = `${siteConfig.url}${pagePath}`;
const seoTitle = "WhatsApp Coexistence Guide 2026 | App + Cloud API on One Number";
const seoDescription =
  "Assess Business App and Cloud API coexistence for your account. Compare standard and hybrid workflows, eligibility, migration, device support and billing conditions.";

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: seoTitle,
    description: seoDescription,
    keywords: [
      "WhatsApp Coexistence",
      "WhatsApp Business App and Cloud API",
      "WhatsApp Coexistence setup",
      "WhatsApp hybrid architecture",
      "WhatsApp Cloud API migration",
    ],
    path: pagePath,
  }),
  alternates: { canonical: pageUrl },
};

const coexistenceFaqs = compatibilityFAQs.map(row => ({ q: row.question, a: row.answer }));

function CoexistenceAIJsonLD() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${pageUrl}#article`,
    headline: "WhatsApp Coexistence: The Complete Guide",
    url: pageUrl,
    description:
      "Technical guide to WhatsApp Coexistence, the hybrid architecture for compatible WhatsApp Business App and Cloud API workflows.",
    author: {
      "@id": `${siteConfig.url}/#organization`,
    },
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    about: [
      { "@type": "Thing", name: "WhatsApp Coexistence" },
      { "@type": "Thing", name: "WhatsApp Business App" },
      { "@type": "Thing", name: "WhatsApp Cloud API" },
      { "@type": "Thing", name: "Webhook Synchronization" },
    ],
    inLanguage: "en-IN",
    isAccessibleForFree: true,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function WhatsAppCoexistencePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <FAQJsonLD faqs={coexistenceFaqs.map((faq) => ({ question: faq.q, answer: faq.a }))} />
      <BreadcrumbJsonLD
        items={[
          { name: "Home", url: `${siteConfig.url}/` },
          { name: "WhatsApp Coexistence", url: pageUrl },
        ]}
      />
      <CoexistenceAIJsonLD />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-surface to-background py-16 sm:py-20 lg:py-24">
          <div className="absolute inset-0 gradient-brand-subtle opacity-30" aria-hidden="true" />
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto relative">
            <div className="text-center max-w-3xl mx-auto">
              <Badge variant="secondary" className="mb-4 px-3 py-1 text-sm font-medium">
                <RefreshCw className="h-3.5 w-3.5 mr-1.5 text-brand-primary" />
                Official Meta Feature
              </Badge>
              <h1 className="heading-1 mb-4">
                WhatsApp Coexistence:
                <span className="text-brand-primary"> The Complete Guide</span>
              </h1>
              <p className="text-lead mb-8 max-w-2xl mx-auto">
                {compatibilityQualification}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-text-secondary">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-brand-primary" aria-hidden="true" />
                  <span>Mobile App</span>
                </div>
                <span className="text-text-muted">+</span>
                <div className="flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-brand-primary" aria-hidden="true" />
                  <span>Cloud API</span>
                </div>
                <span className="text-text-muted">=</span>
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-brand-primary" aria-hidden="true" />
                  <span className="font-medium text-brand-primary">Coexistence</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Problem Section */}
        <section className="py-12 border-b border-border/40">
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
            <div className="max-w-3xl mx-auto">
              <h2 className="heading-2 mb-6 text-center">The Architectural Dilemma</h2>
              <p className="text-body text-center mb-8">
                Before Coexistence, businesses faced an impossible choice between scalability and personalization.
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-error-border bg-error-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-error">
                      <Smartphone className="h-5 w-5" aria-hidden="true" />
                      WhatsApp Business App Only
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {[
                        "Intuitive mobile interface",
                        "Voice & video calls supported",
                        "Status updates & catalogs",
                        "NO multi-agent support",
                        "NO automation or chatbots",
                        "NO CRM integration",
                      ].map((item, i) => (
                        <li key={item} className="flex items-start gap-2">
                          {i < 3 ? (
                            <Check className="h-4 w-4 text-success shrink-0 mt-0.5" aria-hidden="true" />
                          ) : (
                            <X className="h-4 w-4 text-error shrink-0 mt-0.5" aria-hidden="true" />
                          )}
                          <span className={i >= 3 ? "text-error font-medium" : "text-text-secondary"}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-error-border bg-error-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-error">
                      <Cloud className="h-5 w-5" aria-hidden="true" />
                      Cloud API Only
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {[
                        "Enterprise scalability",
                        "Multi-agent team inboxes",
                        "CRM & automation support",
                        "Check calling API eligibility",
                        "Choose your API interface",
                        "Agree migration and history scope",
                      ].map((item, i) => (
                        <li key={item} className="flex items-start gap-2">
                          {i < 3 ? (
                            <Check className="h-4 w-4 text-success shrink-0 mt-0.5" aria-hidden="true" />
                          ) : (
                            <X className="h-4 w-4 text-error shrink-0 mt-0.5" aria-hidden="true" />
                          )}
                          <span className={i >= 3 ? "text-error font-medium" : "text-text-secondary"}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* What is Coexistence */}
        <section className="py-12 bg-surface/50">
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <Badge className="bg-success mb-4 text-white">Solution</Badge>
                <h2 className="heading-2 mb-4">WhatsApp Coexistence Framework</h2>
                <p className="text-body">
                  A hybrid setup to assess for a compatible Business App number. App functions and API integrations must each be checked for your account and rollout.
                </p>
              </div>

              <Card className="border-success-border bg-success-soft">
                <CardContent className="pt-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-text-primary flex items-center gap-2">
                        <Smartphone className="h-5 w-5 text-brand-primary" aria-hidden="true" />
                        Mobile App Capabilities
                      </h3>
                      <ul className="space-y-2 text-sm text-text-secondary">
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success" aria-hidden="true" /> Voice & video calls</li>
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success" aria-hidden="true" /> Voice notes & media</li>
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success" aria-hidden="true" /> Status updates</li>
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success" aria-hidden="true" /> On-the-go responses</li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-semibold text-text-primary flex items-center gap-2">
                        <Cloud className="h-5 w-5 text-brand-primary" aria-hidden="true" />
                        API Capabilities
                      </h3>
                      <ul className="space-y-2 text-sm text-text-secondary">
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success" aria-hidden="true" /> Automated chatbots</li>
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success" aria-hidden="true" /> CRM integration</li>
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success" aria-hidden="true" /> Broadcast campaigns</li>
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success" aria-hidden="true" /> Multi-agent routing</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto w-full"><PlatformConditions id="coexistence-conditions" examples /></div>

        {/* Benefits Section */}
        <section className="py-12 bg-surface/50">
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
            <h2 className="heading-2 mb-8 text-center">Strategic Benefits for Microbusinesses</h2>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                { icon: RefreshCw, title: "Hybrid Engagement", desc: "Automate lead qualification with chatbots, then seamlessly handoff to human agents for voice calls and personalized follow-ups." },
                { icon: RefreshCw, title: "Cost Optimization", desc: "Separate manual app traffic from API traffic and confirm effective rates, eligible categories and account conditions before budgeting." },
                { icon: RefreshCw, title: "Lower CAC", desc: "Confirm the effective entry-window and category conditions for ad-driven follow-ups; no universal zero-price or acquisition saving is established." },
              ].map((item) => (
                <Card key={item.title}>
                  <CardHeader>
                    <div className="p-3 rounded-full bg-brand-primary/10 w-fit mb-3">
                      <item.icon className="h-6 w-6 text-brand-primary" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-text-secondary">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Blueprints */}
        <section className="py-12">
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
            <h2 className="heading-2 mb-8 text-center">Industry Use Cases</h2><p className="text-body text-center mb-6">Illustrative workflows to discuss after account eligibility and feature support are confirmed. These examples do not establish that every integration is shipped for your account.</p>

            <Tabs defaultValue="realestate" className="w-full">
              <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 mb-8">
                <TabsTrigger value="realestate" className="flex items-center gap-2">
                  <Home className="h-4 w-4" aria-hidden="true" />
                  Real Estate
                </TabsTrigger>
                <TabsTrigger value="retail" className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                  Retail
                </TabsTrigger>
                <TabsTrigger value="consulting" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" aria-hidden="true" />
                  Consulting
                </TabsTrigger>
              </TabsList>

              <TabsContent value="realestate">
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                          <Zap className="h-5 w-5 text-brand-primary" aria-hidden="true" />
                          Automated Layer (API)
                        </h3>
                        <ul className="space-y-2 text-sm text-text-secondary">
                          <li>• Capture leads from Facebook/Instagram ads</li>
                          <li>• Send property brochures automatically</li>
                          <li>• Collect budget & location preferences</li>
                          <li>• Schedule site visits in CRM calendar</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                          <Smartphone className="h-5 w-5 text-brand-primary" aria-hidden="true" />
                          Human Layer (Mobile)
                        </h3>
                        <ul className="space-y-2 text-sm text-text-secondary">
                          <li>• Personalized voice notes for inquiries</li>
                          <li>• Video calls for overseas buyers</li>
                          <li>• Share live property walkthroughs</li>
                          <li>• Negotiate deals with voice calls</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="retail">
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                          <Zap className="h-5 w-5 text-brand-primary" aria-hidden="true" />
                          Automated Layer (API)
                        </h3>
                        <ul className="space-y-2 text-sm text-text-secondary">
                          <li>• Order confirmations & shipping updates</li>
                          <li>• Abandoned cart recovery (45-60% recovery)</li>
                          <li>• Payment reminders & receipts</li>
                          <li>• Inventory alerts integration</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                          <Smartphone className="h-5 w-5 text-brand-primary" aria-hidden="true" />
                          Human Layer (Mobile)
                        </h3>
                        <ul className="space-y-2 text-sm text-text-secondary">
                          <li>• Handle damaged product complaints</li>
                          <li>• Send product photos on request</li>
                          <li>• Process refunds & exchanges</li>
                          <li>• Build customer relationships</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="consulting">
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                          <Zap className="h-5 w-5 text-brand-primary" aria-hidden="true" />
                          Automated Layer (API)
                        </h3>
                        <ul className="space-y-2 text-sm text-text-secondary">
                          <li>• Send intake forms & documents</li>
                          <li>• Appointment scheduling</li>
                          <li>• Payment link delivery</li>
                          <li>• Reminder sequences</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                          <Smartphone className="h-5 w-5 text-brand-primary" aria-hidden="true" />
                          Human Layer (Mobile)
                        </h3>
                        <ul className="space-y-2 text-sm text-text-secondary">
                          <li>• Detailed legal/medical advice</li>
                          <li>• Complex tax consultations</li>
                          <li>• Secure document discussion</li>
                          <li>• Post-consultation follow-ups</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="py-12 bg-surface/50"><div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-4"><h2 className="heading-2">Implementation requirements and regional availability</h2><p className="text-body">Check the onboarding flow for the exact number and country, supported app version, provider access and business permissions. Country lists and fixed warm-up or inactivity periods are not confirmed here.</p><p className="text-body">{historyQualification}</p><p className="text-body">Treat linked devices, calls, groups, badges and marketing integrations as separate eligibility checks. Monitor connection state before scheduling automations.</p></div></section>

        {/* SEO Benefits */}
        <section className="py-12 bg-surface/50">
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
            <div className="max-w-3xl mx-auto">
              <h2 className="heading-2 mb-4 text-center">SEO & Local Discovery Benefits</h2>
              <p className="text-body text-center mb-8">
                Coexistence creates a zero-friction conversion pathway that search algorithms favor
              </p>

              <div className="grid gap-4 sm:grid-cols-3 mb-8">
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <p className="text-3xl font-bold text-brand-primary">46%</p>
                    <p className="text-sm text-text-secondary">of searches have local intent</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <p className="text-3xl font-bold text-brand-primary">76%</p>
                    <p className="text-sm text-text-secondary">visit within 24 hours</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <p className="text-3xl font-bold text-brand-primary">70%</p>
                    <p className="text-sm text-text-secondary">searches are 3+ words</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-text-primary mb-3">How It Works</h3>
                  <ol className="space-y-3 text-sm text-text-secondary">
                    <li className="flex gap-3">
                      <span className="flex items-center justify-center h-6 w-6 rounded-full bg-brand-600 text-white text-xs font-medium shrink-0">1</span>
                      <span>Customer searches locally and clicks WhatsApp CTA on Google Business Profile</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex items-center justify-center h-6 w-6 rounded-full bg-brand-600 text-white text-xs font-medium shrink-0">2</span>
                      <span>API bot responds instantly, satisfying immediate engagement metrics</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex items-center justify-center h-6 w-6 rounded-full bg-brand-600 text-white text-xs font-medium shrink-0">3</span>
                      <span>Business owner receives context on mobile and can answer specific local queries</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex items-center justify-center h-6 w-6 rounded-full bg-brand-600 text-white text-xs font-medium shrink-0">4</span>
                      <span>Low bounce rates + high conversions signal quality to search algorithms</span>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12">
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
            <div className="max-w-3xl mx-auto">
              <h2 className="heading-2 mb-8 text-center">Frequently Asked Questions</h2>
              <div className="space-y-3">{coexistenceFaqs.map(faq => <details key={faq.q} className="rounded-xl border border-text-muted"><summary className="p-4 min-h-11 cursor-pointer font-medium">{faq.q}</summary><p className="px-4 pb-4 text-body-sm">{faq.a}</p></details>)}</div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-brand-primary to-brand-primary-hover">
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto text-center">
            <h2 className="heading-2 !text-white mb-4">Ready to Implement Coexistence?</h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Our team can help you set up the hybrid architecture that preserves human connection
              while enabling enterprise automation.
            </p>
            <Button size="lg" variant="secondary" asChild className="bg-white text-brand-700 hover:bg-white/90">
              <Link href="/contact">
                Get Started
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
