import React from "react";
import {
  Heading,
  View,
  TextField,
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  TableFoot,
  Placeholder,
} from "@aws-amplify/ui-react";
import { Button } from "react-bootstrap";
import { useRecipients } from "../../hooks/recipients";

import "@aws-amplify/ui-react/styles.css";

const RecipientList = () => {
  const { recipients, isLoading, isError, error } = useRecipients();

  let tableBody;
  if (isLoading) {
    tableBody = (
      <TableRow>
        <TableCell colSpan="6">
          <Placeholder />
        </TableCell>
      </TableRow>
    );
  } else if (isError) {
    tableBody = (
      <TableRow>
        <TableCell colSpan="6">
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
    <main style={styles.main}>
      <View style={styles.header} className="page-header">
        <Heading level={1} style={styles.title}>
          Recipient Dashboard
        </Heading>
        <Button style={styles.button} variant="blue">
          Import A List
        </Button>
        <Button style={styles.button} variant="blue">
          Add A Recipient
        </Button>
      </View>
      <hr />
      <View>
        <TextField
          label="Search"
          labelHidden={true}
          variation="quiet"
          backgroundColor={grey}
          placeholder="Search..."
        />
        <Table highlightOnHover={true}>
          <TableHead>
            <TableRow>
              <TableCell as="th">Name</TableCell>
              <TableCell as="th">Birthday</TableCell>
              <TableCell as="th">Address</TableCell>
              <TableCell as="th">Job Title</TableCell>
              <TableCell as="th">Date Started</TableCell>
              <TableCell as="th">Department</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{tableBody}</TableBody>
          <TableFoot>
            <TableRow>
              {" "}
              <TableCell backgroundColor={grey} colSpan="6">
                {recipients?.length} Recipients
              </TableCell>
            </TableRow>
          </TableFoot>
        </Table>
      </View>
    </main>
  );
};

// TODO: This should probably be removed and we should use theming or something
const grey = "#F4F4F4";
const styles = {
  main: {
    display: "flex",
    flexDirection: "column",
    margin: 20,
    width: "100%",
  },
  header: {
    display: "flex",
    justifyContent: "flex-start",
  },
  title: {
    marginRight: "auto",
  },
  button: {
    margin: "1em",
  },
};

export default RecipientList;
