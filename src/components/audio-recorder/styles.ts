import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../helpers/metrics";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 29,
    paddingHorizontal: horizontalScale(-20),
    marginBottom: verticalScale(18),
  },
  recorders: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: horizontalScale(18),
    marginBottom: verticalScale(18),
  },
  recorderBtn: {
    justifyContent: "center",
    marginRight: 8,
  },
});
