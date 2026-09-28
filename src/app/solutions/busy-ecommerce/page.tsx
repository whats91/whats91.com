import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { ContactCard } from "@/components/landing/ContactCard";
import { Badge } from "@/components/ui/badge";
import {
  Container,
  Section,
  SectionHeader,
  Eyebrow,
  CTAGroup,
  PrimaryCTA,
  SecondaryCTA,
  TrustPill,
  IconBadge,
} from "@/components/shared";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JsonLd } from "@/lib/seo/JsonLd";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generatePageMetadata,
  generateServiceSchema,
  siteConfig,
} from "@/lib/seo/config";
import {
  ShoppingCart,
  Users,
  Clock,
  Building2,
  Factory,
  Truck as TruckIcon,
  Store,
  Pill,
  Car,
  Package,
  CheckCircle2,
  Shield,
  Lock,
  RefreshCw,
  Globe,
  Smartphone,
  BarChart3,
  TrendingUp,
  CreditCard,
  FileText,
  Database,
  Layers,
  Settings,
  UserCheck,
  Scan,
  Wifi,
  Timer,
  Briefcase,
} from "lucide-react";

const pagePath = "/solutions/busy-ecommerce";
const pageUrl = `${siteConfig.url}${pagePath}`;
const seoTitle = "White-Label E-Commerce for Busy ERP | Whats91 Cloud API";
const seoDescription =
  "Turn Busy ERP into a branded e-commerce engine — 10-minute inventory sync, white-label B2B/B2C storefront, salesman portal, and customer self-service ledger view.";

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: seoTitle,
    description: seoDescription,
    keywords: [
      "Busy ERP E-Commerce Integration",
      "White-Label B2B Storefront",
      "Busy Accounting Online Ordering",
      "Salesman Order Portal",
      "Busy ERP Customer Self-Service",
    ],
    path: pagePath,
  }),
  alternates: { canonical: pageUrl },
};

const coreFeatures = [
  {
    icon: RefreshCw,
    title: "10-Minute Sync Engine",
    description: "Real-time inventory synchronization between Busy ERP and your e-commerce storefront every 10 minutes.",
    detail: "Eliminate phantom stock and overselling with automated stock updates.",
  },
  {
    icon: ShoppingCart,
    title: "White-Label Storefront",
    description: "Launch your own branded B2B/B2C portal under your domain with complete brand ownership.",
    detail: "Your brand, your customers, your domain - not a marketplace listing.",
  },
  {
    icon: Users,
    title: "Salesman Portal",
    description: "Empower field reps with masquerade ordering - place orders on behalf of customers during visits.",
    detail: "Live stock visibility, customer-specific pricing, instant order creation.",
  },
  {
    icon: FileText,
    title: "Customer Ledger View",
    description: "Self-service portal where B2B customers view outstanding balances and transaction history 24/7.",
    detail: "Reduce payment collection time by 50% with transparent account visibility.",
  },
];

const industryBenefits = [
  { icon: Car, name: "Auto Parts", busyFeature: "Parameterized Stock & Multi-location Tracking", ecommerceValue: "Live cataloging of thousands of SKUs with real-time stock status across all warehouses.", tags: ["Parameterized Search", "Vehicle Compatibility"] },
  { icon: Pill, name: "Pharmaceuticals", busyFeature: "Batch/Expiry Tracking & Drug License Management", ecommerceValue: "Prevent ordering expired stock, automated license verification, FIFO/FEFO compliance.", tags: ["Batch Tracking", "Compliance"] },
  { icon: Package, name: "FMCG", busyFeature: "Wholesale Management & Scheme/Offer Logic", ecommerceValue: "Automated tiered pricing, volume discounts, and 'Buy X Get Y' schemes applied automatically.", tags: ["Scheme Sync", "Volume Pricing"] },
  { icon: Store, name: "Retail (Garments)", busyFeature: "Size/Color/Variant Inventory & Point of Sale", ecommerceValue: "Seamless sync of variant-level availability across web and physical stores.", tags: ["Variant Sync", "Omni-channel"] },
  { icon: Factory, name: "Chemical", busyFeature: "Batch-wise Costing & Excise Duty Calculation", ecommerceValue: "Real-time calculation of landed costs for B2B buyers with batch-specific pricing.", tags: ["Batch Costing", "Excise"] },
  { icon: TruckIcon, name: "Distribution", busyFeature: "Multi-Godown Management", ecommerceValue: "Direct customer ordering with warehouse-specific inventory visibility.", tags: ["Multi-location", "Stock Allocation"] },
];

