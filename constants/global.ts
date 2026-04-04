import { Dimensions } from "react-native";

export const SCREEN_H = Dimensions.get("window").height;
export const CENTERED_OFFSET = SCREEN_H * 0.25;

export const SPRING = {
  damping: 28,
  stiffness: 120,
  mass: 1.0,
};
