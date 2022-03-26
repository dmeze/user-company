import { useState, MouseEvent, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import {
  Modal as ModalUi,
  Box,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  Stack,
  InputLabel,
  FormControl,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { User } from "types/user_interfaces";
import { State } from "store/interfaces";

import {
  getLoadingSelector,
  getUsersSelector,
} from "store/user/users.selector";
import { updateUser } from "store/user/users.thunk";
import { updateUserLoader } from "store/user/users.action";

import styles from "styles/modal.module.scss";

const ModalUser = ({
  open,
  handleClose,
  user,
  users,
  loading,
}: {
  open: boolean;
  handleClose: () => void;
  user: User;
  users: Array<User>;
  loading: boolean;
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

  const dispatch = useDispatch();

  const handleCreatorChange = ({ target }: SelectChangeEvent) => {
    setCreatorId(target.value);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(loading);
      handleClose();
    }, 1500);
  }, [loading, handleClose]);

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
    dispatch(updateUserLoader(true));
    dispatch(updateUser(user));
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
              <FormControl>
                <InputLabel id="labelId">Creator</InputLabel>
                <Select
                  labelId="labelId"
                  label="Creator"
                  onChange={handleCreatorChange}
                >
                  {users.map(({ name, id }) => (
                    <MenuItem key={id} value={id!}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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

const mapStateToProps = (state: State) => {
  return {
    users: getUsersSelector(state),
    loading: getLoadingSelector(state),
  };
};

export default connect(mapStateToProps)(ModalUser);