const comparisonData = [
  { feature: "Order Processing Time", traditional: "15-30 mins per order", integrated: "Instant (< 1 min)", improvement: "95% Faster" },
  { feature: "Inventory Accuracy", traditional: "70-80% (Human error)", integrated: "100% (System sync)", improvement: "20-30% More Accurate" },
  { feature: "Salesman Efficiency", traditional: "5 visits/day (Admin heavy)", integrated: "7-8 visits/day (Admin light)", improvement: "40-50% More Productive" },
  { feature: "Payment Collection", traditional: "30-45 days DSO", integrated: "15-20 days DSO", improvement: "50% Faster Cash Flow" },
  { feature: "Manual Data Entry", traditional: "100% manual", integrated: "Automated sync", improvement: "40% Work Reduction" },
];

const userPersonas = [
  {
    icon: Briefcase,
    title: "Field Salesman",
    subtitle: "Order on Behalf",
    features: ["Masquerade as customer to place orders", "Customer-specific pricing applied automatically", "Live stock visibility before committing delivery", "Order history for replenishment suggestions", "15-25% increase in Average Order Value"],
  },
  {
    icon: UserCheck,
    title: "B2B Customer",
    subtitle: "Self-Service Portal",
    features: ["OTP login - no password management", "View outstanding balances 24/7", "Real-time ledger statements", "Order tracking from Placed to Dispatched", "75% prefer self-service for reordering"],
  },
  {
    icon: BarChart3,
    title: "Business Owner",
    subtitle: "Operational Efficiency",
    features: ["Eliminate manual data entry nightmare", "Automated order flow to Busy ERP", "Scale without increasing headcount", "Better LTV:CAC ratio", "Real-time business insights"],
  },
];

const technicalFeatures = [
  { icon: Database, title: "Inventory Sync", desc: "Real-time stock status across all godowns" },
  { icon: FileText, title: "Product Masters", desc: "Automated creation of items and price updates" },
  { icon: ShoppingCart, title: "Order Conversion", desc: "Web orders pushed as Busy Sales Orders" },
  { icon: CreditCard, title: "Customer Ledger", desc: "Live balance and transaction history sync" },
  { icon: Scan, title: "Barcode Scanning", desc: "Scan products to add to cart instantly" },
  { icon: Wifi, title: "Offline-First", desc: "Capture orders offline, sync when connected" },
];

const whiteLabelBenefits = [
  { title: "Brand Ownership", impact: "Increased Customer Loyalty", reason: "Retention is 30% higher on personalized B2B portals" },
  { title: "Domain Autonomy", impact: "Improved SEO Authority", reason: "Organic traffic belongs to the business, not a marketplace" },
  { title: "Multi-Tenant Scalability", impact: "Lower Operational Costs", reason: "Launch multiple brands from one infrastructure with 90% cost reduction" },
  { title: "UI/UX Customization", impact: "Aligned User Experience", reason: "Tailor the interface to match existing brand guidelines" },
];

const syncParameters = [
  { parameter: "Inventory Levels", functionality: "Real-time stock status across all godowns", consequence: "Elimination of overselling and stockout errors" },
  { parameter: "Product Masters", functionality: "Automated creation of new items and price updates", consequence: "Zero manual data entry for large catalogs" },
  { parameter: "Order Conversion", functionality: "Web orders pushed as Busy Sales Orders", consequence: "Instant fulfillment and reduced processing time" },
  { parameter: "Customer Ledger", functionality: "Live balance and transaction history sync", consequence: "50% faster payment collection via transparency" },
];

