import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import url from "../helpers/attendanceApi";

export class reports {
  static onDateChange(
    event: DateTimePickerEvent,
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    setDate: React.Dispatch<
      React.SetStateAction<{
        timestamp: Date;
        date: string;
      }>
    >
  ) {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let date = new Date(event.nativeEvent.timestamp!);
    let month = date.getMonth();
    let day = date.getDate();
    setShow(false);
    setDate({
      timestamp: date,
      date: `${monthNames[month]} ${day}`,
    });
  }

  static async getAttendanceReport(
    startDate: any,
    endDate: any,
    setAttendanceReport: any,
    setCount: React.Dispatch<
      React.SetStateAction<{
        present: number;
        absent: number;
        permission: number;
      }>
    >
  ) {
    try {
      const res = await url.get("/report", {
        params: {
          start: startDate,
          end: endDate,
        },
      });
      setCount({
        present: res.data.report.total.present,
        absent: res.data.report.total.absent,
        permission: res.data.report.total.permission,
      });
      setAttendanceReport(res.data.report.list);
    } catch (error) {
      console.error(error);
    }
  }

  static async getAbsentReport(
    startDate: any,
    endDate: any,
    setAbsentReport: any
  ) {
    try {
      const res = await url.get("/report/absent", {
        params: {
          start: startDate,
          end: endDate,
        },
      });
      setAbsentReport(res.data.list);
    } catch (error) {
      console.error(error);
    }
  }
}
