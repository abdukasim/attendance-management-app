import url from "../helpers/attendanceApi";
import { RegisterBeneficiaryRequest } from "../models/beneficiary-models";
import { CreatePendingUserRequest } from "../models/pending-models";
import qs from "qs";
export class registration {
  /**
   * ## New member registration
   * @param values form values
   */
  static new(
    values: CreatePendingUserRequest,
    setSubmitting: (isSubmitting: boolean) => void,
    setMessage: any
  ) {
    try {
      const res = url.post("/pending-list", qs.stringify(values));
      setSubmitting(false);
      setMessage({
        text: "Successfully Registered",
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

  /**
   * ## Old member registration
   * @param values form values
   */
  static old(
    values: RegisterBeneficiaryRequest,
    setSubmitting: (isSubmitting: boolean) => void,
    setMessage: any
  ) {
    const formData = new FormData();
    formData.append("image", {
      name: values.image?.split("/").pop(),
      uri: values.image,
      type: "image/jpg",
    } as unknown as Blob);
    formData.append("children", JSON.stringify(values.children));
    Object.keys(values).forEach((key) => {
      if (key !== "image" && key !== "children") {
        formData.append(key, values[key as keyof RegisterBeneficiaryRequest]);
      }
    });
    try {
      const res = url.post("/beneficiary-list", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSubmitting(false);
      setMessage({
        text: "Successfully Registered",
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
}
