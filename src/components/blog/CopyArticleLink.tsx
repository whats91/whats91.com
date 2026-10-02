"use client";
import { useResourceCopy } from "@/components/shared/useResourceCopy";

/** Clipboard enhancement; the adjacent server-rendered article link remains usable. */
export function CopyArticleLink({ url }: { url: string }) {
  const copy = useResourceCopy(url);
  return <div className="space-y-2">
    <button type="button" disabled={!copy.hydrated || copy.pending} onClick={() => copy.copy(() => url)} className="min-h-11 rounded-lg border border-border px-4 py-2 text-sm font-medium disabled:opacity-60">Copy article link</button>
    <p role="status" className="text-sm text-text-secondary">{copy.status}</p>
    <p className="text-caption">If copying is unavailable, select the article link below.</p>
  </div>;
}
