import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AttendanceIcon, VisitedIcon } from "../../../assets/svg/icons";
import { Logout } from "../../components/logout";
import { moderateScale, verticalScale } from "../../helpers/metrics";
import AttendanceScreen from "../../screens/attendance/attendance-list";
import OrderScreen from "../../screens/attendance/order-list";
import { theme } from "../../styles/theme";
import { AttendanceTabParamList, MainStackParamList } from "../types";

type AttendanceScreenProps = NativeStackScreenProps<
  MainStackParamList,
  "ATT_OFF"
>;

const Tab = createBottomTabNavigator<AttendanceTabParamList>();

export default function AttendanceTabs({ navigation }: AttendanceScreenProps) {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerTintColor: theme.colors.primary,
          tabBarIcon: ({ color, size }) => {
            if (route.name === "Attendance") {
              return <AttendanceIcon color={color} />;
            } else if (route.name === "Order") {
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
        <Tab.Screen name="Attendance" component={AttendanceScreen} />
        <Tab.Screen name="Order" component={OrderScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
