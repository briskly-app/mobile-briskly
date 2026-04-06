import { router } from "expo-router";
import { ScrollView, View } from "react-native";

import DestinationInfo from "@/components/destination-summary/destination-info";
import HeroSection from "@/components/destination-summary/hero-section";
import WhatToSeeSection from "@/components/destination-summary/what-to-see-section";
import DarkmodeToggler from "@/components/shared/darkmode-toggler";
import FooterStickyButton from "@/components/shared/footer-sticky-button";
import TimelineList from "@/components/shared/timeline-list";
import { useAppTheme } from "@/hooks/use-app-theme";
import { szczecinSummary } from "@/mocks/destination-summary-mocks";

export default function DestinationSummaryScreen() {
  const { colors } = useAppTheme();
  const destination = szczecinSummary;

  return (
    <View
      className="flex-1"
      style={{ backgroundColor: colors.backgroundPrimary }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        <HeroSection image={destination.image} />

        <View
          className="-mt-7 rounded-t-[28px]"
          style={{ backgroundColor: colors.backgroundPrimary }}
        >
          <DestinationInfo
            city={destination.city}
            region={destination.region}
            address={destination.address}
            descriptionParagraphs={destination.descriptionParagraphs}
          />

          <WhatToSeeSection categories={destination.whatToSee} />

          <TimelineList
            title="Stops On The Way"
            items={destination.stops}
            trailingIcon="schedule"
            trailingText={destination.totalDuration}
          />
        </View>
      </ScrollView>

      <DarkmodeToggler isTransparent={true} />

      <FooterStickyButton
        icon="add"
        text={`Add ${destination.departureTime} (${destination.totalDuration})`}
        onPress={() => router.push("/trip-summary")}
      />
    </View>
  );
}
