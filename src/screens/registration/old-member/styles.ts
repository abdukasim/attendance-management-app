import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../../helpers/metrics";
import { shadowStyle } from "../../../styles/shadow";
import { theme } from "../../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    marginTop: verticalScale(25),
    marginBottom: verticalScale(100),
    paddingHorizontal: horizontalScale(40),
  },
  input: {
    width: "100%",
    backgroundColor: theme.colors.background,
    ...shadowStyle.shadow,
    borderRadius: 24,
    borderColor: theme.colors.background,
    paddingVertical: verticalScale(16),
    paddingHorizontal: horizontalScale(28),
    marginBottom: verticalScale(12),
    color: theme.colors.foreground,
  },
  errorText: {
    fontSize: 10,
    color: "red",
  },
  errorInput: {
    borderColor: "red",
    borderWidth: 1,
    marginBottom: verticalScale(6),
  },
  childrenBtnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  childrenBtn: {
    justifyContent: "center",
  },
});
