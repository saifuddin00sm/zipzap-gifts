import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
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
    date: "December 1st 2020",
    totalGifts: 21,
    subsCost: 18,
    totalCost: 20,
    id: 1,
  },
  {
    date: "January 2st 2010",
    totalGifts: 23,
    subsCost: 22,
    totalCost: 14,
    id: 2,
  },
  {
    date: "February 2nd 2021",
    totalGifts: 14,
    subsCost: 22,
    totalCost: 33,
    id: 3,
  },
  {
    date: "December 3rd 2014",
    totalGifts: 11,
    subsCost: 44,
    totalCost: 30,
    id: 4,
  },
  {
    date: "June 1st 2004",
    totalGifts: 22,
    subsCost: 66,
    totalCost: 88,
    id: 5,
  },
];

export default function DataTable() {
  return (
    <TableContainer component={Paper}>
      <Box sx={{ background: "#343436", color: "#ffff" }}>
        <Typography
          variant="h6"
          sx={{
            padding: "16px",
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "28px",
            lineHeight: "42px",
            color: "#FFFFFF",
          }}
        >
          Statements
        </Typography>
      </Box>
      <Table aria-label="order statements">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell align="right">Total Gifts</StyledTableCell>
            <StyledTableCell align="right">Subscription Cost</StyledTableCell>
            <StyledTableCell align="right">Total Cost</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.date}
              </StyledTableCell>
              <StyledTableCell align="right">{row.totalGifts}</StyledTableCell>
              <StyledTableCell align="right">{row.subsCost}</StyledTableCell>
              <StyledTableCell align="right">{row.totalCost}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <Box
        sx={{
          background: "#F1F1F1",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
        }}
      >
        <Box />
        <Button variant="contained">Email For Statement</Button>
      </Box>
    </TableContainer>
  );
}
