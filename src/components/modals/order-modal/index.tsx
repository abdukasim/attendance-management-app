import React from "react";

//components
import { TouchableOpacity, View } from "react-native";
import { Button } from "../../button";
import { Card } from "../../card";
import { Text } from "../../text";

//styles
import { styles } from "./styles";

//hooks
import { useModalStore } from "../../../store/modal-store";
import { useListStore } from "../../../store/list-store";

//services
import attendance from "../../../services/attendance-services";
import list from "../../../services/list-service";

interface OrderModalProps {}

export const OrderModal: React.FC<OrderModalProps> = () => {
  const modalStore = useModalStore((state) => state.order);
  const listStore = useListStore((state) => state.order);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => modalStore.hide()}
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
          {modalStore.orderData.name}
        </Text>
        <Text color="background" variant="headerSm" mb={28}>
          {modalStore.orderData.muntahaId}
        </Text>
        <Button
          borderRadius={30}
          pv={12}
          bgColor="secondary"
          textColor="foreground"
          label="Remove"
          mb={12}
          onPress={() => {
            const orderStatus = attendance.removeFromOrderList(
              modalStore.orderData.id
            );
            orderStatus && modalStore.hide();
            list.fetchList(listStore.setListData, listStore.endpoint);
          }}
        />
        {/* TODO order modal services */}
      </Card>
    </View>
  );
};
