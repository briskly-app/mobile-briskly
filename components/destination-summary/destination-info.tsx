import { Text, View } from "react-native";

import { useAppTheme } from "@/hooks/use-app-theme";

interface Props {
  city: string;
  region: string;
  address: string;
  descriptionParagraphs: string[];
}

export default function DestinationInfo({
  city,
  region,
  address,
  descriptionParagraphs,
}: Props) {
  const { colors } = useAppTheme();

  return (
    <View className="px-5 pt-7 pb-2">
      <Text
        className="text-3xl font-bold mb-3 leading-7 text-center"
        style={{ color: colors.secondary }}
      >
        {city} - {region}
      </Text>

      <Text
        className="text-lg font-medium mb-6 text-center"
        style={{ color: colors.secondary }}
      >
        {address}
      </Text>

      {descriptionParagraphs.map((paragraph, index) => (
        <Text
          key={index}
          className={`text-md leading-6 ${index < descriptionParagraphs.length - 1 ? "mb-4" : ""}`}
          style={{ color: colors.foreground }}
        >
          {paragraph}
        </Text>
      ))}
    </View>
  );
}
