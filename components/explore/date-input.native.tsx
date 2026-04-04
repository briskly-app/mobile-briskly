import { Colors } from "@/constants/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function DateInput() {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (_event: DateTimePickerEvent, selected?: Date) => {
    if (Platform.OS !== "ios") setShowPicker(false);
    if (selected) setDate(selected);
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
          {formatDate(date)}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleChange}
        />
      )}
    </View>
  );
}
