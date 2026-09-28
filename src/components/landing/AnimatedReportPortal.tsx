"use client";

import { useState, useEffect } from "react";
import { 
  Monitor,
  Smartphone,
  FileText,
  TrendingUp,
  CreditCard,
  Clock,
  Building2
} from "lucide-react";

// The three main reports to display
const reports = [
  { 
    id: "ledger", 
    name: "Ledger Report", 
    icon: FileText,
    data: {
      party: "ABC Trading Co.",
      opening: "₹1,25,000",
      debit: "₹4,52,000",
      credit: "₹3,85,000",
      closing: "₹1,92,000"
    }
  },
  { 
    id: "bill-by-bill", 
    name: "Bill-by-Bill Outstanding", 
    icon: CreditCard,
    data: {
      totalBills: 24,
      overdue: 6,
      pending: "₹28,45,000",
      avgDays: 32
    }
  },
  { 
    id: "sales-invoice", 
    name: "Sales Invoice", 
    icon: TrendingUp,
    data: {
      todayInvoices: 18,
      todaySales: "₹4,52,000",
      monthlySales: "₹1,24,50,000",
      growth: "+12.5%"
    }
  }
];

function MobileReportView() {
  const [activeReport, setActiveReport] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReport(prev => (prev + 1) % reports.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const currentReport = reports[activeReport];
  const IconComponent = currentReport.icon;

  return (
    <div className="flex flex-col items-center">
      {/* Phone Frame */}
      <div className="w-[220px] rounded-[32px] border-[6px] border-slate-800 bg-slate-900 p-2 shadow-2xl">
        {/* Notch */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-3 rounded-full bg-slate-800 z-10" />
        
        {/* Screen */}
        <div className="rounded-[22px] bg-white overflow-hidden">
          {/* Status Bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border-b border-slate-200">
            <span className="text-[11px] font-medium text-slate-600">9:41</span>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-2.5 rounded-sm bg-green-500" />
            </div>
          </div>

          {/* App Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-brand-primary">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-white" />
              <span className="text-sm font-semibold text-white">Busy Reports</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-white/80">
              <Clock className="h-3.5 w-3.5" />
              Live
            </div>
          </div>

          {/* Report Tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50">
            {reports.map((report, idx) => {
              const TabIcon = report.icon;
              return (
                <div 
                  key={report.id}
                  className={`flex-1 flex flex-col items-center py-2.5 transition-all ${
                    activeReport === idx 
                      ? "bg-white border-b-2 border-brand-primary" 
                      : ""
                  }`}
                >
                  <TabIcon className={`h-4 w-4 mb-0.5 ${activeReport === idx ? "text-brand-primary" : "text-slate-400"}`} />
                  <span className={`text-[9px] ${activeReport === idx ? "text-brand-primary font-medium" : "text-slate-400"}`}>
                    {report.name.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Report Content */}
          <div className="p-4 min-h-[180px]">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="h-9 w-9 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                  <IconComponent className="h-5 w-5 text-brand-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">{currentReport.name}</p>
                  <p className="text-[10px] text-slate-500">Updated just now</p>
                </div>
              </div>

              {/* Report Specific Data */}
              {currentReport.id === "ledger" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Party:</span>
                    <span className="font-medium text-slate-700">{currentReport.data.party}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Opening:</span>
                    <span className="text-slate-700">{currentReport.data.opening}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Debit:</span>
                    <span className="text-red-600">{currentReport.data.debit}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Credit:</span>
                    <span className="text-green-600">{currentReport.data.credit}</span>
                  </div>
                  <div className="flex justify-between text-[11px] pt-2 border-t border-slate-200">
                    <span className="text-slate-600 font-medium">Closing:</span>
                    <span className="font-bold text-brand-primary">{currentReport.data.closing}</span>
                  </div>
                </div>
              )}

              {currentReport.id === "bill-by-bill" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Total Bills:</span>
                    <span className="font-medium text-slate-700">{currentReport.data.totalBills}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Overdue:</span>
                    <span className="text-red-600 font-medium">{currentReport.data.overdue}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Pending Amt:</span>
                    <span className="font-bold text-brand-primary">{currentReport.data.pending}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Avg Days:</span>
                    <span className="text-slate-700">{currentReport.data.avgDays} days</span>
                  </div>
                </div>
              )}

              {currentReport.id === "sales-invoice" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Today's Invoices:</span>
                    <span className="font-medium text-slate-700">{currentReport.data.todayInvoices}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Today's Sales:</span>
                    <span className="font-bold text-brand-primary">{currentReport.data.todaySales}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Monthly Sales:</span>
                    <span className="text-slate-700">{currentReport.data.monthlySales}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Growth:</span>
                    <span className="text-green-600 font-medium">{currentReport.data.growth}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Navigation Dots */}
          <div className="flex justify-center gap-2 py-3 bg-slate-50 border-t border-slate-200">
            {reports.map((_, idx) => (
              <div 
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeReport === idx 
                    ? "w-5 bg-brand-primary" 
                    : "w-2 bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopReportView() {
  const [activeReport, setActiveReport] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReport(prev => (prev + 1) % reports.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const currentReport = reports[activeReport];
  const IconComponent = currentReport.icon;

  return (
    <div className="flex flex-col items-center">
      {/* Desktop Monitor Frame */}
      <div className="w-[360px]">
        {/* Monitor Screen */}
        <div className="rounded-xl border-[5px] border-slate-700 bg-slate-800 shadow-2xl overflow-hidden">
          {/* Browser Chrome */}
          <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-700 border-b border-slate-600">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-amber-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 h-6 rounded-md bg-slate-600 flex items-center px-3">
              <span className="text-[10px] text-slate-400">portal.whats91.com/busy-reports</span>
            </div>
          </div>

          {/* App Content */}
          <div className="bg-white">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-brand-primary flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <span className="text-base font-semibold text-slate-800">Busy Reports Portal</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-green-600 bg-green-50 px-3 py-1.5 rounded-full font-medium">
                <Clock className="h-3.5 w-3.5" />
                Live Sync
              </div>
            </div>

            {/* Report Navigation Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50 px-4">
              {reports.map((report, idx) => {
                const TabIcon = report.icon;
                return (
                  <div
                    key={report.id}
                    className={`flex items-center gap-2 px-4 py-3 text-[12px] transition-all cursor-pointer ${
                      activeReport === idx 
                        ? "text-brand-primary border-b-2 border-brand-primary bg-white font-medium" 
                        : "text-slate-500"
                    }`}
                  >
                    <TabIcon className="h-4 w-4" />
                    {report.name}
                  </div>
                );
              })}
            </div>

            {/* Report Content */}
            <div className="p-5 min-h-[200px]">
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-11 w-11 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                    <IconComponent className="h-6 w-6 text-brand-primary" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-slate-800">{currentReport.name}</p>
                    <p className="text-[11px] text-slate-500">Last updated: Just now</p>
                  </div>
                </div>

                {/* Report Data Grid */}
                {currentReport.id === "ledger" && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-lg p-3 border border-slate-200">
                      <p className="text-[10px] text-slate-500 mb-1">Party Name</p>
                      <p className="text-[12px] font-medium text-slate-700">{currentReport.data.party}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-slate-200">
                      <p className="text-[10px] text-slate-500 mb-1">Opening Balance</p>
                      <p className="text-[12px] font-medium text-slate-700">{currentReport.data.opening}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-slate-200">
                      <p className="text-[10px] text-slate-500 mb-1">Total Debit</p>
                      <p className="text-[12px] font-medium text-red-600">{currentReport.data.debit}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-slate-200">
                      <p className="text-[10px] text-slate-500 mb-1">Total Credit</p>
                      <p className="text-[12px] font-medium text-green-600">{currentReport.data.credit}</p>
                    </div>
                    <div className="col-span-2 bg-brand-primary/5 rounded-lg p-3 border border-brand-primary/20">
                      <p className="text-[10px] text-brand-primary mb-1">Closing Balance</p>
                      <p className="text-lg font-bold text-brand-primary">{currentReport.data.closing}</p>
                    </div>
                  </div>
                )}

                {currentReport.id === "bill-by-bill" && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-lg p-3 border border-slate-200">
                      <p className="text-[10px] text-slate-500 mb-1">Total Bills</p>
                      <p className="text-lg font-bold text-slate-700">{currentReport.data.totalBills}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-slate-200">
                      <p className="text-[10px] text-slate-500 mb-1">Overdue Bills</p>
                      <p className="text-lg font-bold text-red-600">{currentReport.data.overdue}</p>
                    </div>
                    <div className="col-span-2 bg-brand-primary/5 rounded-lg p-3 border border-brand-primary/20">
                      <p className="text-[10px] text-brand-primary mb-1">Total Pending Amount</p>
                      <p className="text-xl font-bold text-brand-primary">{currentReport.data.pending}</p>
                    </div>
                    <div className="col-span-2 bg-white rounded-lg p-3 border border-slate-200">
                      <p className="text-[10px] text-slate-500 mb-1">Average Days Outstanding</p>
                      <p className="text-base font-medium text-slate-700">{currentReport.data.avgDays} days</p>
                    </div>
                  </div>
                )}

                {currentReport.id === "sales-invoice" && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-lg p-3 border border-slate-200">
                      <p className="text-[10px] text-slate-500 mb-1">Today's Invoices</p>
                      <p className="text-lg font-bold text-slate-700">{currentReport.data.todayInvoices}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-slate-200">
                      <p className="text-[10px] text-slate-500 mb-1">Today's Sales</p>
                      <p className="text-lg font-bold text-brand-primary">{currentReport.data.todaySales}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-slate-200">
                      <p className="text-[10px] text-slate-500 mb-1">Monthly Sales</p>
                      <p className="text-[12px] font-medium text-slate-700">{currentReport.data.monthlySales}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                      <p className="text-[10px] text-green-600 mb-1">Growth</p>
                      <p className="text-lg font-bold text-green-600">{currentReport.data.growth}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Monitor Stand */}
        <div className="flex justify-center mt-1">
          <div className="w-20 h-4 bg-slate-700 rounded-b-lg" />
        </div>
        <div className="flex justify-center">
          <div className="w-28 h-2 bg-slate-600 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function AnimatedReportPortal() {
  const [showDesktop, setShowDesktop] = useState(false);

  // Auto-switch between mobile and desktop views
  useEffect(() => {
    const interval = setInterval(() => {
      setShowDesktop(prev => !prev);
    }, 5000); // Switch every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <div className="rounded-2xl bg-surface/60 border border-border/50 p-6 shadow-lg backdrop-blur-sm max-w-[420px] mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border/60">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-primary shadow-md shadow-brand-primary/20">
            {showDesktop ? (
              <Monitor className="h-5 w-5 text-white" />
            ) : (
              <Smartphone className="h-5 w-5 text-white" />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">Busy Reports Portal</p>
            <p className="text-[11px] text-text-muted flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Live sync from Busy Software
            </p>
          </div>
        </div>

        {/* View Container with smooth transition */}
        <div className="relative overflow-hidden">
          {/* Mobile View */}
          <div 
            className={`transition-all duration-700 ease-in-out ${
              showDesktop 
                ? 'opacity-0 scale-90 absolute inset-0 pointer-events-none' 
                : 'opacity-100 scale-100'
            }`}
          >
            <MobileReportView />
          </div>

          {/* Desktop View */}
          <div 
            className={`transition-all duration-700 ease-in-out ${
              showDesktop 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-90 absolute inset-0 pointer-events-none'
            }`}
          >
            <DesktopReportView />
          </div>
        </div>
      </div>
    </div>
  );
}
