import { useState, MouseEvent, useEffect } from "react";
import {
  Modal as ModalUi,
  Box,
  TextField,
  Select,
  MenuItem,
  Stack,
  InputLabel,
  IconButton,
  FormControl,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import styles from "styles/modal.module.scss";
import { Company } from "types/company_interfaces";
import { User } from "types/user_interfaces";
import { updateCompany } from "api/company";
import { Delete } from "@mui/icons-material";

const ModalCompany = ({
  open,
  handleClose,
  company,
}: {
  open: boolean;
  handleClose: () => void;
  company: Company;
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    p: 4,
  };

  useEffect(() => {
    setUsers(company.users);
  }, [open, company.users]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [users, setUsers] = useState<Array<User>>(company.users);

  const handleDeleteUser = (id: string) => {
    setUsers(
      company.users.filter((user) => {
        return user.id !== id;
      })
    );
  };

  const handleSaveChanges = (event: MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    Object.values((event.target as HTMLFormElement).form).map((input) => {
      const { value, id } = input as { value: string; id: string };
      if (value && id) {
        if (company[id as keyof Company] !== value) {
          // @ts-ignore
          company[id as keyof Company] = value;
        }
      }
    });
    company.users = users;
    updateCompany(company).then(() => {
      setTimeout(() => {
        setIsLoading(false);
        handleClose();
      }, 1000);
    });
  };
  return (
    <ModalUi
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          className={styles.modalBox}
        >
          <Stack spacing={2}>
            <TextField
              id="name"
              required
              label="Name"
              defaultValue={company.companyName}
            />
            <TextField
              id="address"
              required
              label="Address"
              defaultValue={company.address}
            />
            <TextField
              id="phone"
              required
              label="Phone"
              defaultValue={company.phone}
            />
            {users.length && (
              <FormControl className={styles.form}>
                <InputLabel id="labelId">Users</InputLabel>
                <Select labelId="labelId" label="Users">
                  {users.map(({ name, id }) => (
                    <MenuItem key={id}>
                      {name}
                      <IconButton
                        aria-label="delete"
                        disabled={users.length < 1}
                        onClick={() => handleDeleteUser(id!)}
                      >
                        <Delete />
                      </IconButton>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Stack>
          <LoadingButton
            onClick={handleSaveChanges}
            loading={isLoading}
            className={styles.modalButton}
          >
            Save
          </LoadingButton>
        </Box>
      </Box>
    </ModalUi>
  );
};

export default ModalCompany;
