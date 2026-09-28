"use client";

import { useState } from "react";
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

export interface Template {
  id: string;
  name: string;
  category: "marketing" | "utility" | "authentication";
  industry?: string;
  header?: { type: "text" | "image" | "video" | "document"; content: string };
  body: string;
  footer?: string;
  buttons?: { type: "quick_reply" | "url" | "phone" | "copy_code"; text: string; value?: string }[];
  variables: string[];
  useCase: string;
}

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
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(template.body);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            <p className="text-success whitespace-pre-line text-xs leading-relaxed">
              {template.body}
            </p>
          </div>
          <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-success" aria-hidden="true" />
        </div>

        {template.footer && (
          <p className="text-xs text-text-muted italic">{template.footer}</p>
        )}

        {template.buttons && template.buttons.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {template.buttons.map((btn) => (
              <Button key={btn.text} variant="outline" size="sm" className="text-xs h-7">
                {btn.type === "copy_code" && <Copy className="h-3 w-3 mr-1" aria-hidden="true" />}
                {btn.type === "url" && <ExternalLink className="h-3 w-3 mr-1" aria-hidden="true" />}
                {btn.type === "phone" && <MessageCircle className="h-3 w-3 mr-1" aria-hidden="true" />}
                {btn.text}
              </Button>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-1">
          {template.variables.map((variable) => (
            <Badge key={variable} variant="secondary" className="text-[10px]">
              {variable}
            </Badge>
          ))}
        </div>

        <Button size="sm" variant="ghost" className="w-full" onClick={handleCopy}>
          {copied ? (
            <>
              <Check className="h-3 w-3 mr-1 text-success" aria-hidden="true" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-3 w-3 mr-1" aria-hidden="true" />
              Copy Template
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
