"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { 
  CheckCircle2,
  Clock,
  Bell,
  Send,
  FileText,
  Download
} from "lucide-react";

type MessageType = "text" | "pdf";

type ReminderMessage = {
  id: number;
  customerName: string;
  amount: string;
  dueDate: string;
  daysOverdue: number;
  timestamp: string;
  sent: boolean;
  reason?: string;
  type: MessageType;
  pdfName?: string;
  pdfSize?: string;
};

const reminderSequence: ReminderMessage[] = [
  {
    id: 1,
    customerName: "Gupta Trading Co.",
    amount: "₹1,25,000",
    dueDate: "05 Jan 2026",
    daysOverdue: 18,
    timestamp: "10:30 AM",
    sent: true,
    reason: "Exceeds credit limit",
    type: "text"
  },
  {
    id: 2,
    customerName: "Mehta & Sons",
    amount: "₹78,000",
    dueDate: "20 Dec 2025",
    daysOverdue: 25,
    timestamp: "10:31 AM",
    sent: true,
    reason: "Overdue > 15 days",
    type: "pdf",
    pdfName: "Outstanding_Statement.pdf",
    pdfSize: "124 KB"
  },
  {
    id: 3,
    customerName: "Sharma Distributors",
    amount: "₹85,000",
    dueDate: "10 Jan 2026",
    daysOverdue: 5,
    timestamp: "10:32 AM",
    sent: false,
    reason: "Within credit limit",
    type: "text"
  },
  {
    id: 4,
    customerName: "Patel Enterprises",
    amount: "₹45,000",
    dueDate: "07 Jan 2026",
    daysOverdue: 8,
    timestamp: "10:33 AM",
    sent: false,
    reason: "Within credit limit",
    type: "text"
  },
  {
    id: 5,
    customerName: "Rajesh Kumar & Bros",
    amount: "₹2,35,000",
    dueDate: "28 Dec 2025",
    daysOverdue: 17,
    timestamp: "10:34 AM",
    sent: true,
    reason: "Overdue > 15 days",
    type: "pdf",
    pdfName: "Payment_Reminder.pdf",
    pdfSize: "98 KB"
  },
  {
    id: 6,
    customerName: "Agarwal Textiles",
    amount: "₹1,85,000",
    dueDate: "02 Jan 2026",
    daysOverdue: 22,
    timestamp: "10:35 AM",
    sent: true,
    reason: "Exceeds credit limit",
    type: "text"
  },
];

