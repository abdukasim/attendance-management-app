//components
import { Pressable, View } from "react-native";
import { Text } from "../text";
import { theme } from "../../styles/theme";
import { AntDesign } from "@expo/vector-icons";

//prop types
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigation/types";

interface LogoutProps {
  navigation: NativeStackNavigationProp<
    MainStackParamList,
    "ADMIN" | "ATT_OFF" | "REG_OFF",
    undefined
  >;
}

export const Logout = ({ navigation }: LogoutProps) => {
  return (
    <Pressable
      onPress={() => {
        navigation.replace("Login");
      }}
    >
      <View
        style={{
          marginRight: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text variant="headerMd" color="primary" mr={5}>
          Logout
        </Text>
        {/* <FontAwesome name="sign-out" size={20} color={theme.colors.primary} /> */}
        <AntDesign name="poweroff" size={12} color={theme.colors.primary} />
      </View>
    </Pressable>
  );
};
