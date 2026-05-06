import { View } from "react-native";
import Animated from "react-native-reanimated";

import { useSkeletonShimmer } from "@/hooks/use-skeleton-shimmer";

interface Props {
  width: number;
  surfaceColor: string;
  borderColor: string;
  blockColor: string;
}

export default function SkeletonDestinationCard({
  width,
  surfaceColor,
  borderColor,
  blockColor,
}: Props) {
  const shimmerStyle = useSkeletonShimmer();

  return (
    <View
      className="rounded-3xl overflow-hidden"
      style={{ width, borderWidth: 1, borderColor }}
    >
      <Animated.View
        className="h-[180px]"
        style={[{ backgroundColor: blockColor }, shimmerStyle]}
      />
      <View
        className="px-4 pt-3 pb-3.5"
        style={{ backgroundColor: surfaceColor }}
      >
        <Animated.View
          className="h-4 rounded-full mb-2 w-2/3"
          style={[{ backgroundColor: blockColor }, shimmerStyle]}
        />
        <Animated.View
          className="h-3 rounded-full mb-3 w-1/2"
          style={[{ backgroundColor: blockColor }, shimmerStyle]}
        />
        <Animated.View
          className="h-3 rounded-full w-4/5"
          style={[{ backgroundColor: blockColor }, shimmerStyle]}
        />
      </View>
    </View>
  );
}
