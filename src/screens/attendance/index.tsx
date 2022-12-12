import { View } from "react-native";
import React from "react";
import { Card } from "../../components/card";
import { Text } from "../../components/text";
import { PresentIcon } from "../../../assets/svg/icons";
import { theme } from "../../styles/theme";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Stats from "../../components/stats";

export default function AttendanceScreen() {
  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <Stats />
    </View>
  );
}
