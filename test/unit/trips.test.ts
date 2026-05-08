import type { TripsListPayload } from "@/lib/api/mappers/trips";
import { buildTripsListPayload } from "@/lib/api/mappers/trips";
import * as dateFormat from "@/lib/format/date";

jest.spyOn(dateFormat, "getTodayIsoLocal").mockReturnValue("2026-05-01");

const TRIPS_TEST_1_BODY = [
  {
    slug: "fafc195b",
    name: "Madrid and Zaragoza",
    start_date: "2026-04-30",
    end_date: "2026-04-30",
    thumbnail_url:
      "https://ysefockebflcogskagac.supabase.co/storage/v1/object/public/city_images/3117735.jpg",
    created_at: "2026-05-02T10:45:09.694581Z",
  },
  {
    slug: "0635a2c2",
    name: "Empty_0635a2c2",
    start_date: null,
    end_date: null,
    thumbnail_url: null,
    created_at: "2026-05-03T17:51:04.272650Z",
  },
  {
    slug: "ffd9f63a",
    name: "Empty_ffd9f63a",
    start_date: null,
    end_date: null,
    thumbnail_url: null,
    created_at: "2026-05-03T17:57:53.502296Z",
  },
];

const TRIPS_TEST_1_EXPECTED: TripsListPayload = {
  upcoming: [],
  past: [
    {
      id: "fafc195b",
      title: "Madrid and Zaragoza",
      dateRange: "April 30, 2026",
      image: {
        uri: "https://ysefockebflcogskagac.supabase.co/storage/v1/object/public/city_images/3117735.jpg",
      },
    },
  ],
};

describe("mapper-trips", () => {
  it("TEST 1 filters Empty_ trips puts dated trip past when mocked today after end_date", () => {
    expect(buildTripsListPayload(TRIPS_TEST_1_BODY)).toEqual(TRIPS_TEST_1_EXPECTED);
  });

  it("TEST 2 empty array yields empty upcoming and past", () => {
    expect(buildTripsListPayload([])).toEqual({
      upcoming: [],
      past: [],
    });
  });
});
