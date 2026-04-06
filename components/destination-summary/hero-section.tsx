import { Image, ImageSource } from "expo-image";
import { View } from "react-native";

interface Props {
  image: ImageSource;
}

export default function HeroSection({ image }: Props) {
  return (
    <View className="w-full h-[280px]">
      <Image
        source={image}
        style={{ width: "100%", height: "100%" }}
        contentFit="cover"
        cachePolicy="memory-disk"
      />
    </View>
  );
}
