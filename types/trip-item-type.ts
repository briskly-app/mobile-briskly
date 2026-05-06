import { ImageSource } from "expo-image";

export interface TripItemType {
  id: string;
  title: string;
  dateRange: string;
  image?: ImageSource;
}
