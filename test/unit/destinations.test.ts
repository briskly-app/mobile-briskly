import type { ApiDestinationsResponse } from "@/lib/api/mappers/destinations";
import {
  mapConnections,
  mapOriginCitySearch,
} from "@/lib/api/mappers/destinations";
import type { ConnectionType, OriginCitySearchType } from "@/types/stop-type";

const DESTINATIONS_TEST_1_BODY = {
  count: 2,
  city_id: "3117735",
  city_name: "Madrid",
  region: "Community of Madrid",
  country_code: "ES",
  country_name: "Spain",
  search_date: "2026-04-30",
  search_time: "18:00",
  timezone: "Europe/Warsaw",
  results: [
    {
      id: "9c7b44ee-1252-44f2-a0ba-c318930bb294",
      trip_id: "N748-3-1850042026-MAD#LYON-00",
      departure_date: "2026-04-30",
      departure_time: "18:50",
      arrival_date: "2026-04-30",
      arrival_time: "22:30",
      duration_in_travel: 13200.0,
      duration_waiting: 3000.0,
      duration_total: 16200.0,
      starting_stop: {
        stop_id: "765c44fe-f070-4e9c-8238-71c078e8734f",
        stop_name: "Madrid (South Bus Station)",
        city_id: "3117735",
        city_name: "Madrid",
        country_code: "ES",
        country_name: "Spain",
        attraction_score: 0,
        longitude: -3.677876,
        latitude: 40.395255,
      },
      destination_stop: {
        stop_id: "07597a10-0f4c-49d5-84c8-abf615bd5956",
        stop_name: "Zaragoza (Delicias Station)",
        city_id: "3104324",
        city_name: "Zaragoza",
        country_code: "ES",
        country_name: "Spain",
        attraction_score: 98,
        longitude: -0.911991,
        latitude: 41.659853,
        thumbnail_url:
          "https://ysefockebflcogskagac.supabase.co/storage/v1/object/public/city_images/3104324.jpg",
        description_paragraphs: ["Zaragoza is a city in Spain."],
        suburb: "La Almozara",
        region: "Aragon",
      },
    },
    {
      id: "c9dc2e47-f231-47cc-9164-c1380cfc2d8a",
      trip_id: "N795-3-2100042026-BAJ#PSC-00",
      departure_date: "2026-04-30",
      departure_time: "21:00",
      arrival_date: "2026-05-01",
      arrival_time: "00:05",
      duration_in_travel: 11100.0,
      duration_waiting: 10800.0,
      duration_total: 21900.0,
      starting_stop: {
        stop_id: "1b8eaa11-e4a2-4a88-a059-403181c2eb8c",
        stop_name: "Madrid Barajas Airport (Terminal 4)",
        city_id: "3117735",
        city_name: "Madrid",
        country_code: "ES",
        country_name: "Spain",
        attraction_score: 44,
        longitude: -3.594624,
        latitude: 40.494838,
      },
      destination_stop: {
        stop_id: "432e742d-77dc-496d-a84a-22da6809cddd",
        stop_name: "Salamanca (Bus Station)",
        city_id: "6544491",
        city_name: "Salamanca",
        country_code: "ES",
        country_name: "Spain",
        attraction_score: 58,
        longitude: -5.674751,
        latitude: 40.97042,
        thumbnail_url:
          "https://ysefockebflcogskagac.supabase.co/storage/v1/object/public/city_images/6544491.jpg",
        description_paragraphs: [],
        suburb: "San Bernardo",
        region: "Castile and León",
      },
    },
  ],
} satisfies ApiDestinationsResponse;

const DESTINATIONS_TEST_1_ORIGIN_EXPECTED: OriginCitySearchType = {
  name: "Madrid",
  regionName: "Community of Madrid",
  countryName: "Spain",
  countryCode: "ES",
  searchDate: "2026-04-30",
  searchTime: "18:00",
  timezone: "Europe/Warsaw",
};

