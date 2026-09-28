import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { FAQJsonLD, BreadcrumbJsonLD } from "@/components/seo/JsonLD";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TemplateCard, type Template } from "./TemplateCard";
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

const pagePath = "/whatsapp-templates";
const pageUrl = `${siteConfig.url}${pagePath}`;
const seoTitle = "WhatsApp Business Message Template Library | Whats91";
const seoDescription =
  "Pre-approved WhatsApp message templates for marketing, utility, and authentication. Ready-to-deploy examples with Meta-compliant formatting and structure guidelines.";

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

const marketingTemplates: Template[] = [
  {
    id: "m1",
    name: "Welcome New Customer",
    category: "marketing",
    industry: "E-commerce",
    header: { type: "image", content: "Welcome banner image" },
    body: "Hi {{1}}, welcome to {{2}}! Use code WELCOME{{3}} for 15% off your first order!",
    footer: "Reply STOP to unsubscribe",
    buttons: [{ type: "url", text: "Shop Now", value: "https://example.com/shop" }],
    variables: ["Customer Name", "Brand Name", "Discount Code"],
    useCase: "Customer onboarding with first-purchase incentive",
  },
  {
    id: "m2",
    name: "Abandoned Cart Recovery",
    category: "marketing",
    industry: "E-commerce",
    header: { type: "image", content: "Product image" },
    body: "Hi {{1}}, you left {{2}} in your cart! Complete your purchase and get free shipping on orders over {{3}}.",
    footer: "Reply STOP to unsubscribe",
    buttons: [
      { type: "url", text: "Complete Purchase", value: "https://example.com/cart" },
      { type: "quick_reply", text: "Remind Later" },
    ],
    variables: ["Customer Name", "Product Name", "Threshold Amount"],
    useCase: "Recover lost sales from abandoned shopping carts",
  },
  {
    id: "m3",
    name: "Flash Sale Alert",
    category: "marketing",
    industry: "Retail",
    header: { type: "image", content: "Sale banner" },
    body: "FLASH SALE! {{1}}, get {{2}}% off everything for the next {{3}} hours only! Use code: FLASH{{4}}",
    footer: "Terms apply. Reply STOP to opt out.",
    buttons: [{ type: "url", text: "Shop Sale", value: "https://example.com/sale" }],
    variables: ["Customer Name", "Discount %", "Hours Remaining", "Unique Code"],
    useCase: "Time-sensitive promotional campaigns",
  },
  {
    id: "m4",
    name: "New Product Launch",
    category: "marketing",
    industry: "E-commerce",
    header: { type: "video", content: "Product demo video" },
    body: "{{1}}, exciting news! Our new {{2}} is finally here. Be among the first to experience {{3}}. Pre-order now!",
    footer: "Reply STOP to unsubscribe",
    buttons: [
      { type: "url", text: "Learn More", value: "https://example.com/product" },
      { type: "url", text: "Pre-Order", value: "https://example.com/preorder" },
    ],
    variables: ["Customer Name", "Product Name", "Key Feature"],
    useCase: "Product launch announcements",
  },
  {
    id: "m5",
    name: "Seasonal Greeting",
    category: "marketing",
    industry: "All",
    header: { type: "image", content: "Festive image" },
    body: "Happy {{1}} from all of us at {{2}}! As a thank you, enjoy {{3}}% off your next purchase.",
    footer: "Reply STOP to unsubscribe",
    buttons: [{ type: "url", text: "Shop Now", value: "https://example.com/shop" }],
    variables: ["Occasion", "Brand Name", "Discount %"],
    useCase: "Festival and holiday campaigns",
  },
  {
    id: "m6",
    name: "Loyalty Reward",
    category: "marketing",
    industry: "Retail",
    header: { type: "image", content: "Rewards banner" },
    body: "{{1}}, you've earned it! You've collected {{2}} loyalty points. Redeem them for exclusive rewards!",
    footer: "Points expire in 30 days. Reply STOP to opt out.",
    buttons: [
      { type: "url", text: "View Rewards", value: "https://example.com/rewards" },
      { type: "quick_reply", text: "Save Points" },
    ],
    variables: ["Customer Name", "Points Balance"],
    useCase: "Customer retention and loyalty programs",
  },
  {
    id: "m7",
    name: "Re-engagement",
    category: "marketing",
    industry: "All",
    body: "Hi {{1}}, we miss you! It's been a while since your last visit. Here's an exclusive {{2}}% discount. Code: COMEBACK{{3}}",
    footer: "Valid for 7 days. Reply STOP to unsubscribe.",
    buttons: [{ type: "url", text: "Shop Now", value: "https://example.com/shop" }],
    variables: ["Customer Name", "Discount %", "Unique Code"],
    useCase: "Win-back campaigns for inactive customers",
  },
  {
    id: "m8",
    name: "Travel Deal",
    category: "marketing",
    industry: "Travel",
    header: { type: "image", content: "Destination image" },
    body: "{{1}}, escape to {{2}}! Book now and save {{3}}% on your dream vacation. Limited seats from {{4}}.",
    footer: "Terms apply. Reply STOP to unsubscribe.",
    buttons: [
      { type: "url", text: "View Deal", value: "https://example.com/travel" },
      { type: "phone", text: "Call Expert", value: "+1234567890" },
    ],
    variables: ["Customer Name", "Destination", "Discount %", "Starting Price"],
    useCase: "Travel and hospitality promotions",
  },
];

