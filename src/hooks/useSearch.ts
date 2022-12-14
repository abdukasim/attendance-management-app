import React, { useEffect, useState } from "react";

export default function useSearch(data: any) {
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState(data);
  const [masterDataSource, setMasterDataSource] = useState(data);

  useEffect(() => {
    setFilteredDataSource(data);
    setMasterDataSource(data);
  }, [data]);

  const searchFilterFunction = (text: string) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      setSearch(text);
      const newData = masterDataSource.filter(function (item: any) {
        let itemData;
        if (item.muntahaID) {
          itemData = item.muntahaID
            ? item.muntahaID.toUpperCase()
            : "".toUpperCase();
        } else {
          itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        }
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  return [search, filteredDataSource, searchFilterFunction];
}
