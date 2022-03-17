export interface User {
  _id?: string;
  id?: string;
  name: string;
  surname: string;
  phone: string;
  creator: {
    id: string;
    creatorName: string;
  };
  company: {
    id: string;
    companyName: string;
  };
  email: string;
  password: string;
  createdBy: Date;
  updatedBy: Date;
  role: string;
  v: number;
}

export interface UserProps {
  users: User[];
}

export interface UserStaticProps {
  params: { id: string };
}

export interface CreatorModalState {
  id: string;
  creatorName: string;
}
