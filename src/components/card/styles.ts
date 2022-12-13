import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../helpers/metrics";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.spacing.xl,
    backgroundColor: theme.colors.background,
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
