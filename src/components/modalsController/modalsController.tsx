import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";

import FormModal from "components/formModal";

import {
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
} from "components/modalsController/constants";
import {
  addUserMessage,
  editUserMessage,
  editCompanyMessage,
} from "constants/constants";

import { State } from "store/interfaces";
import {
  AddUserForm,
  EditCompanyForm,
  EditUserForm,
} from "types/form_interfaces";
import { Company } from "types/company_interfaces";
import { User } from "types/user_interfaces";

const ModalsController = ({
  value,
  openType,
  loading,
  handleClose,
}: {
  value: Company | User;
  openType: { open: boolean; type: string };
  loading: boolean;
  handleClose: (type: string) => void;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { open, type } = openType;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(loading);
      handleClose(type);
    }, 1500);
  }, [loading]);

  const dispatch = useDispatch();

  const handleSubmitEditCompanyForm = (values: EditCompanyForm) => {
    setIsLoading(true);
    const newCompany: Company = {
      ...(value as Company),
      ...values,
      updatedBy: new Date(),
    };
    dispatch(setLoading(true));
    dispatch(updateCompany(newCompany));
  };

  const handleSubmitEditUserForm = (values: EditUserForm) => {
    setIsLoading(true);
    const newUser: User = {
      ...(value as User),
      ...values,
      updatedBy: new Date(),
    };
    dispatch(setLoading(true));
    dispatch(updateUser(newUser));
  };

  const handleSubmitAddForm = async (values: AddUserForm) => {
    setIsLoading(true);
    const user: User = {
      ...values,
      role: "default",
      company: { companyName: (value as Company).companyName, id: value.id! },
      creator: value.creator,
      createdBy: new Date(),
      updatedBy: new Date(),
    };
    (value as Company).users.push(user);
    dispatch(setLoading(true));
    dispatch(addUserToCompany(value as Company));
    dispatch(addNewUser(user));
  };

  switch (type) {
    case ADD_USER:
      return (
        <FormModal
          open={open}
          loading={isLoading}
          message={addUserMessage}
          handleClose={() => handleClose(type)}
          handleSubmitForm={handleSubmitAddForm}
          validationSchema={addUserValidationSchema}
          initialValues={addUserInitialValues}
          fields={addUserFields}
        />
      );
    case EDIT_COMPANY:
      return (
        <FormModal
          open={open}
          loading={isLoading}
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
          loading={isLoading}
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
