import { View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Card } from "../card";
import { Text } from "../text";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { theme } from "../../styles/theme";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

import { API_URL } from "@env";

export default function Stats() {
  const [presentAttendees, setPresentAttendees] = useState(0);
  const [servedMeals, setServedMeals] = useState(0);
  const [beneficiaries, setBenefeciaries] = useState(0);

  const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();

  useEffect(() => {
    socketRef.current = io(API_URL);
    socketRef.current.on("present_count", (count: number) => {
      setPresentAttendees(count);
    });
    socketRef.current.on("meal_count", (count: number) => {
      setServedMeals(count);
    });
    socketRef.current.on("client_count", (count: number) => {
      setBenefeciaries(count);
    });
    return () => {
      socketRef.current && socketRef.current.disconnect();
    };
  }, [presentAttendees, servedMeals, beneficiaries]);

  return (
    <View style={styles.cardsContainer}>
      <Card
        borderRadius={20}
        width={118}
        height={113}
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
