export interface UserModel {
  id: number;
  name: string;
  username: string;
  password: string;
  user_type: string;
}

export interface CreateUserRequest extends Omit<UserModel, "id"> {}
export interface CreateUserResponse {}
export interface FetchUserResponse {
  success: true;
  list: Omit<UserModel, "password">[];
}
export interface RemoveUserRequest {
  id?: number | string;
  username?: string;
}
export interface RemoveUserResponse {
  deletedCount: number;
}
export interface UpdateUserRequest {
  id: number;
  user: Partial<UserModel>;
}
export interface UpdateUserResponse {
  affectedCount: number;
}
