import { Image } from "expo-image";
import { View } from "react-native";

interface Props {
  countryCode: string;
  size?: number;
}

export default function CountryFlag({ countryCode, size = 44 }: Props) {
  const code = countryCode.toLowerCase();
  const uri = `https://flagcdn.com/w80/${code}.png`;

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        overflow: "hidden",
        backgroundColor: "#F3F4F6",
      }}
    >
      <Image
        source={{ uri }}
        style={{ width: "100%", height: "100%" }}
        contentFit="cover"
        cachePolicy="memory-disk"
      />
    </View>
  );
}
