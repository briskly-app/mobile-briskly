import { View } from "react-native";

import DestinationCard from "@/components/trip-summary/destination-card";
import { DestinationType } from "@/types/destination-type";

interface Props {
  destinations: DestinationType[];
}

export default function DestinationsList({ destinations }: Props) {
  return (
    <View className="mb-4 gap-3">
      {destinations.map((dest) => (
        <DestinationCard key={dest.id} {...dest} />
      ))}
    </View>
  );
}
