import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { getUser } from "../graphql/queries";
import { createUser } from "../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { useQuery, useMutation, useQueryClient } from "react-query";
import useAuth from "../hooks/useAuth";

const backgroundBlue = "#C5D4DF";
const headingBlue = "#9EB1BE";

/**
 * A helper component that shows the Zip Zap Login design if the
 * user is currently not logged in.
 */
const LoginPage = ({ children }) => {
  const queryClient = useQueryClient();
  const { currentUser } = useAuth();
  const userID = currentUser?.username;
  const { isLoading, data: { data: { getUser: userData } = {} } = {} } =
    useQuery(
      ["users", userID],
      () => API.graphql(graphqlOperation(getUser, { id: userID })),
      { enabled: !!userID }
    );
  const addUser = async () => {
    const input = {
      id: currentUser.username,
      email: currentUser.attributes.email,
      name: currentUser.attributes.name,
      phoneNumber: currentUser.attributes.phone_number,
    };
    await API.graphql(graphqlOperation(createUser, { input }));
  };

  const mutation = useMutation(addUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });

  // Add the user to the GraphQL database if they're not in there yet
  useEffect(() => {
    // Verify that the Cognito user is loaded
    if (currentUser?.username) {
      // Check that react-query is done loading but we still don't have userData
      if (!isLoading && !userData) {
        mutation.mutateAsync();
      }
    }
  }, [currentUser, userData, isLoading, mutation]);

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
