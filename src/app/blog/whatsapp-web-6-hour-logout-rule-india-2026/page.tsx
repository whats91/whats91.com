"use client";

import { Metadata } from "next";
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
  AlertTriangle,
  Shield,
  Smartphone,
  Monitor,
  RefreshCw,
  CalendarCheck,
  Building2,
  ChevronRight,
  Share2,
  Copy,
  Check,
  Zap,
  Globe,
  Server,
  MessageCircle,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { getRelatedPosts, categoryColors } from "@/lib/blog/registry";

// Animation component
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

// Share buttons
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

// Related posts
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

export default function WhatsAppWebLogoutRulePage() {
  const postSlug = "whatsapp-web-6-hour-logout-rule-india-2026";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-10 sm:py-14 lg:py-16 bg-gradient-to-b from-surface/80 to-background">
          <div className="absolute inset-0 gradient-brand-subtle pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-primary/3 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          
          <div className="relative px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <FadeIn>
              <nav className="flex items-center gap-2 text-sm text-text-secondary mb-6">
                <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4 text-text-muted" />
                <Link href="/blog" className="hover:text-brand-primary transition-colors">Blog</Link>
                <ChevronRight className="h-4 w-4 text-text-muted" />
                <span className="text-text-primary font-medium truncate max-w-[200px]">WhatsApp Web 6-Hour Logout Rule</span>
              </nav>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <Badge className="bg-orange-100 text-orange-700 border-orange-200 border text-sm px-3 py-1">Industry Insights</Badge>
                <Badge className="bg-gradient-to-r from-brand-primary to-brand-primary/80 text-white border-0 text-sm px-3 py-1">Featured</Badge>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-text-primary mb-5 leading-tight">
                WhatsApp Web 6-Hour Logout Rule in India: Complete Guide for Businesses
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-base sm:text-lg text-text-secondary mb-6 leading-relaxed max-w-3xl">
                India's new DoT directive mandates automatic logout for WhatsApp Web and desktop sessions every 6 hours. Here's what your business needs to know and how to adapt.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-wrap items-center gap-2">
                <Tag className="h-4 w-4 text-text-muted" />
                {["WhatsApp Web", "Compliance", "Security", "India", "Best Practices"].map((tag) => (
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
                    <p className="text-sm font-medium text-text-primary">Feb 26, 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-white p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                    <Clock4 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Reading time</p>
                    <p className="text-sm font-medium text-text-primary">10 minutes</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-white p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Category</p>
                    <p className="text-sm font-medium text-text-primary">Industry Insights</p>
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
                    "WhatsApp Web sessions will automatically logout every 6 hours",
                    "Rule applies to all web/PC clients including Telegram and Signal",
                    "Mobile app usage remains unaffected by this regulation",
                    "No exceptions have been granted for businesses",
                    "Cloud API integration bypasses session limitations entirely",
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
            
            {/* Section 1: What is the Rule */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  What is the 6-Hour Logout Rule?
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  India's Department of Telecommunications (DoT) has introduced new regulations under the <strong className="text-text-primary">Telecom Cyber Security Rules</strong> that fundamentally change how WhatsApp Web and desktop applications function in the country.
                </p>
                <div className="rounded-xl border border-brand-primary/20 bg-brand-primary/5 p-6">
                  <p className="text-text-primary font-medium mb-2">The core requirement:</p>
                  <p className="text-text-secondary">Any WhatsApp Web or desktop session must be forcibly logged out no later than <strong className="text-brand-primary">6 hours after it was linked</strong>.</p>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  This rule comes alongside SIM-binding requirements that tie messaging accounts to the original active SIM card used during registration.
                </p>
              </div>
            </FadeIn>

            {/* Section 2: Key Facts */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  Key Facts at a Glance
                </h2>
                <div className="overflow-hidden rounded-xl border border-border/60">
                  <table className="w-full">
                    <tbody className="divide-y divide-border/60">
                      {[
                        ["Session Limit", "Maximum 6 hours from QR code scan"],
                        ["Type", "Hard limit (not inactivity timeout)"],
                        ["Applies To", "WhatsApp Web, Desktop, and similar platforms"],
                        ["Mobile App", "NOT affected"],
                        ["Exceptions", "None granted"],
                        ["Deadline", "February 27, 2026"],
                      ].map(([label, value], i) => (
                        <tr key={i} className="bg-white">
                          <td className="p-4 font-medium text-text-primary bg-surface/50">{label}</td>
                          <td className="p-4 text-text-secondary">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </FadeIn>

            {/* Section 3: Affected Platforms */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  Which Platforms Are Affected?
                </h2>
                
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Affected */}
                  <div className="rounded-2xl border border-border/60 bg-white p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
                        <Monitor className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-semibold text-text-primary">Affected by the Rule</h3>
                    </div>
                    <ul className="space-y-2.5">
                      {[
                        "WhatsApp Web in all browsers",
                        "WhatsApp Desktop (Windows & macOS)",
                        "Telegram Web/Desktop clients",
                        "Signal Desktop application",
                        "Other messaging web/PC clients",
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-sm text-text-secondary">
                          <div className="h-2 w-2 rounded-full bg-red-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Not Affected */}
                  <div className="rounded-2xl border border-brand-primary/20 bg-brand-primary/5 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
                        <Smartphone className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-semibold text-text-primary">NOT Affected</h3>
                    </div>
                    <ul className="space-y-2.5">
                      {[
                        "WhatsApp mobile app on your registered phone",
                        "WhatsApp Business mobile app on primary device",
                        "WhatsApp Cloud API integrations (server-side)",
                        "Normal mobile messaging patterns",
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-sm text-text-secondary">
                          <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="rounded-xl border border-brand-primary/20 bg-brand-primary/5 p-4">
                  <p className="text-sm text-text-secondary">
                    <strong className="text-text-primary">Important:</strong> Your phone app can stay logged in as usual. Only web/desktop companion sessions face the 6-hour cap.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Section 4: How It Works */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  How the Logout Process Works
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  Understanding the session lifecycle helps you prepare your team for the changes:
                </p>
                
                <div className="space-y-4">
                  {[
                    { step: 1, title: "Link WhatsApp Web", desc: "Open WhatsApp Web in your browser and scan the QR code from your phone. The 6-hour timer starts immediately.", icon: Smartphone },
                    { step: 2, title: "Normal Usage Period", desc: "For the next 6 hours, use WhatsApp Web normally—send messages, receive notifications, access all chats.", icon: Monitor },
                    { step: 3, title: "Automatic Termination", desc: "Once 6 hours are reached, the platform terminates the session automatically. You'll see a prompt to re-link.", icon: RefreshCw },
                    { step: 4, title: "Re-authentication Required", desc: "To continue, you must open WhatsApp on your phone and scan a fresh QR code.", icon: Shield },
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

                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-800">
                      <strong>Critical:</strong> This is a hard upper limit. There's no "keep alive" option regardless of how actively you're using the session.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Section 5: Why DoT is Implementing */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  Why Is DoT Implementing This?
                </h2>
                
                <div className="rounded-2xl border border-border/60 bg-white p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                      <Shield className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary">Combatting Cross-Border Cyber Fraud</h3>
                  </div>
                  <blockquote className="border-l-4 border-brand-primary pl-4 text-text-secondary italic mb-4">
                    "Long-lived web/desktop sessions are used for cross-border cyber-fraud: criminals authenticate once in India, then keep a web session alive abroad without the SIM/device, using Indian numbers for scams."
                  </blockquote>
                  <p className="text-sm text-text-muted">— DoT Official Documentation</p>
                </div>

                <h3 className="text-xl font-semibold text-text-primary">Security Objectives</h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { title: "Terminate Unattended Sessions", desc: "That can be exploited remotely", icon: Monitor },
                    { title: "Force Re-authentication", desc: "Proving control of phone/SIM", icon: RefreshCw },
                    { title: "Mirror Banking Security", desc: "Where session timeouts are standard", icon: Shield },
                  ].map((item, i) => (
                    <div key={i} className="rounded-xl border border-border/60 bg-white p-5 text-center">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary mb-3">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <h4 className="font-medium text-text-primary text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-text-secondary">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Section 6: Impact on Business */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  Impact on Business Operations
                </h2>
                
                <div className="rounded-2xl border border-border/60 bg-white overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-surface/50">
                        <th className="p-4 text-left font-semibold text-text-primary">Team Type</th>
                        <th className="p-4 text-left font-semibold text-text-primary">Current Workflow</th>
                        <th className="p-4 text-left font-semibold text-text-primary">After Implementation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {[
                        ["Support agents (8hr shifts)", "Single login for entire shift", "Re-scan at least once per shift"],
                        ["Sales teams on desktop", "Always-on access", "Re-authenticate every 6 hours"],
                        ["Operations with continuous messaging", "Uninterrupted workflows", "Session breaks mid-conversation"],
                        ["Customer service", "Seamless handoffs", "Potential gaps during re-scanning"],
                      ].map(([team, current, after], i) => (
                        <tr key={i} className="bg-white">
                          <td className="p-4 text-sm font-medium text-text-primary">{team}</td>
                          <td className="p-4 text-sm text-text-secondary">{current}</td>
                          <td className="p-4 text-sm text-brand-primary font-medium">{after}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </FadeIn>

            {/* Section 7: Compliance Timeline */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  Compliance Timeline
                </h2>
                
                <div className="space-y-4">
                  {[
                    { date: "November 28, 2025", event: "Directive issued", status: "complete" },
                    { date: "February 27, 2026", event: "Implementation deadline", status: "approaching" },
                    { date: "Late March 2026", event: "Compliance report due", status: "pending" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 rounded-xl border border-border/60 bg-white p-5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                        <CalendarCheck className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-text-primary">{item.date}</p>
                        <p className="text-sm text-text-secondary">{item.event}</p>
                      </div>
                      <Badge className={item.status === "complete" ? "bg-green-100 text-green-700" : item.status === "approaching" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-700"}>
                        {item.status === "complete" ? "✓ Complete" : item.status === "approaching" ? "⏳ Approaching" : "Pending"}
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">
                      <strong>No extensions have been announced.</strong> DoT has confirmed the February 27, 2026 deadline is final.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Section 8: How to Adapt */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  How to Adapt Your Workflows
                </h2>

                <h3 className="text-xl font-semibold text-text-primary">Immediate Actions (This Week)</h3>
                
                <div className="space-y-4">
                  {[
                    { num: 1, title: "Communicate Changes to Your Team", desc: "Send a clear notification to all team members who use WhatsApp Web about the upcoming 6-hour session limit." },
                    { num: 2, title: "Schedule Re-authentication Breaks", desc: "Plan 5-minute breaks at 6-hour intervals. Create backup coverage during re-authentication periods." },
                    { num: 3, title: "Update Documentation", desc: "Add re-scanning procedures to training materials. Create visual guides for the process." },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 rounded-xl border border-border/60 bg-white p-5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-primary text-white text-sm font-bold">
                        {item.num}
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-primary mb-1">{item.title}</h4>
                        <p className="text-sm text-text-secondary">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-semibold text-text-primary mt-8">Long-Term Solution: WhatsApp Cloud API</h3>
                <p className="text-text-secondary mb-4">Recommended for businesses needing uninterrupted messaging</p>
                
                <div className="rounded-2xl border border-border/60 bg-white overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-surface/50">
                        <th className="p-4 text-left font-semibold text-text-primary">Feature</th>
                        <th className="p-4 text-left font-semibold text-text-primary">WhatsApp Web</th>
                        <th className="p-4 text-left font-semibold text-text-primary">Cloud API</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {[
                        ["Session limit", "6 hours", "No limit"],
                        ["Requires phone", "Yes", "No"],
                        ["Automated workflows", "Limited", "Full support"],
                        ["Team collaboration", "Manual", "Built-in"],
                        ["Uptime", "User-dependent", "99.9% SLA"],
                      ].map(([feature, web, api], i) => (
                        <tr key={i} className="bg-white">
                          <td className="p-4 text-sm text-text-primary">{feature}</td>
                          <td className="p-4 text-sm text-text-secondary">{web}</td>
                          <td className="p-4 text-sm text-brand-primary font-medium">{api}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 mt-6">
                  <div className="rounded-xl border border-border/60 bg-white p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary mb-3">
                      <Server className="h-5 w-5" />
                    </div>
                    <h4 className="font-semibold text-text-primary mb-2">How Cloud API Bypasses the Limit</h4>
                    <ul className="space-y-1.5 text-sm text-text-secondary">
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-primary" /> Operates server-side (not in browser)</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-primary" /> Not dependent on web sessions</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-primary" /> Automated workflows continue uninterrupted</li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-brand-primary/20 bg-brand-primary/5 p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary mb-3">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <h4 className="font-semibold text-text-primary mb-2">Get Started with Cloud API</h4>
                    <p className="text-sm text-text-secondary mb-4">Partner with a Meta BSP like Whats91 for enhanced features and expert support.</p>
                    <Button className="w-full bg-brand-primary hover:bg-brand-primary-hover">
                      Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Section 9: Checklist */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  Business Preparation Checklist
                </h2>
                
                <div className="grid gap-6 md:grid-cols-2">
                  {[
                    {
                      phase: "Phase 1: Assessment",
                      items: [
                        "Document current WhatsApp Web usage across teams",
                        "Calculate hours of continuous usage per agent",
                        "Identify workflows most dependent on web access",
                        "Estimate potential productivity impact",
                      ],
                    },
                    {
                      phase: "Phase 2: Planning",
                      items: [
                        "Choose adaptation strategy (Cloud API or workflow changes)",
                        "Create budget for new tools or services",
                        "Assign implementation lead",
                        "Set internal deadlines before February 27",
                      ],
                    },
                    {
                      phase: "Phase 3: Implementation",
                      items: [
                        "Set up Cloud API integration (if chosen)",
                        "Train staff on new procedures",
                        "Update documentation and policies",
                        "Configure backup communication methods",
                      ],
                    },
                    {
                      phase: "Phase 4: Testing",
                      items: [
                        "Run simulated scenarios with 6-hour limits",
                        "Test mid-conversation session drops",
                        "Verify Cloud API workflows (if applicable)",
                        "Gather team feedback and adjust",
                      ],
                    },
                  ].map((section, i) => (
                    <div key={i} className="rounded-2xl border border-border/60 bg-white p-6">
                      <h4 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-brand-primary text-white text-xs flex items-center justify-center font-bold">
                          {i + 1}
                        </div>
                        {section.phase}
                      </h4>
                      <ul className="space-y-2">
                        {section.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2.5 text-sm text-text-secondary">
                            <input type="checkbox" className="mt-1 h-4 w-4 rounded border-border text-brand-primary focus:ring-brand-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Section 10: FAQ */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  Frequently Asked Questions
                </h2>
                
                <div className="space-y-4">
                  {[
                    { q: "Can businesses get exceptions?", a: "No. The government has stated there will be no relaxation of either the 6-hour requirement or the February 27 deadline." },
                    { q: "What happens during an active call?", a: "If you're on a WhatsApp Web call approaching the 6-hour mark, the session (including the call) will be terminated." },
                    { q: "Will I lose unsent messages?", a: "Possibly. Messages being typed when the session terminates may be lost. Best practice: draft longer messages in a separate document." },
                    { q: "Does staying active extend the session?", a: "No. The rule explicitly states this is a hard limit regardless of user activity." },
                    { q: "Is my chat history affected?", a: "No. Chat history remains intact. Only the current session is terminated. All messages sync when you reconnect." },
                  ].map((faq, i) => (
                    <div key={i} className="rounded-xl border border-border/60 bg-white p-5">
                      <h4 className="font-semibold text-text-primary mb-2">{faq.q}</h4>
                      <p className="text-sm text-text-secondary">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Section 11: Key Takeaways */}
            <FadeIn>
              <div className="rounded-2xl bg-gradient-to-br from-brand-primary to-brand-primary/80 p-6 sm:p-8 text-white">
                <h2 className="text-xl sm:text-2xl font-bold mb-6">Key Takeaways</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    "The deadline is final — February 27, 2026 is the compliance date",
                    "Plan for session breaks — Adjust workflows for re-authentication",
                    "Consider Cloud API — For uninterrupted business messaging",
                    "Train your team — Everyone needs to understand the new process",
                    "Document everything — Create clear internal guidelines",
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
                <ShareSection title="WhatsApp Web 6-Hour Logout Rule in India: Complete Guide for Businesses" />
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

        {/* Related Posts */}
        <RelatedPosts currentSlug={postSlug} />
      </main>

      <Footer />
    </div>
  );
}
