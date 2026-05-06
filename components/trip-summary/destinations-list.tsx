import { View } from "react-native";
import Animated from "react-native-reanimated";

import DestinationCard from "@/components/trip-summary/destination-card";
import { useAppTheme } from "@/hooks/use-app-theme";
import { useSkeletonShimmer } from "@/hooks/use-skeleton-shimmer";
import { DestinationType } from "@/types/destination-type";

interface Props {
  destinations: DestinationType[];
  loading?: boolean;
}

const SKELETON_COUNT = 3;

export default function DestinationsList({
  destinations,
  loading = false,
}: Props) {
  if (loading) {
    return (
      <View className="mb-4 gap-3">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <DestinationCardSkeleton key={`destination-skeleton-${i}`} />
        ))}
      </View>
    );
  }

  return (
    <View className="mb-4 gap-3">
      {destinations.map((dest) => (
        <DestinationCard key={dest.id} {...dest} />
      ))}
    </View>
  );
}

function DestinationCardSkeleton() {
  const { colors } = useAppTheme();
  const shimmerStyle = useSkeletonShimmer();

  return (
    <View
      className="flex-row items-center rounded-2xl mb-3 mx-5 border overflow-hidden"
      style={{
        backgroundColor: colors.cardBg,
        borderColor: colors.border,
        minHeight: 100,
      }}
    >
      <View className="flex-1 pr-3 pl-4 py-4 gap-2">
        <Animated.View
          className="h-4 rounded-full w-2/3"
          style={[{ backgroundColor: colors.border }, shimmerStyle]}
        />
        <Animated.View
          className="h-3 rounded-full w-1/2 mt-1"
          style={[{ backgroundColor: colors.border }, shimmerStyle]}
        />
        <Animated.View
          className="h-3 rounded-full w-3/5"
          style={[{ backgroundColor: colors.border }, shimmerStyle]}
        />
      </View>
      <Animated.View
        style={[
          {
            width: 180,
            alignSelf: "stretch",
            backgroundColor: colors.border,
          },
          shimmerStyle,
        ]}
      />
    </View>
  );
}
