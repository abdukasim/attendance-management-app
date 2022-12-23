import React from "react";
import { StyleProp, Text as RNText, TextStyle } from "react-native";
import { horizontalScale, verticalScale } from "../../helpers/metrics";
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

/**
 * # Text
 * @param param0 variant color style mt mb mr ml
 * @returns custom Text React component
 */
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
        marginTop: mt && verticalScale(mt),
        marginBottom: mb && verticalScale(mb),
        marginRight: mr && horizontalScale(mr),
        marginLeft: ml && horizontalScale(ml),
        ...theme.textVariants[variant!],
        ...style,
      }}
      {...rest}
    />
  );
};
