import { Text, View } from "react-native";
import Animated from "react-native-reanimated";

import TripCard from "@/components/trips/trip-card";
import { useAppTheme } from "@/hooks/use-app-theme";
import { useSkeletonShimmer } from "@/hooks/use-skeleton-shimmer";
import { TripItemType } from "@/types/trip-item-type";

interface Props {
  title: string;
  trips: TripItemType[];
  onTripPress?: (trip: TripItemType) => void;
  loading?: boolean;
}

const SKELETON_COUNT = 3;

export default function TripsSection({
  title,
  trips,
  onTripPress,
  loading = false,
}: Props) {
  if (loading) {
    return (
      <View className="mb-6">
        <Text className="text-2xl font-bold mb-4 text-briskly-primary dark:text-briskly-dark-primary">
          {title}
        </Text>
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <TripCardSkeleton key={`trip-skeleton-${i}`} />
        ))}
      </View>
    );
  }

  if (trips.length === 0) return null;

  return (
    <View className="mb-6">
      <Text className="text-2xl font-bold mb-4 text-briskly-primary dark:text-briskly-dark-primary">
        {title}
      </Text>
      {trips.map((trip) => (
        <TripCard key={trip.id} {...trip} onPress={() => onTripPress?.(trip)} />
      ))}
    </View>
  );
}

function TripCardSkeleton() {
  const { colors } = useAppTheme();
  const shimmerStyle = useSkeletonShimmer();

  return (
    <View
      className="flex-row items-center rounded-2xl px-4 py-3 mb-3 border"
      style={{
        backgroundColor: colors.cardBg,
        borderColor: colors.border,
      }}
    >
      <Animated.View
        style={[
          {
            width: 72,
            height: 72,
            borderRadius: 12,
            backgroundColor: colors.border,
          },
          shimmerStyle,
        ]}
      />
      <View className="flex-1 ml-4 gap-2">
        <Animated.View
          className="h-4 rounded-full w-3/4"
          style={[{ backgroundColor: colors.border }, shimmerStyle]}
        />
        <Animated.View
          className="h-3 rounded-full w-1/2"
          style={[{ backgroundColor: colors.border }, shimmerStyle]}
        />
      </View>
    </View>
  );
}
