import { ImageSource } from "expo-image";

export interface OriginCitySearchType {
  name: string;
  regionName: string;
  countryName: string;
  countryCode: string;
  searchDate: string;
  searchTime: string;
  timezone: string;
}

export interface StopType {
  id: string;
  name: string;
  cityId: string;
  cityName: string;
  countryName: string;
  countryCode: string;
  attractionScore: number;
  longitude: number;
  latitude: number;
  thumbnailUrl?: ImageSource;
  suburb?: string;
  region?: string;
}

export interface ConnectionType {
  id: number;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  durationInTravel: number;
  durationWaiting: number;
  durationTotal: number;
  startingStop: StopType;
  destinationStop: StopType;
}
