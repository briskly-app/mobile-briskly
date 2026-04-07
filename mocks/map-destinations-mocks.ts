import {
  MapDestinationType,
  MapFromDestinationType,
} from "@/types/map-destination-type";

export const mapFromDestination: MapFromDestinationType = {
  city: "Zielona Góra",
  region: "Lubuskie",
  departureTime: "10:00",
  departureDate: "Wed, 06 Apr",
  longitude: 15.5066,
  latitude: 51.9381,
};

export const mapDestinations: MapDestinationType[] = [
  {
    id: "md1",
    city: "Szczecin",
    region: "Poland, Zachodniopomorskie",
    address: "Szczecin Przystań, ul. Nabrzeżna 1",
    image: require("@/assets/images/mocks/szczecin.png"),
    arrivalTime: "17:08",
    travelTime: "5h 8m",
    longitude: 14.5521,
    latitude: 53.4381,
    stops: [
      {
        city: "Poznań",
        region: "Poland, Wielkopolskie",
        address: "Poznań Główny, ul. Dworcowa 1",
        arrivalTime: "12:17",
        longitude: 16.93,
        latitude: 52.4,
      },
    ],
  },
  {
    id: "md2",
    city: "Wrocław",
    region: "Poland, Dolnośląskie",
    address: "Wrocław Główny, ul. Piłsudskiego 105",
    image: require("@/assets/images/mocks/wroclaw.png"),
    arrivalTime: "12:17",
    travelTime: "2h 45m",
    longitude: 17.0385,
    latitude: 51.1079,
  },
  {
    id: "md3",
    city: "Berlin",
    region: "Germany, Brandenburg",
    address: "Berlin Hauptbahnhof, Europaplatz 1",
    image: require("@/assets/images/mocks/berlin.png"),
    arrivalTime: "16:00",
    travelTime: "3h 22m",
    longitude: 13.3889,
    latitude: 52.5244,
  },
];
