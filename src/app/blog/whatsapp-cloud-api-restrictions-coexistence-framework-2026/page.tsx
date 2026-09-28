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
  AlertTriangle,
  Shield,
  Zap,
  Bot,
  MessageCircle,
  TrendingUp,
  Settings,
  Users,
  Database,
  Smartphone,
  Globe,
  Lock,
  RefreshCw,
  AlertCircle,
  Timer,
  BarChart3,
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

// Messaging Tiers
const messagingTiers = [
  { tier: "Tier 0", limit: "250", criteria: "Initial state for unverified Meta Business Portfolios" },
  { tier: "Tier 1", limit: "1,000", criteria: "Baseline after Meta Business Verification is completed" },
  { tier: "Tier 2", limit: "10,000", criteria: "50% usage of current limit for 7 days with Medium/High quality" },
  { tier: "Tier 3", limit: "100,000", criteria: "Continued high-volume usage and high quality" },
  { tier: "Tier 4", limit: "Unlimited", criteria: "Enterprise-level engagement with consistent High quality" },
];

// Feedback Signals
const feedbackSignals = [
  { signal: "User Block (Spam)", impact: "High Negative", action: "Quality drop to Red; immediate template pacing" },
  { signal: "User Report", impact: "Severe Negative", action: "Risk of 48-hour account freeze or permanent ban" },
  { signal: "Template Reply (Positive)", impact: "High Positive", action: "Supports tier upgrades and removes pacing limits" },
  { signal: "Message Read Rate", impact: "Neutral to Positive", action: "Low read rates act as 'soft' signal for low relevance" },
];

// Coexistence vs API Only
const coexistenceComparison = [
  { feature: "Max Throughput", coexistence: "20 messages per second", apiOnly: "80 to 1,000+ messages per second" },
  { feature: "Calls & Status", coexistence: "Supported via the mobile app", apiOnly: "Not supported through API" },
  { feature: "Group Chats", coexistence: "Visible on app; not synced to API", apiOnly: "Limited support; requires specific API access" },
  { feature: "Broadcast Lists", coexistence: "Read-only in app; managed via API", apiOnly: "Managed entirely through templates/API" },
  { feature: "Data Sync", coexistence: "6 months of message history", apiOnly: "No history sync from App; API-only data" },
];

// Chatbot Compliance
const chatbotCompliance = [
  { type: "Support / FAQ Bot", status: "Compliant", trigger: "Must focus on business-specific data" },
  { type: "Booking / Order Bot", status: "Compliant", trigger: "Requires structured flows and clear business results" },
  { type: "Open AI Assistant", status: "Banned", trigger: "Broad, open-ended conversational capability" },
  { type: "ChatGPT Wrapper", status: "Banned", trigger: "AI is the 'product' rather than an ancillary tool" },
];

// Restriction Types
const restrictionTypes = [
  { type: "Limit-Based", duration: "24 Hours", reason: "Reached daily messaging quota", mitigation: "Wait for reset; request tier upgrade" },
  { type: "Quality-Based", duration: "Ongoing", reason: "High block/report rates (Red rating)", mitigation: "Improve template content; audit opt-ins" },
  { type: "Pacing-Based", duration: "~1 Hour", reason: "Volume spike; review of initial batch feedback", mitigation: "Ramp volume slowly; use high-trust lists" },
  { type: "Policy/Identity", duration: "48 Hours", reason: "Suspicious activity; Display name issues", mitigation: "Complete verification; use legal business names" },
  { type: "AI Compliance", duration: "Permanent", reason: "Usage of general-purpose conversational AI", mitigation: "Refactor bot to be task-specific/support only" },
  { type: "Coexistence", duration: "Disconnected", reason: "App inactivity >14 days; sync conflict", mitigation: "Open mobile app weekly; avoid device swaps" },
];

