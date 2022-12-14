import { View, Text, StyleProp, ViewStyle } from "react-native";
import React, { Children } from "react";
import { styles } from "./styles";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../helpers/metrics";
import { theme } from "../../styles/theme";

interface CardProps {
  children?: any;
  px?: number;
  py?: number;
  mb?: number;
  width?: number;
  height?: number;
  backgroundColor?: keyof typeof theme.colors;
  borderRadius?: number;
  style?: StyleProp<ViewStyle> & object;
}

export function Card({
  px,
  py,
  mb,
  width,
  height,
  children,
  borderRadius,
  style,
}: CardProps) {
  return (
    <View
      style={[
        styles.container,
        {
          paddingHorizontal: px && horizontalScale(px),
          paddingVertical: py && verticalScale(py),
          marginBottom: mb && verticalScale(mb),
          width: width && horizontalScale(width),
          height: height && verticalScale(height),
          borderRadius: borderRadius && moderateScale(borderRadius),
          ...style,
        },
      ]}
    >
      {children}
    </View>
  );
}
