import { View, Text } from "react-native";
import React from "react";
import ExpoCheckbox from "expo-checkbox";

export default function Checkbox() {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        marginTop: 40,
      }}
    >
      <ExpoCheckbox color="rgb(192, 189, 204)" />
      <Text
        style={{
          marginLeft: 16,
          color: "#0b77c2",
        }}
      >
        Remember me
      </Text>
    </View>
  );
}
