"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageCircle,
  Copy,
  Check,
  ExternalLink,
  QrCode,
  Sparkles,
  ArrowRight,
  Globe,
  Phone,
  MessageSquare,
  Share2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function WhatsAppLinkGeneratorClient() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Clean phone number to E.164 format
  const cleanPhoneNumber = useCallback((number: string) => {
    // Remove all non-numeric characters except +
    let cleaned = number.replace(/[^\d+]/g, "");
    // Remove leading + if present (wa.me format doesn't need it)
    if (cleaned.startsWith("+")) {
      cleaned = cleaned.substring(1);
    }
    return cleaned;
  }, []);

  // Generate WhatsApp link
  const generateLink = useCallback(() => {
    const cleanedNumber = cleanPhoneNumber(phoneNumber);

    if (!cleanedNumber) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number with country code",
        variant: "destructive",
      });
      return;
    }

    let link = `https://wa.me/${cleanedNumber}`;

    if (message.trim()) {
      const encodedMessage = encodeURIComponent(message.trim());
      link += `?text=${encodedMessage}`;
    }

    setGeneratedLink(link);
  }, [phoneNumber, message, cleanPhoneNumber, toast]);

  // Copy to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Link copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually",
        variant: "destructive",
      });
    }
  };

  // Test the link
  const testLink = () => {
    if (generatedLink) {
      window.open(generatedLink, "_blank");
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface to-background py-12 sm:py-16">
        <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-text-secondary mb-6">
              <Link href="/tools" className="hover:text-brand-primary">Free Tools</Link>
              <ArrowRight className="h-3.5 w-3.5" />
              <span className="text-text-primary font-medium">WhatsApp Link Generator</span>
            </nav>

            <div className="text-center mb-8">
              <Badge variant="secondary" className="mb-4 px-3 py-1 text-sm font-medium">
                <MessageCircle className="h-3.5 w-3.5 mr-1.5 text-success" />
                Free Tool
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight mb-4">
                WhatsApp Link Generator
              </h1>
              <p className="text-lg text-text-secondary">
                Create clickable WhatsApp links (wa.me) with pre-filled messages. Perfect for business cards,
                email signatures, social media, and marketing campaigns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Section */}
      <section className="py-8 sm:py-12">
        <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Tool */}
            <div className="lg:col-span-2">
              <Card className="border-border/60">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-success" />
                    Generate Your WhatsApp Link
                  </CardTitle>
                  <CardDescription>
                    Enter the phone number with country code (e.g., 91 for India, 1 for USA)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Phone Number Input */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone Number <span className="text-error">*</span>
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="919876543210"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <p className="text-xs text-text-muted">
                      Enter number with country code, no spaces or special characters needed
                    </p>
                  </div>

                  {/* Message Input */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium">
                      Pre-filled Message <span className="text-text-muted">(Optional)</span>
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Hi! I'm interested in your services..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                    />
                    <p className="text-xs text-text-muted">
                      This message will be automatically filled when users click your link
                    </p>
                  </div>

                  {/* Generate Button */}
                  <Button
                    onClick={generateLink}
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white"
                    size="lg"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate WhatsApp Link
                  </Button>

                  {/* Generated Link */}
                  {generatedLink && (
                    <div className="space-y-3 p-4 bg-success-soft rounded-lg border border-success-border">
                      <Label className="text-sm font-medium text-success">
                        Your WhatsApp Link
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input
                          value={generatedLink}
                          readOnly
                          className="bg-background"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={copyToClipboard}
                          className="shrink-0"
                        >
                          {copied ? (
                            <Check className="h-4 w-4 text-success" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={testLink}
                          className="shrink-0"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            if (navigator.share) {
                              navigator.share({
                                title: "WhatsApp Link",
                                url: generatedLink,
                              });
                            } else {
                              copyToClipboard();
                            }
                          }}
                        >
                          <Share2 className="mr-2 h-3.5 w-3.5" />
                          Share Link
                        </Button>
                        <Link href={`/tools/qr-code-generator?url=${encodeURIComponent(generatedLink)}`}>
                          <Button variant="outline" size="sm">
                            <QrCode className="mr-2 h-3.5 w-3.5" />
                            Generate QR Code
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Tips */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Quick Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-text-secondary">
                  <div className="flex gap-2">
                    <Badge variant="outline" className="shrink-0">1</Badge>
                    <p>Add country code without + sign (e.g., 91 for India)</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="shrink-0">2</Badge>
                    <p>Use a pre-filled message to start conversations</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="shrink-0">3</Badge>
                    <p>Share link on social media, email signatures, or websites</p>
                  </div>
                </CardContent>
              </Card>

              {/* Use Cases */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Use Cases</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    { icon: Globe, text: "Website contact buttons" },
                    { icon: MessageSquare, text: "Email signatures" },
                    { icon: Share2, text: "Social media profiles" },
                    { icon: Phone, text: "Business cards & flyers" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                      <item.icon className="h-4 w-4 text-brand-primary" />
                      {item.text}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* CTA */}
              <Card className="bg-gradient-to-br from-brand-primary/10 to-brand-primary/5 border-brand-primary/20">
                <CardContent className="pt-6 text-center">
                  <p className="text-sm text-text-secondary mb-3">
                    Need bulk WhatsApp messaging?
                  </p>
                  <Button asChild className="bg-brand-primary hover:bg-brand-primary-hover">
                    <Link href="/contact">
                      Explore WhatsApp API
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-surface/50">
        <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <Tabs defaultValue="format" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="format">Link Format</TabsTrigger>
                <TabsTrigger value="usage">Usage</TabsTrigger>
              </TabsList>
              <TabsContent value="format" className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">What is the wa.me link format?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-text-secondary">
                      The wa.me format is WhatsApp&apos;s official short link format. It uses the pattern:
                      <code className="mx-1 px-1.5 py-0.5 bg-surface rounded text-brand-primary">
                        wa.me/[phone_number]
                      </code>
                      where phone_number includes the country code.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Do I need to include the + sign?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-text-secondary">
                      No, the wa.me format doesn&apos;t require the + sign. Just enter the country code
                      followed by the phone number (e.g., 919876543210 for India).
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="usage" className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Where can I use this link?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-text-secondary">
                      You can use WhatsApp links anywhere - websites, social media posts, email signatures,
                      QR codes, business cards, flyers, and more. When clicked, it opens WhatsApp with your
                      chat ready to go.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Is this tool free?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-text-secondary">
                      Yes, this tool is 100% free with no limits. Your data is processed locally in your
                      browser and never stored on our servers.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <section className="py-12">
        <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
          <h2 className="text-xl font-bold text-text-primary mb-6">Related Tools</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Link href="/tools/qr-code-generator">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="pt-6 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-brand-primary/10">
                    <QrCode className="h-5 w-5 text-brand-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">QR Code Generator</p>
                    <p className="text-sm text-text-secondary">Create scannable QR codes</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
