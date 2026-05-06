import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import DestinationInfo from "@/components/destination-summary/destination-info";
import HeroSection from "@/components/destination-summary/hero-section";
import DarkmodeToggler from "@/components/shared/darkmode-toggler";
import FooterStickyButton from "@/components/shared/footer-sticky-button";
import SwipeToDismiss from "@/components/shared/swipe-to-dismiss";
import TimelineList from "@/components/shared/timeline-list";
import { useAddConnectionToTripMutation } from "@/hooks/use-add-connection-to-trip-mutation";
import { useAppTheme } from "@/hooks/use-app-theme";
import { useTripConnectionsQuery } from "@/hooks/use-trip-connections-query";
import { SERVER_ERROR } from "@/lib/constants/messages";
import { formatDurationSeconds } from "@/lib/format/duration";
import {
  apiTripConnectionToLeg,
  buildRouteTimeline,
  computeTotalRouteDurationSeconds,
  connectionToLeg,
  sortLegsChronologically,
  TripLeg,
} from "@/lib/api/mappers/trip-route";
import { getActiveTripSlug } from "@/lib/storage/active-trip";
import { ConnectionType } from "@/types/stop-type";

export default function DestinationSummaryScreen() {
  const { colors } = useAppTheme();
  const queryClient = useQueryClient();
  const addMutation = useAddConnectionToTripMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [slugChecked, setSlugChecked] = useState(false);

  const connection = queryClient.getQueryData<ConnectionType>([
    "selectedDestinationConnection",
  ]);

  useEffect(() => {
    if (!connection) {
      router.back();
    }
  }, [connection]);

  useEffect(() => {
    getActiveTripSlug().then((slug) => {
      setActiveSlug(slug);
      setSlugChecked(true);
    });
  }, []);

  useEffect(() => {
    if (!errorMessage) return;
    const id = setTimeout(() => setErrorMessage(null), 6000);
    return () => clearTimeout(id);
  }, [errorMessage]);

  const tripConnectionsQuery = useTripConnectionsQuery(activeSlug);

  const legs = useMemo<TripLeg[]>(() => {
    if (!connection) return [];
    const currentLeg = connectionToLeg(connection);
    const existingLegs = (tripConnectionsQuery.data ?? [])
      .map(apiTripConnectionToLeg)
      .filter((leg): leg is TripLeg => leg !== null);
    return sortLegsChronologically([...existingLegs, currentLeg]);
  }, [connection, tripConnectionsQuery.data]);

  const timelineItems = useMemo(() => buildRouteTimeline(legs), [legs]);
  const totalDurationSeconds = useMemo(
    () => computeTotalRouteDurationSeconds(legs),
    [legs],
  );

  if (!connection) return null;
  if (!connection.destinationStop) return null;

  const destinationStop = connection.destinationStop;
  const footerText = `Add ${connection.departureTime} (${formatDurationSeconds(
    connection.durationInTravel,
  )})`;

  const isLoadingTimeline =
    !slugChecked || (Boolean(activeSlug) && tripConnectionsQuery.isPending);
  const showTimeline = !tripConnectionsQuery.isError;

  const handleAddToTrip = () => {
    setErrorMessage(null);
    addMutation.mutate(connection, {
      onSuccess: ({ slug }) => {
        router.push({
          pathname: "/trip-summary",
          params: { tripSlug: slug },
        });
      },
      onError: (err) => {
        setErrorMessage(err instanceof Error ? err.message : SERVER_ERROR);
      },
    });
  };

  return (
    <SwipeToDismiss style={{ backgroundColor: colors.backgroundPrimary }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        <HeroSection image={destinationStop.thumbnailUrl} />

        <View
          className="-mt-7 rounded-t-[28px]"
          style={{ backgroundColor: colors.backgroundPrimary }}
        >
          <DestinationInfo
            city={destinationStop.cityName}
            region={destinationStop.region ?? ""}
            country={destinationStop.countryName}
            address={destinationStop.name}
            descriptionParagraphs={destinationStop.descriptionParagraphs ?? []}
          />

          {showTimeline && (
            <TimelineList
              title="Stops On The Way"
              items={timelineItems}
              trailingIcon="schedule"
              trailingText={
                totalDurationSeconds > 0
                  ? formatDurationSeconds(totalDurationSeconds)
                  : undefined
              }
              loading={isLoadingTimeline}
            />
          )}
        </View>
      </ScrollView>

      <DarkmodeToggler isTransparent={true} />

      {errorMessage ? (
        <View
          pointerEvents="none"
          className="absolute left-10 right-10 bottom-28 bg-red-600 rounded-2xl px-4 py-3"
        >
          <Text className="text-base text-white text-center font-semibold">
            {errorMessage}
          </Text>
        </View>
      ) : null}

      <FooterStickyButton
        icon="add"
        text={footerText}
        onPress={handleAddToTrip}
        loading={addMutation.isPending}
        disabled={addMutation.isPending}
      />
    </SwipeToDismiss>
  );
}
