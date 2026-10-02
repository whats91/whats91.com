export type CopyState = { phase: "pending" | "copied" | "unavailable"; text: string; message: string };

/** A current-operation boundary shared by resource copy consumers. No browser globals here. */
export function createCopySession() {
  let version = 0;
  let active = true;
  return {
    activate() { active = true; },
    invalidate() { active = false; version += 1; },
    async copy(read: () => string | Promise<string>, write: ((text: string) => Promise<void>) | undefined, notify: (state: CopyState) => void) {
      const ticket = ++version;
      const current = () => active && ticket === version;
      let text = "";
      if (!current()) return;
      notify({ phase: "pending", text, message: "Preparing copy…" });
      try {
        text = await read();
        if (!current()) return;
        if (typeof text !== "string" || !text.trim()) throw new Error("No copyable content");
        notify({ phase: "pending", text, message: "Waiting for clipboard…" });
        if (!write) throw new Error("Clipboard unavailable");
        await write(text);
        if (current()) notify({ phase: "copied", text, message: "Copied to clipboard." });
      } catch {
        if (current()) notify({ phase: "unavailable", text, message: text ? "Copy unavailable. Select the text and copy it manually." : "Content unavailable. Retry or use the download or page link." });
      }
    },
  };
}
