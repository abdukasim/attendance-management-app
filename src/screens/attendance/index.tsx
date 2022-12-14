import { View } from "react-native";
import React, { useEffect, useState } from "react";
import Stats from "../../components/stats";
import { SearchBar } from "../../components/searchBar";
import { List } from "../../components/list";
import url from "../../helpers/url";
import useSearch from "../../hooks/useSearch";

export default function AttendanceScreen() {
  // const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [attendanceList, setAttendanceList] = useState([]);

  const [search, filteredDataSource, searchFilterFunction] =
    useSearch(attendanceList);

  const fetchAttendanceList = async () => {
    try {
      const res = await url.get("/api/attendance/client");
      setAttendanceList(res.data.list);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAttendanceList();
  }, []);

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <Stats />
      <SearchBar
        clicked={clicked}
        setClicked={setClicked}
        searchPhrase={search}
        setSearchPhrase={searchFilterFunction}
      />
      <List data={filteredDataSource} />
    </View>
  );
}
