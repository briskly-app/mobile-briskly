import { Colors } from "@/constants/theme";
import {
  formatLocalIsoDate,
  formatLongLocalDate,
  parseLocalIsoDate,
} from "@/lib/format/date";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useMemo, useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";

interface Props {
  value: string;
  onChange: (next: string) => void;
  min?: string;
}

export default function DateInput({ value, onChange, min }: Props) {
  const [showPicker, setShowPicker] = useState(false);
  const date = useMemo(() => parseLocalIsoDate(value), [value]);
  const minimumDate = useMemo(
    () => (min ? parseLocalIsoDate(min) : undefined),
    [min],
  );

  const handleChange = (_event: DateTimePickerEvent, selected?: Date) => {
    if (Platform.OS !== "ios") setShowPicker(false);
    if (!selected) return;
    let next = formatLocalIsoDate(selected);
    if (min && next < min) next = min;
    onChange(next);
  };

  return (
    <View className="mb-4">
      <TouchableOpacity
        className="flex-row items-center bg-white/85 rounded-full px-5 py-4"
        onPress={() => setShowPicker(true)}
        activeOpacity={0.8}
      >
        <MaterialIcons
          name="calendar-today"
          size={20}
          color={Colors.briskly.secondary}
        />
        <Text className="flex-1 ml-3 text-briskly-secondary text-base">
          {formatLongLocalDate(date)}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          minimumDate={minimumDate}
          onChange={handleChange}
        />
      )}
    </View>
  );
}
