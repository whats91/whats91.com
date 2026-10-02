"use client";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { createCopySession, type CopyState } from "@/lib/resource-copy";
const subscribe = () => () => {};

export function useResourceCopy(identity: string) {
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  const session = useMemo(() => createCopySession(), [identity]);
  const [result, setResult] = useState<(CopyState & { identity: string }) | null>(null);
  useEffect(() => { session.activate(); return () => session.invalidate(); }, [session]);
  const current = result?.identity === identity ? result : null;
  async function copy(read: () => string | Promise<string>) {
    let write: ((text: string) => Promise<void>) | undefined;
    try { const clipboard = navigator.clipboard; if (clipboard?.writeText) write = text => clipboard.writeText(text); } catch { /* Manual text recovery remains available. */ }
    await session.copy(read, write, state => setResult({ ...state, identity }));
  }
  return { copy, hydrated, pending: current?.phase === "pending", copied: current?.phase === "copied", text: current?.text || "", status: current?.message || "" };
}
