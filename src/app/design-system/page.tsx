import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/config";
import {
  Zap,
  Shield,
  Database,
  BarChart3,
  MessageSquare,
  Bot,
  AlertTriangle,
  Info,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  Container,
  Section,
  SectionHeader,
  Eyebrow,
  CTAGroup,
  PrimaryCTA,
  SecondaryCTA,
  IconBadge,
  FeatureCard,
  StatCard,
  TrustPill,
} from "@/components/shared";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  ...generatePageMetadata({ title: "Whats91 Design System Preview (Internal)", description: "Internal preview of Whats91 typography, shared components and layout tokens. This preview is excluded from search indexing and the public sitemap.", path: "/design-system" }),
  robots: { index: false, follow: false },
};

/**
 * Internal preview of the Whats91 UI foundation.
 * Not linked from navigation and excluded from the sitemap.
 * See WHATS91_DESIGN_SYSTEM.md for the full guideline.
 */
export default function DesignSystemPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-background">
      {/* Typography */}
      <Section tone="default" id="type">
        <Container>
          <SectionHeader
            align="left"
            eyebrow="Internal Preview"
            title="Whats91 UI Foundation"
            description="Every shared primitive and token family on one page. Resize the window to verify fluid type and section rhythm."
          />
          <div className="flex flex-col gap-4">
            <p className="heading-display">Display heading</p>
            <h1 className="heading-1">Heading one — page hero</h1>
            <h2 className="heading-2">Heading two — section title</h2>
            <h3 className="heading-3">Heading three — subsection</h3>
            <h4 className="heading-4">Heading four — card title</h4>
            <p className="text-lead measure-prose">
              Lead paragraph. Used directly under hero and section headings to
              summarise the value of the section in one or two sentences.
            </p>
            <p className="text-body measure-prose">
              Body text. The default reading size for paragraphs, list items and
              card descriptions. Line length is capped with measure-prose so
              long-form content stays comfortable to read.
            </p>
            <p className="text-body-sm measure-prose">
              Small body text for dense UI copy and card descriptions.
            </p>
            <p className="text-caption">Caption — metadata, timestamps, footnotes (12px minimum).</p>
            <p className="text-overline">Overline label</p>
            <p className="text-body">
              Inline links use <a href="#type" className="link-inline">the link-inline recipe</a> inside body copy.
            </p>
          </div>
        </Container>
      </Section>

      {/* Buttons + CTAs */}
      <Section tone="surface" id="buttons">
        <Container>
          <SectionHeader
            align="left"
            title="Buttons and CTAs"
            description="shadcn Button variants for in-page actions; PrimaryCTA / SecondaryCTA for conversion moments."
          />
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
            <Button disabled>Disabled</Button>
          </div>
          <CTAGroup align="left">
            <PrimaryCTA href="/contact">Request Consultation</PrimaryCTA>
            <SecondaryCTA href="/pricing">View Pricing</SecondaryCTA>
          </CTAGroup>
          <div className="mt-8 flex flex-wrap gap-2.5">
            <TrustPill>Meta-hosted Cloud API</TrustPill>
            <TrustPill icon={Shield}>Protected connections</TrustPill>
            <TrustPill icon={Zap}>Confirm account throughput</TrustPill>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Eyebrow>Plain eyebrow</Eyebrow>
            <Eyebrow icon={Bot}>With icon</Eyebrow>
            <Eyebrow live>Live status</Eyebrow>
          </div>
        </Container>
      </Section>

      {/* Cards */}
      <Section tone="default" id="type">
        <Container>
          <SectionHeader
            title="Cards"
            description="One card recipe everywhere: surface-card, with surface-card-hover only on interactive cards."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={MessageSquare}
              title="Feature card"
              description="Icon tile, title, description. The default building block for feature grids."
            />
            <FeatureCard
              icon={Database}
              title="Linked feature card"
              description="The whole card is a link; hover lifts the border to brand tint."
              href="/solutions/busy-erp"
            />
            <FeatureCard
              icon={BarChart3}
              title="Card with extra content"
              description="Children render between description and link."
            >
              <ul className="mt-3 space-y-1.5 text-body-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" aria-hidden="true" />
                  Bullet with status icon
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" aria-hidden="true" />
                  Second bullet
                </li>
              </ul>
            </FeatureCard>
          </div>
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard value="SLA" label="Contract specific" />
            <StatCard value="Confirm" label="Account throughput" icon={Zap} />
            <StatCard value="24×7" label="Support" />
            <StatCard value="10 min" label="Busy sync interval" />
          </div>
        </Container>
      </Section>

      {/* Status + icon tones */}
      <Section tone="surface">
        <Container>
          <SectionHeader
            title="Status colours"
            description="One hue per meaning. Soft fills for banners, solid text colours for icons and labels. Never decorative."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-success-border bg-success-soft p-4 flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-success shrink-0" aria-hidden="true" />
              <p className="text-body-sm text-text-primary">
                Success — confirmation banners, delivered states.
              </p>
            </div>
            <div className="rounded-xl border border-warning-border bg-warning-soft p-4 flex gap-3">
              <AlertTriangle className="h-5 w-5 text-warning shrink-0" aria-hidden="true" />
              <p className="text-body-sm text-text-primary">
                Warning — policy caveats, rate-limit notes.
              </p>
            </div>
            <div className="rounded-xl border border-error-border bg-error-soft p-4 flex gap-3">
              <XCircle className="h-5 w-5 text-error shrink-0" aria-hidden="true" />
              <p className="text-body-sm text-text-primary">
                Error — failures, blocked states, destructive confirmation.
              </p>
            </div>
            <div className="rounded-xl border border-info-border bg-info-soft p-4 flex gap-3">
              <Info className="h-5 w-5 text-info shrink-0" aria-hidden="true" />
              <p className="text-body-sm text-text-primary">
                Info — neutral explanatory callouts.
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <IconBadge icon={Zap} size="sm" />
            <IconBadge icon={Zap} size="md" />
            <IconBadge icon={Zap} size="lg" />
            <IconBadge icon={CheckCircle2} tone="success" />
            <IconBadge icon={AlertTriangle} tone="warning" />
            <IconBadge icon={XCircle} tone="error" />
            <IconBadge icon={Info} tone="info" />
            <IconBadge icon={Bot} tone="ink" />
          </div>
        </Container>
      </Section>

      {/* Ink panel */}
      <Section tone="ink">
        <Container size="narrow">
          <SectionHeader
            title={<span className="text-white">Developer surfaces</span>}
            description={
              <span className="text-ink-text-muted">
                Ink is the single approved dark surface, reserved for developer and API content.
              </span>
            }
          />
          <div className="ink-panel">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-ink-elevated border-b border-ink-border">
              <span className="text-xs text-ink-text-muted font-mono">send-message.sh</span>
            </div>
            <pre className="p-4 text-xs sm:text-sm overflow-x-auto font-mono leading-relaxed">
{`curl -X POST https://api.whats91.com/v1/messages \\
  -H "Authorization: Bearer $TOKEN" \\
  -d '{ "to": "91XXXXXXXXXX", "type": "template" }'`}
            </pre>
          </div>
        </Container>
      </Section>

      {/* Brand-soft hero band sample */}
      <Section tone="brand-soft" pad="lg">
        <Container className="text-center">
          <Eyebrow live className="mb-5">Brand-soft section tone</Eyebrow>
          <h2 className="heading-1 mb-4">
            Hero band with <span className="text-gradient">gradient emphasis</span>
          </h2>
          <p className="text-lead max-w-2xl mx-auto mb-8">
            Reserved for page heroes and the closing CTA moment. Never stack two
            brand-soft sections next to each other.
          </p>
          <CTAGroup align="center">
            <PrimaryCTA href="/contact">Primary action</PrimaryCTA>
            <SecondaryCTA href="/faq">Secondary action</SecondaryCTA>
          </CTAGroup>
        </Container>
      </Section>
    </main>
  );
}
