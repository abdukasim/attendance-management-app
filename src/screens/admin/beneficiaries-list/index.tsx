import React, { useCallback, useEffect, useState } from "react";

//components
import { SafeAreaView } from "react-native";
import { SearchBar } from "../../../components/searchBar";
import { List } from "../../../components/list";
import BeneficiariesModal from "../../../components/modals/beneficiary-modal";

//styles
import { styles } from "../pending-list/styles";

//hooks
import { useModalStore } from "../../../store/modal-store";
import useSearch from "../../../hooks/useSearch";
import { useFocusEffect } from "@react-navigation/native";
import { useListStore } from "../../../store/list-store";

//services
import { fetchList } from "../../../services/list";

export function BeneficiariesListScreen() {
  const [clicked, setClicked] = useState(false);

  const modalStore = useModalStore((state) => state.beneficiaries);
  const listStore = useListStore((state) => state.beneficiaries);

  const [search, filteredDataSource, searchFilterFunction] = useSearch(
    listStore.listData
  );

  useEffect(() => {
    fetchList(listStore.setListData, listStore.endpoint, listStore.param);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchList(listStore.setListData, listStore.endpoint, listStore.param);
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
      <List data={filteredDataSource} parent="beneficiaries" />
      {modalStore.isShow && <BeneficiariesModal />}
    </SafeAreaView>
  );
}
