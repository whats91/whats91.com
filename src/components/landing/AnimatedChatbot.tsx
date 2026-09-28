"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { 
  FileText, 
  Download, 
  CheckCircle2,
  Send,
  Bot
} from "lucide-react";

type MessageType = {
  id: number;
  type: "bot" | "user";
  content: string;
  subContent?: React.ReactNode;
};

const quickActions = [
  { label: "Balance", command: "balance" },
  { label: "Ledger", command: "ledger" },
  { label: "Bill-by-Bill", command: "bill-by-bill" },
  { label: "Receipt", command: "receipt" },
];

// Bot response content components
function BalanceContent() {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between">
        <span className="text-slate-500">Outstanding:</span>
        <span className="font-semibold text-slate-800">₹1,25,000</span>
      </div>
      <div className="flex justify-between">
        <span className="text-slate-500">Last Payment:</span>
        <span className="font-semibold text-slate-800">₹50,000</span>
      </div>
      <div className="flex justify-between">
        <span className="text-slate-500">Due Date:</span>
        <span className="font-semibold text-slate-800">15 Jan 2026</span>
      </div>
      <div className="mt-3 pt-2 border-t border-slate-100">
        <button className="text-[#448C74] text-xs font-semibold hover:underline flex items-center gap-1">
          <Download className="h-3 w-3" />
          Pay Now
        </button>
      </div>
    </div>
  );
}

function LedgerContent() {
  return (
    <div className="space-y-2">
      <p className="text-slate-600 text-xs">Period: 01 Apr 2025 - 15 Jan 2026</p>
      <div className="flex justify-between text-xs">
        <span className="text-slate-500">Opening:</span>
        <span className="font-medium text-slate-700">₹85,000</span>
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-slate-500">Debits:</span>
        <span className="font-medium text-slate-700">₹2,40,000</span>
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-slate-500">Credits:</span>
        <span className="font-medium text-slate-700">₹2,00,000</span>
      </div>
      <div className="flex justify-between text-xs font-semibold pt-1.5 border-t border-slate-100">
        <span className="text-slate-700">Closing:</span>
        <span className="text-[#448C74]">₹1,25,000</span>
      </div>
      <PDFAttachment name="Ledger_Report.pdf" size="245 KB" />
    </div>
  );
}

function BillByBillContent() {
  const rows = [
    { date: "05 Jan", ref: "INV-2501", debit: "₹45,000", credit: "-" },
    { date: "28 Dec", ref: "INV-2452", debit: "₹32,000", credit: "-" },
    { date: "20 Dec", ref: "REC-1205", debit: "-", credit: "₹50,000" },
    { date: "10 Dec", ref: "INV-2448", debit: "₹48,000", credit: "-" },
  ];
  
  return (
    <div className="space-y-2">
      <div className="space-y-1.5">
        {rows.map((row, i) => (
          <div key={i} className="flex justify-between text-xs py-1 border-b border-slate-50 last:border-0">
            <span className="text-slate-500 w-14">{row.date}</span>
            <span className="text-slate-600 w-16 truncate">{row.ref}</span>
            <span className={`font-medium w-16 text-right ${row.debit !== "-" ? "text-red-600" : "text-slate-400"}`}>
              {row.debit}
            </span>
            <span className={`font-medium w-16 text-right ${row.credit !== "-" ? "text-green-600" : "text-slate-400"}`}>
              {row.credit}
            </span>
          </div>
        ))}
      </div>
      <PDFAttachment name="BillByBill_Statement.pdf" size="128 KB" />
    </div>
  );
}

function ReceiptContent() {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs">
        <span className="text-slate-500">Receipt No:</span>
        <span className="font-medium text-slate-700">REC-1205</span>
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-slate-500">Date:</span>
        <span className="font-medium text-slate-700">20 Dec 2025</span>
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-slate-500">Amount:</span>
        <span className="font-semibold text-green-600">₹50,000</span>
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-slate-500">Mode:</span>
        <span className="font-medium text-slate-700">Bank Transfer</span>
      </div>
      <PDFAttachment name="Receipt_REC1205.pdf" size="45 KB" />
      <div className="mt-2 flex items-center gap-1.5 text-green-600 text-xs">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Payment confirmed
      </div>
    </div>
  );
}

