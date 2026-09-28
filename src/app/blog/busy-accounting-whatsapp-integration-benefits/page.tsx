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
  Receipt,
  FileText,
  Truck,
  Users,
  Bot,
  Send,
  DollarSign,
  Zap,
  CalendarCheck,
  MessageCircle,
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

export default function BusyAccountingIntegrationPage() {
  const postSlug = "busy-accounting-whatsapp-integration-benefits";

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
                <span className="text-text-primary font-medium truncate max-w-[200px]">Busy Accounting Integration</span>
              </nav>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <Badge className="bg-blue-100 text-blue-700 border-blue-200 border text-sm px-3 py-1">ERP Integration</Badge>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-text-primary mb-5 leading-tight">
                5 Ways WhatsApp Integration Transforms Busy Accounting Workflows
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-base sm:text-lg text-text-secondary mb-6 leading-relaxed max-w-3xl">
                Discover how integrating WhatsApp with Busy Accounting Software automates invoice delivery, payment reminders, and customer inquiries. Real examples from Indian businesses.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-wrap items-center gap-2">
                <Tag className="h-4 w-4 text-text-muted" />
                {["Busy Accounting", "ERP Integration", "Automation", "Chatbot"].map((tag) => (
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
                    <p className="text-sm font-medium text-text-primary">Jan 10, 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-white p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                    <Clock4 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Reading time</p>
                    <p className="text-sm font-medium text-text-primary">8 minutes</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-white p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Category</p>
                    <p className="text-sm font-medium text-text-primary">ERP Integration</p>
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
                    "Automate invoice and receipt delivery via WhatsApp",
                    "Reduce accounts receivable calls by 50%",
                    "Enable 24/7 customer self-service for balance inquiries",
                    "Bill-by-bill ledger sharing with PDF attachments",
                    "Real-time bilty and dispatch updates",
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
            
            {/* Section 1: The Problem */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  The Traditional Workflow Problem
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  Indian businesses using Busy Accounting Software process thousands of invoices, receipts, and ledgers daily. Yet many still rely on manual follow-ups, phone calls, and printed statements.
                </p>

                <div className="rounded-2xl border border-border/60 bg-white overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-surface/50">
                        <th className="p-4 text-left font-semibold text-text-primary">Task</th>
                        <th className="p-4 text-left font-semibold text-text-primary">Current Process</th>
                        <th className="p-4 text-left font-semibold text-text-primary">Time/Day</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {[
                        ["Invoice Delivery", "Print, scan, email, or WhatsApp manually", "2-3 hours"],
                        ["Payment Reminders", "Phone calls to each customer", "1-2 hours"],
                        ["Balance Inquiries", 'Daily calls asking "What\'s my outstanding?"', "2-3 hours"],
                        ["Ledger Requests", "Generate PDF, find email, send, follow up", "1 hour"],
                        ["Receipt Sharing", "Print, scan, send individually", "30 min"],
                      ].map(([task, process, time], i) => (
                        <tr key={i} className="bg-white">
                          <td className="p-4 text-sm font-medium text-text-primary">{task}</td>
                          <td className="p-4 text-sm text-text-secondary">{process}</td>
                          <td className="p-4 text-sm text-brand-primary font-medium">{time}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-brand-primary/5">
                        <td colSpan={2} className="p-4 text-sm font-semibold text-text-primary">Total Time on Manual Tasks</td>
                        <td className="p-4 text-sm font-bold text-brand-primary">6-9 hours/day</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </FadeIn>

            {/* Section 2: 5 Transformation Benefits */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  5 Transformation Benefits
                </h2>

                {/* Benefit 1 */}
                <div className="rounded-2xl border border-border/60 bg-white p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary text-white font-bold text-lg">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-text-primary">Automated Invoice & Receipt Delivery</h3>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 mb-6">
                    <div className="rounded-xl bg-red-50 border border-red-100 p-4">
                      <p className="text-xs font-semibold text-red-600 mb-2">BEFORE (Manual)</p>
                      <ol className="space-y-1 text-sm text-text-secondary">
                        <li>1. Create invoice in Busy</li>
                        <li>2. Export to PDF</li>
                        <li>3. Open WhatsApp on phone</li>
                        <li>4. Find customer contact</li>
                        <li>5. Attach PDF & type message</li>
                        <li>6. Send</li>
                      </ol>
                    </div>
                    <div className="rounded-xl bg-green-50 border border-green-100 p-4">
                      <p className="text-xs font-semibold text-green-600 mb-2">AFTER (Automated)</p>
                      <ol className="space-y-1 text-sm text-text-secondary">
                        <li>1. Create invoice in Busy</li>
                        <li>2. Save → Invoice automatically sent!</li>
                      </ol>
                    </div>
                  </div>

                  <h4 className="font-semibold text-text-primary mb-2">What the Customer Receives</h4>
                  <ul className="grid gap-2 sm:grid-cols-2 mb-6">
                    {["Invoice PDF attachment", "Order details summary", "Payment link (optional)", "Due date reminder"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                        <CheckCircle2 className="h-4 w-4 text-brand-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="rounded-xl border border-brand-primary/20 bg-brand-primary/5 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-text-primary">Daily Time Saved</p>
                        <p className="text-xs text-text-muted">100% automated delivery</p>
                      </div>
                      <p className="text-2xl font-bold text-brand-primary">2-3 hrs</p>
                    </div>
                  </div>
                </div>

                {/* Benefit 2 */}
                <div className="rounded-2xl border border-border/60 bg-white p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary text-white font-bold text-lg">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-text-primary">24/7 Balance Inquiry Chatbot</h3>
                    </div>
                  </div>

                  <div className="rounded-xl bg-surface/50 p-4 mb-6">
                    <p className="text-sm text-text-secondary mb-3"><strong>Customer sends:</strong> "Hi" or "Balance" on WhatsApp</p>
                    <p className="text-sm text-text-secondary"><strong>Bot responds instantly:</strong></p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 mb-6">
                    {[
                      { label: "Outstanding Balance", example: "Your current outstanding: ₹77,000" },
                      { label: "Last Payment", example: "Last payment: ₹50,000 on 20 Dec 2024" },
                      { label: "Due Date", example: "Next due date: 15 Jan 2026" },
                      { label: "Quick Actions", example: "[Get Ledger] [Recent Bills]" },
                    ].map((item, i) => (
                      <div key={i} className="rounded-lg border border-border/60 bg-white p-3">
                        <p className="text-xs text-text-muted mb-1">{item.label}</p>
                        <p className="text-sm text-text-primary">{item.example}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-border/60 overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-surface/50">
                          <th className="p-3 text-left text-sm font-semibold text-text-primary">Metric</th>
                          <th className="p-3 text-left text-sm font-semibold text-text-primary">Before</th>
                          <th className="p-3 text-left text-sm font-semibold text-text-primary">After</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60">
                        <tr className="bg-white">
                          <td className="p-3 text-sm text-text-secondary">Balance inquiry calls/day</td>
                          <td className="p-3 text-sm text-text-secondary">50</td>
                          <td className="p-3 text-sm text-brand-primary font-medium">8</td>
                        </tr>
                        <tr className="bg-white">
                          <td className="p-3 text-sm text-text-secondary">Customer wait time</td>
                          <td className="p-3 text-sm text-text-secondary">5-15 min</td>
                          <td className="p-3 text-sm text-brand-primary font-medium">Instant</td>
                        </tr>
                        <tr className="bg-white">
                          <td className="p-3 text-sm text-text-secondary">Support hours saved</td>
                          <td className="p-3 text-sm text-text-secondary">—</td>
                          <td className="p-3 text-sm text-brand-primary font-medium">3+ hrs/day</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Benefit 3 */}
                <div className="rounded-2xl border border-border/60 bg-white p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary text-white font-bold text-lg">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-text-primary">Bill-by-Bill Ledger on Demand</h3>
                    </div>
                  </div>

                  <p className="text-text-secondary mb-4">Customer taps "Get Ledger" button and receives complete transaction history:</p>

                  <div className="rounded-xl border border-border/60 overflow-hidden mb-6">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-surface/50">
                          <th className="p-3 text-left font-semibold text-text-primary">Date</th>
                          <th className="p-3 text-left font-semibold text-text-primary">Reference</th>
                          <th className="p-3 text-left font-semibold text-text-primary">Debit</th>
                          <th className="p-3 text-left font-semibold text-text-primary">Credit</th>
                          <th className="p-3 text-left font-semibold text-text-primary">Balance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60">
                        {[
                          ["05 Jan", "INV-2501", "₹45,000", "—", "₹45,000"],
                          ["28 Dec", "INV-2452", "₹32,000", "—", "₹77,000"],
                          ["20 Dec", "REC-1205", "—", "₹50,000", "₹27,000"],
                        ].map(([date, ref, debit, credit, balance], i) => (
                          <tr key={i} className="bg-white">
                            <td className="p-3 text-text-secondary">{date}</td>
                            <td className="p-3 text-text-secondary">{ref}</td>
                            <td className="p-3 text-text-secondary">{debit}</td>
                            <td className="p-3 text-text-secondary">{credit}</td>
                            <td className="p-3 font-medium text-text-primary">{balance}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <ul className="grid gap-2 sm:grid-cols-2">
                    {["Complete transaction history", "PDF format for easy sharing", "Bill-by-bill breakdown", "Running balance", "Date range customization"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                        <CheckCircle2 className="h-4 w-4 text-brand-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits 4 & 5 */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-2xl border border-border/60 bg-white p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary text-white font-bold text-lg">
                        4
                      </div>
                      <h3 className="text-lg font-bold text-text-primary">Automated Payment Reminders</h3>
                    </div>
                    <div className="space-y-2">
                      {[
                        { timing: "7 days before", message: "Friendly reminder" },
                        { timing: "3 days before", message: "Payment reminder" },
                        { timing: "On due date", message: "Urgent reminder" },
                        { timing: "1-7 days overdue", message: "Follow-up" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between rounded-lg bg-surface/50 p-2.5">
                          <span className="text-xs font-medium text-text-primary">{item.timing}</span>
                          <Badge variant="outline" className="text-xs">{item.message}</Badge>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 rounded-lg bg-brand-primary/5 p-3">
                      <p className="text-sm font-semibold text-brand-primary">ROI: 30-40% faster collections</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border/60 bg-white p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary text-white font-bold text-lg">
                        5
                      </div>
                      <h3 className="text-lg font-bold text-text-primary">Bilty & Dispatch Updates</h3>
                    </div>
                    <p className="text-sm text-text-secondary mb-4">Customer taps "Bilty Status" and receives:</p>
                    <ul className="space-y-2">
                      {[
                        "Transport Name",
                        "LR/Bilty Number",
                        "Dispatch Date",
                        "Expected Delivery",
                        "Current Status",
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                          <CheckCircle2 className="h-4 w-4 text-brand-primary shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 rounded-lg bg-brand-primary/5 p-3">
                      <p className="text-sm font-semibold text-brand-primary">Reduce "Where's my order?" calls by 80%</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Section 3: Real Example */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  Real Business Example: Sharma Distributors, Delhi
                </h2>

                <div className="grid gap-4 sm:grid-cols-4 mb-6">
                  {[
                    { label: "Business Type", value: "FMCG Distribution" },
                    { label: "Customer Base", value: "500+ retailers" },
                    { label: "Daily Invoices", value: "80-100" },
                    { label: "Staff", value: "8 people" },
                  ].map((item, i) => (
                    <div key={i} className="rounded-xl border border-border/60 bg-white p-4 text-center">
                      <p className="text-xs text-text-muted mb-1">{item.label}</p>
                      <p className="font-semibold text-text-primary">{item.value}</p>
                    </div>
                  ))}
                </div>

                <h3 className="text-lg font-semibold text-text-primary">Results After 3 Months</h3>
                <div className="rounded-2xl border border-border/60 bg-white overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-surface/50">
                        <th className="p-4 text-left font-semibold text-text-primary">Metric</th>
                        <th className="p-4 text-left font-semibold text-text-primary">Before</th>
                        <th className="p-4 text-left font-semibold text-text-primary">After</th>
                        <th className="p-4 text-left font-semibold text-text-primary">Change</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {[
                        ["Balance inquiry calls/day", "50", "8", "-84%"],
                        ["Invoice delivery time", "2-3 hours", "Instant", "-100%"],
                        ["Collection timeline", "45 days", "29 days", "-36%"],
                        ["Staff productivity", "—", "3 hrs/day saved", "Significant"],
                      ].map(([metric, before, after, change], i) => (
                        <tr key={i} className="bg-white">
                          <td className="p-4 text-sm text-text-primary">{metric}</td>
                          <td className="p-4 text-sm text-text-secondary">{before}</td>
                          <td className="p-4 text-sm text-text-secondary">{after}</td>
                          <td className="p-4 text-sm font-medium text-brand-primary">{change}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="rounded-xl bg-brand-primary text-white p-4 text-center">
                  <p className="text-sm font-medium">ROI: Investment recovered in 2 months</p>
                </div>
              </div>
            </FadeIn>

            {/* Section 4: Implementation */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  Implementation Timeline
                </h2>

                <div className="space-y-4">
                  {[
                    { week: 1, title: "WhatsApp Business account setup", tasks: ["Number verification", "Profile configuration"] },
                    { week: 2, title: "Busy data mapping & configuration", tasks: ["Account mapping", "Template design"] },
                    { week: 3, title: "Chatbot menu customization", tasks: ["Response flows", "Button configuration"] },
                    { week: 4, title: "Go-live & team training", tasks: ["Testing", "Staff onboarding"] },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 rounded-xl border border-border/60 bg-white p-5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary text-white text-sm font-bold">
                        W{item.week}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-text-primary mb-2">{item.title}</h4>
                        <div className="flex flex-wrap gap-2">
                          {item.tasks.map((task, j) => (
                            <Badge key={j} variant="outline" className="text-xs">{task}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Section 5: ROI */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary pb-3 border-b border-border/50">
                  Cost vs. ROI Analysis
                </h2>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-2xl border border-border/60 bg-white p-6">
                    <h4 className="font-semibold text-text-primary mb-4">Typical Investment</h4>
                    <div className="space-y-3">
                      {[
                        { size: "Small (≤100 customers)", cost: "₹8,000-12,000/mo" },
                        { size: "Medium (100-500 customers)", cost: "₹15,000-25,000/mo" },
                        { size: "Large (500+ customers)", cost: "₹30,000+/mo" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between rounded-lg bg-surface/50 p-3">
                          <span className="text-sm text-text-secondary">{item.size}</span>
                          <span className="text-sm font-semibold text-text-primary">{item.cost}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-brand-primary/20 bg-brand-primary/5 p-6">
                    <h4 className="font-semibold text-text-primary mb-4">Monthly Savings Example</h4>
                    <div className="space-y-3">
                      {[
                        { label: "Staff time saved", value: "₹15,000+" },
                        { label: "Reduced call costs", value: "₹3,000+" },
                        { label: "Faster collections value", value: "₹10,000+" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between rounded-lg bg-white p-3">
                          <span className="text-sm text-text-secondary">{item.label}</span>
                          <span className="text-sm font-semibold text-brand-primary">{item.value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-brand-primary/20">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-text-primary">Net Monthly Benefit</span>
                        <span className="text-xl font-bold text-brand-primary">₹8,000+</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Key Takeaways */}
            <FadeIn>
              <div className="rounded-2xl bg-gradient-to-br from-brand-primary to-brand-primary/80 p-6 sm:p-8 text-white">
                <h2 className="text-xl sm:text-2xl font-bold mb-6">Key Takeaways</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    "Automate invoices first — Quickest win, immediate time savings",
                    "Balance inquiry bot — Reduces 50% of support calls",
                    "Payment reminders — Improves collections by 30-40%",
                    "Ledger on demand — Eliminates disputes, builds trust",
                    "ROI is fast — Most businesses see positive returns in 2-3 months",
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
                <ShareSection title="5 Ways WhatsApp Integration Transforms Busy Accounting Workflows" />
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
