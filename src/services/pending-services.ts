import { VisitPendingUserRequest } from "../models/pendingUser";
import url from "../helpers/attendanceApi";

export default class pending {
  static async visitUser(
    values: VisitPendingUserRequest,
    setSubmitting: (isSubmitting: boolean) => void,
    setMessage: any
  ) {
    try {
      const res = await url.post("/api/attendance/registration/visit", values);
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
    } catch (error: any) {
      console.error(error);
      setSubmitting(false);
      setMessage({
        text: error.message,
        type: "ERROR",
      });
    }
  }
}
