import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import url from "../helpers/sessionApi";
import { LoginRequest, LoginResponse } from "../models/session-models";
import { MainStackParamList } from "../navigation/types";
import qs from "qs";
import storage from "./storage-services";
import Toast from "react-native-root-toast";
import { theme } from "../styles/theme";

export class auth {
  static async login(
    credentials: LoginRequest,
    navigation: NativeStackNavigationProp<
      MainStackParamList,
      "Login",
      undefined
    >,
    setSubmitting: (isSubmitting: boolean) => void,
    setAuthUser: any,
    checked: boolean
  ) {
    try {
      const res = await url.post("/", qs.stringify(credentials));
      console.log(res);
      if (res.status == 200) {
        Toast.show("Welcome Back", {
          position: 50,
          backgroundColor: theme.colors.primary,
          textColor: theme.colors.background,
          opacity: 1,
        });
        navigation.replace(res.data?.type);
        setAuthUser(res.data!);
        checked && (await storage.storeData("sessionData", res.data!));
      }
      setSubmitting(false);
      return "success";
    } catch (error: any) {
      setSubmitting(false);
      if (!error.response) {
        Toast.show(error.message, {
          duration: Toast.durations.LONG,
          position: 50,
          backgroundColor: theme.colors.secondary,
          textColor: theme.colors.failure,
        });
      } else {
        Toast.show(error.response.data.message, {
          duration: Toast.durations.LONG,
          position: 50,
          backgroundColor: theme.colors.secondary,
          textColor: theme.colors.failure,
        });
      }
    }
  }

  static async logout() {
    try {
      const res = await url.delete("/");
      return res.data.success;
    } catch (error) {
      return false;
    }
  }

  static async resumeSession(user: LoginResponse) {
    try {
      const res = await url.post("/resume", user);
      Toast.show("Welcome Back", {
        position: 50,
        backgroundColor: theme.colors.primary,
        textColor: theme.colors.background,
        opacity: 1,
      });
      return res.data.success;
    } catch (error) {
      return false;
    }
  }
}
