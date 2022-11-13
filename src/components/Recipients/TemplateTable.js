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
    firstName: "Wylie",
    lastName: "Sawer",
    group: "Engineering",
    jobtitle: "Android Jr. Developer",
    birthday: "12/3/2000",
    startedDate: "4/5/2021",
    address: "122 Easy street",
    city: "Provo",
    state: "UT",
    zip: 84057,
    id: 1,
  },
  {
    firstName: "Abram",
    lastName: "McDaniel",
    group: "Human Resources",
    jobtitle: "Company Coordinator",
    birthday: "1/2/1997",
    startedDate: "1/2/2003",
    address: "484 W Bulldog Blvd",
    city: "Provo",
    state: "UT",
    zip: 84604,
    id: 2,
  },
  {
    firstName: "Stephany",
    lastName: "Cardenas",
    group: "IT",
    jobtitle: "Project Manager",
    birthday: "10/12/1992",
    startedDate: "2/14/2015",
    address: "1200 N University",
    city: "Provo",
    state: "UT",
    zip: 84606,
    id: 3,
  },
  {
    firstName: "Reed",
    lastName: "Green",
    group: "Accounting",
    jobtitle: "Manager",
    birthday: "6/3/1968",
    startedDate: "6/4/2016",
    address: "111 E 800 N",
    city: "Provo",
    state: "UT",
    zip: 84606,
    id: 4,
  },
  {
    firstName: "Tyrone",
    lastName: "Hudson",
    group: "IT",
    jobtitle: "Cloud Architect",
    birthday: "8/18/1951",
    startedDate: "12/2/2018",
    address: "1831 N State St",
    city: "Provo",
    state: "UT",
    zip: 84604,
    id: 5,
  },
];

const cells = [
  "first name",
  "last name",
  "group",
  "job title",
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
              <StyledTableCell>{row.group}</StyledTableCell>
              <StyledTableCell>{row.jobtitle}</StyledTableCell>
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
