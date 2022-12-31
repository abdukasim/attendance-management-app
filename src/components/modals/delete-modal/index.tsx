import React from "react";

//components
import { TouchableOpacity, View } from "react-native";
import { Button } from "../../button";
import { Card } from "../../card";
import { Text } from "../../text";

//styles
import { styles } from "../attendance-modal/styles";

//hooks
import { useModalStore } from "../../../store/modal-store";

//services
import attendance from "../../../services/attendance-services";

interface AttendanceModalProps {}

export const DeleteModal: React.FC<AttendanceModalProps> = () => {
  const modaleStore = useModalStore((state) => state);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => modaleStore.delete.hide()}
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
          Are you sure you want to remove this guy?
        </Text>
        <Button
          borderRadius={30}
          pv={12}
          bgColor="secondary"
          textColor="foreground"
          label="No"
          mb={12}
          onPress={() => attendance.markPresent()}
        />
        <Button
          borderRadius={30}
          pv={12}
          bgColor="background"
          textColor="foreground"
          label="Yes"
          onPress={() => attendance.givePermisssion()}
        />
      </Card>
    </View>
  );
};
