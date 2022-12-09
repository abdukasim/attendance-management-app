import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface MainParamList extends MainStackParamList {}
  }
}

export type MainStackParamList = {
  Login: NavigatorScreenParams<LoginScreenParamList> | undefined;
  ADMIN: NavigatorScreenParams<AdminTabParamList> | undefined;
  REG_OFF: NavigatorScreenParams<RegistrationTabParamList> | undefined;
  ATT_OFF: NavigatorScreenParams<AttendanceTabParamList> | undefined;
};

export type MainStackScreenProps<Screen extends keyof MainStackParamList> =
  NativeStackScreenProps<MainStackParamList, Screen>;

export type LoginScreenParamList = {
  TabOne: undefined;
};
export type AdminTabParamList = {};
export type RegistrationTabParamList = {};
export type AttendanceTabParamList = {};

// export type MainTabScreenProps<Screen extends keyof LoginScreenParamList> =
//   CompositeScreenProps<
//     BottomTabScreenProps<LoginScreenParamList, Screen>,
//     NativeStackScreenProps<MainStackParamList>
//   >;
