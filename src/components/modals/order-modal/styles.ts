import { StyleSheet } from "react-native";
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
});
