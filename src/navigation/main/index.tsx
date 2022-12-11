import {
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AdminTabs from "../admin-tabs";
import AttendanceScreen from "../../screens/attendance";
import LoginScreen from "../../screens/auth/login";
import RegistrationScreen from "../../screens/registration";
import { MainStackParamList } from "../types";

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
        <Stack.Screen name="REG_OFF" component={RegistrationScreen} />
        <Stack.Screen name="ATT_OFF" component={AttendanceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
