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
  return formatLocalIsoDate(new Date());
}

export function normalizeTimeForSearch(value: string): string {
  const t = value.trim();
  const [h, m] = t.split(":");
  if (h !== undefined && m !== undefined) return `${h}:${m}`;
  return t;
}

export function parseLocalIsoDate(value: string): Date {
  const parsed = new Date(`${value}T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

export function formatLocalIsoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function parseHm(value: string): { hours: number; minutes: number } {
  const [h, m] = value.split(":").map(Number);
  return {
    hours: Number.isFinite(h) ? h : 17,
    minutes: Number.isFinite(m) ? m : 0,
  };
}

export function formatHm(d: Date): string {
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

export function formatLongLocalDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatLongLocalTime(date: Date): string {
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
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
