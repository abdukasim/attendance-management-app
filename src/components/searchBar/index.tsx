import { Entypo, Feather } from "@expo/vector-icons";
import React from "react";
import { Button, Keyboard, TextInput, View } from "react-native";
import { theme } from "../../styles/theme";
import { styles } from "./styles";

interface SearchBarProps {
  clicked?: boolean;
  searchPhrase?: string;
  setSearchPhrase?: any;
  setClicked?: any;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  clicked,
  searchPhrase,
  setSearchPhrase,
  setClicked,
}) => {
  return (
    <View style={styles.container}>
      {/* search Icon */}
      <Feather
        name="search"
        size={20}
        color="black"
        style={{ marginLeft: 1 }}
      />
      {/* Input field */}
      <TextInput
        style={styles.input}
        placeholder="Type Here"
        placeholderTextColor={theme.colors.foreground}
        value={searchPhrase}
        onChangeText={(text) => setSearchPhrase(text)}
        onFocus={() => {
          setClicked(true);
        }}
      />
    </View>
  );
};
