export function formatIsoDateToLong(dateIso: string): string {
  const [y, m, d] = dateIso.split("-").map(Number);
  if (!y || !m || !d) return dateIso;

  const date = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function normalizeTimeForSearch(value: string): string {
  const t = value.trim();
  const [h, m] = t.split(":");
  if (h !== undefined && m !== undefined) return `${h}:${m}`;
  return t;
}
