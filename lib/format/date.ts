export function formatIsoDateToLong(dateIso: string): string {
  const date = parseIsoDateUtc(dateIso);
  if (!date) return dateIso;

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function formatTripDateRangeUs(
  startIso: string,
  endIso: string,
): string {
  const start = parseIsoDateUtc(startIso);
  const end = parseIsoDateUtc(endIso);
  if (!start || !end) return "";

  const startMonth = formatMonthLong(start);
  const endMonth = formatMonthLong(end);
  const startDay = start.getUTCDate();
  const endDay = end.getUTCDate();
  const startYear = start.getUTCFullYear();
  const endYear = end.getUTCFullYear();

  if (startIso === endIso) {
    return `${startMonth} ${startDay}, ${startYear}`;
  }
  if (startYear === endYear && startMonth === endMonth) {
    return `${startMonth} ${startDay} - ${endDay}, ${startYear}`;
  }
  if (startYear === endYear) {
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${startYear}`;
  }
  return `${startMonth} ${startDay}, ${startYear} - ${endMonth} ${endDay}, ${endYear}`;
}

export function getTodayIsoLocal(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function normalizeTimeForSearch(value: string): string {
  const t = value.trim();
  const [h, m] = t.split(":");
  if (h !== undefined && m !== undefined) return `${h}:${m}`;
  return t;
}

function parseIsoDateUtc(dateIso: string): Date | null {
  const [y, m, d] = dateIso.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(Date.UTC(y, m - 1, d));
}

function formatMonthLong(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    timeZone: "UTC",
  }).format(date);
}
