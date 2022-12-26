import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../../helpers/metrics";
import { theme } from "../../../styles/theme";

export const styles = StyleSheet.create({
  backdrop: {
    display: "flex",
    flex: 1,
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
    marginTop: verticalScale(72),
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
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
    borderColor: theme.colors.background,
    paddingVertical: verticalScale(16),
    paddingHorizontal: horizontalScale(28),
    marginBottom: verticalScale(12),
    color: theme.colors.foreground,
  },
  errorInput: {
    borderColor: "red",
    borderWidth: 1,
    marginBottom: verticalScale(6),
  },
  errorText: {
    fontSize: 10,
    color: "red",
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