const utilityTemplates: Template[] = [
  {
    id: "u1",
    name: "Order Confirmation",
    category: "utility",
    industry: "E-commerce",
    body: "Hi {{1}}, your order #{{2}} has been confirmed!\n\nItems: {{3}}\nTotal: {{4}}\nEstimated delivery: {{5}}",
    footer: "Thank you for shopping with us!",
    buttons: [{ type: "url", text: "Track Order", value: "https://example.com/track" }],
    variables: ["Customer Name", "Order ID", "Items", "Total Amount", "Delivery Date"],
    useCase: "Order confirmation notifications",
  },
  {
    id: "u2",
    name: "Shipping Update",
    category: "utility",
    industry: "E-commerce",
    body: "Hi {{1}}, good news! Your order #{{2}} has been shipped via {{3}}. Expected delivery: {{4}}.",
    footer: "Track your package for real-time updates.",
    buttons: [{ type: "url", text: "Track Package", value: "https://example.com/track" }],
    variables: ["Customer Name", "Order ID", "Carrier", "Delivery Date"],
    useCase: "Shipping and delivery notifications",
  },
  {
    id: "u3",
    name: "Delivery Confirmation",
    category: "utility",
    industry: "E-commerce",
    body: "Hi {{1}}, your order #{{2}} has been delivered! We hope you love your purchase.",
    footer: "Reply with any questions about your order.",
    buttons: [
      { type: "url", text: "Write Review", value: "https://example.com/review" },
      { type: "quick_reply", text: "Report Issue" },
    ],
    variables: ["Customer Name", "Order ID"],
    useCase: "Delivery completion notifications",
  },
  {
    id: "u4",
    name: "Appointment Reminder",
    category: "utility",
    industry: "Healthcare",
    body: "Hi {{1}}, reminder of your appointment with {{2}} on {{3}} at {{4}}. Location: {{5}}.",
    footer: "Please arrive 10 minutes early.",
    buttons: [
      { type: "quick_reply", text: "Confirm" },
      { type: "quick_reply", text: "Reschedule" },
      { type: "quick_reply", text: "Cancel" },
    ],
    variables: ["Patient Name", "Doctor/Provider", "Date", "Time", "Location"],
    useCase: "Appointment reminders",
  },
  {
    id: "u5",
    name: "Payment Receipt",
    category: "utility",
    industry: "Finance",
    body: "Hi {{1}}, payment of {{2}} received for invoice #{{3}}. Transaction ID: {{4}}. Date: {{5}}.",
    footer: "Thank you for your payment.",
    buttons: [{ type: "url", text: "Download Receipt", value: "https://example.com/receipt" }],
    variables: ["Customer Name", "Amount", "Invoice Number", "Transaction ID", "Date"],
    useCase: "Payment confirmations",
  },
  {
    id: "u6",
    name: "Bill Reminder",
    category: "utility",
    industry: "Utilities",
    body: "Hi {{1}}, your {{2}} bill of {{3}} is due on {{4}}. Account: {{5}}.",
    footer: "Avoid late fees by paying on time.",
    buttons: [
      { type: "url", text: "Pay Now", value: "https://example.com/pay" },
      { type: "quick_reply", text: "Remind Later" },
    ],
    variables: ["Customer Name", "Bill Type", "Amount", "Due Date", "Account Number"],
    useCase: "Bill payment reminders",
  },
  {
    id: "u7",
    name: "Account Update",
    category: "utility",
    industry: "All",
    body: "Hi {{1}}, your account settings have been updated. {{2}} was changed on {{3}}.",
    footer: "If you didn't make this change, contact us immediately.",
    buttons: [{ type: "url", text: "Review Activity", value: "https://example.com/security" }],
    variables: ["Customer Name", "What Changed", "Date/Time"],
    useCase: "Account security notifications",
  },
  {
    id: "u8",
    name: "Service Status",
    category: "utility",
    industry: "Services",
    body: "Hi {{1}}, your {{2}} service has been {{3}}. Reference: {{4}}. Next steps: {{5}}.",
    footer: "Questions? Reply to this message.",
    buttons: [{ type: "url", text: "View Details", value: "https://example.com/status" }],
    variables: ["Customer Name", "Service Type", "Status", "Reference ID", "Next Steps"],
    useCase: "Service status updates",
  },
];

