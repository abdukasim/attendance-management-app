import React, { useCallback, useEffect, useState } from "react";

//components
import { SafeAreaView } from "react-native";
import { SearchBar } from "../../../components/searchBar";
import { List } from "../../../components/list";
import VisitedModal from "../../../components/modals/visit-modal";
import { DeleteModal } from "../../../components/modals/delete-modal";

//styles
import { styles } from "../pending-list/styles";

//hooks
import { useModalStore } from "../../../store/modal-store";
import useSearch from "../../../hooks/useSearch";
import { useFocusEffect } from "@react-navigation/native";
import { useListStore } from "../../../store/list-store";

//services
import list from "../../../services/list-service";

export function VisitedListScreen() {
  const [clicked, setClicked] = useState(false);

  const modalStore = useModalStore((state) => state);
  const listStore = useListStore((state) => state.visited);

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
      <List data={filteredDataSource} parent="visited" />
      {modalStore.visited.isShow && <VisitedModal />}
      {modalStore.delete.isShow && (
        <DeleteModal
          data={modalStore.visited.visitedData}
          listData={listStore}
        />
      )}
    </SafeAreaView>
  );
}
