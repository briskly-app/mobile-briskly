import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="map-view" options={{ headerShown: false }} />
      <Stack.Screen
        name="destination-summary"
        options={{
          headerShown: false,
          presentation: "transparentModal",
          animation: "slide_from_bottom",
          gestureEnabled: true,
          gestureDirection: "vertical",
        }}
      />
      <Stack.Screen name="trip-summary" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="explore" options={{ headerShown: false }} />
    </Stack>
  );
}
