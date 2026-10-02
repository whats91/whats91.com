"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Twitter, Linkedin, Copy } from "lucide-react";
import { useResourceCopy } from "@/components/shared/useResourceCopy";

export function ShareButtons({ title, url }: { title: string; url?: string }) {
  const copy = useResourceCopy(`${title}|${url || ""}`);
  const [shareStatus, setShareStatus] = useState("");
  const currentUrl = () => url || window.location.href;
  function share(platform: "twitter" | "linkedin") {
    try {
      const shareUrl = currentUrl();
      const destination = platform === "twitter" ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}` : `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
      window.open(destination, "_blank", "noopener,noreferrer,width=600,height=400");
      setShareStatus("Share page requested. Complete sharing there; no post is confirmed here.");
    } catch { setShareStatus("Share page unavailable. Copy the link and open your chosen service manually."); }
  }
  return <div className="space-y-2">
    <div className="flex flex-wrap gap-2">
      <Button type="button" variant="outline" size="sm" disabled={!copy.hydrated} onClick={() => share("twitter")}><Twitter aria-hidden="true" className="h-4 w-4" />Twitter</Button>
      <Button type="button" variant="outline" size="sm" disabled={!copy.hydrated} onClick={() => share("linkedin")}><Linkedin aria-hidden="true" className="h-4 w-4" />LinkedIn</Button>
      <Button type="button" variant="outline" size="sm" disabled={!copy.hydrated || copy.pending} onClick={() => copy.copy(currentUrl)}><Copy aria-hidden="true" className="h-4 w-4" />Copy Link</Button>
    </div>
    <p role="status" className="text-sm text-text-secondary">{copy.status || shareStatus}</p>
    <label className="block text-caption">Page link for manual copy<input readOnly value={copy.text || url || ""} className="mt-1 block w-full min-w-0 rounded-lg border border-border p-2 text-sm" /></label>
    <p className="text-caption">Copy and share controls need JavaScript. You can also copy the address from your browser.</p>
  </div>;
}
