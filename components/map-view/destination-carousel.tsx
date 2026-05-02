import { useEffect, useRef } from "react";
import { FlatList, useWindowDimensions, View, ViewToken } from "react-native";

import { ConnectionType } from "@/types/stop-type";

import DestinationCard from "./destination-card";

const CARD_INSET = 40;
const CARD_GAP = 12;

function connectionKey(c: ConnectionType): string {
  return String(c.id);
}

interface Props {
  connections: ConnectionType[];
  selectedConnectionId: string | null;
  onConnectionSelect: (id: string) => void;
  onPress: () => void;
}

export default function DestinationCarousel({
  connections,
  selectedConnectionId,
  onConnectionSelect,
  onPress,
}: Props) {
  const { width } = useWindowDimensions();
  const cardWidth = width - 2 * CARD_INSET;
  const snapInterval = cardWidth + CARD_GAP;

  const snapOffsets = connections.map((_, i) => i * snapInterval);

  const flatListRef = useRef<FlatList<ConnectionType>>(null);

  const isProgrammaticScroll = useRef(false);

  const onConnectionSelectRef = useRef(onConnectionSelect);
  useEffect(() => {
    onConnectionSelectRef.current = onConnectionSelect;
  }, [onConnectionSelect]);

  useEffect(() => {
    if (!selectedConnectionId) return;
    const index = connections.findIndex(
      (c) => connectionKey(c) === selectedConnectionId,
    );
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
  }, [selectedConnectionId, connections, snapInterval]);

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 60,
    minimumViewTime: 150,
  });

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (isProgrammaticScroll.current) return;
      if (viewableItems.length > 0) {
        const item = viewableItems[0].item as ConnectionType;
        onConnectionSelectRef.current(connectionKey(item));
      }
    },
  );

  return (
    <FlatList
      ref={flatListRef}
      data={connections}
      horizontal
      keyExtractor={(item) => connectionKey(item)}
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
          connection={item}
          onPress={onPress}
          style={{ width: cardWidth }}
        />
      )}
    />
  );
}
