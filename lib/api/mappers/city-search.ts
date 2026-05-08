import { safeString } from "@/lib/format/mappers";
import { LocationResultType } from "@/types/location-result-type";

export type ApiCitySearchRow = {
  city_id?: string | number;
  city_name?: string;
  city_region_name?: string;
  city_country_name?: string;
  city_country_code?: string;
};

export type ApiCitySearchResponse = {
  results?: ApiCitySearchRow[];
};

export function mapApiCitySearchRow(row: ApiCitySearchRow): LocationResultType {
  const countryCode = safeString(row.city_country_code);
  return {
    id: row.city_id != null ? String(row.city_id) : "",
    name: safeString(row.city_name),
    regionName: safeString(row.city_region_name),
    countryName: safeString(row.city_country_name),
    countryCode: countryCode || "XX",
  };
}

export function mapApiCitySearchResults(
  rows: ApiCitySearchRow[],
): LocationResultType[] {
  return rows.map(mapApiCitySearchRow);
}

export function parseCitySearchResponse(body: unknown): LocationResultType[] {
  try {
    const rows = (body as ApiCitySearchResponse)?.results;
    return mapApiCitySearchResults(rows as ApiCitySearchRow[]);
  } catch {
    throw new Error();
  }
}
