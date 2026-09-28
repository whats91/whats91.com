"use client";

import { useState, useMemo } from "react";
import { Calculator, RefreshCw, TrendingUp, DollarSign, Users, Target, Zap, BarChart3, ArrowRight, QrCode, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Default values
const DEFAULTS = {
  monthlyLeads: 5000,
  humanCostPerLead: 5,
  aiQualificationRate: 80,
  selfBuildQualificationRate: 40,
  aiCostPerLead: 2,
  selfBuildCostPerLead: 3,
};

// Format currency with 2 decimals
function formatCurrency(value: number): string {
  return `$${value.toFixed(2)}`;
}

// Format number with commas
function formatNumber(value: number): string {
  return value.toLocaleString();
}

// FAQ data for SEO
const calculatorFAQs = [
  {
    question: "What is lead qualification ROI?",
    answer: "Lead qualification ROI measures the return on investment from qualifying leads using different methods (AI, self-built systems, or human agents). It compares costs and qualification rates to determine the most cost-effective approach.",
  },
  {
    question: "How accurate is the AI qualification rate?",
    answer: "AI qualification rates typically range from 70-90% depending on the quality of training data and the complexity of qualification criteria. Modern AI systems can match or exceed human qualification accuracy while processing leads at scale.",
  },
  {
    question: "What costs should I include in cost per lead?",
    answer: "Cost per lead should include all direct costs: labor costs (for human qualification), software/platform fees (for AI or self-built), infrastructure costs, and any overhead allocated to the qualification process.",
  },
  {
    question: "Why is AI qualification more cost-effective?",
    answer: "AI qualification is more cost-effective because it processes leads 24/7 without fatigue, handles higher volumes without additional staffing, maintains consistent accuracy, and reduces the cost per qualified lead significantly compared to human agents.",
  },
];

export function ROICalculatorClient() {
  // Input state
  const [monthlyLeads, setMonthlyLeads] = useState(DEFAULTS.monthlyLeads);
  const [humanCostPerLead, setHumanCostPerLead] = useState(DEFAULTS.humanCostPerLead);
  const [aiQualificationRate, setAiQualificationRate] = useState(DEFAULTS.aiQualificationRate);
  const [selfBuildQualificationRate, setSelfBuildQualificationRate] = useState(DEFAULTS.selfBuildQualificationRate);
  const [aiCostPerLead, setAiCostPerLead] = useState(DEFAULTS.aiCostPerLead);
  const [selfBuildCostPerLead, setSelfBuildCostPerLead] = useState(DEFAULTS.selfBuildCostPerLead);

  // Reset to defaults
  const resetToDefaults = () => {
    setMonthlyLeads(DEFAULTS.monthlyLeads);
    setHumanCostPerLead(DEFAULTS.humanCostPerLead);
    setAiQualificationRate(DEFAULTS.aiQualificationRate);
    setSelfBuildQualificationRate(DEFAULTS.selfBuildQualificationRate);
    setAiCostPerLead(DEFAULTS.aiCostPerLead);
    setSelfBuildCostPerLead(DEFAULTS.selfBuildCostPerLead);
  };

  // Calculate results (memoized for performance)
  const results = useMemo(() => {
    // Monthly costs
    const humanMonthlyCost = monthlyLeads * humanCostPerLead;
    const selfBuildMonthlyCost = monthlyLeads * selfBuildCostPerLead;
    const aiMonthlyCost = monthlyLeads * aiCostPerLead;

    // Qualified leads (prevent divide-by-zero with minimum 1)
    const aiQualifiedLeads = Math.max(1, Math.round(monthlyLeads * (aiQualificationRate / 100)));
    const selfBuildQualifiedLeads = Math.max(1, Math.round(monthlyLeads * (selfBuildQualificationRate / 100)));

    // Cost per qualified lead
    const aiCostPerQualifiedLead = aiMonthlyCost / aiQualifiedLeads;
    const selfBuildCostPerQualifiedLead = selfBuildMonthlyCost / selfBuildQualifiedLeads;

    // Savings vs Human
    const savingsVsHumanMonthly = humanMonthlyCost - aiMonthlyCost;
    const savingsVsHumanYearly = savingsVsHumanMonthly * 12;
    const savingsVsHumanPercent = humanMonthlyCost > 0 ? ((savingsVsHumanMonthly / humanMonthlyCost) * 100) : 0;

    // Savings vs Self-build
    const savingsVsSelfBuildMonthly = selfBuildMonthlyCost - aiMonthlyCost;
    const savingsVsSelfBuildYearly = savingsVsSelfBuildMonthly * 12;
    const savingsVsSelfBuildPercent = selfBuildMonthlyCost > 0 ? ((savingsVsSelfBuildMonthly / selfBuildMonthlyCost) * 100) : 0;

    // ROI calculations
    const roiVsHuman = savingsVsHumanMonthly > 0 && aiMonthlyCost > 0
      ? ((savingsVsHumanMonthly / aiMonthlyCost) * 100)
      : 0;
    const roiVsSelfBuild = savingsVsSelfBuildMonthly > 0 && aiMonthlyCost > 0
      ? ((savingsVsSelfBuildMonthly / aiMonthlyCost) * 100)
      : 0;

    return {
      humanMonthlyCost,
      selfBuildMonthlyCost,
      aiMonthlyCost,
      aiQualifiedLeads,
      selfBuildQualifiedLeads,
      aiCostPerQualifiedLead,
      selfBuildCostPerQualifiedLead,
      savingsVsHumanMonthly,
      savingsVsHumanYearly,
      savingsVsHumanPercent,
      savingsVsSelfBuildMonthly,
      savingsVsSelfBuildYearly,
      savingsVsSelfBuildPercent,
      roiVsHuman,
      roiVsSelfBuild,
    };
  }, [monthlyLeads, humanCostPerLead, aiQualificationRate, selfBuildQualificationRate, aiCostPerLead, selfBuildCostPerLead]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-accent/5">
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />

        <div className="relative px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto py-12 sm:py-16">
          <div className="max-w-3xl">
            <nav className="flex items-center gap-2 text-sm text-text-secondary mb-6">
              <Link href="/tools" className="hover:text-brand-primary">Free Tools</Link>
              <ArrowRight className="h-3.5 w-3.5" />
              <span className="text-text-primary font-medium">Lead Qualification ROI Calculator</span>
            </nav>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary mb-4">
              Lead Qualification <span className="text-gradient">ROI Calculator</span>
            </h1>

            <p className="text-lg sm:text-xl text-text-secondary leading-relaxed">
              Compare the true cost of AI-powered lead qualification vs human agents and self-built systems.
              Calculate your monthly savings and ROI instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-8 sm:py-12">
        <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">

            {/* Input Panel */}
            <Card className="border-border/60 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-brand-primary" />
                      Input Parameters
                    </CardTitle>
                    <CardDescription>
                      Adjust values to see instant results
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetToDefaults}
                    className="flex items-center gap-1.5"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Reset
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Lead Volume */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-text-primary flex items-center gap-2">
                    <Users className="h-4 w-4 text-brand-primary" />
                    Lead Volume
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="monthlyLeads">Monthly Leads</Label>
                    <Input
                      id="monthlyLeads"
                      type="number"
                      min="1"
                      value={monthlyLeads}
                      onChange={(e) => setMonthlyLeads(Math.max(1, parseInt(e.target.value) || 1))}
                      className="text-right"
                    />
                  </div>
                </div>

                {/* Human Costs */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-text-primary flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-warning" />
                    Human Qualification
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="humanCost">Cost per Lead ($)</Label>
                    <Input
                      id="humanCost"
                      type="number"
                      min="0"
                      step="0.01"
                      value={humanCostPerLead}
                      onChange={(e) => setHumanCostPerLead(parseFloat(e.target.value) || 0)}
                      className="text-right"
                    />
                  </div>
                </div>

                {/* AI Qualification */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-text-primary flex items-center gap-2">
                    <Zap className="h-4 w-4 text-success" />
                    AI Qualification
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="aiRate">Qualification Rate (%)</Label>
                      <Input
                        id="aiRate"
                        type="number"
                        min="0"
                        max="100"
                        value={aiQualificationRate}
                        onChange={(e) => setAiQualificationRate(Math.min(100, Math.max(0, parseFloat(e.target.value) || 0)))}
                        className="text-right"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="aiCost">Cost per Lead ($)</Label>
                      <Input
                        id="aiCost"
                        type="number"
                        min="0"
                        step="0.01"
                        value={aiCostPerLead}
                        onChange={(e) => setAiCostPerLead(parseFloat(e.target.value) || 0)}
                        className="text-right"
                      />
                    </div>
                  </div>
                </div>

                {/* Self-Built System */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-text-primary flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-info" />
                    Self-Built System
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="selfBuildRate">Qualification Rate (%)</Label>
                      <Input
                        id="selfBuildRate"
                        type="number"
                        min="0"
                        max="100"
                        value={selfBuildQualificationRate}
                        onChange={(e) => setSelfBuildQualificationRate(Math.min(100, Math.max(0, parseFloat(e.target.value) || 0)))}
                        className="text-right"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="selfBuildCost">Cost per Lead ($)</Label>
                      <Input
                        id="selfBuildCost"
                        type="number"
                        min="0"
                        step="0.01"
                        value={selfBuildCostPerLead}
                        onChange={(e) => setSelfBuildCostPerLead(parseFloat(e.target.value) || 0)}
                        className="text-right"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Panel */}
            <div className="space-y-6">
              {/* Monthly Costs */}
              <Card className="border-border/60 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-brand-primary" />
                    Monthly Costs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-warning-soft border border-warning-border">
                      <span className="text-sm font-medium text-warning">Human Agents</span>
                      <span className="text-lg font-bold text-warning">{formatCurrency(results.humanMonthlyCost)}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-info-soft border border-info-border">
                      <span className="text-sm font-medium text-info">Self-Built System</span>
                      <span className="text-lg font-bold text-info">{formatCurrency(results.selfBuildMonthlyCost)}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-success-soft border border-success-border">
                      <span className="text-sm font-medium text-success">AI Qualification</span>
                      <span className="text-lg font-bold text-success">{formatCurrency(results.aiMonthlyCost)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Qualified Leads */}
              <Card className="border-border/60 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-brand-primary" />
                    Qualified Leads
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-lg bg-success-soft border border-success-border">
                      <div className="text-sm font-medium text-success mb-1">AI Qualified</div>
                      <div className="text-2xl font-bold text-success">{formatNumber(results.aiQualifiedLeads)}</div>
                      <div className="text-xs text-success mt-1">
                        {formatCurrency(results.aiCostPerQualifiedLead)} per qualified lead
                      </div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-info-soft border border-info-border">
                      <div className="text-sm font-medium text-info mb-1">Self-Built Qualified</div>
                      <div className="text-2xl font-bold text-info">{formatNumber(results.selfBuildQualifiedLeads)}</div>
                      <div className="text-xs text-info mt-1">
                        {formatCurrency(results.selfBuildCostPerQualifiedLead)} per qualified lead
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 rounded-lg bg-brand-primary/5 border border-brand-primary/20">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-text-primary">
                        AI produces <span className="text-brand-primary font-bold">{Math.round((results.aiQualifiedLeads / Math.max(1, results.selfBuildQualifiedLeads)) * 100)}%</span> more qualified leads
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Savings */}
              <Card className="border-border/60 shadow-lg overflow-hidden">
                <div className="bg-success p-4">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <TrendingUp className="h-5 w-5" />
                    Your Savings with AI
                  </CardTitle>
                </div>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {/* vs Human */}
                    <div>
                      <h4 className="text-sm font-medium text-text-secondary mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-warning"></span>
                        Savings vs Human Agents
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="text-center p-3 rounded-lg bg-surface border border-border">
                          <div className="text-xs text-text-muted mb-1">Monthly</div>
                          <div className="text-xl font-bold text-success">{formatCurrency(results.savingsVsHumanMonthly)}</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-surface border border-border">
                          <div className="text-xs text-text-muted mb-1">Yearly</div>
                          <div className="text-xl font-bold text-success">{formatCurrency(results.savingsVsHumanYearly)}</div>
                        </div>
                      </div>
                      <div className="mt-2 text-center">
                        <span className="text-sm text-text-secondary">
                          <span className="font-bold text-success">{results.savingsVsHumanPercent.toFixed(1)}%</span> cost reduction
                        </span>
                      </div>
                    </div>

                    {/* vs Self-Build */}
                    <div>
                      <h4 className="text-sm font-medium text-text-secondary mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-info"></span>
                        Savings vs Self-Built System
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="text-center p-3 rounded-lg bg-surface border border-border">
                          <div className="text-xs text-text-muted mb-1">Monthly</div>
                          <div className="text-xl font-bold text-success">{formatCurrency(results.savingsVsSelfBuildMonthly)}</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-surface border border-border">
                          <div className="text-xs text-text-muted mb-1">Yearly</div>
                          <div className="text-xl font-bold text-success">{formatCurrency(results.savingsVsSelfBuildYearly)}</div>
                        </div>
                      </div>
                      <div className="mt-2 text-center">
                        <span className="text-sm text-text-secondary">
                          <span className="font-bold text-success">{results.savingsVsSelfBuildPercent.toFixed(1)}%</span> cost reduction
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* ROI Summary */}
              <Card className="border-2 border-brand-primary/30 bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 shadow-lg">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-sm font-medium text-text-secondary mb-2">ROI with AI Qualification</div>
                    <div className="flex items-center justify-center gap-4">
                      <div>
                        <div className="text-3xl font-bold text-brand-primary">{results.roiVsHuman.toFixed(0)}%</div>
                        <div className="text-xs text-text-muted">vs Human</div>
                      </div>
                      <div className="h-8 w-px bg-border"></div>
                      <div>
                        <div className="text-3xl font-bold text-success">{results.roiVsSelfBuild.toFixed(0)}%</div>
                        <div className="text-xs text-text-muted">vs Self-Build</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 sm:py-12 bg-surface/50">
        <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {calculatorFAQs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index}`} className="surface-card px-4 sm:px-5 border-b-0">
                  <AccordionTrigger className="text-sm sm:text-base font-medium text-text-primary hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-body-sm">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12">
        <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
          <Card className="bg-gradient-to-br from-brand-primary to-brand-accent text-white border-0">
            <CardContent className="pt-8 pb-8 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Ready to Transform Your Lead Qualification?
              </h2>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                Start qualifying leads with AI today and see real savings within the first month.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-brand-700 hover:bg-white/90">
                  <Link href="/contact">Get Started Free</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="/solutions/busy-erp">Learn More</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Related Tools */}
      <section className="py-8 sm:py-12 bg-surface/50">
        <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-6">Related Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/tools/whatsapp-api-cost-calculator" className="group">
              <Card className="h-full border-border/60 hover:border-brand-primary/50 hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <Calculator className="h-8 w-8 text-brand-primary mb-3" />
                  <h3 className="font-semibold text-text-primary group-hover:text-brand-primary transition-colors">
                    WhatsApp API Cost Calculator
                  </h3>
                  <p className="text-sm text-text-secondary mt-1">Calculate messaging costs by country</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/tools/whatsapp-link-generator" className="group">
              <Card className="h-full border-border/60 hover:border-brand-primary/50 hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <MessageCircle className="h-8 w-8 text-success mb-3" />
                  <h3 className="font-semibold text-text-primary group-hover:text-brand-primary transition-colors">
                    WhatsApp Link Generator
                  </h3>
                  <p className="text-sm text-text-secondary mt-1">Create clickable wa.me links</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/tools/qr-code-generator" className="group">
              <Card className="h-full border-border/60 hover:border-brand-primary/50 hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <QrCode className="h-8 w-8 text-brand-primary mb-3" />
                  <h3 className="font-semibold text-text-primary group-hover:text-brand-primary transition-colors">
                    QR Code Generator
                  </h3>
                  <p className="text-sm text-text-secondary mt-1">Create scannable QR codes</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