const authenticationTemplates: Template[] = [
  {
    id: "a1",
    name: "OTP Verification (Copy Code)",
    category: "authentication",
    body: "{{1}} is your verification code. For your security, do not share this code.",
    buttons: [{ type: "copy_code", text: "Copy Code" }],
    variables: ["OTP Code"],
    useCase: "Standard OTP with copy button",
  },
  {
    id: "a2",
    name: "OTP with Expiry",
    category: "authentication",
    body: "{{1}} is your verification code. This code will expire in {{2}} minutes. For your security, do not share this code.",
    buttons: [{ type: "copy_code", text: "Copy Code" }],
    variables: ["OTP Code", "Expiry Minutes"],
    useCase: "OTP with expiration warning",
  },
  {
    id: "a3",
    name: "Login Verification",
    category: "authentication",
    body: "Your login verification code is {{1}}. If you didn't request this code, someone may be trying to access your account.",
    buttons: [{ type: "copy_code", text: "Copy Code" }],
    variables: ["OTP Code"],
    useCase: "Two-factor authentication for login",
  },
  {
    id: "a4",
    name: "Transaction Verification",
    category: "authentication",
    body: "{{1}} is your verification code to authorize transaction #{{2}}. For your security, do not share this code.",
    buttons: [{ type: "copy_code", text: "Copy Code" }],
    variables: ["OTP Code", "Transaction ID"],
    useCase: "High-value transaction authorization",
  },
];

const templateFaqs = [
  {
    q: "How long does template approval take?",
    a: "Meta typically reviews templates within 24-48 hours. Some templates may be approved instantly if they match pre-approved patterns.",
  },
  {
    q: "What is the difference between categories?",
    a: "Marketing templates contain promotional content and usually cost more. Utility templates are transactional alerts. Authentication templates are for OTPs and verification only.",
  },
  {
    q: "Why was my utility template marked as marketing?",
    a: "Meta's AI scans for promotional intent. Even phrases like 'Check out our new products' can trigger reclassification. Keep utility templates purely factual.",
  },
  {
    q: "Can I use emojis in templates?",
    a: "Yes, emojis are allowed in body text but not in headers or footers. Use them sparingly and appropriately for your brand voice.",
  },
  {
    q: "What happens if users block my templates?",
    a: "High block rates lower your quality rating. Templates with low quality are paused. Repeated issues can permanently disable templates.",
  },
  {
    q: "Can I edit an approved template?",
    a: "No, approved templates cannot be edited. You must create a new template and resubmit for approval.",
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
                Pre-approved message templates for marketing campaigns, transactional notifications,
                and authentication. Ready to deploy with Meta-compliant formatting.
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
                <p className="text-3xl font-bold text-brand-primary">20+</p>
                <p className="text-sm text-text-secondary">Templates</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-brand-primary">8+</p>
                <p className="text-sm text-text-secondary">Industries</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-brand-primary">100%</p>
                <p className="text-sm text-text-secondary">Meta Compliant</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-brand-primary">3</p>
                <p className="text-sm text-text-secondary">Categories</p>
              </div>
            </div>
          </div>
        </section>

        {/* Template Categories */}
        <section className="py-12">
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
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
                    Higher engagement rates with visual headers and clear CTAs.
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
                          <td>60 chars</td>
                          <td>Text, image, video, or document</td>
                        </tr>
                        <tr className="border-b border-border/40">
                          <td className="py-2 font-medium text-text-primary">Body</td>
                          <td><Badge variant="destructive">Required</Badge></td>
                          <td>1,024 chars</td>
                          <td>Supports variables like {"{{1}}, {{2}}"}</td>
                        </tr>
                        <tr className="border-b border-border/40">
                          <td className="py-2 font-medium text-text-primary">Footer</td>
                          <td><Badge variant="outline">Optional</Badge></td>
                          <td>60 chars</td>
                          <td>No formatting allowed</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium text-text-primary">Buttons</td>
                          <td><Badge variant="outline">Optional</Badge></td>
                          <td>20 chars each</td>
                          <td>Max 3 Quick Reply or 2 CTA</td>
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
                      "Use high-quality images (max 5MB) for media headers",
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
              <Accordion type="single" collapsible className="w-full">
                {templateFaqs.map((faq, i) => (
                  <AccordionItem key={faq.q} value={`item-${i}`}>
                    <AccordionTrigger className="text-left font-medium">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-text-secondary">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
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
              Our team can help you create Meta-compliant templates tailored to your business needs
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
