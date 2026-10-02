// This bounds waiting. An operation that ignores AbortSignal can still complete.
export class DeadlineError extends Error {
  constructor() { super("Operation deadline reached"); this.name = "DeadlineError"; }
}

export function createDeadline(milliseconds: number, parent?: AbortSignal) {
  const controller = new AbortController();
  const abortFromParent = () => controller.abort(parent?.reason ?? new DOMException("Cancelled", "AbortError"));
  if (parent?.aborted) abortFromParent();
  else parent?.addEventListener("abort", abortFromParent, { once: true });
  const timer = setTimeout(() => controller.abort(new DeadlineError()), milliseconds);
  return {
    signal: controller.signal,
    close() {
      clearTimeout(timer);
      parent?.removeEventListener("abort", abortFromParent);
      controller.abort(new DOMException("Finished", "AbortError"));
    },
  };
}

export async function waitForOperation<T>(operation: () => PromiseLike<T>, signal: AbortSignal): Promise<T> {
  if (signal.aborted) throw signal.reason;
  let listener: () => void = () => {};
  const cancelled = new Promise<never>((_, reject) => {
    listener = () => reject(signal.reason ?? new DOMException("Cancelled", "AbortError"));
    signal.addEventListener("abort", listener, { once: true });
  });
  try { return await Promise.race([Promise.resolve().then(() => {
    if (signal.aborted) throw signal.reason;
    return operation();
  }), cancelled]); }
  finally { signal.removeEventListener("abort", listener); }
}

export async function withDeadline<T>(operation: (signal: AbortSignal) => PromiseLike<T>, milliseconds: number, parent?: AbortSignal): Promise<T> {
  const deadline = createDeadline(milliseconds, parent);
  try { return await waitForOperation(() => operation(deadline.signal), deadline.signal); }
  finally { deadline.close(); }
}
