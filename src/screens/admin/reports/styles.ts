import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../../helpers/metrics";
import { shadowStyle } from "../../../styles/shadow";
import { theme } from "../../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    paddingHorizontal: horizontalScale(30),
  },
  selectors: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: verticalScale(38),
    marginBottom: verticalScale(44),
  },
  selector: { width: horizontalScale(165) },
  pickerInput: {
    // width: "100%",
    backgroundColor: theme.colors.background,
    ...shadowStyle.shadow,
    borderRadius: 15,
    borderColor: theme.colors.background,
    paddingVertical: verticalScale(16),
    paddingHorizontal: horizontalScale(28),
    marginBottom: verticalScale(12),
    color: theme.colors.foreground,
  },

  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(26),
  },
  cardFlexStyles: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  tableHeader: { flexDirection: "row", marginBottom: 12 },
  tableSeparator: {
    borderBottomColor: theme.colors.tertiary,
    borderBottomWidth: 1,
    marginBottom: 6,
  },
  tableBody: {
    flexDirection: "row",
    marginBottom: 8,
  },
});
