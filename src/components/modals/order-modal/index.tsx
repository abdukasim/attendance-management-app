import React from "react";
import { TouchableOpacity, View } from "react-native";
import {
  permessionAttendee,
  presentAttendee,
} from "../../../services/attendance";
import { useModalStore } from "../../../store/modal-store";
import { Button } from "../../button";
import { Card } from "../../card";
import { Text } from "../../text";
import { styles } from "./styles";

interface OrderModalProps {}

export const OrderModal: React.FC<OrderModalProps> = () => {
  const modaleStore = useModalStore((state) => state.order);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => modaleStore.hide()}
        style={styles.backdrop}
      ></TouchableOpacity>
      <Card
        style={styles.card}
        bgColor="primary"
        width={282}
        height={241}
        borderRadius={24}
        px={28}
      >
        <Text color="background" variant="headerLg">
          {modaleStore.orderData.name}
        </Text>
        <Text color="background" variant="headerSm" mb={28}>
          {modaleStore.orderData.muntahaID}
        </Text>
        <Button
          borderRadius={30}
          pv={12}
          bgColor="secondary"
          textColor="foreground"
          label="Remove"
          mb={12}
          onPress={() => presentAttendee()}
        />
      </Card>
    </View>
  );
};
