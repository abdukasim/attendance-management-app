import React, { useState } from "react";

//components
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
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

  const [loading, setLoading] = useState(false);

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

        {!loading && (
          <>
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
              onPress={async () => {
                setLoading(true);
                const attendanceStatus = await attendance.markPresent(
                  modalStore.attendance.attendeeData.id
                );
                if (attendanceStatus) {
                  setTimeout(() => {
                    modalStore.attendance.hide();
                  }, 2000);
                  list.fetchList(listStore.setListData, listStore.endpoint);
                }
                setLoading(false);
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
              onPress={async () => {
                setLoading(true);
                const permissionStatus = await attendance.givePermisssion(
                  modalStore.attendance.attendeeData.id
                );
                if (permissionStatus) {
                  setTimeout(() => {
                    modalStore.attendance.hide();
                  }, 2000);
                  list.fetchList(listStore.setListData, listStore.endpoint);
                }
                setLoading(false);
              }}
            />
          </>
        )}
        {loading && (
          <>
            <Button
              borderRadius={30}
              pv={15}
              mb={12}
              textColor="background"
              bgColor="secondary"
            >
              <ActivityIndicator size="small" color="black" />
            </Button>
            <Button
              borderRadius={30}
              pv={15}
              textColor="background"
              bgColor="background"
            >
              <ActivityIndicator size="small" color="black" />
            </Button>
          </>
        )}
      </Card>
    </View>
  );
};