function PDFAttachment({ name, size }: { name: string; size: string }) {
  return (
    <div className="mt-3 p-2 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-2">
      <div className="h-9 w-9 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
        <FileText className="h-4 w-4 text-red-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-slate-700 truncate">{name}</p>
        <p className="text-[10px] text-slate-400">{size}</p>
      </div>
      <button className="h-7 w-7 rounded-full bg-[#448C74]/10 flex items-center justify-center hover:bg-[#448C74]/20 transition-colors">
        <Download className="h-3.5 w-3.5 text-[#448C74]" />
      </button>
    </div>
  );
}

function WelcomeButtons({ onClick }: { onClick: (cmd: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-2 mt-3">
      {quickActions.map((action, i) => (
        <button 
          key={i}
          onClick={() => onClick(action.command)}
          className="text-[10px] font-medium text-[#448C74] bg-[#448C74]/5 hover:bg-[#448C74]/10 border border-[#448C74]/20 rounded-lg py-1.5 px-2 transition-colors"
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}

// Pre-defined responses
const botResponses: Record<string, { title: string; content: React.ReactNode }> = {
  balance: { title: "Your Account Summary", content: <BalanceContent /> },
  ledger: { title: "Account Ledger", content: <LedgerContent /> },
  "bill-by-bill": { title: "Bill-by-Bill Statement", content: <BillByBillContent /> },
  receipt: { title: "Last Receipt", content: <ReceiptContent /> },
};

// Initial welcome message
const getWelcomeMessage = (): MessageType => ({
  id: Date.now(),
  type: "bot" as const,
  content: "👋 Welcome to Whats91! How can I help you today?",
  subContent: null,
});

export function AnimatedChatbot() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isDemoRunning = useRef(false);
  const demoTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll to bottom when messages change - only within the container
  const scrollToBottom = useCallback(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  // Get bot response
  const getBotResponse = useCallback((command: string): MessageType => {
    const response = botResponses[command];
    if (response) {
      return {
        id: Date.now() + 100,
        type: "bot",
        content: response.title,
        subContent: response.content,
      };
    }
    return {
      id: Date.now() + 100,
      type: "bot",
      content: "I can help you with balance, ledger, bill-by-bill, or receipt. Try typing one of these!",
      subContent: null,
    };
  }, []);

  // Simulate typing and sending a message
  const simulateMessage = useCallback((text: string, isUser: boolean) => {
    return new Promise<void>((resolve) => {
      // Focus input and start typing
      inputRef.current?.focus();
      
      let charIndex = 0;
      const typingInterval = setInterval(() => {
        if (charIndex < text.length) {
          setInputValue(text.slice(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(typingInterval);
          
          // Small pause before "sending"
          setTimeout(() => {
            setInputValue("");
            
            if (isUser) {
              // Add user message
              setMessages(prev => [...prev, {
                id: Date.now(),
                type: "user",
                content: text.charAt(0).toUpperCase() + text.slice(1).replace("-", " "),
              }]);
              
              // Show typing indicator
              setIsTyping(true);
              
              // Bot response after delay
              setTimeout(() => {
                setIsTyping(false);
                setMessages(prev => [...prev, getBotResponse(text.toLowerCase())]);
                resolve();
              }, 1200);
            } else {
              resolve();
            }
          }, 300);
        }
      }, 60); // Typing speed
    });
  }, [getBotResponse]);

  // Run demo sequence
  const runDemo = useCallback(async () => {
    if (isDemoRunning.current) return;
    isDemoRunning.current = true;

    // Reset messages
    setMessages([getWelcomeMessage()]);
    await new Promise(r => setTimeout(r, 2000));

    // Demo sequence
    const commands = ["balance", "ledger", "bill-by-bill", "receipt"];
    
    for (const cmd of commands) {
      if (!isDemoRunning.current) break;
      await simulateMessage(cmd, true);
      await new Promise(r => setTimeout(r, 2000));
    }

    isDemoRunning.current = false;

    // Restart demo after pause
    demoTimeoutRef.current = setTimeout(() => {
      runDemo();
    }, 5000);
  }, [simulateMessage]);

  // Start demo on mount
  useEffect(() => {
    // Initial welcome
    setMessages([getWelcomeMessage()]);
    
    // Start demo after short delay
    const startTimeout = setTimeout(() => {
      runDemo();
    }, 2000);

    return () => {
      clearTimeout(startTimeout);
      if (demoTimeoutRef.current) {
        clearTimeout(demoTimeoutRef.current);
      }
      isDemoRunning.current = false;
    };
  }, [runDemo]);

  // Handle manual input
  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const text = inputValue.trim();
    
    // Stop demo when user interacts
    isDemoRunning.current = false;
    if (demoTimeoutRef.current) {
      clearTimeout(demoTimeoutRef.current);
    }
    
    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now(),
      type: "user",
      content: text,
    }]);
    
    setInputValue("");
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      const command = text.toLowerCase();
      const responseKey = Object.keys(botResponses).find(key => 
        command.includes(key) || key.includes(command)
      );
      
      setMessages(prev => [...prev, getBotResponse(responseKey || "")]);
    }, 1000);
  };

  // Handle click on welcome buttons
  const handleWelcomeClick = (command: string) => {
    // Stop demo when user interacts
    isDemoRunning.current = false;
    if (demoTimeoutRef.current) {
      clearTimeout(demoTimeoutRef.current);
    }

    setMessages(prev => [...prev, {
      id: Date.now(),
      type: "user",
      content: command.charAt(0).toUpperCase() + command.slice(1).replace("-", " "),
    }]);

    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, getBotResponse(command)]);
    }, 1000);
  };

  return (
    <div className="relative">
      <div className="rounded-2xl bg-surface/60 border border-border/50 p-3 sm:p-4 shadow-lg backdrop-blur-sm max-w-[360px] mx-auto">
        {/* Chat Header */}
        <div className="flex items-center gap-2.5 px-3 py-2.5 border-b border-border/60 bg-gradient-to-r from-brand-primary/[0.07] to-transparent rounded-t-xl -mt-1 -mx-1 mb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-primary shadow-md shadow-brand-primary/20 shrink-0">
            <span className="text-xs font-semibold text-white">W91</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-text-primary truncate">Whats91</p>
            <p className="text-[10px] text-brand-primary font-medium flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              Online • Verified Business
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-green-50 rounded-full">
            <Bot className="h-3 w-3 text-green-600" />
            <span className="text-[10px] font-medium text-green-700">Bot Active</span>
          </div>
        </div>
        
        {/* Messages Area - with ref for contained scrolling */}
        <div 
          ref={messagesContainerRef} 
          className="space-y-2.5 min-h-[280px] max-h-[320px] overflow-y-auto px-1 pb-2"
        >
          {messages.map((msg, index) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
            >
              <div 
                className={`${
                  msg.type === "user" 
                    ? "rounded-2xl rounded-br-sm bg-brand-primary px-4 py-2.5 text-sm text-white max-w-[200px] shadow-md shadow-brand-primary/15" 
                    : "rounded-2xl rounded-bl-sm bg-white border border-border/60 px-3.5 py-2.5 text-xs sm:text-sm text-text-primary max-w-[260px] shadow-sm"
                }`}
              >
                {msg.type === "bot" ? (
                  <>
                    <p className="font-semibold mb-1.5 text-sm">{msg.content}</p>
                    {index === 0 && messages.length === 1 ? (
                      <WelcomeButtons onClick={handleWelcomeClick} />
                    ) : (
                      msg.subContent
                    )}
                  </>
                ) : (
                  <p>{msg.content}</p>
                )}
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start animate-fadeIn">
              <div className="rounded-2xl rounded-bl-sm bg-white border border-border/60 px-4 py-3 shadow-sm">
                <div className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area - No quick action buttons here */}
        <div className="flex gap-2 mt-3 px-1">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type balance, ledger, receipt..."
            className="flex-1 h-9 px-3 text-xs rounded-xl border border-border/60 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary/30 transition-all placeholder:text-text-muted"
          />
          <button
            onClick={handleSend}
            className="h-9 w-9 rounded-xl bg-brand-primary text-white flex items-center justify-center hover:bg-brand-primary-hover transition-colors shadow-md shadow-brand-primary/20"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Floating Badge */}
      <div className="absolute -bottom-3 -right-3 sm:right-0 hidden sm:flex rounded-xl bg-white border border-border/60 px-3 py-2 shadow-lg">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-brand-primary/10 flex items-center justify-center">
            <Bot className="h-3.5 w-3.5 text-brand-primary" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-primary">24/7 Chatbot</p>
            <p className="text-[10px] text-text-muted">Zero wait time</p>
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
