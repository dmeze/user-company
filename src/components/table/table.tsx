import { useState, ChangeEvent } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import Link from "next/link";

import styles from "styles/table.module.scss";

const UnifyTable = ({
  header,
  rows,
  path,
  userId,
}: {
  header: Array<any>;
  rows: Array<any>;
  path: string;
  userId: string | undefined | string[];
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {header.map(({ id, label }: { id: number; label: string }) => (
                <TableCell key={id}>{label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow
                  className={
                    row.id === userId ? styles.tableRowHover : styles.tableRow
                  }
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                >
                  {header.map(({ id, key }: { id: number; key: string }) => {
                    return (
                      <>
                        <Link href={`/${path}/[id]`} as={`/${path}/${row.id}`}>
                          <TableCell key={id}>
                            {typeof row[key] === "object"
                              ? row[key].companyName
                              : row[key]}
                          </TableCell>
                        </Link>
                      </>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default UnifyTable;
