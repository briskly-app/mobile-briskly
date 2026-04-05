import { router } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/components/shared/header";
import FooterStickyButton from "@/components/trips/footer-sticky-button";
import TripsSection from "@/components/trips/trips-section";
import { pastTrips, upcomingTrips } from "@/mocks/trip-mocks";

export default function TripsScreen() {
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

      <FooterStickyButton
        text="Find more"
        onPress={() => router.push("/explore")}
      />
    </SafeAreaView>
  );
}
