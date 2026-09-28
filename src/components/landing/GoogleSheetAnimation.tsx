"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { 
  Database,
  ArrowDown,
  CheckCircle2,
  RefreshCw,
  Monitor
} from "lucide-react";

// Sample data rows that will appear one by one
const sampleData = [
  { id: 1, customer: "ABC Traders", invoice: "INV-2024-001", amount: "₹45,000", status: "Paid" },
  { id: 2, customer: "XYZ Enterprises", invoice: "INV-2024-002", amount: "₹82,500", status: "Pending" },
  { id: 3, customer: "Global Supplies", invoice: "INV-2024-003", amount: "₹1,25,000", status: "Paid" },
  { id: 4, customer: "Tech Solutions", invoice: "INV-2024-004", amount: "₹67,800", status: "Overdue" },
  { id: 5, customer: "Prime Distributors", invoice: "INV-2024-005", amount: "₹93,200", status: "Pending" },
];

function StatusBadge({ status }: { status: string }) {
  const colors = {
    Paid: "bg-green-100 text-green-700 border-green-200",
    Pending: "bg-amber-100 text-amber-700 border-amber-200",
    Overdue: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full border ${colors[status as keyof typeof colors]}`}>
      {status}
    </span>
  );
}

export function GoogleSheetAnimation() {
  const [visibleRows, setVisibleRows] = useState<number[]>([]);
  const [highlightedRow, setHighlightedRow] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [syncCount, setSyncCount] = useState(0);
  const isMounted = useRef(false);

  const runAnimation = useCallback(() => {
    // Reset
    setVisibleRows([]);
    setHighlightedRow(null);
    setIsRefreshing(true);

    // Show refreshing state briefly
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);

    // Add rows one by one with delay
    sampleData.forEach((_, index) => {
      setTimeout(() => {
        setVisibleRows(prev => [...prev, index]);
        setHighlightedRow(index);
        
        // Remove highlight after a moment
        setTimeout(() => {
          setHighlightedRow(null);
        }, 600);
      }, 1000 + index * 700);
    });

    // Increment sync count after all rows loaded
    setTimeout(() => {
      setSyncCount(prev => prev + 1);
    }, 1000 + sampleData.length * 700 + 500);
  }, []);

  useEffect(() => {
    // Only run animation after initial mount
    if (!isMounted.current) {
      isMounted.current = true;
      // Use setTimeout to defer the first animation call
      const timer = setTimeout(() => {
        runAnimation();
      }, 0);
      
      // Repeat every 10 seconds
      const interval = setInterval(() => {
        runAnimation();
      }, 10000);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }

    // Repeat every 10 seconds
    const interval = setInterval(() => {
      runAnimation();
    }, 10000);

    return () => clearInterval(interval);
  }, [runAnimation]);

  return (
    <div className="relative">
      {/* Desktop Window Container */}
      <div className="rounded-2xl bg-surface/60 border border-border/50 shadow-xl backdrop-blur-sm max-w-[480px] mx-auto overflow-hidden">
        
        {/* Desktop Window Header */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Window Controls */}
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors" />
              <div className="h-3 w-3 rounded-full bg-amber-400 hover:bg-amber-500 transition-colors" />
              <div className="h-3 w-3 rounded-full bg-green-400 hover:bg-green-500 transition-colors" />
            </div>
          </div>
          
          {/* URL Bar */}
          <div className="flex-1 mx-4">
            <div className="bg-white rounded-md px-3 py-1 flex items-center gap-2 border border-slate-200">
              <Monitor className="h-3 w-3 text-slate-400" />
              <span className="text-[11px] text-slate-500 truncate">
                docs.google.com/spreadsheets/d/busy-invoice-sync
              </span>
            </div>
          </div>

          {/* Sync Indicator */}
          <div className="flex items-center gap-1.5 px-2 py-1 bg-green-50 rounded-md border border-green-200">
            <RefreshCw className={`h-3 w-3 text-green-600 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="text-[10px] font-medium text-green-700">
              {isRefreshing ? 'Syncing...' : 'Live'}
            </span>
          </div>
        </div>

        {/* Google Sheet Toolbar */}
        <div className="bg-white border-b border-slate-200 px-4 py-2">
          <div className="flex items-center gap-3">
            {/* Sheet Icon */}
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-green-600 rounded-sm flex items-center justify-center">
                <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 11H5v2h14v-2zm0-4H5v2h14V7zm0 8H5v2h14v-2zm-7-8v2h2V7h-2z"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">Busy Invoice Sync</p>
                <p className="text-[10px] text-slate-500">Last sync: Just now</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sheet Grid */}
        <div className="bg-white p-4">
          {/* Data Source Indicator */}
          <div className="flex items-center gap-2 mb-3 px-1">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-brand-primary/10 rounded-md border border-brand-primary/20">
              <Database className="h-3 w-3 text-brand-primary" />
              <span className="text-[10px] font-medium text-brand-primary">Busy ERP → Google Sheets</span>
            </div>
            <ArrowDown className="h-3 w-3 text-slate-400" />
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-12 gap-0 border border-slate-200 rounded-t-lg overflow-hidden text-[11px]">
            <div className="col-span-2 bg-slate-50 px-3 py-2 font-semibold text-slate-600 border-r border-slate-200">
              Customer
            </div>
            <div className="col-span-3 bg-slate-50 px-3 py-2 font-semibold text-slate-600 border-r border-slate-200">
              Invoice No.
            </div>
            <div className="col-span-3 bg-slate-50 px-3 py-2 font-semibold text-slate-600 border-r border-slate-200">
              Amount
            </div>
            <div className="col-span-4 bg-slate-50 px-3 py-2 font-semibold text-slate-600">
              Status
            </div>
          </div>

          {/* Table Body - Fixed Height */}
          <div className="border-x border-b border-slate-200 rounded-b-lg overflow-hidden">
            {sampleData.map((row, index) => (
              <div
                key={row.id}
                className={`
                  grid grid-cols-12 gap-0 text-[11px] border-b border-slate-100 last:border-b-0
                  transition-all duration-300
                  ${visibleRows.includes(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-2'}
                  ${highlightedRow === index 
                    ? 'bg-green-50' 
                    : 'bg-white hover:bg-slate-50'}
                `}
                style={{
                  transitionDelay: `${index * 50}ms`,
                  height: '36px', // Fixed height for each row
                }}
              >
                <div className="col-span-2 px-3 py-2 text-slate-700 border-r border-slate-100 truncate">
                  {visibleRows.includes(index) && row.customer}
                </div>
                <div className="col-span-3 px-3 py-2 text-slate-600 font-mono border-r border-slate-100">
                  {visibleRows.includes(index) && row.invoice}
                </div>
                <div className="col-span-3 px-3 py-2 text-slate-700 font-medium border-r border-slate-100">
                  {visibleRows.includes(index) && row.amount}
                </div>
                <div className="col-span-4 px-3 py-2 flex items-center">
                  {visibleRows.includes(index) && <StatusBadge status={row.status} />}
                </div>
              </div>
            ))}
            
            {/* Empty placeholder rows to maintain height */}
            {[...Array(Math.max(0, 5 - sampleData.length))].map((_, i) => (
              <div
                key={`empty-${i}`}
                className="grid grid-cols-12 gap-0 text-[11px] border-b border-slate-100 last:border-b-0 bg-slate-50/50"
                style={{ height: '36px' }}
              >
                <div className="col-span-12 px-3 py-2 text-slate-400 italic">
                  {/* Empty row placeholder */}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-4 py-3">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                <span className="text-slate-600">
                  <span className="font-medium text-slate-800">{visibleRows.length}</span> rows synced
                </span>
              </div>
              <div className="h-4 w-px bg-slate-200" />
              <span className="text-slate-500">
                Sync #{syncCount + 1}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-green-600">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="font-medium">Auto-refresh ON</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Source Badge */}
      <div className="absolute -left-2 top-1/2 -translate-y-1/2 hidden lg:flex">
        <div className="rounded-lg bg-white border border-border/60 px-3 py-2 shadow-lg">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-brand-primary/10 flex items-center justify-center">
              <Database className="h-4 w-4 text-brand-primary" />
            </div>
            <div>
              <p className="text-xs font-semibold text-text-primary">Busy ERP</p>
              <p className="text-[10px] text-text-muted">Data Source</p>
            </div>
          </div>
        </div>
      </div>

      {/* Connection Line (visual only) */}
      <div className="absolute -left-2 top-1/2 hidden lg:flex items-center">
        <div className="w-8 flex items-center justify-center">
          <div className="h-px w-full bg-gradient-to-r from-brand-primary/30 to-transparent" />
        </div>
      </div>

      <style jsx>{`
        @keyframes rowFadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
