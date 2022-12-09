import React from "react";
import { StyleProp, Text as RNText, TextStyle } from "react-native";
import { theme } from "../../styles/theme";

interface TextProps extends React.ComponentProps<typeof RNText> {
  variant?: keyof typeof theme.textVariants;
  color?: keyof typeof theme.colors;
  style?: any;
  mt?: number;
  mb?: number;
  mr?: number;
  ml?: number;
}

export const Text: React.FC<TextProps> = ({
  style,
  variant,
  color,
  mt,
  mb,
  ml,
  mr,
  ...rest
}) => {
  return (
    <RNText
      style={{
        color: color && theme.colors[color],
        marginTop: mt,
        marginBottom: mb,
        marginRight: mr,
        marginLeft: ml,
        ...theme.textVariants[variant!],
        ...style,
      }}
      {...rest}
    />
  );
};
