import axios from "axios";
import url from "../helpers/attendanceApi";
import { RegisterBeneficiaryRequest } from "../models/beneficiary-models";
import { CreatePendingUserRequest } from "../models/pending-models";
import qs from "qs";
export class registration {
  /**
   * ## New member registration
   * @param formData form values
   */
  static async new(formData: CreatePendingUserRequest) {
    url
      .post("/pending-list", qs.stringify(formData))
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
