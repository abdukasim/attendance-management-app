import * as yup from "yup";

export const OldMemberRegistrationValidationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/(\w.+\s).+/, "Enter at least 2 names")
    .required("Full name is required"),
  age: yup.number().required("Age is required"),
  sex: yup.string().nullable().required("Sex is required"),
  image: yup.string().required("Image is required"),
  address: yup.string().required("Address is required"),
  phone: yup
    .string()
    .matches(/(0[79])(\d){8}\b/, "Enter a valid phone number")
    .required("Phone number is required"),
  shelterStatus: yup.string().nullable().required("Shelter Status is required"),
  jobStatus: yup.string().required("Job Status is required"),
  maritalStatus: yup.string().nullable().required("Marital Status is required"),
});

export const PendingListValidationSchema = yup.object().shape({
  age: yup
    .number()
    .required("Age is required")
    .typeError("Please enter a number"),
  image: yup.string().required("Image is required"),
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
    .matches(/(0[79])(\d){8}\b/, "Enter a valid phone number")
    .required("Phone number is required"),
  address: yup.string().required("Address is required"),
  sex: yup.string().matches(/Male/i).required("Sex is required"),
});
