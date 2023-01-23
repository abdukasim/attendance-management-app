import Toast from "react-native-root-toast";
import url from "../helpers/attendanceApi";
import { theme } from "../styles/theme";

export default class list {
  /**
   * ### fetch list data
   * @param setList list data setter
   * @param endpoint endpoint to fetch from
   */
  static async fetchList(setList: (data: []) => void, endpoint: string) {
    try {
      const res = await url.get(endpoint);
      if (endpoint === "/order-list") {
        let orderList = res.data.list.filter((item: any) => item.active);
        setList(orderList);
      } else setList(res.data.list);
    } catch (error: any) {
      console.error("fetching list error", error.message);
      if (error.code === "ECONNABORTED") {
        Toast.show("Please check your internet connection and reload screen.", {
          duration: Toast.durations.LONG,
          position: 50,
          backgroundColor: theme.colors.secondary,
          textColor: theme.colors.failure,
          opacity: 1,
        });
      } else {
        Toast.show(`${error.message}`, {
          duration: Toast.durations.LONG,
          position: 50,
          backgroundColor: theme.colors.secondary,
          textColor: theme.colors.failure,
          opacity: 1,
        });
      }
      return error;
    }
  }

  static deleteFromList(listData: any, id: number) {
    console.log(id, listData.endpoint);
    url
      .delete(`${listData.endpoint}/${id}`)
      .then((res) => {
        this.fetchList(listData.setListData, listData.endpoint);
        Toast.show("Beneficiary Deleted", {
          position: 50,
          backgroundColor: theme.colors.primary,
          textColor: theme.colors.background,
          opacity: 1,
        });
      })
      .catch((err) => {
        console.error(err);
        if (err.code === "ERR_NETWORK" || err.code === "ECONNABORTED") {
          Toast.show("Please check your internet connection and try again.", {
            duration: Toast.durations.LONG,
            position: 50,
            backgroundColor: theme.colors.secondary,
            textColor: theme.colors.failure,
            opacity: 1,
          });
        } else if (err.code === "ERR_BAD_REQUEST") {
          Toast.show("Unexpected Error. Please contact support.", {
            duration: Toast.durations.LONG,
            position: 50,
            backgroundColor: theme.colors.secondary,
            textColor: theme.colors.failure,
            opacity: 1,
          });
        } else {
          Toast.show(err.message, {
            duration: Toast.durations.LONG,
            position: 50,
            backgroundColor: theme.colors.secondary,
            textColor: theme.colors.failure,
            opacity: 1,
          });
        }
      });
  }
}
