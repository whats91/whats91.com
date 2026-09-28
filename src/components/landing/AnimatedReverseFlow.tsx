"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { 
  Database,
  Server,
  FileSpreadsheet,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Zap,
  Shield,
  RefreshCw
} from "lucide-react";

type FlowStepType = {
  id: number;
  label: string;
  icon: React.ElementType;
};

const traditionalFlow: FlowStepType[] = [
  { id: 1, label: "Busy ERP", icon: Database },
  { id: 2, label: "Push Data", icon: ArrowRight },
  { id: 3, label: "Google Sheets", icon: FileSpreadsheet },
];

const reverseFlow: FlowStepType[] = [
  { id: 1, label: "Busy ERP", icon: Database },
  { id: 2, label: "API Server", icon: Server },
  { id: 3, label: "Pull Request", icon: ArrowLeft },
  { id: 4, label: "Google Sheets", icon: FileSpreadsheet },
];

function TraditionalFlowDemo({ isActive }: { isActive: boolean }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [requestCount, setRequestCount] = useState(0);
  const [hasError, setHasError] = useState(false);
  const isDemoRunning = useRef(false);
  const demoTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasErrorRef = useRef(false);

  useEffect(() => {
    if (!isActive) return;

    const runDemo = () => {
      if (isDemoRunning.current) return;
      isDemoRunning.current = true;
      hasErrorRef.current = false;

      // Reset
      setCurrentStep(0);
      setHasError(false);

      // Simulate push attempts
      const pushData = () => {
        if (hasErrorRef.current) return;
        
        setRequestCount(prev => {
          const newCount = prev + 1;
          
          // Trigger error at 60 requests (simulating API quota)
          if (newCount >= 60) {
            setHasError(true);
            hasErrorRef.current = true;
            setCurrentStep(0);
            isDemoRunning.current = false;
            
            // Restart after delay
            demoTimeoutRef.current = setTimeout(() => {
              setRequestCount(0);
              runDemo();
            }, 3000);
            return newCount;
          }
          
          // Continue
          setCurrentStep(s => (s + 1) % 4);
          setTimeout(pushData, 150);
          
          return newCount;
        });
      };

      setTimeout(pushData, 500);
    };

    runDemo();

    return () => {
      isDemoRunning.current = false;
      hasErrorRef.current = true;
      if (demoTimeoutRef.current) {
        clearTimeout(demoTimeoutRef.current);
      }
    };
  }, [isActive]);

  return (
    <div className="rounded-xl border border-red-200 bg-red-50/50 p-4">
      <div className="flex items-center gap-2 mb-4">
        <XCircle className="h-4 w-4 text-red-500" />
        <span className="text-sm font-medium text-red-700">Traditional Push Method</span>
      </div>
      
      {/* Flow visualization */}
      <div className="flex items-center justify-between mb-4">
        {traditionalFlow.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`
              flex flex-col items-center p-2 rounded-lg transition-all duration-300
              ${currentStep === index && !hasError ? "bg-red-100 ring-2 ring-red-400" : "bg-white/50"}
              ${hasError ? "opacity-50" : ""}
            `}>
              <div className={`
                h-8 w-8 rounded-full flex items-center justify-center
                ${currentStep === index && !hasError ? "bg-red-500 text-white" : "bg-slate-200 text-slate-500"}
              `}>
                <step.icon className="h-4 w-4" />
              </div>
              <span className="text-[10px] text-slate-600 mt-1">{step.label}</span>
            </div>
            {index < traditionalFlow.length - 1 && (
              <ArrowRight className={`h-4 w-4 mx-1 ${currentStep === index && !hasError ? "text-red-500" : "text-slate-300"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Request counter */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-500">API Requests:</span>
          <div className="h-2 w-24 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-100 ${hasError ? "bg-red-500" : "bg-orange-400"}`}
              style={{ width: `${Math.min((requestCount / 60) * 100, 100)}%` }}
            />
          </div>
          <span className={hasError ? "text-red-600 font-medium" : "text-slate-600"}>{requestCount}/60</span>
        </div>
        {hasError && (
          <span className="text-red-600 font-medium flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            429 Error
          </span>
        )}
      </div>

      {hasError && (
        <div className="mt-3 p-2 bg-red-100 rounded-lg border border-red-200">
          <p className="text-xs text-red-700">
            <span className="font-semibold">Quota exceeded!</span> Google Sheets API has a 60 req/min limit.
          </p>
        </div>
      )}
    </div>
  );
}

function ReverseFlowDemo({ isActive }: { isActive: boolean }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [dataPoints, setDataPoints] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const isDemoRunning = useRef(false);
  const demoTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const runDemo = useCallback(() => {
    if (isDemoRunning.current) return;
    isDemoRunning.current = true;

    const runCycle = () => {
      // Step through the flow
      for (let i = 0; i < 4; i++) {
        setTimeout(() => {
          setCurrentStep(i);
          if (i === 1) {
            setIsProcessing(true);
          }
          if (i === 2) {
            setIsProcessing(false);
            setDataPoints(prev => prev + 1);
          }
        }, i * 600);
      }

      // Restart cycle
      setTimeout(() => {
        setCurrentStep(0);
        runCycle();
      }, 3000);
    };

    setCurrentStep(0);
    runCycle();
  }, []);

  useEffect(() => {
    if (isActive) {
      runDemo();
    }
    return () => {
      isDemoRunning.current = false;
      if (demoTimeoutRef.current) {
        clearTimeout(demoTimeoutRef.current);
      }
    };
  }, [isActive, runDemo]);

  return (
    <div className="rounded-xl border border-green-200 bg-green-50/50 p-4">
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle2 className="h-4 w-4 text-green-600" />
        <span className="text-sm font-medium text-green-700">Whats91 Reverse Flow</span>
      </div>
      
      {/* Flow visualization */}
      <div className="flex items-center justify-between mb-4">
        {reverseFlow.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`
              flex flex-col items-center p-2 rounded-lg transition-all duration-300
              ${currentStep === index ? "bg-green-100 ring-2 ring-green-400" : "bg-white/50"}
            `}>
              <div className={`
                h-8 w-8 rounded-full flex items-center justify-center relative
                ${currentStep === index ? "bg-green-500 text-white" : "bg-slate-200 text-slate-500"}
              `}>
                <step.icon className="h-4 w-4" />
                {index === 1 && isProcessing && (
                  <div className="absolute -top-1 -right-1">
                    <RefreshCw className="h-3 w-3 text-green-500 animate-spin" />
                  </div>
                )}
              </div>
              <span className="text-[10px] text-slate-600 mt-1">{step.label}</span>
            </div>
            {index < reverseFlow.length - 1 && (
              <ArrowRight className={`h-4 w-4 mx-1 ${currentStep === index ? "text-green-500" : "text-slate-300"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Status */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-500">Data Points Synced:</span>
          <span className="text-green-600 font-medium">{dataPoints}</span>
        </div>
        <div className="flex items-center gap-1.5 text-green-600">
          <Shield className="h-3 w-3" />
          <span>No API limits</span>
        </div>
      </div>

      <div className="mt-3 p-2 bg-green-100 rounded-lg border border-green-200">
        <p className="text-xs text-green-700">
          <span className="font-semibold">Stable connection.</span> Sheet pulls data on demand—no push limits!
        </p>
      </div>
    </div>
  );
}

function ComparisonTable() {
  const rows = [
    { feature: "Data Movement", traditional: "Pushes to Google (Unstable)", whats91: "Sheet pulls from Server (Stable)", isPositive: true },
    { feature: "Google API Limits", traditional: "Fails when quotas reached", whats91: "Bypasses push limit entirely", isPositive: true },
    { feature: "Data Structure", traditional: "Fixed, predefined columns", whats91: "100% custom SQL queries", isPositive: true },
    { feature: "Uptime & Reliability", traditional: "Breaks on high-frequency", whats91: "99.99% Uptime Infrastructure", isPositive: true },
    { feature: "Multi-Company Logic", traditional: "Data often gets mixed", whats91: "Strict company isolation", isPositive: true },
  ];

  return (
    <div className="rounded-xl border border-border/60 bg-white overflow-hidden">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-surface">
            <th className="px-3 py-2.5 text-left font-medium text-text-primary">Feature</th>
            <th className="px-3 py-2.5 text-left font-medium text-red-600">Traditional</th>
            <th className="px-3 py-2.5 text-left font-medium text-green-600">Whats91</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-border/40">
              <td className="px-3 py-2 text-text-primary font-medium">{row.feature}</td>
              <td className="px-3 py-2 text-text-secondary">{row.traditional}</td>
              <td className="px-3 py-2 text-green-600 font-medium flex items-center gap-1">
                {row.isPositive && <CheckCircle2 className="h-3 w-3 shrink-0" />}
                {row.whats91}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AnimatedReverseFlow() {
  const [showComparison, setShowComparison] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    // Toggle comparison view periodically
    const interval = setInterval(() => {
      setShowComparison(prev => !prev);
      setCycleCount(prev => prev + 1);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <div className="rounded-2xl bg-surface/60 border border-border/50 p-4 sm:p-5 shadow-lg backdrop-blur-sm max-w-[420px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/60">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary shadow-md shadow-brand-primary/20">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">Reverse Flow Architecture</p>
              <p className="text-[10px] text-text-muted flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Bypasses Google API limits
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-green-50 rounded-full">
            <Shield className="h-3 w-3 text-green-600" />
            <span className="text-[10px] font-medium text-green-700">99.99% Uptime</span>
          </div>
        </div>

        {/* Architecture Diagram */}
        <div className="space-y-4 mb-4">
          <ReverseFlowDemo isActive={true} />
          <TraditionalFlowDemo isActive={true} />
        </div>

        {/* Comparison Table */}
        <div className={`
          transition-all duration-500 overflow-hidden
          ${showComparison ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}
        `}>
          <ComparisonTable />
        </div>

        {/* Info Footer */}
        <div className="mt-4 pt-3 border-t border-border/60">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-text-muted">
              <RefreshCw className="h-3 w-3" />
              <span>Sheet pulls data on demand</span>
            </div>
            <span className="text-brand-primary font-medium">
              Demo #{cycleCount + 1}
            </span>
          </div>
        </div>
      </div>

      {/* Floating Badge */}
      <div className="absolute -bottom-3 -right-3 sm:right-0 hidden sm:flex rounded-xl bg-white border border-border/60 px-3 py-2 shadow-lg">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-green-100 flex items-center justify-center">
            <Shield className="h-3.5 w-3.5 text-green-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-primary">No API Quotas</p>
            <p className="text-[10px] text-text-muted">Stable & reliable</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
