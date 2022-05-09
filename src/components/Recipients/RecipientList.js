import React, { useState } from "react";
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
import RecipientModal from "./RecipientModal";
import { Link, useNavigate } from "react-router-dom";

const RecipientList = () => {
  const navigate = useNavigate();
  const { recipients, isLoading, isError, error } = useRecipients();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const goProfile = (id) => {
    navigate(id);
  };

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
        <TableRow
          hover
          key={id}
          onClick={() => goProfile(id)}
          style={{ cursor: "pointer" }}
        >
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
    <>
      <Container component="main">
        <Header>
          <Typography variant="h1">Recipient Dashboard</Typography>
          <Box display="flex">
            <Link
              to="upload"
              style={{
                textDecoration: "none",
                color: "#000",
                margin: "0 20px",
              }}
            >
              <Button>Import a List</Button>
            </Link>
            <Button onClick={handleOpen}>Add A Recipient</Button>
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
      <RecipientModal
        open={open}
        setOpen={setOpen}
        onClose={handleClose}
        closeAfterTransition={true}
      />
    </>
  );
};

export default RecipientList;
