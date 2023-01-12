import { VisitedUserModel } from "./visited-models";

export interface BeneficiaryModel extends Omit<VisitedUserModel, "recording"> {
  muntahaId: string;
  beneficiaryStatus?: {
    status: "present" | "absent" | "permission";
  };
}

export interface FetchBeneficiaryListRequest {}
export interface FetchBeneficiaryListResponse {
  success: true;
  list: BeneficiaryModel[];
}

export interface RegisterBeneficiaryRequest
  extends Omit<BeneficiaryModel, "id" | "muntahaId"> {}

export interface RegisterBeneficiaryResponse {}

export interface UpdateBeneficiaryRequest extends Partial<BeneficiaryModel> {
  id: number;
}
export interface UpdateBeneficiaryResponse {}

export interface RemoveBeneficiaryRequest {}
export interface RemoveBeneficiaryResponse {
  deletedCount: number;
}
