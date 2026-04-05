import { Text, View } from "react-native";

import TripCard from "@/components/trips/trip-card";
import { useAppTheme } from "@/hooks/use-app-theme";
import { TripItemType } from "@/types/trip-item-type";

interface Props {
  title: string;
  trips: TripItemType[];
  onTripPress?: (trip: TripItemType) => void;
}

export default function TripsSection({ title, trips, onTripPress }: Props) {
  const { colors } = useAppTheme();

  if (trips.length === 0) return null;

  return (
    <View className="mb-6">
      <Text className="text-2xl font-bold mb-4 text-briskly-secondary dark:text-briskly-dark-secondary">
        {title}
      </Text>
      {trips.map((trip) => (
        <TripCard key={trip.id} {...trip} onPress={() => onTripPress?.(trip)} />
      ))}
    </View>
  );
}
