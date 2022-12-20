import { SafeAreaView, View } from "react-native";
import React, { useEffect, useState } from "react";
import Stats from "../../components/stats";
import { SearchBar } from "../../components/searchBar";
import { List } from "../../components/list";
import url from "../../helpers/url";
import useSearch from "../../hooks/useSearch";
import { AttendanceModal } from "../../components/modals/attendance-modal";
import { useModalStore } from "../../store/modal-store";
import { fetchAttendanceList } from "../../services/attendance";
import { styles } from "./styles";

export default function AttendanceScreen() {
  const [clicked, setClicked] = useState(false);
  const [attendanceList, setAttendanceList] = useState([]);

  const modalStore = useModalStore((state) => state);

  const [search, filteredDataSource, searchFilterFunction] =
    useSearch(attendanceList);

  useEffect(() => {
    fetchAttendanceList(setAttendanceList);
  }, []);

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
