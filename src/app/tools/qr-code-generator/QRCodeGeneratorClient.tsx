"use client";

import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  QrCode,
  Download,
  Copy,
  Check,
  ArrowRight,
  MessageCircle,
  Link2,
  Mail,
  Phone,
  Wifi,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// QR Code types
type QRType = "url" | "text" | "whatsapp" | "email" | "phone" | "wifi";

interface WiFiData {
  ssid: string;
  password: string;
  security: "WPA" | "WEP" | "nopass";
}

// Inner component that uses useSearchParams
function QRCodeGeneratorContent() {
  const searchParams = useSearchParams();
  const urlParam = searchParams.get("url");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrType, setQrType] = useState<QRType>(urlParam ? "url" : "text");
  const [text, setText] = useState(urlParam || "");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [whatsappMessage, setWhatsappMessage] = useState("");
  const [email, setEmail] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [phone, setPhone] = useState("");
  const [wifiData, setWifiData] = useState<WiFiData>({ ssid: "", password: "", security: "WPA" });
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [copied, setCopied] = useState(false);
  const [generated, setGenerated] = useState(false);
  const { toast } = useToast();

  // Get data string based on QR type
  const getQRData = useCallback((): string => {
    switch (qrType) {
      case "url":
        return text.startsWith("http") ? text : `https://${text}`;
      case "text":
        return text;
      case "whatsapp":
        const cleanNumber = whatsappNumber.replace(/[^\d]/g, "");
        const baseUrl = `https://wa.me/${cleanNumber}`;
        return whatsappMessage ? `${baseUrl}?text=${encodeURIComponent(whatsappMessage)}` : baseUrl;
      case "email":
        let emailUrl = `mailto:${email}`;
        if (emailSubject) {
          emailUrl += `?subject=${encodeURIComponent(emailSubject)}`;
        }
        return emailUrl;
      case "phone":
        return `tel:${phone.replace(/[^\d+]/g, "")}`;
      case "wifi":
        return `WIFI:T:${wifiData.security};S:${wifiData.ssid};P:${wifiData.password};;`;
      default:
        return text;
    }
  }, [qrType, text, whatsappNumber, whatsappMessage, email, emailSubject, phone, wifiData]);

  // Generate QR Code using canvas
  const generateQRCode = useCallback(async () => {
    const data = getQRData();

    if (!data || data.length === 0) {
      toast({
        title: "Missing Data",
        description: "Please enter the required information",
        variant: "destructive",
      });
      return;
    }

    try {
      // Import QR code library dynamically
      const QRCode = (await import("qrcode")).default;
      const canvas = canvasRef.current;

      if (canvas) {
        await QRCode.toCanvas(canvas, data, {
          width: size,
          margin: 2,
          color: {
            dark: fgColor,
            light: bgColor,
          },
        });
        setGenerated(true);
      }
    } catch (error) {
      console.error("QR Code generation error:", error);
      toast({
        title: "Generation Failed",
        description: "Could not generate QR code. Please check your input.",
        variant: "destructive",
      });
    }
  }, [getQRData, size, fgColor, bgColor, toast]);

  // Download QR Code
  const downloadQRCode = (format: "png" | "svg") => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (format === "png") {
      const link = document.createElement("a");
      link.download = `qrcode-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } else {
      // For SVG, we'd need a different approach - for now just PNG
      const link = document.createElement("a");
      link.download = `qrcode-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    }

    toast({
      title: "Downloaded!",
      description: `QR code saved as ${format.toUpperCase()}`,
    });
  };

  // Copy to clipboard
  const copyToClipboard = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((b) => resolve(b!), "image/png");
      });
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "QR code copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Failed to copy",
        description: "Please download the QR code instead",
        variant: "destructive",
      });
    }
  };

  // Auto-generate on initial load if URL param exists
  useEffect(() => {
    if (urlParam) {
      generateQRCode();
    }
  }, [urlParam, generateQRCode]);

  const typeOptions = [
    { value: "url", label: "URL / Website", icon: Link2 },
    { value: "text", label: "Plain Text", icon: QrCode },
    { value: "whatsapp", label: "WhatsApp", icon: MessageCircle },
    { value: "email", label: "Email", icon: Mail },
    { value: "phone", label: "Phone Number", icon: Phone },
    { value: "wifi", label: "WiFi", icon: Wifi },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Main Tool */}
      <div className="lg:col-span-2">
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5 text-brand-primary" />
              Generate Your QR Code
            </CardTitle>
            <CardDescription>
              Select the type of content and enter the required information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* QR Type Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Content Type</Label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {typeOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={qrType === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setQrType(option.value as QRType)}
                    className={`flex flex-col items-center gap-1 h-auto py-2 ${
                      qrType === option.value ? "bg-brand-primary hover:bg-brand-primary-hover" : ""
                    }`}
                  >
                    <option.icon className="h-4 w-4" />
                    <span className="text-[10px]">{option.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Dynamic Input Fields */}
            <div className="space-y-4 p-4 bg-surface/50 rounded-lg">
              {(qrType === "url" || qrType === "text") && (
                <div className="space-y-2">
                  <Label htmlFor="text" className="text-sm font-medium">
                    {qrType === "url" ? "Website URL" : "Text Content"}
                  </Label>
                  <Input
                    id="text"
                    type={qrType === "url" ? "url" : "text"}
                    placeholder={qrType === "url" ? "https://example.com" : "Enter your text"}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </div>
              )}

              {qrType === "whatsapp" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="wa-number" className="text-sm font-medium">
                      WhatsApp Number
                    </Label>
                    <Input
                      id="wa-number"
                      type="tel"
                      placeholder="919876543210"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                    />
                    <p className="text-xs text-text-muted">Include country code (e.g., 91 for India)</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wa-message" className="text-sm font-medium">
                      Pre-filled Message (Optional)
                    </Label>
                    <Input
                      id="wa-message"
                      type="text"
                      placeholder="Hi! I'm interested in your services"
                      value={whatsappMessage}
                      onChange={(e) => setWhatsappMessage(e.target.value)}
                    />
                  </div>
                </>
              )}

              {qrType === "email" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm font-medium">
                      Subject (Optional)
                    </Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="Hello!"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                    />
                  </div>
                </>
              )}

              {qrType === "phone" && (
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              )}

              {qrType === "wifi" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="ssid" className="text-sm font-medium">
                      Network Name (SSID)
                    </Label>
                    <Input
                      id="ssid"
                      type="text"
                      placeholder="MyWiFiNetwork"
                      value={wifiData.ssid}
                      onChange={(e) => setWifiData({ ...wifiData, ssid: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="WiFi password"
                      value={wifiData.password}
                      onChange={(e) => setWifiData({ ...wifiData, password: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Security Type</Label>
                    <Select
                      value={wifiData.security}
                      onValueChange={(value) => setWifiData({ ...wifiData, security: value as WiFiData["security"] })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="WPA">WPA/WPA2</SelectItem>
                        <SelectItem value="WEP">WEP</SelectItem>
                        <SelectItem value="nopass">No Password</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>

            {/* Customization Options */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Foreground Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-12 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Background Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-12 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            {/* Size Slider */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Size: {size}px</Label>
              <Slider
                value={[size]}
                onValueChange={([value]) => setSize(value)}
                min={128}
                max={512}
                step={32}
              />
            </div>

            {/* Generate Button */}
            <Button onClick={generateQRCode} className="w-full bg-brand-primary hover:bg-brand-primary-hover" size="lg">
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate QR Code
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* QR Code Preview */}
      <div className="space-y-6">
        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Preview</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="p-4 bg-white rounded-lg shadow-inner mb-4">
              <canvas
                ref={canvasRef}
                width={size}
                height={size}
                className="max-w-full h-auto"
                style={{ maxWidth: "256px", maxHeight: "256px" }}
              />
            </div>

            {generated && (
              <div className="flex flex-wrap gap-2 justify-center">
                <Button variant="default" size="sm" onClick={() => downloadQRCode("png")}>
                  <Download className="mr-2 h-3.5 w-3.5" />
                  Download PNG
                </Button>
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  {copied ? (
                    <Check className="mr-2 h-3.5 w-3.5 text-success" />
                  ) : (
                    <Copy className="mr-2 h-3.5 w-3.5" />
                  )}
                  Copy
                </Button>
              </div>
            )}

            {!generated && (
              <p className="text-sm text-text-muted text-center">
                Configure options and click Generate
              </p>
            )}
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-text-secondary">
              <Check className="h-4 w-4 text-success" />
              No watermarks
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
              <Check className="h-4 w-4 text-success" />
              High resolution (up to 512px)
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
              <Check className="h-4 w-4 text-success" />
              Custom colors
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
              <Check className="h-4 w-4 text-success" />
              Multiple content types
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
              <Check className="h-4 w-4 text-success" />
              100% free, no limits
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="bg-gradient-to-br from-brand-primary/10 to-brand-primary/5 border-brand-primary/20">
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-text-secondary mb-3">
              Need bulk QR code generation?
            </p>
            <Button asChild className="bg-brand-primary hover:bg-brand-primary-hover">
              <Link href="/contact">
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Loading fallback for Suspense
function QRCodeGeneratorSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-3 animate-pulse">
      <div className="lg:col-span-2">
        <Card className="border-border/60">
          <CardHeader>
            <div className="h-6 bg-surface rounded w-48"></div>
            <div className="h-4 bg-surface rounded w-64 mt-2"></div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="h-10 bg-surface rounded"></div>
            <div className="h-24 bg-surface rounded"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-10 bg-surface rounded"></div>
              <div className="h-10 bg-surface rounded"></div>
            </div>
            <div className="h-10 bg-surface rounded"></div>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-6">
        <Card className="border-border/60">
          <CardContent className="pt-6">
            <div className="h-48 bg-surface rounded"></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function QRCodeGeneratorClient() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface to-background py-12 sm:py-16">
        <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
          <div className="max-w-3xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-text-secondary mb-6">
              <Link href="/tools" className="hover:text-brand-primary">Free Tools</Link>
              <ArrowRight className="h-3.5 w-3.5" />
              <span className="text-text-primary font-medium">QR Code Generator</span>
            </nav>

            <div className="text-center mb-8">
              <Badge variant="secondary" className="mb-4 px-3 py-1 text-sm font-medium">
                <QrCode className="h-3.5 w-3.5 mr-1.5 text-brand-primary" />
                Free Tool
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight mb-4">
                QR Code Generator
              </h1>
              <p className="text-lg text-text-secondary">
                Create high-resolution QR codes for URLs, text, WhatsApp, email, phone, and WiFi.
                Download as PNG without watermarks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Section */}
      <section className="py-8 sm:py-12">
        <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
          <Suspense fallback={<QRCodeGeneratorSkeleton />}>
            <QRCodeGeneratorContent />
          </Suspense>
        </div>
      </section>

      {/* Related Tools */}
      <section className="py-12 bg-surface/50">
        <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
          <h2 className="text-xl font-bold text-text-primary mb-6">Related Tools</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Link href="/tools/whatsapp-link-generator">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="pt-6 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-success-soft">
                    <MessageCircle className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">WhatsApp Link Generator</p>
                    <p className="text-sm text-text-secondary">Create clickable links</p>
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
