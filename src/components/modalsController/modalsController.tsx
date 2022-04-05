import { connect, useDispatch } from "react-redux";

import FormModal from "components/formModal";

import {
  addNewCompany,
  addUserToCompany,
  updateCompany,
} from "store/companies/companies.thunk";
import { addNewUser, updateUser } from "store/user/users.thunk";
import { setLoading } from "store/loading/loading.action";
import { getLoadingSelector } from "store/loading/loading.selector";

import {
  addUserValidationSchema,
  addUserFields,
  addUserInitialValues,
  ADD_USER,
  EDIT_COMPANY,
  editCompanyValidationSchema,
  editCompanyFields,
  editCompanyInitialValues,
  EDIT_USER,
  editUserInitialValues,
  editUserFields,
  editUserValidationSchema,
  ADD_COMPANY,
  addCompanyFields,
  addCompanyValidationSchema,
  addCompanyInitialValues,
} from "components/modalsController/constants";
import {
  addUserMessage,
  addCompanyMessage,
  editUserMessage,
  editCompanyMessage,
} from "constants/constants";

import { State } from "store/interfaces";
import {
  AddCompanyForm,
  AddUserForm,
  EditCompanyForm,
  EditUserForm,
} from "types/form_interfaces";
import { Company } from "types/company_interfaces";
import { User } from "types/user_interfaces";
import { ModalsControllerProps } from "types/modal_interfaces";
import { useSession } from "next-auth/react";

const ModalsController = ({
  value,
  openType,
  loading,
  handleClose,
}: ModalsControllerProps) => {
  const { open, type } = openType;

  const dispatch = useDispatch();

  const { data: session } = useSession();

  const handleSubmitEditCompanyForm = (values: EditCompanyForm) => {
    dispatch(setLoading(true));
    const newCompany: Company = {
      ...(value as Company),
      ...values,
      updatedBy: new Date(),
    };
    setTimeout(() => {
      dispatch(updateCompany(newCompany));
      handleClose(type);
    }, 1500);
  };

  const handleSubmitEditUserForm = (values: EditUserForm) => {
    dispatch(setLoading(true));
    const newUser: User = {
      ...(value as User),
      ...values,
      updatedBy: new Date(),
    };
    setTimeout(() => {
      dispatch(updateUser(newUser));
      handleClose(type);
    }, 1500);
  };

  const handleSubmitAddUserForm = async (values: AddUserForm) => {
    dispatch(setLoading(true));
    const user: User = {
      ...values,
      role: "default",
      company: { companyName: (value as Company).companyName, id: value!.id! },
      creator: value!.creator,
      createdBy: new Date(),
      updatedBy: new Date(),
    };
    (value as Company).users.push(user);
    setTimeout(() => {
      dispatch(addUserToCompany(value as Company));
      dispatch(addNewUser(user));
      handleClose(type);
    }, 1500);
  };

  const handleSubmitAddCompanyForm = async (values: AddCompanyForm) => {
    dispatch(setLoading(true));
    const company: Company = {
      ...values,
      users: [],
      createdBy: new Date(),
      updatedBy: new Date(),
      creator: {
        creatorName: session!.user!.name as string,
        id: session!.id as string,
      },
    };
    setTimeout(() => {
      dispatch(addNewCompany(company));
      handleClose(type);
    }, 1500);
  };

  switch (type) {
    case ADD_USER:
      return (
        <FormModal
          open={open}
          loading={loading}
          message={addUserMessage}
          handleClose={() => handleClose(type)}
          handleSubmitForm={handleSubmitAddUserForm}
          validationSchema={addUserValidationSchema}
          initialValues={addUserInitialValues}
          fields={addUserFields}
        />
      );
    case ADD_COMPANY:
      return (
        <FormModal
          open={open}
          loading={loading}
          message={addCompanyMessage}
          handleClose={() => handleClose(type)}
          handleSubmitForm={handleSubmitAddCompanyForm}
          validationSchema={addCompanyValidationSchema}
          initialValues={addCompanyInitialValues}
          fields={addCompanyFields}
        />
      );
    case EDIT_COMPANY:
      return (
        <FormModal
          open={open}
          loading={loading}
          message={editCompanyMessage}
          handleClose={() => handleClose(type)}
          handleSubmitForm={handleSubmitEditCompanyForm}
          validationSchema={editCompanyValidationSchema}
          initialValues={editCompanyInitialValues(value as Company)}
          fields={editCompanyFields}
          value={value}
        />
      );
    case EDIT_USER:
      return (
        <FormModal
          open={open}
          loading={loading}
          message={editUserMessage}
          handleClose={() => handleClose(type)}
          handleSubmitForm={handleSubmitEditUserForm}
          validationSchema={editUserValidationSchema}
          initialValues={editUserInitialValues(value as User)}
          fields={editUserFields}
          value={value}
        />
      );
    default:
      return null;
  }
};

const mapStateToProps = (state: State) => {
  return {
    loading: getLoadingSelector(state),
  };
};

export default connect(mapStateToProps)(ModalsController);
