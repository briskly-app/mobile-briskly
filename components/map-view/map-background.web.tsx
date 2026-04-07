import { View } from "react-native";

import {
  MapDestinationType,
  MapFromDestinationType,
} from "@/types/map-destination-type";

interface Props {
  fromDestination: MapFromDestinationType;
  destinations: MapDestinationType[];
}

export default function MapBackground(_props: Props) {
  return <View className="absolute inset-0 bg-slate-200" />;
}
