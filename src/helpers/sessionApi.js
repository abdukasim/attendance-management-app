import axios from "axios";
import { SESSION_API_URL } from "@env";

export default axios.create({
  baseURL: SESSION_API_URL,
  headers: { "content-type": "application/x-www-form-urlencoded" },
  timeout: 10000,
});
