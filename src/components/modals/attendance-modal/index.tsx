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
import list from "../../../services/list-service";

interface AttendanceModalProps {}

export const AttendanceModal: React.FC<AttendanceModalProps> = () => {
  const modalStore = useModalStore((state) => state);
  const listStore = useListStore((state) => state.attendance);

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
          disabled={
            modalStore.attendance.attendeeData.beneficiaryStatus?.status !==
            "absent"
          }
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
                modalStore.attendance.hide();
              }, 2000);
            list.fetchList(listStore.setListData, listStore.endpoint);
          }}
        />
        <Button
          borderRadius={30}
          pv={12}
          bgColor="background"
          textColor="foreground"
          label="Permission"
          disabled={
            modalStore.attendance.attendeeData.beneficiaryStatus?.status !==
            "absent"
          }
          onPress={() => {
            const permissionStatus = attendance.givePermisssion(
              modalStore.attendance.attendeeData.id,
              setMessage
            );
            permissionStatus &&
              setTimeout(() => {
                setMessage({
                  text: "",
                  type: "",
                });
                modalStore.attendance.hide();
              }, 2000);
            list.fetchList(listStore.setListData, listStore.endpoint);
          }}
        />
        {message && (
          <Text
            variant="headerSm"
            color={message.type === "ERROR" ? "failure" : "background"}
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
