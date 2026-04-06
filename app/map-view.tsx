import { router } from "expo-router";
import { View } from "react-native";

import DestinationCarousel from "@/components/map-view/destination-carousel";
import SearchBar from "@/components/map-view/search-bar";
import { mapDestinations } from "@/mocks/map-destinations-mocks";

export default function MapViewScreen() {
  return (
    <View className="flex-1">
      {/* Map placeholder */}
      <View className="absolute inset-0 bg-red-400" />

      <View className="pt-[56px]">
        <SearchBar />
      </View>

      <View className="absolute left-0 right-0 bottom-0 pb-8">
        <DestinationCarousel
          destinations={mapDestinations}
          onPress={() => router.push("/destination-summary")}
        />
      </View>
    </View>
  );
}
