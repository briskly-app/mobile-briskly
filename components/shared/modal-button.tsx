import { Text, TouchableOpacity } from "react-native";

import { useAppTheme } from "@/hooks/use-app-theme";

type Variant = "primary" | "secondary";

interface Props {
  label: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
}

export default function ModalButton({
  label,
  onPress,
  variant = "primary",
  disabled = false,
}: Props) {
  const { colors } = useAppTheme();
  const isPrimary = variant === "primary";

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
      className="flex-1 rounded-full py-3 items-center"
      style={{
        backgroundColor: isPrimary ? colors.primary : colors.surface,
        borderWidth: isPrimary ? 0 : 1,
        borderColor: colors.border,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <Text
        className="text-base font-semibold"
        style={{ color: isPrimary ? colors.surface : colors.secondary }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
