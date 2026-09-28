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
  AlertTriangle,
  Shield,
  Smartphone,
  Monitor,
  RefreshCw,
  Building2,
  ChevronRight,
  Share2,
  Copy,
  Check,
  Zap,
  Server,
  MessageCircle,
  Users,
  XCircle,
  ArrowLeftRight,
  Building,
  CreditCard,
  TrendingUp,
  Settings,
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

export default function WhatsAppUnofficialAPIMigrationGuide() {
  const postSlug = "whatsapp-web-6-hour-logout-unofficial-api-migration-guide";

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
                <span className="text-text-primary font-medium truncate max-w-[200px]">Unofficial API Migration Guide</span>
              </nav>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <Badge className="bg-green-100 text-green-700 border-green-200 border text-sm px-3 py-1">WhatsApp API</Badge>
                <Badge className="bg-gradient-to-r from-brand-primary to-brand-primary/80 text-white border-0 text-sm px-3 py-1">Migration Guide</Badge>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-text-primary mb-5 leading-tight">
                WhatsApp Web 6-Hour Logout: Impact on Unofficial APIs & Complete Migration Guide
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-base sm:text-lg text-text-secondary mb-6 leading-relaxed max-w-3xl">
                How the new 6-hour logout rule affects unofficial WhatsApp APIs, and a complete guide to migrating to the official WhatsApp Cloud API with co-existing or brand name options.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-wrap items-center gap-2">
                <Tag className="h-4 w-4 text-text-muted" />
                {["WhatsApp API", "Cloud API", "Unofficial API", "Migration", "6-Hour Rule", "Official API"].map((tag) => (
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
                    <p className="text-sm font-medium text-text-primary">Feb 28, 2026</p>
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
                    "How the 6-hour logout rule directly impacts unofficial WhatsApp APIs",
                    "Why unofficial APIs cannot bypass the new session limitations",
                    "Two official API options: Co-Existing Mode vs Brand Name Mode",
                    "Cost considerations and long-term pricing plans",
                    "Step-by-step migration path from unofficial to official API",
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
            
            {/* Section 1: What is the 6-Hour Rule */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  What is the 6-Hour Logout Rule?
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  India's Department of Telecommunications (DoT) has introduced regulations under the <strong className="text-text-primary">Telecom Cyber Security Rules</strong> that fundamentally change how WhatsApp Web and desktop applications function in the country.
                </p>
                <div className="rounded-xl border border-brand-primary/20 bg-brand-primary/5 p-6">
                  <p className="text-text-primary font-medium mb-2">The core requirement:</p>
                  <p className="text-text-secondary">Any WhatsApp Web or desktop session must be forcibly logged out no later than <strong className="text-brand-primary">6 hours after it was linked</strong>.</p>
                </div>
                
                {/* Key Facts Table */}
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
                          <td className="p-4 font-medium text-text-primary bg-surface/50 w-1/3">{label}</td>
                          <td className="p-4 text-text-secondary">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </FadeIn>

            {/* Section 2: Impact on Unofficial APIs */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  Impact on Unofficial WhatsApp APIs
                </h2>
                
                <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-6 w-6 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-red-800 mb-2">Critical Impact</h3>
                      <p className="text-red-700">If you're using an unofficial WhatsApp API for business automation, the 6-hour rule directly affects your operations.</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-text-primary">How Unofficial APIs Work</h3>
                <p className="text-text-secondary leading-relaxed">
                  Unofficial WhatsApp APIs operate by <strong className="text-text-primary">mimicking WhatsApp Web behavior</strong>. They establish a persistent connection to WhatsApp's servers, essentially acting like a browser that never closes. This allows them to:
                </p>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { icon: Server, title: "Maintain Persistent Sessions", desc: "Keep connections alive indefinitely, just like an open browser tab" },
                    { icon: MessageCircle, title: "Send Automated Messages", desc: "Trigger messages from ERPs, CRMs, and business software" },
                    { icon: RefreshCw, title: "Sync in Real-Time", desc: "Receive messages and updates without manual intervention" },
                    { icon: Shield, title: "Bypass Official Channels", desc: "Operate outside Meta's official API infrastructure" },
                  ].map((item, i) => (
                    <div key={i} className="rounded-xl border border-border/60 bg-white p-5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 mb-3">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <h4 className="font-semibold text-text-primary mb-1">{item.title}</h4>
                      <p className="text-sm text-text-secondary">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-semibold text-text-primary mt-8">Why the 6-Hour Rule Breaks Unofficial APIs</h3>
                
                {/* Visual Diagram */}
                <div className="rounded-2xl border border-border/60 bg-white p-6">
                  <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
                    <div className="text-center">
                      <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-2">
                        <Server className="h-8 w-8 text-slate-600" />
                      </div>
                      <p className="text-sm font-medium text-text-primary">Unofficial API</p>
                      <p className="text-xs text-text-muted">Mimics web client</p>
                    </div>
                    <ArrowRight className="h-6 w-6 text-slate-400 rotate-90 md:rotate-0" />
                    <div className="text-center">
                      <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-2">
                        <Monitor className="h-8 w-8 text-slate-600" />
                      </div>
                      <p className="text-sm font-medium text-text-primary">WhatsApp Web</p>
                      <p className="text-xs text-text-muted">Session-based</p>
                    </div>
                    <ArrowRight className="h-6 w-6 text-slate-400 rotate-90 md:rotate-0" />
                    <div className="text-center">
                      <div className="h-16 w-16 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-2">
                        <RefreshCw className="h-8 w-8 text-red-600" />
                      </div>
                      <p className="text-sm font-medium text-red-600">6-Hour Disconnect</p>
                      <p className="text-xs text-red-500">Forced termination</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                  <h4 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Business Impact
                  </h4>
                  <ul className="space-y-2">
                    {[
                      "Payment reminders stop working mid-cycle",
                      "Invoice notifications fail to deliver",
                      "ERP integrations break every 6 hours",
                      "Customer support workflows disrupted",
                      "No workaround exists for unofficial APIs",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-sm text-amber-800">
                        <XCircle className="h-4 w-4 text-red-500 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  <strong className="text-text-primary">The fundamental problem:</strong> Unofficial APIs cannot bypass this rule because they rely on the same web session mechanism that WhatsApp Web uses. When the session is forcibly terminated, the API connection is also cut, regardless of any "keep-alive" mechanisms.
                </p>
              </div>
            </FadeIn>

            {/* Section 3: The Solution - Official Cloud API */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  The Solution: Official WhatsApp Cloud API
                </h2>
                
                <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-green-800 mb-2">Bypass Session Limits Entirely</h3>
                      <p className="text-green-700">The official WhatsApp Cloud API operates server-side and is not affected by web session limitations.</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-text-primary">Why Cloud API is Immune</h3>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-green-200 bg-green-50/50 p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600 mb-3">
                      <Server className="h-5 w-5" />
                    </div>
                    <h4 className="font-semibold text-text-primary mb-2">Server-Side Operation</h4>
                    <p className="text-sm text-text-secondary">Cloud API runs on Meta's infrastructure, not in a browser session. No web session = no 6-hour limit.</p>
                  </div>
                  <div className="rounded-xl border border-green-200 bg-green-50/50 p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600 mb-3">
                      <Shield className="h-5 w-5" />
                    </div>
                    <h4 className="font-semibold text-text-primary mb-2">Official Infrastructure</h4>
                    <p className="text-sm text-text-secondary">Built and maintained by Meta, ensuring compliance with all regulations and continuous uptime.</p>
                  </div>
                  <div className="rounded-xl border border-green-200 bg-green-50/50 p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600 mb-3">
                      <RefreshCw className="h-5 w-5" />
                    </div>
                    <h4 className="font-semibold text-text-primary mb-2">No Re-authentication</h4>
                    <p className="text-sm text-text-secondary">Once configured, the API runs continuously without requiring QR code scans or phone access.</p>
                  </div>
                  <div className="rounded-xl border border-green-200 bg-green-50/50 p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600 mb-3">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <h4 className="font-semibold text-text-primary mb-2">Cloud API Reliability</h4>
                    <p className="text-sm text-text-secondary">Meta-hosted messaging without browser-session QR dependencies; any numerical SLA must come from the applicable service agreement.</p>
                  </div>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  We offer official WhatsApp Cloud API services to help businesses transition from unstable unofficial solutions. <strong className="text-text-primary">This eliminates logout issues entirely</strong> and provides a stable, compliant messaging infrastructure.
                </p>
              </div>
            </FadeIn>

            {/* Section 4: Official API Option 1 - Co-Existing Mode */}
            <FadeIn>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-white font-bold">
                    1
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
                    Official API: Co-Existing Mode
                  </h2>
                </div>
                
                <div className="rounded-xl border border-brand-primary/20 bg-brand-primary/5 p-5">
                  <p className="text-text-secondary">
                    <strong className="text-text-primary">Best for:</strong> Businesses that want to keep using their WhatsApp mobile app while adding automated messaging capabilities.
                  </p>
                </div>

                <h3 className="text-xl font-semibold text-text-primary">What is Co-Existing Mode?</h3>
                <p className="text-text-secondary leading-relaxed">
                  Co-Existing Mode allows you to use <strong className="text-text-primary">both the WhatsApp Business mobile app AND the WhatsApp Cloud API simultaneously</strong>. Your phone stays active for manual chatting, while the Cloud API handles automated messages from your ERP or business software.
                </p>

                {/* Visual: Co-Existing */}
                <div className="rounded-2xl border border-border/60 bg-white p-6">
                  <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                    <div className="text-center">
                      <div className="h-20 w-20 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-3 relative">
                        <Smartphone className="h-10 w-10 text-green-600" />
                        <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
                          <CheckCircle2 className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-text-primary">Mobile App</p>
                      <p className="text-xs text-text-muted">Active & usable</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="h-12 w-12 rounded-full bg-brand-primary/10 flex items-center justify-center mx-auto">
                        <span className="text-brand-primary font-bold text-lg">+</span>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="h-20 w-20 rounded-2xl bg-brand-primary/10 flex items-center justify-center mx-auto mb-3 relative">
                        <Server className="h-10 w-10 text-brand-primary" />
                        <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
                          <CheckCircle2 className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-text-primary">Cloud API</p>
                      <p className="text-xs text-text-muted">Automated messaging</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-text-primary">How It Works</h3>
                <div className="space-y-4">
                  {[
                    { step: 1, title: "Keep Your Mobile App Active", desc: "Continue using WhatsApp Business on your phone as usual. All your chats remain accessible." },
                    { step: 2, title: "Connect Cloud API", desc: "We configure the official Cloud API on the same number. No account deletion required." },
                    { step: 3, title: "Dual Messaging Channels", desc: "Send/receive manually on phone, while automated messages flow through Cloud API." },
                    { step: 4, title: "Seamless Customer Experience", desc: "Customers see the same number regardless of whether you reply manually or via automation." },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 rounded-xl border border-border/60 bg-white p-5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary text-white text-sm font-bold shadow-md shadow-brand-primary/20">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-primary mb-1">{item.title}</h4>
                        <p className="text-sm text-text-secondary">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-semibold text-text-primary">Benefits</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { icon: CheckCircle2, text: "No chat history loss", color: "green" },
                    { icon: CheckCircle2, text: "Continue using mobile app", color: "green" },
                    { icon: CheckCircle2, text: "Seamless transition", color: "green" },
                    { icon: CheckCircle2, text: "Automated + manual messaging", color: "green" },
                    { icon: CheckCircle2, text: "Same phone number", color: "green" },
                    { icon: CheckCircle2, text: "No re-authentication needed", color: "green" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-sm text-text-secondary">
                      <item.icon className="h-4 w-4 text-green-600 shrink-0" />
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Section 5: Official API Option 2 - Brand Name Mode */}
            <FadeIn>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-white font-bold">
                    2
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
                    Official API: Brand Name Mode
                  </h2>
                </div>
                
                <div className="rounded-xl border border-purple-200 bg-purple-50 p-5">
                  <p className="text-text-secondary">
                    <strong className="text-text-primary">Best for:</strong> Businesses that want a professional brand presence and full automation without mobile app dependency.
                  </p>
                </div>

                <h3 className="text-xl font-semibold text-text-primary">What is Brand Name Mode?</h3>
                <p className="text-text-secondary leading-relaxed">
                  In this mode, your WhatsApp account is configured <strong className="text-text-primary">exclusively for the Cloud API</strong>. Instead of showing your phone number to customers, WhatsApp displays your <strong className="text-brand-primary">brand name</strong> (e.g., "Wats91" or your company name).
                </p>

                {/* Visual: Brand Name Display */}
                <div className="rounded-2xl border border-border/60 bg-white p-6">
                  <h4 className="text-center font-medium text-text-muted mb-4">How Customers See You</h4>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                    <div className="text-center">
                      <div className="rounded-xl border border-border/60 bg-slate-50 p-4 mb-2">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold text-sm">
                            W91
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-text-primary">Wats91</p>
                            <p className="text-xs text-text-muted">Official Business Account</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-green-600 font-medium">✓ Brand Name Display</p>
                    </div>
                    <div className="text-center text-slate-400">vs</div>
                    <div className="text-center">
                      <div className="rounded-xl border border-border/60 bg-slate-50 p-4 mb-2">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm">
                            +91
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-text-primary">+91 98765 43210</p>
                            <p className="text-xs text-text-muted">Phone Number</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500">Standard Number Display</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                  <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Important Requirements
                  </h4>
                  <ul className="space-y-2">
                    {[
                      "You must delete your existing WhatsApp account from your phone",
                      "All chat history will be LOST (unless you choose a fresh new number)",
                      "The number is configured for Cloud API only — no mobile app access",
                      "You cannot use the mobile app to view or respond to chats",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-sm text-red-800">
                        <XCircle className="h-4 w-4 text-red-500 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <h3 className="text-xl font-semibold text-text-primary">How It Works</h3>
                <div className="space-y-4">
                  {[
                    { step: 1, title: "Delete Existing Account", desc: "Remove WhatsApp from your phone. Chats will be lost unless using a fresh number." },
                    { step: 2, title: "Configure Cloud API", desc: "We set up the number exclusively for official Cloud API with your brand name." },
                    { step: 3, title: "Respond via Portal", desc: "All customer messages are received in our web portal. You respond from there — not your phone." },
                    { step: 4, title: "Use Template Messages", desc: "For first contact outside the 24-hour service window, use pre-approved template messages." },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 rounded-xl border border-border/60 bg-white p-5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-600 text-white text-sm font-bold shadow-md shadow-purple-600/20">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-primary mb-1">{item.title}</h4>
                        <p className="text-sm text-text-secondary">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-semibold text-text-primary">Template Message Requirements</h3>
                <div className="rounded-xl border border-border/60 bg-white p-5">
                  <p className="text-text-secondary mb-4">
                    When initiating contact outside the 24-hour service window, you must use <strong className="text-text-primary">template messages</strong> that have been pre-approved by Meta.
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg bg-slate-50 p-4">
                      <p className="text-sm font-medium text-text-primary mb-1">Within 24-hour Window</p>
                      <p className="text-xs text-text-muted">Free-form messages allowed</p>
                    </div>
                    <div className="rounded-lg bg-amber-50 p-4 border border-amber-200">
                      <p className="text-sm font-medium text-amber-800 mb-1">Outside 24-hour Window</p>
                      <p className="text-xs text-amber-700">Template message required</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-text-primary">Benefits & Trade-offs</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-green-200 bg-green-50/50 p-5">
                    <h4 className="font-semibold text-green-800 mb-3">Benefits</h4>
                    <ul className="space-y-2">
                      {[
                        "Professional brand name display",
                        "No phone dependency",
                        "Fully automated messaging",
                        "Highest stability & compliance",
                        "No session management",
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-green-700">
                          <CheckCircle2 className="h-4 w-4 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-5">
                    <h4 className="font-semibold text-amber-800 mb-3">Trade-offs</h4>
                    <ul className="space-y-2">
                      {[
                        "No mobile app access",
                        "Chat history lost (unless new number)",
                        "Must respond via web portal",
                        "Template approval for first contact",
                        "Higher setup complexity",
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-amber-700">
                          <AlertTriangle className="h-4 w-4 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Section 6: Comparison Table */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  Comparison: Which Option is Right for You?
                </h2>
                
                <div className="overflow-x-auto">
                  <div className="rounded-2xl border border-border/60 overflow-hidden min-w-[600px]">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-surface/50">
                          <th className="p-4 text-left font-semibold text-text-primary">Feature</th>
                          <th className="p-4 text-left font-semibold text-red-600">Unofficial API</th>
                          <th className="p-4 text-left font-semibold text-brand-primary">Co-Existing</th>
                          <th className="p-4 text-left font-semibold text-purple-600">Brand Name</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60">
                        {[
                          ["6-hour logout impact", "✗ Affected", "✓ Not affected", "✓ Not affected"],
                          ["Mobile app access", "✗ No", "✓ Yes", "✗ No"],
                          ["Chat history retained", "✗ Varies", "✓ Yes", "✗ Lost*"],
                          ["Brand name display", "✗ No", "✗ No", "✓ Yes"],
                          ["Template messages", "Not required", "Not required", "Required**"],
                          ["Respond via", "Software only", "Phone + Portal", "Portal only"],
                          ["Setup complexity", "Low", "Medium", "Higher"],
                          ["Long-term stability", "✗ Declining", "✓ Stable", "✓ Most stable"],
                          ["Official compliance", "✗ No", "✓ Yes", "✓ Yes"],
                        ].map(([feature, unofficial, coexist, brand], i) => (
                          <tr key={i} className="bg-white">
                            <td className="p-4 font-medium text-text-primary">{feature}</td>
                            <td className="p-4 text-text-secondary">{unofficial}</td>
                            <td className="p-4 text-brand-primary font-medium">{coexist}</td>
                            <td className="p-4 text-purple-600 font-medium">{brand}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <p className="text-xs text-text-muted">
                  * Unless using a fresh new number for Brand Name mode. ** Template messages required for first contact outside 24-hour service window.
                </p>
              </div>
            </FadeIn>

            {/* Section 7: Should You Switch? */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  Should You Switch to Official API?
                </h2>
                
                <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
                  <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    The Reality for Unofficial API Users
                  </h3>
                  <ul className="space-y-2 text-red-700">
                    <li>• Unofficial APIs will <strong>gradually be discontinued</strong> as enforcement increases</li>
                    <li>• Repeated logouts will become more frequent and disruptive</li>
                    <li>• Meta is actively blocking unofficial API connections</li>
                    <li>• Business-critical automations will face unpredictable downtime</li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  <strong className="text-text-primary">The long-term perspective:</strong> While unofficial APIs may seem convenient and cost-effective now, they are becoming increasingly unreliable. A stable official API reduces long-term headaches, even though costs increase over time.
                </p>

                <h3 className="text-xl font-semibold text-text-primary">Why Costs Increase with Official API</h3>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-border/60 bg-white p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600 mb-3">
                      <Settings className="h-5 w-5" />
                    </div>
                    <h4 className="font-semibold text-text-primary mb-2">Template Verification</h4>
                    <p className="text-sm text-text-secondary">Each message template must be reviewed and approved by Meta before use. This adds processing time and verification requirements.</p>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-white p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600 mb-3">
                      <Building className="h-5 w-5" />
                    </div>
                    <h4 className="font-semibold text-text-primary mb-2">Portfolio Setup</h4>
                    <p className="text-sm text-text-secondary">Initial setup includes business verification, a small dummy website for Meta review, and documentation submission.</p>
                  </div>
                </div>

                <div className="rounded-xl border border-brand-primary/20 bg-brand-primary/5 p-5">
                  <h4 className="font-semibold text-text-primary mb-2">The Good News</h4>
                  <p className="text-text-secondary">
                    Once your portfolio is established and verified, your messages remain <strong className="text-brand-primary">stable and official</strong>, eliminating future issues with session limits, logouts, or API blocks.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Section 8: Pricing & Long-Term Plans */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  Pricing & Long-Term Plans
                </h2>
                
                <p className="text-text-secondary leading-relaxed">
                  We offer flexible pricing options to suit different business needs. Longer-term plans significantly reduce the per-period cost.
                </p>

                <div className="grid gap-4 sm:grid-cols-3">
                  {/* Monthly */}
                  <div className="rounded-2xl border border-border/60 bg-white p-6">
                    <div className="text-center mb-4">
                      <p className="text-sm text-text-muted mb-1">Monthly</p>
                      <p className="text-3xl font-bold text-text-primary">Pay as you go</p>
                    </div>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center gap-2 text-sm text-text-secondary">
                        <CheckCircle2 className="h-4 w-4 text-brand-primary" />
                        Full API access
                      </li>
                      <li className="flex items-center gap-2 text-sm text-text-secondary">
                        <CheckCircle2 className="h-4 w-4 text-brand-primary" />
                        Standard support
                      </li>
                      <li className="flex items-center gap-2 text-sm text-text-secondary">
                        <CheckCircle2 className="h-4 w-4 text-brand-primary" />
                        No commitment
                      </li>
                    </ul>
                    <p className="text-xs text-text-muted text-center">Best for testing</p>
                  </div>

                  {/* 2-Year */}
                  <div className="rounded-2xl border-2 border-brand-primary bg-brand-primary/5 p-6 relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-brand-primary text-white border-0">Popular</Badge>
                    </div>
                    <div className="text-center mb-4">
                      <p className="text-sm text-brand-primary mb-1">2-Year Plan</p>
                      <p className="text-3xl font-bold text-text-primary">20% off</p>
                      <p className="text-xs text-text-muted">per billing period</p>
                    </div>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center gap-2 text-sm text-text-secondary">
                        <CheckCircle2 className="h-4 w-4 text-brand-primary" />
                        Full API access
                      </li>
                      <li className="flex items-center gap-2 text-sm text-text-secondary">
                        <CheckCircle2 className="h-4 w-4 text-brand-primary" />
                        Priority support
                      </li>
                      <li className="flex items-center gap-2 text-sm text-text-secondary">
                        <CheckCircle2 className="h-4 w-4 text-brand-primary" />
                        Price locked for 2 years
                      </li>
                    </ul>
                    <p className="text-xs text-brand-primary font-medium text-center">Best value for growing businesses</p>
                  </div>

                  {/* 3-Year */}
                  <div className="rounded-2xl border border-purple-200 bg-purple-50 p-6">
                    <div className="text-center mb-4">
                      <p className="text-sm text-purple-600 mb-1">3-Year Plan</p>
                      <p className="text-3xl font-bold text-text-primary">35% off</p>
                      <p className="text-xs text-text-muted">per billing period</p>
                    </div>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center gap-2 text-sm text-text-secondary">
                        <CheckCircle2 className="h-4 w-4 text-purple-600" />
                        Full API access
                      </li>
                      <li className="flex items-center gap-2 text-sm text-text-secondary">
                        <CheckCircle2 className="h-4 w-4 text-purple-600" />
                        Dedicated support
                      </li>
                      <li className="flex items-center gap-2 text-sm text-text-secondary">
                        <CheckCircle2 className="h-4 w-4 text-purple-600" />
                        Maximum stability
                      </li>
                    </ul>
                    <p className="text-xs text-purple-600 font-medium text-center">Best for enterprise</p>
                  </div>
                </div>

                <div className="rounded-xl border border-border/60 bg-white p-5">
                  <h4 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-brand-primary" />
                    One-Time Setup Costs
                  </h4>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand-primary" />
                      Business verification with Meta
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand-primary" />
                      Portfolio documentation preparation
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand-primary" />
                      Dummy website for verification (if needed)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand-primary" />
                      API configuration and testing
                    </li>
                  </ul>
                </div>
              </div>
            </FadeIn>

            {/* Section 9: Key Takeaways */}
            <FadeIn>
              <div className="rounded-2xl bg-gradient-to-br from-brand-primary to-brand-primary/80 p-6 sm:p-8 text-white">
                <h2 className="text-xl sm:text-2xl font-bold mb-6">Key Takeaways</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    "The 6-hour rule directly impacts unofficial APIs — no workaround exists",
                    "Official Cloud API is the only stable, compliant solution",
                    "Two options: Co-existing (keep mobile) or Brand Name (full migration)",
                    "Setup costs exist but ensure long-term stability and compliance",
                    "Early migration means smoother transition — don't wait for disruptions",
                    "Long-term plans (2-3 years) offer significant cost savings",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-white/80 shrink-0 mt-0.5" />
                      <span className="text-sm text-white/90">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/20">
                  <h3 className="font-semibold mb-4">Ready to Migrate?</h3>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="bg-white text-brand-primary hover:bg-white/90 font-semibold">
                      Contact Us for Migration <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      Request a Demo
                    </Button>
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
                <ShareSection title="WhatsApp Web 6-Hour Logout: Impact on Unofficial APIs & Complete Migration Guide" />
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
