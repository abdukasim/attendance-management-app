import React, { useCallback, useEffect, useState } from "react";

//components
import { SafeAreaView } from "react-native";
import { SearchBar } from "../../../components/searchBar";
import { List } from "../../../components/list";
import BeneficiariesModal from "../../../components/modals/beneficiary-modal";
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

export function BeneficiariesListScreen() {
  const [clicked, setClicked] = useState(false);

  const modalStore = useModalStore((state) => state);
  const listStore = useListStore((state) => state.beneficiaries);

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
      <List data={filteredDataSource} parent="beneficiaries" />
      {modalStore.beneficiaries.isShow && <BeneficiariesModal />}
      {modalStore.delete.isShow && (
        <DeleteModal
          data={modalStore.beneficiaries.beneficiariesData}
          listData={listStore}
        />
      )}
    </SafeAreaView>
  );
}
