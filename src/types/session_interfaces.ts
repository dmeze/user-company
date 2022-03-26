import { User } from "./user_interfaces";

export interface Session {
  id: string;
  user: User;
  role: string;
}
