import { router, useLocalSearchParams } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import DestinationCarousel from "@/components/map-view/destination-carousel";
import MapBackground from "@/components/map-view/map-background";
import SearchBar from "@/components/map-view/search-bar";
import SearchEditModal from "@/components/map-view/search-edit-modal";
import { useDestinationsQuery } from "@/hooks/use-destinations-query";
import { useTripNextLegSearchParamsQuery } from "@/hooks/use-trip-next-leg-search-params-query";
import { NO_CONNECTIONS_FOR_TIME } from "@/lib/constants/messages";
import { normalizeTimeForSearch } from "@/lib/format/date";
import { ConnectionType } from "@/types/stop-type";

export default function MapViewScreen() {
  const queryClient = useQueryClient();
  const insets = useSafeAreaInsets();
  const [isLeavingScreen, setIsLeavingScreen] = useState(false);
  const params = useLocalSearchParams<{
    fromCity?: string;
    date?: string;
    time?: string;
    timezone?: string;
    waitingTime?: string;
    returnTarget?: string;
    tripSlug?: string;
  }>();

  const returnToTrip = params.returnTarget === "trip";
  const tripSlugForReturn = params.tripSlug
    ? String(params.tripSlug)
    : "";

  const nextLegQuery = useTripNextLegSearchParamsQuery(
    tripSlugForReturn || null,
  );
  const minDate = nextLegQuery.data?.date;
  const minTime = nextLegQuery.data?.time;

  const [editorVisible, setEditorVisible] = useState(false);

  const queryParams = useMemo(() => {
    if (
      !params.fromCity ||
      !params.date ||
      !params.time ||
      !params.timezone ||
      !params.waitingTime
    ) {
      return null;
    }
    return {
      fromCity: String(params.fromCity),
      date: String(params.date),
      time: String(params.time),
      timezone: String(params.timezone),
      waitingTime: String(params.waitingTime),
    };
  }, [
    params.date,
    params.fromCity,
    params.time,
    params.timezone,
    params.waitingTime,
  ]);

  const { data, isLoading, isError, isSuccess } =
    useDestinationsQuery(queryParams);
  const hasHandledFailureRef = useRef(false);

  useEffect(() => {
    if (!queryParams && !hasHandledFailureRef.current) {
      hasHandledFailureRef.current = true;
      setIsLeavingScreen(true);
      requestAnimationFrame(() => {
        router.replace("/explore");
      });
    }
  }, [queryParams]);

  useEffect(() => {
    if (isError && !hasHandledFailureRef.current) {
      hasHandledFailureRef.current = true;
      setIsLeavingScreen(true);
      requestAnimationFrame(() => {
        if (returnToTrip && tripSlugForReturn) {
          router.replace({
            pathname: "/trip-summary",
            params: { tripSlug: tripSlugForReturn, notice: "server" },
          });
          return;
        }
        router.replace({
          pathname: "/explore",
          params: { notice: "server" },
        });
      });
    }
  }, [isError, returnToTrip, tripSlugForReturn]);

  const connections = data?.connections ?? [];
  const origin = data?.origin ?? null;
  const [selectedConnectionId, setSelectedConnectionId] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (!isSuccess || connections.length === 0) return;
    setSelectedConnectionId(String(connections[0].id));
  }, [isSuccess, connections]);

  useEffect(() => {
    if (!isSuccess || connections.length > 0 || hasHandledFailureRef.current)
      return;
    hasHandledFailureRef.current = true;
    setIsLeavingScreen(true);
    requestAnimationFrame(() => {
      if (returnToTrip && tripSlugForReturn) {
        router.replace({
          pathname: "/trip-summary",
          params: { tripSlug: tripSlugForReturn, notice: "empty" },
        });
        return;
      }
      router.replace({
        pathname: "/explore",
        params: { notice: "empty" },
      });
    });
  }, [isSuccess, connections.length, returnToTrip, tripSlugForReturn]);

  if (isLeavingScreen) {
    return <View className="flex-1 bg-black" />;
  }

  const currentDate = origin?.searchDate ?? params.date ?? "";
  const currentTime = normalizeTimeForSearch(
    origin?.searchTime ?? params.time ?? "",
  );

  const canOpenEditor = !tripSlugForReturn || nextLegQuery.isFetched;

  const handleApplyEdit = ({
    date,
    time,
  }: {
    date: string;
    time: string;
  }) => {
    let nextDate = date;
    let nextTime = time;
    if (minDate && nextDate < minDate) nextDate = minDate;
    if (minTime && minDate && nextDate === minDate && nextTime < minTime) {
      nextTime = minTime;
    }
    setEditorVisible(false);
    if (nextDate === currentDate && nextTime === currentTime) return;
    router.setParams({ date: nextDate, time: nextTime });
  };

  return (
    <View className="flex-1">
      <MapBackground
        connections={connections}
        selectedConnectionId={selectedConnectionId}
        onConnectionSelect={setSelectedConnectionId}
        isLoading={isLoading}
      />

      <View style={{ paddingTop: insets.top + 12 }}>
        <SearchBar
          origin={origin}
          isLoading={isLoading}
          onPress={
            canOpenEditor ? () => setEditorVisible(true) : undefined
          }
        />
      </View>

      <SearchEditModal
        visible={editorVisible}
        initialDate={currentDate}
        initialTime={currentTime}
        minDate={minDate}
        minTime={minTime}
        onApply={handleApplyEdit}
        onCancel={() => setEditorVisible(false)}
      />

      <View
        className="absolute left-0 right-0 bottom-0"
        style={{ paddingBottom: insets.bottom + 8 }}
      >
        <DestinationCarousel
          connections={connections}
          selectedConnectionId={selectedConnectionId}
          onConnectionSelect={setSelectedConnectionId}
          onPress={(connection: ConnectionType) => {
            queryClient.setQueryData(["selectedDestinationConnection"], connection);
            router.push("/destination-summary");
          }}
          isLoading={isLoading}
          emptyMessage={NO_CONNECTIONS_FOR_TIME}
        />
      </View>
    </View>
  );
}
