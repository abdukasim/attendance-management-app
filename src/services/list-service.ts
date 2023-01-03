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
      setList(res.data.list);
    } catch (error) {
      console.error(error);
    }
  }

  static deleteFromList(listData: any, id: number) {
    url
      .delete(`${listData.endpoint}/${id}`)
      .then((res) => {
        console.log(res.status);
        this.fetchList(listData.setListData, listData.endpoint);
      })
      .catch((err) => console.error(err));
  }
}
