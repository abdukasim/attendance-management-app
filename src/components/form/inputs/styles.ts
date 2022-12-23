import { StyleSheet } from "react-native";
import { verticalScale } from "../../../helpers/metrics";
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
    fontSize: 15,
    fontWeight: "400",
    textAlign: "left",
    marginBottom: 18,
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
