import React, { useState } from "react";

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
import { useListStore } from "../../../store/list-store";

interface AttendanceModalProps {}

export const AttendanceModal: React.FC<AttendanceModalProps> = () => {
  const modalStore = useModalStore((state) => state);

  const [message, setMessage] = useState({
    text: "",
    type: "",
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => modalStore.attendance.hide()}
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
          {modalStore.attendance.attendeeData.name}
        </Text>
        <Text color="background" variant="headerSm" mb={28}>
          {modalStore.attendance.attendeeData.muntahaId}
        </Text>

        <Button
          borderRadius={30}
          pv={12}
          bgColor="secondary"
          textColor="foreground"
          label="Present"
          mb={12}
          onPress={() => {
            const attendanceStatus = attendance.markPresent(
              modalStore.attendance.attendeeData.id,
              setMessage
            );
            attendanceStatus &&
              setTimeout(() => {
                setMessage({
                  text: "",
                  type: "",
                });
                modalStore.visited.hide();
              }, 2000);
          }}
        />
        <Button
          borderRadius={30}
          pv={12}
          bgColor="background"
          textColor="foreground"
          label="Permission"
          onPress={() => {
            const permessionStatus = attendance.givePermisssion(
              modalStore.attendance.attendeeData.id,
              setMessage
            );
            permessionStatus &&
              setTimeout(() => {
                setMessage({
                  text: "",
                  type: "",
                });
                modalStore.visited.hide();
              }, 2000);
          }}
        />
        {message && (
          <Text
            variant="headerSm"
            color={message.type === "ERROR" ? "failure" : "success"}
            style={{
              textAlign: "center",
            }}
          >
            {message.text}
          </Text>
        )}
      </Card>
    </View>
  );
};
