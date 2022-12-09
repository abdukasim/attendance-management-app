import { StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";

export const styles = StyleSheet.create({
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
  input: {
    padding: 15,
    paddingLeft: 28,
    paddingRight: 55,
    borderWidth: 1,
    borderColor: theme.colors.tertiary,
    borderStyle: "solid",
    borderRadius: 27,
    fontSize: 16,
    height: 60,
    marginVertical: 3,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 10,
    color: "red",
  },
  errorInput: {
    borderColor: "red",
    borderWidth: 1,
  },
});
