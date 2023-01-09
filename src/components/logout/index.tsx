//components
import { Pressable, View } from "react-native";
import { Text } from "../text";
import { theme } from "../../styles/theme";
import { AntDesign } from "@expo/vector-icons";

//prop types
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigation/types";

//services
import storage from "../../services/storage-services";
import { auth } from "../../services/auth-service";

//hooks
import { useSessionStore } from "../../store/session-store";
interface LogoutProps {
  navigation: NativeStackNavigationProp<
    MainStackParamList,
    "ADMIN" | "ATT_OFF" | "REG_OFF",
    undefined
  >;
}

export const Logout = ({ navigation }: LogoutProps) => {
  const sessionStore = useSessionStore((state) => state);
  return (
    <Pressable
      onPress={async () => {
        await storage.removeValue("sessionData");
        sessionStore.setAuthUser(null as never);
        navigation.replace("Login");
        await auth.logout();
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
