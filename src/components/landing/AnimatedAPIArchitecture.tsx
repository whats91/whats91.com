"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { 
  Database,
  Server,
  Code2,
  FileJson,
  FileText,
  FileCode,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  Shield,
  Lock
} from "lucide-react";

const endpoints = [
  { method: "GET", path: "/api/v1/ledger", description: "Fetch ledger data" },
  { method: "GET", path: "/api/v1/outstanding", description: "Outstanding bills" },
  { method: "GET", path: "/api/v1/sales", description: "Sales summary" },
  { method: "GET", path: "/api/v1/inventory", description: "Stock levels" },
];

const outputFormats = [
  { id: "json", icon: FileJson, label: "JSON", color: "text-amber-600", bgColor: "bg-amber-50" },
  { id: "html", icon: FileCode, label: "HTML", color: "text-blue-600", bgColor: "bg-blue-50" },
  { id: "pdf", icon: FileText, label: "PDF", color: "text-red-600", bgColor: "bg-red-50" },
];

const sampleResponses: Record<string, string> = {
  "/api/v1/ledger": `{"success": true, "data": {"party": "Sharma Distributors", "outstanding": 125000, "aging": {"0-30": 45000, "31-60": 32000}}}`,
  "/api/v1/outstanding": `{"success": true, "data": {"total": 425000, "bills": [{"ref": "INV-2501", "amount": 45000}], "overdue": 78000}}`,
  "/api/v1/sales": `{"success": true, "data": {"period": "Jan 2026", "total_sales": 1850000, "growth": "+12.5%"}}`,
  "/api/v1/inventory": `{"success": true, "data": {"items": 1250, "low_stock": 23, "value": 8950000}}`,
};

function CodeBlock() {
  const [activeEndpoint, setActiveEndpoint] = useState(0);
  const [response, setResponse] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [requestStatus, setRequestStatus] = useState<"idle" | "loading" | "success">("idle");
  const responseContainerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const hasInitialized = useRef(false);

  const typeResponse = useCallback((endpointPath: string) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    
    const sampleResponse = sampleResponses[endpointPath] || sampleResponses["/api/v1/ledger"];
    
    setRequestStatus("loading");
    setIsTyping(true);
    setResponse("");
    
    setTimeout(() => {
      setRequestStatus("success");
      
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < sampleResponse.length) {
          setResponse(prev => prev + sampleResponse[i]);
          if (responseContainerRef.current) {
            responseContainerRef.current.scrollTop = responseContainerRef.current.scrollHeight;
          }
          i++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
          isAnimating.current = false;
        }
      }, 15);
    }, 300);
  }, []);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;
    
    const initialTimeout = setTimeout(() => {
      typeResponse(endpoints[activeEndpoint].path);
    }, 400);

    return () => clearTimeout(initialTimeout);
  }, []);

  useEffect(() => {
    const endpointInterval = setInterval(() => {
      setActiveEndpoint(prev => {
        const newIndex = (prev + 1) % endpoints.length;
        typeResponse(endpoints[newIndex].path);
        return newIndex;
      });
    }, 6000);

    return () => clearInterval(endpointInterval);
  }, [typeResponse]);

  return (
    <div className="rounded-lg border border-border/60 bg-white overflow-hidden shadow-md">
      {/* Compact Header */}
      <div className="flex items-center justify-between px-2.5 py-1.5 bg-slate-800">
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-red-400" />
          <div className="h-2 w-2 rounded-full bg-amber-400" />
          <div className="h-2 w-2 rounded-full bg-green-400" />
        </div>
        <span className="text-[9px] text-slate-400 font-mono">api.whats91.com</span>
      </div>

      {/* Request Line */}
      <div className="flex items-center gap-2 px-2.5 py-2 border-b border-border/30 bg-surface/30">
        <span className="px-1.5 py-0.5 text-[9px] font-bold text-green-600 bg-green-100 rounded">GET</span>
        <span className="text-[10px] font-mono text-text-primary flex-1">{endpoints[activeEndpoint].path}</span>
        {requestStatus === "loading" && (
          <RefreshCw className="h-3 w-3 text-brand-primary animate-spin" />
        )}
        {requestStatus === "success" && (
          <CheckCircle2 className="h-3 w-3 text-green-500" />
        )}
      </div>

      {/* Response - Compact */}
      <div 
        ref={responseContainerRef}
        className="p-2 font-mono text-[9px] leading-relaxed bg-slate-900 h-[100px] overflow-y-auto overscroll-contain"
        style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(100, 116, 139, 0.3) transparent' }}
      >
        <div className="flex items-center gap-1 text-slate-400 mb-1.5 text-[8px]">
          <span className="text-green-400">200</span>
          <span>OK</span>
          <span className="text-slate-500">•</span>
          <span>application/json</span>
        </div>
        <pre className="text-slate-300 whitespace-pre-wrap break-all">
          {response}
          {isTyping && <span className="animate-pulse text-brand-primary">▋</span>}
        </pre>
      </div>
    </div>
  );
}

