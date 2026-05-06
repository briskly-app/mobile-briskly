import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FooterStickyButton from "@/components/shared/footer-sticky-button";
import Header from "@/components/shared/header";
import SectionHeader from "@/components/shared/section-header";
import TimelineList from "@/components/shared/timeline-list";
import AddMoreButton from "@/components/trip-summary/add-more-button";
import DestinationsList from "@/components/trip-summary/destinations-list";
import MapSummary from "@/components/trip-summary/map-summary";
import { useAppTheme } from "@/hooks/use-app-theme";
import { useTripSummaryQuery } from "@/hooks/use-trip-summary-query";
import {
  NO_CONNECTIONS_FOR_TIME,
  SERVER_ERROR,
} from "@/lib/constants/messages";
import {
  getActiveTripSlug,
  setActiveTripSlug,
} from "@/lib/storage/active-trip";

const DEFAULT_WAITING_MS = "12000";

export default function TripSummaryScreen() {
  const { colors } = useAppTheme();
  const { tripSlug: routeSlug, notice } = useLocalSearchParams<{
    tripSlug?: string;
    notice?: string;
  }>();
  const lastNoticeRef = useRef<string | null>(null);
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);
  const [storageSlug, setStorageSlug] = useState<string | null>(null);
  const [storageChecked, setStorageChecked] = useState(false);
  const [isLeavingScreen, setIsLeavingScreen] = useState(false);
  const hasHandledFailureRef = useRef(false);

  useEffect(() => {
    const trimmed = routeSlug?.trim();
    if (trimmed) {
      setActiveTripSlug(trimmed);
      setStorageChecked(true);
      return;
    }
    getActiveTripSlug().then((slug) => {
      setStorageSlug(slug);
      setStorageChecked(true);
    });
  }, [routeSlug]);

  const tripSlug = routeSlug?.trim() || storageSlug?.trim() || null;
  const tripQuery = useTripSummaryQuery(tripSlug);

  const trip = tripQuery.data?.summary ?? null;
  const nextLeg = tripQuery.data?.nextLeg ?? null;
  const connectionsCount = tripQuery.data?.connectionsCount ?? 0;

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

  useEffect(() => {
    if (hasHandledFailureRef.current) return;
    if (!storageChecked) return;
    if (tripSlug) return;
    hasHandledFailureRef.current = true;
    setIsLeavingScreen(true);
    requestAnimationFrame(() => {
      router.replace({
        pathname: "/",
        params: { notice: "trip-failed" },
      });
    });
  }, [storageChecked, tripSlug]);

  useEffect(() => {
    if (hasHandledFailureRef.current) return;
    if (!tripQuery.isError) return;
    hasHandledFailureRef.current = true;
    setIsLeavingScreen(true);
    requestAnimationFrame(() => {
      router.replace({
        pathname: "/",
        params: { notice: "trip-failed" },
      });
    });
  }, [tripQuery.isError]);

  useEffect(() => {
    if (hasHandledFailureRef.current) return;
    if (!tripQuery.isSuccess) return;
    if (connectionsCount > 0) return;
    hasHandledFailureRef.current = true;
    setIsLeavingScreen(true);
    requestAnimationFrame(() => {
      router.replace({
        pathname: "/",
        params: { notice: "trip-empty" },
      });
    });
  }, [tripQuery.isSuccess, connectionsCount]);

  const isLoadingTrip = !trip || connectionsCount === 0;
  const addMoreDisabled =
    !tripSlug ||
    !nextLeg ||
    tripQuery.isFetching ||
    tripQuery.isPending ||
    tripQuery.isError;

  const handleDiscoverMore = () => {
    if (!tripSlug || !nextLeg) return;
    router.push({
      pathname: "/map-view",
      params: {
        fromCity: nextLeg.fromCity,
        date: nextLeg.date,
        time: nextLeg.time,
        timezone: nextLeg.timezone,
        waitingTime: DEFAULT_WAITING_MS,
        returnTarget: "trip",
        tripSlug,
      },
    });
  };

  if (isLeavingScreen) {
    return (
      <View
        className="flex-1"
        style={{ backgroundColor: colors.backgroundPrimary }}
      />
    );
  }

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: colors.backgroundPrimary }}
    >
      <Header
        title="Trip Summary "
        onBackPress={() => router.back()}
        showThemeToggle
      />

      <ScrollView
        key={tripSlug ?? "preview"}
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        <SectionHeader
          title={trip?.title ?? ""}
          subtitle={
            trip?.startDate && trip?.endDate
              ? `${trip.startDate} – ${trip.endDate}`
              : trip?.startDate || trip?.endDate || ""
          }
        />

        <DestinationsList
          destinations={trip?.destinations ?? []}
          loading={isLoadingTrip}
        />

        {!isLoadingTrip && (
          <AddMoreButton
            text="Discover more destinations"
            onPress={handleDiscoverMore}
            disabled={addMoreDisabled}
            loading={tripQuery.isFetching || tripQuery.isPending}
          />
        )}

        <SectionHeader title="Take map with you..." center textSize="2xl" />
        <MapSummary
          destinations={trip?.destinations ?? []}
          loading={isLoadingTrip}
        />

        <TimelineList
          title="Thank you for choosing Briskly "
          items={
            trip?.stats.map((stat) => ({
              id: stat.id,
              icon: stat.icon,
              title: stat.label,
              subtitle: stat.value,
            })) ?? []
          }
          loading={isLoadingTrip}
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
        icon="add"
        text="Save this trip"
        onPress={() => router.push("/")}
      />
    </SafeAreaView>
  );
}
