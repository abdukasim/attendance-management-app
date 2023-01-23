import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import Toast from "react-native-root-toast";
import url from "../helpers/attendanceApi";
import { theme } from "../styles/theme";

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
    } catch (error: any) {
      console.error(error);
      if (error.code === "ECONNABORTED") {
        Toast.show(
          "Request timed out. Please check your internet connection and reload screen.",
          {
            duration: Toast.durations.LONG,
            position: 50,
            backgroundColor: theme.colors.secondary,
            textColor: theme.colors.failure,
            opacity: 1,
          }
        );
      } else {
        Toast.show(`${error.message}`, {
          duration: Toast.durations.LONG,
          position: 50,
          backgroundColor: theme.colors.secondary,
          textColor: theme.colors.failure,
          opacity: 1,
        });
      }
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
