import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../helpers/metrics";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  imageContainer: {
    elevation: 2,
    height: horizontalScale(174),
    width: "100%",
    backgroundColor: "#efefef",
    position: "relative",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 10,
  },
  imageContainerError: {
    elevation: 2,
    height: horizontalScale(174),
    width: "100%",
    backgroundColor: "#efefef",
    position: "relative",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 10,
    borderWidth: 2,
    borderColor: theme.colors.failure,
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
