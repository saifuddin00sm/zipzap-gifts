import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#ABC4D6",
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const rows = [
  {
    firstName: "wyle",
    lastName: "sawer",
    department: "engineering",
    title: "android Jr. developer",
    birthday: "12/3/2000",
    startedDate: "4/5/2021",
    address: "12 Easy street",
    city: "provo",
    state: "UT",
    zip: 83839,
    id: 1,
  },
  {
    firstName: "wyle",
    lastName: "sawer",
    department: "engineering",
    title: "android Jr. developer",
    birthday: "12/3/2000",
    startedDate: "4/5/2021",
    address: "12 Easy street",
    city: "provo",
    state: "UT",
    zip: 83839,
    id: 2,
  },
  {
    firstName: "wyle",
    lastName: "sawer",
    department: "engineering",
    title: "android Jr. developer",
    birthday: "12/3/2000",
    startedDate: "4/5/2021",
    address: "12 Easy street",
    city: "provo",
    state: "UT",
    zip: 83839,
    id: 3,
  },
  {
    firstName: "John",
    lastName: "doe",
    department: "marketing",
    title: "marketing manager",
    birthday: "3/3/2002",
    startedDate: "5/5/2020",
    address: "5093 easy street",
    city: "provo",
    state: "UT",
    zip: 83839,
    id: 4,
  },
];

const cells = [
  "first name",
  "last name",
  "department",
  "title",
  "birthday",
  "date started",
  "address",
  "city",
  "state",
  "zip",
];

export default function TemplateTable() {
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {cells.map((cell) => (
              <StyledTableCell key={cell} sx={{ textTransform: "capitalize" }}>
                {cell}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {row.firstName}
              </StyledTableCell>
              <StyledTableCell>{row.lastName}</StyledTableCell>
              <StyledTableCell>{row.department}</StyledTableCell>
              <StyledTableCell>{row.title}</StyledTableCell>
              <StyledTableCell>{row.birthday}</StyledTableCell>
              <StyledTableCell>{row.startedDate}</StyledTableCell>
              <StyledTableCell>{row.address}</StyledTableCell>
              <StyledTableCell>{row.city}</StyledTableCell>
              <StyledTableCell>{row.state}</StyledTableCell>
              <StyledTableCell>{row.zip}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
