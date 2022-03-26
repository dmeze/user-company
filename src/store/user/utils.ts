import { User } from "types/user_interfaces";

export const handleUpdateUser = (
  { users }: { users: Array<User> },
  user: User
) => {
  return users.map((mappedUser) => {
    return mappedUser.id === user.id ? user : mappedUser;
  });
};

export const filterUserNames = (users: Array<User>) => {
  return users.map(({ id, name }) => {
    return { id, name };
  });
};
