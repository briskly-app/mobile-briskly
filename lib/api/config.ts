export function getApiBaseUrl(): string {
  const url = process.env.EXPO_PUBLIC_API_URL?.trim();
  return url?.replace(/\/$/, "") ?? "";
}
