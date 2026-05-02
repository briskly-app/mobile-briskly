import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import LocationResultItem from "@/components/explore/location-result";
import { Colors } from "@/constants/theme";
import { useLocationSearchQuery } from "@/hooks/use-location-search-query";
import { LOCATION_PLACEHOLDER, SERVER_ERROR } from "@/lib/constants/messages";
import { LocationResultType } from "@/types/location-result-type";

interface Props {
  isSearching: boolean;
  onSearchOpen: () => void;
  onSearchClose: () => void;
  onLocationSelect?: (location: LocationResultType | null) => void;
}

const emptySelection: LocationResultType = {
  id: "",
  countryCode: "",
  name: "",
  regionName: "",
  countryName: "",
};

export default function LocationInput({
  isSearching,
  onSearchOpen,
  onSearchClose,
  onLocationSelect,
}: Props) {
  const [selected, setSelected] = useState<LocationResultType>(emptySelection);
  const [query, setQuery] = useState("");
  const inputRef = useRef<TextInput>(null);

  const trimmedQuery = query.trim();
  const showSearchPanel = trimmedQuery.length >= 3;

  const { data, isFetching, isError } = useLocationSearchQuery(query);

  useEffect(() => {
    if (isSearching) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearching]);

  const handleClose = () => {
    Keyboard.dismiss();
    onSearchClose();
  };

  const handleSelect = (result: LocationResultType) => {
    setSelected(result);
    onLocationSelect?.(result);
    Keyboard.dismiss();
    onSearchClose();
  };

  const displayValue =
    selected.name || selected.regionName || selected.countryName
      ? `${selected.name}, ${selected.regionName}, ${selected.countryName}`
      : "Search cities";

  if (!isSearching) {
    return (
      <TouchableOpacity
        className="flex-row items-center bg-white/85 rounded-full px-5 py-4 mb-4"
        onPress={onSearchOpen}
        activeOpacity={0.8}
      >
        <MaterialIcons
          name="search"
          size={22}
          color={Colors.briskly.secondary}
        />
        <Text
          className="flex-1 ml-3 text-briskly-secondary text-base"
          numberOfLines={1}
        >
          {displayValue}
        </Text>
      </TouchableOpacity>
    );
  }

  const results = data ?? [];

  return (
    <View className="bg-white rounded-3xl mb-4 overflow-hidden">
      <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
        <TouchableOpacity
          onPress={handleClose}
          className="p-1 mr-2"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <MaterialIcons
            name="arrow-back"
            size={22}
            color={Colors.briskly.secondary}
          />
        </TouchableOpacity>

        <TextInput
          ref={inputRef}
          className="flex-1 text-briskly-secondary text-base py-1"
          value={query}
          onChangeText={setQuery}
          placeholder="Search city or stop..."
          placeholderTextColor={Colors.briskly.foreground}
          returnKeyType="search"
        />

        {showSearchPanel && isFetching && results.length > 0 ? (
          <ActivityIndicator
            size="small"
            color={Colors.briskly.secondary}
            style={{ marginLeft: 8 }}
          />
        ) : null}

        {query.length > 0 && (
          <TouchableOpacity
            onPress={() => setQuery("")}
            className="p-1 ml-2"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <MaterialIcons
              name="close"
              size={20}
              color={Colors.briskly.foreground}
            />
          </TouchableOpacity>
        )}
      </View>

      {showSearchPanel && (
        <Animated.View
          entering={FadeIn.duration(180)}
          exiting={FadeOut.duration(120)}
        >
          {isError ? (
            <View className="px-5 py-6">
              <Text className="text-briskly-foreground text-sm text-center">
                {SERVER_ERROR}
              </Text>
            </View>
          ) : isFetching && results.length === 0 ? (
            <View className="py-8 items-center justify-center">
              <ActivityIndicator
                size="small"
                color={Colors.briskly.secondary}
              />
            </View>
          ) : results.length === 0 ? (
            <View className="px-5 py-6">
              <Text className="text-briskly-foreground text-sm text-center">
                No results for “{trimmedQuery}”.
              </Text>
            </View>
          ) : (
            results.map((item, index) => (
              <LocationResultItem
                key={item.id}
                {...item}
                isLast={index === results.length - 1}
                onSelect={handleSelect}
              />
            ))
          )}
        </Animated.View>
      )}

      {!showSearchPanel && (
        <Animated.View
          entering={FadeIn.duration(180)}
          exiting={FadeOut.duration(120)}
          style={{ width: "100%", paddingVertical: 24 }}
        >
          <MaterialIcons
            name="search"
            size={32}
            color={Colors.briskly.foreground}
            style={{ alignSelf: "center" }}
          />
          <Text className="text-briskly-foreground text-base mt-2 text-center px-6">
            {LOCATION_PLACEHOLDER}
          </Text>
        </Animated.View>
      )}
    </View>
  );
}
