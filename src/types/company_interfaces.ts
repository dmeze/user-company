import { User } from "types/user_interfaces";

export interface Company {
  address: string;
  _id?: string;
  id?: string;
  companyName: string;
  phone: string;
  creator: {
    creatorName: string;
    id: string;
  };
  users: Array<User>;
  createdBy: Date;
  updatedBy: Date;
  v?: number;
}

export interface CompanyProps {
  companies: Company[];
}

export interface CompanyStaticProps {
  params: { id: string };
}
