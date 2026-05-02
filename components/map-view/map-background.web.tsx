import { View } from "react-native";

import { ConnectionType } from "@/types/stop-type";

interface Props {
  connections: ConnectionType[];
  selectedConnectionId: string | null;
  onConnectionSelect: (id: string | null) => void;
}

export default function MapBackground(_props: Props) {
  return <View className="absolute inset-0 bg-slate-200" />;
}
