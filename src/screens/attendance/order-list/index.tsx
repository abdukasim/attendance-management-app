import React, { useCallback, useEffect } from "react";

//components
import { SafeAreaView } from "react-native";
import { List } from "../../../components/list";
import { OrderModal } from "../../../components/modals/order-modal";

//hooks
import { useModalStore } from "../../../store/modal-store";
import { useFocusEffect } from "@react-navigation/native";
import { useListStore } from "../../../store/list-store";

//styles
import { styles } from "./styles";

//services
import list from "../../../services/list-service";

export default function OrderScreen() {
  const modalStore = useModalStore((state) => state.order);
  const listStore = useListStore((state) => state.order);

  useEffect(() => {
    list.fetchList(listStore.setListData, listStore.endpoint);
  }, []);

  useFocusEffect(
    useCallback(() => {
      list.fetchList(listStore.setListData, listStore.endpoint);
    }, [])
  );
  return (
    <SafeAreaView style={styles.container}>
      <List data={listStore.listData} parent="order" />
      {modalStore.isShow && <OrderModal />}
    </SafeAreaView>
  );
}
