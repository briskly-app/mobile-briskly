import { ImageSource } from "expo-image";

export interface AttractionItem {
  id: string;
  name: string;
  distance: string;
}

export interface WhatToSeeCategory {
  id: string;
  title: string;
  icon: string;
  items: AttractionItem[];
}

export interface DestinationSummaryType {
  id: string;
  city: string;
  region: string;
  address: string;
  descriptionParagraphs: string[];
  image: ImageSource;
  whatToSee: WhatToSeeCategory[];
}
