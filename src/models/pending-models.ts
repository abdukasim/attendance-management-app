import { VisitedUserAfter } from "./visited-models";

export interface PendingUserModel {
  id: number;
  name: string;
  sex: "male" | "female" | "" | string;
  phone: string;
  address: string;
}

export interface CreatePendingUserRequest
  extends Omit<PendingUserModel, "id"> {}
export interface CreatePendingUserResponse {}

export interface FetchPendingListRequest {}
export interface FetchPendingListResponse {
  success: true;
  list: PendingUserModel[];
}

export interface RemovePendingUserRequest {}
export interface RemovePendingUserResponse {
  deletedCount: number;
}

export interface VisitPendingUserRequest extends VisitedUserAfter {
  id: number;
}
