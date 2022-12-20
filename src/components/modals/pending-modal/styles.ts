import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../../helpers/metrics";
import { theme } from "../../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    zIndex: 20,
  },
  backdrop: {
    display: "flex",
    position: "absolute",
    backgroundColor: theme.colors.foreground,
    opacity: 0.2,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    height: "200%",
    width: "100%",
  },
  card: {
    zIndex: 50,
    justifyContent: "center",
  },
  input: {
    width: "100%",
    backgroundColor: theme.colors.background,
    shadowColor: theme.colors.foreground,
    shadowOpacity: 0.16,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    elevation: 10,
    borderRadius: 24,
    paddingVertical: verticalScale(16),
    paddingHorizontal: horizontalScale(28),
  },
});
