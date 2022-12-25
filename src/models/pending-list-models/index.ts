export interface PendingListFormValues {
  id: any;
  image: string;
  audio: string;
  age: string;
  maritalStatus: string;
  children: {
    name: string;
    age: string;
    schooling: string;
  }[];
  jobStatus: string;
  shelterStatus: string;
  rent: string;
  remark: string;
}
