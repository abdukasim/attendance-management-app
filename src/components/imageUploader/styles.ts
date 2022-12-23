import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../helpers/metrics";

export const styles = StyleSheet.create({
  imageContainer: {
    elevation: 2,
    height: horizontalScale(174),
    width: "100%",
    backgroundColor: "#efefef",
    position: "relative",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
  },
  uploadBtnContainer: {
    opacity: 0.9,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "lightgrey",
    width: "100%",
    height: "40%",
    borderRadius: 11,
    display: "flex",
    justifyContent: "center",
  },
  uploadBtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
});
