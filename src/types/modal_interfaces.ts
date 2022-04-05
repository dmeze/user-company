import {
  AddUserForm,
  EditCompanyForm,
  EditUserForm,
  Field,
  validationSchema,
} from "./form_interfaces";
import { User } from "./user_interfaces";
import { Company } from "./company_interfaces";

export interface FormModalProps {
  open: boolean;
  loading: boolean;
  fields: Array<Field>;
  initialValues: AddUserForm | EditUserForm | EditCompanyForm;
  handleClose: (type: string) => void;
  handleSubmitForm:
    | ((values: AddUserForm) => void)
    | ((values: EditUserForm) => void)
    | ((values: EditCompanyForm) => void);
  message: string;
  value?: User | Company;
  validationSchema: validationSchema;
}

export interface ModalsControllerProps {
  value?: Company | User;
  openType: { open: boolean; type: string };
  loading: boolean;
  handleClose: (type: string) => void;
}
