"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Calculator,
  ArrowRight,
  MessageCircle,
  DollarSign,
  Users,
  Shield,
  Megaphone,
  Settings,
  HelpCircle,
  Check,
  Info,
  PieChart
} from "lucide-react";

// WhatsApp API Pricing Data (per delivered message estimate)
// India defaults use the current researched INR rates from the 2026 pricing pillar.

interface CountryPricing {
  code: string;
  name: string;
  currency: string;
  marketing: number;
  utility: number;
  authentication: number;
  service: number;
}

// WhatsApp API pricing by country (per delivered message estimate)
const countryPricing: CountryPricing[] = [
  { code: "IN", name: "India", currency: "INR", marketing: 0.8631, utility: 0.1150, authentication: 0.1150, service: 0 },
  { code: "US", name: "United States", currency: "USD", marketing: 0.0250, utility: 0.0125, authentication: 0.0135, service: 0 },
  { code: "GB", name: "United Kingdom", currency: "GBP", marketing: 0.0357, utility: 0.0178, authentication: 0.0192, service: 0 },
  { code: "BR", name: "Brazil", currency: "BRL", marketing: 0.0315, utility: 0.0157, authentication: 0.0170, service: 0 },
  { code: "ID", name: "Indonesia", currency: "IDR", marketing: 0.0200, utility: 0.0100, authentication: 0.0108, service: 0 },
  { code: "MX", name: "Mexico", currency: "MXN", marketing: 0.0290, utility: 0.0145, authentication: 0.0157, service: 0 },
  { code: "AE", name: "UAE", currency: "AED", marketing: 0.0300, utility: 0.0150, authentication: 0.0162, service: 0 },
  { code: "SA", name: "Saudi Arabia", currency: "SAR", marketing: 0.0280, utility: 0.0140, authentication: 0.0151, service: 0 },
  { code: "DE", name: "Germany", currency: "EUR", marketing: 0.0400, utility: 0.0200, authentication: 0.0216, service: 0 },
  { code: "FR", name: "France", currency: "EUR", marketing: 0.0380, utility: 0.0190, authentication: 0.0205, service: 0 },
  { code: "ES", name: "Spain", currency: "EUR", marketing: 0.0360, utility: 0.0180, authentication: 0.0194, service: 0 },
  { code: "IT", name: "Italy", currency: "EUR", marketing: 0.0370, utility: 0.0185, authentication: 0.0200, service: 0 },
  { code: "NG", name: "Nigeria", currency: "NGN", marketing: 0.0220, utility: 0.0110, authentication: 0.0119, service: 0 },
  { code: "EG", name: "Egypt", currency: "EGP", marketing: 0.0180, utility: 0.0090, authentication: 0.0097, service: 0 },
  { code: "PK", name: "Pakistan", currency: "PKR", marketing: 0.0160, utility: 0.0080, authentication: 0.0086, service: 0 },
  { code: "BD", name: "Bangladesh", currency: "BDT", marketing: 0.0150, utility: 0.0075, authentication: 0.0081, service: 0 },
  { code: "PH", name: "Philippines", currency: "PHP", marketing: 0.0240, utility: 0.0120, authentication: 0.0130, service: 0 },
  { code: "ZA", name: "South Africa", currency: "ZAR", marketing: 0.0260, utility: 0.0130, authentication: 0.0140, service: 0 },
  { code: "AU", name: "Australia", currency: "AUD", marketing: 0.0420, utility: 0.0210, authentication: 0.0227, service: 0 },
  { code: "CA", name: "Canada", currency: "CAD", marketing: 0.0380, utility: 0.0190, authentication: 0.0205, service: 0 },
];

// Volume discount tiers
const volumeDiscounts = [
  { min: 0, max: 10000, discount: 0 },
  { min: 10001, max: 50000, discount: 5 },
  { min: 50001, max: 100000, discount: 10 },
  { min: 100001, max: 500000, discount: 15 },
  { min: 500001, max: Infinity, discount: 20 },
];

const calculatorFAQs = [
  {
    q: "What is a WhatsApp API cost calculator?",
    a: "A WhatsApp API cost calculator estimates monthly spend by message category, country, and volume so teams can compare marketing, utility, authentication, and service traffic before committing budget.",
  },
  {
    q: "Why are service messages usually free?",
    a: "Service replies are customer-initiated support messages sent inside the active customer service window. They are usually free compared with business-initiated templates.",
  },
  {
    q: "Are these WhatsApp API prices final invoices?",
    a: "No. Calculator output is an estimate. Final invoices can include Meta rate changes, BSP platform fees, GST, add-ons, seats, and integration support charges.",
  },
  {
    q: "How can I reduce WhatsApp API costs?",
    a: "Use utility templates for transactional updates, avoid promotional copy in utility templates, encourage customer replies, and reconcile billing against delivered message statuses.",
  },
];

