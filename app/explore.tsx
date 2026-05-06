import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Platform, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import DiscoverButton from "@/components/explore/discover-button";
import HeaderText from "@/components/explore/header-text";
import LocationInput from "@/components/explore/location-input";
import VideoBackground from "@/components/explore/video-background";
import DateInput from "@/components/shared/date-input";
import TimeInput from "@/components/shared/time-input";
import { CENTERED_OFFSET, SPRING } from "@/constants/global";
import {
  NO_CONNECTIONS_FOR_TIME,
  SERVER_ERROR,
} from "@/lib/constants/messages";
import { clearActiveTripSlug } from "@/lib/storage/active-trip";
import { LocationResultType } from "@/types/location-result-type";

export default function ExploreScreen() {
  const { notice } = useLocalSearchParams<{ notice?: string }>();
  const lastNoticeRef = useRef<string | null>(null);
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedLocation, setSelectedLocation] =
    useState<LocationResultType | null>(null);
  const [searchDate, setSearchDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [searchTime, setSearchTime] = useState("18:00");
  const offsetY = useSharedValue(CENTERED_OFFSET);
  const timezone = "Europe/Warsaw";

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

  const handleDiscover = () => {
    if (!selectedLocation?.id) return;

    router.push({
      pathname: "/map-view",
      params: {
        fromCity: selectedLocation.id,
        date: searchDate,
        time: searchTime,
        timezone,
        waitingTime: "12000",
      },
    });
  };

  useEffect(() => {
    clearActiveTripSlug();
  }, []);

  useEffect(() => {
    if (!notice || notice === lastNoticeRef.current) return;
    lastNoticeRef.current = notice;
    router.setParams({ notice: undefined });

    if (notice === "server") {
      setNoticeMessage(SERVER_ERROR);
      return;
    }
    if (notice === "empty") {
      setNoticeMessage(NO_CONNECTIONS_FOR_TIME);
    }
  }, [notice]);

  useEffect(() => {
    if (!noticeMessage) return;
    const id = setTimeout(() => setNoticeMessage(null), 6000);
    return () => clearTimeout(id);
  }, [noticeMessage]);

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
            onLocationSelect={setSelectedLocation}
          />

          <DateInput value={searchDate} onChange={setSearchDate} />
          <TimeInput value={searchTime} onChange={setSearchTime} />
          <DiscoverButton
            onPress={handleDiscover}
            disabled={!selectedLocation?.id}
          />
        </Animated.View>
      </SafeAreaView>

      {noticeMessage ? (
        <View
          pointerEvents="none"
          className="absolute left-10 right-10 bottom-8 bg-red-600 rounded-2xl px-4 py-3"
        >
          <Text className="text-base text-white text-center font-semibold">
            {noticeMessage}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
