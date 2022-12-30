import url from "../helpers/attendanceApi";

export const fetchList = async (
  setList: any,
  endpoint: string,
  param?: object
) => {
  try {
    const res = await url.get(endpoint);
    setList(res.data.list);
  } catch (error) {
    console.error(error);
  }
};
