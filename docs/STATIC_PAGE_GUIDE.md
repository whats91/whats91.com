# Static Page Development Guide for Whats91

This guide provides complete instructions for adding new static pages to the Whats91 website. Static pages include solution pages, pricing pages, contact pages, and other non-blog content pages.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Project Structure](#project-structure)
3. [Page Anatomy](#page-anatomy)
4. [Core Components](#core-components)
5. [Design Tokens & CSS Classes](#design-tokens--css-classes)
6. [Section Patterns](#section-patterns)
7. [Component Library Reference](#component-library-reference)
8. [Common Page Types](#common-page-types)
9. [SEO Implementation](#seo-implementation)
10. [Best Practices](#best-practices)

---

## Quick Start

To create a new static page:

1. **Create the page file** in the appropriate directory under `src/app/`
2. **Import required components** from `@/components/landing/` and `@/components/ui/`
3. **Use the standard layout wrapper** with Header and Footer
4. **Follow section patterns** for consistent design

### Minimal Page Template

```typescript
"use client";

import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function NewPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden py-14 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-surface/80 to-background">
          <div className="absolute inset-0 gradient-brand-subtle pointer-events-none" />
          <div className="relative px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 border border-brand-primary/15 px-4 py-1.5 text-xs sm:text-sm font-medium text-brand-primary mb-5">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Badge Text
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-5">
                Page Title Here
              </h1>
              <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-8">
                Descriptive subtitle that explains the page purpose.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button size="lg" className="h-12 px-7 bg-brand-primary text-brand-primary-foreground group">
                  Primary CTA
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-7 border-border/80">
                  Secondary CTA
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-border/60 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Card Title</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary">Card content here...</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
```

---

## Project Structure

### App Router Structure

```
src/app/
├── layout.tsx              # Root layout (fonts, providers)
├── page.tsx                # Home page
├── globals.css             # Global styles, CSS variables, animations
├── sitemap.ts              # Dynamic sitemap generator
│
├── blog/                   # Blog section (see BLOG_DEVELOPMENT_GUIDE.md)
│   ├── layout.tsx
│   ├── page.tsx
│   └── [slug]/page.tsx
│
├── contact/
│   └── page.tsx            # Contact form page
│
├── pricing/
│   └── page.tsx            # Pricing page
│
├── privacy/
│   └── page.tsx            # Privacy policy
│
├── terms/
│   └── page.tsx            # Terms of service
│
├── solutions/
│   ├── busy-erp/page.tsx
│   ├── busy-api/page.tsx
│   ├── busy-reports/page.tsx
│   ├── busy-google-sheet/page.tsx
│   ├── payment-reminders/page.tsx
│   ├── marketing/page.tsx
│   └── utility/page.tsx
│
└── api/
    ├── route.ts
    ├── contact/route.ts
    └── webhooks/github/route.ts
```

### Components Structure

```
src/components/
├── ui/                     # shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── textarea.tsx
│   ├── dialog.tsx
│   ├── sheet.tsx
│   └── ... (50+ components)
│
├── landing/                # Custom landing page components
│   ├── index.ts            # Re-exports all components
│   ├── Header.tsx          # Navigation header
│   ├── Footer.tsx          # Site footer
│   ├── Hero.tsx            # Home page hero
│   ├── Solutions.tsx       # Solutions grid
│   ├── BusyERP.tsx         # Busy ERP section
│   ├── Developers.tsx      # Developers section
│   ├── Security.tsx        # Security section
│   ├── ROI.tsx             # ROI calculator section
│   ├── FinalCTA.tsx        # Final call-to-action
│   ├── ContactCard.tsx     # Contact popup/card
│   └── Animated*.tsx       # Various animated components
│
└── blog/
    ├── index.ts
    └── BlogCard.tsx
```

---

## Page Anatomy

Every static page follows this structure:

```tsx
<div className="min-h-screen flex flex-col bg-background">
  <Header />
  <main className="flex-1">
    
    {/* 1. Hero Section */}
    <section className="...">...</section>
    
    {/* 2. Content Sections (alternating backgrounds) */}
    <section className="py-12 sm:py-16 md:py-20 bg-surface/50">...</section>
    <section className="py-12 sm:py-16 md:py-20">...</section>
    
    {/* 3. Final CTA Section */}
    <section className="py-14 sm:py-16 md:py-20">
      {/* Gradient CTA card */}
    </section>
    
  </main>
  <Footer />
</div>
```

### Section Backgrounds

Alternate between these backgrounds for visual rhythm:

```tsx
// Primary (white)
<section className="py-12 sm:py-16 md:py-20">

// Secondary (light gray)
<section className="py-12 sm:py-16 md:py-20 bg-surface/50">

// Warning/Special (light red)
<section className="py-12 sm:py-16 md:py-20 bg-red-50/50">

// Highlight (brand primary light)
<section className="py-12 sm:py-16 md:py-20 bg-brand-primary/5">
```

---

## Core Components

### Required Imports (Every Page)

```typescript
"use client";  // Required for client components

import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
```

### Optional Components

```typescript
// UI Components
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

// Landing Components
import { ContactCard } from "@/components/landing/ContactCard";
import { AnimatedChatbot } from "@/components/landing/AnimatedChatbot";

// Icons (from Lucide)
import { 
  ArrowRight, CheckCircle2, Clock, Zap, Shield, 
  MessageCircle, Phone, Mail, MapPin, Users,
  ChevronDown, ChevronUp, ChevronRight
} from "lucide-react";
```

---

## Design Tokens & CSS Classes

### Color System

```css
/* Brand Colors */
--brand-primary: #448C74;          /* Green - primary action color */
--brand-primary-hover: #3A7A64;    /* Darker green for hover */
--brand-primary-light: rgba(68, 140, 116, 0.08);
--brand-accent: #54a084;

/* Text Colors */
--text-primary: #0F172A;           /* Headlines */
--text-secondary: #475569;         /* Body text */
--text-muted: #64748B;             /* Captions, hints */

/* Background Colors */
--background: #FFFFFF;
--surface: #F8FAF9;
--border: #E2E8F0;
```

### Tailwind Classes Reference

```tsx
// Text colors
className="text-text-primary"      // Headlines
className="text-text-secondary"    // Body text
className="text-text-muted"        // Captions

// Background colors
className="bg-background"          // White
className="bg-surface"             // Light gray
className="bg-brand-primary"       // Brand green
className="bg-brand-primary/10"    // Light green

// Container width
className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8"

// Section padding
className="py-12 sm:py-16 md:py-20 lg:py-24"

// Card styling
className="rounded-2xl border border-border/60 bg-white p-6 shadow-lg"
className="rounded-xl border border-border/60 bg-white p-5 shadow-md"

// Gradient text
className="text-gradient"          // Brand gradient text

// Brand badge
className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 border border-brand-primary/15 px-4 py-1.5 text-xs sm:text-sm font-medium text-brand-primary"
```

### Custom CSS Classes (from globals.css)

```css
/* Gradients */
.gradient-brand-subtle      /* Light brand gradient background */
.gradient-subtle            /* Surface to background gradient */

/* Text */
.text-gradient              /* Brand color gradient text */

/* Cards */
.card-modern               /* Hover effect card */
.card-elevated             /* Elevated card with shadow */

/* Buttons */
.btn-modern                /* Modern button with shine effect */

/* Animations */
.animate-fade-in-up        /* Fade in from bottom */
.animate-fadeIn            /* Simple fade in */

/* Scrollbar */
.custom-scrollbar          /* Styled scrollbar */

/* Glass effect */
.glass-subtle              /* Frosted glass effect */
```

---

## Section Patterns

### 1. Hero Section Pattern

```tsx
<section className="relative overflow-hidden py-14 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-surface/80 to-background">
  <div className="absolute inset-0 gradient-brand-subtle pointer-events-none" />
  <div className="relative px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
    <div className="grid gap-10 lg:gap-14 lg:grid-cols-2 items-center">
      
      {/* Left Content */}
      <div className="text-center lg:text-left">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 border border-brand-primary/15 px-4 py-1.5 text-xs sm:text-sm font-medium text-brand-primary mb-5">
          <Icon className="h-3.5 w-3.5" />
          Badge Text
        </div>
        
        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-primary leading-[1.15] mb-5">
          Main Headline
        </h1>
        
        {/* Subheadline */}
        <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0">
          Descriptive text that explains the value proposition.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8">
          <Button size="lg" className="h-12 px-7 bg-brand-primary text-brand-primary-foreground group">
            Primary Action
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-7 border-border/80">
            Secondary Action
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-3">
          {["Badge 1", "Badge 2", "Badge 3"].map((badge, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs sm:text-sm text-text-muted bg-white/80 px-3 py-1.5 rounded-full border border-border/50">
              <CheckCircle2 className="h-3.5 w-3.5 text-brand-primary" />
              {badge}
            </div>
          ))}
        </div>
      </div>

      {/* Right Content (Visual/Stats) */}
      <div className="grid grid-cols-2 gap-4 sm:gap-5">
        {/* Stats cards or visual element */}
      </div>
    </div>
  </div>
</section>
```

### 2. Features Grid Pattern

```tsx
<section className="py-12 sm:py-16 md:py-20">
  <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
    <div className="text-center mb-10 sm:mb-12">
      <div className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 border border-brand-primary/10 px-4 py-1.5 text-xs sm:text-sm font-medium text-brand-primary mb-4">
        <Icon className="h-3.5 w-3.5" />
        Section Label
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-4">
        Section Title
      </h2>
      <p className="text-sm sm:text-base text-text-secondary max-w-2xl mx-auto">
        Section description text here.
      </p>
    </div>

    <div className="grid gap-6 md:grid-cols-2">
      {features.map((feature, index) => (
        <div key={index} className="group rounded-2xl border border-border/60 bg-white p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:border-brand-primary/20">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary mb-5 transition-transform duration-300 group-hover:scale-110">
            <feature.icon className="h-7 w-7" />
          </div>
          <h3 className="text-xl font-bold text-text-primary mb-3">{feature.title}</h3>
          <p className="text-sm sm:text-base text-text-secondary mb-4">{feature.description}</p>
          <div className="flex flex-wrap gap-2">
            {feature.features.map((f, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-brand-primary/5 text-xs font-medium text-brand-primary">
                {f}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

### 3. Comparison Table Pattern

```tsx
<section className="py-12 sm:py-16 bg-surface/50">
  <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
    <div className="text-center mb-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
        Comparison Title
      </h2>
    </div>

    <div className="rounded-2xl border border-border/60 bg-white overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-surface/80">
            <th className="text-left p-4 text-xs font-semibold text-text-muted uppercase">Column 1</th>
            <th className="text-center p-4 text-xs font-semibold text-brand-primary uppercase">Column 2</th>
            <th className="text-center p-4 text-xs font-semibold text-text-muted uppercase">Column 3</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-t border-border/60">
              <td className="p-4 text-sm text-text-primary font-medium">{row.col1}</td>
              <td className="p-4 text-sm text-center font-bold text-brand-primary">{row.col2}</td>
              <td className="p-4 text-sm text-center text-text-muted">{row.col3}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</section>
```

### 4. FAQ Accordion Pattern

```tsx
"use client";
import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

// In component:
const [openFaq, setOpenFaq] = useState<number | null>(null);

// JSX:
<section className="py-12 sm:py-16 md:py-20 bg-surface/50">
  <div className="px-4 sm:px-6 lg:px-8 max-w-[900px] mx-auto">
    <div className="text-center mb-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
        Frequently Asked Questions
      </h2>
    </div>

    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div key={index} className="rounded-xl border border-border/60 bg-white overflow-hidden">
          <button
            className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left"
            onClick={() => setOpenFaq(openFaq === index ? null : index)}
          >
            <span className="text-sm sm:text-base font-medium text-text-primary">{faq.q}</span>
            {openFaq === index ? (
              <ChevronUp className="h-5 w-5 text-brand-primary shrink-0" />
            ) : (
              <ChevronDown className="h-5 w-5 text-text-muted shrink-0" />
            )}
          </button>
          {openFaq === index && (
            <div className="px-4 sm:px-5 pb-4 sm:pb-5">
              <p className="text-sm text-text-secondary leading-relaxed">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
</section>
```

### 5. Final CTA Pattern

```tsx
<section className="py-14 sm:py-16 md:py-20">
  <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-brand-primary via-brand-primary to-brand-accent p-7 sm:p-8 md:p-12 lg:p-16 shadow-xl">
      
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-white/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
          CTA Headline
        </h2>
        <p className="text-base sm:text-lg text-white/90 mb-8">
          CTA description text here.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Button size="lg" className="h-12 px-7 bg-white text-brand-primary hover:bg-white/95 rounded-xl shadow-lg group">
            Primary CTA
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
          </Button>
          <ContactCard 
            variant="popup" 
            trigger={
              <Button size="lg" className="h-12 px-7 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 rounded-xl">
                Talk to Sales
              </Button>
            } 
          />
        </div>
      </div>
    </div>
  </div>
</section>
```

### 6. Steps/Timeline Pattern

```tsx
<section className="py-12 sm:py-16 md:py-20 bg-surface/50">
  <div className="px-4 sm:px-6 lg:px-8 max-w-[900px] mx-auto">
    <div className="text-center mb-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
        Quick Start Guide
      </h2>
    </div>

    <div className="space-y-4">
      {steps.map((item) => (
        <div key={item.step} className="flex items-start gap-4 rounded-xl border border-border/60 bg-white p-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-primary text-white text-sm font-bold shadow-md shadow-brand-primary/20">
            {item.step}
          </div>
          <div>
            <h4 className="text-base font-semibold text-text-primary mb-1">{item.title}</h4>
            <p className="text-sm text-text-secondary">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

### 7. Warning/Alert Section Pattern

```tsx
<section className="py-12 sm:py-16 md:py-20 bg-red-50/50">
  <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
    <div className="text-center mb-10">
      <div className="inline-flex items-center gap-2 rounded-full bg-red-100 border border-red-200 px-4 py-1.5 text-xs sm:text-sm font-medium text-red-700 mb-4">
        <AlertTriangle className="h-3.5 w-3.5" />
        Critical Warning
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
        Warning Title
      </h2>
    </div>

    <div className="rounded-xl border border-red-200 bg-white p-5 text-center">
      <p className="text-sm text-red-800">
        <AlertTriangle className="h-4 w-4 inline mr-2" />
        <strong>Important:</strong> Warning message here.
      </p>
    </div>
  </div>
</section>
```

---

## Component Library Reference

### shadcn/ui Components (Pre-installed)

```typescript
// Layout
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Forms
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Overlays
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Navigation
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Data Display
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Feedback
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

// Utility
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
```

### Landing Components

```typescript
// Navigation & Layout
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

// Contact
import { ContactCard } from "@/components/landing/ContactCard";
// Usage: <ContactCard variant="popup" trigger={<Button>Contact Us</Button>} />

// Animated Components
import { AnimatedChatbot } from "@/components/landing/AnimatedChatbot";
import { AnimatedAPIArchitecture } from "@/components/landing/AnimatedAPIArchitecture";
import { AnimatedPaymentReminder } from "@/components/landing/AnimatedPaymentReminder";
import { AnimatedReportPortal } from "@/components/landing/AnimatedReportPortal";
import { AnimatedReverseFlow } from "@/components/landing/AnimatedReverseFlow";
```

---

## Common Page Types

### Solution Page

Location: `src/app/solutions/[slug]/page.tsx`

Typical structure:
1. Hero with value proposition
2. Features/capabilities grid
3. How it works steps
4. Use cases/examples
5. Integration details
6. FAQ accordion
7. Final CTA

### Pricing Page

Location: `src/app/pricing/page.tsx`

Typical structure:
1. Hero with key pricing message
2. Rate card table
3. Volume tier tables
4. Comparison with competitors
5. Cost calculator (interactive)
6. FAQ
7. Final CTA

### Contact Page

Location: `src/app/contact/page.tsx`

Typical structure:
1. Hero with contact message
2. Contact form (left)
3. Contact info cards (right)
4. Business hours
5. Map/office location
6. Final CTA

### Legal Page (Privacy/Terms)

Location: `src/app/privacy/page.tsx` or `src/app/terms/page.tsx`

Typical structure:
1. Simple hero
2. Prose content sections
3. Last updated date

---

## SEO Implementation

### Server Component Metadata

```typescript
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/config";

export const metadata: Metadata = generatePageMetadata({
  title: "Page Title | Whats91",
  description: "Meta description here (150-160 characters)",
  keywords: ["keyword1", "keyword2", "keyword3"],
  path: "/your-page-path",
});
```

### Manual Metadata

```typescript
export const metadata: Metadata = {
  title: "Page Title | Whats91",
  description: "Meta description here",
  keywords: "keyword1, keyword2, keyword3",
  openGraph: {
    title: "Page Title | Whats91",
    description: "Meta description here",
    url: "https://whats91.com/your-page",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Page Title | Whats91",
    description: "Meta description here",
  },
};
```

### JSON-LD Structured Data

```typescript
import { generateBreadcrumbSchema, generateServiceSchema } from "@/lib/seo/config";

// In component:
const schemas = [
  generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Solutions", url: "/solutions" },
    { name: "Busy ERP", url: "/solutions/busy-erp" },
  ]),
  generateServiceSchema({
    name: "Busy ERP WhatsApp Integration",
    description: "Service description",
    url: "/solutions/busy-erp",
  }),
];

// In JSX:
{schemas.map((schema, index) => (
  <script
    key={index}
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
  />
))}
```

---

## Best Practices

### 1. Responsive Design

Always use responsive classes:

```tsx
// Typography
className="text-base sm:text-lg md:text-xl"
className="text-2xl sm:text-3xl md:text-4xl"

// Spacing
className="p-4 sm:p-6 md:p-8"
className="py-12 sm:py-16 md:py-20"
className="gap-4 sm:gap-6 md:gap-8"

// Layout
className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
className="flex flex-col sm:flex-row gap-3"
```

### 2. Accessibility

```tsx
// Always include alt text
<img src="..." alt="Description" />

// Use semantic HTML
<main>, <section>, <article>, <header>, <footer>

// Button accessibility
<Button aria-label="Action description">

// Screen reader only text
<span className="sr-only">Hidden text for screen readers</span>
```

### 3. Performance

```tsx
// Use "use client" only when needed
"use client";  // For interactivity, state, effects

// Keep server components static when possible
// Default (no directive) = server component
```

### 4. Animation Guidelines

```tsx
// Use CSS animations via Tailwind classes
className="transition-all duration-300"
className="group-hover:scale-110"

// Or use the custom animation classes
className="animate-fade-in-up"
className="animate-fadeIn"
```

### 5. Content Guidelines

- Headlines: Clear, benefit-focused
- Body copy: Concise, scannable
- CTAs: Action-oriented, specific
- Break up long content with subheadings, lists, and visuals

---

## Checklist for New Pages

- [ ] Created page file in correct directory
- [ ] Imported Header and Footer components
- [ ] Used consistent section padding pattern
- [ ] Alternated section backgrounds
- [ ] Included responsive classes for all sizes
- [ ] Added proper metadata/SEO
- [ ] Included Final CTA section
- [ ] Used brand color system (not arbitrary colors)
- [ ] Tested on mobile, tablet, and desktop views
- [ ] Added appropriate JSON-LD schema if needed
- [ ] Used semantic HTML structure
- [ ] Added alt text for any images
- [ ] Verified all links work correctly

---

## Quick Reference

### Container Width
```tsx
<div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
```

### Section Padding
```tsx
<section className="py-12 sm:py-16 md:py-20">
```

### Card Style
```tsx
<div className="rounded-2xl border border-border/60 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
```

### Button Primary
```tsx
<Button className="bg-brand-primary text-brand-primary-foreground hover:bg-brand-primary-hover">
```

### Badge
```tsx
<div className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 border border-brand-primary/15 px-4 py-1.5 text-xs sm:text-sm font-medium text-brand-primary">
```

### Section Title
```tsx
<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-4">
```

### Body Text
```tsx
<p className="text-sm sm:text-base text-text-secondary leading-relaxed">
```
