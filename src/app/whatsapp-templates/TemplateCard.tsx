"use client";

import { useResourceCopy } from "@/components/shared/useResourceCopy";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Copy,
  Check,
  FileText,
  Smartphone,
  Building,
  ShoppingCart,
  Plane,
  Heart,
  Home,
  GraduationCap,
  CreditCard,
  Settings,
  ExternalLink,
} from "lucide-react";

import type { Template } from "@/lib/message-examples";
export type { Template } from "@/lib/message-examples";

const industryIcons: Record<string, React.ElementType> = {
  "E-commerce": ShoppingCart,
  Retail: ShoppingCart,
  Travel: Plane,
  Healthcare: Heart,
  Finance: CreditCard,
  Utilities: Home,
  Education: GraduationCap,
  All: Building,
  Services: Settings,
};

const categoryBadgeClass: Record<Template["category"], string> = {
  marketing: "bg-info text-white",
  utility: "bg-brand-600 text-white",
  authentication: "",
};

export function TemplateCard({ template }: { template: Template }) {
  const copy = useResourceCopy(`${template.id}|${template.body}`);

  const IndustryIcon = template.industry ? industryIcons[template.industry] || Building : Building;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <IndustryIcon className="h-4 w-4 text-brand-primary" aria-hidden="true" />
            {template.industry && (
              <Badge variant="outline" className="text-[10px]">
                {template.industry}
              </Badge>
            )}
          </div>
          <Badge
            variant={template.category === "authentication" ? "outline" : "default"}
            className={categoryBadgeClass[template.category]}
          >
            {template.category}
          </Badge>
        </div>
        <CardTitle className="text-base font-semibold mt-2">{template.name}</CardTitle>
        <CardDescription className="text-xs">{template.useCase}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {template.header && (
          <div className="p-2 bg-surface rounded text-xs text-text-muted flex items-center gap-2">
            {template.header.type === "image" && <FileText className="h-3 w-3" aria-hidden="true" />}
            {template.header.type === "video" && <Smartphone className="h-3 w-3" aria-hidden="true" />}
            {template.header.type === "document" && <FileText className="h-3 w-3" aria-hidden="true" />}
            <span>Header: {template.header.content}</span>
          </div>
        )}

        <div className="relative">
          <div className="bg-success-soft rounded-lg p-3 text-sm border border-success-border">
            <label className="block text-xs font-medium text-success">Illustrative message body
              <textarea readOnly aria-label={`Message body: ${template.name}`} value={template.body} rows={4} className="mt-2 block w-full min-w-0 resize-y bg-transparent text-xs leading-relaxed text-text-primary" />
            </label>
          </div>
          <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-success" aria-hidden="true" />
        </div>

        {template.footer && (
          <p className="text-xs text-text-muted italic">{template.footer}</p>
        )}

        {template.buttons && template.buttons.length > 0 && (
          <div className="space-y-2">
            <p className="text-caption">Example message actions · illustrative only; no action runs here.</p>
            <div className="flex flex-wrap gap-2">{template.buttons.map((btn) => (
              <span key={btn.text} className="inline-flex items-center rounded-lg border border-border px-2 py-1 text-xs">
                {btn.type === "copy_code" && <Copy className="h-3 w-3 mr-1" aria-hidden="true" />}
                {btn.type === "url" && <ExternalLink className="h-3 w-3 mr-1" aria-hidden="true" />}
                {btn.type === "phone" && <MessageCircle className="h-3 w-3 mr-1" aria-hidden="true" />}
                {btn.text}
              </span>
            ))}</div>
          </div>
        )}

        <div className="flex flex-wrap gap-1">
          {template.variables.map((variable) => (
            <Badge key={variable} variant="secondary" className="text-[10px]">
              {variable}
            </Badge>
          ))}
        </div>

        <Button type="button" size="sm" variant="ghost" className="w-full" disabled={!copy.hydrated || copy.pending} onClick={() => copy.copy(() => template.body)}>
          <Copy className="h-3 w-3 mr-1" aria-hidden="true" />Copy message body
        </Button>
        <p role="status" className="text-caption">{copy.status}</p>
        <p className="text-caption">Copy needs JavaScript. You can always select the message body. This example is not an approved template for your account.</p>
      </CardContent>
    </Card>
  );
}
