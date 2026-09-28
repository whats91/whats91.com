import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { BookDemoPopup } from "@/components/landing/BookDemoPopup";
import { Card, CardContent } from "@/components/ui/card";
import { JsonLd } from "@/lib/seo/JsonLd";
import {
  generateBreadcrumbSchema,
  generateOrganizationSchema,
  generatePageMetadata,
  siteConfig,
} from "@/lib/seo/config";
import {
  Users,
  Target,
  Heart,
  Lightbulb,
  Shield,
  MessageCircle,
  Globe,
  Award,
  Zap,
  Building2,
  Mail,
  Phone,
  Linkedin,
  Twitter
} from "lucide-react";

const pagePath = "/about";
const pageUrl = `${siteConfig.url}${pagePath}`;

export const metadata: Metadata = generatePageMetadata({
  title: "About Whats91 | WhatsApp Cloud API Platform for India",
  description:
    "Whats91 helps Indian enterprises run WhatsApp Cloud API communication at scale. Learn our story, values, milestones, and product focus.",
  keywords: [
    "about Whats91",
    "Whats91 company",
    "WhatsApp Cloud API provider India",
    "WhatsApp Cloud API company",
    "Whats91 leadership team",
  ],
  path: pagePath,
});

const structuredData = [
  generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About", url: pagePath },
  ]),
  generateOrganizationSchema(),
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: "About Whats91",
    description:
      "Whats91 company overview covering our mission, values, milestones, and team building WhatsApp Cloud API tools for Indian enterprises.",
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
  },
];

const stats = [
  { value: "500+", label: "Enterprise Clients", icon: Building2 },
  { value: "10M+", label: "Messages Monthly", icon: MessageCircle },
  { value: "Cloud", label: "Hosted Messaging API", icon: Zap },
  { value: "India", label: "Business Support", icon: Globe },
];

const values = [
  {
    icon: Target,
    title: "Customer First",
    description: "Every decision we make starts with our customers. Their success is our success, and we're committed to delivering solutions that truly make a difference."
  },
  {
    icon: Lightbulb,
    title: "Innovation Driven",
    description: "We continuously push boundaries to bring cutting-edge WhatsApp solutions to Indian enterprises, staying ahead of the curve in technology and service."
  },
  {
    icon: Shield,
    title: "Trust & Security",
    description: "Data security isn't an afterthought—it's built into everything we do. We maintain the highest standards of compliance and protection."
  },
  {
    icon: Heart,
    title: "Passionate Team",
    description: "Our team lives and breathes communication technology. We're passionate about helping businesses transform how they connect with customers."
  },
];

const milestones = [
  {
    year: "2020",
    title: "Founded",
    description: "Whats91 was established with a vision to simplify WhatsApp Business API for Indian enterprises."
  },
  {
    year: "2021",
    title: "Cloud API Focus",
    description: "Expanded services around Meta-hosted WhatsApp Cloud API workflows."
  },
  {
    year: "2022",
    title: "Busy ERP Integration",
    description: "Launched our flagship integration with Busy Accounting Software, serving 200+ businesses."
  },
  {
    year: "2023",
    title: "Enterprise Scale",
    description: "Crossed 500+ enterprise clients, processing millions of messages monthly."
  },
  {
    year: "2024",
    title: "Pan-India Presence",
    description: "Expanded operations across India with dedicated support teams in multiple cities."
  },
  {
    year: "2025",
    title: "AI & Automation",
    description: "Introduced AI-powered chatbots and advanced automation features for enterprise clients."
  },
];

const team = [
  {
    name: "Rahul Sharma",
    role: "Founder & CEO",
    bio: "15+ years in enterprise software. Previously led product teams at major tech companies.",
    linkedin: "#",
    twitter: "#"
  },
  {
    name: "Priya Patel",
    role: "CTO",
    bio: "Expert in cloud architecture and API design. Built scalable systems serving millions of users.",
    linkedin: "#",
    twitter: "#"
  },
  {
    name: "Amit Kumar",
    role: "VP of Engineering",
    bio: "12+ years in software development. Specializes in real-time communication systems.",
    linkedin: "#",
    twitter: "#"
  },
  {
    name: "Sneha Gupta",
    role: "Head of Customer Success",
    bio: "Passionate about customer experience. Led CS teams at multiple SaaS companies.",
    linkedin: "#",
    twitter: "#"
  },
];

