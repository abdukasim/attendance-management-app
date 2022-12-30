import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AttendanceIcon, VisitedIcon } from "../../../assets/svg/icons";
import { Logout } from "../../components/logout";
import { moderateScale, verticalScale } from "../../helpers/metrics";
import NewMemberRegistration from "../../screens/registration/new-member";
import OldMemeberRegistration from "../../screens/registration/old-member";
import { theme } from "../../styles/theme";
import { RegistrationTabParamList, MainStackParamList } from "../types";

type RegistrationScreenProps = NativeStackScreenProps<
  MainStackParamList,
  "REG_OFF"
>;

const Tab = createBottomTabNavigator<RegistrationTabParamList>();

export default function RegistrationTabs({
  navigation,
}: RegistrationScreenProps) {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerTintColor: theme.colors.primary,
          tabBarIcon: ({ color, size }) => {
            if (route.name === "New") {
              return <AttendanceIcon color={color} />;
            } else if (route.name === "Old") {
              return <VisitedIcon color={color} />;
            }
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.foreground,
          tabBarStyle: {
            borderTopLeftRadius: moderateScale(35),
            borderTopRightRadius: moderateScale(35),
            paddingTop: verticalScale(28),
            paddingBottom: verticalScale(28),
            height: verticalScale(96),
            position: "absolute",
          },
          headerRight: () => <Logout navigation={navigation} />,
        })}
      >
        <Tab.Screen name="New" component={NewMemberRegistration} />
        <Tab.Screen name="Old" component={OldMemeberRegistration} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
