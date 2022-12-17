import { StyleSheet } from "react-native";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../helpers/metrics";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    marginHorizontal: horizontalScale(30),
    marginTop: verticalScale(12),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: horizontalScale(368),
    height: verticalScale(40),
    paddingLeft: horizontalScale(12),
    borderRadius: moderateScale(15),
    backgroundColor: theme.colors.background,
    shadowColor: theme.colors.foreground,
    shadowOpacity: 0.16,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    elevation: 10,
  },
  searchBar__unclicked: {
    flexDirection: "row",
    width: "95%",
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: moderateScale(11),
    marginLeft: 10,
    width: "90%",
  },
});
