// Flow Categories
export const flowCategories = [
  {
    id: "welcome",
    name: "Welcome",
    icon: "Sparkles",
    description: "Greeting and onboarding flows for new conversations",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    id: "sales",
    name: "Sales",
    icon: "ShoppingCart",
    description: "Lead qualification and sales automation flows",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    id: "support",
    name: "Support",
    icon: "MessageCircle",
    description: "Customer support and ticket routing flows",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    icon: "Package",
    description: "Order management and cart recovery flows",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    id: "payments",
    name: "Payments",
    icon: "DollarSign",
    description: "Payment reminders and confirmation flows",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    id: "bookings",
    name: "Bookings",
    icon: "Calendar",
    description: "Appointment scheduling and reminders",
    color: "text-teal-600",
    bgColor: "bg-teal-50",
  },
];

// Flow Metadata Type
export interface FlowMetadata {
  id: string;
  name: string;
  category: string;
  description: string;
  useCase: string;
  complexity: "basic" | "intermediate" | "advanced";
  tags: string[];
  jsonFile: string; // filename without extension
}

// Flow Registry - Metadata for all flows
// JSON content is stored separately in /src/lib/flows/json/
export const flowRegistry: FlowMetadata[] = [
  // WELCOME FLOWS
  {
    id: "welcome-001",
    name: "Simple Welcome Flow",
    category: "welcome",
    description: "Basic welcome message with quick reply options",
    useCase: "Greet new users and offer main menu options",
    complexity: "basic",
    tags: ["greeting", "onboarding", "menu"],
    jsonFile: "welcome-001",
  },
  {
    id: "welcome-002",
    name: "Business Hours Welcome",
    category: "welcome",
    description: "Welcome message with business hours awareness",
    useCase: "Greet users differently based on business hours",
    complexity: "intermediate",
    tags: ["greeting", "business-hours", "scheduling"],
    jsonFile: "welcome-002",
  },

  // SALES FLOWS
  {
    id: "sales-001",
    name: "Lead Qualification Flow",
    category: "sales",
    description: "Qualify leads with automated questions",
    useCase: "Automatically qualify incoming leads based on budget, timeline, and interest",
    complexity: "intermediate",
    tags: ["lead-gen", "qualification", "crm"],
    jsonFile: "sales-001",
  },
  {
    id: "sales-002",
    name: "Demo Request Flow",
    category: "sales",
    description: "Collect demo requests with scheduling",
    useCase: "Capture demo requests and schedule appointments",
    complexity: "basic",
    tags: ["demo", "scheduling", "sales"],
    jsonFile: "sales-002",
  },

  // SUPPORT FLOWS
  {
    id: "support-001",
    name: "Support Triage Flow",
    category: "support",
    description: "Route support requests to appropriate teams",
    useCase: "Categorize and route support tickets automatically",
    complexity: "intermediate",
    tags: ["support", "triage", "routing"],
    jsonFile: "support-001",
  },
  {
    id: "support-002",
    name: "FAQ Bot Flow",
    category: "support",
    description: "Answer common questions automatically",
    useCase: "Handle frequently asked questions without agent intervention",
    complexity: "basic",
    tags: ["faq", "self-service", "automation"],
    jsonFile: "support-002",
  },

  // E-COMMERCE FLOWS
  {
    id: "ecom-001",
    name: "Order Confirmation Flow",
    category: "ecommerce",
    description: "Send order confirmation with details",
    useCase: "Confirm orders with item summary and delivery timeline",
    complexity: "basic",
    tags: ["orders", "confirmation", "ecommerce"],
    jsonFile: "ecom-001",
  },
  {
    id: "ecom-002",
    name: "COD Verification Flow",
    category: "ecommerce",
    description: "Verify Cash on Delivery orders",
    useCase: "Confirm COD orders to reduce returns and fake orders",
    complexity: "intermediate",
    tags: ["cod", "verification", "ecommerce"],
    jsonFile: "ecom-002",
  },

  // PAYMENT FLOWS
  {
    id: "pay-001",
    name: "Payment Reminder Flow",
    category: "payments",
    description: "Send payment reminders for overdue invoices",
    useCase: "Automated payment reminders with payment link",
    complexity: "basic",
    tags: ["payments", "reminders", "invoices"],
    jsonFile: "pay-001",
  },
  {
    id: "pay-002",
    name: "Payment Confirmation Flow",
    category: "payments",
    description: "Confirm successful payments",
    useCase: "Send payment receipt and thank you message",
    complexity: "basic",
    tags: ["payments", "receipt", "confirmation"],
    jsonFile: "pay-002",
  },

  // BOOKINGS FLOWS
  {
    id: "book-001",
    name: "Appointment Booking Flow",
    category: "bookings",
    description: "Book appointments with time selection",
    useCase: "Allow customers to schedule appointments via WhatsApp",
    complexity: "intermediate",
    tags: ["appointments", "scheduling", "booking"],
    jsonFile: "book-001",
  },
];

// Helper functions
export function getFlowsByCategory(category: string): FlowMetadata[] {
  return flowRegistry.filter((flow) => flow.category === category);
}

export function getFlowById(id: string): FlowMetadata | undefined {
  return flowRegistry.find((flow) => flow.id === id);
}

export function getCategoryById(categoryId: string) {
  return flowCategories.find((c) => c.id === categoryId);
}

export function getTotalFlowCount(): number {
  return flowRegistry.length;
}

export function getCategoryCount(): number {
  return flowCategories.length;
}
