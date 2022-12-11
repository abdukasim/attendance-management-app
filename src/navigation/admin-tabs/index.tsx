import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Component } from "react";
import AttendanceIcon from "../../../assets/svg/attendance-icon";
import PendingIcon from "../../../assets/svg/pending-icon";
import ReportIcon from "../../../assets/svg/report-icon";
import StarIcon from "../../../assets/svg/star-icon";
import VisitedIcon from "../../../assets/svg/visited-icon";
import {
  BeneficiariesListScreen,
  PendingListScreen,
  ReportScreen,
  VisitedListScreen,
} from "../../screens/admin";
import AttendanceScreen from "../../screens/attendance";
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
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
            paddingTop: 28,
            paddingBottom: 28,
            height: 96,
          },
          //   headerRight: () => <Logout />,
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
