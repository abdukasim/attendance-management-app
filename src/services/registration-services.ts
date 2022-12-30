import axios from "axios";
import url from "../helpers/attendanceApi";
import { RegisterBeneficiaryRequest } from "../models/beneficiary-models";
import { CreatePendingUserRequest } from "../models/pending-models";

export class registration {
  /**
   * ## New member registration
   * @param formData form values
   */
  static async new(formData: CreatePendingUserRequest) {
    axios
      .post("http://192.168.1.7:5000/api/v0/pending-list", formData)
      .then((res) => console.log(res.status))
      .catch((err) => console.error(err));
  }

  /**
   * ## Old member registration
   * @param formData form values
   */
  static async old(formData: RegisterBeneficiaryRequest) {
    try {
      const res = url.post("/beneficiary-list", formData);
    } catch (error) {}
  }
}
