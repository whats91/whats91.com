"use client";

import { useState } from "react";
import { useResourceCopy } from "@/components/shared/useResourceCopy";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  ChevronDown,
  ChevronRight,
  Bot,
  Copy,
  Check,
  Code,
  Play,
  ShoppingCart,
  MessageCircle,
  Package,
  DollarSign,
  Calendar,
  Sparkles,
} from "lucide-react";
import {
  flowCategories,
  getFlowsByCategory,
  getCategoryById,
  type FlowMetadata,
} from "@/lib/flows/registry";

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  ShoppingCart,
  MessageCircle,
  Package,
  DollarSign,
  Calendar,
};

const complexityColors: Record<string, string> = {
  basic: "bg-success-soft text-success border-success-border",
  intermediate: "bg-warning-soft text-warning border-warning-border",
  advanced: "bg-error-soft text-error border-error-border",
};

function FlowLibraryCard({
  item,
  isExpanded,
  onToggle,
}: {
  item: FlowMetadata;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const category = getCategoryById(item.category);
  const copy = useResourceCopy(item.id);
  const readJSON = async () => {
    const response = await fetch(`/api/flows/${item.id}`);
    if (!response.ok || !response.headers.get("content-type")?.includes("application/json")) throw new Error("Example unavailable");
    const text = await response.text();
    JSON.parse(text);
    return text;
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {category && (
              <div className={`p-1.5 rounded-lg ${category.bgColor}`}>
                {(() => {
                  const IconComponent = iconMap[category.icon] || Bot;
                  return <IconComponent className={`h-4 w-4 ${category.color}`} />;
                })()}
              </div>
            )}
            <Badge variant="outline" className="text-[10px]">
              {category?.name || item.category}
            </Badge>
          </div>
          <Badge className={complexityColors[item.complexity]}>
            {item.complexity}
          </Badge>
        </div>
        <CardTitle className="text-base font-semibold mt-2">{item.name}</CardTitle>
        <CardDescription className="text-xs">{item.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-1">
          {item.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[10px]">
              {tag}
            </Badge>
          ))}
        </div>

        <details open={isExpanded} onToggle={event => { if (event.currentTarget.open !== isExpanded) onToggle(); }}>
          <summary className="min-h-11 cursor-pointer py-3 text-sm font-medium text-brand-700">View example details</summary>

            <div className="mt-4 space-y-4">
              <div className="p-3 bg-surface rounded-lg">
                <p className="text-xs font-medium text-text-primary mb-1">Use Case</p>
                <p className="text-xs text-text-secondary">{item.useCase}</p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <Code className="h-3 w-3 text-brand-primary" aria-hidden="true" />
                <span className="text-text-muted">ID:</span>
                <code className="font-mono text-text-primary bg-surface px-1.5 py-0.5 rounded text-[10px]">
                  {item.id}
                </code>
              </div>

              <div className="space-y-3 border-t border-border/50 pt-3">
                <div className="flex flex-wrap gap-2">
                  <Button type="button" size="sm" variant="outline" onClick={() => copy.copy(readJSON)} disabled={!copy.hydrated || copy.pending}>
                    <Copy className="h-3 w-3 mr-1" aria-hidden="true" />Copy JSON
                  </Button>
                  <a className="inline-flex min-h-11 items-center rounded-lg border border-border px-3 text-sm font-medium text-brand-700" href={`/api/flows/${item.id}`} download={`${item.id}.json`}>Download JSON</a>
                </div>
                <p role="status" className="text-caption">{copy.status}</p>
                {copy.text && <label className="block text-caption">JSON for manual copy
                  <textarea readOnly aria-label={`JSON example: ${item.name}`} value={copy.text} rows={8} wrap="off" className="mt-2 block w-full min-w-0 max-w-full rounded-lg border border-border p-2 font-mono text-xs" />
                </label>}
                <p className="text-caption">Import is unavailable on this website. This download is an example; confirm your builder’s version, schema and integrations before use.</p>
              </div>
            </div>
        </details>
      </CardContent>
    </Card>
  );
}

export function ChatbotFlowLibrary() {
  const [activeCategory, setActiveCategory] = useState("welcome");
  const [expandedFlows, setExpandedFlows] = useState<Set<string>>(new Set());

  const toggleFlow = (flowId: string) => {
    setExpandedFlows((prev) => {
      const next = new Set(prev);
      if (next.has(flowId)) {
        next.delete(flowId);
      } else {
        next.add(flowId);
      }
      return next;
    });
  };

  const categoryFlows = getFlowsByCategory(activeCategory);
  const activeCategoryData = getCategoryById(activeCategory);

  return (
    <>
      <p className="mb-4 text-caption">Category filters and copying need JavaScript. Without scripts, use the full download list below; native detail disclosures still open.</p>
      {/* Category Navigation */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Select Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {flowCategories.map((category) => {
            const IconComponent = iconMap[category.icon] || Bot;
            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-300 ${
                  activeCategory === category.id
                    ? "border-brand-primary bg-brand-primary/5 shadow-md"
                    : "border-border/60 hover:border-border hover:bg-surface/50"
                }`}
              >
                <div className={`p-2 rounded-lg ${category.bgColor}`}>
                  <IconComponent className={`h-5 w-5 ${category.color}`} />
                </div>
                <span
                  className={`text-xs font-medium text-center ${
                    activeCategory === category.id ? "text-primary" : "text-text-secondary"
                  }`}
                >
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Description */}
      {activeCategoryData && (
        <div className="mb-6 p-4 rounded-xl bg-surface/50 border border-border/40">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${activeCategoryData.bgColor}`}>
              {(() => {
                const IconComponent = iconMap[activeCategoryData.icon] || Bot;
                return <IconComponent className={`h-5 w-5 ${activeCategoryData.color}`} />;
              })()}
            </div>
            <div>
              <h3 className="text-base font-semibold text-text-primary">
                {activeCategoryData.name} Flows
              </h3>
              <p className="text-sm text-text-secondary">{activeCategoryData.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Flow Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categoryFlows.length > 0 ? (
          categoryFlows.map((item) => (
            <FlowLibraryCard
              key={item.id}
              item={item}
              isExpanded={expandedFlows.has(item.id)}
              onToggle={() => toggleFlow(item.id)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Bot className="h-12 w-12 text-text-muted mx-auto mb-4" aria-hidden="true" />
            <p className="text-text-secondary">No flows available for this category yet.</p>
          </div>
        )}
      </div>
    </>
  );
}
