import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import url from "../helpers/sessionApi";
import { LoginRequest, LogoutResponse } from "../models/session-models";
import { MainStackParamList } from "../navigation/types";
import qs from "qs";

export class auth {
  static login(
    credentials: LoginRequest,
    navigation: NativeStackNavigationProp<
      MainStackParamList,
      "Login",
      undefined
    >,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
    setSubmitting: (isSubmitting: boolean) => void
  ) {
    url
      .post("/", qs.stringify(credentials))
      .then((res) => {
        if (res.status == 200) {
          navigation.replace(res.data.type);
        }
        setSubmitting(false);
      })
      .catch((err) => {
        console.error(err);
        if (!err.response) {
          setErrorMessage(err.message);
        } else setErrorMessage(err.response.data.description);
        setSubmitting(false);
      });
  }
}
