import { StyleSheet } from "react-native";
import { theme } from "./theme";

export const shadowStyle = StyleSheet.create({
  shadow: {
    shadowColor: theme.colors.foreground,
    shadowOpacity: 0.16,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    elevation: 10,
  },
});