const industries = [
  { icon: Building2, name: "Distributors & Wholesalers", description: "High-volume order management" },
  { icon: Factory, name: "Manufacturing", description: "Complex production & stock tracking" },
  { icon: TruckIcon, name: "Logistics & Transport", description: "Real-time dispatch monitoring" },
  { icon: Store, name: "Retail Chains", description: "Multi-location data consolidation" },
];

const faqs = [
  { q: "How does the 10-minute sync work with Busy ERP?", a: "Our sync engine connects to your Busy database every 10 minutes, pulling inventory updates, price changes, and new products while pushing web orders as Sales Orders. This ensures your e-commerce storefront is always a live reflection of your physical warehouse." },
  { q: "Can I use my own domain for the e-commerce portal?", a: "Absolutely. This is a white-label solution. Your customers access the portal at your domain (e.g., portal.yourcompany.com), reinforcing your brand authority. All organic traffic and SEO benefits belong to you, not a third-party marketplace." },
  { q: "How does the Salesman Portal 'masquerade' functionality work?", a: "Field sales reps can log in and select any customer account to place orders on their behalf. The system automatically applies that customer's specific pricing, tax slabs, credit limits, and scheme eligibility as defined in Busy ERP. It's like having the customer order themselves, but with the rep's guidance." },
  { q: "What happens when stock runs out during a sync interval?", a: "Our 10-minute sync interval is designed to minimize 'phantom stock' scenarios. If a product is ordered online but goes out of stock due to a counter sale, the system flags the order for review within minutes. This is far better than traditional daily sync systems where overselling is common." },
  { q: "Can customers see their Busy ledger and outstanding balance?", a: "Yes. The B2B Customer Portal includes a complete Ledger View showing outstanding balances, bill-wise transactions, and payment history - all pulled directly from Busy ERP. This transparency reduces payment collection time by 50% as customers can self-serve their account information." },
  { q: "Does the system handle Busy-specific features like batch tracking and schemes?", a: "Yes, this is our key differentiator. Generic e-commerce platforms don't understand Busy's batch-wise inventory, parameterized stock, or scheme management. Our solution respects all Busy logic - batch/expiry tracking, compound discounts, multi-unit pricing, and scheme application are all synchronized correctly." },
  { q: "How long does it take to set up the e-commerce integration?", a: "Typical implementation is 7-10 business days from signup to go-live. This includes connecting to your Busy database, configuring product sync, setting up customer logins, branding the storefront, and training your team. No local software installation required - it's fully cloud-based." },
  { q: "Can multiple companies in Busy use separate storefronts?", a: "Yes. Our multi-tenant architecture supports multiple companies with separate branded portals, each with strict data isolation. A single distributor can operate storefronts for different business units while maintaining complete separation of inventory, customers, and financial data." },
];

const onboardingSteps = [
  { step: 1, title: "Connect Busy ERP", description: "We configure secure API access to your Busy database" },
  { step: 2, title: "Design Your Storefront", description: "Apply your brand, domain, and customize product categories" },
  { step: 3, title: "Configure Sync Rules", description: "Set up inventory mapping, pricing logic, and order flow" },
  { step: 4, title: "Launch & Train", description: "Go live with full team training and ongoing support" },
];

const schemaData = [
  generateServiceSchema({
    name: "White-Label E-Commerce for Busy ERP",
    description: seoDescription,
    url: pageUrl,
  }),
  generateFAQSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
  generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Solutions", url: "/#solutions" },
    { name: "Busy E-Commerce", url: pagePath },
  ]),
];

