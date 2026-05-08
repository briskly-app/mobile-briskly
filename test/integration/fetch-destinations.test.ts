import {
  fetchDestinations,
  type DestinationsQueryParams,
} from "@/lib/api/destinations";
import { SERVER_ERROR } from "@/lib/constants/messages";

const API_BASE = "https://api.test.example";

const SAMPLE_API_BODY = {
  city_name: "Madrid",
  region: "Community of Madrid",
  country_code: "ES",
  country_name: "Spain",
  search_date: "2026-04-30",
  search_time: "18:00",
  timezone: "Europe/Warsaw",
  results: [],
};

const SAMPLE_PARAMS: DestinationsQueryParams = {
  fromCity: "3117735",
  date: "2026-04-30",
  time: "18:00",
  timezone: "Europe/Warsaw",
  waitingTime: "30",
};

function expectedDestinationsUrl(): string {
  const q = new URLSearchParams({
    from_city: SAMPLE_PARAMS.fromCity,
    date: SAMPLE_PARAMS.date,
    time: SAMPLE_PARAMS.time,
    timezone: SAMPLE_PARAMS.timezone,
    waitingTime: SAMPLE_PARAMS.waitingTime,
  }).toString();
  return `${API_BASE}/api/destinations/?${q}`;
}

function mockFetchJsonResponse(body: unknown) {
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => body,
  });
}

describe("integration fetchDestinations", () => {
  const prevApiUrl = process.env.EXPO_PUBLIC_API_URL;

  beforeAll(() => {
    process.env.EXPO_PUBLIC_API_URL = API_BASE;
  });

  afterAll(() => {
    process.env.EXPO_PUBLIC_API_URL = prevApiUrl;
  });

  beforeEach(() => {
    jest.resetAllMocks();
    global.fetch = jest.fn();
  });

  it("GET with query string passes Accept header and maps JSON to payload", async () => {
    mockFetchJsonResponse(SAMPLE_API_BODY);

    const payload = await fetchDestinations(SAMPLE_PARAMS);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const [url, init] = (global.fetch as jest.Mock).mock.calls[0];

    expect(url).toBe(expectedDestinationsUrl());
    expect(init).toMatchObject({
      method: "GET",
      headers: { Accept: "application/json" },
    });

    expect(payload.origin).toEqual({
      name: "Madrid",
      regionName: "Community of Madrid",
      countryName: "Spain",
      countryCode: "ES",
      searchDate: "2026-04-30",
      searchTime: "18:00",
      timezone: "Europe/Warsaw",
    });
    expect(payload.connections).toEqual([]);
  });

  it("forwards AbortSignal into fetch init", async () => {
    mockFetchJsonResponse(SAMPLE_API_BODY);
    const controller = new AbortController();

    await fetchDestinations(SAMPLE_PARAMS, controller.signal);

    const [, init] = (global.fetch as jest.Mock).mock.calls[0];
    expect(init.signal).toBe(controller.signal);
  });

  it("non-OK response throws generic server error", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 502,
      json: async () => ({}),
    });

    await expect(fetchDestinations(SAMPLE_PARAMS)).rejects.toThrow(
      SERVER_ERROR,
    );
  });
});

describe("integration fetchDestinations - missing EXPO_PUBLIC_API_URL", () => {
  const envSnapshot = process.env.EXPO_PUBLIC_API_URL;

  beforeEach(() => {
    delete process.env.EXPO_PUBLIC_API_URL;
    jest.resetAllMocks();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    if (envSnapshot === undefined) {
      delete process.env.EXPO_PUBLIC_API_URL;
    } else {
      process.env.EXPO_PUBLIC_API_URL = envSnapshot;
    }
  });

  it("throws SERVER_ERROR and never calls fetch", async () => {
    await expect(fetchDestinations(SAMPLE_PARAMS)).rejects.toThrow(
      SERVER_ERROR,
    );
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
