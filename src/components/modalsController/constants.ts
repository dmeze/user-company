import * as yup from "yup";
import "yup-phone";

import {
  AddUserForm,
  EditCompanyForm,
  EditUserForm,
  Field,
} from "types/form_interfaces";
import { Company } from "types/company_interfaces";
import { User } from "types/user_interfaces";

export const ADD_USER = "ADD_USER";

export const EDIT_COMPANY = "EDIT_COMPANY";

export const EDIT_USER = "EDIT_USER";

export const addUserInitialValues: AddUserForm = {
  name: "",
  surname: "",
  phone: "",
  email: "",
  password: "",
};

export const editCompanyInitialValues: (
  company: Company
) => EditCompanyForm = ({ companyName, address, phone }) => ({
  companyName,
  address,
  phone,
});

export const editUserInitialValues: (user: User) => EditUserForm = ({
  name,
  surname,
  phone,
  email,
  password,
}) => ({
  name,
  surname,
  phone,
  email,
  password,
});

export const addUserFields: Array<Field> = [
  {
    id: "name",
    label: "Name",
    type: "text",
  },
  {
    id: "surname",
    label: "Surname",
    type: "text",
  },
  {
    id: "phone",
    label: "Phone",
    type: "text",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
  },
  {
    id: "password",
    label: "Password",
    type: "password",
  },
];

export const editCompanyFields: Array<Field> = [
  {
    id: "companyName",
    label: "CompanyName",
    type: "text",
  },
  {
    id: "address",
    label: "Address",
    type: "text",
  },
  {
    id: "phone",
    label: "Phone",
    type: "text",
  },
];

export const editUserFields: Array<Field> = addUserFields;

export const addUserValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name is too short")
    .max(20, "Name is too long")
    .matches(/^[aA-zZ\s]+$/, "Name must contain only letters")
    .required("Name is required!"),
  surname: yup
    .string()
    .min(2, "Surname is too short")
    .max(20, "Surname is too long")
    .matches(/^[aA-zZ\s]+$/, "Surname must contain only letters")
    .required("Surname is required!"),
  phone: yup
    .string()
    .phone("UA", true, "Phone format is +380*********")
    .required("Phone is required!"),
  email: yup.string().email("Invalid email!").required("Email is required!"),
  password: yup
    .string()
    .min(8, "Password must be more than 8 letters.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
    .matches(/[0-9]/, "Password must contain numbers.")
    .matches(/[A-Z]/, "Password must contain at least one big letter.")
    .required("Password is required!"),
});

export const editUserValidationSchema = addUserValidationSchema;

export const editCompanyValidationSchema = yup.object().shape({
  companyName: yup
    .string()
    .min(2, "Company name is too short.")
    .max(20, "Company name is too long")
    .required("Company name is required!"),
  address: yup
    .string()
    .min(2, "Address is too short.")
    .max(20, "Address is too long")
    .required("Address is required!"),
  phone: yup
    .string()
    .phone("UA", true, "Phone format is +380*********")
    .required("Phone is required!"),
});
