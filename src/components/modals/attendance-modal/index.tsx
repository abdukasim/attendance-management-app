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
          bgColor="secondary"
          textColor="foreground"
          label="Present"
          mb={12}
          onPress={() => presentAttendee()}
        />
        <Button
          bgColor="background"
          textColor="foreground"
          label="Permission"
          onPress={() => permessionAttendee()}
        />
      </Card>
    </View>
  );
};