interface MessageInput {
  marketing: number;
  utility: number;
  authentication: number;
  service: number;
}

export function CostCalculatorClient() {
  const [country, setCountry] = useState("IN");
  const [messages, setMessages] = useState<MessageInput>({
    marketing: 1000,
    utility: 500,
    authentication: 200,
    service: 300,
  });
  const [activeTab, setActiveTab] = useState("calculator");

  // Get selected country pricing
  const selectedCountry = useMemo(() => {
    return countryPricing.find((c) => c.code === country) || countryPricing[0];
  }, [country]);

  // Calculate total messages
  const totalMessages = useMemo(() => {
    return messages.marketing + messages.utility + messages.authentication + messages.service;
  }, [messages]);

  // Get applicable discount
  const applicableDiscount = useMemo(() => {
    const tier = volumeDiscounts.find((t) => totalMessages >= t.min && totalMessages <= t.max);
    return tier?.discount || 0;
  }, [totalMessages]);

  // Calculate costs
  const costs = useMemo(() => {
    const marketingCost = messages.marketing * selectedCountry.marketing;
    const utilityCost = messages.utility * selectedCountry.utility;
    const authenticationCost = messages.authentication * selectedCountry.authentication;
    const serviceCost = messages.service * selectedCountry.service; // Service is usually free (customer-initiated)

    const subtotal = marketingCost + utilityCost + authenticationCost + serviceCost;
    const discountAmount = subtotal * (applicableDiscount / 100);
    const total = subtotal - discountAmount;

    return {
      marketing: marketingCost,
      utility: utilityCost,
      authentication: authenticationCost,
      service: serviceCost,
      subtotal,
      discountAmount,
      total,
    };
  }, [messages, selectedCountry, applicableDiscount]);

  // Cost per message breakdown
  const costPerMessage = useMemo(() => {
    return {
      marketing: selectedCountry.marketing,
      utility: selectedCountry.utility,
      authentication: selectedCountry.authentication,
      service: selectedCountry.service,
      average: totalMessages > 0 ? costs.total / totalMessages : 0,
    };
  }, [selectedCountry, costs.total, totalMessages]);

  // Format currency
  const formatCurrency = useCallback((amount: number, currency = selectedCountry.currency) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    }).format(amount);
  }, [selectedCountry.currency]);

  // Format large numbers
  const formatNumber = useCallback((num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  }, []);

  // Update message count
  const updateMessage = (type: keyof MessageInput, value: number) => {
    setMessages((prev) => ({ ...prev, [type]: Math.max(0, value) }));
  };

  // Message categories with icons and descriptions
  const categories = [
    {
      key: "marketing" as const,
      label: "Marketing",
      description: "Promotional messages, offers, announcements",
      icon: Megaphone,
      color: "text-info",
      bgColor: "bg-info-soft",
    },
    {
      key: "utility" as const,
      label: "Utility",
      description: "Order confirmations, delivery updates, account alerts",
      icon: Settings,
      color: "text-brand-primary",
      bgColor: "bg-brand-primary/10",
    },
    {
      key: "authentication" as const,
      label: "Authentication",
      description: "OTP, login codes, verification messages",
      icon: Shield,
      color: "text-success",
      bgColor: "bg-success-soft",
    },
    {
      key: "service" as const,
      label: "Service",
      description: "Customer-initiated support replies (Free)",
      icon: MessageCircle,
      color: "text-warning",
      bgColor: "bg-warning-soft",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface to-background py-12 sm:py-16">
        <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
          <div className="max-w-3xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-text-secondary mb-6">
              <Link href="/tools" className="hover:text-brand-primary">Free Tools</Link>
              <ArrowRight className="h-3.5 w-3.5" />
              <span className="text-text-primary font-medium">WhatsApp API Cost Calculator</span>
            </nav>

            <div className="text-center mb-8">
              <Badge variant="secondary" className="mb-4 px-3 py-1 text-sm font-medium">
                <Calculator className="h-3.5 w-3.5 mr-1.5 text-brand-primary" />
                Free Tool
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight mb-4">
                WhatsApp API Cost Calculator
              </h1>
              <p className="text-lg text-text-secondary">
                Calculate your WhatsApp Business API costs accurately. Estimate spending based on message
                types, volume, and country with official Meta pricing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Section */}
      <section className="py-8 sm:py-12">
        <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="calculator" className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Calculator
              </TabsTrigger>
              <TabsTrigger value="pricing" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Pricing Guide
              </TabsTrigger>
            </TabsList>

            {/* Calculator Tab */}
            <TabsContent value="calculator">
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Input Section */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Country Selection */}
                  <Card className="border-border/60">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Users className="h-5 w-5 text-brand-primary" />
                        Target Country
                      </CardTitle>
                      <CardDescription>
                        Select the country where your customers are located (pricing varies by region)
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Select value={country} onValueChange={setCountry}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countryPricing.map((c) => (
                            <SelectItem key={c.code} value={c.code}>
                              {c.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>

                  {/* Message Categories */}
                  <Card className="border-border/60">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <MessageCircle className="h-5 w-5 text-brand-primary" />
                        Message Volume
                      </CardTitle>
                      <CardDescription>
                        Enter the number of messages you plan to send for each category
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {categories.map((category) => (
                        <div key={category.key} className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${category.bgColor}`}>
                                <category.icon className={`h-4 w-4 ${category.color}`} />
                              </div>
                              <div>
                                <Label className="font-medium">{category.label}</Label>
                                <p className="text-xs text-text-muted">{category.description}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-text-muted">Rate per message</p>
                              <p className="text-sm font-medium">
                                {category.key === "service" ? "FREE" : formatCurrency(costPerMessage[category.key])}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Slider
                              value={[messages[category.key]]}
                              onValueChange={([value]) => updateMessage(category.key, value)}
                              max={100000}
                              step={100}
                              className="flex-1"
                            />
                            <Input
                              type="number"
                              value={messages[category.key]}
                              onChange={(e) => updateMessage(category.key, parseInt(e.target.value) || 0)}
                              className="w-28 text-right"
                              min={0}
                            />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Volume Discount Info */}
                  <Card className="border-border/60 bg-surface/50">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-text-primary">Volume Discounts</p>
                          <p className="text-sm text-text-secondary mt-1">
                            Higher message volumes qualify for automatic discounts:
                          </p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
                            {volumeDiscounts.slice(1).map((tier, i) => (
                              <Badge key={i} variant="outline" className="justify-center py-1">
                                {formatNumber(tier.min)}+ msgs: {tier.discount}% off
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Results Section */}
                <div className="space-y-6">
                  {/* Total Cost Card */}
                  <Card className="border-brand-primary/20 bg-gradient-to-br from-brand-primary/5 to-background">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Estimated Monthly Cost</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-brand-primary/10 rounded-lg border border-brand-primary/20">
                        <p className="text-sm text-brand-primary">Total Cost</p>
                        <p className="text-3xl font-bold text-brand-primary">
                          {formatCurrency(costs.total)}
                        </p>
                        {applicableDiscount > 0 && (
                          <p className="text-xs text-success mt-1">
                            Includes {applicableDiscount}% volume discount (-{formatCurrency(costs.discountAmount)})
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center py-1">
                          <span className="text-sm text-text-secondary">Total Messages</span>
                          <Badge variant="secondary">{formatNumber(totalMessages)}</Badge>
                        </div>
                        <div className="flex justify-between items-center py-1">
                          <span className="text-sm text-text-secondary">Avg. Cost/Message</span>
                          <Badge variant="secondary">{formatCurrency(costPerMessage.average)}</Badge>
                        </div>
                        <div className="flex justify-between items-center py-1">
                          <span className="text-sm text-text-secondary">Country</span>
                          <Badge variant="secondary">{selectedCountry.name}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Cost Breakdown */}
                  <Card className="border-border/60">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <PieChart className="h-4 w-4 text-brand-primary" />
                        Cost Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {categories.map((category) => (
                        <div key={category.key} className="flex items-center justify-between py-1 border-b border-border/40 last:border-0">
                          <div className="flex items-center gap-2">
                            <category.icon className={`h-4 w-4 ${category.color}`} />
                            <span className="text-sm text-text-secondary">{category.label}</span>
                          </div>
                          <span className="text-sm font-medium">
                            {formatCurrency(costs[category.key])}
                          </span>
                        </div>
                      ))}
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">Subtotal</span>
                        <span className="text-sm font-medium">{formatCurrency(costs.subtotal)}</span>
                      </div>
                      {costs.discountAmount > 0 && (
                        <div className="flex items-center justify-between text-success">
                          <span className="text-sm">Volume Discount ({applicableDiscount}%)</span>
                          <span className="text-sm font-medium">-{formatCurrency(costs.discountAmount)}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Comparison */}
                  <Card className="border-border/60">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Annual Projection</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-surface rounded-lg">
                          <p className="text-xs text-text-muted">Monthly</p>
                          <p className="text-lg font-bold text-text-primary">{formatCurrency(costs.total)}</p>
                        </div>
                        <div className="text-center p-3 bg-surface rounded-lg">
                          <p className="text-xs text-text-muted">Yearly</p>
                          <p className="text-lg font-bold text-text-primary">{formatCurrency(costs.total * 12)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* CTA */}
                  <Card className="bg-gradient-to-br from-brand-primary/10 to-brand-primary/5 border-brand-primary/20">
                    <CardContent className="pt-6 text-center">
                      <p className="text-sm text-text-secondary mb-3">
                        Need help with WhatsApp API?
                      </p>
                      <Button asChild className="bg-brand-primary hover:bg-brand-primary-hover">
                        <Link href="/contact">
                          Talk to an Expert
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Pricing Guide Tab */}
            <TabsContent value="pricing">
              <div className="max-w-4xl mx-auto space-y-8">
                {/* How Pricing Works */}
                <Card className="border-border/60">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-brand-primary" />
                      How WhatsApp API Pricing Works
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-text-secondary">
                      WhatsApp Business API planning now centers on per delivered message pricing
                      for business-initiated templates. Service replies inside the customer service
                      window are usually free. Here&apos;s what you need to know:
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="p-4 bg-surface rounded-lg">
                        <h4 className="font-medium text-text-primary mb-2">Business-Initiated</h4>
                        <p className="text-sm text-text-secondary">
                          You pay when you send the first message to a customer outside the 24-hour window.
                          Rates vary by category (Marketing, Utility, Authentication).
                        </p>
                      </div>
                      <div className="p-4 bg-surface rounded-lg">
                        <h4 className="font-medium text-text-primary mb-2">Customer-Initiated (Free)</h4>
                        <p className="text-sm text-text-secondary">
                          When a customer messages you first, support replies inside the 24-hour
                          service window are usually free.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Category Explanations */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {categories.map((category) => (
                    <Card key={category.key} className="border-border/60">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`p-2 rounded-lg ${category.bgColor}`}>
                            <category.icon className={`h-5 w-5 ${category.color}`} />
                          </div>
                          <h3 className="font-semibold text-text-primary">{category.label}</h3>
                        </div>
                        <p className="text-sm text-text-secondary mb-3">{category.description}</p>
                        <div className="text-sm">
                          <span className="text-text-muted">Rate: </span>
                          <span className="font-medium">
                            {category.key === "service" ? "FREE" : formatCurrency(costPerMessage[category.key])}/message
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Country Pricing Table */}
                <Card className="border-border/60">
                  <CardHeader>
                    <CardTitle>Pricing by Country (local currency per delivered message)</CardTitle>
                    <CardDescription>
                      WhatsApp API pricing varies by destination country
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2 font-medium">Country</th>
                            <th className="text-right py-2 font-medium">Marketing</th>
                            <th className="text-right py-2 font-medium">Utility</th>
                            <th className="text-right py-2 font-medium">Auth</th>
                            <th className="text-right py-2 font-medium">Service</th>
                          </tr>
                        </thead>
                        <tbody>
                          {countryPricing.slice(0, 10).map((c) => (
                            <tr key={c.code} className="border-b border-border/40 hover:bg-surface/50">
                              <td className="py-2">{c.name}</td>
                              <td className="text-right py-2">{formatCurrency(c.marketing, c.currency)}</td>
                              <td className="text-right py-2">{formatCurrency(c.utility, c.currency)}</td>
                              <td className="text-right py-2">{formatCurrency(c.authentication, c.currency)}</td>
                              <td className="text-right py-2 text-success">Free</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Tips */}
                <Card className="border-success-border bg-success-soft">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-success mb-3">
                      Tips to Reduce Costs
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Use customer-initiated service windows whenever possible",
                        "Send utility messages instead of marketing for transactional updates",
                        "Consolidate multiple updates into one message where it remains clear",
                        "Target specific customer segments to reduce unnecessary messages",
                        "Schedule messages strategically around active service windows",
                      ].map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-success">
                          <Check className="h-4 w-4 shrink-0 mt-0.5" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-surface/50">
        <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="grid gap-4">
              {calculatorFAQs.map((faq, i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <h3 className="font-medium text-text-primary mb-2">{faq.q}</h3>
                    <p className="text-sm text-text-secondary">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
