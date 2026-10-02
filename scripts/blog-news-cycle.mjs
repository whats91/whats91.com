import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = path.resolve(import.meta.dirname, "..");
const statePath = path.join(root, "docs/blog-news-research/state.json");
const lockPath = path.join(root, "docs/blog-news-research/.run-lock");
const timezone = "Asia/Kolkata";

function indiaNow() {
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-GB", {
    timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(new Date()).map(({ type, value }) => [type, value]));
  return { date: `${parts.year}-${parts.month}-${parts.day}`, minute: Number(parts.hour) * 60 + Number(parts.minute) };
}

function addDays(date, count) {
  const day = new Date(`${date}T00:00:00Z`);
  day.setUTCDate(day.getUTCDate() + count);
  return day.toISOString().slice(0, 10);
}

function readState() {
  const state = JSON.parse(fs.readFileSync(statePath, "utf8"));
  if (state.timezone !== timezone || !/^\d{4}-\d{2}-\d{2}$/.test(state.nextDueDate)) {
    throw new Error("Invalid blog news cycle state");
  }
  return state;
}

function saveState(state) {
  const temp = `${statePath}.${process.pid}.tmp`;
  fs.writeFileSync(temp, `${JSON.stringify(state, null, 2)}\n`);
  fs.renameSync(temp, statePath);
}

function unlock() {
  fs.rmSync(lockPath, { recursive: true, force: true });
}

function acquire() {
  try {
    fs.mkdirSync(lockPath);
  } catch (error) {
    if (error.code !== "EEXIST") throw error;
    const ageHours = (Date.now() - fs.statSync(lockPath).mtimeMs) / 3_600_000;
    if (ageHours < 12) return false;
    // A stale lock may represent interrupted writing. The next agent must inspect
    // the repository and previous attempt before resuming the same cycle.
    fs.rmSync(lockPath, { recursive: true });
    fs.mkdirSync(lockPath);
  }
  fs.writeFileSync(path.join(lockPath, "owner.json"), JSON.stringify({ startedAt: new Date().toISOString(), pid: process.pid }));
  return true;
}

function slotFor(state, now, manual) {
  if (manual) return !state.lastCycle && now.date === state.nextDueDate ? "manual-initial" : null;
  if (now.minute < 11 * 60 || now.minute >= 19 * 60) return null;
  if (now.date > state.nextDueDate) return "pending-catchup";
  if (now.date < state.nextDueDate) return null;
  const today = state.attempts.filter((attempt) => attempt.date === now.date);
  if (now.minute >= 11 * 60 + 30 && now.minute < 12 * 60 && today.length === 0) return "primary";
  if (now.minute >= 16 * 60 + 30 && now.minute < 17 * 60 &&
      !today.some((attempt) => ["completed", "skipped"].includes(attempt.status)) &&
      !today.some((attempt) => attempt.slot === "fallback")) return "fallback";
  if (now.minute >= 18 * 60 + 30 && now.minute < 19 * 60 && today.length === 0) return "missed-attempt-catchup";
  return null;
}

const [command, ...args] = process.argv.slice(2);
if (command === "self-test") {
  const base = { nextDueDate: "2026-10-02", attempts: [], lastCycle: null };
  const at = (date, hour, minute = 30) => ({ date, minute: hour * 60 + minute });
  assert.equal(slotFor(base, at("2026-10-02", 11), false), "primary");
  assert.equal(slotFor(base, at("2026-10-02", 16), false), "fallback");
  assert.equal(slotFor(base, at("2026-10-02", 18), false), "missed-attempt-catchup");
  assert.equal(slotFor(base, at("2026-10-03", 11), false), "pending-catchup");
  assert.equal(slotFor(base, at("2026-10-01", 11), false), null);
  assert.equal(slotFor(base, at("2026-10-02", 13), false), null);
  assert.equal(slotFor(base, at("2026-10-02", 19), false), null);
  assert.equal(slotFor({ ...base, attempts: [{ date: "2026-10-02", slot: "primary", status: "blocked" }] }, at("2026-10-02", 16), false), "fallback");
  assert.equal(slotFor({ ...base, attempts: [{ date: "2026-10-02", slot: "primary", status: "skipped" }] }, at("2026-10-02", 16), false), null);
  assert.equal(slotFor({ ...base, attempts: [{ date: "2026-10-02", slot: "primary", status: "completed" }] }, at("2026-10-02", 16), false), null);
  assert.equal(slotFor({ ...base, attempts: [{ date: "2026-10-02", slot: "primary", status: "blocked" }] }, at("2026-10-02", 18), false), null);
  assert.equal(slotFor({ ...base, nextDueDate: "2026-10-05" }, at("2026-10-03", 11), false), null);
  assert.equal(slotFor({ ...base, nextDueDate: "2026-10-05" }, at("2026-10-03", 11), true), null);
  assert.equal(addDays("2026-10-02", 3), "2026-10-05");
  console.log("PASS: IST due, fallback, skip, catch-up, no-duplicate and three-day cadence gates");
} else if (command === "status") {
  console.log(JSON.stringify(readState(), null, 2));
} else if (command === "begin") {
  if (!acquire()) {
    console.log("LOCKED: another cycle is active; do not start research or edit a post.");
    process.exitCode = 2;
  } else {
    try {
      const state = readState();
      const now = indiaNow();
      const slot = slotFor(state, now, args.includes("--manual-initial"));
      if (!slot || ["completed", "skipped"].includes(state.status)) {
        console.log(`NO_RUN: due=${state.nextDueDate}, status=${state.status}, local=${now.date}`);
        unlock();
      } else {
        const attempt = { date: now.date, slot, status: "in_progress", startedAt: new Date().toISOString(), dueDate: state.nextDueDate };
        state.attempts.push(attempt);
        state.status = "in_progress";
        saveState(state);
        console.log(`RUN: due=${state.nextDueDate}, slot=${slot}. Inspect prior files and coverage before writing.`);
      }
    } catch (error) {
      unlock();
      throw error;
    }
  }
} else if (command === "finish") {
  const [status, log, slug = ""] = args;
  if (!["completed", "skipped", "blocked"].includes(status) || !log) {
    throw new Error("Usage: node scripts/blog-news-cycle.mjs finish <completed|skipped|blocked> <log-path> [slug]");
  }
  if (!fs.existsSync(lockPath)) throw new Error("No active cycle lock");
  const state = readState();
  const attempt = state.attempts.at(-1);
  if (!attempt || attempt.status !== "in_progress") throw new Error("No in-progress attempt");
  attempt.status = status;
  attempt.finishedAt = new Date().toISOString();
  attempt.log = log;
  state.status = status;
  if (status !== "blocked") {
    state.lastCycle = { dueDate: attempt.dueDate, finishedAt: attempt.finishedAt, status, log, ...(slug ? { slug } : {}) };
    if (slug && !state.coverage.some((item) => item.slug === slug)) state.coverage.push({ slug, dueDate: attempt.dueDate, log });
    // Missed cycles are collapsed to one pending cycle, so cadence resumes
    // three days after this cycle actually completes.
    state.nextDueDate = addDays(attempt.date, 3);
    state.attempts = [];
    state.status = "pending";
  }
  saveState(state);
  unlock();
  console.log(`RECORDED: ${status}; next due ${state.nextDueDate}`);
} else {
  throw new Error("Usage: node scripts/blog-news-cycle.mjs <self-test|status|begin|finish>");
}
