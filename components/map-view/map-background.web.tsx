import { View } from "react-native";

import { ConnectionType } from "@/types/stop-type";

interface Props {
  connections: ConnectionType[];
  selectedConnectionId: string | null;
  onConnectionSelect: (id: string | null) => void;
  isLoading?: boolean;
}

export default function MapBackground({ isLoading = false }: Props) {
  return (
    <View
      className="absolute inset-0"
      style={{ backgroundColor: isLoading ? "#cbd5e1" : "#94a3b8" }}
    />
  );
}