function ArchitectureFlow() {
  const [activeFlow, setActiveFlow] = useState(0);
  const [dataPulse, setDataPulse] = useState(false);

  useEffect(() => {
    const flowInterval = setInterval(() => {
      setActiveFlow(prev => (prev + 1) % 4);
    }, 1500);

    const pulseInterval = setInterval(() => {
      setDataPulse(true);
      setTimeout(() => setDataPulse(false), 400);
    }, 1200);

    return () => {
      clearInterval(flowInterval);
      clearInterval(pulseInterval);
    };
  }, []);

  return (
    <div className="rounded-lg border border-border/60 bg-white p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-medium text-text-primary">Data Flow</span>
        <div className="flex items-center gap-1 text-[9px] text-green-600">
          <div className="h-1 w-1 rounded-full bg-green-500 animate-pulse" />
          Live
        </div>
      </div>

      {/* Horizontal Compact Flow */}
      <div className="flex items-center justify-between gap-1">
        {/* Busy ERP */}
        <div className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg transition-all duration-200 flex-1 ${
          activeFlow === 0 ? "bg-brand-primary/10" : "bg-surface/50"
        }`}>
          <Database className={`h-3.5 w-3.5 ${activeFlow === 0 ? "text-brand-primary" : "text-text-muted"}`} />
          <span className="text-[8px] text-text-primary font-medium">Busy ERP</span>
        </div>

        <ArrowRight className={`h-3 w-3 shrink-0 transition-colors ${activeFlow >= 1 && dataPulse ? "text-brand-primary" : "text-border"}`} />

        {/* API Server */}
        <div className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg transition-all duration-200 flex-1 ${
          activeFlow === 1 ? "bg-brand-primary/10" : "bg-surface/50"
        }`}>
          <Server className={`h-3.5 w-3.5 ${activeFlow === 1 ? "text-brand-primary" : "text-text-muted"}`} />
          <span className="text-[8px] text-text-primary font-medium">API</span>
        </div>

        <ArrowRight className={`h-3 w-3 shrink-0 transition-colors ${activeFlow >= 2 && dataPulse ? "text-brand-primary" : "text-border"}`} />

        {/* Transform */}
        <div className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg transition-all duration-200 flex-1 ${
          activeFlow >= 2 ? "bg-brand-primary/10" : "bg-surface/50"
        }`}>
          <Code2 className={`h-3.5 w-3.5 ${activeFlow >= 2 ? "text-brand-primary" : "text-text-muted"}`} />
          <span className="text-[8px] text-text-primary font-medium">Transform</span>
        </div>

        <ArrowRight className={`h-3 w-3 shrink-0 transition-colors ${activeFlow >= 3 && dataPulse ? "text-brand-primary" : "text-border"}`} />

        {/* Output Formats - Compact */}
        <div className="flex flex-col gap-0.5 flex-1">
          {outputFormats.map((format, i) => (
            <div 
              key={format.id}
              className={`flex items-center gap-1 px-1.5 py-0.5 rounded transition-all duration-200 ${
                activeFlow === 3 && i === (activeFlow % 3) ? "ring-1 ring-border" : ""
              } ${format.bgColor}`}
            >
              <format.icon className={`h-2.5 w-2.5 ${format.color}`} />
              <span className="text-[8px] font-medium text-text-primary">{format.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AnimatedAPIArchitecture() {
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    const requestInterval = setInterval(() => {
      setRequestCount(prev => prev + Math.floor(Math.random() * 10) + 1);
    }, 2000);

    return () => clearInterval(requestInterval);
  }, []);

  return (
    <div className="relative">
      <div className="rounded-xl bg-surface/60 border border-border/50 p-3 sm:p-4 shadow-lg backdrop-blur-sm max-w-[380px] mx-auto">
        {/* Compact Header */}
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-border/60">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary shadow-md shadow-brand-primary/20">
              <Code2 className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold text-text-primary">REST API Engine</p>
              <p className="text-[9px] text-text-muted flex items-center gap-1">
                <span className="h-1 w-1 rounded-full bg-green-500 animate-pulse" />
                99.99% Uptime • {requestCount.toLocaleString()} requests
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 bg-brand-primary/10 rounded-full">
            <Lock className="h-2.5 w-2.5 text-brand-primary" />
            <span className="text-[9px] font-medium text-brand-primary">Secure</span>
          </div>
        </div>

        {/* Architecture Flow - Compact */}
        <div className="mb-3">
          <ArchitectureFlow />
        </div>

        {/* Code Block - Compact */}
        <div className="mb-3">
          <CodeBlock />
        </div>

        {/* Security Badges - Compact Row */}
        <div className="flex items-center gap-1.5 mb-3">
          {[{ icon: Shield, label: "HTTPS" }, { icon: Lock, label: "Token" }, { icon: Database, label: "Multi-Co" }].map((item, i) => (
            <div key={i} className="flex items-center gap-1 px-1.5 py-1 rounded bg-surface border border-border/40">
              <item.icon className="h-2.5 w-2.5 text-brand-primary" />
              <span className="text-[8px] text-text-secondary">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Compact Footer */}
        <div className="flex items-center justify-between text-[9px] pt-2 border-t border-border/60">
          <div className="flex items-center gap-1 text-text-muted">
            <RefreshCw className="h-2.5 w-2.5" />
            <span>Sub-100ms response</span>
          </div>
          <div className="flex items-center gap-1 text-brand-primary font-medium">
            <CheckCircle2 className="h-2.5 w-2.5" />
            <span>24/7 Available</span>
          </div>
        </div>
      </div>

      {/* Floating Badge - Smaller */}
      <div className="absolute -bottom-2 -right-2 sm:right-0 hidden sm:flex rounded-lg bg-white border border-border/60 px-2 py-1.5 shadow-md">
        <div className="flex items-center gap-1.5">
          <div className="h-5 w-5 rounded-full bg-amber-50 flex items-center justify-center">
            <FileJson className="h-2.5 w-2.5 text-amber-600" />
          </div>
          <div>
            <p className="text-[9px] font-semibold text-text-primary">JSON • HTML • PDF</p>
            <p className="text-[8px] text-text-muted">Multi-format</p>
          </div>
        </div>
      </div>
    </div>
  );
}
