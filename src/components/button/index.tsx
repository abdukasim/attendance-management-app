import React from "react";

//components
import { View, Text, Pressable, ActivityIndicatorProps } from "react-native";

//styles
import { theme } from "../../styles/theme";

//libs
import { horizontalScale, verticalScale } from "../../helpers/metrics";

interface ButtonProps extends React.ComponentProps<typeof Pressable> {
  label?: string | React.Component<ActivityIndicatorProps>;
  bgColor: keyof typeof theme.colors;
  textColor: keyof typeof theme.colors;
  borderRadius?: number;
  width?: number;
  height?: number;
  style?: any;
  mt?: number;
  mb?: number;
  mr?: number;
  ml?: number;
  pv?: number;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  bgColor,
  textColor,
  borderRadius,
  width,
  height,
  style,
  mt,
  mb,
  pv,
  children,
  ...rest
}) => {
  return (
    <Pressable
      style={{
        backgroundColor: theme.colors[bgColor],
        marginTop: mt && verticalScale(mt),
        marginBottom: mb && verticalScale(mb),
        borderRadius: borderRadius,
        display: "flex",
        alignItems: "center",
        width: width && horizontalScale(width),
        height: height && verticalScale(height),
        paddingVertical: pv && verticalScale(pv),
        ...style,
      }}
      {...rest}
    >
      {typeof label === "string" ? (
        <Text
          style={{
            color: theme.colors[textColor],
            marginHorizontal: "auto",
            fontSize: 19,
          }}
        >
          {label}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
};
