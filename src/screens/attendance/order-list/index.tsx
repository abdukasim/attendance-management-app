import React, { useCallback, useEffect, useState } from "react";

//components
import { SafeAreaView } from "react-native";
import { SearchBar } from "../../../components/searchBar";
import { List } from "../../../components/list";
import { OrderModal } from "../../../components/modals/order-modal";

//hooks
import useSearch from "../../../hooks/useSearch";
import { useModalStore } from "../../../store/modal-store";
import { useFocusEffect } from "@react-navigation/native";
import { useListStore } from "../../../store/list-store";

//styles
import { styles } from "./styles";

//services
import list from "../../../services/list-service";

export default function OrderScreen() {
  const [clicked, setClicked] = useState(false);

  const modalStore = useModalStore((state) => state);
  const listStore = useListStore((state) => state.order);

  const [search, filteredDataSource, searchFilterFunction] = useSearch(
    listStore.listData
  );

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
      <SearchBar
        clicked={clicked}
        setClicked={setClicked}
        searchPhrase={search}
        setSearchPhrase={searchFilterFunction}
      />
      <List data={filteredDataSource} parent="order" />
      {modalStore.order.isShow && <OrderModal />}
    </SafeAreaView>
  );
}
