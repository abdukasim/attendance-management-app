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
import list from "../../../services/list-service";

//models
import { PendingUserModel } from "../../../models/pending-models";
import { VisitedUserModel } from "../../../models/visited-models";
import { BeneficiaryModel } from "../../../models/beneficiary-models";

interface DeleteModalProps {
  data: PendingUserModel | VisitedUserModel | BeneficiaryModel;
  listData: any;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({ data, listData }) => {
  const modalStore = useModalStore((state) => state);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => modalStore.delete.hide()}
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
        <Text color="background" variant="headerMd" mb={12}>
          Are you sure you want to remove {data.name}?
        </Text>
        <Button
          borderRadius={30}
          pv={12}
          bgColor="secondary"
          textColor="foreground"
          label="No"
          mb={12}
          onPress={() => {
            modalStore.delete.hide();
          }}
        />
        <Button
          borderRadius={30}
          pv={12}
          bgColor="background"
          textColor="foreground"
          label="Yes"
          onPress={() => {
            //delete
            list.deleteFromList(listData.endpoint, data.id);
            modalStore.delete.hide();
            list.fetchList(listData.setListData, listData.endpoint);
          }}
        />
      </Card>
    </View>
  );
};
