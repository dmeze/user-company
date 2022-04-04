export const userHeader = [
  {
    Header: "Users",
    columns: [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Surname",
        accessor: "surname",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Company",
        accessor: "company",
      },
      {
        Header: "Creator",
        accessor: "creator",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Updated",
        accessor: "updatedBy",
      },
    ],
  },
];

export const companyHeader = [
  {
    Header: "Companies",
    columns: [
      {
        Header: "Company",
        accessor: "companyName",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Creator",
        accessor: "creator",
      },
      {
        Header: "Updated",
        accessor: "updatedBy",
      },
    ],
  },
];

export const companyPath = "company";

export const userPath = "user";
