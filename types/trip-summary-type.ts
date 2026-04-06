import { DestinationType } from "./destination-type";

export interface TripStatType {
  id: string;
  icon: string;
  label: string;
  value: string;
}

export interface TripSummaryType {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  destinations: DestinationType[];
  stats: TripStatType[];
}
