"use client";

import { Mail, MapPin, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ContactCardProps {
  variant?: "card" | "popup";
  trigger?: React.ReactNode;
  className?: string;
}

const contactInfo = {
  company: "Whats91",
  tagline: "WhatsApp Cloud API Platform",
  address: {
    line1: "131, C21 Mall",
    city: "Ujjain, Madhya Pradesh",
    pincode: "456010",
  },
  email: "support@whats91.com",
  website: "whats91.com",
};

export function ContactCard({ variant = "card", trigger, className = "" }: ContactCardProps) {
  const content = (
    <div className="space-y-5">
      {/* Company Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary shadow-md shadow-brand-primary/20">
          <MessageCircle className="h-5 w-5 text-brand-primary-foreground" />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-text-primary">{contactInfo.company}</h4>
          <p className="text-xs text-text-muted">{contactInfo.tagline}</p>
        </div>
      </div>

      {/* Contact Details */}
      <div className="space-y-3">
        {/* Address */}
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface shrink-0">
            <MapPin className="h-4 w-4 text-brand-primary" />
          </div>
          <div className="text-sm">
            <p className="font-medium text-text-primary">{contactInfo.address.line1}</p>
            <p className="text-text-secondary">{contactInfo.address.city}, {contactInfo.address.pincode}</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface shrink-0">
            <Mail className="h-4 w-4 text-brand-primary" />
          </div>
          <div className="text-sm">
            <a 
              href={`mailto:${contactInfo.email}`} 
              className="font-medium text-brand-primary hover:underline"
            >
              {contactInfo.email}
            </a>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="pt-3 border-t border-border/60">
        <Button 
          className="w-full bg-brand-primary text-brand-primary-foreground hover:bg-brand-primary-hover shadow-md shadow-brand-primary/20"
          asChild
        >
          <a href={`mailto:${contactInfo.email}`}>
            <Mail className="h-4 w-4 mr-2" />
            Contact Support
          </a>
        </Button>
      </div>
    </div>
  );

  if (variant === "popup") {
    return (
      <Dialog>
        <DialogTrigger asChild>
          {trigger || (
            <Button variant="outline" className="gap-2">
              <Mail className="h-4 w-4" />
              Contact Us
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[420px] bg-background border-border/60 shadow-2xl">
          <DialogHeader className="sr-only">
            <DialogTitle>Contact Information</DialogTitle>
          </DialogHeader>
          {content}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className={`rounded-2xl border border-border/60 bg-white p-5 sm:p-6 shadow-md ${className}`}>
      {content}
    </div>
  );
}

export { contactInfo };
