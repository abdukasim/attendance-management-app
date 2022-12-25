import { err } from "react-native-svg/lib/typescript/xml";
import url from "../../helpers/url";
import { PendingListFormValues } from "../../models/pending-list-models";
import { useModalStore } from "../../store/modal-store";

export const fetchPendingList = async (
  setPendingList: React.Dispatch<React.SetStateAction<never[]>>
) => {
  try {
    const res = await url.get("/api/attendance/registration/new");
    setPendingList(res.data.list);
  } catch (error) {
    console.error(error);
  }
};

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
