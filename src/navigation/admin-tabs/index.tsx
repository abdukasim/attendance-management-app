import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import {
  AttendanceIcon,
  PendingIcon,
  ReportIcon,
  StarIcon,
  VisitedIcon,
} from "../../../assets/svg/icons";
import { Logout } from "../../components/logout";
import { moderateScale, verticalScale } from "../../helpers/metrics";
import {
  BeneficiariesListScreen,
  PendingListScreen,
  ReportScreen,
  VisitedListScreen,
} from "../../screens/admin";
import AttendanceScreen from "../../screens/attendance/attendance-list";
import { theme } from "../../styles/theme";
import { AdminTabParamList, MainStackParamList } from "../types";

type AdminScreenProps = NativeStackScreenProps<MainStackParamList, "ADMIN">;

const Tab = createBottomTabNavigator<AdminTabParamList>();

export default function AdminTabs({ navigation }: AdminScreenProps) {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerTintColor: theme.colors.primary,
          tabBarIcon: ({ color, size }) => {
            if (route.name === "Pending") {
              return <PendingIcon color={color} />;
            } else if (route.name === "Visited") {
              return <VisitedIcon color={color} />;
            } else if (route.name === "Attendance") {
              return <AttendanceIcon color={color} />;
            } else if (route.name === "Report") {
              return <ReportIcon color={color} />;
            } else if (route.name === "Beneficiaries") {
              return <StarIcon color={color} />;
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
        <Tab.Screen name="Beneficiaries" component={BeneficiariesListScreen} />
        <Tab.Screen
          name="Pending"
          options={{ headerTitle: "Pending List" }}
          children={() => <PendingListScreen />}
        />
        <Tab.Screen
          name="Visited"
          options={{ headerTitle: "Visited List" }}
          children={() => <VisitedListScreen />}
        />
        <Tab.Screen name="Report" component={ReportScreen} />
        {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