const DESTINATIONS_TEST_1_CONNECTIONS_EXPECTED: ConnectionType[] = [
  {
    id: "9c7b44ee-1252-44f2-a0ba-c318930bb294",
    gtfsTrip: "N748-3-1850042026-MAD#LYON-00",
    originTimezone: "Europe/Warsaw",
    departureDate: "2026-04-30",
    departureTime: "18:50",
    arrivalDate: "2026-04-30",
    arrivalTime: "22:30",
    durationInTravel: 13200,
    durationWaiting: 3000,
    durationTotal: 16200,
    startingStop: {
      id: "765c44fe-f070-4e9c-8238-71c078e8734f",
      name: "Madrid (South Bus Station)",
      cityId: "3117735",
      cityName: "Madrid",
      countryCode: "ES",
      countryName: "Spain",
      attractionScore: 0,
      longitude: -3.677876,
      latitude: 40.395255,
      descriptionParagraphs: [],
    },
    destinationStop: {
      id: "07597a10-0f4c-49d5-84c8-abf615bd5956",
      name: "Zaragoza (Delicias Station)",
      cityId: "3104324",
      cityName: "Zaragoza",
      countryCode: "ES",
      countryName: "Spain",
      attractionScore: 98,
      longitude: -0.911991,
      latitude: 41.659853,
      thumbnailUrl: {
        uri: "https://ysefockebflcogskagac.supabase.co/storage/v1/object/public/city_images/3104324.jpg",
      },
      suburb: "La Almozara",
      region: "Aragon",
      descriptionParagraphs: ["Zaragoza is a city in Spain."],
    },
  },
  {
    id: "c9dc2e47-f231-47cc-9164-c1380cfc2d8a",
    gtfsTrip: "N795-3-2100042026-BAJ#PSC-00",
    originTimezone: "Europe/Warsaw",
    departureDate: "2026-04-30",
    departureTime: "21:00",
    arrivalDate: "2026-05-01",
    arrivalTime: "00:05",
    durationInTravel: 11100,
    durationWaiting: 10800,
    durationTotal: 21900,
    startingStop: {
      id: "1b8eaa11-e4a2-4a88-a059-403181c2eb8c",
      name: "Madrid Barajas Airport (Terminal 4)",
      cityId: "3117735",
      cityName: "Madrid",
      countryCode: "ES",
      countryName: "Spain",
      attractionScore: 44,
      longitude: -3.594624,
      latitude: 40.494838,
      descriptionParagraphs: [],
    },
    destinationStop: {
      id: "432e742d-77dc-496d-a84a-22da6809cddd",
      name: "Salamanca (Bus Station)",
      cityId: "6544491",
      cityName: "Salamanca",
      countryCode: "ES",
      countryName: "Spain",
      attractionScore: 58,
      longitude: -5.674751,
      latitude: 40.97042,
      thumbnailUrl: {
        uri: "https://ysefockebflcogskagac.supabase.co/storage/v1/object/public/city_images/6544491.jpg",
      },
      suburb: "San Bernardo",
      region: "Castile and León",
      descriptionParagraphs: [],
    },
  },
];

const DESTINATIONS_TEST_2_BODY = {
  count: 0,
  city_id: "3117735",
  city_name: "Madrid",
  region: "Community of Madrid",
  country_code: "ES",
  country_name: "Spain",
  search_date: "2026-04-30",
  search_time: "02:00",
  timezone: "Europe/Warsaw",
  results: [],
} satisfies ApiDestinationsResponse;

const DESTINATIONS_TEST_2_ORIGIN_EXPECTED: OriginCitySearchType = {
  name: "Madrid",
  regionName: "Community of Madrid",
  countryName: "Spain",
  countryCode: "ES",
  searchDate: "2026-04-30",
  searchTime: "02:00",
  timezone: "Europe/Warsaw",
};

describe("mapper-destinations", () => {
  it("TEST 1 maps origin metadata and both connections with stops", () => {
    expect(mapOriginCitySearch(DESTINATIONS_TEST_1_BODY)).toEqual(
      DESTINATIONS_TEST_1_ORIGIN_EXPECTED,
    );
    expect(mapConnections(DESTINATIONS_TEST_1_BODY)).toEqual(
      DESTINATIONS_TEST_1_CONNECTIONS_EXPECTED,
    );
  });

  it("TEST 2 maps origin and returns empty connections for empty results", () => {
    expect(mapOriginCitySearch(DESTINATIONS_TEST_2_BODY)).toEqual(
      DESTINATIONS_TEST_2_ORIGIN_EXPECTED,
    );
    expect(mapConnections(DESTINATIONS_TEST_2_BODY)).toEqual([]);
  });
});
