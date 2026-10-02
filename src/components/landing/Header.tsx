"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { SkipLink } from "@/components/shared/SkipLink";
import {
  Menu,
  Megaphone,
  Settings,
  Database,
  BarChart3,
  CreditCard,
  FileCheck,
  Sheet as SheetIcon,
  Zap,
  ShoppingCart,
  Bot,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Solution menu items for dropdown
const solutions = [
  {
    title: "Marketing & Engagement",
    href: "/solutions/marketing",
    description: "Plan broadcasts, customer replies and Click-to-WhatsApp entry paths.",
    icon: Megaphone,
  },
  {
    title: "Utility Messages",
    href: "/solutions/utility",
    description: "Explore transactional alerts and order updates; confirm template category and approval.",
    icon: Zap,
  },
  {
    title: "Busy ERP Integration",
    href: "/solutions/busy-erp",
    description: "Automate invoices, payment reminders, and ledger inquiries from WhatsApp.",
    icon: Database,
    featured: true,
  },
  {
    title: "Miracle WhatsApp API",
    href: "/solutions/miracle-whatsapp-api",
    description: "Send Miracle invoices, builty PDFs, challans, and reminders with Whats91.",
    icon: FileCheck,
    featured: true,
  },
  {
    title: "Busy E-Commerce",
    href: "/solutions/busy-ecommerce",
    description: "Explore a storefront connected to Busy stock and rates; confirm sync requirements.",
    icon: ShoppingCart,
    featured: true,
  },
  {
    title: "Busy AI Agent",
    href: "/solutions/busy-ai-agent",
    description: "Explore payment follow-up workflows and confirm data, approval and handoff requirements.",
    icon: Bot,
    featured: true,
  },
  {
    title: "Busy API",
    href: "/solutions/busy-api",
    description: "Direct API integration for Busy accounting software.",
    icon: Settings,
  },
  {
    title: "Busy Reports",
    href: "/solutions/busy-reports",
    description: "Automated report delivery via WhatsApp from Busy ERP.",
    icon: BarChart3,
  },
  {
    title: "Payment Reminders",
    href: "/solutions/payment-reminders",
    description: "Automated payment collection reminders and follow-ups.",
    icon: CreditCard,
  },
  {
    title: "Google Sheet Sync",
    href: "/solutions/busy-google-sheet",
    description: "Sync data between WhatsApp, Busy, and Google Sheets.",
    icon: SheetIcon,
  },
];

// Primary navigation items (minimal header)
const primaryNavItems = [
  { label: "Features", href: "/features" },
  { label: "Free Tools", href: "/tools" },
  { label: "Plans", href: "/plans" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/** Exact match, or a nested route under href (e.g. /features/chat-shortcuts...). */
function isNavActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isSolutionsActive = pathname.startsWith("/solutions/");

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 8);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <SkipLink />
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-sm transition-shadow duration-200",
          isScrolled ? "border-border shadow-sm" : "border-border/60"
        )}
      >
        <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
          <div className="flex h-14 sm:h-16 items-center justify-between">
            {/* Logo */}
            <Link prefetch={false} href="/" className="flex items-center gap-2 shrink-0 group">
              <Image
                src="/whats91_logo.svg"
                alt="Whats91 Logo"
                width={100}
                height={28}
                className="transition-transform duration-300 group-hover:scale-105"
                priority
              />
              <span className="hidden sm:inline-flex items-center rounded-full bg-brand-primary-light px-2.5 py-0.5 text-[10px] font-medium text-brand-primary border border-brand-primary/10">
                Cloud API Platform
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav aria-label="Primary" className="hidden xl:flex items-center gap-1">
              {/* Solutions Dropdown */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className={cn(
                        "px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg bg-transparent",
                        isSolutionsActive
                          ? "text-text-primary bg-surface"
                          : "text-text-secondary hover:text-text-primary hover:bg-surface",
                        "data-[state=open]:bg-surface data-[state=open]:text-text-primary"
                      )}
                    >
                      Solutions
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-1 p-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {solutions.map((solution) => (
                          <ListItem
                            key={solution.href}
                            title={solution.title}
                            href={solution.href}
                            featured={solution.featured}
                          >
                            <div className="flex items-start gap-3">
                              <solution.icon className="h-5 w-5 mt-0.5 text-brand-primary shrink-0" aria-hidden="true" />
                              <span className="text-xs text-text-secondary leading-relaxed">
                                {solution.description}
                              </span>
                            </div>
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {/* Primary Nav Items */}
              {primaryNavItems.map((item) => {
                const active = isNavActive(pathname, item.href);
                return (
                  <Link prefetch={false}
                    key={item.label}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg whitespace-nowrap",
                      active
                        ? "text-text-primary bg-surface"
                        : "text-text-secondary hover:text-text-primary hover:bg-surface"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden xl:flex items-center gap-2">
              <Button
                variant="ghost"
                asChild
                aria-current={pathname === "/whatsapp-templates" ? "page" : undefined}
                className="text-text-secondary hover:text-text-primary text-sm font-medium hover:bg-surface"
              >
                <Link prefetch={false} href="/whatsapp-templates">Templates</Link>
              </Button>
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-brand-700 hover:text-white text-sm font-medium shadow-md shadow-brand-primary/20 hover:shadow-lg hover:shadow-brand-primary/25 transition-all duration-300"
              >
                <a href="https://chat.whats91.com" target="_blank" rel="noopener noreferrer">
                  Open Whats91 app
                </a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="xl:hidden h-11 w-11 shrink-0 hover:bg-surface"
                >
                  <Menu className="h-5 w-5 text-text-primary" aria-hidden="true" />
                  <span className="sr-only">Open main menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[85vw] sm:w-[340px] md:w-[380px] [&>button]:min-h-11 [&>button]:min-w-11 [&>button]:flex [&>button]:items-center [&>button]:justify-center flex flex-col gap-0 bg-background border-l border-border p-0"
              >
                <SheetTitle className="sr-only">Main menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Site navigation, solutions, and primary actions
                </SheetDescription>

                {/* Mobile Menu Header */}
                <div className="shrink-0 flex items-center p-4 border-b border-border/60">
                  <Link prefetch={false} href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                    <Image
                      src="/whats91_logo.svg"
                      alt="Whats91 Logo"
                      width={90}
                      height={25}
                    />
                  </Link>
                </div>

                {/* Mobile Navigation Links */}
                <nav
                  aria-label="Primary"
                  className="flex-1 min-h-0 flex flex-col p-3 overflow-y-auto"
                >
                  {/* Solutions Section */}
                  <div className="mb-2">
                    <span className="px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wider">
                      Solutions
                    </span>
                  </div>
                  {solutions.map((solution) => {
                    const active = pathname === solution.href;
                    return (
                      <SheetClose key={solution.href} asChild>
                        <Link prefetch={false}
                          href={solution.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex items-center gap-3 min-h-11 py-2.5 px-3 text-sm font-medium rounded-lg transition-all duration-200",
                            active
                              ? "text-text-primary bg-surface"
                              : "text-text-secondary hover:text-text-primary hover:bg-surface"
                          )}
                        >
                          <solution.icon className="h-4 w-4 text-brand-primary" aria-hidden="true" />
                          {solution.title}
                        </Link>
                      </SheetClose>
                    );
                  })}

                  {/* Divider */}
                  <div className="my-3 border-t border-border/60" />

                  {/* Primary Nav Items */}
                  {primaryNavItems.map((item) => {
                    const active = isNavActive(pathname, item.href);
                    return (
                      <SheetClose key={item.label} asChild>
                        <Link prefetch={false}
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex items-center min-h-11 py-2.5 px-3 text-base font-medium rounded-lg transition-all duration-200",
                            active
                              ? "text-text-primary bg-surface"
                              : "text-text-secondary hover:text-text-primary hover:bg-surface"
                          )}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    );
                  })}
                </nav>

                {/* Mobile Menu Footer */}
                <div className="shrink-0 p-4 border-t border-border bg-surface/50">
                  <div className="flex flex-col gap-2.5">
                    <SheetClose asChild>
                      <Button variant="outline" asChild className="w-full h-11 border-border text-text-primary hover:bg-background font-medium">
                        <Link prefetch={false} href="/whatsapp-templates">WhatsApp Templates</Link>
                      </Button>
                    </SheetClose>
                    <Button asChild className="w-full h-11 bg-primary text-primary-foreground hover:bg-brand-700 hover:text-white font-medium shadow-md shadow-brand-primary/20">
                      <a href="https://chat.whats91.com" target="_blank" rel="noopener noreferrer">Open Whats91 app</a>
                    </Button>
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" aria-hidden="true" />
                    <span className="text-[11px] text-text-muted">WhatsApp Cloud API Platform</span>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}

// Dropdown list item component
const ListItem = ({
  className,
  title,
  children,
  href,
  featured,
  ...props
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
  featured?: boolean;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link prefetch={false}
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all duration-200",
            "hover:bg-surface hover:text-text-primary focus:bg-surface focus:text-text-primary",
            featured && "bg-brand-primary/5 border border-brand-primary/20 hover:bg-brand-primary/10",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold leading-none text-text-primary">{title}</span>
            {featured && (
              <span className="inline-flex items-center rounded-full bg-brand-600 px-2 py-0.5 text-[10px] font-medium text-white">
                Explore
              </span>
            )}
          </div>
          <div className="mt-1">{children}</div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};
