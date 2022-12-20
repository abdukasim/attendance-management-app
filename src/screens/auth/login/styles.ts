import { StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";

export const styles = StyleSheet.create({
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
});
