import React, { useEffect, useRef, useState } from "react";

//components
import { View } from "react-native";
import { Card } from "../card";
import { Text } from "../text";

//icons
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";

//styles
import { styles } from "./styles";
import { theme } from "../../styles/theme";

//libs
import { io } from "socket.io-client";

//env vars
import { SOCKET_API_URL } from "@env";

export default function Stats() {
  const [presentAttendees, setPresentAttendees] = useState(0);
  const [servedMeals, setServedMeals] = useState(0);
  const [beneficiaries, setBenefeciaries] = useState(0);

  const socket = io(SOCKET_API_URL);

  useEffect(() => {
    socket.emit("getPresentCount");
    socket.emit("getMealServed");
    socket.emit("getBeneficiaryCount");

    return () => {
      socket && socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("presentCount", (count: any) => {
      setPresentAttendees(count);
    });
    socket.on("mealServed", (count: number) => {
      setServedMeals(count);
    });
    socket.on("beneficiaryCount", (count: number) => {
      setBenefeciaries(count);
    });
    return () => {
      socket && socket.disconnect();
    };
  }, [presentAttendees, servedMeals, beneficiaries]);

  return (
    <View style={styles.cardsContainer}>
      <Card
        borderRadius={20}
        width={118}
        height={113}
        bgColor="background"
        style={styles.cardFlexStyles}
      >
        <Text variant="title" color="primary">
          {presentAttendees}
        </Text>
        <View style={styles.label}>
          <Entypo name="switch" size={15} color={theme.colors.primary} />
          <Text variant="body" color="primary" ml={4}>
            Present
          </Text>
        </View>
      </Card>

      <Card
        borderRadius={20}
        width={118}
        height={113}
        bgColor="background"
        style={styles.cardFlexStyles}
      >
        <Text variant="title" color="primary">
          {servedMeals}
        </Text>
        <View style={styles.label}>
          <Ionicons
            name="ios-chatbubble"
            size={15}
            color={theme.colors.primary}
          />
          <Text variant="body" color="primary" ml={4}>
            Served Meals
          </Text>
        </View>
      </Card>

      <Card
        borderRadius={20}
        width={118}
        height={113}
        bgColor="background"
        style={styles.cardFlexStyles}
      >
        <Text variant="title" color="primary">
          {beneficiaries}
        </Text>
        <View style={styles.label}>
          <AntDesign name="appstore1" size={15} color={theme.colors.primary} />
          <Text variant="body" color="primary" ml={4}>
            Total
          </Text>
        </View>
      </Card>
    </View>
  );
}
