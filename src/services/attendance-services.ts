import Toast from "react-native-root-toast";
import url from "../helpers/attendanceApi";
import { UpdateBeneficiaryRequest } from "../models/beneficiary-models";
import { theme } from "../styles/theme";

export default class attendance {
  static async markPresent(id: number) {
    try {
      const res = await url.put(`/present/${id}`);
      res.status === 200 &&
        Toast.show("Status Changed to Present!", {
          duration: Toast.durations.LONG,
          position: 50,
          backgroundColor: theme.colors.primary,
          textColor: theme.colors.background,
        });
      return true;
    } catch (error) {
      console.error(error);
      Toast.show("Status Change Failed!", {
        duration: Toast.durations.LONG,
        position: 50,
        backgroundColor: theme.colors.secondary,
        textColor: theme.colors.failure,
      });
      return false;
    }
  }

  static async givePermisssion(id: number) {
    try {
      const res = await url.put(`/permission/${id}`);
      res.status === 200 &&
        Toast.show("Status Changed to Permession!", {
          duration: Toast.durations.LONG,
          position: 50,
          backgroundColor: theme.colors.primary,
          textColor: theme.colors.background,
        });
      return true;
    } catch (error) {
      console.error(error);
      Toast.show("Status Change Failed!", {
        duration: Toast.durations.LONG,
        position: 50,
        backgroundColor: theme.colors.secondary,
        textColor: theme.colors.failure,
      });
      return false;
    }
  }

  static editBeneficiary(
    values: UpdateBeneficiaryRequest,
    setSubmitting: (isSubmitting: boolean) => void,
    setMessage: any
  ) {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key as keyof UpdateBeneficiaryRequest]);
    });
    try {
      const res = url.put("/beneficiary-list", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSubmitting(false);
      setMessage({
        text: "Successfully edited!",
        type: "SUCCESS",
      });
      setTimeout(() => {
        setMessage({
          text: "",
          type: "",
        });
      }, 2000);
      return true;
    } catch (error: any) {
      console.error(error);
      setSubmitting(false);
      setMessage({
        text: error.message,
        type: "ERROR",
      });
      return false;
    }
  }

  static async removeFromOrderList(id: number) {
    try {
      const res = await url.delete(`/order-list/${id}`);
      Toast.show("Removed from Order List!", {
        duration: Toast.durations.LONG,
        position: 50,
        backgroundColor: theme.colors.primary,
        textColor: theme.colors.background,
      });
      return true;
    } catch (error: any) {
      console.error(error);
      if (error.code === "ERR_NETWORK" || error.code === "ECONNABORTED") {
        Toast.show("Please check your internet connection and try again.", {
          duration: Toast.durations.LONG,
          position: 50,
          backgroundColor: theme.colors.secondary,
          textColor: theme.colors.failure,
          opacity: 1,
        });
      }
      return false;
    }
  }
}
