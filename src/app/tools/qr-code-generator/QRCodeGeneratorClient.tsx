"use client";

import { useState, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import * as Slider from "@radix-ui/react-slider";
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
import { qrPayload, qrAppearance, type QRType, type WiFiData } from "@/lib/tool-inputs";

// Each query prefill owns a fresh form; client navigation cannot retain the previous payload.
function QRCodeForm({ urlParam }: { urlParam: string | null }) {

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
  const [status, setStatus] = useState("Enter content, then generate a PNG. Changing any option clears the previous output.");
  const [busy, setBusy] = useState(false);
  const version = useRef(0);
  const invalidate = () => {
    version.current += 1;
    setGenerated(false); setCopied(false); setBusy(false);
    setStatus("Options changed. Generate a new QR code before copying or downloading.");
    const canvas = canvasRef.current;
    if (canvas) canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
  };
  const generateQRCode = async () => {
    invalidate();
    const current = version.current;
    const payload = qrPayload({ type: qrType, text, number: whatsappNumber, message: whatsappMessage, email, subject: emailSubject, phone, wifi: wifiData });
    const appearanceError = qrAppearance(fgColor, bgColor, size);
    if (!payload.ok || appearanceError) { setStatus(!payload.ok ? payload.error : appearanceError!); return; }
    setBusy(true); setStatus("Generating QR code…");
    try {
      const QRCode = await import("qrcode");
      const draft = document.createElement("canvas");
      await QRCode.toCanvas(draft, payload.value, { width: size, margin: 4, color: { dark: fgColor, light: bgColor }, errorCorrectionLevel: "M" });
      if (version.current !== current) return;
      const canvas = canvasRef.current;
      if (!canvas) throw new Error("Preview unavailable");
      // Keep at least two image pixels per QR module; a large payload can exceed selected size.
      if (draft.width !== size) throw new Error("Payload needs a larger image");
      const modules = QRCode.create(payload.value, { errorCorrectionLevel: "M" }).modules.size;
      if (size < (modules + 8) * 2) { setStatus("This content needs a larger image. Increase the size or shorten the content, then retry."); return; }
      canvas.width = draft.width; canvas.height = draft.height;
      const context = canvas.getContext("2d"); if (!context) throw new Error("Canvas unavailable");
      context.drawImage(draft, 0, 0);
      setGenerated(true); setStatus("Current QR code ready. Test the downloaded PNG with your intended scanner before sharing.");
    } catch {
      if (version.current === current) setStatus("QR generation unavailable. Check image size and content, then retry. If the library is blocked, reload with JavaScript and local scripts allowed; your input can be copied manually.");
    } finally { if (version.current === current) setBusy(false); }
  };
  const pngBlob = (canvas: HTMLCanvasElement) => new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error("PNG unavailable")), "image/png");
  });
  const downloadQRCode = async () => {
    if (!generated || !canvasRef.current) return;
    const current = version.current;
    let url: string | undefined;
    try {
      const blob = await pngBlob(canvasRef.current);
      if (version.current !== current) return;
      url = URL.createObjectURL(blob);
      const link = document.createElement("a"); link.href = url; link.download = "qrcode.png";
      document.body.appendChild(link);
      try { link.click(); } finally { link.remove(); }
      setStatus("PNG download requested. Check your browser’s downloads; this page cannot confirm that the file was saved.");
      const cleanup = url; setTimeout(() => URL.revokeObjectURL(cleanup), 1000); url = undefined;
    } catch {
      if (version.current === current) setStatus("PNG download could not start. Retry or use Copy PNG. You can also save the current preview using your browser’s image options where supported.");
    } finally { if (url) URL.revokeObjectURL(url); }
  };
  const copyToClipboard = async () => {
    if (!generated || !canvasRef.current) return;
    const current = version.current;
    try {
      const blob = await pngBlob(canvasRef.current);
      if (version.current !== current) return;
      if (!navigator.clipboard?.write || typeof ClipboardItem === "undefined") throw new Error("Clipboard unavailable");
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      if (version.current !== current) return;
      setCopied(true); setStatus("Current PNG copied to clipboard.");
    } catch {
      if (version.current === current) { setCopied(false); setStatus("Copy unavailable or permission denied. Use Download PNG, or save the current preview with your browser’s image options where supported."); }
    }
  };

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
          <CardContent className="min-w-0 space-y-6">
            {/* QR Type Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Content Type</Label>
              <div role="group" aria-label="QR content type" className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {typeOptions.map((option) => (
                  <Button
                    key={option.value}
                    type="button"
                    aria-pressed={qrType === option.value}
                    variant={qrType === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => { invalidate(); setQrType(option.value as QRType); }}
                    className={`flex flex-col items-center gap-1 h-auto py-2 ${
                      qrType === option.value ? "bg-primary text-primary-foreground hover:bg-brand-700 hover:text-white" : ""
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
                    id="text" aria-describedby="qr-status"
                    type={qrType === "url" ? "url" : "text"}
                    placeholder={qrType === "url" ? "https://example.com" : "Enter your text"}
                    value={text}
                    onChange={(e) => { invalidate(); setText(e.target.value); }}
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
                      id="wa-number" aria-describedby="qr-status"
                      type="tel"
                      placeholder="919876543210"
                      value={whatsappNumber}
                      onChange={(e) => { invalidate(); setWhatsappNumber(e.target.value); }}
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
                      onChange={(e) => { invalidate(); setWhatsappMessage(e.target.value); }}
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
                      id="email" aria-describedby="qr-status"
                      type="email"
                      placeholder="example@email.com"
                      value={email}
                      onChange={(e) => { invalidate(); setEmail(e.target.value); }}
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
                      onChange={(e) => { invalidate(); setEmailSubject(e.target.value); }}
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
                    id="phone" aria-describedby="qr-status"
                    type="tel"
                    placeholder="+919876543210"
                    value={phone}
                    onChange={(e) => { invalidate(); setPhone(e.target.value); }}
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
                      id="ssid" aria-describedby="qr-status"
                      type="text"
                      placeholder="MyWiFiNetwork"
                      value={wifiData.ssid}
                      onChange={(e) => { invalidate(); setWifiData({ ...wifiData, ssid: e.target.value }); }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <Input
                      id="password" aria-describedby="qr-status"
                      type="password"
                      placeholder="WiFi password"
                      value={wifiData.password}
                      onChange={(e) => { invalidate(); setWifiData({ ...wifiData, password: e.target.value }); }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Security Type</Label>
                    <Select
                      value={wifiData.security}
                      onValueChange={(value) => { invalidate(); setWifiData({ ...wifiData, security: value as WiFiData["security"] }); }}
                    >
                      <SelectTrigger aria-label="Wi-Fi security" className="min-h-11">
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
                <Label htmlFor="qr-foreground-hex" className="text-sm font-medium">Foreground Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    aria-label="Foreground color picker"
                    value={fgColor}
                    onChange={(e) => { invalidate(); setFgColor(e.target.value); }}
                    className="w-12 h-11 shrink-0 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    id="qr-foreground-hex"
                    value={fgColor}
                    onChange={(e) => { invalidate(); setFgColor(e.target.value); }}
                    className="min-w-0 flex-1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="qr-background-hex" className="text-sm font-medium">Background Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    aria-label="Background color picker"
                    value={bgColor}
                    onChange={(e) => { invalidate(); setBgColor(e.target.value); }}
                    className="w-12 h-11 shrink-0 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    id="qr-background-hex"
                    value={bgColor}
                    onChange={(e) => { invalidate(); setBgColor(e.target.value); }}
                    className="min-w-0 flex-1"
                  />
                </div>
              </div>
            </div>

            {/* Size Slider */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Size: {size}px</Label>
              <Slider.Root value={[size]} onValueChange={([value]) => { invalidate(); setSize(value); }}
                min={128} max={512} step={32}
                className="relative flex h-11 w-full touch-none select-none items-center">
                <Slider.Track className="relative h-1.5 grow rounded-full bg-text-muted">
                  <Slider.Range className="absolute h-full rounded-full bg-primary" />
                </Slider.Track>
                <Slider.Thumb aria-label="QR code size in pixels" className="block size-6 rounded-full border-2 border-primary bg-background shadow-sm" />
              </Slider.Root>
            </div>

            <p id="qr-status" role="status" aria-live="polite" aria-atomic="true" className="text-sm break-words">{status}</p>
            {/* Generate Button */}
            <Button onClick={generateQRCode} disabled={busy} className="w-full bg-primary text-primary-foreground hover:bg-brand-700 hover:text-white" size="lg">
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate QR Code
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* QR Code Preview */}
      <div className="min-w-0 space-y-6">
        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Preview</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="w-full max-w-72 min-w-0 p-4 bg-white rounded-lg shadow-inner mb-4">
              <canvas
                ref={canvasRef}
                width={size}
                height={size}
                role="img" aria-label="Current generated QR code" hidden={!generated} className="max-w-full h-auto"
                style={{ width: "100%", height: "auto" }}
              />
            </div>

            {generated && (
              <div className="flex flex-wrap gap-2 justify-center">
                <Button variant="default" size="sm" onClick={downloadQRCode}>
                  <Download className="mr-2 h-3.5 w-3.5" />
                  Download PNG
                </Button>
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  {copied ? (
                    <Check className="mr-2 h-3.5 w-3.5 text-success" />
                  ) : (
                    <Copy className="mr-2 h-3.5 w-3.5" />
                  )}
                  Copy PNG
                </Button>
              </div>
            )}

            {!generated && (
              <p className="text-sm text-text-muted text-center">
                Configure options and click Generate; the preview is empty until valid generation.
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
              Free local PNG generation
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="bg-gradient-to-br from-brand-primary/10 to-brand-primary/5 border-brand-primary/20">
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-text-secondary mb-3">
              Need bulk QR code generation?
            </p>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-brand-700 hover:text-white">
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

function QRCodeGeneratorContent() {
  const params = useSearchParams();
  const urlParam = params.get("url");
  return <QRCodeForm key={urlParam ?? ""} urlParam={urlParam} />;
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
          <CardContent className="min-w-0 space-y-6">
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
      <div className="min-w-0 space-y-6">
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
