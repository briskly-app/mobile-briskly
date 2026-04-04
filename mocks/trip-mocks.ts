import { TripItemType } from "@/types/trip-item-type";

export const upcomingTrips: TripItemType[] = [
  {
    id: "u1",
    title: "Poland and Germany",
    dateRange: "May 3 - 6, 2026",
    image: require("@/assets/images/mocks/szczecin.png"),
  },
  {
    id: "u2",
    title: "Spain and Portugal",
    dateRange: "August 22 - 28, 2026",
    image: require("@/assets/images/mocks/barcelona.png"),
  },
  {
    id: "u3",
    title: "Bulgaria, Greece and Cyprus",
    dateRange: "October 11 - 21, 2026",
    image: require("@/assets/images/mocks/athens.png"),
  },
];

export const pastTrips: TripItemType[] = [
  {
    id: "p1",
    title: "Switzerland",
    dateRange: "May 3 - 6, 2023",
    image: require("@/assets/images/mocks/alpes.png"),
  },
  {
    id: "p2",
    title: "France and Italy",
    dateRange: "May 3 - 6, 2022",
    image: require("@/assets/images/mocks/venecia.png"),
  },
  {
    id: "p3",
    title: "Austria",
    dateRange: "February 9 - 12, 2022",
    image: require("@/assets/images/mocks/vienna.png"),
  },
];
