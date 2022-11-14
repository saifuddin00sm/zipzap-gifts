import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useAuth from "../hooks/useAuth";
import { useUsers } from "../hooks/users";

const backgroundBlue = "#C5D4DF";
const headingBlue = "#9EB1BE";

/**
 * A helper component that shows the Zip Zap Login design if the
 * user is currently not logged in.
 */
const LoginPage = ({ children }) => {
  const { currentUser } = useAuth();
  const userID = currentUser?.username;
  const { isLoading, user: userData, editUser } = useUsers(userID);

  // Add the user to the GraphQL database if they're not in there yet
  useEffect(() => {
    // Verify that the Cognito user is loaded
    if (currentUser?.username) {
      // Check that react-query is done loading but we still don't have userData
      if (!isLoading && !userData) {
        editUser({
          newUser: true,
          id: currentUser.username,
          email: currentUser.attributes.email,
          name: currentUser.attributes.name,
          phoneNumber: currentUser.attributes.phone_number,
        });
      }
    }
  }, [currentUser, userData, isLoading, editUser]);

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
