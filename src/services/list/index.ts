import url from "../../helpers/url";

export const fetchList = async (
  setList: any,
  endpoint: string,
  param?: object
) => {
  try {
    const res = await url.get(endpoint, {
      params: param,
    });
    setList(res.data.list);
  } catch (error) {
    console.error(error);
  }
};
