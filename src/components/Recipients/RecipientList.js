import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Header from "../Header";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import { useRecipients } from "../../hooks/recipients";

const RecipientList = () => {
  const { recipients, isLoading, isError, error } = useRecipients();

  let tableBody;
  if (isLoading) {
    tableBody = (
      <TableRow>
        <TableCell>
          <Skeleton variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton variant="text" />
        </TableCell>
      </TableRow>
    );
  } else if (isError) {
    tableBody = (
      <TableRow>
        <TableCell colSpan={6}>
          Error loading recipients: {error.message}
        </TableCell>
      </TableRow>
    );
  } else {
    tableBody = recipients.map(
      ({
        id,
        firstName,
        lastName,
        birthday,
        shippingAddress: { address1, address2, city, state, zip } = {},
        jobTitle,
        startDate,
        department,
      }) => (
        <TableRow key={id}>
          <TableCell>
            {firstName} {lastName}
          </TableCell>
          <TableCell>{birthday}</TableCell>
          <TableCell>
            {address1} {address2}
            <br />
            {city}, {state} {zip}
          </TableCell>
          <TableCell>{jobTitle}</TableCell>
          <TableCell>{startDate}</TableCell>
          <TableCell>{department?.name}</TableCell>
        </TableRow>
      )
    );
  }

  return (
    <Container component="main">
      <Header>
        <Typography variant="h1">Recipient Dashboard</Typography>
        <Box>
          <Button sx={{ mx: 2 }}>Import A List</Button>
          <Button>Add A Recipient</Button>
        </Box>
      </Header>
      <Container>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Birthday</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Job Title</TableCell>
                <TableCell>Date Started</TableCell>
                <TableCell>Department</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{tableBody}</TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={6}>
                  {recipients?.length} Recipients
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Container>
    </Container>
  );
};

export default RecipientList;