export default function AboutPage() {
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
                About Whats91
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-6">
                Transforming How Indian Businesses{" "}
                <span className="text-brand-primary">Connect</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed mb-8">
                We're on a mission to make enterprise communication seamless through WhatsApp. 
                We help businesses of all sizes use Meta-hosted WhatsApp Cloud API 
                for marketing, support, and automation.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <BookDemoPopup
                  triggerVariant="default"
                  triggerSize="lg"
                  triggerLabel="Book a Demo"
                  source="about-hero"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 sm:py-16 bg-surface/50 border-y border-border/60">
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 mb-4">
                    <stat.icon className="h-6 w-6 text-brand-primary" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-text-secondary">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-14 sm:py-16 md:py-20">
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-text-secondary leading-relaxed">
                  <p>
                    <strong className="text-text-primary">Whats91</strong> was born from a simple observation: 
                    Indian businesses were struggling to leverage WhatsApp for enterprise communication. 
                    The official API was complex, documentation was scattered, and integration required 
                    significant technical expertise.
                  </p>
                  <p>
                    We set out to change that. Starting with our flagship Busy ERP integration in 2020, 
                    we've grown to serve over 500 enterprises across India—from SMEs to large corporations. 
                    Our platform now processes millions of messages monthly, helping businesses automate 
                    invoices, payment reminders, support queries, and marketing campaigns.
                  </p>
                  <p>
                    We build on the <strong className="text-text-primary">Meta-hosted WhatsApp Cloud API</strong> 
                    and help customers configure it for practical business workflows. Our team is dedicated to making WhatsApp 
                    communication accessible, affordable, and impactful for every Indian business.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-brand-primary/10 to-brand-accent/5 border border-border/60 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="flex h-20 w-20 mx-auto items-center justify-center rounded-2xl bg-brand-primary shadow-lg shadow-brand-primary/30 mb-6">
                      <MessageCircle className="h-10 w-10 text-white" />
                    </div>
                    <div className="text-4xl sm:text-5xl font-bold text-text-primary mb-2">Whats91</div>
                    <div className="text-sm text-text-secondary">WhatsApp Cloud API Platform</div>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-4 py-2 text-xs font-medium text-brand-primary">
                      <Award className="h-3.5 w-3.5" />
                      ERP, messaging, and automation
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-14 sm:py-16 md:py-20 bg-surface/30">
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Our Core Values
              </h2>
              <p className="text-sm sm:text-base text-text-secondary max-w-2xl mx-auto">
                These principles guide every decision we make and every interaction we have with our clients and partners.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="border-border/60 hover:border-brand-primary/30 hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 mb-4 group-hover:bg-brand-primary/15 transition-colors">
                      <value.icon className="h-6 w-6 text-brand-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">{value.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-14 sm:py-16 md:py-20">
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Our Journey
              </h2>
              <p className="text-sm sm:text-base text-text-secondary max-w-2xl mx-auto">
                From a small team with a big idea to a leading WhatsApp Business solution provider.
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-border/60 transform sm:-translate-x-1/2" />
              
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`relative flex items-start gap-6 ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                    {/* Timeline dot */}
                    <div className="absolute left-4 sm:left-1/2 w-3 h-3 bg-brand-primary rounded-full transform -translate-x-1/2 mt-1.5" />
                    
                    {/* Content */}
                    <div className={`ml-12 sm:ml-0 sm:w-1/2 ${index % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'}`}>
                      <div className="bg-surface/50 rounded-xl border border-border/60 p-5 hover:border-brand-primary/30 transition-colors">
                        <div className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-medium text-brand-primary mb-2">
                          {milestone.year}
                        </div>
                        <h3 className="text-lg font-semibold text-text-primary mb-1">{milestone.title}</h3>
                        <p className="text-sm text-text-secondary">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-14 sm:py-16 md:py-20 bg-surface/30">
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Leadership Team
              </h2>
              <p className="text-sm sm:text-base text-text-secondary max-w-2xl mx-auto">
                Meet the people driving innovation and excellence at Whats91.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <Card key={index} className="border-border/60 hover:border-brand-primary/30 hover:shadow-lg transition-all duration-300 group overflow-hidden">
                  <CardContent className="p-6">
                    {/* Avatar placeholder */}
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-primary/20 to-brand-accent/10 flex items-center justify-center mb-4 mx-auto">
                      <span className="text-xl font-bold text-brand-primary">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-text-primary mb-1">{member.name}</h3>
                      <p className="text-sm text-brand-primary font-medium mb-3">{member.role}</p>
                      <p className="text-xs text-text-secondary leading-relaxed mb-4">{member.bio}</p>
                      
                      <div className="flex items-center justify-center gap-3">
                        <a href={member.linkedin} className="text-text-muted hover:text-brand-primary transition-colors">
                          <Linkedin className="h-4 w-4" />
                        </a>
                        <a href={member.twitter} className="text-text-muted hover:text-brand-primary transition-colors">
                          <Twitter className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Office Section */}
        <section className="py-14 sm:py-16 md:py-20">
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Our Offices
              </h2>
              <p className="text-sm sm:text-base text-text-secondary max-w-2xl mx-auto">
                Serving clients across India from our strategic locations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* HQ */}
              <Card className="border-border/60 hover:border-brand-primary/30 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 shrink-0">
                      <Building2 className="h-5 w-5 text-brand-primary" />
                    </div>
                    <div>
                      <div className="inline-flex items-center rounded-full bg-brand-primary/10 px-2 py-0.5 text-[10px] font-medium text-brand-primary mb-2">
                        Headquarters
                      </div>
                      <h3 className="font-semibold text-text-primary mb-2">Mumbai, Maharashtra</h3>
                      <p className="text-sm text-text-secondary">
                        131, C21 Mall, Ujjain<br />
                        Madhya Pradesh, 456010
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact */}
              <Card className="border-border/60 hover:border-brand-primary/30 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 shrink-0">
                      <Phone className="h-5 w-5 text-brand-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary mb-2">Contact Us</h3>
                      <div className="space-y-1 text-sm text-text-secondary">
                        <p>Sales: +91 96698 23388</p>
                        <p>Support: +91 93028 19026</p>
                        <p>Technical: +91 70007 82082</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Email */}
              <Card className="border-border/60 hover:border-brand-primary/30 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 shrink-0">
                      <Mail className="h-5 w-5 text-brand-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary mb-2">Email</h3>
                      <div className="space-y-1 text-sm text-text-secondary">
                        <p>General: hello@whats91.com</p>
                        <p>Support: support@whats91.com</p>
                        <p>Careers: careers@whats91.com</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-14 sm:py-16 md:py-20 bg-gradient-to-br from-brand-primary via-brand-primary to-brand-accent">
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Communication?
            </h2>
            <p className="text-base sm:text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Join 500+ enterprises using Whats91 to power their WhatsApp communication.
            </p>
            <BookDemoPopup
              triggerVariant="default"
              triggerSize="lg"
              triggerLabel="Get Started Today"
              source="about-cta"
              triggerClassName="bg-white text-brand-700 hover:bg-white/95"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
