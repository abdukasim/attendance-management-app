import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { horizontalScale, verticalScale } from "../../helpers/metrics";
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
        marginTop: mt && verticalScale(mt),
        marginBottom: mb && verticalScale(mb),
        marginRight: mr && horizontalScale(mr),
        marginLeft: ml && horizontalScale(ml),
        padding: theme.spacing[padding!],
        paddingTop: pt && verticalScale(pt),
        paddingBottom: pb && verticalScale(pb),
        paddingRight: pr && horizontalScale(pr),
        paddingLeft: pl && horizontalScale(pl),
        backgroundColor: theme.colors[backgroundColor!],
        ...style,
      }}
      {...rest}
    />
  );
};
