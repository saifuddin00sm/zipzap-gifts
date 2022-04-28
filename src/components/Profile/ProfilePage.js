import React from "react";
import Container from "@mui/material/Container";
import Header from "../Header";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import useAuth from "../../hooks/useAuth";
import ProfileInfo from "./ProfileInfo";

const userInfo = {
  userName: "krista humphrey",
  company: "zipZap gifts",
  contactInfo: {
    address: "602 E 5000 S Lehi, Utah",
    phone: "99030030",
    email: "HRdepartment@company.com",
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
  return (
    <Container component="main">
      <Header>
        <Typography variant="h1">Profile</Typography>
        <Button color="secondary" onClick={signOut}>
          Log Out
        </Button>
      </Header>
      <Box>
        <ProfileInfo info={userInfo} />
      </Box>
    </Container>
  );
}
export default ProfilePage;
