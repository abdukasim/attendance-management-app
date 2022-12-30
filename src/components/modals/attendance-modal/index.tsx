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

//services
import attendance from "../../../services/attendance-services";

interface AttendanceModalProps {}

export const AttendanceModal: React.FC<AttendanceModalProps> = () => {
  const modaleStore = useModalStore((state) => state);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => modaleStore.attendance.hide()}
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
          {modaleStore.attendance.attendeeData.name}
        </Text>
        <Text color="background" variant="headerSm" mb={28}>
          {modaleStore.attendance.attendeeData.muntahaID}
        </Text>
        <Button
          borderRadius={30}
          pv={12}
          bgColor="secondary"
          textColor="foreground"
          label="Present"
          mb={12}
          onPress={() => attendance.markPresent()}
        />
        <Button
          borderRadius={30}
          pv={12}
          bgColor="background"
          textColor="foreground"
          label="Permission"
          onPress={() => attendance.givePermisssion()}
        />
      </Card>
    </View>
  );
};
