import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Header from "../Header.js";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useOutletContext } from "react-router-dom";
import { getUser } from "../../graphql/queries";
import { createUser } from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { Link } from "react-router-dom";

function GiftDashboard() {
  //congito user information
  const [user] = useOutletContext();
  const [open, setOpen] = useState(false);

  // TODO: Refactor this into a custom hook and move it out of this file
  useEffect(() => {
    async function addUser() {
      const newUser = {
        id: user.username,
        email: user.attributes.email,
        name: user.attributes.name,
        phoneNumber: user.attributes.phone_number,
      };
      await API.graphql(graphqlOperation(createUser, { input: newUser }));
      fetchCurrentUser();
    }

    async function fetchCurrentUser() {
      const userData = await API.graphql(
        graphqlOperation(getUser, { id: user.username })
      );

      if (!userData.data.getUser) {
        addUser();
      } else if (!userData.data.getUser.company) {
        setOpen(true);
      }
    }

    fetchCurrentUser();
  }, [
    user.username,
    user.attributes.email,
    user.attributes.name,
    user.attributes.phone_number,
  ]);

  return (
    <Container component="main">
      <Header>
        <Typography variant="h1">Gift Dashboard</Typography>
        <Button>Send a Gift</Button>
      </Header>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          icon={false}
          severity="info"
          sx={{ mb: 2 }}
        >
          <Typography variant="h3" sx={{ my: 1 }}>
            Welcome to Zip Zap!
          </Typography>
          <Typography>
            Do you want to finish setting up your account?
          </Typography>
          <Link to="/profile" className="button-link">
            <Button sx={{ my: 2 }}>Go to Profile</Button>
          </Link>
        </Alert>
      </Collapse>
      {user.attributes.name && (
        <Typography>Welcome, {user.attributes.name}!</Typography>
      )}
    </Container>
  );
}
export default GiftDashboard;
