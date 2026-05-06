import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

import { useAppTheme } from "@/hooks/use-app-theme";

interface Props {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export default function AddMoreButton({
  text,
  onPress,
  disabled = false,
  loading = false,
}: Props) {
  const { colors } = useAppTheme();
  const isBusy = loading || disabled;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isBusy}
      activeOpacity={0.85}
      className="mb-6 mx-auto w-full flex-row items-center justify-center gap-2"
    >
      {loading ? (
        <ActivityIndicator color={colors.foreground} />
      ) : (
        <MaterialIcons name="search" size={20} color={colors.foreground} />
      )}
      <Text
        className="text-lg font-semibold"
        style={{ color: colors.foreground }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
