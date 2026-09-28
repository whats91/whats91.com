import { Clock, DollarSign, TrendingUp, Users } from "lucide-react";
import {
  Container,
  Section,
  SectionHeader,
  IconBadge,
  Reveal,
  AnimatedNumber,
} from "@/components/shared";

const roiItems = [
  {
    title: "Abandoned Cart Recovery",
    rate: "45-60%",
    comparison: "vs 10% email",
    description: "Automated nudges 15-30 mins after cart drop.",
  },
  {
    title: "Lead Qualification",
    rate: "3x",
    comparison: "higher conversion",
    description: "Zero-friction in-chat forms collect PII instantly.",
  },
  {
    title: "Invoice Payment Speed",
    rate: "90%+",
    comparison: "open rate",
    description: "Direct PDF invoices with payment links.",
  },
];

export function ResultsBand() {
  return (
    <Section tone="surface" aria-labelledby="results-heading">
      <Container>
        <SectionHeader
          eyebrow="ROI & Business Impact"
          id="results-heading"
          title="Measurable results for your enterprise"
          description="Higher engagement, faster sales cycles, and reduced operational costs."
        />

        <Reveal>
          <div className="surface-card overflow-hidden">
            {/* Dashboard stat strip — counting on view */}
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-border/60 border-b border-border/60">
              <div className="p-5 sm:p-6 text-center">
                <IconBadge icon={TrendingUp} size="sm" className="mb-2" />
                <p className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
                  <AnimatedNumber value={98} suffix="%" />
                </p>
                <p className="text-body-sm mt-0.5">Message Open Rate</p>
                <p className="text-caption">vs 42% for email</p>
              </div>
              <div className="p-5 sm:p-6 text-center">
                <IconBadge icon={DollarSign} size="sm" className="mb-2" />
                <p className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
                  <AnimatedNumber value={50} suffix="%" />
                </p>
                <p className="text-body-sm mt-0.5">Lower Acquisition</p>
                <p className="text-caption">via CTWA ads</p>
              </div>
              <div className="p-5 sm:p-6 text-center">
                <IconBadge icon={Clock} size="sm" className="mb-2" />
                <p className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
                  <AnimatedNumber value={95} suffix="%" />
                </p>
                <p className="text-body-sm mt-0.5">Efficiency Gain</p>
                <p className="text-caption">routine tasks</p>
              </div>
              <div className="p-5 sm:p-6 text-center">
                <IconBadge icon={Users} size="sm" className="mb-2" />
                <p className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">40-50%</p>
                <p className="text-body-sm mt-0.5">Support Reduction</p>
                <p className="text-caption">via chatbot</p>
              </div>
            </div>

            {/* Impact ledger */}
            <div className="px-5 sm:px-6 py-4 bg-surface/50 border-b border-border/60">
              <h3 className="heading-4">Marketing Strategy Impact</h3>
            </div>

            <div className="sm:hidden divide-y divide-border/60">
              {roiItems.map((item) => (
                <div key={item.title} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-semibold text-text-primary pr-2">{item.title}</h4>
                    <span className="text-lg font-bold text-brand-primary shrink-0">{item.rate}</span>
                  </div>
                  <p className="text-xs text-text-secondary mb-1">{item.description}</p>
                  <p className="text-caption">{item.comparison}</p>
                </div>
              ))}
            </div>

            <div className="hidden sm:block divide-y divide-border/40">
              {roiItems.map((item) => (
                <div key={item.title} className="p-6 flex items-center gap-4 hover:bg-surface/30 transition-colors">
                  <div className="flex-1">
                    <h4 className="text-base font-semibold text-text-primary mb-1">{item.title}</h4>
                    <p className="text-body-sm">{item.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-2xl font-bold text-brand-primary">{item.rate}</p>
                    <p className="text-caption">{item.comparison}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Formula footnote */}
            <div className="px-5 sm:px-6 py-4 bg-ink flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <p className="text-caption text-ink-text-muted uppercase tracking-wider shrink-0">
                Efficiency gain
              </p>
              <p className="text-sm text-white font-mono">
                η = (T<sub className="text-[10px]">manual</sub> − T<sub className="text-[10px]">auto</sub>) / T<sub className="text-[10px]">manual</sub> × 100
                <span className="text-ink-text-muted font-sans text-xs ml-3">
                  T<sub>auto</sub> is under 5 seconds for routine queries
                </span>
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
