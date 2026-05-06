import { Redirect, router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FooterStickyButton from "@/components/shared/footer-sticky-button";
import Header from "@/components/shared/header";
import TripsSection from "@/components/trips/trips-section";
import {
  TRIP_HAS_NO_CONNECTIONS,
  TRIP_LOAD_FAILED,
} from "@/lib/constants/messages";
import { clearActiveTripSlug } from "@/lib/storage/active-trip";
import { pastTrips, upcomingTrips } from "@/mocks/trip-mocks";

export default function IndexScreen() {
  const { notice } = useLocalSearchParams<{ notice?: string }>();
  const lastNoticeRef = useRef<string | null>(null);
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  useEffect(() => {
    clearActiveTripSlug();
  }, []);

  useEffect(() => {
    if (!notice || notice === lastNoticeRef.current) return;
    lastNoticeRef.current = notice;
    router.setParams({ notice: undefined });

    if (notice === "trip-failed") {
      setNoticeMessage(TRIP_LOAD_FAILED);
      return;
    }
    if (notice === "trip-empty") {
      setNoticeMessage(TRIP_HAS_NO_CONNECTIONS);
    }
  }, [notice]);

  useEffect(() => {
    if (!noticeMessage) return;
    const id = setTimeout(() => setNoticeMessage(null), 6000);
    return () => clearTimeout(id);
  }, [noticeMessage]);

  if (upcomingTrips.length === 0 && pastTrips.length === 0) {
    return <Redirect href="/explore" />;
  }

  return (
    <SafeAreaView className="flex-1 bg-briskly-backgroundPrimary dark:bg-briskly-dark-backgroundPrimary">
      <Header
        title="Your trips"
        onBackPress={() => router.back()}
        showThemeToggle
      />

      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <TripsSection
          title="Upcoming trips"
          trips={upcomingTrips}
          onTripPress={(trip) => console.log("Trip pressed:", trip.title)}
        />
        <TripsSection
          title="Past trips"
          trips={pastTrips}
          onTripPress={(trip) => console.log("Trip pressed:", trip.title)}
        />
      </ScrollView>

      {noticeMessage ? (
        <View
          pointerEvents="none"
          className="absolute left-10 right-10 bottom-28 bg-red-600 rounded-2xl px-4 py-3"
        >
          <Text className="text-base text-white text-center font-semibold">
            {noticeMessage}
          </Text>
        </View>
      ) : null}

      <FooterStickyButton
        icon="search"
        text="Discover locations"
        onPress={() => router.push("/explore")}
      />
    </SafeAreaView>
  );
}
