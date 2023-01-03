import { VisitPendingUserRequest } from "../models/pending-models";
import url from "../helpers/attendanceApi";

export default class pending {
  static async visitUser(
    values: VisitPendingUserRequest,
    setSubmitting: (isSubmitting: boolean) => void,
    setMessage: any
  ) {
    const formData = new FormData();
    formData.append("image", {
      name: values.image?.split("/").pop(),
      uri: values.image,
      type: "image/jpg",
    } as unknown as Blob);
    formData.append("recording", {
      name: values.recording?.split("/").pop(),
      uri: values.recording,
      type: "audio/m4a",
    } as unknown as Blob);
    formData.append("children", JSON.stringify(values.children));
    Object.keys(values).forEach((key) => {
      if (key !== "image" && key !== "recording" && key !== "children") {
        formData.append(key, values[key as keyof VisitPendingUserRequest]);
      }
    });

    try {
      const res = await url.post("/pending-list/visit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSubmitting(false);
      setMessage({
        text: "Successfully added to visited list",
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
