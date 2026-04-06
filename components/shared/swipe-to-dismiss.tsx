import { router } from "expo-router";
import { useRef } from "react";
import { Animated, PanResponder, View } from "react-native";

interface Props {
  children: React.ReactNode;
  onDismiss?: () => void;
  style?: object;
}

export default function SwipeToDismiss({ children, onDismiss, style }: Props) {
  const translateY = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, { dy, dx }) =>
        dy > 6 && Math.abs(dy) > Math.abs(dx),
      onPanResponderMove: (_, { dy }) => {
        if (dy > 0) translateY.setValue(dy);
      },
      onPanResponderRelease: (_, { dy, vy }) => {
        if (dy > 100 || vy > 0.8) {
          Animated.timing(translateY, {
            toValue: 900,
            duration: 200,
            useNativeDriver: true,
          }).start(() => (onDismiss ?? router.back)());
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <Animated.View
      className="flex-1"
      style={[style, { transform: [{ translateY }] }]}
    >
      <View
        className="absolute top-0 left-0 right-0 h-36 items-center justify-center z-20"
        {...panResponder.panHandlers}
      >
        <View className="w-10 h-1 rounded-full bg-white/60" />
      </View>

      {children}
    </Animated.View>
  );
}