function TextReminderMessage({ message, isVisible, messageRef }: { message: ReminderMessage; isVisible: boolean; messageRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div 
      ref={messageRef}
      className={`flex justify-end transition-all duration-500 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      <div className="max-w-[88%]">
        <div className="bg-[#DCF8C6] rounded-lg rounded-br-sm px-3 py-2 shadow-sm">
          <p className="text-[11px] font-semibold text-[#075E54] mb-1">{message.customerName}</p>
          <p className="text-[13px] text-[#303030] leading-relaxed">
            Payment Reminder: Outstanding of <span className="font-semibold">{message.amount}</span> is overdue.
          </p>
          <p className="text-[12px] text-[#667781] mt-1">
            Due: {message.dueDate} ({message.daysOverdue} days overdue)
          </p>
          <div className="flex items-center justify-end gap-1 mt-1.5">
            <span className="text-[10px] text-[#667781]">{message.timestamp}</span>
            {message.sent ? (
              <CheckCircle2 className="h-3 w-3 text-[#53BDEB]" />
            ) : (
              <Clock className="h-3 w-3 text-[#667781]" />
            )}
          </div>
        </div>
        {isVisible && (
          <div className="flex items-center justify-end gap-1 mt-1">
            {message.sent ? (
              <span className="text-[10px] text-green-600 font-medium flex items-center gap-0.5">
                <CheckCircle2 className="h-2.5 w-2.5" />
                Reminder Sent
              </span>
            ) : (
              <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                <Clock className="h-2.5 w-2.5" />
                Skipped: {message.reason}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function PDFReminderMessage({ message, isVisible, messageRef }: { message: ReminderMessage; isVisible: boolean; messageRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div 
      ref={messageRef}
      className={`flex justify-end transition-all duration-500 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      <div className="max-w-[88%]">
        <div className="bg-[#DCF8C6] rounded-lg rounded-br-sm px-3 py-2 shadow-sm">
          <p className="text-[11px] font-semibold text-[#075E54] mb-2">{message.customerName}</p>
          <div className="bg-white rounded-lg p-2.5 border border-[#C5E1B5] mb-2">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
                <FileText className="h-5 w-5 text-red-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-medium text-[#303030] truncate">{message.pdfName}</p>
                <p className="text-[10px] text-[#667781]">{message.pdfSize} • PDF Document</p>
              </div>
              <div className="h-7 w-7 rounded-full bg-[#075E54]/10 flex items-center justify-center">
                <Download className="h-3.5 w-3.5 text-[#075E54]" />
              </div>
            </div>
          </div>
          <p className="text-[12px] text-[#667781]">
            Outstanding: <span className="font-medium text-[#303030]">{message.amount}</span> • {message.daysOverdue} days overdue
          </p>
          <div className="flex items-center justify-end gap-1 mt-1.5">
            <span className="text-[10px] text-[#667781]">{message.timestamp}</span>
            {message.sent ? (
              <CheckCircle2 className="h-3 w-3 text-[#53BDEB]" />
            ) : (
              <Clock className="h-3 w-3 text-[#667781]" />
            )}
          </div>
        </div>
        {isVisible && (
          <div className="flex items-center justify-end gap-1 mt-1">
            {message.sent ? (
              <span className="text-[10px] text-green-600 font-medium flex items-center gap-0.5">
                <CheckCircle2 className="h-2.5 w-2.5" />
                PDF Sent
              </span>
            ) : (
              <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                <Clock className="h-2.5 w-2.5" />
                Skipped: {message.reason}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function SystemMessage({ text, isVisible, messageRef }: { text: string; isVisible: boolean; messageRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div 
      ref={messageRef}
      className={`flex justify-center transition-all duration-500 ease-out ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="bg-[#E7F3FF] rounded-lg px-3 py-1.5 max-w-[90%]">
        <p className="text-[11px] text-[#5C6BC0] text-center">{text}</p>
      </div>
    </div>
  );
}

function SentSummary({ sentCount, totalProcessed, sentPDFs, isVisible, messageRef }: { sentCount: number; totalProcessed: number; sentPDFs: number; isVisible: boolean; messageRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div 
      ref={messageRef}
      className={`flex justify-start transition-all duration-500 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      <div className="bg-white rounded-lg rounded-bl-sm px-3 py-2 shadow-sm border border-border/40 max-w-[88%]">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-6 w-6 rounded-full bg-brand-primary/10 flex items-center justify-center">
            <Bell className="h-3 w-3 text-brand-primary" />
          </div>
          <span className="text-[11px] font-semibold text-brand-primary">Whats91 System</span>
        </div>
        <p className="text-[12px] text-text-primary mb-2">
          Batch complete: <span className="font-semibold text-green-600">{sentCount} reminders sent</span>, {totalProcessed - sentCount} skipped
        </p>
        <div className="flex items-center gap-3 text-[10px] text-text-muted">
          <span className="flex items-center gap-1">
            <FileText className="h-2.5 w-2.5" />
            {sentPDFs} PDFs
          </span>
          <span>•</span>
          <span>{sentCount - sentPDFs} Text</span>
        </div>
        <p className="text-[10px] text-text-muted mt-2 pt-2 border-t border-border/30">
          Only customers exceeding credit terms received reminders.
        </p>
      </div>
    </div>
  );
}

export function AnimatedPaymentReminder() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [showStartMessage, setShowStartMessage] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const isRunningRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Create refs for each message element
  const startMessageRef = useRef<HTMLDivElement>(null);
  const messageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const summaryRef = useRef<HTMLDivElement>(null);

  // Initialize message refs array
  useEffect(() => {
    messageRefs.current = reminderSequence.map(() => null);
  }, []);

  // Smooth scroll to bring an element into view
  const scrollElementIntoView = useCallback((elementRef: React.RefObject<HTMLDivElement | null>) => {
    const container = containerRef.current;
    const element = elementRef.current;
    
    if (!container || !element) return;

    // Use native scrollIntoView with smooth behavior for consistent cross-browser behavior
    element.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'end',
      inline: 'nearest'
    });
  }, []);

  const runDemo = useCallback(async () => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;
    
    // Reset state
    setVisibleMessages([]);
    setShowStartMessage(false);
    setShowSummary(false);
    setIsRunning(true);
    
    // Reset scroll to top at the start
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
    
    // Wait a moment before starting
    await new Promise(r => setTimeout(r, 600));
    
    // Show start message at the top
    setShowStartMessage(true);
    
    // Wait for start message animation to complete
    await new Promise(r => setTimeout(r, 600));
    
    // Scroll start message into view (in case it's not fully visible)
    scrollElementIntoView(startMessageRef);
    
    // Small pause before first message
    await new Promise(r => setTimeout(r, 800));
    
    // Show messages one by one
    for (let i = 0; i < reminderSequence.length; i++) {
      // Add message
      setVisibleMessages(prev => [...prev, i]);
      
      // Wait for message animation to complete (500ms duration)
      await new Promise(r => setTimeout(r, 600));
      
      // Smoothly scroll the new message into view
      if (messageRefs.current[i]) {
        scrollElementIntoView({ current: messageRefs.current[i] } as React.RefObject<HTMLDivElement | null>);
      }
      
      // Wait before next message
      await new Promise(r => setTimeout(r, 1400));
    }
    
    // Show summary
    setShowSummary(true);
    
    // Wait for summary animation
    await new Promise(r => setTimeout(r, 600));
    
    // Scroll summary into view
    scrollElementIntoView(summaryRef);
    
    setIsRunning(false);
    setCycleCount(prev => prev + 1);
    isRunningRef.current = false;
    
    // Loop the demo
    timeoutRef.current = setTimeout(() => {
      runDemo();
    }, 5000);
  }, [scrollElementIntoView]);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      runDemo();
    }, 1500);

    return () => {
      clearTimeout(startTimeout);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      isRunningRef.current = false;
    };
  }, [runDemo]);

  const sentCount = reminderSequence.filter(m => m.sent).length;
  const sentPDFs = reminderSequence.filter(m => m.sent && m.type === "pdf").length;

  // Helper to set message ref
  const setMessageRef = (index: number) => (el: HTMLDivElement | null) => {
    messageRefs.current[index] = el;
  };

  return (
    <div className="relative">
      <div className="rounded-2xl bg-surface/60 border border-border/50 shadow-lg backdrop-blur-sm max-w-[360px] mx-auto overflow-hidden">
        
        {/* WhatsApp-style Header */}
        <div className="bg-[#075E54] px-3 py-2.5">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
              <Bell className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">Payment Reminders</p>
              <p className="text-[11px] text-white/70 flex items-center gap-1">
                {isRunning ? (
                  <>
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                    Processing reminders...
                  </>
                ) : (
                  <>
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    Online • Business Account
                  </>
                )}
              </p>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-white/10 rounded-full">
              <span className="text-[10px] text-white font-medium">Cycle #{cycleCount + 1}</span>
            </div>
          </div>
        </div>

        {/* Chat Background */}
        <div 
          className="bg-[#ECE5DD] relative"
          style={{ 
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4ccc4' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
          }}
        >
          {/* Messages Container */}
          <div 
            ref={containerRef}
            className="h-[380px] overflow-y-auto overscroll-contain"
            style={{ 
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(0, 0, 0, 0.2) transparent',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <div className="p-3 space-y-3">
              {/* Start System Message */}
              {showStartMessage && (
                <SystemMessage 
                  text="Payment reminder batch started • 6 customers to evaluate" 
                  isVisible={showStartMessage}
                  messageRef={startMessageRef}
                />
              )}
              
              {/* Reminder Messages */}
              {reminderSequence.map((message, index) => (
                message.type === "pdf" ? (
                  <PDFReminderMessage 
                    key={message.id}
                    message={message}
                    isVisible={visibleMessages.includes(index)}
                    messageRef={{ current: messageRefs.current[index] } as React.RefObject<HTMLDivElement | null>}
                  />
                ) : (
                  <TextReminderMessage 
                    key={message.id}
                    message={message}
                    isVisible={visibleMessages.includes(index)}
                    messageRef={{ current: messageRefs.current[index] } as React.RefObject<HTMLDivElement | null>}
                  />
                )
              ))}
              
              {/* Summary Message */}
              {showSummary && (
                <SentSummary 
                  sentCount={sentCount}
                  totalProcessed={reminderSequence.length}
                  sentPDFs={sentPDFs}
                  isVisible={showSummary}
                  messageRef={summaryRef}
                />
              )}
              
              {/* Bottom spacer */}
              <div className="h-2" />
            </div>
          </div>
        </div>

        {/* Input Bar */}
        <div className="bg-[#F0F0F0] px-2 py-2 flex items-center gap-2">
          <div className="flex-1 h-8 bg-white rounded-full flex items-center px-3">
            <span className="text-[11px] text-text-muted">Rule-based payment reminders...</span>
          </div>
          <div className="h-8 w-8 rounded-full bg-[#075E54] flex items-center justify-center">
            <Send className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>

      {/* Floating Badge */}
      <div className="absolute -bottom-3 -right-3 sm:right-0 hidden sm:flex rounded-xl bg-white border border-border/60 px-3 py-2 shadow-lg">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-primary">Text & PDF Support</p>
            <p className="text-[10px] text-text-muted">Multi-format reminders</p>
          </div>
        </div>
      </div>
    </div>
  );
}
