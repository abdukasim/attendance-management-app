import url from "../../helpers/url";

export function login(credentials: any, navigation:any) {
    url
      .post("/api/session", credentials)
      .then((res) => {
        if (res.status == 200) {
          navigation.replace(res.data.type);
        }
      })
      .catch((err) => {
        console.error(err)
        // if (!err.response) {
        //   handleMessage(err.message);
        // } else handleMessage(err.response.data.description);
        // setSubmitting(false);
      });
}