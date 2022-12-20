import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { useModalStore } from "../../../store/modal-store";
import useSearch from "../../../hooks/useSearch";
import { fetchPendingList } from "../../../services/pending";
import { SearchBar } from "../../../components/searchBar";
import { List } from "../../../components/list";
import { styles } from "./styles";
import PendingModal from "../../../components/modals/pending-modal";

export function PendingListScreen() {
  const [clicked, setClicked] = useState(false);
  const [pendingList, setPendingList] = useState([]);

  const modalStore = useModalStore((state) => state);

  const [search, filteredDataSource, searchFilterFunction] =
    useSearch(pendingList);

  useEffect(() => {
    fetchPendingList(setPendingList);
  }, []);

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
