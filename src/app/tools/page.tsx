import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/lib/seo/JsonLd";
import { generateBreadcrumbSchema, generatePageMetadata, siteConfig } from "@/lib/seo/config";
import {
  MessageCircle,
  QrCode,
  ArrowRight,
  Sparkles,
  Users,
  Zap,
  DollarSign,
  TrendingUp
} from "lucide-react";

const pagePath = "/tools";
const pageUrl = `${siteConfig.url}${pagePath}`;

export const metadata: Metadata = generatePageMetadata({
  title: "Free WhatsApp Business Tools | Link Generator, Cost Calculator | Whats91",
  description: "Free tools for WhatsApp Business users. Generate wa.me links, calculate API costs, estimate lead qualification ROI, and create QR codes. No signup required.",
  keywords: ["WhatsApp link generator", "WhatsApp API cost calculator", "lead qualification ROI", "QR code generator", "WhatsApp business tools", "free WhatsApp tools"],
  path: pagePath,
});

const structuredData = [
  generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Free Tools", url: pagePath },
  ]),
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#collection`,
    url: pageUrl,
    name: "Whats91 Free WhatsApp Business Tools",
    description: "Free tools for WhatsApp Business users: link generator, cost calculator, ROI calculator, and QR code generator.",
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  },
];

