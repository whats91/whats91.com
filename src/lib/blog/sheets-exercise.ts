/** Offline exercise for the guide's small CSV shape, not a Busy connector or Sheets engine.
 * No network, account, file-write or live import behavior is provided here.
 */
export function parseExerciseCSV(input: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [], cell = "", quoted = false, closed = false;
  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    if (quoted) {
      if (c === '"' && input[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') { quoted = false; closed = true; }
      else cell += c;
    } else if (c === ',' || c === '\n' || c === '\r') {
      row.push(cell); cell = ""; closed = false;
      if (c !== ',') { rows.push(row); row = []; if (c === '\r' && input[i + 1] === '\n') i++; }
    } else if (c === '"') {
      if (cell || closed) throw new Error("Malformed quoting");
      quoted = true;
    } else {
      if (closed) throw new Error("Unexpected text after quote");
      cell += c;
    }
  }
  if (quoted) throw new Error("Unclosed quote");
  if (cell || row.length || closed) { row.push(cell); rows.push(row); }
  return rows;
}

export function checkExerciseCSV(input: string) {
  const rows = parseExerciseCSV(input);
  const expected = ["Company", "FinancialYear", "Invoice", "InvoiceDate", "DueDate", "Customer", "AmountINR", "PaidINR"];
  if (JSON.stringify(rows[0]) !== JSON.stringify(expected)) throw new Error("Expected eight-column comma-separated header");
  if (rows.length < 2) throw new Error("No invoice rows");
  const scope = rows[1].slice(0, 2).join("|");
  const keys = new Set<string>();
  let invoiced = 0, paid = 0;
  for (const row of rows.slice(1)) {
    if (row.length !== expected.length || row.some(cell => !cell.trim())) throw new Error("Incomplete invoice row");
    if (row.slice(0, 2).join("|") !== scope) throw new Error("Mixed company or financial year");
    const key = row.slice(0, 3).join("|");
    if (keys.has(key)) throw new Error("Duplicate invoice key");
    keys.add(key);
    for (const date of row.slice(3, 5)) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date) throw new Error("Invalid ISO date");
    }
    const numbers = row.slice(6).map(value => {
      if (!/^\d+(?:\.\d{1,2})?$/.test(value)) throw new Error("Expected nonnegative numeric amount");
      const n = Number(value); if (!Number.isFinite(n)) throw new Error("Amount out of range"); return n;
    });
    if (numbers[1] > numbers[0]) throw new Error("Payment exceeds invoice in this exercise");
    invoiced += numbers[0]; paid += numbers[1];
  }
  return { columns: expected.length, invoices: rows.length - 1, invoiced, paid, outstanding: invoiced - paid };
}

export function checkSpreadsheetReference(url: string, range: string, sourceAccess: boolean, destinationGrant: boolean) {
  const parsed = new URL(url);
  if (parsed.protocol !== "https:" || parsed.hostname !== "docs.google.com" || !/^\/spreadsheets\/d\/[A-Za-z0-9_-]+\/?$/.test(parsed.pathname) || parsed.search || parsed.hash) throw new Error("Expected a Google spreadsheet URL, not CSV");
  if (!/^[A-Za-z][A-Za-z0-9_]*![A-Z]+[1-9]\d*:[A-Z]+[1-9]\d*$/.test(range)) throw new Error("Expected bounded simple-tab A1 range for this exercise");
  if (!sourceAccess) throw new Error("Source access required");
  if (!destinationGrant) throw new Error("Destination access grant required");
  return `=IMPORTRANGE("${url}", "${range}")`;
}
