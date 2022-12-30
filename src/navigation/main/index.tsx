import {
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AdminTabs from "../admin-tabs";
import LoginScreen from "../../screens/auth/login";

import { MainStackParamList } from "../types";
import AttendanceTabs from "../attendance-tabs";
import RegistrationTabs from "../registration-tabs";

interface MainNavigationProps {}

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainNavigation: React.FC<MainNavigationProps> = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ADMIN" component={AdminTabs} />
        <Stack.Screen name="REG_OFF" component={RegistrationTabs} />
        <Stack.Screen name="ATT_OFF" component={AttendanceTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
