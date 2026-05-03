import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect } from "react";
import { ScrollView, View } from "react-native";

import DestinationInfo from "@/components/destination-summary/destination-info";
import HeroSection from "@/components/destination-summary/hero-section";
import DarkmodeToggler from "@/components/shared/darkmode-toggler";
import FooterStickyButton from "@/components/shared/footer-sticky-button";
import SwipeToDismiss from "@/components/shared/swipe-to-dismiss";
import { useAppTheme } from "@/hooks/use-app-theme";
import { formatDurationSeconds } from "@/lib/format/duration";
import { ConnectionType } from "@/types/stop-type";

export default function DestinationSummaryScreen() {
  const { colors } = useAppTheme();
  const queryClient = useQueryClient();
  const connection = queryClient.getQueryData<ConnectionType>([
    "selectedDestinationConnection",
  ]);

  useEffect(() => {
    if (!connection) {
      router.back();
    }
  }, [connection]);

  if (!connection) return null;
  if (!connection.destinationStop) return null;

  const destinationStop = connection.destinationStop;
  const footerText = `Add ${connection.departureTime} (${formatDurationSeconds(
    connection.durationInTravel,
  )})`;

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

      <FooterStickyButton
        icon="add"
        text={footerText}
        onPress={() => router.push("/trip-summary")}
      />
    </SwipeToDismiss>
  );
}
