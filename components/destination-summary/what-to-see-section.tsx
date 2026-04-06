import { Text, View } from "react-native";

import { useAppTheme } from "@/hooks/use-app-theme";
import { WhatToSeeCategory } from "@/types/destination-summary-type";

import WhatToSeeItem from "./what-to-see-item";

interface Props {
  categories: WhatToSeeCategory[];
}

export default function WhatToSeeSection({ categories }: Props) {
  const { colors } = useAppTheme();

  return (
    <View className="py-6">
      <Text
        className="text-2xl font-bold mb-4 px-4"
        style={{ color: colors.secondary }}
      >
        What to see
      </Text>

      <View className="overflow-hidden px-2">
        {categories.map((cat, index) => (
          <WhatToSeeItem
            key={cat.id}
            category={cat}
            isLast={index === categories.length - 1}
          />
        ))}
      </View>
    </View>
  );
}
