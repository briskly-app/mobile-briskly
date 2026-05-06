import { DestinationSummaryType } from "@/types/destination-summary-type";

export const szczecinSummary: DestinationSummaryType = {
  id: "ds1",
  city: "Szczecin",
  region: "Zachodniopomorskie",
  address: "Szczecin, ul. Wielokolorowa 1",
  descriptionParagraphs: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  ],
  image: require("@/assets/images/mocks/szczecin.png"),
  whatToSee: [
    {
      id: "wts1",
      title: "Museums",
      icon: "museum",
      items: [
        { id: "a1", name: "Muzeum Narodowe", distance: "420 m" },
        { id: "a2", name: "Muzeum Techniki i Komunikacji", distance: "870 m" },
        { id: "a3", name: "Muzeum Historii Szczecina", distance: "1050 m" },
      ],
    },
    {
      id: "wts2",
      title: "Viewpoints",
      icon: "landscape",
      items: [
        { id: "b1", name: "Taras widokowy Wały Chrobrego", distance: "230 m" },
        { id: "b2", name: "Punkt widokowy przy Zamku", distance: "680 m" },
      ],
    },
    {
      id: "wts3",
      title: "Attractions",
      icon: "attractions",
      items: [
        { id: "c1", name: "Pomnik Adama Mickiewicza", distance: "340 m" },
        { id: "c2", name: "Muzeum Sztuki Nowoczesnej", distance: "812 m" },
        { id: "c3", name: "Centrum Nauki Eureka", distance: "1212 m" },
      ],
    },
  ],
};
