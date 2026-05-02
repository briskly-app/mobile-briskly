import { router } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FooterStickyButton from "@/components/shared/footer-sticky-button";
import Header from "@/components/shared/header";
import SectionHeader from "@/components/shared/section-header";
import TimelineList from "@/components/shared/timeline-list";
import DestinationsList from "@/components/trip-summary/destinations-list";
import MapSummary from "@/components/trip-summary/map-summary";
import { useAppTheme } from "@/hooks/use-app-theme";
import { polandGermanyTrip } from "@/mocks/trip-summary-mocks";

export default function TripSummaryScreen() {
  const { colors } = useAppTheme();
  const trip = polandGermanyTrip;

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
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        <SectionHeader
          title={trip.title}
          subtitle={`${trip.startDate} – ${trip.endDate}`}
        />

        <DestinationsList destinations={trip.destinations} />

        <SectionHeader title="Take map with you..." center textSize="2xl" />
        <MapSummary destinations={trip.destinations} />

        <TimelineList
          title="Thank you for choosing Briskly "
          items={trip.stats.map((stat) => ({
            id: stat.id,
            icon: stat.icon,
            title: stat.label,
            subtitle: stat.value,
          }))}
        />
      </ScrollView>

      <FooterStickyButton
        icon="add"
        text="Save this trip"
        onPress={() => router.push("/")}
      />
    </SafeAreaView>
  );
}
