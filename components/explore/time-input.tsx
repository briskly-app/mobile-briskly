import { Colors } from "@/constants/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function toInputValue(d: Date) {
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

interface Props {
  value: string;
  onChange: (next: string) => void;
}

export default function TimeInput({ value, onChange }: Props) {
  const [showPicker, setShowPicker] = useState(false);
  const time = useMemo(() => {
    const [h, m] = value.split(":").map(Number);
    const d = new Date();
    d.setHours(
      Number.isFinite(h) ? h : 17,
      Number.isFinite(m) ? m : 0,
      0,
      0,
    );
    return d;
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
          name="access-time"
          size={20}
          color={Colors.briskly.secondary}
        />
        <Text className="flex-1 ml-3 text-briskly-secondary text-base">
          {formatTime(time)}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <input
          type="time"
          value={toInputValue(time)}
          onChange={handleChange}
          style={{
            marginTop: 8,
            padding: "10px 16px",
            borderRadius: 24,
            border: `1px solid ${Colors.briskly.foreground}`,
            fontSize: 16,
            width: "100%",
            boxSizing: "border-box",
          }}
        />
      )}
    </View>
  );
}
