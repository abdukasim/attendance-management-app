import { View, Text } from "react-native";
import React, { Children } from "react";
import { styles } from "./styles";

interface CardProps {
  children?: any;
  px?: number;
  py?: number;
}

export function Card({ px, py, children }: CardProps) {
  return (
    <View
      style={[
        styles.container,
        {
          paddingHorizontal: px,
          paddingVertical: py,
        },
      ]}
    >
      {children}
    </View>
  );
}
