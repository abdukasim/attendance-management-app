import React, { useCallback, useEffect, useState } from "react";

//components
import { SafeAreaView } from "react-native";
import { SearchBar } from "../../../components/searchBar";
import { List } from "../../../components/list";
import PendingModal from "../../../components/modals/pending-modal";

//styles
import { styles } from "./styles";

//hooks
import { useModalStore } from "../../../store/modal-store";
import useSearch from "../../../hooks/useSearch";
import { useFocusEffect } from "@react-navigation/native";

//services
import { fetchPendingList } from "../../../services/pending";

export function PendingListScreen() {
  const [clicked, setClicked] = useState(false);
  const [pendingList, setPendingList] = useState([]);

  const modalStore = useModalStore((state) => state);

  const [search, filteredDataSource, searchFilterFunction] =
    useSearch(pendingList);

  useEffect(() => {
    fetchPendingList(setPendingList);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPendingList(setPendingList);
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
      <List data={filteredDataSource} parent="pending" />
      {modalStore.pending.isShow && <PendingModal />}
    </SafeAreaView>
  );
}
