import url from "../helpers/attendanceApi";

export default class visit {
  static addToAttendance(id: number, setMessage: any) {
    try {
      const res = url.post(`/visited-list/add-to-beneficiary/${id}`);
      setMessage({
        text: "Successfully added to visited list",
        type: "SUCCESS",
      });
      return true;
    } catch (error: any) {
      console.error(error);
      setMessage({
        text: error.message,
        type: "ERROR",
      });
      return false;
    }
  }
}
