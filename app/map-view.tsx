import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import DestinationCarousel from "@/components/map-view/destination-carousel";
import MapBackground from "@/components/map-view/map-background";
import SearchBar from "@/components/map-view/search-bar";
import { connections } from "@/mocks/map-destinations-mocks";

export default function MapViewScreen() {
  const insets = useSafeAreaInsets();
  const [selectedConnectionId, setSelectedConnectionId] = useState<
    string | null
  >(null);

  return (
    <View className="flex-1">
      <MapBackground
        connections={connections}
        selectedConnectionId={selectedConnectionId}
        onConnectionSelect={setSelectedConnectionId}
      />

      <View style={{ paddingTop: insets.top + 12 }}>
        <SearchBar />
      </View>

      <View
        className="absolute left-0 right-0 bottom-0"
        style={{ paddingBottom: insets.bottom + 8 }}
      >
        <DestinationCarousel
          connections={connections}
          selectedConnectionId={selectedConnectionId}
          onConnectionSelect={setSelectedConnectionId}
          onPress={() => router.push("/destination-summary")}
        />
      </View>
    </View>
  );
}