export default function BusyEcommercePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <JsonLd data={schemaData} />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {/* Hero */}
        <Section tone="brand-soft" pad="lg">
          <Container>
            <div className="grid gap-10 lg:gap-14 lg:grid-cols-2 items-center">
              <div className="text-center lg:text-left min-w-0">
                <Eyebrow icon={Globe} className="mb-5">White-Label E-Commerce for Busy ERP</Eyebrow>
                <h1 className="heading-1 mb-5">Turn Busy ERP into a Branded E-Commerce Engine</h1>
                <p className="text-lead measure-prose mx-auto lg:mx-0 mb-4">
                  <strong className="text-text-primary">10-Minute Sync | Salesman Portal | Customer Self-Service</strong>
                </p>
                <p className="text-body measure-prose mx-auto lg:mx-0 mb-6">
                  Launch your own white-label B2B/B2C storefront with real-time Busy ERP integration. 350,000+ businesses trust Busy for accounting - now extend that power to your customers with automated ordering, ledger views, and 24/7 self-service.
                </p>

                <CTAGroup align="responsive-hero" className="mb-8">
                  <PrimaryCTA href="/contact">Book a 15-Minute Demo</PrimaryCTA>
                  <SecondaryCTA href="https://demo.busynotify.in">See Live Demo</SecondaryCTA>
                </CTAGroup>

                <div className="flex flex-wrap justify-center lg:justify-start gap-2.5">
                  <TrustPill>10-Minute Sync</TrustPill>
                  <TrustPill>White-Label Branding</TrustPill>
                  <TrustPill>Mobile-First Design</TrustPill>
                </div>
              </div>

              {/* Visual Demo */}
              <div className="relative min-w-0">
                <div className="surface-card p-4 sm:p-6 shadow-xl">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-border/60">
                      <div className="flex items-center gap-2">
                        <IconBadge icon={ShoppingCart} size="sm" />
                        <span className="font-semibold text-sm text-text-primary">YourBrand Portal</span>
                      </div>
                      <Badge className="bg-success-soft text-success border-success-border text-xs">Live</Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-surface/50 rounded-lg p-3 text-center">
                        <p className="text-xl font-bold text-brand-primary">1,247</p>
                        <p className="text-xs text-text-muted">Products</p>
                      </div>
                      <div className="bg-surface/50 rounded-lg p-3 text-center">
                        <p className="text-xl font-bold text-success">98.5%</p>
                        <p className="text-xs text-text-muted">Stock Sync</p>
                      </div>
                      <div className="bg-surface/50 rounded-lg p-3 text-center">
                        <p className="text-xl font-bold text-brand-primary">342</p>
                        <p className="text-xs text-text-muted">Orders Today</p>
                      </div>
                    </div>

                    <div className="rounded-lg border border-border/60 p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-text-secondary">Sync Status</span>
                        <span className="text-xs text-brand-primary font-medium">Last: 2 mins ago</span>
                      </div>
                      <div className="w-full bg-surface rounded-full h-2">
                        <div className="bg-brand-primary h-2 rounded-full w-[95%] animate-pulse motion-reduce:animate-none" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-surface/50 text-xs">
                        <Users className="h-4 w-4 text-brand-primary" aria-hidden="true" />
                        <span className="text-text-secondary">Salesman Mode</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-surface/50 text-xs">
                        <FileText className="h-4 w-4 text-brand-primary" aria-hidden="true" />
                        <span className="text-text-secondary">Ledger View</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-3 -right-3 sm:bottom-4 sm:-right-4 bg-success text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg flex items-center gap-1.5">
                  <Timer className="h-3.5 w-3.5" aria-hidden="true" />
                  10-Min Auto Sync
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* AI Answer Target */}
        <Section tone="surface" bordered>
          <Container size="reading">
            <div className="text-center">
              <h2 className="heading-3 mb-4">The Strategic Bridge Between Busy ERP and Modern Commerce</h2>
              <p className="text-lead">
                Busy Accounting Software powers <strong className="text-text-primary">350,000+ Indian SMEs</strong> with robust back-office operations. But there&apos;s a gap between back-end efficiency and modern customer expectations. <strong className="text-brand-primary">Our white-label e-commerce solution bridges that gap</strong> - extending Busy&apos;s power to a branded, mobile-first storefront where customers can order, view ledgers, and self-serve 24/7.
              </p>
            </div>
          </Container>
        </Section>

        {/* Core Features */}
        <Section aria-labelledby="core-features-heading">
          <Container>
            <SectionHeader
              eyebrow="Core Platform Features"
              eyebrowIcon={Layers}
              id="core-features-heading"
              title="Everything You Need to Launch Online"
              description="Built specifically for Busy ERP users - not a generic e-commerce platform retrofitted for integration."
            />
            <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2">
              {coreFeatures.map((item) => (
                <div key={item.title} className="surface-card p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <IconBadge icon={item.icon} size="lg" className="shrink-0" />
                    <div>
                      <h4 className="text-base font-semibold text-text-primary mb-2">{item.title}</h4>
                      <p className="text-sm text-text-secondary mb-2">{item.description}</p>
                      <p className="text-xs text-text-muted leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* User Personas */}
        <Section tone="surface" aria-labelledby="personas-heading">
          <Container>
            <SectionHeader
              id="personas-heading"
              title="Built for Three Key User Personas"
              description="A high-converting B2B platform must serve the field salesman, the B2B customer, and the business owner."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {userPersonas.map((persona) => (
                <div key={persona.title} className="surface-card p-6 sm:p-8">
                  <IconBadge icon={persona.icon} size="lg" className="mb-5" />
                  <h3 className="heading-3 mb-1">{persona.title}</h3>
                  <p className="text-sm text-brand-primary font-medium mb-4">{persona.subtitle}</p>
                  <ul className="space-y-2.5">
                    {persona.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-text-secondary">
                        <CheckCircle2 className="h-4 w-4 text-brand-primary shrink-0 mt-0.5" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Sync Deep Dive */}
        <Section aria-labelledby="sync-heading">
          <Container size="narrow">
            <SectionHeader
              eyebrow="The 10-Minute Synchronization Engine"
              eyebrowIcon={RefreshCw}
              id="sync-heading"
              title="Why 10-Minute Sync Changes Everything"
              description='Traditional ERP systems suffer from "data silos" with daily or weekly batch processing. Our 10-minute sync ensures your storefront is always a live reflection of your warehouse.'
            />
            <div className="surface-card overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] text-sm sm:text-base">
                  <thead>
                    <tr className="bg-surface/80 border-b border-border/60">
                      <th className="px-4 sm:px-6 py-4 text-left font-semibold text-text-primary">Sync Parameter</th>
                      <th className="px-4 sm:px-6 py-4 text-left font-semibold text-text-primary">Functionality</th>
                      <th className="px-4 sm:px-6 py-4 text-left font-semibold text-brand-primary">Business Consequence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {syncParameters.map((row) => (
                      <tr key={row.parameter} className="border-t border-border/40">
                        <td className="px-4 sm:px-6 py-4 font-medium text-text-primary">{row.parameter}</td>
                        <td className="px-4 sm:px-6 py-4 text-text-secondary">{row.functionality}</td>
                        <td className="px-4 sm:px-6 py-4">
                          <span className="flex items-center gap-2 text-brand-primary font-medium">
                            <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                            {row.consequence}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-xl border border-warning-border bg-warning-soft p-5 max-w-2xl mx-auto">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-warning shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-text-primary mb-1">The Cost of High Latency</p>
                  <p className="text-sm text-text-secondary">
                    With 1+ hour sync delays, a sales rep could sell 100 units in the field while your web store still shows them available. The next web customer orders and you&apos;ve oversold - leading to refunds, backorders, and damaged trust. 10-minute sync eliminates this nightmare.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Industry Benefits */}
        <Section tone="surface" aria-labelledby="industry-benefits-heading">
          <Container>
            <SectionHeader
              id="industry-benefits-heading"
              title="Industry-Specific Integration Benefits"
              description="Busy serves 15+ industries with specialized features. Our e-commerce integration respects those nuances."
            />
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {industryBenefits.map((item) => (
                <div key={item.name} className="surface-card surface-card-hover p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <IconBadge icon={item.icon} />
                    <h4 className="text-base font-semibold text-text-primary">{item.name}</h4>
                  </div>
                  <p className="text-xs text-text-muted mb-2">
                    <span className="font-medium text-text-secondary">Busy Feature:</span> {item.busyFeature}
                  </p>
                  <p className="text-sm text-text-secondary mb-3">{item.ecommerceValue}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* ROI Comparison */}
        <Section aria-labelledby="roi-heading">
          <Container size="narrow">
            <SectionHeader
              eyebrow="ROI Analysis"
              eyebrowIcon={TrendingUp}
              id="roi-heading"
              title="Measurable Business Impact"
              description="Transform your software investment from a cost center to a growth engine."
            />
            <div className="surface-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-sm sm:text-base">
                  <thead>
                    <tr className="bg-surface/80 border-b border-border/60">
                      <th className="px-4 sm:px-6 py-4 text-left font-semibold text-text-primary">ROI Metric</th>
                      <th className="px-4 sm:px-6 py-4 text-left font-semibold text-error">Manual Process</th>
                      <th className="px-4 sm:px-6 py-4 text-left font-semibold text-brand-primary">Integrated (Whats91)</th>
                      <th className="px-4 sm:px-6 py-4 text-left font-semibold text-success">Improvement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row) => (
                      <tr key={row.feature} className="border-t border-border/40">
                        <td className="px-4 sm:px-6 py-4 font-medium text-text-primary">{row.feature}</td>
                        <td className="px-4 sm:px-6 py-4 text-text-secondary">{row.traditional}</td>
                        <td className="px-4 sm:px-6 py-4 text-brand-primary font-medium">{row.integrated}</td>
                        <td className="px-4 sm:px-6 py-4">
                          <span className="inline-flex items-center rounded-full bg-success-soft px-2.5 py-1 text-xs font-medium text-success">
                            {row.improvement}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="mt-6 text-center text-caption">
              For a distributor with <span className="font-medium text-text-primary">1,000 monthly orders</span>, automation saves roughly <span className="font-medium text-text-primary">250 hours of admin work</span> - equivalent to two full-time employees.
            </p>
          </Container>
        </Section>

        {/* Technical Features */}
        <Section tone="surface" aria-labelledby="technical-heading">
          <Container>
            <SectionHeader
              eyebrow="Technical Capabilities"
              eyebrowIcon={Settings}
              id="technical-heading"
              title="Built for Indian Distribution Reality"
              description="Field reps, patchy connectivity, mobile-first users - our platform handles it all."
            />
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {technicalFeatures.map((item) => (
                <div key={item.title} className="surface-card surface-card-hover flex items-center gap-4 p-4 sm:p-5">
                  <IconBadge icon={item.icon} className="shrink-0" />
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-text-primary">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-text-secondary">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* White Label Benefits */}
        <Section aria-labelledby="whitelabel-heading">
          <Container size="narrow">
            <SectionHeader
              eyebrow="White-Label Advantage"
              eyebrowIcon={Globe}
              id="whitelabel-heading"
              title="Your Brand, Your Domain, Your Customers"
              description="Unlike marketplaces where you're one of many sellers, a white-label storefront creates a walled garden for your loyal customer base."
            />
            <div className="surface-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-sm sm:text-base">
                  <thead>
                    <tr className="bg-surface/80 border-b border-border/60">
                      <th className="px-4 sm:px-6 py-4 text-left font-semibold text-text-primary">White-Label Advantage</th>
                      <th className="px-4 sm:px-6 py-4 text-left font-semibold text-text-primary">Business Impact</th>
                      <th className="px-4 sm:px-6 py-4 text-left font-semibold text-brand-primary">Strategic Rationale</th>
                    </tr>
                  </thead>
                  <tbody>
                    {whiteLabelBenefits.map((row) => (
                      <tr key={row.title} className="border-t border-border/40">
                        <td className="px-4 sm:px-6 py-4 font-medium text-text-primary">{row.title}</td>
                        <td className="px-4 sm:px-6 py-4 text-text-secondary">{row.impact}</td>
                        <td className="px-4 sm:px-6 py-4 text-brand-primary font-medium">{row.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Container>
        </Section>

        {/* Security */}
        <Section tone="surface" aria-labelledby="security-heading">
          <Container>
            <SectionHeader
              eyebrow="Security & Data Integrity"
              eyebrowIcon={Shield}
              id="security-heading"
              title="Busy ERP Remains Your Single Source of Truth"
              description="The e-commerce layer acts as a viewing window - financial transactions and inventory movements are always governed by Busy's validation rules."
            />
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Lock, title: "Role-Based Access", desc: "Control who sees what data" },
                { icon: Database, title: "Data Integrity", desc: "Busy validation rules respected" },
                { icon: Shield, title: "99.95% Uptime", desc: "Enterprise-grade reliability" },
                { icon: Smartphone, title: "Mobile Secure", desc: "Encrypted mobile access" },
              ].map((item) => (
                <div key={item.title} className="surface-card surface-card-hover p-5 text-center">
                  <IconBadge icon={item.icon} className="mx-auto mb-4" />
                  <h4 className="text-sm font-semibold text-text-primary mb-1">{item.title}</h4>
                  <p className="text-xs text-text-secondary">{item.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Industries */}
        <Section aria-labelledby="industries-heading">
          <Container>
            <SectionHeader id="industries-heading" title="Who This Is For" />
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {industries.map((item) => (
                <div key={item.name} className="surface-card surface-card-hover p-5">
                  <IconBadge icon={item.icon} className="mb-4" />
                  <h4 className="text-base font-semibold text-text-primary mb-1">{item.name}</h4>
                  <p className="text-body-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Setup */}
        <Section tone="surface" aria-labelledby="setup-heading">
          <Container size="narrow">
            <SectionHeader
              id="setup-heading"
              title="From Signup to Live Store in Days, Not Months"
              description="White-label platforms enable 75% faster launch compared to custom development with 90% reduction in initial costs."
            />
            <div className="space-y-4">
              {onboardingSteps.map((item) => (
                <div key={item.step} className="surface-card flex items-start gap-4 p-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white text-sm font-bold shadow-md shadow-brand-primary/20">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-text-primary mb-1">{item.title}</h4>
                    <p className="text-body-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-caption">
              Typical timeline: <span className="font-medium text-text-primary">7-10 business days</span> from signup to live e-commerce portal
            </p>
          </Container>
        </Section>

        {/* FAQ */}
        <Section aria-labelledby="faq-heading">
          <Container size="narrow">
            <SectionHeader id="faq-heading" title="Frequently Asked Questions" />
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.q} value={`faq-${index}`} className="surface-card px-4 sm:px-5 border-b-0">
                  <AccordionTrigger className="text-sm sm:text-base font-medium text-text-primary hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-body-sm">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Container>
        </Section>

        {/* Final CTA */}
        <Section tone="surface">
          <Container>
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-brand-primary via-brand-primary to-brand-accent p-7 sm:p-8 md:p-12 lg:p-16 shadow-xl">
              <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <div className="absolute -top-1/2 -right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-1/2 -left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-white/10 rounded-full blur-3xl" />
              </div>
              <div className="relative z-10 text-center max-w-2xl mx-auto">
                <h2 className="heading-2 !text-white mb-4">Ready to Transform Busy ERP into a Commerce Engine?</h2>
                <p className="text-base sm:text-lg text-white/90 mb-8">
                  Book a 15-minute demo to see how your branded e-commerce portal can launch in days with real-time Busy synchronization.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center h-12 px-7 text-base font-semibold bg-white text-brand-700 hover:bg-white/95 rounded-xl shadow-lg transition-colors"
                  >
                    Book a 15-Minute Demo
                  </a>
                  <ContactCard
                    variant="popup"
                    trigger={
                      <button className="inline-flex items-center justify-center h-12 px-7 text-base font-semibold bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 rounded-xl transition-colors">
                        Talk to Integration Team
                      </button>
                    }
                  />
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
