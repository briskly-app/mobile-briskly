import { ImageSource } from "expo-image";

export interface DestinationType {
  id: string;
  city: string;
  image?: ImageSource;
  arrivalDate?: string;
  arrivalTime?: string;
  departureDate?: string;
  departureTime?: string;
  stayDays?: number;
  longitude: number;
  latitude: number;
}
