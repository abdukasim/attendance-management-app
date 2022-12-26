import url from "../../helpers/url";

export function login(
  credentials: any,
  navigation: any,
  setErrorMessage: any,
  setSubmitting: any
) {
  url
    .post("/api/session", credentials)
    .then((res) => {
      if (res.status == 200) {
        navigation.replace(res.data.type);
      }
      setSubmitting(false);
    })
    .catch((err) => {
      if (!err.response) {
        setErrorMessage(err.message);
      } else setErrorMessage(err.response.data.description);
      setSubmitting(false);
    });
}
