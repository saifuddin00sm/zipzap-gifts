import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useAuth from "../hooks/useAuth";
// import { useOutletContext } from "react-router-dom";
import { getUser } from "../graphql/queries";
import { createUser } from "../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";

const backgroundBlue = "#C5D4DF";
const headingBlue = "#9EB1BE";

/**
 * A helper component that shows the Zip Zap Login design if the
 * user is currently not logged in.
 */
const LoginPage = ({ children }) => {
  const { currentUser } = useAuth();

  useEffect(() => {
    async function addUser() {
      const newUser = {
        id: currentUser.attributes.email,
        email: currentUser.attributes.email,
        name: currentUser.attributes.name,
        phoneNumber: currentUser.attributes.phone_number,
      };
      await API.graphql(graphqlOperation(createUser, { input: newUser }));
      fetchCurrentUser();
    }

    async function fetchCurrentUser() {
      const userData = await API.graphql(
        graphqlOperation(getUser, { id: currentUser.attributes.email })
      );

      if (!userData.data.getUser) {
        addUser();
      }
    }

    fetchCurrentUser();
  }, [
    currentUser.username,
    currentUser.attributes.email,
    currentUser.attributes.name,
    currentUser.attributes.phone_number,
  ]);

  // If the user is already logged in, do not render the login page
  if (currentUser) {
    return children;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        marginTop: { xs: -20, md: "revert" },
        backgroundColor: { xs: backgroundBlue, md: "white" },
      }}
    >
      <Box
        sx={{
          display: { md: "flex" },
          width: { xs: "100%", md: "50%" },
          maxHeight: { xs: 280, md: "none" },
          height: { md: "100%" },
          backgroundColor: backgroundBlue,
        }}
      >
        <Box
          alignSelf="center"
          component="img"
          alt="Zip Zap Logo"
          src="https://s3.amazonaws.com/content.zipzapgifts.com/zip-zap-login+(1).png"
          width="100%"
        />
      </Box>
      <Box sx={{ width: { xs: "100%", md: "50%" } }}>
        <Typography
          sx={{
            color: { xs: "white", md: headingBlue },
            padding: { xs: 2, md: 3 },
          }}
          align="center"
          variant="h1"
        >
          An Automated Gift Giving Platform Built for Businesses
        </Typography>
        {children}
      </Box>
    </Box>
  );
};

export default LoginPage;
