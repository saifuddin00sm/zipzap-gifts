import React, { useState } from "react";
import Container from "@mui/material/Container";
import Header from "../Header";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import useAuth from "../../hooks/useAuth";
import ProfileInfo from "./ProfileInfo";
import { useLocation, useNavigate } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import { useQuery } from "react-query";
import { getUser } from "../../graphql/queries";
import EditProfile from "./EditProfile";

// TODO: This Component needs to be refactored to meet the Zip Zap Code of Code
function ProfilePage() {
  const { currentUser } = useAuth();
  const userID = currentUser?.username;
  const {
    isLoading,
    isError,
    data: { data: { getUser: userData = {} } = {} } = {},
    error,
  } = useQuery(
    ["users", userID],
    () => API.graphql(graphqlOperation(getUser, { id: userID })),
    { enabled: !!userID }
  );
  console.log(userData);
  const { signOut } = useAuth();
  const [isEdit, setIsEdit] = useState(false);

  const userInfo = {
    userName: userData.name,
    company: userData.company,
    contactInfo: {
      address: userData.address,
      phone: userData.phoneNumber,
      email: userData.email,
      companySize: 200,
    },
  };

  return (
    <Container component="main">
      <Header>
        <Typography variant="h1">Profile</Typography>
        <Button color="secondary" onClick={signOut}>
          Log Out
        </Button>
      </Header>
      <Box>
        {isEdit ? (
          <EditProfile info={userInfo} isEdit={isEdit} setIsEdit={setIsEdit} />
        ) : (
          <ProfileInfo info={userInfo} isEdit={isEdit} setIsEdit={setIsEdit} />
        )}
      </Box>
    </Container>
  );
}
export default ProfilePage;
