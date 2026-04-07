import { useState } from "react";
import { Platform, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import DateInput from "@/components/explore/date-input";
import DiscoverButton from "@/components/explore/discover-button";
import HeaderText from "@/components/explore/header-text";
import LocationInput from "@/components/explore/location-input";
import TimeInput from "@/components/explore/time-input";
import VideoBackground from "@/components/explore/video-background";
import { CENTERED_OFFSET, SPRING } from "@/constants/global";
import { router } from "expo-router";

export default function ExploreScreen() {
  const [isSearching, setIsSearching] = useState(false);
  const offsetY = useSharedValue(CENTERED_OFFSET);

  const contentStyle = useAnimatedStyle(() => ({
    paddingTop: offsetY.value,
  }));

  const handleSearchOpen = () => {
    offsetY.value = withSpring(Platform.OS === "web" ? 12 : 8, SPRING);
    setIsSearching(true);
  };

  const handleSearchClose = () => {
    offsetY.value = withSpring(CENTERED_OFFSET, SPRING);
    setIsSearching(false);
  };

  return (
    <View className="flex-1">
      <VideoBackground />
      <View className="absolute inset-0 bg-black/30" />

      <SafeAreaView className="flex-1 px-6">
        <Animated.View style={contentStyle}>
          <HeaderText title="Explore the world with" subtitle="Briskly" />

          <LocationInput
            isSearching={isSearching}
            onSearchOpen={handleSearchOpen}
            onSearchClose={handleSearchClose}
          />

          <DateInput />
          <TimeInput />
          <DiscoverButton onPress={() => router.push("/map-view")} />
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}
