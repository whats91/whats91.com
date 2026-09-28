"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCopyJSON = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/flows/${item.id}`);
      if (!response.ok) throw new Error("Failed to fetch flow");

      const flowData = await response.json();
      await navigator.clipboard.writeText(JSON.stringify(flowData, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Error copying flow:", error);
    } finally {
      setLoading(false);
    }
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

        <Collapsible open={isExpanded} onOpenChange={onToggle}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full text-xs">
              {isExpanded ? (
                <>
                  <ChevronDown className="h-3 w-3 mr-1" aria-hidden="true" />
                  Hide Details
                </>
              ) : (
                <>
                  <ChevronRight className="h-3 w-3 mr-1" aria-hidden="true" />
                  View Details
                </>
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
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

              <div className="flex gap-2 pt-2 border-t border-border/50">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 text-xs"
                  onClick={handleCopyJSON}
                  disabled={loading}
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 mr-1" aria-hidden="true" />
                      Copied!
                    </>
                  ) : loading ? (
                    <>
                      <span className="h-3 w-3 mr-1 animate-spin motion-reduce:animate-none">⏳</span>
                      Loading...
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 mr-1" aria-hidden="true" />
                      Copy JSON
                    </>
                  )}
                </Button>
                <Button size="sm" className="flex-1 text-xs bg-brand-600 text-white hover:bg-brand-700">
                  <Play className="h-3 w-3 mr-1" aria-hidden="true" />
                  Use Flow
                </Button>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
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
      {/* Category Navigation */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Select Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {flowCategories.map((category) => {
            const IconComponent = iconMap[category.icon] || Bot;
            return (
              <button
                key={category.id}
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
                    activeCategory === category.id ? "text-brand-primary" : "text-text-secondary"
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
