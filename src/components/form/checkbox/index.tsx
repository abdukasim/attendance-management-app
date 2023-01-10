import { View, Text } from "react-native";
import React from "react";
import ExpoCheckbox from "expo-checkbox";

interface CheckboxProps {
  checked: boolean;
  setChecked: any;
}

export default function Checkbox({ checked, setChecked }: CheckboxProps) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        marginTop: 40,
      }}
    >
      <ExpoCheckbox
        color="rgb(192, 189, 204)"
        value={checked}
        onValueChange={setChecked}
      />
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
