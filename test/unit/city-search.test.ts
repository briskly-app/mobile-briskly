import type { LocationResultType } from "@/types/location-result-type";

import { parseCitySearchResponse } from "@/lib/api/mappers/city-search";

const TEST_1_BODY = {
  results: [
    {
      city_id: "756135",
      city_name: "Warsaw",
      city_region_name: "Masovian Voivodeship",
      city_country_name: "Poland",
      city_country_code: "PL",
    },
    {
      city_id: "3094802",
      city_name: "Krakow",
      city_region_name: "Lesser Poland Voivodeship",
      city_country_name: "Poland",
      city_country_code: "PL",
    },
    {
      city_id: "3081368",
      city_name: "Wrocław",
      city_region_name: "Lower Silesian Voivodeship",
      city_country_name: "Poland",
      city_country_code: "PL",
    },
  ],
};

const TEST_1_EXPECTED: LocationResultType[] = [
  {
    id: "756135",
    name: "Warsaw",
    regionName: "Masovian Voivodeship",
    countryName: "Poland",
    countryCode: "PL",
  },
  {
    id: "3094802",
    name: "Krakow",
    regionName: "Lesser Poland Voivodeship",
    countryName: "Poland",
    countryCode: "PL",
  },
  {
    id: "3081368",
    name: "Wrocław",
    regionName: "Lower Silesian Voivodeship",
    countryName: "Poland",
    countryCode: "PL",
  },
];

const TEST_2_BODY = {
  results: [
    {
      city_id: "3082707",
      city_name: "Wałbrzych",
      city_region_name: "Lower Silesian Voivodeship",
      city_country_name: "Poland",
      city_country_code: "PL",
    },
  ],
};

const TEST_2_EXPECTED: LocationResultType[] = [
  {
    id: "3082707",
    name: "Wałbrzych",
    regionName: "Lower Silesian Voivodeship",
    countryName: "Poland",
    countryCode: "PL",
  },
];

const TEST_3_BODY = { results: [] as unknown[] };

describe("mapper-city-search", () => {
  it("TEST 1 maps three Polish cities", () => {
    expect(parseCitySearchResponse(TEST_1_BODY)).toEqual(TEST_1_EXPECTED);
  });

  it("TEST 2 maps single city Wałbrzych", () => {
    expect(parseCitySearchResponse(TEST_2_BODY)).toEqual(TEST_2_EXPECTED);
  });

  it("TEST 3 returns empty array when results is empty", () => {
    expect(parseCitySearchResponse(TEST_3_BODY)).toEqual([]);
  });
});