const tools = [
  {
    title: "WhatsApp API Cost Calculator",
    description: "Calculate your WhatsApp Business API costs accurately. Estimate spending by message type, volume, and country with official Meta pricing.",
    href: "/tools/whatsapp-api-cost-calculator",
    icon: DollarSign,
    category: "WhatsApp API",
    featured: true,
  },
  {
    title: "Lead Qualification ROI Calculator",
    description: "Compare AI-powered WhatsApp automation vs human agents vs self-built solutions. Calculate monthly savings, ROI, and cost per qualified lead.",
    href: "/tools/lead-qualification-roi-calculator",
    icon: TrendingUp,
    category: "Business ROI",
    featured: true,
  },
  {
    title: "WhatsApp Link Generator",
    description: "Create clickable WhatsApp links (wa.me) with pre-filled messages. Perfect for business cards, email signatures, websites, and marketing campaigns.",
    href: "/tools/whatsapp-link-generator",
    icon: MessageCircle,
    category: "WhatsApp Tools",
    featured: true,
  },
  {
    title: "QR Code Generator",
    description: "Generate high-resolution QR codes for WhatsApp links, URLs, vCards, and more. Download as PNG or SVG without watermarks.",
    href: "/tools/qr-code-generator",
    icon: QrCode,
    category: "Marketing",
    featured: true,
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd data={structuredData} />
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-surface to-background py-16 sm:py-20 lg:py-24">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto relative">
            <div className="text-center max-w-3xl mx-auto">
              <Badge variant="secondary" className="mb-4 px-3 py-1 text-sm font-medium">
                <Sparkles className="h-3.5 w-3.5 mr-1.5 text-brand-primary" />
                100% Free Tools
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight mb-4">
                WhatsApp Business Tools
                <span className="text-brand-primary"> for Growth</span>
              </h1>
              <p className="text-lg sm:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
                Free tools to maximize your WhatsApp API ROI. Calculate costs, generate links, and estimate automation savings—no signup required.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-text-secondary">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-brand-primary" />
                  <span>Instant Results</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-brand-primary" />
                  <span>Used by 10,000+ businesses</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-brand-primary" />
                  <span>No Registration</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
                Tools for WhatsApp Business
              </h2>
              <p className="text-text-secondary max-w-xl mx-auto">
                Everything you need to plan, launch, and optimize your WhatsApp API strategy.
              </p>
            </div>

            {/* Tools Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {tools.map((tool) => (
                <Link key={tool.href} href={tool.href} className="group">
                  <Card className={`h-full transition-all duration-300 hover:shadow-lg hover:shadow-brand-primary/5 hover:-translate-y-1 ${
                    tool.featured ? 'ring-1 ring-brand-primary/20 bg-gradient-to-br from-background to-brand-primary/5' : ''
                  }`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className={`p-2.5 rounded-lg ${tool.featured ? 'bg-brand-primary/10' : 'bg-surface'}`}>
                          <tool.icon className={`h-5 w-5 ${tool.featured ? 'text-brand-primary' : 'text-text-secondary'}`} />
                        </div>
                        {tool.featured && (
                          <Badge variant="default" className="bg-brand-primary text-white text-[10px]">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg font-semibold text-text-primary mt-3 group-hover:text-brand-primary transition-colors">
                        {tool.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-text-secondary line-clamp-2">
                        {tool.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-[10px] text-text-muted">
                          {tool.category}
                        </Badge>
                        <ArrowRight className="h-4 w-4 text-text-muted group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Free Tools Section */}
        <section className="py-12 sm:py-16 bg-surface/50">
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
                Why These Tools Are Free?
              </h2>
              <p className="text-text-secondary">
                We believe in providing value first. These tools help businesses plan their WhatsApp API strategy 
                without any cost or commitment.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto p-3 rounded-full bg-brand-primary/10 w-fit mb-3">
                    <Zap className="h-6 w-6 text-brand-primary" />
                  </div>
                  <CardTitle className="text-lg">Instant Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-text-secondary">
                    All tools process data instantly in your browser. No waiting, no server delays.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto p-3 rounded-full bg-brand-primary/10 w-fit mb-3">
                    <Sparkles className="h-6 w-6 text-brand-primary" />
                  </div>
                  <CardTitle className="text-lg">Privacy First</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-text-secondary">
                    Your data never leaves your browser. We don&apos;t store or track any information.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto p-3 rounded-full bg-brand-primary/10 w-fit mb-3">
                    <Users className="h-6 w-6 text-brand-primary" />
                  </div>
                  <CardTitle className="text-lg">No Limits</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-text-secondary">
                    Use our tools as many times as you need. No daily limits, no watermarks, no signup walls.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-14 sm:py-16 md:py-20">
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-brand-primary via-brand-primary to-brand-accent p-7 sm:p-8 md:p-12 lg:p-16 shadow-xl">
              
              {/* Background Decorations */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-1/2 -right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-1/2 -left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-white/10 rounded-full blur-3xl" />
                {/* Subtle grid pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }} />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-10">
                  
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-4 py-2 text-xs sm:text-sm font-medium text-white mb-5 sm:mb-6 border border-white/10">
                    <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    WhatsApp Cloud API Tools
                  </div>

                  {/* Headline */}
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
                    Ready to Launch WhatsApp API?
                  </h2>

                  {/* Description */}
                  <p className="text-base sm:text-lg text-white/90 mb-7 sm:mb-8 max-w-xl mx-auto leading-relaxed">
                    Get started with WhatsApp Cloud API, automation support, ERP integrations, and clearly separated pricing components.
                  </p>

                  {/* CTA Button */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      size="lg" 
                      className="h-11 sm:h-12 px-7 sm:px-8 text-sm sm:text-base font-semibold bg-white text-brand-primary hover:bg-white/95 rounded-xl shadow-lg group transition-all duration-300 hover:shadow-xl"
                      asChild
                    >
                      <Link href="/contact">
                        Contact Sales
                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </Link>
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="h-11 sm:h-12 px-7 sm:px-8 text-sm sm:text-base font-semibold bg-transparent text-white border-white/30 hover:bg-white/10 hover:border-white/50 rounded-xl group transition-all duration-300"
                      asChild
                    >
                      <Link href="/pricing">
                        View Pricing
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Feature Highlights */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-8 sm:pt-10 border-t border-white/15">
                  {[
                    { icon: DollarSign, label: "Clear Pricing", desc: "Written terms" },
                    { icon: Zap, label: "Full Automation", desc: "24/7 bots" },
                    { icon: Sparkles, label: "ERP Integrations", desc: "Busy, Tally" },
                    { icon: Users, label: "500+ Clients", desc: "Across India" },
                  ].map((feature, index) => (
                    <div key={index} className="text-center">
                      <div className="inline-flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-white/10 backdrop-blur-sm mb-2 sm:mb-3 border border-white/10">
                        <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <p className="text-sm sm:text-base font-semibold text-white">{feature.label}</p>
                      <p className="text-xs sm:text-sm text-white/70">{feature.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Trust Badge */}
                <p className="mt-8 sm:mt-10 text-center text-xs sm:text-sm text-white/70">
                  Trusted by <span className="font-semibold text-white/90">500+ enterprises</span> across India for WhatsApp Business API
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
