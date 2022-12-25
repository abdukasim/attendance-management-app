import { err } from "react-native-svg/lib/typescript/xml";
import url from "../../helpers/url";
import { PendingListFormValues } from "../../models/pending-list-models";

export const handlePendingListForm = async (
  values: PendingListFormValues,
  setSubmitting: (isSubmitting: boolean) => void,
  setMessage: any
) => {
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
};
