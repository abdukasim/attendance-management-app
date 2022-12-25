import React, { useCallback, useEffect, useState } from "react";

//components
import { SafeAreaView, View } from "react-native";
import Stats from "../../components/stats";
import { SearchBar } from "../../components/searchBar";
import { List } from "../../components/list";
import { AttendanceModal } from "../../components/modals/attendance-modal";

//hooks
import useSearch from "../../hooks/useSearch";
import { useModalStore } from "../../store/modal-store";
import { useFocusEffect } from "@react-navigation/native";
import { useListStore } from "../../store/list-store";

//styles
import { styles } from "./styles";

//services
import { fetchList } from "../../services/list";

export default function AttendanceScreen() {
  const [clicked, setClicked] = useState(false);

  const modalStore = useModalStore((state) => state);
  const listStore = useListStore((state) => state.attendance);

  const [search, filteredDataSource, searchFilterFunction] = useSearch(
    listStore.listData
  );

  useEffect(() => {
    fetchList(listStore.setListData, listStore.endpoint);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchList(listStore.setListData, listStore.endpoint);
    }, [])
  );
  return (
    <SafeAreaView style={styles.container}>
      <Stats />
      <SearchBar
        clicked={clicked}
        setClicked={setClicked}
        searchPhrase={search}
        setSearchPhrase={searchFilterFunction}
      />
      <List data={filteredDataSource} parent="attendance" />
      {modalStore.attendance.isShow && <AttendanceModal />}
    </SafeAreaView>
  );
}
