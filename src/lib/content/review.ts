import { createHash } from "node:crypto";
import { contentDate } from "./dates";

export type ClaimStatus = "VERIFIED" | "QUALIFIED" | "PENDING" | "REJECTED" | "EXPIRED";
/** Stored alongside its canonical record; never an alternative fact catalogue. */
export interface ClaimContract {
  id: string;
  meaning: string;
  source: string[];
  evidenceCheckedAt?: string;
  conditions: string[];
  publicUse: "source-reported" | "withheld" | "approved";
  status: ClaimStatus;
  consumers: string[];
  recheck: string[];
  adverseEvidence: string[];
}
export type ReviewParts = Readonly<Record<string, string>>;
export interface HumanReviewEvent {
  id: string;
  actor: string;
  reviewedAt: string;
  /** Actual human decision evidence, not a test report or inferred job title. */
  decisionSource: string;
  kind: "review" | "addendum";
  parentId?: string;
  scope: readonly string[];
  snapshot: ReviewParts;
  fingerprint: string;
}
export interface EditorialRecord {
  stage: "draft" | "technically-verified" | "pending-human-review";
  evidenceCheckedAt?: string;
  mediaCapturedAt?: string;
  claims?: readonly ClaimContract[];
  history: readonly HumanReviewEvent[];
}

function canonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value && typeof value === "object") return `{${Object.entries(value).filter(([,v]) => v !== undefined).sort(([a],[b]) => a < b ? -1 : a > b ? 1 : 0).map(([k,v]) => `${JSON.stringify(k)}:${canonical(v)}`).join(",")}}`;
  return JSON.stringify(value) ?? "null";
}
export function fingerprint(value: unknown): string {
  return createHash("sha256").update(canonical(value)).digest("hex");
}
/** Public dates stay in the record fingerprint. Only internal governance is excluded. */
export function publicRecord(record: Record<string, unknown>) {
  const { editorial: _editorial, ...publicFields } = record;
  void _editorial;
  return publicFields;
}

function validateEvent(event: HumanReviewEvent) {
  if (!event.snapshot || Object.values(event.snapshot).some(value => typeof value !== "string" || !value)) throw new Error("Review snapshot must contain immutable identity strings");
  if (!["review", "addendum"].includes(event.kind) || !event.id.trim() || !event.actor.trim() || !event.decisionSource.trim() || !contentDate(event.reviewedAt) || !event.scope.length || new Set(event.scope).size !== event.scope.length || event.scope.some(key => !(key in event.snapshot)) || event.fingerprint !== fingerprint(event.snapshot)) throw new Error("Incomplete human review event");
}
/** Validates supplied human evidence; never creates an event from automated success. */
export function appendHumanReview(history: readonly HumanReviewEvent[], event: HumanReviewEvent): readonly HumanReviewEvent[] {
  validateEvent(event);
  if (history.some(old => old.id === event.id)) throw new Error("Review IDs are immutable");
  if (history.length && Date.parse(event.reviewedAt) < Date.parse(history.at(-1)!.reviewedAt)) throw new Error("Review history must retain event order");
  if (event.kind === "addendum") {
    const parent = history.at(-1);
    if (!parent || parent.id !== event.parentId || Date.parse(event.reviewedAt) < Date.parse(parent.reviewedAt)) throw new Error("Addendum must reference the latest review");
    const changed = new Set([...Object.keys(parent.snapshot), ...Object.keys(event.snapshot)].filter(key => parent.snapshot[key] !== event.snapshot[key]));
    if (!changed.size || [...changed].some(key => !event.scope.includes(key))) throw new Error("Addendum cannot approve changes outside its scope");
  } else if (event.parentId || event.scope.length !== Object.keys(event.snapshot).length) throw new Error("Full review must cover the entire snapshot");
  const copy = (entry: HumanReviewEvent) => Object.freeze({ ...entry, scope: Object.freeze([...entry.scope]), snapshot: Object.freeze({ ...entry.snapshot }) });
  return Object.freeze([...history.map(copy), copy(event)]);
}

export function reviewState(record: EditorialRecord | undefined, current: ReviewParts) {
  if (!record) return "draft";
  if (!["draft", "technically-verified", "pending-human-review"].includes(record.stage) || !Array.isArray(record.history)) return "pending-human-review";
  let valid: readonly HumanReviewEvent[] = [];
  try { for (const event of record.history) valid = appendHumanReview(valid, event); }
  catch { return "pending-human-review"; }
  const latest = valid.at(-1);
  if (latest) return latest.fingerprint === fingerprint(current) ? "reviewed-revision" : "changed-after-review";
  return record.stage;
}
