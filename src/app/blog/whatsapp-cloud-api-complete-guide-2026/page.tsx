"use client";

import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Clock,
  Calendar,
  Tag,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock4,
  Building2,
  ChevronRight,
  Copy,
  Check,
  Zap,
  Server,
  MessageCircle,
  Code,
  DollarSign,
  Settings,
  Send,
  Bot,
  Users,
  Shield,
  BarChart,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { getRelatedPosts, categoryColors } from "@/lib/blog/registry";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

function ShareSection({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async (platform?: string) => {
    const url = window.location.href;
    if (platform === "copy") {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, "_blank");
    } else if (platform === "linkedin") {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Button variant="outline" size="sm" onClick={() => handleShare("twitter")} className="h-8 px-3 text-xs">Twitter</Button>
      <Button variant="outline" size="sm" onClick={() => handleShare("linkedin")} className="h-8 px-3 text-xs">LinkedIn</Button>
      <Button variant="outline" size="sm" onClick={() => handleShare("copy")} className="h-8 px-3 text-xs gap-1.5">
        {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
        {copied ? "Copied!" : "Copy"}
      </Button>
    </div>
  );
}

function RelatedPosts({ currentSlug }: { currentSlug: string }) {
  const relatedPosts = getRelatedPosts(currentSlug, 2);
  if (relatedPosts.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 bg-surface/50">
      <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="h-5 w-5 text-brand-primary" />
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary">Continue Reading</h2>
          </div>
        </FadeIn>
        <div className="grid sm:grid-cols-2 gap-6">
          {relatedPosts.map((post, index) => (
            <FadeIn key={post.id} delay={index * 0.1}>
              <Link href={`/blog/${post.slug}`} className="block group">
                <Card className="h-full border-border/60 hover:border-brand-primary/30 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <Badge className={`${categoryColors[post.category] || "bg-gray-100 text-gray-700"} border text-xs mb-4`}>
                      {post.category}
                    </Badge>
                    <h3 className="font-semibold text-text-primary text-lg mb-2 group-hover:text-brand-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-text-secondary mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-text-muted">
                      <span>{post.readingTime} min read</span>
                      <span className="flex items-center gap-1 text-brand-primary font-medium group-hover:gap-2 transition-all">
                        Read more <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function WhatsAppCloudAPIGuidePage() {
  const postSlug = "whatsapp-cloud-api-complete-guide-2026";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-10 sm:py-14 lg:py-16 bg-gradient-to-b from-surface/80 to-background">
          <div className="absolute inset-0 gradient-brand-subtle pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <div className="relative px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <FadeIn>
              <nav className="flex items-center gap-2 text-sm text-text-secondary mb-6">
                <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4 text-text-muted" />
                <Link href="/blog" className="hover:text-brand-primary transition-colors">Blog</Link>
                <ChevronRight className="h-4 w-4 text-text-muted" />
                <span className="text-text-primary font-medium truncate max-w-[200px]">WhatsApp Cloud API Guide</span>
              </nav>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <Badge className="bg-green-100 text-green-700 border-green-200 border text-sm px-3 py-1">WhatsApp API</Badge>
                <Badge className="bg-gradient-to-r from-brand-primary to-brand-primary/80 text-white border-0 text-sm px-3 py-1">Featured</Badge>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-text-primary mb-5 leading-tight">
                WhatsApp Cloud API: Complete Guide for Enterprises in 2026
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-base sm:text-lg text-text-secondary mb-6 leading-relaxed max-w-3xl">
                Everything you need to know about implementing WhatsApp Cloud API for your business. From setup to scaling, learn how to leverage the official Meta platform for enterprise communication.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-wrap items-center gap-2">
                <Tag className="h-4 w-4 text-text-muted" />
                {["WhatsApp Cloud API", "Enterprise", "Best Practices", "India"].map((tag) => (
                  <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                    <Badge variant="outline" className="hover:bg-brand-primary/10 hover:border-brand-primary/30 hover:text-brand-primary transition-all cursor-pointer text-xs">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Key Info Cards */}
        <section className="py-6 sm:py-8">
          <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <FadeIn>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-white p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Published</p>
                    <p className="text-sm font-medium text-text-primary">Jan 15, 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-white p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                    <Clock4 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Reading time</p>
                    <p className="text-sm font-medium text-text-primary">12 minutes</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-white p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Category</p>
                    <p className="text-sm font-medium text-text-primary">WhatsApp API</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* What You'll Learn */}
        <section className="pb-8">
          <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <FadeIn>
              <div className="rounded-2xl border border-border/60 bg-surface/50 p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-brand-primary" />
                  What you'll learn
                </h3>
                <ul className="space-y-2.5">
                  {[
                    "WhatsApp Cloud API is Meta's official enterprise messaging platform",
                    "Free infrastructure—pay only for conversation-based pricing",
                    "Supports 500+ messages per second throughput",
                    "Implementation providers can add onboarding, integrations, and support",
                    "Ideal for marketing, support, and ERP integration",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-text-secondary">
                      <CheckCircle2 className="h-4 w-4 text-brand-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Content Sections */}
        <section className="pb-12">
          <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
            
            {/* Section 1: What is Cloud API */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  What is WhatsApp Cloud API?
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  WhatsApp Cloud API is Meta's official cloud-hosted version of the WhatsApp Business API. It provides the same powerful features as the on-premise version but eliminates the need for businesses to manage their own servers or pay for hosting through third-party providers.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  This has revolutionized how businesses communicate with customers at scale.
                </p>
              </div>
            </FadeIn>

            {/* Section 2: Key Benefits */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  Key Benefits at a Glance
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    { icon: DollarSign, title: "Free Infrastructure", desc: "No server costs or hosting fees" },
                    { icon: Zap, title: "Easy Setup", desc: "Hours to deploy, not weeks" },
                    { icon: Server, title: "Scalability", desc: "Handle 500+ messages/second" },
                    { icon: Shield, title: "Reliability", desc: "Cloud-hosted infrastructure with fewer local dependencies" },
                    { icon: Globe, title: "Latest Features", desc: "Automatic access to new capabilities" },
                    { icon: Users, title: "Multi-agent Support", desc: "Team inbox capabilities" },
                  ].map((item, i) => (
                    <div key={i} className="group rounded-xl border border-border/60 bg-white p-5 transition-all hover:border-brand-primary/30 hover:shadow-md">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary mb-3 transition-transform group-hover:scale-110">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <h4 className="font-semibold text-text-primary text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-text-secondary">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Section 3: Setup Steps */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  Getting Started: Step-by-Step Setup
                </h2>

                <div className="rounded-xl border border-border/60 bg-surface/50 p-5">
                  <h4 className="font-semibold text-text-primary mb-3">Prerequisites Checklist</h4>
                  <ul className="space-y-2">
                    {[
                      "A valid business with proper documentation",
                      "A phone number not registered on WhatsApp",
                      "Business verification completed",
                      "A Meta Business Manager account",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-sm text-text-secondary">
                        <input type="checkbox" className="h-4 w-4 rounded border-border text-brand-primary focus:ring-brand-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  {[
                    { step: 1, title: "Create Meta Business Account", desc: "Go to business.facebook.com, click Create Account, enter your business details, and complete verification." },
                    { step: 2, title: "Verify Your Business", desc: "Navigate to Business Settings → Business Info → Start Verification. Submit required documents (registration, tax ID, proof of address)." },
                    { step: 3, title: "Create WhatsApp Business Account", desc: "In Meta Business Manager, go to Accounts → WhatsApp Accounts → Add. Follow the setup wizard." },
                    { step: 4, title: "Configure Webhooks", desc: "Set up your server endpoint to receive incoming messages and status updates in real-time." },
                    { step: 5, title: "Send Your First Message", desc: "Use the Graph API to send a test message and verify your setup is working correctly." },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 rounded-xl border border-border/60 bg-white p-5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary text-white text-sm font-bold shadow-md shadow-brand-primary/20">
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-text-primary mb-1">{item.title}</h4>
                        <p className="text-sm text-text-secondary">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Section 4: Pricing */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  Pricing: Conversation-Based Model
                </h2>

                <div className="rounded-2xl border border-border/60 bg-white overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-surface/50">
                        <th className="p-4 text-left font-semibold text-text-primary">Conversation Type</th>
                        <th className="p-4 text-left font-semibold text-text-primary">Price (India)</th>
                        <th className="p-4 text-left font-semibold text-text-primary">Price (Global)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {[
                        ["Business-initiated", "₹0.90", "$0.014"],
                        ["User-initiated", "₹0.34", "$0.004"],
                        ["Authentication", "₹0.34", "$0.004"],
                      ].map(([type, india, global], i) => (
                        <tr key={i} className="bg-white">
                          <td className="p-4 text-sm font-medium text-text-primary">{type}</td>
                          <td className="p-4 text-sm text-text-secondary">{india}</td>
                          <td className="p-4 text-sm text-text-secondary">{global}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { title: "Business-initiated", desc: "You send the first message outside the 24-hour window" },
                    { title: "User-initiated", desc: "Customer messages you first (costs 62% less!)" },
                    { title: "Authentication", desc: "OTP/verification message templates" },
                  ].map((item, i) => (
                    <div key={i} className="rounded-xl border border-border/60 bg-white p-4">
                      <h4 className="font-semibold text-text-primary text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-text-secondary">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-brand-primary/20 bg-brand-primary/5 p-5">
                  <h4 className="font-semibold text-text-primary mb-3">Cost Optimization Tips</h4>
                  <ul className="space-y-2">
                    {[
                      "Encourage user-initiated conversations — They cost significantly less",
                      "Maximize the 24-hour window — Respond promptly to keep conversations active",
                      "Use templates wisely — Only send when necessary",
                      "Track conversation analytics — Identify cost patterns",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-sm text-text-secondary">
                        <CheckCircle2 className="h-4 w-4 text-brand-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>

            {/* Section 5: Features */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  Features and Capabilities
                </h2>

                <h3 className="text-xl font-semibold text-text-primary">Messaging Types</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { icon: MessageCircle, title: "Text Messages", desc: "Simple communication", example: "Order confirmations" },
                    { icon: Server, title: "Media Messages", desc: "Rich content sharing", example: "Product images, documents" },
                    { icon: Zap, title: "Interactive Messages", desc: "Engagement", example: "Buttons, lists, menus" },
                    { icon: Code, title: "Template Messages", desc: "Pre-approved formats", example: "OTP, delivery updates" },
                    { icon: Bot, title: "Flow Messages", desc: "Multi-step experiences", example: "Lead capture forms" },
                    { icon: Users, title: "Team Inbox", desc: "Multi-agent support", example: "Customer service routing" },
                  ].map((item, i) => (
                    <div key={i} className="group rounded-xl border border-border/60 bg-white p-5 transition-all hover:border-brand-primary/30 hover:shadow-md">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary transition-transform group-hover:scale-110">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <h4 className="font-semibold text-text-primary">{item.title}</h4>
                      </div>
                      <p className="text-sm text-text-secondary mb-2">{item.desc}</p>
                      <p className="text-xs text-text-muted">Example: {item.example}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Section 6: Implementation provider benefits */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  Why Choose an Implementation Provider?
                </h2>
                <p className="text-text-secondary">While Cloud API can be implemented directly, working with an implementation provider can simplify onboarding, integrations, support, and ongoing operations.</p>

                <div className="rounded-2xl border border-border/60 bg-white overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-surface/50">
                        <th className="p-4 text-left font-semibold text-text-primary">Feature</th>
                        <th className="p-4 text-left font-semibold text-text-primary">Direct Cloud API</th>
                        <th className="p-4 text-left font-semibold text-text-primary">With Partner</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {[
                        ["API Access", "✅ Full access", "✅ Full + Dashboard"],
                        ["Setup Time", "Days to weeks", "Hours"],
                        ["Chatbot Builder", "❌ Build yourself", "✅ Pre-built templates"],
                        ["Analytics", "❌ Basic", "✅ Advanced dashboards"],
                        ["Team Inbox", "❌ Build yourself", "✅ Ready to use"],
                        ["Support", "Meta support only", "Dedicated manager"],
                        ["ERP Integration", "❌ Build yourself", "✅ Ready connectors"],
                      ].map(([feature, direct, partner], i) => (
                        <tr key={i} className="bg-white">
                          <td className="p-4 text-sm font-medium text-text-primary">{feature}</td>
                          <td className="p-4 text-sm text-text-secondary">{direct}</td>
                          <td className="p-4 text-sm text-brand-primary font-medium">{partner}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-border/60 bg-white p-5">
                    <h4 className="font-semibold text-text-primary mb-3">Enhanced Features</h4>
                    <ul className="space-y-2">
                      {["Pre-built chatbot frameworks", "ERP integration templates", "Analytics dashboards", "Template management tools"].map((item, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-sm text-text-secondary">
                          <CheckCircle2 className="h-4 w-4 text-brand-primary shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-brand-primary/20 bg-brand-primary/5 p-5">
                    <h4 className="font-semibold text-text-primary mb-3">Get Started</h4>
                    <p className="text-sm text-text-secondary mb-4">Partner with Whats91 for enhanced features and expert support.</p>
                    <Button className="w-full bg-brand-primary hover:bg-brand-primary-hover">
                      Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Section 7: Best Practices */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  Best Practices for 2026
                </h2>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-xl border border-border/60 bg-white p-5">
                    <h4 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                      <Settings className="h-5 w-5 text-brand-primary" />
                      Template Strategy
                    </h4>
                    <ul className="space-y-2">
                      {["Create templates for common use cases", "A/B test template variations", "Use variables for personalization", "Keep templates updated"].map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-text-secondary">
                          <CheckCircle2 className="h-4 w-4 text-brand-primary shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-white p-5">
                    <h4 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                      <BarChart className="h-5 w-5 text-brand-primary" />
                      Key Metrics
                    </h4>
                    <ul className="space-y-2">
                      {[
                        { metric: "Delivery Rate", target: ">98%" },
                        { metric: "Read Rate", target: ">70%" },
                        { metric: "Response Rate", target: ">30%" },
                        { metric: "Opt-out Rate", target: "<0.5%" },
                      ].map((item, i) => (
                        <li key={i} className="flex items-center justify-between text-sm">
                          <span className="text-text-secondary">{item.metric}</span>
                          <Badge variant="outline" className="text-brand-primary">{item.target}</Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Section 8: Compliance */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  Compliance Requirements
                </h2>

                <div className="rounded-xl border border-border/60 bg-surface/50 p-5">
                  <h4 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-brand-primary" />
                    Mandatory Requirements
                  </h4>
                  <ul className="space-y-2">
                    {[
                      "Always obtain opt-in before messaging",
                      "Honor opt-out requests immediately",
                      "Maintain data privacy standards",
                      "Follow Meta's commerce policies",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-sm text-text-secondary">
                        <input type="checkbox" className="h-4 w-4 rounded border-border text-brand-primary focus:ring-brand-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>

            {/* Key Takeaways */}
            <FadeIn>
              <div className="rounded-2xl bg-gradient-to-br from-brand-primary to-brand-primary/80 p-6 sm:p-8 text-white">
                <h2 className="text-xl sm:text-2xl font-bold mb-6">Key Takeaways</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    "WhatsApp Cloud API is free — You only pay for conversations",
                    "Setup is faster than ever — Hours instead of weeks",
                    "Scale without limits — Handle 500+ messages per second",
                    "Partners add value — Enhanced features and expert support",
                    "Compliance is critical — Follow Meta's policies carefully",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-white/80 shrink-0 mt-0.5" />
                      <span className="text-sm text-white/90">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

          </div>
        </section>

        {/* Share & Author Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        <section className="py-10 sm:py-12">
          <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <FadeIn>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 p-6 rounded-2xl bg-surface/50 border border-border/50">
                <div>
                  <h3 className="font-semibold text-text-primary text-lg mb-1">Found this helpful?</h3>
                  <p className="text-sm text-text-muted">Share it with your network</p>
                </div>
                <ShareSection title="WhatsApp Cloud API: Complete Guide for Enterprises in 2026" />
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Card className="border-border/60 bg-white overflow-hidden">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row items-start gap-6">
                    <img
                      src="https://ui-avatars.com/api/?name=Devendar+Singh+Gohil&background=448C74&color=fff&size=128"
                      alt="Devendar Singh Gohil"
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-text-muted mb-1">Written by</p>
                      <h4 className="font-semibold text-text-primary text-lg">Devendar Singh Gohil</h4>
                      <p className="text-sm text-brand-primary mb-3">Developer</p>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        Lead Developer at Whats91 specializing in WhatsApp Cloud API integration, enterprise software development, and ERP solutions including Busy Accounting integrations.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </section>

        <RelatedPosts currentSlug={postSlug} />
      </main>

      <Footer />
    </div>
  );
}
