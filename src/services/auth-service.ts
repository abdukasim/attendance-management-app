import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import url from "../helpers/sessionApi";
import {
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  ResumeRequest,
} from "../models/session-models";
import { MainStackParamList } from "../navigation/types";
import qs from "qs";
import storage from "./storage-services";

export class auth {
  static async login(
    credentials: LoginRequest,
    navigation: NativeStackNavigationProp<
      MainStackParamList,
      "Login",
      undefined
    >,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
    setSubmitting: (isSubmitting: boolean) => void,
    setAuthUser: any
  ) {
    try {
      const res = await url.post("/", qs.stringify(credentials));
      if (res.status == 200) {
        navigation.replace(res.data.type);
      }
      setAuthUser(res.data);
      console.log("login response", res.data);
      await storage.storeData("sessionData", res.data);
      setSubmitting(false);
    } catch (error: any) {
      console.error(error.response.data);
      if (!error.response) {
        setErrorMessage(error.message);
      } else setErrorMessage(error.response.data.description);
      setSubmitting(false);
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
      return res.data.success;
    } catch (error) {
      return false;
    }
  }
}
