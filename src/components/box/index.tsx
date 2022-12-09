import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { theme } from "../../styles/theme";

interface BoxProps extends React.ComponentProps<typeof View> {
  padding?: keyof typeof theme.spacing;
  margin?: keyof typeof theme.spacing;
  pt?: number;
  pb?: number;
  pr?: number;
  pl?: number;
  mt?: number;
  mb?: number;
  mr?: number;
  ml?: number;
  backgroundColor?: keyof typeof theme.colors;
  style?: StyleProp<ViewStyle> & object;
}

export const Box: React.FC<BoxProps> = ({
  style,
  padding,
  pt,
  pb,
  pl,
  pr,
  margin,
  mt,
  mb,
  ml,
  mr,
  backgroundColor,
  ...rest
}) => {
  return (
    <View
      style={{
        margin: theme.spacing[margin!],
        marginTop: mt,
        marginBottom: mb,
        marginRight: mr,
        marginLeft: ml,
        padding: theme.spacing[padding!],
        paddingTop: pt,
        paddingBottom: pb,
        paddingRight: pr,
        paddingLeft: pl,
        backgroundColor: theme.colors[backgroundColor!],
        ...style,
      }}
      {...rest}
    />
  );
};
