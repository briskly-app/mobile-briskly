import { Colors } from "@/constants/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function toInputValue(d: Date) {
  return d.toISOString().split("T")[0];
}

interface Props {
  value: string;
  onChange: (next: string) => void;
}

export default function DateInput({ value, onChange }: Props) {
  const [showPicker, setShowPicker] = useState(false);
  const date = useMemo(() => {
    const parsed = new Date(`${value}T00:00:00`);
    return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val) onChange(val);
    setShowPicker(false);
  };

  return (
    <View className="mb-4">
      <TouchableOpacity
        className="flex-row items-center bg-white/85 rounded-full px-5 py-4"
        onPress={() => setShowPicker((v) => !v)}
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
        <input
          type="date"
          value={toInputValue(date)}
          onChange={handleChange}
          style={{
            marginTop: 8,
            padding: "10px 16px",
            borderRadius: 24,
            border: `1px solid ${Colors.briskly.secondary}`,
            fontSize: 16,
            width: "100%",
            boxSizing: "border-box",
          }}
        />
      )}
    </View>
  );
}
