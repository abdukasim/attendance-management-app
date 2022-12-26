export interface PendingListFormValues {
  id: any;
  image: string;
  recording: string;
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
