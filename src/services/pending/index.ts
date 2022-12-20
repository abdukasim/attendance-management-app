import url from "../../helpers/url";

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
