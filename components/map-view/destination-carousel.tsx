import { FlatList, useWindowDimensions, View } from "react-native";

import { MapDestinationType } from "@/types/map-destination-type";

import DestinationCard from "./destination-card";

interface Props {
  destinations: MapDestinationType[];
  onPress: () => void;
}

export default function DestinationCarousel({ destinations, onPress }: Props) {
  const { width } = useWindowDimensions();
  const cardWidth = width - 80;
  const snapInterval = cardWidth + 12;

  return (
    <FlatList
      data={destinations}
      horizontal
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      snapToInterval={snapInterval}
      decelerationRate="fast"
      contentContainerStyle={{ paddingHorizontal: 40, paddingVertical: 12 }}
      ItemSeparatorComponent={() => <View className="w-3" />}
      renderItem={({ item }) => (
        <DestinationCard
          destination={item}
          onPress={onPress}
          style={{ width: cardWidth }}
        />
      )}
    />
  );
}
