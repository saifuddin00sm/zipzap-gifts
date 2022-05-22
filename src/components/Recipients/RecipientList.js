import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Header from "../Header";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
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
import RecipientSuccess from "./RecipientSuccess";
import Fuse from "fuse.js";
import { Link, useNavigate } from "react-router-dom";
import { useReward } from "react-rewards";

const RecipientList = () => {
  const navigate = useNavigate();
  const { reward } = useReward("confetti-id", "confetti", {
    colors: ["#abc6bd", "#c5d5e2", "#abc4d6"],
    startVelocity: 30,
    spread: 85,
    elementSize: 18,
  });
  const { recipients, isLoading, isError, error } = useRecipients();
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState([]);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchKey = (event) => {
    if (event.key === "Escape") {
      setSearch("");
    }
  };

  useEffect(() => {
    const searchOptions = {
      tokenize: false,
      threshold: 0.3,
      keys: [
        { name: "firstName", weight: 2 },
        { name: "lastName", weight: 2 },
        "fullName",
        "jobTitle",
        "department.name",
        "birthday",
        "startDate",
      ],
    };
    if (recipients) {
      if (search) {
        const fuse = new Fuse(
          recipients.map((r) => {
            return { ...r, fullName: `${r.firstName} ${r.lastName}` };
          }),
          searchOptions
        );
        setRows(fuse.search(search).map((i) => i.item));
      } else {
        setRows(recipients);
      }
    }
  }, [search, recipients]);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setSuccess(false);
  };

  const goProfile = (id) => {
    navigate(id);
  };

  const onSuccess = () => {
    setSuccess(true);
    reward();
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
    tableBody = rows.map(
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
          <TextField
            fullWidth
            label="Search"
            variant="standard"
            value={search}
            onChange={handleSearch}
            onKeyDown={handleSearchKey}
          />
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
                    {rows?.length} Recipients
                    {rows?.length !== recipients?.length &&
                      ` (${recipients?.length} Total)`}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Container>
      </Container>
      {success ? (
        <RecipientSuccess
          text="Recipient Added Successfully!"
          subText="Press the button to send an email to gather information for customized gifting."
          open={open}
          close={handleClose}
        />
      ) : (
        <RecipientModal open={open} setOpen={setOpen} onSuccess={onSuccess} />
      )}
    </>
  );
};

export default RecipientList;
