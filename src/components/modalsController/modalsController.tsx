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
import { ModalsControllerProps } from "types/modal_interfaces";

const ModalsController = ({
  value,
  openType,
  loading,
  handleClose,
}: ModalsControllerProps) => {
  const { open, type } = openType;

  const dispatch = useDispatch();

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

  const handleSubmitAddForm = async (values: AddUserForm) => {
    dispatch(setLoading(true));
    const user: User = {
      ...values,
      role: "default",
      company: { companyName: (value as Company).companyName, id: value.id! },
      creator: value.creator,
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

  switch (type) {
    case ADD_USER:
      return (
        <FormModal
          open={open}
          loading={loading}
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
