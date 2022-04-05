import {
  addUserValidationSchema,
  editCompanyValidationSchema,
  editUserValidationSchema,
} from "components/modalsController/constants";

import { User } from "types/user_interfaces";
import { Company } from "types/company_interfaces";

export type validationSchema =
  | typeof addUserValidationSchema
  | typeof editCompanyValidationSchema
  | typeof editUserValidationSchema;

export interface FormProps {
  message: string;
  initialValues: any;
  validationSchema: validationSchema;
  fields: Array<Field>;
  handleSubmitForm: any;
  handleClose: (type: string) => void;
  loading: boolean;
  value?: User | Company;
}

export interface Field {
  id: string;
  label: string;
  type: string;
}

export interface AddUserForm {
  name: string;
  surname: string;
  password: string;
  phone: string;
  email: string;
}

export interface AddCompanyForm {
  companyName: string;
  address: string;
  phone: string;
}

export interface EditCompanyForm {
  companyName: string;
  address: string;
  phone: string;
}

export interface EditUserForm {
  name: string;
  surname: string;
  phone: string;
  email: string;
  password: string;
}
