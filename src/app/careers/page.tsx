import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { JsonLd } from "@/lib/seo/JsonLd";
import {
  generateBreadcrumbSchema,
  generatePageMetadata,
  siteConfig,
} from "@/lib/seo/config";
import {
  Users,
  Heart,
  Coffee,
  TrendingUp,
  Home,
  GraduationCap,
  ExternalLink,
  Building2,
  Laptop,
  Gift,
} from "lucide-react";
import { OpenPositionsClient } from "./OpenPositionsClient";

const pagePath = "/careers";
const pageUrl = `${siteConfig.url}${pagePath}`;

export const metadata: Metadata = generatePageMetadata({
  title: "Careers at Whats91 | Join Our Team",
  description:
    "Explore open roles at Whats91 across Engineering, Product, Sales, Marketing, and Customer Success. Build the future of WhatsApp Cloud API communication for Indian enterprises.",
  keywords: [
    "Whats91 careers",
    "Whats91 jobs",
    "WhatsApp API company jobs",
    "Whats91 hiring",
    "software engineer jobs Mumbai",
  ],
  path: pagePath,
});

const structuredData = [
  generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Careers", url: pagePath },
  ]),
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: "Careers at Whats91",
    description:
      "Open positions and team culture at Whats91, building WhatsApp Cloud API communication tools for Indian enterprises.",
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
  },
];

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health insurance, mental health support, and wellness programs"
  },
  {
    icon: Home,
    title: "Remote Flexibility",
    description: "Hybrid work model with flexible hours and remote-first culture"
  },
  {
    icon: TrendingUp,
    title: "Growth Opportunities",
    description: "Learning budgets, conference attendance, and clear career paths"
  },
  {
    icon: Coffee,
    title: "Perks & Benefits",
    description: "Free meals, gym membership, and team outings"
  },
  {
    icon: GraduationCap,
    title: "Learning & Development",
    description: "Access to courses, certifications, and mentorship programs"
  },
  {
    icon: Gift,
    title: "Competitive Compensation",
    description: "Market-leading salaries with ESOPs and performance bonuses"
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <JsonLd data={structuredData} />
      <Header />
      <main className="flex-1">

        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 sm:py-20 md:py-24">
          <div className="absolute inset-0 gradient-brand-subtle pointer-events-none" />

          <div className="relative px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
            <div className="text-center max-w-3xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 border border-brand-primary/15 px-4 py-1.5 text-xs sm:text-sm font-medium text-brand-primary mb-6">
                <Users className="h-3.5 w-3.5" />
                Join Our Team
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-6">
                Build the Future of{" "}
                <span className="text-brand-primary">Enterprise Communication</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed">
                We're looking for passionate people to help us transform how Indian businesses
                communicate with their customers. Join a team that values innovation, growth, and impact.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-10 sm:py-12 bg-surface/50 border-y border-border/60">
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-text-primary mb-1">30+</div>
                <div className="text-sm text-text-secondary">Team Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-text-primary mb-1">5</div>
                <div className="text-sm text-text-secondary">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-text-primary mb-1">500+</div>
                <div className="text-sm text-text-secondary">Enterprise Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-text-primary mb-1">4.8★</div>
                <div className="text-sm text-text-secondary">Glassdoor Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-14 sm:py-16 md:py-20">
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Why Work With Us
              </h2>
              <p className="text-sm sm:text-base text-text-secondary max-w-2xl mx-auto">
                We believe in taking care of our team so they can do their best work. Here's what you can expect.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-border/60 hover:border-brand-primary/30 hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 mb-4 group-hover:bg-brand-primary/15 transition-colors">
                      <benefit.icon className="h-6 w-6 text-brand-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">{benefit.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions Section */}
        <section className="py-14 sm:py-16 md:py-20 bg-surface/30">
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Open Positions
              </h2>
              <p className="text-sm sm:text-base text-text-secondary max-w-2xl mx-auto">
                Find the role that's right for you. We're always looking for talented people.
              </p>
            </div>

            <OpenPositionsClient />
          </div>
        </section>

        {/* Culture Section */}
        <section className="py-14 sm:py-16 md:py-20">
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-6">
                  Our Culture
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-text-secondary leading-relaxed">
                  <p>
                    At Whats91, we believe great products come from great teams. Our culture is built on
                    <strong className="text-text-primary"> trust, transparency, and collaboration</strong>.
                  </p>
                  <p>
                    We're a remote-first company that values outcomes over hours. Our team members have
                    the flexibility to work from anywhere while staying connected through regular sync-ups,
                    team offsites, and virtual social events.
                  </p>
                  <p>
                    We encourage experimentation and learning from failures. Everyone's voice matters,
                    and we actively seek diverse perspectives to build better solutions for our customers.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Laptop className="h-4 w-4 text-brand-primary" />
                    Remote-first
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Coffee className="h-4 w-4 text-brand-primary" />
                    Unlimited PTO
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <GraduationCap className="h-4 w-4 text-brand-primary" />
                    Learning budget
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-brand-primary/20 to-brand-accent/10 border border-border/40 flex items-center justify-center">
                    <Building2 className="h-12 w-12 text-brand-primary/60" />
                  </div>
                  <div className="aspect-video rounded-2xl bg-gradient-to-br from-brand-primary/10 to-brand-accent/5 border border-border/40 flex items-center justify-center">
                    <Users className="h-10 w-10 text-brand-primary/40" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="aspect-video rounded-2xl bg-gradient-to-br from-brand-primary/10 to-brand-accent/5 border border-border/40 flex items-center justify-center">
                    <Coffee className="h-10 w-10 text-brand-primary/40" />
                  </div>
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-brand-primary/20 to-brand-accent/10 border border-border/40 flex items-center justify-center">
                    <Heart className="h-12 w-12 text-brand-primary/60" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-14 sm:py-16 md:py-20 bg-gradient-to-br from-brand-primary via-brand-primary to-brand-accent">
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Don't See Your Role?
            </h2>
            <p className="text-base sm:text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <Button
              size="lg"
              className="bg-white text-brand-700 hover:bg-white/95 font-semibold"
              asChild
            >
              <a href="mailto:careers@whats91.com">
                Send Your Resume
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
