import React from "react";
import {
  Heading,
  View,
  Button,
  TextField,
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Placeholder,
} from "@aws-amplify/ui-react";
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
      <View className="page-header">
        <Heading level={1}>Recipient Dashboard</Heading>
        <Button>Import A List</Button>
        <Button>Add A Recipient</Button>
      </View>
      <View>
        <TextField
          label="Search"
          labelHidden={true}
          variation="quiet"
          placeholder="Search..."
        />
        <View>Recipient List</View>
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
        </Table>
        <View>{recipients?.length} Recipients</View>
      </View>
    </main>
  );
};

const styles = {
  main: {
    display: "flex",
    flexDirection: "column",
    margin: 20,
  },
};

export default RecipientList;
