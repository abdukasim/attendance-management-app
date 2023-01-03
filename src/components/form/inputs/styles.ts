import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../../helpers/metrics";
import { theme } from "../../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  rightIcon: {
    right: 15,
    top: 55,
    position: "absolute",
    zIndex: 1,
  },
  label: {
    color: theme.colors.primary,
    ...theme.textVariants.body,
    textAlign: "left",
    marginBottom: verticalScale(8),
    marginLeft: horizontalScale(12),
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
});
