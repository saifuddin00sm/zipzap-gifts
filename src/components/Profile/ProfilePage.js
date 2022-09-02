import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { API, graphqlOperation } from "aws-amplify";
import { useQuery } from "react-query";
import { getUser } from "../../graphql/queries";
import EditProfile from "./EditProfile";
import useAuth from "../../hooks/useAuth";
import ProfileInfo from "./ProfileInfo";
import Header from "../Header";

function ProfilePage() {
  const { currentUser } = useAuth();
  const userID = currentUser?.username;
  const { data: { data: { getUser: userData = {} } = {} } = {} } = useQuery(
    // ["users", userID],
    ["users"],
    () => API.graphql(graphqlOperation(getUser, { id: userID })),
    { enabled: !!userID }
  );
  const { signOut } = useAuth();
  const [isEdit, setIsEdit] = useState(false);

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
          <EditProfile info={userData} isEdit={isEdit} setIsEdit={setIsEdit} />
        ) : (
          <ProfileInfo info={userData} isEdit={isEdit} setIsEdit={setIsEdit} />
        )}
      </Box>
    </Container>
  );
}
export default ProfilePage;
