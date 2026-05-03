import { PLACEHOLDER_IMAGE_SOURCE } from "@/constants/global";
import { Image, ImageSource } from "expo-image";
import { View } from "react-native";

interface Props {
  image: ImageSource | undefined;
}

export default function HeroSection({ image }: Props) {
  return (
    <View className="w-full h-[280px]">
      <Image
        source={image ?? PLACEHOLDER_IMAGE_SOURCE}
        style={{ width: "100%", height: "100%" }}
        contentFit="cover"
        cachePolicy="memory-disk"
      />
    </View>
  );
}
