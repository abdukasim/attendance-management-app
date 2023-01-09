import { PendingUserModel } from "./pending-models";

export interface VisitedUserBefore extends PendingUserModel {}
export interface VisitedUserAfter {
  age: string;
  maritalStatus: string;
  children: any;
  jobStatus: string;
  shelterStatus: string;
  rentAmount: number;
  recording?: string;
  image?: string;
  remark: string;
}

export interface VisitedUserModel extends VisitedUserBefore, VisitedUserAfter {}

export interface FetchVisitedListRequest {}
export interface FetchVisitedListReponse {
  success: true;
  list: VisitedUserModel[];
}

export interface RemoveVisitedListRequest {}
export interface RemoveVisitedListResponse {
  deletedCount: number;
}
