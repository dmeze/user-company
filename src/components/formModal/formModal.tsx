import { Modal, Box } from "@mui/material";

import Form from "components/form";

import { FormModalProps } from "types/modal_interfaces";

import styles from "styles/modal.module.scss";

const FormModal = ({
  open,
  loading,
  initialValues,
  fields,
  handleClose,
  handleSubmitForm,
  message,
  value,
  validationSchema,
}: FormModalProps) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={styles.modal}>
        <Form
          loading={loading}
          handleClose={handleClose}
          message={message}
          validationSchema={validationSchema}
          fields={fields}
          initialValues={initialValues}
          handleSubmitForm={handleSubmitForm}
          value={value}
        />
      </Box>
    </Modal>
  );
};

export default FormModal;
