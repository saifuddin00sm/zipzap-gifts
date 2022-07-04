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
import { getCurrentUser } from "../../hooks/useAuth";
import EditProfile from "./EditProfile";

const userInfo = {
  userName: "Krista Humphrey",
  company: "Zip Zap Gifts",
  contactInfo: {
    address: "3003 N Thanksgiving Way, Lehi, UT 84043",
    phone: "(801) 555-2022",
    email: "hr_department@company.com",
    companySize: 200,
  },
  cards: [
    {
      ending: 8839,
      exp: "12/2055",
      name: "victoria black",
      type: "credit card",
      id: 1,
      isSelected: true,
    },
    {
      ending: 99393,
      exp: "12/2023",
      name: "amelia ostler",
      type: "credit card",
      id: 2,
      isSelected: false,
    },
    {
      ending: 2999,
      exp: "12/2069",
      name: "krista humphrey",
      type: "credit card",
      id: 3,
      isSelected: true,
    },
  ],
};

// TODO: This Component needs to be refactored to meet the Zip Zap Code of Code
function ProfilePage() {
  const { signOut } = useAuth();
  const { currentUser } = getCurrentUser();
  const [isEdit, setIsEdit] = useState(false);

  console.log({ currentUser });

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
