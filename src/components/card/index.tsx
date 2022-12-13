import { View, Text } from "react-native";
import React, { Children } from "react";
import { styles } from "./styles";
import { horizontalScale, verticalScale } from "../../helpers/metrics";

interface CardProps {
  children?: any;
  px?: number;
  py?: number;
  width?: number;
  height?: number;
}

export function Card({ px, py, width, height, children }: CardProps) {
  return (
    <View
      style={[
        styles.container,
        {
          paddingHorizontal: px && horizontalScale(px),
          paddingVertical: py && verticalScale(py),
          width: width && horizontalScale(width),
          height: height && verticalScale(height),
        },
      ]}
    >
      {children}
    </View>
  );
}
