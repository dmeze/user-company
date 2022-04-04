import { useMemo, useState } from "react";

import {
  Column,
  useTable,
  useSortBy,
  usePagination,
  HeaderGroup,
  Cell,
  Row,
} from "react-table";
import Link from "next/link";

import {
  Paper,
  TableContainer,
  Table as TableUi,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
} from "@mui/material";
import { ArrowDropUpRounded, ArrowDropDownRounded } from "@mui/icons-material";

import { User } from "types/user_interfaces";

import styles from "styles/table.module.scss";

const Table = ({
  columns,
  data,
  path,
  userId,
}: {
  columns: readonly Column<{}>[];
  data: readonly {}[];
  path: string;
  userId?: string;
}) => {
  const memoizedColumns = useMemo(() => columns, [columns]);
  const memoizedData = useMemo(() => data, [data]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setPageSize,
    gotoPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns: memoizedColumns,
      data: memoizedData,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useSortBy,
    usePagination
  );

  const [rowsPerPage, setRowsPerPage] = useState(pageSize);

  return (
    <Paper className={styles.paper}>
      <TableContainer>
        <TableUi stickyHeader aria-label="sticky table" {...getTableProps()}>
          <TableHead>
            {headerGroups.map(
              ({ getHeaderGroupProps, headers }: HeaderGroup) => {
                const { key, ...restHeaderGroupProps } = getHeaderGroupProps();
                return (
                  <TableRow key={key} {...restHeaderGroupProps}>
                    {headers.map(
                      ({
                        getHeaderProps,
                        render,
                        isSorted,
                        isSortedDesc,
                        getSortByToggleProps,
                      }) => {
                        const { key, ...restHeaderProps } = getHeaderProps(
                          getSortByToggleProps()
                        );
                        return (
                          <TableCell
                            className={styles.tableCell}
                            key={key}
                            {...restHeaderProps}
                          >
                            {render("Header")}
                            {isSorted ? (
                              isSortedDesc ? (
                                <ArrowDropUpRounded className={styles.icon} />
                              ) : (
                                <ArrowDropDownRounded className={styles.icon} />
                              )
                            ) : (
                              ""
                            )}
                          </TableCell>
                        );
                      }
                    )}
                  </TableRow>
                );
              }
            )}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row: Row) => {
              prepareRow(row);
              const { key, ...restRowProps } = row.getRowProps();
              return (
                <TableRow
                  key={key}
                  {...restRowProps}
                  className={
                    userId === (row.original as User).id
                      ? styles.tableRowHover
                      : styles.tableRow
                  }
                >
                  {row.cells.map(({ getCellProps, render }: Cell) => {
                    const { key, ...restCellProps } = getCellProps();
                    return (
                      <Link
                        passHref={true}
                        key={key}
                        href={`/${path}/[id]`}
                        as={`/${path}/${(row.original as User).id}`}
                      >
                        <TableCell
                          className={styles.tableCell}
                          {...restCellProps}
                        >
                          {render("Cell")}
                        </TableCell>
                      </Link>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10]}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={pageIndex}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={(event, newPage) => {
                  gotoPage(newPage);
                }}
                onRowsPerPageChange={(event) => {
                  setPageSize(Number(event.target.value));
                  setRowsPerPage(Number(event.target.value));
                }}
              />
            </TableRow>
          </TableFooter>
        </TableUi>
      </TableContainer>
    </Paper>
  );
};

export default Table;
