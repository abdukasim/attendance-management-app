import { View, Text, Pressable, ActivityIndicatorProps } from "react-native";
import React from "react";
import { theme } from "../../styles/theme";

interface ButtonProps extends React.ComponentProps<typeof Pressable> {
  label?: string | React.Component<ActivityIndicatorProps>;
  bgColor: keyof typeof theme.colors;
  textColor: keyof typeof theme.colors;
  style?: any;
  mt?: number;
  mb?: number;
  mr?: number;
  ml?: number;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  bgColor,
  textColor,
  style,
  mt,
  mb,
  children,
  ...rest
}) => {
  return (
    <Pressable
      style={{
        backgroundColor: theme.colors[bgColor],
        marginTop: mt,
        borderRadius: 30.01,
        display: "flex",
        alignItems: "center",
        paddingVertical: 12,
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
