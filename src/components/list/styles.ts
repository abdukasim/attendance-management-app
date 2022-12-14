import { StyleSheet } from "react-native";
import { verticalScale } from "../../helpers/metrics";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    height: "100%",
    backgroundColor: theme.colors.primary,
    marginTop: -10,
    paddingTop: 32,
  },
  watermark: {
    position: "absolute",
    top: 25,
    left: 20,
  },
  cardFlexStyles: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
