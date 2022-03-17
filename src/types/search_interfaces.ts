import { User } from "./user_interfaces";

export interface SearchProps {
  options: Array<User>;
}

export interface HandleInputProps {
  target: {
    value: string;
  };
}

export interface HandleAutoCompleteProps {
  target: { innerHTML: string };
}
