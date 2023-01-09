import url from "../helpers/attendanceApi";
import { UpdateBeneficiaryRequest } from "../models/beneficiary-models";
import { ErrorResponse } from "../models/error-models";

export default class attendance {
  static markPresent(id: number, setMessage: any) {
    try {
      const res = url.put(`/present/${id}`);
      setMessage({
        text: "Status Changed to Present Successfully!",
        type: "SUCCESS",
      });
      return true;
    } catch (error) {
      console.error(error);
      setMessage({
        text: "Status Change Failed!",
        type: "FAILURE",
      });
      return false;
    }
  }

  static givePermisssion(id: number, setMessage: any) {
    try {
      const res = url.put(`/permission/${id}`);
      setMessage({
        text: "Status Changed to permission Successfully!",
        type: "SUCCESS",
      });
      return true;
    } catch (error) {
      console.error(error);
      setMessage({
        text: "Status Change Failed!",
        type: "FAILURE",
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

  static removeFromOrderList(id: number) {
    try {
      const res = url.delete(`/order-list/${id}`);
      console.log(res);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
