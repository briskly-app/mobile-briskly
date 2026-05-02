import CountryFlag from "@/components/shared/country-flag";
import { LocationResultType } from "@/types/location-result-type";
import { Text, TouchableOpacity, View } from "react-native";

interface Props extends LocationResultType {
  onSelect: (result: LocationResultType) => void;
  isLast: boolean;
}

export default function LocationResultItem({
  id,
  name,
  regionName,
  countryName,
  countryCode,
  isLast,
  onSelect,
}: Props) {
  return (
    <>
      <TouchableOpacity
        className="flex-row items-center px-5 py-4"
        activeOpacity={0.7}
        onPress={() =>
          onSelect({ id, name, regionName, countryName, countryCode })
        }
      >
        <CountryFlag countryCode={countryCode} size={44} />

        <View className="flex-1 ml-4">
          <View className="flex-row items-center gap-1">
            <Text className="text-briskly-secondary font-semibold text-sm">
              {name},
            </Text>
            <Text className="text-briskly-secondary text-sm">{regionName}</Text>
          </View>
          <Text className="text-briskly-foreground text-xs mt-0.5">
            {countryName}
          </Text>
        </View>
      </TouchableOpacity>

      {!isLast && <View className="h-px bg-gray-100 mx-5" />}
    </>
  );
}
