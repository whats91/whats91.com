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
  Shield,
  Users,
  Database,
  Zap,
  Bot,
  Globe,
  TrendingUp,
  Code,
  Server,
  Key,
  MessageSquare,
  DollarSign,
  Layers,
  AlertTriangle,
  Settings,
  FileText,
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

export default function WhatsAppGraphAPIV24toV25Page() {
  const postSlug = "whatsapp-graph-api-v24-to-v25-transition-guide";

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
                <span className="text-text-primary font-medium truncate max-w-[200px]">Graph API v24 to v25</span>
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
                WhatsApp Graph API v24 to v25: Complete Migration Guide for Enterprise
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-base sm:text-lg text-text-secondary mb-6 leading-relaxed max-w-3xl">
                The definitive analysis of Meta&apos;s Graph API transition. Learn about BSUID, Cloud API consolidation, 100K messaging baseline, pricing changes, and actionable migration strategies.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-wrap items-center gap-2">
                <Tag className="h-4 w-4 text-text-muted" />
                {["Graph API", "Cloud API", "BSUID", "Migration", "2026"].map((tag) => (
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
                    <p className="text-sm font-medium text-text-primary">Mar 13, 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-white p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                    <Clock4 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Reading time</p>
                    <p className="text-sm font-medium text-text-primary">20 minutes</p>
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
                    "Complete architectural shift from On-Premises to Cloud API",
                    "BSUID (Business-Scoped User ID) as the new primary identifier",
                    "100K daily messaging baseline with Portfolio Pacing",
                    "Per-template pricing model replacing conversation-based billing",
                    "Interactive commerce features: Flows, Carousels, and AI Agents",
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
                  The Strategic Importance of Version Synchronization
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  The technological landscape of enterprise communication has reached a definitive milestone with the transition of the Meta Graph API from version 24.0 into the expansive capabilities of version 25.0. For platforms dedicated to optimized messaging, understanding this shift is not merely a matter of technical compliance but a strategic necessity for maintaining a competitive edge in a saturated digital market.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  The transition represents a fundamental move away from the infrastructure-heavy, rigid messaging tiers of the past toward a fluid, quality-centric, and AI-integrated ecosystem. This evolution is characterized by three core pillars: the total dominance of the Cloud API architecture, a revolutionary approach to customer identity through Business-Scoped User IDs (BSUID), and the democratization of high-volume messaging through the 100,000-message baseline.
                </p>

                <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                  <h4 className="font-semibold text-amber-700 mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Critical Migration Warning
                  </h4>
                  <p className="text-sm text-amber-700">
                    As Meta sunsets legacy systems and mandates a move toward a more privacy-aligned infrastructure, businesses that fail to synchronize with these updates risk significant operational friction, ranging from broken conversation histories to the complete loss of customer context in an increasingly username-driven world.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Feature Comparison Table */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  Comprehensive Feature Comparison: v24.0 vs v25.0
                </h2>
                <p className="text-text-secondary">
                  The following table delineates the architectural and functional distinctions between the v24.0 era (centered on the late 2025 transition) and the v25.0 era (defining the 2026 infrastructure).
                </p>

                <div className="rounded-2xl border border-border/60 bg-white overflow-hidden overflow-x-auto">
                  <table className="w-full min-w-[650px]">
                    <thead>
                      <tr className="bg-surface/50">
                        <th className="p-4 text-left font-semibold text-text-primary">Feature Pillar</th>
                        <th className="p-4 text-left font-semibold text-text-primary">Graph API v24.0</th>
                        <th className="p-4 text-left font-semibold text-text-primary">Graph API v25.0</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {[
                        ["Primary Identifier", "E.164 Phone Number (wa_id)", "Business-Scoped User ID (BSUID)"],
                        ["Messaging Capacity", "Tiered (1K, 2K, 10K, 100K)", "100K Baseline (post-verification)"],
                        ["Throttling Logic", "Hard caps based on tiers", "Dynamic Portfolio Pacing"],
                        ["Identity Visibility", "Phone numbers shared by default", "Usernames optional; numbers hidden"],
                        ["Infrastructure", "Final On-Premises support (sunset Oct 2025)", "Cloud API exclusive/standardized"],
                        ["Marketing API", "Advantage+ catalog ads by default", "Mandatory ASC/AAC migrations"],
                        ["Pricing Unit", "Transition to per-template billing", "Tiered volume discounts (INR/USD)"],
                        ["Interactive UX", "Standard Buttons & Lists", "Advanced Flows & Shoppable Carousels"],
                        ["AI Integration", "Keyword-based Chatbots", "Context-aware AI Agents (Llama-powered)"],
                        ["Developer Tools", "Template pagination cursor updates", "BSUID mapping & Contact Book API"],
                      ].map(([pillar, v24, v25], i) => (
                        <tr key={i} className="bg-white">
                          <td className="p-4 text-sm font-medium text-text-primary">{pillar}</td>
                          <td className="p-4 text-sm text-text-secondary">{v24}</td>
                          <td className="p-4 text-sm text-brand-primary font-medium">{v25}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </FadeIn>

            {/* Cloud API Consolidation */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  Architectural Consolidation: Cloud-First Reality
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  One of the most profound changes occurring between the v24.0 and v25.0 cycles is the absolute deprecation of the On-Premises API. As of October 23, 2025, the On-Premises architecture was officially sunsetted, making the Cloud API the singular, mandatory pathway for enterprise messaging.
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                    <h4 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                      <Server className="h-5 w-5" />
                      On-Premises (Deprecated)
                    </h4>
                    <ul className="space-y-2 text-sm text-red-700">
                      <li className="flex items-center gap-2"><span className="text-red-500">✕</span> Self-managed Docker containers</li>
                      <li className="flex items-center gap-2"><span className="text-red-500">✕</span> Database instance maintenance</li>
                      <li className="flex items-center gap-2"><span className="text-red-500">✕</span> Server security management</li>
                      <li className="flex items-center gap-2"><span className="text-red-500">✕</span> Lag in feature deployments</li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-green-200 bg-green-50 p-5">
                    <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Cloud API (Standard)
                    </h4>
                    <ul className="space-y-2 text-sm text-green-700">
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Meta-managed infrastructure</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> 80-500 msgs/sec throughput</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Instant feature rollouts</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Shared Account Model</li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-xl border border-brand-primary/20 bg-brand-primary/5 p-5">
                  <h4 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-brand-primary" />
                    Performance Gains
                  </h4>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="text-center p-3 bg-white rounded-lg border border-border/60">
                      <p className="text-2xl font-bold text-brand-primary">80</p>
                      <p className="text-xs text-text-muted">msgs/sec standard</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg border border-border/60">
                      <p className="text-2xl font-bold text-brand-primary">500</p>
                      <p className="text-xs text-text-muted">msgs/sec high-volume</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg border border-border/60">
                      <p className="text-2xl font-bold text-brand-primary">0</p>
                      <p className="text-xs text-text-muted">hardware upgrades needed</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* BSUID Revolution */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  Identity and Privacy: The BSUID Revolution
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  The pivot toward Business-Scoped User IDs (BSUID) represents the most significant change to the WhatsApp identity model since its inception. Starting in June 2026, WhatsApp is introducing usernames as a privacy feature, allowing users to communicate with businesses without exposing their phone numbers.
                </p>

                <div className="rounded-xl border border-purple-200 bg-purple-50 p-5">
                  <h4 className="font-semibold text-purple-700 mb-3 flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    What is BSUID?
                  </h4>
                  <p className="text-sm text-purple-700 mb-4">
                    The BSUID is a unique alphanumeric identifier assigned to a specific user-business pair. Unlike a phone number, which is universal across the platform, a BSUID for the same individual will be different for Business A than it is for Business B. This &quot;scoped&quot; nature prevents businesses from cross-referencing user data without direct consent.
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="bg-white rounded-lg p-3 border border-purple-200">
                      <p className="text-xs text-text-muted mb-1">Privacy Alignment</p>
                      <p className="text-sm font-medium text-purple-700">GDPR & CCPA Compliant</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-purple-200">
                      <p className="text-xs text-text-muted mb-1">Webhook Change</p>
                      <p className="text-sm font-medium text-purple-700">wa_id may return null</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                  <h4 className="font-semibold text-amber-700 mb-3 flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    30-Day Transition Window
                  </h4>
                  <p className="text-sm text-amber-700 mb-4">
                    After a business interacts with a user&apos;s phone number, that number remains visible in webhooks for 30 consecutive days. If a user is added to the business&apos;s official &quot;Contact Book&quot;—launching in early April 2026—the phone number and BSUID pair are stored permanently.
                  </p>
                  <div className="rounded-lg bg-white p-3 border border-amber-200">
                    <p className="text-xs text-amber-600 font-medium mb-1">Developer Action Required</p>
                    <p className="text-sm text-text-secondary">
                      Build data structures that map multiple identifiers (Phone Number, BSUID, ExternalUserId) to a single customer record to avoid duplicate profile creation.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* 100K Baseline and Portfolio Pacing */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  Scaling Evolution: 100K Baseline & Portfolio Pacing
                </h2>
                <p className="text-text-secondary">
                  The messaging limit structure in the v25.0 cycle has been radically simplified to promote faster enterprise growth. Starting in Q1 2026, Meta is removing the intermediate 2K and 10K tiers.
                </p>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-border/60 bg-white p-5 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600 mx-auto mb-3">
                      <Zap className="h-7 w-7" />
                    </div>
                    <p className="text-3xl font-bold text-green-600">100K</p>
                    <p className="text-sm text-text-secondary">Daily Messages Baseline</p>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-white p-5 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600 mx-auto mb-3">
                      <TrendingUp className="h-7 w-7" />
                    </div>
                    <p className="text-3xl font-bold text-blue-600">No Tiers</p>
                    <p className="text-sm text-text-secondary">2K/10K Limits Removed</p>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-white p-5 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary mx-auto mb-3">
                      <Shield className="h-7 w-7" />
                    </div>
                    <p className="text-3xl font-bold text-brand-primary">Quality</p>
                    <p className="text-sm text-text-secondary">Over Quantity Focus</p>
                  </div>
                </div>

                <div className="rounded-xl border border-border/60 bg-surface/50 p-5">
                  <h4 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                    <Settings className="h-5 w-5 text-brand-primary" />
                    Portfolio Pacing: The New Guardrail
                  </h4>
                  <p className="text-sm text-text-secondary mb-4">
                    To compensate for the significantly higher entry-level limits, Meta is introducing Portfolio Pacing. This automated safety mechanism monitors user feedback in real-time. When a large campaign is initiated, the system does not release all 100,000 messages at once. Instead, it sends messages in batches.
                  </p>
                  <div className="grid gap-3 sm:grid-cols-4">
                    <div className="text-center p-3 bg-white rounded-lg border border-border/60">
                      <p className="text-lg font-bold text-green-600">✓ Green</p>
                      <p className="text-xs text-text-muted">Full Speed</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg border border-border/60">
                      <p className="text-lg font-bold text-amber-600">⚠ Yellow</p>
                      <p className="text-xs text-text-muted">Throttled</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg border border-border/60">
                      <p className="text-lg font-bold text-red-600">✕ Red</p>
                      <p className="text-xs text-text-muted">Paused</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg border border-border/60">
                      <p className="text-lg font-bold text-purple-600">Smart</p>
                      <p className="text-xs text-text-muted">Batch Control</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Interactive Commerce */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  Transformation of Interactive Commerce and UX
                </h2>
                <p className="text-text-secondary">
                  The v25.0 API update significantly enhances the &quot;Interactive Message&quot; portfolio, turning the chat interface into a miniature application environment.
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="group rounded-xl border border-border/60 bg-white p-5 transition-all hover:border-purple-200 hover:shadow-md">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600 mb-4">
                      <Layers className="h-6 w-6" />
                    </div>
                    <h4 className="font-semibold text-text-primary text-lg mb-2">WhatsApp Flows</h4>
                    <p className="text-sm text-text-secondary mb-3">
                      Create customizable, form-based journeys directly within the chat. Users can book appointments, fill KYC forms, or select product variations using interactive screens.
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">60% Less Drop-off</Badge>
                      <Badge variant="outline" className="text-xs">In-Chat Forms</Badge>
                    </div>
                  </div>

                  <div className="group rounded-xl border border-border/60 bg-white p-5 transition-all hover:border-green-200 hover:shadow-md">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600 mb-4">
                      <MessageSquare className="h-6 w-6" />
                    </div>
                    <h4 className="font-semibold text-text-primary text-lg mb-2">Carousels & Rich Media</h4>
                    <p className="text-sm text-text-secondary mb-3">
                      Showcase up to 10 products in a single message with individual &quot;Buy&quot; buttons. File sharing up to 100MB for catalogs, PDFs, and instructional videos.
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">100MB Files</Badge>
                      <Badge variant="outline" className="text-xs">10 Product Cards</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* AI and Autonomous Agents */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  AI and Autonomous Agents: From Bots to Intelligence
                </h2>
                <p className="text-text-secondary">
                  The integration of Meta&apos;s Llama AI models marks a transition from &quot;Keyword-based Automation&quot; to &quot;Autonomous AI Agents.&quot; Version 25.0 introduces Context-Aware Messaging where AI can interpret nuanced queries and handle multi-step tasks.
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-border/60 bg-white p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 mb-4">
                      <Bot className="h-5 w-5" />
                    </div>
                    <h4 className="font-semibold text-text-primary mb-2">Contextual Personalization</h4>
                    <p className="text-sm text-text-secondary mb-3">
                      AI agents access CRM data and past interaction history in real-time. A support query about order status can trigger a personalized birthday discount offer.
                    </p>
                    <ul className="space-y-1 text-sm text-text-secondary">
                      <li>• CRM Integration</li>
                      <li>• Multi-step Task Handling</li>
                      <li>• Sales Opportunity Detection</li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-white p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600 mb-4">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <h4 className="font-semibold text-text-primary mb-2">AI-Driven Performance Metrics</h4>
                    <p className="text-sm text-text-secondary mb-3">
                      Automated &quot;Experience Scoring&quot; analyzes conversation sentiment to provide real-time quality scores without waiting for NPS surveys.
                    </p>
                    <ul className="space-y-1 text-sm text-text-secondary">
                      <li>• Real-time Sentiment Analysis</li>
                      <li>• Friction Point Detection</li>
                      <li>• Proactive Issue Resolution</li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-xl border border-brand-primary/20 bg-brand-primary/5 p-5">
                  <h4 className="font-semibold text-text-primary mb-3">BYOAI: Bring Your Own AI Agent</h4>
                  <p className="text-sm text-text-secondary">
                    Businesses can build specialized agents on external platforms and integrate them into the WhatsApp inbox. Popular use cases include healthcare (telemedicine triage) and fintech (fraud detection alerts).
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Pricing and Categorization */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  Pricing and Categorization: Financial Implications
                </h2>
                <p className="text-text-secondary">
                  On July 1, 2025, the financial structure shifted from conversation-based pricing to a per-delivered-template model. This is central to the v24.0 and v25.0 update cycles.
                </p>

                <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                  <h4 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Utility vs. Marketing Rigor
                  </h4>
                  <p className="text-sm text-red-700 mb-3">
                    Meta has implemented stricter categorization rules. Any message with &quot;mixed intent&quot;—such as an order update that also includes a discount code—is automatically reclassified as a &quot;Marketing&quot; template.
                  </p>
                  <p className="text-sm text-red-700">
                    Use the <code className="bg-red-100 px-1 rounded">v24.0/{`{WABA_ID}`}/message_templates</code> endpoint to ensure templates are correctly categorized before submission.
                  </p>
                </div>

                <div className="rounded-2xl border border-border/60 bg-white overflow-hidden overflow-x-auto">
                  <table className="w-full min-w-[550px]">
                    <thead>
                      <tr className="bg-surface/50">
                        <th className="p-4 text-left font-semibold text-text-primary">Pricing Category</th>
                        <th className="p-4 text-left font-semibold text-text-primary">Cost Basis</th>
                        <th className="p-4 text-left font-semibold text-text-primary">Best Use Case</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {[
                        ["Marketing", "Highest per-message rate", "Promotions, sales, re-engagement"],
                        ["Utility", "Lower per-message rate", "Order IDs, shipping alerts, account updates"],
                        ["Authentication", "Fixed rate for OTPs", "Verification codes, password resets"],
                        ["Service (FEP)", "$0.00 for 72 hours", "Click-to-WhatsApp ad conversations"],
                        ["Service (Inbound)", "$0.00 for 24 hours", "Customer-initiated support"],
                      ].map(([category, cost, useCase], i) => (
                        <tr key={i} className="bg-white">
                          <td className="p-4 text-sm font-medium text-text-primary">{category}</td>
                          <td className="p-4 text-sm text-text-secondary">{cost}</td>
                          <td className="p-4 text-sm text-text-secondary">{useCase}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-green-200 bg-green-50 p-5">
                    <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      72-Hour Free Entry Point (FEP)
                    </h4>
                    <p className="text-sm text-green-700">
                      Any conversation initiated via a Click-to-WhatsApp ad or Facebook Page CTA button is free for 72 hours, regardless of message category. This is the most powerful lever for performance marketing in 2026.
                    </p>
                  </div>
                  <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
                    <h4 className="font-semibold text-blue-700 mb-3 flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      24-Hour Service Window
                    </h4>
                    <p className="text-sm text-blue-700">
                      When a customer initiates a conversation, businesses can reply with free-form service messages (not templates) for 24 hours at no charge.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Technical Implementation */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  Technical Implementation & Developer Optimization
                </h2>
                <p className="text-text-secondary">
                  For developers transitioning from v24.0 to v25.0, several technical refinements are necessary to maintain stable operations.
                </p>

                <div className="space-y-4">
                  <div className="rounded-xl border border-border/60 bg-white p-5">
                    <h4 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                      <Key className="h-5 w-5 text-brand-primary" />
                      Token Management: Permanent System Users
                    </h4>
                    <p className="text-sm text-text-secondary mb-3">
                      The v25.0 era emphasizes System User Tokens created within Meta Business Manager. These tokens are permanent and do not expire, providing a stable backbone for production systems.
                    </p>
                    <div className="rounded-lg bg-surface/50 p-3 font-mono text-sm text-text-secondary">
                      Required permissions: <code className="text-brand-primary">whatsapp_business_messaging</code>, <code className="text-brand-primary">whatsapp_business_management</code>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border/60 bg-white p-5">
                    <h4 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                      <Code className="h-5 w-5 text-brand-primary" />
                      Webhook Verification & Shadow Delivery
                    </h4>
                    <p className="text-sm text-text-secondary mb-3">
                      A common issue is &quot;Shadow Delivery&quot; where an API call returns HTTP 200 OK, but the message is never delivered. The 200 OK only confirms Meta has accepted the request, not that it has delivered the message.
                    </p>
                    <div className="rounded-lg bg-gray-900 p-4 overflow-x-auto">
                      <pre className="text-sm text-green-400">
{`// Example: Processing Webhook Deliveries in v25.0
app.post('/webhook', (req, res) => {
  const entry = req.body.entry;
  const changes = entry.changes.value;

  if (changes.statuses) {
    changes.statuses.forEach(status => {
      // Update message status in CRM
      updateMessageStatus(status.id, status.status);
      // 'sent', 'delivered', 'read'
    });
  }
  res.sendStatus(200);
});`}
                      </pre>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border/60 bg-white p-5">
                    <h4 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-brand-primary" />
                      Template Pagination & Error Handling
                    </h4>
                    <p className="text-sm text-text-secondary">
                      Graph API v24.0 introduced specific error codes for &quot;Outdated Pagination Cursors.&quot; Developers should subscribe to the <code className="text-brand-primary">message_template_status_update</code> webhook field for real-time template approval notifications.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Industry-Specific Impact */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  Industry-Specific Impact
                </h2>
                <p className="text-text-secondary">
                  The evolution into version 25.0 creates diverse opportunities and challenges across different vertical markets.
                </p>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-border/60 bg-white p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600 mb-4">
                      <Globe className="h-5 w-5" />
                    </div>
                    <h4 className="font-semibold text-text-primary mb-2">E-Commerce</h4>
                    <p className="text-sm text-text-secondary mb-3">
                      WhatsApp Flows + Advantage+ Catalog Ads create a seamless shopping loop with 60% lower drop-off rates.
                    </p>
                    <Badge className="bg-purple-100 text-purple-700 border-purple-200">Mini-Store Conversions</Badge>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-white p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 mb-4">
                      <Shield className="h-5 w-5" />
                    </div>
                    <h4 className="font-semibold text-text-primary mb-2">Fintech & Banking</h4>
                    <p className="text-sm text-text-secondary mb-3">
                      Build &quot;Hybrid Identity&quot; systems: phone numbers for authentication, BSUID for support and marketing.
                    </p>
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200">Identity Dilemma</Badge>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-white p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600 mb-4">
                      <Users className="h-5 w-5" />
                    </div>
                    <h4 className="font-semibold text-text-primary mb-2">Healthcare</h4>
                    <p className="text-sm text-text-secondary mb-3">
                      100MB file sharing for diagnostic reports. AI agents for Symptom Triage reduce call center load.
                    </p>
                    <Badge className="bg-green-100 text-green-700 border-green-200">Telemedicine Triage</Badge>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Actionable Recommendations */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  Actionable Recommendations
                </h2>
                <p className="text-text-secondary">
                  To stay competitive and leverage the full potential of these updates, businesses must take the following steps:
                </p>

                <div className="space-y-4">
                  {[
                    {
                      step: "1",
                      title: "Immediate Identity Audit",
                      description: "Update CRM databases to support BSUID alongside traditional phone numbers before June 2026 to prevent Identity Blindness.",
                      priority: "Critical",
                    },
                    {
                      step: "2",
                      title: "Infrastructure Consolidation",
                      description: "Ensure all systems are fully migrated to Cloud API. On-Premises support has ended—this is the only way to access 100K baseline.",
                      priority: "Critical",
                    },
                    {
                      step: "3",
                      title: "Optimize for Portfolio Pacing",
                      description: "Redesign campaigns for quality over quantity. Use warm-up batches and monitor feedback signals via webhooks.",
                      priority: "High",
                    },
                    {
                      step: "4",
                      title: "Embrace Flows and AI",
                      description: "Transition from static notifications to interactive Flows and context-aware AI agents. Move from Reading a Message to Completing a Task.",
                      priority: "High",
                    },
                    {
                      step: "5",
                      title: "Budget for Per-Message Model",
                      description: "Audit template usage for correct categorization. Use Click-to-WhatsApp ads to maximize 72-hour free windows.",
                      priority: "Medium",
                    },
                  ].map((item, index) => (
                    <div key={index} className="rounded-xl border border-border/60 bg-white p-5">
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-white font-bold shrink-0">
                          {item.step}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-text-primary">{item.title}</h4>
                            <Badge className={`
                              ${item.priority === "Critical" ? "bg-red-100 text-red-700 border-red-200" : ""}
                              ${item.priority === "High" ? "bg-amber-100 text-amber-700 border-amber-200" : ""}
                              ${item.priority === "Medium" ? "bg-blue-100 text-blue-700 border-blue-200" : ""}
                              text-xs
                            `}>
                              {item.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-text-secondary">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Conclusion */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  Conclusion
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  The transition from version 24.0 to 25.0 of the WhatsApp Business Graph API is not a routine software update but a fundamental reimagining of the business messaging relationship. The shift toward a privacy-first identity model (BSUID), the elimination of scaling friction (100K Baseline), and the introduction of advanced conversational logic (Flows and AI) represent a comprehensive maturation of the platform.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  The future of WhatsApp messaging is characterized by intelligence, privacy, and seamless commerce. Businesses that proactively adapt to these changes will gain a significant competitive advantage in the evolving landscape of enterprise communication.
                </p>

                <div className="rounded-2xl border border-brand-primary/20 bg-gradient-to-r from-brand-primary/5 to-brand-primary/10 p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-3">Ready to Migrate?</h3>
                  <p className="text-sm text-text-secondary mb-4">
                    Whats91 provides complete migration support for businesses transitioning to Graph API v25.0. Our team handles BSUID mapping, Cloud API setup, and campaign optimization.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/contact">
                      <Button className="bg-brand-primary hover:bg-brand-primary/90">
                        Contact Sales <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                    <Link href="/whatsapp-templates">
                      <Button variant="outline">Explore Templates</Button>
                    </Link>
                  </div>
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
                <ShareSection title="WhatsApp Graph API v24 to v25: Complete Migration Guide for Enterprise" />
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
