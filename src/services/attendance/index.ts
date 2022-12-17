import url from "../../helpers/url";

export const fetchAttendanceList = async (
  setAttendanceList: React.Dispatch<React.SetStateAction<never[]>>
) => {
  try {
    const res = await url.get("/api/attendance/client");
    setAttendanceList(res.data.list);
  } catch (error) {
    console.error(error);
  }
};

export const presentAttendee = async () => {};

export const permessionAttendee = async () => {};
