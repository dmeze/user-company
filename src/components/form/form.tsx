import { Fragment } from "react";

import { TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Formik } from "formik";

import { FormProps } from "types/form_interfaces";

import styles from "styles/form.module.scss";

const Form = ({
  message,
  initialValues,
  validationSchema,
  fields,
  handleSubmitForm,
  loading,
  value,
}: FormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmitForm}
      validateOnBlur
      validateOnChange
      validationSchema={validationSchema}
    >
      {({
        errors,
        touched,
        isValid,
        dirty,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <div className={styles.form}>
          <Typography variant="h4">{message}</Typography>
          {fields.map(
            ({
              id,
              label,
              type,
            }: {
              id: string;
              label: string;
              type: string;
            }) => (
              <Fragment key={id}>
                <TextField
                  className={styles.field}
                  id={id}
                  label={label}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type={type}
                  defaultValue={value && (value as any)[id]}
                />
                {(errors as any)[id] && (touched as any)[id] && (
                  <Typography className={styles.error}>
                    {(errors as any)[id]}
                  </Typography>
                )}
              </Fragment>
            )
          )}
          <LoadingButton
            type="submit"
            disabled={!isValid || !dirty}
            onClick={(event) => {
              // @ts-ignore
              handleSubmit(event);
            }}
            loading={loading}
            className={styles.modalButton}
          >
            Submit
          </LoadingButton>
        </div>
      )}
    </Formik>
  );
};

export default Form;
