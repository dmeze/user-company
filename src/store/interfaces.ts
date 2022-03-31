import { User } from "types/user_interfaces";
import { Company } from "types/company_interfaces";

export interface State {
  user: { users: Array<User> };
  company: { companies: Array<Company> };
  loading: { loading: boolean };
}
