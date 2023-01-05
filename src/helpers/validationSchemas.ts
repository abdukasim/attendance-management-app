import * as yup from "yup";

export const OldMemberRegistrationValidationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/(\w.+\s).+/, "Enter at least 2 names")
    .required("Full name is required"),
  age: yup.number().required("Age is required"),
  sex: yup.string().required("Sex is required"),
  address: yup.string().required("Address is required"),
  phone: yup
    .string()
    .matches(/(09)(\d){8}\b/, "Enter a valid phone number")
    .required("Phone number is required"),
  shelterStatus: yup.string().required("Shelter Status is required"),
  jobStatus: yup.string().required("Job Status is required"),
  maritalStatus: yup.string().required("Marital Status is required"),
});

export const PendingListValidationSchema = yup.object().shape({
  age: yup
    .number()
    .required("Age is required")
    .typeError("Please enter a number"),
  shelterStatus: yup.string().required("Shelter Status is required"),
  jobStatus: yup.string().required("Job Status is required"),
  maritalStatus: yup.string().required("Marital Status is required"),
});

export const LoginValidationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export const NewMemberRegistrationValidationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/(\w.+\s).+/, "Enter at least 2 names")
    .required("Full name is required"),
  phone: yup
    .string()
    .matches(/(09)(\d){8}\b/, "Enter a valid phone number")
    .required("Phone number is required"),
  address: yup.string().required("Address is required"),
  sex: yup.string().matches(/Male/i).required("Sex is required"),
});
