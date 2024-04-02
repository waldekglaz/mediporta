import { useState, useMemo, MouseEvent, ChangeEvent } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import { EnhancedTableHead } from "./EnhancedTableHead";
import { useTableContext } from "../context";
import { Data, TOrder } from "../types";
import { getComparator, stableSort } from "../utils";

export default function EnhancedTable() {
  const [order, setOrder] = useState<TOrder>("desc");
  const [orderBy, setOrderBy] = useState<keyof Data>("count");

  const [page, setPage] = useState(0);
  const { loading, data, elementsPerPage, setElementsPerPage } =
    useTableContext();

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setElementsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * elementsPerPage - data.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(data, getComparator(order, orderBy)).slice(
        page * elementsPerPage,
        page * elementsPerPage + elementsPerPage
      ),
    [order, orderBy, page, elementsPerPage, data]
  );
  return (
    <Box>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 4,
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Paper sx={{ mb: 2 }}>
          <TableContainer>
            <Table sx={{ width: 320 }} aria-labelledby="tableTitle">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={data.length}
              />
              <TableBody sx={{ width: 320 }}>
                {visibleRows.map((row, index) => {
                  return (
                    <TableRow tabIndex={-1} key={row.name}>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        sx={{ pl: 2 }}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.count}</TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={2} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={data.length}
            rowsPerPage={elementsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[elementsPerPage]}
          />
        </Paper>
      )}
    </Box>
  );
}
