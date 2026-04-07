import { useEffect, useRef } from "react";
import { FlatList, useWindowDimensions, View, ViewToken } from "react-native";

import { MapDestinationType } from "@/types/map-destination-type";

import DestinationCard from "./destination-card";

const CARD_INSET = 40;
const CARD_GAP = 12;

interface Props {
  destinations: MapDestinationType[];
  selectedDestId: string | null;
  onDestSelect: (id: string) => void;
  onPress: () => void;
}

export default function DestinationCarousel({
  destinations,
  selectedDestId,
  onDestSelect,
  onPress,
}: Props) {
  const { width } = useWindowDimensions();
  const cardWidth = width - 2 * CARD_INSET;
  const snapInterval = cardWidth + CARD_GAP;

  const snapOffsets = destinations.map((_, i) => i * snapInterval);

  const flatListRef = useRef<FlatList<MapDestinationType>>(null);

  const isProgrammaticScroll = useRef(false);

  const onDestSelectRef = useRef(onDestSelect);
  useEffect(() => {
    onDestSelectRef.current = onDestSelect;
  }, [onDestSelect]);

  useEffect(() => {
    if (!selectedDestId) return;
    const index = destinations.findIndex((d) => d.id === selectedDestId);
    if (index === -1) return;

    isProgrammaticScroll.current = true;
    setTimeout(() => {
      flatListRef.current?.scrollToOffset({
        offset: index * snapInterval,
        animated: true,
      });
      setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 450);
    }, 50);
  }, [selectedDestId, destinations, snapInterval]);

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 60,
    minimumViewTime: 150,
  });

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (isProgrammaticScroll.current) return;
      if (viewableItems.length > 0) {
        onDestSelectRef.current(viewableItems[0].item.id);
      }
    },
  );

  return (
    <FlatList
      ref={flatListRef}
      data={destinations}
      horizontal
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      snapToOffsets={snapOffsets}
      decelerationRate="fast"
      contentContainerStyle={{
        paddingHorizontal: CARD_INSET,
        paddingVertical: 12,
      }}
      ItemSeparatorComponent={() => <View style={{ width: CARD_GAP }} />}
      getItemLayout={(_, index) => ({
        length: cardWidth,
        offset: index * snapInterval,
        index,
      })}
      viewabilityConfig={viewabilityConfig.current}
      onViewableItemsChanged={onViewableItemsChanged.current}
      onScrollToIndexFailed={({ index }) => {
        setTimeout(() => {
          flatListRef.current?.scrollToOffset({
            offset: index * snapInterval,
            animated: true,
          });
        }, 300);
      }}
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
