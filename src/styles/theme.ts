import { moderateScale } from "../helpers/metrics";

const palette = {
  blue: "#0B77C2",
  yellow: "#FFF38D",
  green: "#10B981",
  red: "#EF4444",
  black: "#000000",
  white: "#FFFFFF",
  gray: "#EBEBEB",
};

export const theme = {
  colors: {
    background: palette.white,
    foreground: palette.black,
    primary: palette.blue,
    secondary: palette.yellow,
    tertiary: palette.gray,
    success: palette.green,
    failure: palette.red,
  },
  spacing: {
    sm: 4,
    xs: 8,
    md: 12,
    lg: 16,
    xl: 20,
    "2xl": 40,
    "3xl": 48,
  },
  textVariants: {
    title: {
      fontFamily: "Articulat CF",
      fontWeight: "700",
      fontSize: moderateScale(36),
    },
    subtitle: {
      fontFamily: "Articulat CF",
      fontWeight: "700",
      fontSize: moderateScale(16),
    },
    headerLg: {
      fontFamily: "Articulat CF",
      fontWeight: "600",
      fontSize: moderateScale(24),
    },
    headerMd: {
      fontFamily: "Articulat CF",
      fontWeight: "600",
      fontSize: moderateScale(16),
    },
    headerSm: {
      fontFamily: "Articulat CF",
      fontWeight: "500",
      fontSize: moderateScale(12),
    },
    body: {
      fontFamily: "Articulat CF",
      fontWeight: "400",
      fontSize: moderateScale(10),
    },
  },
};
