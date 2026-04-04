import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import LocationResultItem from "@/components/explore/location-result";
import { Colors } from "@/constants/theme";
import { LocationResultMocks } from "@/mocks/location-result-mocks";
import { LocationResultType } from "@/types/location-result-type";

interface Props {
  isSearching: boolean;
  onSearchOpen: () => void;
  onSearchClose: () => void;
}

export default function LocationInput({
  isSearching,
  onSearchOpen,
  onSearchClose,
}: Props) {
  const [selected, setSelected] = useState<LocationResultType>(
    LocationResultMocks[0],
  );
  const [query, setQuery] = useState("");
  const inputRef = useRef<TextInput>(null);

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
    Keyboard.dismiss();
    onSearchClose();
  };

  const showResults = query.length > 0;
  const displayValue = `${selected.city}, ${selected.stop}`;

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

      {showResults && (
        <Animated.View
          entering={FadeIn.duration(180)}
          exiting={FadeOut.duration(120)}
        >
          {LocationResultMocks.map((item, index) => (
            <LocationResultItem
              key={`${item.city}-${item.stop}`}
              {...item}
              isLast={index === LocationResultMocks.length - 1}
              onSelect={handleSelect}
            />
          ))}
        </Animated.View>
      )}

      {!showResults && (
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
          <Text className="text-briskly-foreground text-base mt-2 text-center">
            Start typing to search...
          </Text>
        </Animated.View>
      )}
    </View>
  );
}
