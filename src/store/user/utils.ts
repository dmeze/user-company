import { map } from "lodash/fp";

import { User } from "types/user_interfaces";

export const handleUpdateUser = (
  { users }: { users: Array<User> },
  user: User
) => map((mappedUser: User) => (mappedUser.id === user.id ? user : mappedUser));

export const filterUserNames = (users: Array<User>) =>
  map(({ id, name }) => ({ id, name }), users);
