import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import DestinationInfo from "@/components/destination-summary/destination-info";
import HeroSection from "@/components/destination-summary/hero-section";
import DarkmodeToggler from "@/components/shared/darkmode-toggler";
import FooterStickyButton from "@/components/shared/footer-sticky-button";
import SwipeToDismiss from "@/components/shared/swipe-to-dismiss";
import { useAddConnectionToTripMutation } from "@/hooks/use-add-connection-to-trip-mutation";
import { useAppTheme } from "@/hooks/use-app-theme";
import { SERVER_ERROR } from "@/lib/constants/messages";
import { formatDurationSeconds } from "@/lib/format/duration";
import { ConnectionType } from "@/types/stop-type";

export default function DestinationSummaryScreen() {
  const { colors } = useAppTheme();
  const queryClient = useQueryClient();
  const addMutation = useAddConnectionToTripMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const connection = queryClient.getQueryData<ConnectionType>([
    "selectedDestinationConnection",
  ]);

  useEffect(() => {
    if (!connection) {
      router.back();
    }
  }, [connection]);

  useEffect(() => {
    if (!errorMessage) return;
    const id = setTimeout(() => setErrorMessage(null), 6000);
    return () => clearTimeout(id);
  }, [errorMessage]);

  if (!connection) return null;
  if (!connection.destinationStop) return null;

  const destinationStop = connection.destinationStop;
  const footerText = `Add ${connection.departureTime} (${formatDurationSeconds(
    connection.durationInTravel,
  )})`;

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
        setErrorMessage(
          err instanceof Error ? err.message : SERVER_ERROR,
        );
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

          {/* <WhatToSeeSection categories={destination.whatToSee} />

          <TimelineList
            title="Stops On The Way"
            items={destination.stops}
            trailingIcon="schedule"
            trailingText={destination.totalDuration}
          /> */}
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
