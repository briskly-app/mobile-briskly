import { Colors } from "@/constants/theme";
import {
  formatHm,
  formatLongLocalTime,
  parseHm,
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

export default function TimeInput({ value, onChange, min }: Props) {
  const [showPicker, setShowPicker] = useState(false);

  const time = useMemo(() => {
    const { hours, minutes } = parseHm(value);
    const d = new Date();
    d.setHours(hours, minutes, 0, 0);
    return d;
  }, [value]);

  const minimumDate = useMemo(() => {
    if (!min) return undefined;
    const { hours, minutes } = parseHm(min);
    const d = new Date(time);
    d.setHours(hours, minutes, 0, 0);
    return d;
  }, [min, time]);

  const handleChange = (_event: DateTimePickerEvent, selected?: Date) => {
    if (Platform.OS !== "ios") setShowPicker(false);
    if (!selected) return;
    let next = formatHm(selected);
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
          name="access-time"
          size={20}
          color={Colors.briskly.secondary}
        />
        <Text className="flex-1 ml-3 text-briskly-secondary text-base">
          {formatLongLocalTime(time)}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour
          display={Platform.OS === "ios" ? "spinner" : "default"}
          minimumDate={minimumDate}
          onChange={handleChange}
        />
      )}
    </View>
  );
}
