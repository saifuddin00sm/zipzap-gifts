import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Header from "../Header";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import EditProfile from "./EditProfile";

import { useOutletContext } from "react-router-dom";
import { getUser } from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import useAuth from "../../hooks/useAuth";

// TODO: This Component needs to be refactored to meet the Zip Zap Code of Code
function ProfilePage() {
  const { signOut } = useAuth();
  const [user] = useOutletContext();
  const [currentUser, setcurrentUser] = useState(null);
  const [newUser, setNewUser] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    async function fetchCurrentUser() {
      if (user.username) {
        const userData = await API.graphql(
          graphqlOperation(getUser, { id: user.username })
        );

        if (userData.data.getUser) {
          setcurrentUser(userData.data.getUser);

          if (!userData.data.getUser.company) {
            setNewUser(true);
          }
        }
      }
    }

    if (loadingUser) {
      fetchCurrentUser().then(setLoadingUser(false));
    } else {
      return () => {
        setLoadingUser(false);
      };
    }
  }, [loadingUser, user.username]);

  if (loadingUser) {
    // TODO: We probably don't need a loading page here...we should just have placeholders in the regular fields until the data comes in
    return <Typography variant="h1">Loading</Typography>;
  }

  return (
    <Container component="main">
      <Header>
        <Typography variant="h1">Profile</Typography>
        <Button color="secondary" onClick={signOut}>
          Log Out
        </Button>
      </Header>
      {newUser ? (
        <EditProfile
          user={currentUser}
          setcurrentUser={setcurrentUser}
          setNewUser={setNewUser}
        />
      ) : (
        <>
          <Typography variant="h2">{currentUser.name}</Typography>
          <Typography paragraph>Company: {currentUser.company.name}</Typography>
          <Typography variant="h3">Contact Info</Typography>
          <HomeIcon />
          Address: {currentUser.company.address.address1}{" "}
          {currentUser.company.address.address2}{" "}
          {currentUser.company.address.city},{" "}
          {currentUser.company.address.state} {currentUser.company.address.zip}
          <PhoneIcon /> Phone: {user.attributes.phone_number}
          <EmailIcon />
          Email: {user.attributes.email}
          {/* TODO: add stripe cards */}
          {/* <Row className="profile-contact-container">
            <Typography variant="h3">Credit Cards On File</Typography>
        </Row> */}
        </>
      )}
    </Container>
  );
}
export default ProfilePage;
