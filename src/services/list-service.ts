import url from "../helpers/attendanceApi";

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
    } catch (error) {
      console.error("fetching list error", error);
    }
  }

  static deleteFromList(listData: any, id: number) {
    url
      .delete(`${listData.endpoint}/${id}`)
      .then((res) => {
        this.fetchList(listData.setListData, listData.endpoint);
      })
      .catch((err) => console.error(err));
  }
}
