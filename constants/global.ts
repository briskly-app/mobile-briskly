import { Dimensions } from "react-native";

export const PLACEHOLDER_IMAGE_SOURCE = require("@/assets/images/placeholder.jpg");
export const SCREEN_H = Dimensions.get("window").height;
export const CENTERED_OFFSET = SCREEN_H * 0.25;

export const SPRING = {
  damping: 28,
  stiffness: 120,
  mass: 1.0,
};
