import { ImageSource } from "expo-image";

export interface MapFromDestinationType {
  city: string;
  region: string;
  departureTime: string;
  departureDate: string;
  longitude: number;
  latitude: number;
}

export interface MapStopType {
  city: string;
  region: string;
  address: string;
  arrivalTime: string;
  longitude: number;
  latitude: number;
}

export interface MapDestinationType {
  id: string;
  city: string;
  region: string;
  address: string;
  image: ImageSource;
  arrivalTime: string;
  travelTime: string;
  longitude: number;
  latitude: number;
  stops?: MapStopType[];
}
