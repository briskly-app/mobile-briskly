export function safeString(value: unknown): string {
  return String(value ?? "").trim();
}

export function safeNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}
