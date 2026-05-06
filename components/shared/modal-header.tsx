import { Text } from "react-native";

import { useAppTheme } from "@/hooks/use-app-theme";

interface Props {
  title: string;
}

export default function ModalHeader({ title }: Props) {
  const { colors } = useAppTheme();

  return (
    <Text
      className="text-lg font-semibold mb-4 text-center"
      style={{ color: colors.secondary }}
    >
      {title}
    </Text>
  );
}