export default function WhatsAppCloudAPIRestrictionsCoexistence2026() {
  const postSlug = "whatsapp-cloud-api-restrictions-coexistence-framework-2026";

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
                <span className="text-text-primary font-medium truncate max-w-[200px]">WhatsApp API Restrictions</span>
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
                WhatsApp Cloud API Restrictions & Coexistence Framework: Complete 2026 Guide
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-base sm:text-lg text-text-secondary mb-6 leading-relaxed max-w-3xl">
                Master the 24-hour and 48-hour restrictions, portfolio-level messaging limits, quality ratings, and the hybrid Coexistence Mode. Learn why chatbots get restricted and how to maintain &quot;Connected&quot; status.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-wrap items-center gap-2">
                <Tag className="h-4 w-4 text-text-muted" />
                {["WhatsApp API", "Cloud API", "Coexistence", "Restrictions", "2026"].map((tag) => (
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
                    <p className="text-sm font-medium text-text-primary">Mar 20, 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-white p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                    <Clock4 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Reading time</p>
                    <p className="text-sm font-medium text-text-primary">25 minutes</p>
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
                  What you&apos;ll learn
                </h3>
                <ul className="space-y-2.5">
                  {[
                    "Understand the tiered messaging limit system and portfolio-level logic",
                    "Diagnose 24-hour and 48-hour restriction triggers and root causes",
                    "Master Quality Rating dynamics and feedback signal analysis",
                    "Implement Coexistence Mode with proper synchronization protocols",
                    "Navigate the 2026 AI Policy changes and avoid general-purpose bot bans",
                    "Apply best practices for warming, pacing avoidance, and template hygiene",
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
            
            {/* Introduction */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  The Evolution of WhatsApp Business Platform Governance
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  The operational landscape for enterprises utilizing the WhatsApp Business Platform has undergone a profound transformation as of early 2026, transitioning from a localized management style to a centralized, portfolio-wide governance model. This evolution is driven by Meta&apos;s increasing reliance on automated, high-velocity quality signals to regulate the ecosystem, ensuring that the platform remains a high-trust environment for users.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  For organizations operating at scale, particularly those employing sophisticated chatbots through the <strong className="text-text-primary">WhatsApp Cloud API</strong> or utilizing the hybrid <strong className="text-text-primary">&quot;Coexistence&quot; model</strong>—which allows a single number to reside on both the Business App and the API—the complexity of maintaining &quot;Connected&quot; status has intensified. Central to this complexity are the frequent <strong className="text-text-primary">24-hour and 48-hour restrictions</strong> that often appear to trigger even when human intervention is absent and communication is strictly automated.
                </p>

                <div className="rounded-xl bg-amber-50 border border-amber-200 p-5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-amber-800 mb-1">Key Challenge for 2026</p>
                      <p className="text-sm text-amber-700">
                        The shift to portfolio-level messaging limits means poor performance on one number can &quot;poison the well&quot; for your entire portfolio, preventing scaling or triggering pacing across all numbers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Messaging Tiers Section */}
            <FadeIn>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
                    The Architecture of Messaging Limits and Tiered Scaling
                  </h2>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  The foundational mechanism Meta uses to control message volume is a tiered messaging limit system, which saw its most significant overhaul in October 2025. This system determines the maximum number of business-initiated conversations a phone number or a business portfolio can start within a rolling 24-hour period.
                </p>

                {/* Portfolio-Level Logic */}
                <div className="rounded-2xl border border-border/60 bg-white p-6">
                  <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                    <Database className="h-5 w-5 text-brand-primary" />
                    Portfolio-Level Logic and Inheritance
                  </h3>
                  <p className="text-text-secondary mb-4">
                    A paradigm shift occurred on <strong className="text-text-primary">October 7, 2025</strong>, when Meta moved from individual phone number limits to portfolio-level messaging limits. Under this current framework, all phone numbers within a single Meta Business Portfolio share a single, collective messaging limit.
                  </p>
                  <p className="text-text-secondary mb-4">
                    This shift was designed to simplify scaling for established brands; any new number added to a portfolio now <strong className="text-text-primary">inherits the portfolio&apos;s current tier</strong>, eliminating the traditional &quot;warm-up&quot; phase for every new line of communication. However, this shared responsibility means that poor performance or high block rates on one number can effectively &quot;poison the well,&quot; preventing the entire portfolio from scaling.
                  </p>

                  <div className="rounded-2xl border border-border/60 overflow-hidden overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-surface border-b border-border/60">
                          <th className="px-4 sm:px-6 py-4 text-left font-semibold text-text-primary">Messaging Tier</th>
                          <th className="px-4 sm:px-6 py-4 text-left font-semibold text-text-primary">Limit (24h)</th>
                          <th className="px-4 sm:px-6 py-4 text-left font-semibold text-brand-primary">Qualification Criteria</th>
                        </tr>
                      </thead>
                      <tbody>
                        {messagingTiers.map((row, i) => (
                          <tr key={i} className="border-b border-border/40 last:border-0 hover:bg-surface/30 transition-colors">
                            <td className="px-4 sm:px-6 py-4 font-medium text-text-primary">{row.tier}</td>
                            <td className="px-4 sm:px-6 py-4 text-text-secondary">{row.limit}</td>
                            <td className="px-4 sm:px-6 py-4 text-brand-primary">{row.criteria}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 100K Baseline */}
                <div className="rounded-xl bg-green-50 border border-green-100 p-5">
                  <p className="text-sm text-green-700">
                    <strong className="text-green-800">Coming in Q2 2026:</strong> Meta is expected to remove intermediate 2K and 10K tiers for verified businesses, allowing them to jump directly to a <strong className="text-green-800">100,000 daily limit</strong> once verification is completed. This &quot;100K Baseline&quot; comes with more aggressive pacing guardrails.
                  </p>
                </div>

                {/* 24-Hour Restriction Mechanism */}
                <div className="rounded-2xl border border-border/60 bg-white p-6">
                  <h3 className="text-xl font-bold text-text-primary mb-4">The Mechanism of the 24-Hour Restriction</h3>
                  <p className="text-text-secondary mb-4">
                    When a business reaches its daily messaging limit, the phone number&apos;s status changes to <strong className="text-text-primary">&quot;Restricted&quot;</strong>. In this state, the business cannot initiate any new conversations using templates until the 24-hour rolling window resets.
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-red-50 border border-red-100 p-4">
                      <p className="text-sm font-semibold text-red-800 mb-1">Restricted Actions</p>
                      <p className="text-sm text-red-700">Cannot send new template messages or initiate business conversations</p>
                    </div>
                    <div className="rounded-xl bg-green-50 border border-green-100 p-4">
                      <p className="text-sm font-semibold text-green-800 mb-1">Still Allowed</p>
                      <p className="text-sm text-green-700">Can respond to incoming customer messages within the 24-hour service window</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Quality Rating Section */}
            <FadeIn>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                    <Shield className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
                    Quality Rating Dynamics and Automated Enforcement
                  </h2>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  The <strong className="text-text-primary">&quot;Quality Rating&quot;</strong> is the primary diagnostic tool Meta uses to evaluate a business&apos;s standing on the platform. It is a weighted measure of user feedback over the past seven days, focusing heavily on recent interactions. This rating is visualized in the WhatsApp Manager as a traffic light system: <span className="text-green-600 font-semibold">Green (High)</span>, <span className="text-yellow-600 font-semibold">Yellow (Medium)</span>, and <span className="text-red-600 font-semibold">Red (Low)</span>.
                </p>

                {/* Feedback Signals */}
                <div className="rounded-2xl border border-border/60 bg-white p-6">
                  <h3 className="text-xl font-bold text-text-primary mb-4">Feedback Signals and Block Reasons</h3>
                  <p className="text-text-secondary mb-4">
                    Meta&apos;s algorithms do not merely count blocks—they analyze the <em>context</em> of the blocks. When a user blocks a business, they are prompted to provide a reason, such as &quot;No Longer Needed,&quot; &quot;Didn&apos;t Sign Up,&quot; &quot;Spam,&quot; or &quot;Offensive Messages.&quot; High concentrations of &quot;Spam&quot; or &quot;Didn&apos;t Sign Up&quot; feedback are the fastest triggers for quality downgrades.
                  </p>

                  <div className="rounded-2xl border border-border/60 overflow-hidden overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-surface border-b border-border/60">
                          <th className="px-4 sm:px-6 py-4 text-left font-semibold text-text-primary">Feedback Signal</th>
                          <th className="px-4 sm:px-6 py-4 text-left font-semibold text-text-primary">Impact</th>
                          <th className="px-4 sm:px-6 py-4 text-left font-semibold text-brand-primary">Enforcement Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {feedbackSignals.map((row, i) => (
                          <tr key={i} className="border-b border-border/40 last:border-0 hover:bg-surface/30 transition-colors">
                            <td className="px-4 sm:px-6 py-4 font-medium text-text-primary">{row.signal}</td>
                            <td className={`px-4 sm:px-6 py-4 ${row.impact.includes("Negative") ? "text-red-600" : "text-green-600"}`}>{row.impact}</td>
                            <td className="px-4 sm:px-6 py-4 text-brand-primary">{row.action}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Flagged Status Removal */}
                <div className="rounded-xl bg-blue-50 border border-blue-100 p-5">
                  <p className="text-sm text-blue-700">
                    <strong className="text-blue-800">October 2025 Update:</strong> The &quot;Flagged&quot; status has been removed from the platform&apos;s architecture. Previously, a drop to &quot;Low&quot; quality would put a number in a 7-day flagged state. Now, while limits no longer automatically decrease, a &quot;Low&quot; rating will freeze the portfolio&apos;s ability to scale and may trigger &quot;Portfolio Pacing.&quot;
                  </p>
                </div>

                {/* 48-Hour Restriction */}
                <div className="rounded-2xl border border-border/60 bg-white p-6">
                  <h3 className="text-xl font-bold text-text-primary mb-4">The 48-Hour Restriction and Identity Verification</h3>
                  <p className="text-text-secondary mb-4">
                    The 48-hour restriction window is distinct from the 24-hour limit-based restriction. It is typically associated with <strong className="text-text-primary">&quot;Identity Verification&quot;</strong> and <strong className="text-text-primary">&quot;Manual Reviews&quot;</strong>. When Meta&apos;s automated systems detect a significant policy violation or a sudden change in account metadata—such as a new credit card from a different region or an IP address associated with previous bans—the account is placed in a &quot;Pending&quot; state.
                  </p>
                  <div className="flex items-start gap-3">
                    <Timer className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" />
                    <p className="text-sm text-text-secondary">
                      During this 48-hour review period, the business is unable to send messages or add new assets to the Business Manager.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Coexistence Mode Section */}
            <FadeIn>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
                    Coexistence Mode: Synergy and Technical Fragility
                  </h2>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  One of the most innovative features of 2026 is <strong className="text-text-primary">&quot;Coexistence Mode,&quot;</strong> which allows a single phone number to operate on both the WhatsApp Business App (on a mobile device) and the WhatsApp Cloud API (via a CRM or custom backend). This hybrid model is particularly popular among SMBs that want to maintain a &quot;personal touch&quot; through manual app usage while leveraging the API for automation.
                </p>

                {/* Comparison Table */}
                <div className="rounded-2xl border border-border/60 bg-white overflow-hidden overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-surface border-b border-border/60">
                        <th className="px-4 sm:px-6 py-4 text-left font-semibold text-text-primary">Feature</th>
                        <th className="px-4 sm:px-6 py-4 text-left font-semibold text-blue-600">Coexistence (App + API)</th>
                        <th className="px-4 sm:px-6 py-4 text-left font-semibold text-brand-primary">Cloud API Only</th>
                      </tr>
                    </thead>
                    <tbody>
                      {coexistenceComparison.map((row, i) => (
                        <tr key={i} className="border-b border-border/40 last:border-0 hover:bg-surface/30 transition-colors">
                          <td className="px-4 sm:px-6 py-4 font-medium text-text-primary">{row.feature}</td>
                          <td className="px-4 sm:px-6 py-4 text-text-secondary">{row.coexistence}</td>
                          <td className="px-4 sm:px-6 py-4 text-brand-primary font-medium">{row.apiOnly}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 14-Day Activity Rule */}
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-lg font-bold text-amber-800 mb-2">The 14-Day Activity Rule</h3>
                      <p className="text-sm text-amber-700 mb-3">
                        The most frequent cause of &quot;unexplained&quot; restrictions for co-existing numbers is the 14-day inactivity rule. Meta mandates that for Coexistence to remain active, the WhatsApp Business App on the primary mobile device must be opened <strong>at least once every 14 days</strong>.
                      </p>
                      <p className="text-sm text-amber-700">
                        If the app remains dormant for longer, the API connection is automatically severed to protect account integrity. This is often perceived as a &quot;ban,&quot; when it is actually an automated disconnection requiring the user to reopen the app and potentially re-onboard.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Throughput Caps */}
                <div className="rounded-2xl border border-border/60 bg-white p-6">
                  <h3 className="text-xl font-bold text-text-primary mb-4">Synchronization Conflicts and Throughput Caps</h3>
                  <p className="text-text-secondary mb-4">
                    Numbers in Coexistence Mode operate under a different technical profile. They are capped at <strong className="text-text-primary">20 messages per second (MPS)</strong>, compared to the 80–1,000 MPS available to pure API accounts. If a chatbot attempts to push a high-volume broadcast through a Coexistence number, it can trigger &quot;Rate Limit Errors&quot; (Error Code 131056) and &quot;Suspicious Signal&quot; flags.
                  </p>
                  <p className="text-text-secondary">
                    There are also functional &quot;Feature Conflicts&quot;—certain app-specific features such as <strong className="text-text-primary">&quot;Disappearing Messages,&quot; &quot;View-Once Media,&quot;</strong> and the ability to edit or revoke messages are disabled for the entire number when Coexistence is enabled.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Automated Pacing Section */}
            <FadeIn>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                    <RefreshCw className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
                    Automated Pacing: The &quot;Held for Quality Assessment&quot; Workflow
                  </h2>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  For businesses running chatbots that initiate high volumes of communication, <strong className="text-text-primary">&quot;Portfolio Pacing&quot;</strong> is the most common reason for temporary message delays and Error 132015. Introduced to combat mass spam, pacing is a controlled delivery mechanism where Meta pauses a large-scale campaign to monitor early user feedback.
                </p>

                {/* Pacing Lifecycle */}
                <div className="rounded-2xl border border-border/60 bg-white p-6">
                  <h3 className="text-xl font-bold text-text-primary mb-6">The Pacing Lifecycle</h3>
                  <div className="space-y-4">
                    {[
                      { phase: "1", title: "Batch Delivery", desc: "A small subset of messages is sent immediately to test user response" },
                      { phase: "2", title: "Feedback Window", desc: "Meta waits for user blocks or reports from this initial subset" },
                      { phase: "3a", title: "Success Path", desc: "If feedback is positive, 'held' messages are released in batches over the following hour" },
                      { phase: "3b", title: "Failure Path (Error 132015)", desc: "If feedback is negative, Meta drops all remaining held messages with failed status" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-surface/50">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-primary text-white text-sm font-bold">
                          {item.phase}
                        </div>
                        <div>
                          <h4 className="font-semibold text-text-primary">{item.title}</h4>
                          <p className="text-sm text-text-secondary">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl bg-brand-primary/5 border border-brand-primary/20 p-5">
                  <p className="text-sm text-text-secondary">
                    <strong className="text-text-primary">Key Insight:</strong> This mechanism explains why a chatbot might suddenly stop delivering messages mid-campaign. It is not necessarily a ban on the number, but a targeted &quot;drop&quot; of a specific template or campaign that is failing quality checks.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* AI Policy Section */}
            <FadeIn>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
                    <Bot className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
                    The 2026 AI Policy Transformation: Ban on General-Purpose Bots
                  </h2>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  A critical regulatory shift that took full effect on <strong className="text-text-primary">January 15, 2026</strong>, is Meta&apos;s ban on <strong className="text-text-primary">&quot;General-Purpose AI Chatbots&quot;</strong> on the WhatsApp Business Platform. This policy specifically targets AI systems where the &quot;core product&quot; is an open-ended conversational assistant, such as &quot;ChatGPT wrappers&quot; or &quot;Perplexity bots&quot; that allow users to ask arbitrary questions.
                </p>

                {/* Rationale */}
                <div className="rounded-2xl border border-border/60 bg-white p-6">
                  <h3 className="text-xl font-bold text-text-primary mb-4">Rationale for the AI Restriction</h3>
                  <p className="text-text-secondary mb-4">
                    Meta&apos;s enforcement of this ban is rooted in three concerns:
                  </p>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-xl bg-surface/50 p-4">
                      <p className="text-sm font-semibold text-text-primary mb-1">Infrastructure Strain</p>
                      <p className="text-xs text-text-secondary">Open-ended bots generate massive free-form conversation that taxes infrastructure without template-based billing</p>
                    </div>
                    <div className="rounded-xl bg-surface/50 p-4">
                      <p className="text-sm font-semibold text-text-primary mb-1">Monetization</p>
                      <p className="text-xs text-text-secondary">General AI conversations don&apos;t fit Meta&apos;s business messaging revenue model</p>
                    </div>
                    <div className="rounded-xl bg-surface/50 p-4">
                      <p className="text-sm font-semibold text-text-primary mb-1">Brand Control</p>
                      <p className="text-xs text-text-secondary">Meta AI is positioned as the primary general-purpose assistant in the app</p>
                    </div>
                  </div>
                </div>

                {/* Compliance Table */}
                <div className="rounded-2xl border border-border/60 bg-white overflow-hidden overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-surface border-b border-border/60">
                        <th className="px-4 sm:px-6 py-4 text-left font-semibold text-text-primary">Chatbot Type</th>
                        <th className="px-4 sm:px-6 py-4 text-left font-semibold text-text-primary">Status in 2026</th>
                        <th className="px-4 sm:px-6 py-4 text-left font-semibold text-brand-primary">Enforcement Trigger</th>
                      </tr>
                    </thead>
                    <tbody>
                      {chatbotCompliance.map((row, i) => (
                        <tr key={i} className="border-b border-border/40 last:border-0 hover:bg-surface/30 transition-colors">
                          <td className="px-4 sm:px-6 py-4 font-medium text-text-primary">{row.type}</td>
                          <td className={`px-4 sm:px-6 py-4 font-semibold ${row.status === "Compliant" ? "text-green-600" : "text-red-600"}`}>
                            {row.status}
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-brand-primary">{row.trigger}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="rounded-xl bg-red-50 border border-red-200 p-5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-red-800 mb-1">Warning</p>
                      <p className="text-sm text-red-700">
                        Businesses running non-compliant AI bots are seeing <strong>permanent account restrictions</strong> with limited paths for appeal. Enforcement is often preceded by a &quot;24-hour warning block&quot; on the creation of new templates.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Known Incidents Section */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  Known Incident Clusters from Developer Communities
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  Reports from developer communities indicate that the &quot;Restriction Loop&quot; is a significant frustration for new and scaling businesses in 2026. These incidents generally fall into three clusters:
                </p>

                <div className="space-y-4">
                  {[
                    {
                      title: "Cluster 1: The 'New Account' Wall",
                      desc: "New Meta Business Suite accounts are being restricted the moment a WhatsApp account is created. Analysis suggests Meta is cross-referencing 'Entity Trust Signals'—if the domain, credit card, or admin account has historical association with restricted Facebook Ad accounts, WhatsApp is preemptively disabled."
                    },
                    {
                      title: "Cluster 2: The Display Name Stalemate",
                      desc: "Numbers are fully approved but 'disabled' because the Display Name was rejected or remains 'In Review' indefinitely. Meta has become more stringent about the 'Direct Relationship' rule—using 'Best Cheap Laptops' for a business named 'TechSolutions LLC' triggers policy violation flags."
                    },
                    {
                      title: "Cluster 3: The Saturation Error (131049)",
                      desc: "Meta introduced 'Frequency Capping' for marketing messages. Templates fail to send even with Green quality because the recipient reached their daily marketing message saturation limit across all brands. Chatbots not handling Error 131049 enter retry loops flagged as aggressive behavior."
                    }
                  ].map((item, i) => (
                    <div key={i} className="rounded-2xl border border-border/60 bg-white p-6">
                      <h3 className="text-lg font-semibold text-text-primary mb-2">{item.title}</h3>
                      <p className="text-sm text-text-secondary">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Technical Governance */}
            <FadeIn>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                    <Lock className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
                    Technical Governance: BSUIDs and the End of On-Premises API
                  </h2>
                </div>

                {/* BSUIDs */}
                <div className="rounded-2xl border border-border/60 bg-white p-6">
                  <h3 className="text-xl font-bold text-text-primary mb-4">The Rise of Business-Scoped User IDs (BSUIDs)</h3>
                  <p className="text-text-secondary mb-4">
                    In preparation for the launch of WhatsApp Usernames, Meta is increasingly obfuscating user phone numbers. Businesses are now being assigned a <strong className="text-text-primary">BSUID</strong>—a unique identifier for a specific user within the context of a specific business portfolio.
                  </p>
                  <p className="text-text-secondary">
                    Many businesses have reported &quot;ghost restrictions&quot; where messages seem sent but never appear in their CRM. This is often a technical failure where the CRM is still &quot;keying&quot; off the user&apos;s phone number, but the API is only delivering the BSUID, causing synchronization failures.
                  </p>
                </div>

                {/* On-Premises API */}
                <div className="rounded-xl bg-red-50 border border-red-100 p-5">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-red-800 mb-1">End of On-Premises API (October 23, 2025)</p>
                      <p className="text-sm text-red-700">
                        Meta officially ended support for the On-Premises version of the WhatsApp Business API. Accounts still running on local servers are seeing a surge in &quot;Error 1005&quot; and sudden disconnections. Cloud API is now the only officially supported architecture for 2026.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Best Practices Section */}
            <FadeIn>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                    <Settings className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
                    Best Practices and Mitigation Strategies
                  </h2>
                </div>

                {/* Strategic Warming */}
                <div className="rounded-2xl border border-border/60 bg-white p-6">
                  <h3 className="text-xl font-bold text-text-primary mb-4">Strategic Warming and Pacing Avoidance</h3>
                  <p className="text-text-secondary mb-4">
                    Rather than launching a 100,000-message campaign on day one, businesses should employ a &quot;Multi-Stage Warm-Up&quot; even if they are in a high tier:
                  </p>
                  <div className="space-y-3">
                    {[
                      { step: "Ramp Gradually", desc: "Start with a small, high-trust segment of 1,000–5,000 users" },
                      { step: "Wait for the 24-Hour Cycle", desc: "Analyze Block Rate and Response Rate from the first 24 hours before increasing volume" },
                      { step: "Avoid Spikes", desc: "Sudden spikes in volume are the primary trigger for Portfolio Pacing. Distribute campaigns over several hours" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-surface/50">
                        <CheckCircle2 className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-text-primary">{item.step}</p>
                          <p className="text-xs text-text-secondary">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Opt-In and Template Hygiene */}
                <div className="rounded-2xl border border-border/60 bg-white p-6">
                  <h3 className="text-xl font-bold text-text-primary mb-4">Opt-In and Template Hygiene</h3>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-xl bg-surface/50 p-4">
                      <p className="text-sm font-semibold text-text-primary mb-2">Explicit Opt-In</p>
                      <p className="text-xs text-text-secondary">Ensure every user has proactively agreed to receive the specific type of message. Using a &quot;shipping update&quot; opt-in for &quot;marketing deals&quot; is high-risk.</p>
                    </div>
                    <div className="rounded-xl bg-surface/50 p-4">
                      <p className="text-sm font-semibold text-text-primary mb-2">Clear Branding</p>
                      <p className="text-xs text-text-secondary">Identify the business in the first sentence of every template. When users recognize the sender, block rates drop significantly.</p>
                    </div>
                    <div className="rounded-xl bg-surface/50 p-4">
                      <p className="text-sm font-semibold text-text-primary mb-2">Manage Frequency</p>
                      <p className="text-xs text-text-secondary">Avoid sending multiple templates to the same user in a short period. Meta&apos;s Frequency Capping and user annoyance are two sides of the same coin.</p>
                    </div>
                  </div>
                </div>

                {/* Coexistence Checklist */}
                <div className="rounded-2xl border border-border/60 bg-white p-6">
                  <h3 className="text-xl font-bold text-text-primary mb-4">Operational Discipline for Coexistence</h3>
                  <div className="space-y-3">
                    {[
                      { rule: "The 13-Day Rule", action: "Assign a team member to physically open the WhatsApp Business App every Monday morning" },
                      { rule: "Device Integrity", action: "Do not switch the primary SIM card or mobile device without first contacting BSP support" },
                      { rule: "Backup and History", action: "Recognize that chat history sync is a one-time setup choice; changing settings requires full re-onboarding" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-surface/50">
                        <CheckCircle2 className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-text-primary">{item.rule}</p>
                          <p className="text-xs text-text-secondary">{item.action}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Restriction Types Summary */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  Summary of Restriction Types and Mitigation Steps
                </h2>

                <div className="rounded-2xl border border-border/60 bg-white overflow-hidden overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-surface border-b border-border/60">
                        <th className="px-4 sm:px-6 py-4 text-left font-semibold text-text-primary">Restriction Type</th>
                        <th className="px-4 sm:px-6 py-4 text-left font-semibold text-text-primary">Duration</th>
                        <th className="px-4 sm:px-6 py-4 text-left font-semibold text-text-primary">Primary Reason</th>
                        <th className="px-4 sm:px-6 py-4 text-left font-semibold text-brand-primary">Mitigation Step</th>
                      </tr>
                    </thead>
                    <tbody>
                      {restrictionTypes.map((row, i) => (
                        <tr key={i} className="border-b border-border/40 last:border-0 hover:bg-surface/30 transition-colors">
                          <td className="px-4 sm:px-6 py-4 font-medium text-text-primary">{row.type}</td>
                          <td className="px-4 sm:px-6 py-4 text-text-secondary">{row.duration}</td>
                          <td className="px-4 sm:px-6 py-4 text-text-secondary">{row.reason}</td>
                          <td className="px-4 sm:px-6 py-4 text-brand-primary font-medium">{row.mitigation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </FadeIn>

            {/* Key Takeaways */}
            <FadeIn>
              <div className="rounded-2xl bg-gradient-to-br from-brand-primary to-brand-primary/80 p-6 sm:p-8 text-white">
                <h2 className="text-xl sm:text-2xl font-bold mb-6">Key Takeaways</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    "Portfolio-level limits mean all numbers share one quota—one bad apple affects everyone",
                    "Quality Rating is a 7-day weighted measure—recent feedback matters most",
                    "24-hour restrictions block new conversations; 48-hour restrictions involve identity reviews",
                    "Coexistence Mode requires opening the mobile app every 14 days to maintain API connection",
                    "General-purpose AI bots are permanently banned—refactor to task-specific implementations",
                    "Strategic warming and pacing avoidance are essential for high-volume campaigns",
                    "BSUIDs are replacing phone numbers—update your CRM integrations accordingly",
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
                <ShareSection title="WhatsApp Cloud API Restrictions & Coexistence Framework: Complete 2026 Guide" />
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
                        Lead Developer at Whats91 specializing in WhatsApp Cloud API integration, enterprise software development, and helping businesses navigate Meta&apos;s evolving platform policies and technical requirements.
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
