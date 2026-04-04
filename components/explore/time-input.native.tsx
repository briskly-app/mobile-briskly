import { Colors } from "@/constants/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default function TimeInput() {
  const [time, setTime] = useState(() => {
    const d = new Date();
    d.setHours(17, 0, 0, 0);
    return d;
  });
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (_event: DateTimePickerEvent, selected?: Date) => {
    if (Platform.OS !== "ios") setShowPicker(false);
    if (selected) setTime(selected);
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
          {formatTime(time)}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleChange}
        />
      )}
    </View>
  );
}
