import { useState, MouseEvent } from "react";
import {
  Modal as ModalUi,
  Box,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  Stack,
  InputLabel,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { updateUser } from "api/user";
import styles from "styles/modal.module.scss";
import { User } from "types/user_interfaces";

const ModalUser = ({
  open,
  handleClose,
  user,
  users,
}: {
  open: boolean;
  handleClose: () => void;
  user: User;
  users: Array<User>;
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

  const [creatorId, setCreatorId] = useState<string>(user.creator.id);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreatorChange = ({ target }: SelectChangeEvent) => {
    setCreatorId(target.value);
  };

  const handleSaveChanges = (event: MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    Object.values((event.target as HTMLFormElement).form).map((input) => {
      const { value, id } = input as { value: string; id: string };
      if (value && id) {
        if (user[id as keyof User] !== value) {
          // @ts-ignore
          user[id as keyof User] = value;
        }
      }
      user.creator.id = creatorId;
      user.creator.creatorName = users.find(
        (user) => user.id == creatorId
      )!.name;
    });
    updateUser(user).then(() => {
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
          <Stack direction="row" spacing={2}>
            <Stack spacing={2}>
              <TextField
                id="name"
                required
                label="Name"
                defaultValue={user.name}
              />
              <TextField
                id="surname"
                required
                label="Surname"
                defaultValue={user.surname}
              />
              <TextField
                id="phone"
                required
                label="Phone"
                defaultValue={user.phone}
              />
            </Stack>
            <Stack spacing={2}>
              <TextField
                id="email"
                required
                label="Email"
                defaultValue={user.email}
              />
              <TextField
                id="password"
                required
                type="password"
                label="Password"
                defaultValue={user.password}
              />
              <InputLabel id="labelId">Users</InputLabel>
              <Select
                labelId="labelId"
                label="Users"
                onChange={handleCreatorChange}
              >
                {users.map(({ name, id }) => (
                  <MenuItem key={id} value={id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
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

export default ModalUser;
