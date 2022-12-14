import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../helpers/metrics";

export const styles = StyleSheet.create({
  cardsContainer: {
    width: "100%",
    height: "auto",
    paddingHorizontal: horizontalScale(30),
    marginTop: verticalScale(20),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(17),
  },
  cardFlexStyles: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
