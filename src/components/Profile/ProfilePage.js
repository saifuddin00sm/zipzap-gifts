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

// TODO: This Component needs to be refactored to meet the Zip Zap Code of Code
function ProfilePage() {
  const { currentUser } = useAuth();
  const userID = currentUser?.username || "empty";
  const { data: { data: { getUser: userData = {} } = {} } = {} } = useQuery(
    ["users", userID],
    () => API.graphql(graphqlOperation(getUser, { id: userID })),
    { enabled: !!userID }
  );
  console.log(userData);
  const { signOut } = useAuth();
  const [isEdit, setIsEdit] = useState(false);

  const userInfo = {
    id: userData?.id,
    name: userData?.name,
    company:
      userData?.company === null || userData?.company === undefined
        ? "N/A"
        : userData.company,
    contactInfo: {
      address:
        userData?.address === null || userData?.address === undefined
          ? "N/A"
          : userData.address,
      phone: userData?.phoneNumber,
      email: userData?.email,
      companySize:
        userData?.companySize === null || userData?.companSize === undefined
          ? "N/A"
          : userData.companySize,
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
